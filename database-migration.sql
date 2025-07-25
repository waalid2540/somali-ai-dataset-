-- ===============================================
-- STRIPE INTEGRATION DATABASE MIGRATION
-- Run this in Supabase SQL Editor
-- ===============================================

-- Step 1: Add Stripe columns to users table if they don't exist
DO $$
BEGIN
    -- Add stripe_customer_id column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'stripe_customer_id') THEN
        ALTER TABLE public.users ADD COLUMN stripe_customer_id TEXT;
    END IF;

    -- Add stripe_subscription_id column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'stripe_subscription_id') THEN
        ALTER TABLE public.users ADD COLUMN stripe_subscription_id TEXT;
    END IF;

    -- Add subscription_status column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'subscription_status') THEN
        ALTER TABLE public.users ADD COLUMN subscription_status TEXT DEFAULT 'none';
    END IF;

    -- Add current_period_start column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'current_period_start') THEN
        ALTER TABLE public.users ADD COLUMN current_period_start TIMESTAMPTZ;
    END IF;

    -- Add current_period_end column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'users' AND column_name = 'current_period_end') THEN
        ALTER TABLE public.users ADD COLUMN current_period_end TIMESTAMPTZ;
    END IF;
END $$;

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON public.users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_users_stripe_subscription_id ON public.users(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_users_subscription_status ON public.users(subscription_status);
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);

-- Step 3: Set default subscription_status for existing users who don't have one
UPDATE public.users 
SET subscription_status = 'none' 
WHERE subscription_status IS NULL;

-- Step 4: Show current table structure to verify
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Step 5: Show sample user data
SELECT id, email, subscription_status, stripe_customer_id, stripe_subscription_id
FROM public.users 
LIMIT 5;