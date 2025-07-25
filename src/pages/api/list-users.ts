import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('=== LISTING ALL USERS ===');

    // Get all users from database
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, subscription_status, stripe_customer_id, stripe_subscription_id, created_at, updated_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ 
        message: 'Database error',
        error: error.message 
      });
    }

    console.log(`Found ${users?.length || 0} users`);

    // Also search for similar emails
    const { data: similarUsers, error: similarError } = await supabase
      .from('users')
      .select('id, email, subscription_status, stripe_customer_id, stripe_subscription_id')
      .ilike('email', '%waalid%');

    console.log(`Found ${similarUsers?.length || 0} users with "waalid" in email`);

    return res.status(200).json({
      message: `Found ${users?.length || 0} total users`,
      totalUsers: users?.length || 0,
      recentUsers: users || [],
      usersWithWaalid: similarUsers || [],
      searchTerm: 'waalid'
    });

  } catch (error) {
    console.error('List users error:', error);
    return res.status(500).json({ 
      message: 'Failed to list users',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}