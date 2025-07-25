import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userEmail } = req.body;
    
    if (!userEmail) {
      return res.status(400).json({ message: 'userEmail is required' });
    }

    console.log('=== DEBUGGING USER:', userEmail, '===');

    // Step 1: Check user in Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', userEmail)
      .single();

    console.log('User in Supabase:', user);
    console.log('User error:', userError);

    if (userError) {
      return res.status(404).json({ 
        message: 'User not found in database',
        error: userError.message 
      });
    }

    // Step 2: Search for customer in Stripe
    const customers = await stripe.customers.list({
      email: userEmail,
      limit: 1
    });

    console.log('Stripe customers found:', customers.data.length);
    
    if (customers.data.length === 0) {
      return res.status(404).json({ 
        message: 'No Stripe customer found for this email',
        user: user
      });
    }

    const customer = customers.data[0];
    console.log('Stripe customer:', customer.id);

    // Step 3: Get customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      limit: 10
    });

    console.log('Subscriptions found:', subscriptions.data.length);
    console.log('Subscription statuses:', subscriptions.data.map(s => s.status));

    const activeSubscription = subscriptions.data.find(s => s.status === 'active');
    
    // Step 4: Fix the user record
    const updateData: any = {
      stripe_customer_id: customer.id,
      subscription_status: activeSubscription ? 'active' : 'inactive',
      updated_at: new Date().toISOString()
    };

    if (activeSubscription) {
      updateData.stripe_subscription_id = activeSubscription.id;
      updateData.current_period_start = new Date(activeSubscription.current_period_start * 1000).toISOString();
      updateData.current_period_end = new Date(activeSubscription.current_period_end * 1000).toISOString();
    }

    console.log('Updating user with:', updateData);

    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update(updateData)
      .eq('email', userEmail)
      .select()
      .single();

    if (updateError) {
      console.error('Update error:', updateError);
      return res.status(500).json({ 
        message: 'Failed to update user',
        error: updateError.message,
        debugInfo: {
          user,
          customer: customer.id,
          subscriptions: subscriptions.data.map(s => ({ id: s.id, status: s.status }))
        }
      });
    }

    console.log('User updated successfully:', updatedUser);

    // Step 5: Test subscription status API
    const statusResponse = await fetch(`${req.headers.origin}/api/subscription-status?userId=${user.id}`);
    const statusData = await statusResponse.json();

    return res.status(200).json({
      message: 'User fixed successfully!',
      original: user,
      updated: updatedUser,
      stripeCustomer: customer.id,
      subscriptions: subscriptions.data.map(s => ({ 
        id: s.id, 
        status: s.status, 
        current_period_end: new Date(s.current_period_end * 1000).toISOString() 
      })),
      subscriptionStatusAPI: statusData
    });

  } catch (error) {
    console.error('Debug and fix error:', error);
    return res.status(500).json({ 
      message: 'Debug failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}