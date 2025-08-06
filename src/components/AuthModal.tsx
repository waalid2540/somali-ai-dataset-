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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

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
        // Sign up new user with immediate user table creation
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              company_name: companyName,
            }
          }
        });

        if (authError) throw authError;

        // Create profile immediately (don't wait for email confirmation)
        if (authData.user) {
          console.log('Creating user profile for:', authData.user.id, email);
          
          const { data: insertData, error: profileError } = await supabase
            .from('users')
            .insert([
              {
                id: authData.user.id,
                email: email,
                full_name: fullName || '',
                company_name: companyName || '',
                subscription_status: 'pending'
              }
            ])
            .select(); // Add select to see what was inserted

          console.log('Insert result:', insertData, profileError);

          if (profileError) {
            console.error('Profile creation error:', profileError);
            
            // Handle specific error cases with friendly messages
            if (profileError.message?.includes('duplicate key') || profileError.message?.includes('already exists')) {
              setError('🎉 Welcome back! We\'ve sent a confirmation email to your inbox. Please check your email and click the confirmation link to activate your account.');
            } else if (profileError.message?.includes('email')) {
              setError('❌ Please enter a valid email address.');
            } else {
              setError('❌ Something went wrong. Please check your information and try again.');
            }
            
            setLoading(false);
            return;
          } else {
            console.log('User profile created successfully:', insertData);
          }

          // Show confirmation message for email verification
          setShowConfirmation(true);
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

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setResetEmailSent(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Show forgot password screen
  if (showForgotPassword) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🔑</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {resetEmailSent ? 'Check Your Email' : 'Reset Password'}
            </h2>
            <p className="text-gray-600">
              {resetEmailSent 
                ? `We've sent a password reset link to ${email}`
                : 'Enter your email to receive a password reset link'
              }
            </p>
          </div>

          {resetEmailSent ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  ✅ Password reset email sent! Check your inbox and spam folder.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowForgotPassword(false);
                  setResetEmailSent(false);
                  setMode('signin');
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-6">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@company.com"
                    required
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
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setMode('signin');
                }}
                className="w-full text-gray-600 hover:text-gray-800 font-medium"
              >
                ← Back to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

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
            <p className="text-gray-600 mb-6 leading-relaxed text-base">
              We've sent a <strong>confirmation email</strong> to:<br/>
              <span className="font-semibold text-blue-600 break-all text-lg">{email}</span>
            </p>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-6 text-left">
              <h3 className="font-bold text-blue-900 mb-4 text-lg flex items-center">
                📋 Complete Your Registration
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <p className="text-blue-800 text-sm"><strong>Check your email inbox</strong> (and spam folder if needed)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <p className="text-blue-800 text-sm">Look for an email from <strong>"Somai Data"</strong></p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <p className="text-blue-800 text-sm">Click the <strong>"Confirm Your Account"</strong> button in the email</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <p className="text-blue-800 text-sm">Return here to complete your <strong>$7.99/month Advanced AI Suite subscription</strong></p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                  ✓
                </div>
                <div>
                  <p className="text-green-800 font-bold">Account Created Successfully!</p>
                  <p className="text-green-700 text-sm">You're one step away from accessing all 20 AI tools</p>
                </div>
              </div>
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
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Didn't receive the email?</strong>
                </p>
                <div className="space-y-2">
                  <button
                    onClick={async () => {
                      try {
                        await supabase.auth.resend({
                          type: 'signup',
                          email: email,
                        });
                        alert('✅ Confirmation email resent successfully! Please check your inbox and spam folder.');
                      } catch (error) {
                        alert('❌ Error resending email. Please try again or contact support.');
                      }
                    }}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    📧 Resend Confirmation Email
                  </button>
                  <p className="text-xs text-gray-500">
                    Check your spam/junk folder • Email usually arrives within 2 minutes
                  </p>
                </div>
              </div>
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
                <h3 className="font-semibold text-gray-900">Advanced AI Suite</h3>
                <p className="text-sm text-gray-600">21 premium AI tools powered by GPT-3.5-turbo</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">$7.99</div>
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

        <div className="mt-6 text-center space-y-3">
          <p className="text-gray-600">
            {mode === 'signin' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
          
          {mode === 'signin' && (
            <p className="text-gray-600">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot your password?
              </button>
            </p>
          )}
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