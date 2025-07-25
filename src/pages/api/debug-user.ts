import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId, email } = req.query;
    
    console.log('=== DEBUG USER REQUEST ===');
    console.log('userId:', userId);
    console.log('email:', email);

    // Simple query to get user by email
    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email as string);

    console.log('=== DEBUG USER RESULTS ===');
    console.log('Users found:', users);
    console.log('Error:', error);

    return res.status(200).json({
      success: true,
      users: users || [],
      count: users?.length || 0,
      email: email,
      error: error?.message || null
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return res.status(200).json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      users: []
    });
  }
}