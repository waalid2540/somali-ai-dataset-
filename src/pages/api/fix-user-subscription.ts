import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, email } = req.body;
    
    if (!userId && !email) {
      return res.status(400).json({ message: 'userId or email is required' });
    }

    console.log('=== FIXING USER SUBSCRIPTION ===');
    console.log('User ID:', userId);
    console.log('Email:', email);

    // Update user subscription status to active
    const updateData = {
      subscription_status: 'active',
      updated_at: new Date().toISOString()
    };

    let updateResult;
    if (userId) {
      updateResult = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId);
    } else {
      updateResult = await supabase
        .from('users')
        .update(updateData)
        .eq('email', email);
    }

    console.log('Update result:', updateResult);

    if (updateResult.error) {
      console.error('Error updating user:', updateResult.error);
      return res.status(500).json({ 
        message: 'Error updating user subscription',
        error: updateResult.error.message 
      });
    }

    // Fetch updated user to confirm
    const fetchResult = userId 
      ? await supabase.from('users').select('*').eq('id', userId).single()
      : await supabase.from('users').select('*').eq('email', email).single();

    console.log('Updated user data:', fetchResult.data);

    res.status(200).json({
      message: 'User subscription updated successfully',
      user: fetchResult.data
    });

  } catch (error) {
    console.error('Error fixing user subscription:', error);
    res.status(500).json({ 
      message: 'Error fixing user subscription',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}