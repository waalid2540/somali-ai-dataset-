-- Add missing Stripe columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'none',
ADD COLUMN IF NOT EXISTS current_period_start TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMPTZ;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON public.users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_stripe_subscription_id ON public.users(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON public.users(subscription_status);

-- Update existing user to active if they have no subscription status
UPDATE public.users 
SET subscription_status = 'active' 
WHERE id = '424e7ebf-9471-41d5-b2d0-819cdd473896' 
AND (subscription_status IS NULL OR subscription_status = '');

-- Show current user status
SELECT id, email, subscription_status, stripe_customer_id, stripe_subscription_id 
FROM public.users 
WHERE id = '424e7ebf-9471-41d5-b2d0-819cdd473896';