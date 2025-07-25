import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { supabase } from '../../lib/supabase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

const buffer = (req: NextApiRequest) => {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    req.on('error', reject);
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const buf = await buffer(req);
    const signature = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).json({ message: 'Webhook signature verification failed' });
    }

    console.log('=== WEBHOOK RECEIVED ===');
    console.log('Event type:', event.type);
    console.log('Event ID:', event.id);

    try {
      switch (event.type) {
        case 'checkout.session.completed':
          console.log('Processing checkout.session.completed');
          const checkoutSession = event.data.object as Stripe.Checkout.Session;
          await handleCheckoutCompleted(checkoutSession);
          break;

        case 'customer.subscription.created':
          console.log('Processing customer.subscription.created');
          const createdSubscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionChange(createdSubscription);
          break;

        case 'customer.subscription.updated':
          console.log('Processing customer.subscription.updated');
          const updatedSubscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionChange(updatedSubscription);
          break;

        case 'customer.subscription.deleted':
          console.log('Processing customer.subscription.deleted');
          const deletedSubscription = event.data.object as Stripe.Subscription;
          await handleSubscriptionDeleted(deletedSubscription);
          break;

        case 'invoice.payment_succeeded':
          console.log('Processing invoice.payment_succeeded');
          const invoice = event.data.object as Stripe.Invoice;
          await handlePaymentSucceeded(invoice);
          break;

        case 'invoice.payment_failed':
          console.log('Processing invoice.payment_failed');
          const failedInvoice = event.data.object as Stripe.Invoice;
          await handlePaymentFailed(failedInvoice);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      console.log('Webhook processed successfully for event:', event.type);
      res.status(200).json({ received: true, event_type: event.type });
    } catch (handlerError) {
      console.error('=== ERROR IN EVENT HANDLER ===');
      console.error('Event type:', event.type);
      console.error('Handler error:', handlerError);
      console.error('Stack trace:', handlerError instanceof Error ? handlerError.stack : 'No stack trace');
      
      // Return success to Stripe to avoid retries, but log the error
      res.status(200).json({ 
        received: true, 
        error: handlerError instanceof Error ? handlerError.message : 'Unknown error',
        event_type: event.type 
      });
    }
  } catch (error) {
    console.error('=== CRITICAL WEBHOOK ERROR ===');
    console.error('Critical error:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    res.status(500).json({ 
      message: 'Error processing webhook',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId;
  const email = session.customer_details?.email || session.metadata?.email;
  console.log('=== CHECKOUT COMPLETED ===');
  console.log('User ID:', userId);
  console.log('Email:', email);
  console.log('Customer ID:', session.customer);
  console.log('Subscription ID:', session.subscription);
  
  if (!userId && !email) {
    console.error('No userId or email in checkout session');
    return;
  }

  // Prepare update data - only include columns if they exist
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };

  // Check if Stripe columns exist by trying a test query first
  try {
    const testQuery = await supabase
      .from('users')
      .select('stripe_customer_id, stripe_subscription_id, subscription_status')
      .limit(1);

    if (!testQuery.error) {
      // Stripe columns exist, add them to update
      updateData.stripe_customer_id = session.customer as string;
      updateData.stripe_subscription_id = session.subscription as string;
      updateData.subscription_status = 'active';
      console.log('Stripe columns exist, updating with full data');
    }
  } catch (error) {
    console.log('Stripe columns might not exist, using basic update');
  }

  console.log('Update data:', updateData);

  // Try to update by userId first, then by email
  let updateResult;
  if (userId) {
    console.log('Attempting update by userId:', userId);
    updateResult = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId);
    
    console.log('Update by userId result:', updateResult);
  }
  
  // If userId update failed or no userId, try email
  if (!userId || updateResult?.error) {
    console.log('Trying update by email:', email);
    updateResult = await supabase
      .from('users')
      .update(updateData)
      .eq('email', email);
    
    console.log('Update by email result:', updateResult);
  }

  if (updateResult?.error) {
    console.error('=== CHECKOUT UPDATE FAILED ===');
    console.error('Error details:', updateResult.error);
    console.error('Update data was:', updateData);
    
    // If Stripe columns don't exist, create a temporary active status
    if (updateResult.error.message.includes('column') && updateResult.error.message.includes('does not exist')) {
      console.log('Stripe columns missing, creating basic active status');
      const basicUpdate = await supabase
        .from('users')
        .update({ updated_at: new Date().toISOString() })
        .eq(userId ? 'id' : 'email', userId || email);
      
      console.log('Basic update result:', basicUpdate);
    }
  } else {
    console.log('=== CHECKOUT UPDATE SUCCESS ===');
    console.log('User subscription updated successfully');
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  console.log('=== SUBSCRIPTION CHANGE - SIMPLE VERSION ===');
  console.log('Subscription ID:', subscription.id);
  console.log('Customer ID:', subscription.customer);
  console.log('Status:', subscription.status);
  
  // Get customer email from Stripe
  let customerEmail = null;
  try {
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    if (customer && !customer.deleted && customer.email) {
      customerEmail = customer.email;
      console.log('Customer email from Stripe:', customerEmail);
    }
  } catch (error) {
    console.error('Error fetching customer from Stripe:', error);
    return;
  }

  if (!customerEmail) {
    console.error('No customer email found');
    return;
  }

  // Simple update by email
  console.log('Updating user with email:', customerEmail);
  const { data, error } = await supabase
    .from('users')
    .update({
      stripe_customer_id: subscription.customer as string,
      stripe_subscription_id: subscription.id,
      subscription_status: subscription.status
    })
    .eq('email', customerEmail);

  if (error) {
    console.error('Database update failed:', error);
    throw new Error(`Failed to update user: ${error.message}`);
  } else {
    console.log('SUCCESS: Updated user subscription');
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: 'canceled',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error updating canceled subscription:', error);
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', invoice.customer as string);

  if (error) {
    console.error('Error updating after payment success:', error);
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const { error } = await supabase
    .from('users')
    .update({
      subscription_status: 'past_due',
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', invoice.customer as string);

  if (error) {
    console.error('Error updating after payment failure:', error);
  }
}