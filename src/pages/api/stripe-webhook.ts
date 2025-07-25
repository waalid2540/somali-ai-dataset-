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
  console.log('Checkout completed for user:', userId, 'email:', email);
  
  if (!userId && !email) {
    console.error('No userId or email in checkout session');
    return;
  }

  // Try to update by userId first, then by email
  let updateResult;
  if (userId) {
    updateResult = await supabase
      .from('users')
      .update({
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
  }
  
  // If userId update failed or no userId, try email
  if (!userId || updateResult?.error) {
    console.log('Trying update by email:', email);
    updateResult = await supabase
      .from('users')
      .update({
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        subscription_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('email', email);
  }

  if (updateResult?.error) {
    console.error('Error updating user after checkout:', updateResult.error);
  } else {
    console.log('Successfully updated user subscription status to active');
  }
}

async function handleSubscriptionChange(subscription: Stripe.Subscription) {
  const userId = subscription.metadata?.userId;
  const email = subscription.metadata?.email;
  console.log('=== SUBSCRIPTION CHANGE DEBUG ===');
  console.log('Subscription ID:', subscription.id);
  console.log('Customer ID:', subscription.customer);
  console.log('Status:', subscription.status);
  console.log('Metadata userId:', userId);
  console.log('Metadata email:', email);
  console.log('Full metadata:', subscription.metadata);
  
  let updateResult;
  let updateAttempted = false;

  // Strategy 1: Try to update by stripe_customer_id first
  console.log('Attempting update by stripe_customer_id:', subscription.customer);
  console.log('Subscription periods:', subscription.current_period_start, subscription.current_period_end);
  
  // Convert timestamps safely
  let currentPeriodStart = null;
  let currentPeriodEnd = null;
  
  try {
    if (subscription.current_period_start) {
      currentPeriodStart = new Date(subscription.current_period_start * 1000).toISOString();
    }
    if (subscription.current_period_end) {
      currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
    }
  } catch (timeError) {
    console.error('Error converting timestamps:', timeError);
    console.log('Using null values for timestamps');
  }
  
  updateResult = await supabase
    .from('users')
    .update({
      subscription_status: subscription.status,
      updated_at: new Date().toISOString(),
    })
    .eq('stripe_customer_id', subscription.customer as string);

  updateAttempted = true;

  if (updateResult.error) {
    console.log('Update by stripe_customer_id failed:', updateResult.error);
  } else {
    console.log('Successfully updated subscription by stripe_customer_id');
    return;
  }

  // Strategy 2: Try by userId if available
  if (userId) {
    console.log('Attempting update by userId:', userId);
    updateResult = await supabase
      .from('users')
      .update({
        stripe_customer_id: subscription.customer as string,
        subscription_status: subscription.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateResult.error) {
      console.log('Update by userId failed:', updateResult.error);
    } else {
      console.log('Successfully updated subscription by userId');
      return;
    }
  }

  // Strategy 3: Try by email if available
  if (email) {
    console.log('Attempting update by email:', email);
    updateResult = await supabase
      .from('users')
      .update({
        stripe_customer_id: subscription.customer as string,
        subscription_status: subscription.status,
        updated_at: new Date().toISOString(),
      })
      .eq('email', email);

    if (updateResult.error) {
      console.log('Update by email failed:', updateResult.error);
    } else {
      console.log('Successfully updated subscription by email');
      return;
    }
  }

  // Strategy 4: Get customer email from Stripe and try that
  try {
    console.log('Fetching customer from Stripe to get email...');
    const customer = await stripe.customers.retrieve(subscription.customer as string);
    if (customer && !customer.deleted && customer.email) {
      console.log('Found customer email from Stripe:', customer.email);
      updateResult = await supabase
        .from('users')
        .update({
          stripe_customer_id: subscription.customer as string,
          subscription_status: subscription.status,
          updated_at: new Date().toISOString(),
        })
        .eq('email', customer.email);

      if (updateResult.error) {
        console.log('Update by Stripe customer email failed:', updateResult.error);
      } else {
        console.log('Successfully updated subscription by Stripe customer email');
        return;
      }
    }
  } catch (stripeError) {
    console.error('Error fetching customer from Stripe:', stripeError);
  }

  // If we get here, all strategies failed
  console.error('=== ALL UPDATE STRATEGIES FAILED ===');
  console.error('Final error:', updateResult?.error);
  throw new Error(`Failed to update subscription for customer ${subscription.customer}: ${updateResult?.error?.message || 'No user found'}`);
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