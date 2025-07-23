# Stripe Integration Setup Guide

## Overview
Your Somali AI Tools app now has complete Stripe integration for $4.99/month subscriptions!

## What's Been Added

### ✅ **Stripe API Routes**
- `/api/create-checkout-session.ts` - Creates Stripe checkout sessions
- `/api/create-subscription.ts` - Creates subscriptions directly  
- `/api/stripe-webhook.ts` - Handles Stripe webhook events
- `/api/subscription-status.ts` - Checks user subscription status

### ✅ **Frontend Integration**
- `src/lib/stripe.ts` - Stripe client configuration
- `src/hooks/useSubscription.ts` - React hook for subscription status
- Updated `AuthModal.tsx` with Stripe checkout flow
- New `success.tsx` page for post-payment experience

### ✅ **User Flow**
1. User clicks "GET ALL 20 TOOLS NOW" 
2. Fills signup form with pricing preview ($4.99/month)
3. Clicks "Continue to Payment"
4. Creates account in Supabase
5. Redirects to Stripe checkout page
6. After payment: redirects to success page
7. User accesses AI tools dashboard

## Setup Instructions

### 1. **Create Stripe Account**
1. Go to [stripe.com](https://stripe.com) and create account
2. Get your API keys from Dashboard > Developers > API Keys

### 2. **Create Monthly Product in Stripe**
1. Go to Stripe Dashboard > Products
2. Click "Add Product"
3. Name: "AI Tools Bundle"
4. Description: "20 professional AI tools for content creation, business automation, and more"
5. Pricing: $4.99/month recurring
6. Copy the **Price ID** (starts with `price_`)

### 3. **Set Environment Variables**
Create `.env.local` file with:

```bash
# Existing Supabase vars
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Add these Stripe variables
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key  
STRIPE_PRICE_ID=price_your_price_id_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 4. **Update Supabase Database**
Add these columns to your `users` table:

```sql
ALTER TABLE users ADD COLUMN stripe_customer_id TEXT;
ALTER TABLE users ADD COLUMN stripe_subscription_id TEXT;  
ALTER TABLE users ADD COLUMN subscription_status TEXT;
ALTER TABLE users ADD COLUMN current_period_start TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN current_period_end TIMESTAMPTZ;
```

### 5. **Setup Stripe Webhooks**
1. Go to Stripe Dashboard > Developers > Webhooks
2. Click "Add endpoint"
3. URL: `https://yourdomain.com/api/stripe-webhook`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated` 
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the webhook secret and add to env vars

## Testing

### Test Mode
- Use Stripe test keys (pk_test_, sk_test_)
- Test card: `4242 4242 4242 4242`
- Any future expiry date, any CVC

### Test Flow
1. Sign up with test email
2. Use test card in checkout
3. Verify subscription in Stripe dashboard
4. Check user record in Supabase

## Production Deployment

### 1. **Switch to Live Keys**
- Replace test keys with live keys in production env
- Update webhook endpoint to production URL

### 2. **Verify Settings**
- Webhook endpoint responding
- Database columns exist  
- All environment variables set

## Features Included

### ✅ **Payment Processing**
- Secure Stripe checkout
- Automatic subscription creation
- Payment method saved for future billing

### ✅ **Subscription Management** 
- Automatic renewal handling
- Failed payment handling
- Subscription status tracking
- Cancellation support

### ✅ **User Experience**
- Seamless signup to payment flow
- Success page after payment
- Dashboard access for paying users
- Professional pricing display

## Support
- Stripe Documentation: https://stripe.com/docs
- Test your webhooks: https://stripe.com/docs/webhooks/test

Your Stripe integration is complete and ready for production! 🚀