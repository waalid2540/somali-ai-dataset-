// AI Tools Bundle - Main Homepage
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import AuthModal from '../components/AuthModal';
import AIToolsDashboard from '../components/AIToolsDashboard';
import AIToolInterface from '../components/AIToolInterface';
import AIToolsEngine, { AIToolConfig } from '../services/ai-tools-engine';

function HomePage() {
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [userSubscription] = useState<'pro'>('pro');
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [showLandingPage, setShowLandingPage] = useState(true);

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
        if (session?.user && showAuthModal) {
          setShowAuthModal(false);
          setShowLandingPage(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [showAuthModal]);

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
    setShowLandingPage(false);
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
        <title>20 AI Tools - $4.99/month - Professional AI Bundle</title>
        <meta 
          name="description" 
          content="Get $120+ worth of AI tools for just $4.99/month. No setup fees! Stop paying hundreds for individual AI tools." 
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => {}}
          onSuccess={handleAuthSuccess}
          initialMode={authMode}
        />
        
        {showLandingPage ? (
          <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
            {/* Header */}
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center">
                <div className="text-xl font-bold">AI Tools Bundle</div>
                <div className="flex gap-4">
                  <a href="/dataset" className="text-blue-200 hover:text-white">Somali Dataset</a>
                  {user ? (
                    <button
                      onClick={() => setShowLandingPage(false)}
                      className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50"
                    >
                      Go to Dashboard
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setAuthMode('signin');
                          setShowAuthModal(true);
                        }}
                        className="text-blue-200 hover:text-white font-semibold"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          setAuthMode('signup');
                          setShowAuthModal(true);
                        }}
                        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50"
                      >
                        Start Free Trial
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 text-center">
              <h1 className="text-6xl font-bold mb-4">20 AI TOOLS</h1>
              <h2 className="text-4xl font-bold mb-6">ONE PRICE</h2>
              <p className="text-2xl mb-8">
                Get $120+ worth of AI tools for just <span className="text-yellow-300 font-bold">$4.99/MONTH</span>
              </p>
              
              <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-12 max-w-2xl mx-auto">
                <p className="text-xl mb-6">
                  <strong>MONTHLY SUBSCRIPTION!</strong> Stop paying hundreds for individual AI tools. Get access to everything you need.
                </p>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div>
                    <div className="text-4xl font-bold text-yellow-300">20</div>
                    <div className="text-sm">Premium AI Tools</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-yellow-300">96%</div>
                    <div className="text-sm">Cost Savings</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-yellow-300">$115+</div>
                    <div className="text-sm">You Save Monthly</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-yellow-300">24/7</div>
                    <div className="text-sm">Support</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="bg-yellow-400 text-gray-900 px-12 py-4 rounded-xl text-2xl font-bold hover:bg-yellow-300 transition-all mb-4"
                >
                  GET ALL 20 TOOLS NOW
                </button>

                <div className="text-sm mb-6">
                  ⚡ Instant access • 🔒 30-day money back guarantee • 💰 Monthly subscription
                </div>

                <div className="bg-red-500 text-white px-6 py-2 rounded-full inline-block font-bold">
                  🔥 LIMITED TIME: Save $115+/month
                </div>
              </div>

              <p className="text-lg mb-12">
                Join 10,000+ professionals who chose subscription over expensive individual tools
              </p>

              {/* Tools Section */}
              <div className="bg-white text-gray-900 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-6">20 POWERFUL AI TOOLS</h3>
                <p className="text-lg mb-8">
                  Live chatbots alone cost $50+/month. You get that PLUS 19 other professional tools for just $4.99/month!
                </p>

                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-blue-600">If you bought these tools separately:</h4>
                    <ul className="space-y-2">
                      <li>ChatGPT Plus: $29/month</li>
                      <li>Jasper AI: $49/month</li>
                      <li>Copy.ai: $39/month</li>
                      <li>Canva Pro: $15/month</li>
                      <li>+ 16 other tools...</li>
                    </ul>
                    <div className="text-2xl font-bold text-red-600 mt-4">$120+ monthly</div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold mb-4 text-green-600">You get ALL tools for:</h4>
                    <div className="text-6xl font-bold text-green-600 mb-4">$4.99</div>
                    <div className="text-xl text-green-600 mb-4">per month</div>
                    <div className="bg-green-100 p-4 rounded-lg">
                      <div className="text-lg font-bold text-green-700">You save $115+ monthly!</div>
                      <div className="text-sm text-green-600">That's 96% cost reduction</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all mt-8"
                >
                  Start Free Trial - $4.99/month
                </button>
              </div>
            </div>
          </div>
        ) : user ? (
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
              onBackToLanding={() => setShowLandingPage(true)}
            />
          )
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-6">🔐</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Sign In</h1>
              <p className="text-gray-600 mb-8">Access your AI tools dashboard</p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;