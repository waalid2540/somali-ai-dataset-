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

    const { data: user, error } = await supabase
      .from('users')
      .select('subscription_status, current_period_end, stripe_customer_id, stripe_subscription_id, email, updated_at')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle instead of single to handle missing users

    console.log('=== SUBSCRIPTION STATUS CHECK ===');
    console.log('Database query result:', user, error);
    console.log('User subscription_status:', user?.subscription_status);
    console.log('User stripe_customer_id:', user?.stripe_customer_id);
    console.log('User stripe_subscription_id:', user?.stripe_subscription_id);
    console.log('User email:', user?.email);
    console.log('User updated_at:', user?.updated_at);

    if (error) {
      console.error('Error fetching user subscription:', error);
      return res.status(500).json({ message: 'Error fetching subscription status' });
    }

    // If no user found, return inactive subscription
    if (!user) {
      return res.status(200).json({
        hasActiveSubscription: false,
        subscriptionStatus: 'none',
        currentPeriodEnd: null,
      });
    }

    const hasActiveSubscription = user.subscription_status === 'active' && 
      user.current_period_end && 
      new Date(user.current_period_end) > new Date();

    res.status(200).json({
      hasActiveSubscription: hasActiveSubscription || user.subscription_status === 'active',
      subscriptionStatus: user.subscription_status || 'none',
      currentPeriodEnd: user.current_period_end,
    });
  } catch (error) {
    console.error('Error checking subscription status:', error);
    res.status(500).json({ message: 'Error checking subscription status' });
  }
}