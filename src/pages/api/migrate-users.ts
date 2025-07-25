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

  // Add basic auth to prevent misuse
  const { authorization } = req.headers;
  if (authorization !== `Bearer ${process.env.MIGRATION_SECRET || 'your-secret-key'}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    console.log('=== STARTING USER MIGRATION ===');

    // Step 1: Check if Stripe columns exist
    const testQuery = await supabase
      .from('users')
      .select('stripe_customer_id, stripe_subscription_id, subscription_status')
      .limit(1);

    if (testQuery.error) {
      return res.status(500).json({ 
        message: 'Database schema needs migration. Please run the database-migration.sql script first.',
        error: testQuery.error.message 
      });
    }

    // Step 2: Get all users who need migration
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, email, stripe_customer_id, subscription_status')
      .or('subscription_status.is.null,subscription_status.eq.none,stripe_customer_id.is.null');

    if (usersError) {
      throw new Error(`Failed to fetch users: ${usersError.message}`);
    }

    console.log(`Found ${users?.length || 0} users that need migration`);

    if (!users || users.length === 0) {
      return res.status(200).json({ 
        message: 'No users need migration',
        migrated: 0 
      });
    }

    // Step 3: Check Stripe for each user's subscriptions
    const migrationResults = [];
    let successCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        console.log(`Processing user: ${user.email}`);

        // Search for customer in Stripe by email
        const customers = await stripe.customers.list({
          email: user.email,
          limit: 1
        });

        if (customers.data.length > 0) {
          const customer = customers.data[0];
          console.log(`Found Stripe customer: ${customer.id}`);

          // Get active subscriptions
          const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: 'active',
            limit: 1
          });

          const updateData: any = {
            stripe_customer_id: customer.id,
            subscription_status: subscriptions.data.length > 0 ? 'active' : 'inactive',
            updated_at: new Date().toISOString()
          };

          if (subscriptions.data.length > 0) {
            updateData.stripe_subscription_id = subscriptions.data[0].id;
            updateData.current_period_start = new Date(subscriptions.data[0].current_period_start * 1000).toISOString();
            updateData.current_period_end = new Date(subscriptions.data[0].current_period_end * 1000).toISOString();
          }

          // Update user in database
          const { error: updateError } = await supabase
            .from('users')
            .update(updateData)
            .eq('id', user.id);

          if (updateError) {
            console.error(`Failed to update user ${user.email}:`, updateError);
            migrationResults.push({
              email: user.email,
              status: 'error',
              error: updateError.message
            });
            errorCount++;
          } else {
            console.log(`Successfully migrated user: ${user.email}`);
            migrationResults.push({
              email: user.email,
              status: 'success',
              stripeCustomerId: customer.id,
              subscriptionStatus: updateData.subscription_status
            });
            successCount++;
          }
        } else {
          // No Stripe customer found, set to none
          const { error: updateError } = await supabase
            .from('users')
            .update({ 
              subscription_status: 'none',
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id);

          if (updateError) {
            console.error(`Failed to update user ${user.email}:`, updateError);
            errorCount++;
          } else {
            migrationResults.push({
              email: user.email,
              status: 'no_stripe_customer',
              subscriptionStatus: 'none'
            });
            successCount++;
          }
        }

        // Add small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error);
        migrationResults.push({
          email: user.email,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        errorCount++;
      }
    }

    console.log('=== MIGRATION COMPLETE ===');
    console.log(`Success: ${successCount}, Errors: ${errorCount}`);

    res.status(200).json({
      message: 'User migration completed',
      totalProcessed: users.length,
      successCount,
      errorCount,
      results: migrationResults
    });

  } catch (error) {
    console.error('Migration failed:', error);
    res.status(500).json({ 
      message: 'Migration failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}