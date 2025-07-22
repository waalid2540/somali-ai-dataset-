// AI Tools Bundle - Enterprise SaaS with Authentication
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import AuthModal from '../components/AuthModal';
import AIToolsDashboard from '../components/AIToolsDashboard';
import AIToolInterface from '../components/AIToolInterface';
import AIToolsEngine, { AIToolConfig } from '../services/ai-tools-engine';

function AIToolsBundlePage() {
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [userSubscription] = useState<'pro'>('pro');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  useEffect(() => {
    // Check if user is authenticated
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (!session?.user) {
        setShowAuthModal(true);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          setShowAuthModal(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleToolSelect = (tool: AIToolConfig) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedTool(tool);
  };

  const handleBackToDashboard = () => {
    setSelectedTool(null);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSelectedTool(null);
    setShowAuthModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your AI tools...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>AI Tools Bundle - 20 Professional AI Tools for $19.99</title>
        <meta 
          name="description" 
          content="Access 20 professional AI tools including Blog Generator, Social Media AI, Ad Copy Creator, Email Marketing AI, and more. $4.99/month - Save $1,200+ annually." 
        />
        <meta name="keywords" content="AI tools, content generation, blog writing, social media, email marketing, business automation, artificial intelligence, content creation, marketing tools, one-time payment" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => {}} // Can't close without auth
          onSuccess={handleAuthSuccess}
          initialMode={authMode}
        />
        
        {user ? (
          selectedTool ? (
            <AIToolInterface 
              tool={selectedTool}
              onBack={handleBackToDashboard}
              userSubscription={userSubscription}
            />
          ) : (
            <AIToolsDashboard 
              onToolSelect={handleToolSelect}
              userSubscription={userSubscription}
            />
          )
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="text-center max-w-2xl">
              <div className="text-6xl mb-6">🚀</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Stop Paying $120+/month for AI Tools
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                Get 20 Professional AI Tools for just <span className="font-bold text-blue-600">$4.99/month</span>
              </p>
              
              {/* Pain Points */}
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 mb-8 text-left">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">❌ Tired of...</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Paying $29/month for ChatGPT Plus</li>
                  <li>• Spending $49/month on Jasper AI</li>
                  <li>• $39/month for Copy.ai subscriptions</li>
                  <li>• Juggling 10+ different AI tool accounts</li>
                  <li>• Wasting hours on repetitive content tasks</li>
                </ul>
              </div>

              {/* Value Proposition */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">✅ Get Everything in One Place:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>• Blog Generator</div>
                  <div>• Ad Copy Creator</div>
                  <div>• Email Marketing AI</div>
                  <div>• Social Media AI</div>
                  <div>• SEO Content Writer</div>
                  <div>• Logo Generator</div>
                  <div>• Pitch Deck Creator</div>
                  <div>• Invoice Generator</div>
                  <div>• Meeting AI Recorder</div>
                  <div>• + 11 More Tools</div>
                </div>
              </div>

              {/* Savings */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <p className="text-yellow-800 font-semibold">
                  💰 Save $115+/month • 96% Cost Reduction
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Start Free Trial
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signin');
                    setShowAuthModal(true);
                  }}
                  className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all"
                >
                  Sign In
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                No contracts • Cancel anytime • 30-day money back guarantee
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AIToolsBundlePage;