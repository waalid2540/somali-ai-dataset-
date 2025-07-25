// Enterprise SaaS Authentication Modal with Stripe Integration
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Mail, Lock, User, Building, CreditCard } from 'lucide-react';
import getStripe from '../lib/stripe';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialMode?: 'signin' | 'signup';
}

export default function AuthModal({ isOpen, onClose, onSuccess, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!isOpen) return null;

  const handleStripeCheckout = async (userId: string) => {
    try {
      // Create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userId,
        }),
      });

      const { sessionId, url } = await response.json();

      if (url) {
        // Redirect to Stripe checkout
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError('Failed to start payment process. Please try again.');
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        // Sign up new user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) throw authError;

        // Create profile immediately (don't wait for email confirmation)
        if (authData.user) {
          const { error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: authData.user.id,
                email,
                full_name: fullName || '',
                company_name: companyName || '',
                subscription_status: null,
                stripe_customer_id: null,
                stripe_subscription_id: null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              }
            ]);

          if (profileError) {
            console.error('Profile creation error:', profileError);
            // Continue to payment even if profile creation fails
          }

          // After successful signup, redirect to Stripe checkout
          await handleStripeCheckout(authData.user.id);
        }
      } else {
        // Sign in existing user
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show confirmation screen after successful signup
  if (showConfirmation) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
          <div className="text-center">
            <div className="text-6xl mb-6">📧</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Check Your Email!
            </h2>
            <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              We've sent a confirmation email to <span className="font-semibold text-blue-600 break-all">{email}</span>
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6 text-left">
              <h3 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">📋 Next Steps:</h3>
              <ol className="text-blue-800 space-y-2 text-xs sm:text-sm">
                <li><span className="font-semibold">1.</span> Check your inbox (and spam folder)</li>
                <li><span className="font-semibold">2.</span> Look for an email from "AI Tools Bundle"</li>
                <li><span className="font-semibold">3.</span> Click the "Confirm Account" button</li>
                <li><span className="font-semibold">4.</span> Return here to access your 20 AI tools</li>
              </ol>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-green-800 text-xs sm:text-sm">
                <span className="font-semibold">✅ Account Created Successfully!</span><br/>
                Your $4.99/month subscription is ready to activate.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setMode('signin');
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base"
              >
                I've Confirmed - Sign In
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full sm:w-auto bg-gray-100 text-gray-700 px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all text-sm sm:text-base"
              >
                Go Back
              </button>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">
                Didn't receive the email?
              </p>
              <button
                onClick={async () => {
                  try {
                    await supabase.auth.resend({
                      type: 'signup',
                      email: email,
                    });
                    alert('Confirmation email resent! Check your inbox.');
                  } catch (error) {
                    alert('Error resending email. Please try again.');
                  }
                }}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
              >
                Resend Confirmation Email
              </button>
              <p className="text-xs text-gray-400 mt-2">
                Or check your spam folder
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {mode === 'signin' ? 'Sign In' : 'Start Your AI Journey'}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base px-2">
            {mode === 'signin' 
              ? 'Access your 20 AI tools for $4.99/month' 
              : 'Join thousands using our enterprise AI tools'
            }
          </p>
        </div>

        {mode === 'signup' && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">AI Tools Bundle</h3>
                <p className="text-sm text-gray-600">20 professional AI tools</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">$4.99</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm text-gray-600">
              <CreditCard className="w-4 h-4 mr-2" />
              <span>Secure payment with Stripe • Cancel anytime</span>
            </div>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4 sm:space-y-6">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 sm:pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400 text-sm sm:text-base"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                    placeholder="Your company (optional)"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="you@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
          >
            {loading 
              ? 'Processing...' 
              : mode === 'signin' 
                ? 'Sign In' 
                : 'Continue to Payment'
            }
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {mode === 'signup' && (
          <div className="mt-4 text-center text-xs text-gray-500">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </div>
        )}
      </div>
    </div>
  );
}