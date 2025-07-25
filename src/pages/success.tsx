import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CheckCircle, Zap, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      // Update user subscription status immediately
      const updateSubscription = async () => {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          console.log('Current user:', user);
          
          if (user) {
            // First check if user exists in users table
            const { data: existingUser, error: fetchError } = await supabase
              .from('users')
              .select('*')
              .eq('id', user.id)
              .single();
            
            console.log('Existing user in database:', existingUser);
            console.log('Fetch error:', fetchError);
            
            if (existingUser) {
              // Update existing user
              const { data, error } = await supabase
                .from('users')
                .update({ subscription_status: 'active' })
                .eq('id', user.id);
              console.log('Update result:', data, error);
            } else {
              // Create user record if doesn't exist
              const { data, error } = await supabase
                .from('users')
                .insert([{
                  id: user.id,
                  email: user.email,
                  subscription_status: 'active',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                }]);
              console.log('Insert result:', data, error);
            }
          }
        } catch (error) {
          console.error('Error updating subscription:', error);
        }
        
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      };
      
      updateSubscription();
    }
  }, [session_id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Welcome to AI Tools Bundle - Subscription Active!</title>
        <meta name="description" content="Your subscription is now active. Access your 20 AI tools now." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="text-4xl mb-4">🎉</div>
          </div>

          {/* Welcome Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Welcome to AI Tools Bundle!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your subscription is now active. You have access to all 20 professional AI tools.
          </p>

          {/* Subscription Details */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Subscription</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">20</div>
                <div className="text-sm text-gray-600">AI Tools</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">$4.99</div>
                <div className="text-sm text-gray-600">per month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">$115+</div>
                <div className="text-sm text-gray-600">saved monthly</div>
              </div>
            </div>
          </div>

          {/* What's Included */}
          <div className="text-left mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">What's Included:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Blog Post Generator</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Social Media AI</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Live Chatbot Creator</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Invoice Generator</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">Email Marketing AI</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-gray-700">+ 15 more tools</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link 
            href="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            <Zap className="mr-3 w-6 h-6" />
            Access Your AI Tools
            <ArrowRight className="ml-3 w-6 h-6" />
          </Link>

          {/* Footer Note */}
          <div className="mt-8 text-sm text-gray-500">
            <p>You can manage your subscription anytime from your dashboard.</p>
            <p className="mt-2">Questions? Contact support at support@somaidataset.com</p>
          </div>
        </div>
      </div>
    </>
  );
}