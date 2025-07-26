import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { supabase } from '../../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const body = JSON.stringify(req.body);
    const event = JSON.parse(body);

    console.log('=== WEBHOOK RECEIVED ===');
    console.log('Event type:', event.type);

    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
      const subscription = event.data.object;
      
      console.log('Processing subscription:', subscription.id);
      console.log('Customer:', subscription.customer);
      
      // Get customer email
      const customer = await stripe.customers.retrieve(subscription.customer);
      if (!customer || customer.deleted || !customer.email) {
        console.log('No customer email found');
        return res.status(200).json({ received: true });
      }

      console.log('Customer email:', customer.email);

      // Update database
      const { error } = await supabase
        .from('users')
        .update({
          stripe_customer_id: subscription.customer,
          stripe_subscription_id: subscription.id,
          subscription_status: 'active'
        })
        .eq('email', customer.email);

      console.log('Database update error:', error);
      console.log('Database update success:', !error);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(200).json({ received: true });
  }
}