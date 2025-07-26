import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Testing database connection...');
    
    // First check if user exists
    const { data: user, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'gooh2540@gmail.com')
      .single();

    if (selectError) {
      return res.status(200).json({
        step: 'SELECT',
        success: false,
        error: selectError.message,
        user: null
      });
    }

    // Try simple update first
    const { data, error } = await supabase
      .from('users')
      .update({
        subscription_status: 'active'
      })
      .eq('email', 'gooh2540@gmail.com');

    return res.status(200).json({
      step: 'UPDATE',
      success: !error,
      user: user,
      data: data,
      error: error?.message || null
    });
  } catch (error) {
    return res.status(200).json({ 
      step: 'CATCH',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}