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
    const { email, userId } = req.body;

    if (!email || !userId) {
      return res.status(400).json({ message: 'Email and userId are required' });
    }

    // Create or retrieve customer
    let customer;
    try {
      const customers = await stripe.customers.list({ email, limit: 1 });
      if (customers.data.length > 0) {
        customer = customers.data[0];
      } else {
        customer = await stripe.customers.create({
          email,
          metadata: { userId },
        });
      }
    } catch (error) {
      console.error('Error creating/retrieving customer:', error);
      return res.status(500).json({ message: 'Error creating customer' });
    }

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Your $4.99/month price ID
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    });

    // Update user in Supabase with subscription details
    const { error: updateError } = await supabase
      .from('users')
      .update({
        stripe_customer_id: customer.id,
        stripe_subscription_id: subscription.id,
        subscription_status: subscription.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating user:', updateError);
    }

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent;
    
    res.status(200).json({
      subscriptionId: subscription.id,
      clientSecret: paymentIntent?.client_secret,
    });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ message: 'Error creating subscription' });
  }
}