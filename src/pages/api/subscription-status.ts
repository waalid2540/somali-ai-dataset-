import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;
    console.log('Checking subscription for userId:', userId);

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // First try with all columns, if fails try with basic columns
    let user, error;
    
    try {
      const result = await supabase
        .from('users')
        .select('subscription_status, current_period_end, stripe_customer_id, stripe_subscription_id, email, updated_at')
        .eq('id', userId)
        .maybeSingle();
      
      user = result.data;
      error = result.error;
    } catch (dbError) {
      console.log('Full column query failed, trying basic columns:', dbError);
      
      // Try with just basic columns in case Stripe columns don't exist
      const basicResult = await supabase
        .from('users')
        .select('email, updated_at, created_at')
        .eq('id', userId)
        .maybeSingle();
      
      if (basicResult.error) {
        console.error('Basic query also failed:', basicResult.error);
        return res.status(500).json({ 
          message: 'Database query failed',
          details: basicResult.error.message 
        });
      }
      
      user = {
        ...basicResult.data,
        subscription_status: null,
        current_period_end: null,
        stripe_customer_id: null,
        stripe_subscription_id: null
      };
      error = null;
    }

    console.log('=== SUBSCRIPTION STATUS CHECK ===');
    console.log('Database query result:', user, error);
    console.log('User subscription_status:', user?.subscription_status);
    console.log('User stripe_customer_id:', user?.stripe_customer_id);
    console.log('User stripe_subscription_id:', user?.stripe_subscription_id);
    console.log('User email:', user?.email);
    console.log('User updated_at:', user?.updated_at);

    if (error) {
      console.error('Error fetching user subscription:', error);
      return res.status(500).json({ 
        message: 'Error fetching subscription status',
        details: error.message 
      });
    }

    // If no user found, return inactive subscription
    if (!user) {
      return res.status(200).json({
        hasActiveSubscription: false,
        subscriptionStatus: 'none',
        currentPeriodEnd: null,
      });
    }

    // Check if subscription is active
    // If current_period_end exists, check if it's in the future
    // If current_period_end is null, just check subscription_status
    const hasActiveSubscription = user.subscription_status === 'active' && (
      !user.current_period_end || 
      new Date(user.current_period_end) > new Date()
    );

    console.log('Final hasActiveSubscription:', hasActiveSubscription);
    console.log('Subscription status:', user.subscription_status);
    console.log('Current period end:', user.current_period_end);

    res.status(200).json({
      hasActiveSubscription: hasActiveSubscription,
      subscriptionStatus: user.subscription_status || 'none',
      currentPeriodEnd: user.current_period_end,
    });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    res.status(500).json({ message: 'Error checking subscription status' });
  }
}