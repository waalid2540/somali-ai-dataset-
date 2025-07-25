import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('subscription_status, current_period_end, stripe_customer_id')
      .eq('id', userId)
      .maybeSingle(); // Use maybeSingle instead of single to handle missing users

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