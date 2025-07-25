-- Debug: Check all users with your email
SELECT 
    id, 
    email, 
    subscription_status, 
    stripe_customer_id, 
    stripe_subscription_id,
    created_at,
    updated_at
FROM public.users 
WHERE email = 'waalidlegacy@gmail.com'
ORDER BY created_at DESC;

-- Check if there are duplicate users
SELECT 
    email, 
    COUNT(*) as user_count
FROM public.users 
WHERE email = 'waalidlegacy@gmail.com'
GROUP BY email;

-- Update ALL users with your email to active (in case there are duplicates)
UPDATE public.users 
SET 
    subscription_status = 'active',
    updated_at = NOW()
WHERE email = 'waalidlegacy@gmail.com';

-- Verify the update worked
SELECT 
    id, 
    email, 
    subscription_status, 
    stripe_customer_id, 
    stripe_subscription_id,
    updated_at
FROM public.users 
WHERE email = 'waalidlegacy@gmail.com'
ORDER BY created_at DESC;