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
    // Check if user is authenticated but always show landing page first
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (session?.user && showAuthModal) {
          setShowAuthModal(false);
          setShowLandingPage(false); // Go to dashboard after successful login
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSelectedTool(null);
    setShowLandingPage(true);
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
        <title>AI Tools Bundle - 20 Professional AI Tools for $4.99/month</title>
        <meta 
          name="description" 
          content="Access 20 professional AI tools including Blog Generator, Social Media AI, Ad Copy Creator, Email Marketing AI, and more. $4.99/month - Save $127+ monthly." 
        />
        <meta name="keywords" content="AI tools, content generation, blog writing, social media, email marketing, business automation, artificial intelligence, content creation, marketing tools, subscription" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => {}} // Can't close without auth
          onSuccess={handleAuthSuccess}
          initialMode={authMode}
        />
        
        {showLandingPage ? (
          /* AI Tools Bundle Landing Page */
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🚀</div>
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">AI Tools Bundle</h1>
                      <p className="text-sm text-gray-600">20 Professional AI Tools</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href="/dataset" className="text-gray-600 hover:text-gray-800 font-semibold">Somali Dataset</a>
                    {user ? (
                      <button
                        onClick={() => setShowLandingPage(false)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
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
                          className="text-gray-600 hover:text-gray-800 font-semibold"
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => {
                            setAuthMode('signup');
                            setShowAuthModal(true);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
                        >
                          Start Free Trial
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
              <div className="text-center">
                <div className="text-6xl mb-6">🤖</div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Stop Paying <span className="text-red-600">$120+/month</span> for AI Tools
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
                  Get all 20 professional AI tools for just <span className="font-bold text-blue-600">$4.99/month</span>
                </p>
                
                {/* Main CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                  >
                    Start Free Trial - $4.99/month
                  </button>
                  {user && (
                    <button
                      onClick={() => setShowLandingPage(false)}
                      className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all"
                    >
                      Access My Tools →
                    </button>
                  )}
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {/* Tool Categories */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Creation</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Blog Post Generator</li>
                    <li>• Social Media AI</li>
                    <li>• Email Marketing AI</li>
                    <li>• SEO Content Writer</li>
                    <li>• Ad Copy Creator</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl mb-4">💼</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Tools</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Pitch Deck Creator</li>
                    <li>• Invoice Generator</li>
                    <li>• Meeting AI Recorder</li>
                    <li>• Business Plan AI</li>
                    <li>• Contract Generator</li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl mb-4">🎨</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Creative & Design</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li>• Logo Generator</li>
                    <li>• Image Creator AI</li>
                    <li>• Video Script Writer</li>
                    <li>• Brand Voice AI</li>
                    <li>• + 6 More Tools</li>
                  </ul>
                </div>
              </div>

              {/* Pricing Comparison */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                  Why Pay More for Individual Tools?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-red-600 mb-4">❌ Other AI Tools:</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex justify-between">
                        <span>ChatGPT Plus</span>
                        <span className="font-semibold">$29/month</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Jasper AI</span>
                        <span className="font-semibold">$49/month</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Copy.ai</span>
                        <span className="font-semibold">$39/month</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Canva Pro</span>
                        <span className="font-semibold">$15/month</span>
                      </li>
                      <li className="flex justify-between border-t pt-3">
                        <span className="font-bold">Total:</span>
                        <span className="font-bold text-red-600">$132/month</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-4">✅ AI Tools Bundle:</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex justify-between">
                        <span>20 Professional AI Tools</span>
                        <span className="font-semibold">$4.99/month</span>
                      </li>
                      <li className="flex justify-between">
                        <span>All Features Included</span>
                        <span className="text-green-600">✓</span>
                      </li>
                      <li className="flex justify-between">
                        <span>No Setup Fees</span>
                        <span className="text-green-600">✓</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Cancel Anytime</span>
                        <span className="text-green-600">✓</span>
                      </li>
                      <li className="flex justify-between border-t pt-3">
                        <span className="font-bold">You Save:</span>
                        <span className="font-bold text-green-600">$127/month</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="text-center mt-8">
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105"
                  >
                    Get Started - Save $127/month!
                  </button>
                </div>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Please Sign In
              </h1>
              <p className="text-gray-600 mb-8">
                Access your AI tools dashboard
              </p>
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