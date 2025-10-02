-- Video Meetings Platform Database Setup
-- Run this in your Supabase SQL editor

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_name TEXT NOT NULL,
  meeting_url TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  participant_count INTEGER DEFAULT 0,
  duration_minutes INTEGER DEFAULT 0
);

-- Create index for faster queries
CREATE INDEX idx_meetings_created_by ON meetings(created_by);
CREATE INDEX idx_meetings_created_at ON meetings(created_at DESC);
CREATE INDEX idx_meetings_is_active ON meetings(is_active);

-- Create meeting_participants table to track who joined
CREATE TABLE IF NOT EXISTS meeting_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  meeting_id UUID REFERENCES meetings(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  left_at TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER DEFAULT 0
);

CREATE INDEX idx_participants_meeting ON meeting_participants(meeting_id);
CREATE INDEX idx_participants_user ON meeting_participants(user_id);

-- Update subscriptions table to support video meetings tier
-- (This assumes you already have a subscriptions table)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                 WHERE table_name='subscriptions' AND column_name='plan_type') THEN
    ALTER TABLE subscriptions ADD COLUMN plan_type TEXT DEFAULT 'video_meetings';
  END IF;
END $$;

-- Create subscription plans table for different tiers
CREATE TABLE IF NOT EXISTS subscription_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_yearly DECIMAL(10,2),
  stripe_price_id TEXT,
  features JSONB,
  max_meeting_duration INTEGER, -- NULL means unlimited
  max_participants INTEGER DEFAULT 100,
  max_meetings_per_month INTEGER, -- NULL means unlimited
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default plan (Video Meetings Unlimited at $9.99/month)
INSERT INTO subscription_plans (name, price_monthly, price_yearly, features, max_meeting_duration, max_participants, max_meetings_per_month)
VALUES (
  'Video Meetings Unlimited',
  9.99,
  99.90, -- 10 months for the price of 12 (2 months free)
  '{
    "unlimited_hours": true,
    "hd_video": true,
    "screen_sharing": true,
    "recording": true,
    "max_participants": 100,
    "priority_support": true,
    "custom_branding": false
  }'::jsonb,
  NULL, -- unlimited duration
  100,
  NULL -- unlimited meetings
)
ON CONFLICT (name) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for meetings
CREATE POLICY "Users can view their own meetings"
  ON meetings FOR SELECT
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create meetings if subscribed"
  ON meetings FOR INSERT
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM subscriptions
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "Users can update their own meetings"
  ON meetings FOR UPDATE
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own meetings"
  ON meetings FOR DELETE
  USING (auth.uid() = created_by);

-- RLS Policies for meeting participants
CREATE POLICY "Users can view participants of their meetings"
  ON meeting_participants FOR SELECT
  USING (
    auth.uid() IN (
      SELECT created_by FROM meetings WHERE id = meeting_id
    ) OR
    auth.uid() = user_id
  );

CREATE POLICY "Users can join meetings if subscribed"
  ON meeting_participants FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM subscriptions
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

-- RLS Policies for subscription plans
CREATE POLICY "Anyone can view active subscription plans"
  ON subscription_plans FOR SELECT
  USING (is_active = true);

-- Create function to track meeting analytics
CREATE OR REPLACE FUNCTION update_meeting_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Update participant count when someone joins
  IF TG_OP = 'INSERT' THEN
    UPDATE meetings
    SET participant_count = participant_count + 1
    WHERE id = NEW.meeting_id;
  END IF;

  -- Update duration when someone leaves
  IF TG_OP = 'UPDATE' AND NEW.left_at IS NOT NULL AND OLD.left_at IS NULL THEN
    NEW.duration_minutes = EXTRACT(EPOCH FROM (NEW.left_at - NEW.joined_at)) / 60;

    -- Update total meeting duration
    UPDATE meetings
    SET duration_minutes = (
      SELECT COALESCE(SUM(duration_minutes), 0)
      FROM meeting_participants
      WHERE meeting_id = NEW.meeting_id
    )
    WHERE id = NEW.meeting_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for meeting stats
CREATE TRIGGER meeting_stats_trigger
  AFTER INSERT OR UPDATE ON meeting_participants
  FOR EACH ROW
  EXECUTE FUNCTION update_meeting_stats();

-- Create view for meeting analytics
CREATE OR REPLACE VIEW meeting_analytics AS
SELECT
  m.id,
  m.room_name,
  m.created_by,
  m.created_at,
  m.is_active,
  m.participant_count,
  m.duration_minutes,
  COUNT(DISTINCT mp.user_id) as unique_participants,
  MAX(mp.left_at) as last_activity
FROM meetings m
LEFT JOIN meeting_participants mp ON m.id = mp.meeting_id
GROUP BY m.id, m.room_name, m.created_by, m.created_at, m.is_active, m.participant_count, m.duration_minutes;

COMMENT ON TABLE meetings IS 'Video meeting rooms created by users';
COMMENT ON TABLE meeting_participants IS 'Tracks who joined which meetings and for how long';
COMMENT ON TABLE subscription_plans IS 'Available subscription plans for video meetings';
COMMENT ON VIEW meeting_analytics IS 'Analytics view for meeting usage and participant tracking';
