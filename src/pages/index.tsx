// Clean, Simple Landing Page for somalidata.com
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  ArrowRight, 
  Check, 
  Star, 
  Zap, 
  Globe,
  Video,
  Mic,
  Brain,
  Shield,
  Users,
  Play
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import AuthModal from '../components/AuthModal';

export default function CleanLanding() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');


  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Session:', session);
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>Somali AI Dataset - Professional AI Tools for $4.99/month</title>
        <meta name="description" content="Professional Somali AI dataset with 20+ AI tools, Tutorial Studio, and Voice Clone Studio. Start free, upgrade for $4.99/month." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <header className="relative z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Somali AI Dataset
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                {user ? (
                  <Link
                    href="/dashboard"
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-emerald-700 hover:to-blue-700 transition-all"
                  >
                    Get Started Free
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-900/50 rounded-full border border-blue-500/30 text-blue-300 text-sm font-medium mb-8">
                <Star className="w-4 h-4 mr-2" />
                All-in-One AI Toolkit
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  AI Tools + Studios
                </span>
                <br />
                Everything in One Place
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Get 20+ AI tools, Tutorial Studio, and Voice Clone Studio. 
                Start free with 5 daily uses, then upgrade to unlimited for just $4.99/month.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center"
                >
                  Start Free (5 uses/day)
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                
                <div className="text-gray-400 text-sm">
                  No credit card required
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Three Main Products */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Three Powerful Studios in One
              </h2>
              <p className="text-gray-300 text-lg">
                Everything you need to build, create, and grow your business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Tools */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">20+ AI Tools</h3>
                <p className="text-gray-300 mb-6">
                  Logo generator, ad copy, invoices, and more. All powered by advanced AI.
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> Logo Generator</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> Ad Copy Writer</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> Invoice Generator</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> And 17 more tools</li>
                </ul>
              </div>

              {/* Tutorial Studio */}
              <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 rounded-2xl p-8 border border-red-700 hover:border-red-600 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Tutorial Studio</h3>
                <p className="text-gray-300 mb-6">
                  Record professional demo videos of your SaaS products with ease.
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> Screen Recording</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> Professional Templates</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> Easy Editing</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> Export & Share</li>
                </ul>
              </div>

              {/* Voice Clone Studio */}
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-800/50 rounded-2xl p-8 border border-purple-700 hover:border-purple-600 transition-all">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Voice Clone Studio</h3>
                <p className="text-gray-300 mb-6">
                  Clone your Somali voice and create AI assistants that speak like you.
                </p>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> Voice Cloning</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> AI Assistant</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> Somali Support</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-emerald-400 mr-2" /> High Quality</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Pricing */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-gray-300 text-lg">
                Start free, upgrade when you're ready
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Free Plan */}
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Free Plan</h3>
                  <div className="text-4xl font-bold text-gray-400 mb-4">$0</div>
                  <p className="text-gray-300">Perfect for trying out the tools</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-400 mr-3" />
                    5 AI tool uses per day
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-400 mr-3" />
                    Access to all studios
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-400 mr-3" />
                    Basic support
                  </li>
                </ul>
                
                <button
                  onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Start Free
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-gradient-to-br from-blue-900/50 to-emerald-900/50 rounded-2xl p-8 border-2 border-emerald-500 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
                  <div className="text-4xl font-bold text-emerald-400 mb-4">
                    $4.99
                    <span className="text-lg text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-300">Everything you need to scale</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-400 mr-3" />
                    Unlimited AI tool usage
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-400 mr-3" />
                    Full Tutorial Studio access
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-400 mr-3" />
                    Voice Clone Studio unlimited
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-emerald-400 mr-3" />
                    Priority support
                  </li>
                </ul>
                
                <button
                  onClick={() => window.location.href = '/subscription'}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-900/50 to-emerald-900/50 rounded-2xl p-12 border border-blue-500/30">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Join thousands of creators using our AI-powered toolkit to build their dreams.
              </p>
              
              <button
                onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 inline-flex items-center"
              >
                Get Started Free Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Somali AI Dataset
                </span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                <a href="/support" className="hover:text-white transition-colors">Support</a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              © 2024 Somali AI Dataset. All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => {
          console.log('Closing auth modal');
          setShowAuthModal(false);
        }}
        onSuccess={() => {
          console.log('Auth success, redirecting to dashboard');
          setShowAuthModal(false);
          router.push('/dashboard');
        }}
        initialMode={authMode}
      />
    </>
  );
}