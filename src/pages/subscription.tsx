import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  Star, 
  Zap, 
  Shield,
  Users,
  TrendingUp,
  Building2,
  Crown,
  Sparkles,
  Globe,
  Clock
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { useSubscription } from '../hooks/useSubscription';
import AuthModal from '../components/AuthModal';

export default function SubscriptionPage() {
  const [user, setUser] = useState<User | null>(null);
  const subscription = useSubscription(user);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const plans = [
    {
      name: 'Video Meetings Unlimited',
      description: 'Professional video conferencing - Better than Zoom at 33% less',
      monthlyPrice: 9.99,
      annualPrice: 99.90,
      popular: true,
      features: [
        'Unlimited meeting hours - No time limits!',
        'HD video & crystal clear audio',
        'Screen sharing & presentations',
        'Up to 100 participants per call',
        'No 40-minute restrictions',
        'Record meetings unlimited',
        'Virtual backgrounds',
        'End-to-end encryption',
        'Works on all devices - no downloads',
        'Mobile apps (iOS & Android)',
        '24/7 availability',
        'Priority support',
        'Custom meeting links'
      ],
      limitations: [],
      cta: 'Start Unlimited Meetings',
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      name: 'AI Tools Pro',
      description: 'Complete AI toolkit for businesses and entrepreneurs',
      monthlyPrice: 7.99,
      annualPrice: 79.99,
      popular: false,
      features: [
        'Access to all 20 powerful AI tools',
        'Unlimited usage - no limits',
        'Professional content generation',
        'Blog posts, social media, emails',
        'Business documents & proposals',
        'Marketing copy & advertisements',
        'Translation & communication tools',
        'Customer service responses',
        'Meeting summaries & reports',
        'Premium support included',
        'Mobile & desktop access',
        'Export in all formats',
        'Commercial usage rights'
      ],
      limitations: [],
      cta: 'Start Your AI Business',
      gradient: 'from-purple-600 to-pink-600'
    }
  ];

  const handleSubscribe = async (planName: string, price: number) => {
    if (!user) {
      // Show login modal
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }

    if (planName === 'Enterprise') {
      // Contact sales for enterprise
      window.location.href = 'mailto:sales@somaidata.com?subject=Enterprise Plan Inquiry';
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: user.email, 
          userId: user.id,
          planName,
          billingCycle
        })
      });
      const { url } = await response.json();
      if (url) window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription options...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Enterprise Subscription Plans - Somai Data</title>
        <meta name="description" content="Choose the perfect plan for your business. From startups to enterprise - we have AI tools for every scale." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Header */}
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Somai Data
                </span>
              </Link>
              
              <div className="flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                    <Link 
                      href="/"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setAuthMode('signin');
                        setShowAuthModal(true);
                      }}
                      className="bg-white text-blue-600 border-2 border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setShowAuthModal(true);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 font-semibold text-sm mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Trusted by 10,000+ professionals worldwide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              20 Powerful AI Tools
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"> for Just $7.99</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Transform your business with our complete AI toolkit. Blog posts, social media, emails, marketing copy, translations and more - all for the price of a premium coffee!
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-16">
              <span className={`font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  billingCycle === 'annual' ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <div className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
              <span className={`font-medium ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                Save 20%
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
              {plans.map((plan, index) => (
                <div 
                  key={plan.name}
                  className="relative bg-white rounded-3xl shadow-xl border-2 border-blue-500 ring-4 ring-blue-500/20 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                        <Crown className="w-4 h-4" />
                        <span>Limited Time Offer</span>
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center">
                          <span className="text-5xl font-black text-gray-900">
                            ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                          </span>
                          <span className="text-gray-600 ml-2">
                            /{billingCycle === 'monthly' ? 'month' : 'year'}
                          </span>
                        </div>
                        {billingCycle === 'annual' && (
                          <p className="text-sm text-emerald-600 font-semibold mt-2">
                            Save $16 per year (2 months free!)
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleSubscribe(plan.name, billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice)}
                        className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
                          plan.popular
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        <span>{plan.cta}</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <Check className="w-5 h-5 text-emerald-500 mr-2" />
                        What's included:
                      </h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Trusted by Enterprise Leaders
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join Fortune 500 companies using our AI platform to transform their operations
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Enterprise Security</h3>
                <p className="text-gray-400 text-sm">SOC2, GDPR compliant with enterprise-grade encryption</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Team Collaboration</h3>
                <p className="text-gray-400 text-sm">Seamless team workflows with role-based permissions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-400 text-sm">Deep insights and performance metrics for data-driven decisions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-400 text-sm">Dedicated support team with guaranteed response times</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3">Can I change my plan anytime?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate the billing accordingly.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3">Is there a free trial?</h3>
                <p className="text-gray-600">Yes! All plans come with a 14-day free trial. No credit card required to start.</p>
              </div>
              
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold mb-3">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, PayPal, and wire transfers for enterprise customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Link href="/" className="inline-flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">Somai Data</span>
            </Link>
            
            <p className="text-gray-400 mb-8">
              Transforming businesses with enterprise-grade AI tools
            </p>
            
            <div className="flex justify-center space-x-8 text-sm">
              <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              © 2024 Somai Data. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          // Refresh the page to update user state
          window.location.reload();
        }}
        initialMode={authMode}
      />
    </>
  );
}