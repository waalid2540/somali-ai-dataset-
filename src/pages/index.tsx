// AI Tools Bundle - Original Design with $4.99/month pricing
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
          content="Get $120+ worth of AI tools for just $4.99/month. 97% cost reduction! Professional AI Market Tools." 
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
          <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white border-b border-gray-200 py-4">
              <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="text-xl font-bold text-blue-600">Somali AI Dataset</div>
                <div className="hidden md:flex space-x-6">
                  <a href="#" className="text-blue-600 font-semibold">Professional AI Market Tools</a>
                  <a href="#about" className="text-gray-600 hover:text-gray-800">About</a>
                  <a href="/dataset" className="text-gray-600 hover:text-gray-800">Dataset</a>
                  <a href="#pricing" className="text-gray-600 hover:text-gray-800">Pricing</a>
                  <a href="#investors" className="text-gray-600 hover:text-gray-800">Investors</a>
                  {user ? (
                    <button
                      onClick={() => setShowLandingPage(false)}
                      className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                    >
                      My Tools
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setShowAuthModal(true);
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700"
                    >
                      Try Tools
                    </button>
                  )}
                </div>
              </div>
            </nav>

            {/* Alert Banner */}
            <div className="bg-red-600 text-white text-center py-2">
              <span className="font-bold">🔥 SAVE $115+ MONTHLY • 97% COST REDUCTION</span>
            </div>

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
              <div className="container mx-auto px-4 text-center">
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
                      <div className="text-4xl font-bold text-yellow-300">97%</div>
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
                    🔥 LIMITED TIME: 75% OFF
                  </div>
                </div>

                <p className="text-lg mb-8">
                  Join 10,000+ professionals who chose subscription over expensive individual tools
                </p>
              </div>
            </div>

            {/* Tools Section */}
            <div className="bg-white py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h3 className="text-4xl font-bold mb-6">20 POWERFUL AI TOOLS</h3>
                  <p className="text-xl mb-8">
                    Live chatbots alone cost $50+/month. You get that PLUS 19 other professional tools for just $4.99/month!
                  </p>

                  <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
                    <div className="text-left">
                      <h4 className="text-xl font-bold mb-4 text-red-600">If you bought these tools separately:</h4>
                      <div className="text-3xl font-bold text-red-600 mb-4">$120+ monthly</div>
                      <p className="text-gray-600">(Individual subscriptions cost $15-50/month each)</p>
                    </div>
                    
                    <div className="text-left">
                      <h4 className="text-xl font-bold mb-4 text-green-600">Our price:</h4>
                      <div className="text-3xl font-bold text-green-600 mb-4">$4.99/MONTH</div>
                      <div className="text-xl font-bold text-green-600">YOU SAVE $115+ MONTHLY</div>
                    </div>
                  </div>
                </div>

                {/* Tool Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
                  {/* Content Creation Tools */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">📝</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Blog Post Generator</h4>
                    <p className="text-sm text-gray-600 mb-3">SEO-optimized blog posts</p>
                    <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">Content Creation</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">📱</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Social Media AI</h4>
                    <p className="text-sm text-gray-600 mb-3">Platform-specific content</p>
                    <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">Content Creation</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">📢</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Ad Copy Creator</h4>
                    <p className="text-sm text-gray-600 mb-3">High-converting advertisements</p>
                    <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">Content Creation</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">📧</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Email Marketing AI</h4>
                    <p className="text-sm text-gray-600 mb-3">Email campaigns & sequences</p>
                    <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">Content Creation</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">🛍️</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Product Description AI</h4>
                    <p className="text-sm text-gray-600 mb-3">Converting product copy</p>
                    <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-2">Content Creation</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  {/* Business Operations Tools */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">📄</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Invoice Generator AI</h4>
                    <p className="text-sm text-gray-600 mb-3">Professional invoicing</p>
                    <div className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mb-2">Business Operations</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">📋</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Contract Creator AI</h4>
                    <p className="text-sm text-gray-600 mb-3">Legal agreements</p>
                    <div className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mb-2">Business Operations</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">💼</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Proposal Writer AI</h4>
                    <p className="text-sm text-gray-600 mb-3">Winning proposals</p>
                    <div className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mb-2">Business Operations</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  {/* Premium Tool - Highlighted */}
                  <div className="border-2 border-red-500 bg-red-50 rounded-lg p-6">
                    <div className="text-3xl mb-3">💬</div>
                    <div className="text-sm text-red-500 mb-1">Worth $500/mo</div>
                    <div className="text-xs bg-red-500 text-white px-2 py-1 rounded mb-2">🔥 PREMIUM TOOL</div>
                    <h4 className="font-bold mb-2">Live Chatbot Creator</h4>
                    <p className="text-sm text-gray-600 mb-3">Live website chatbots (use your OpenAI key)</p>
                    <div className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded mb-2">Communication</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  {/* More tools... */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">🌍</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Translation AI</h4>
                    <p className="text-sm text-gray-600 mb-3">Multi-language support</p>
                    <div className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded mb-2">Communication</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="text-3xl mb-3">📊</div>
                    <div className="text-sm text-gray-500 mb-1">Worth $40/mo</div>
                    <h4 className="font-bold mb-2">Presentation AI</h4>
                    <p className="text-sm text-gray-600 mb-3">Professional presentations</p>
                    <div className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded mb-2">Creative & Design</div>
                    <div className="text-green-600 font-bold">INCLUDED</div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="text-center mb-16">
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl text-2xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all mb-4"
                  >
                    GET ALL 20 TOOLS
                  </button>
                  <div className="text-3xl font-bold text-green-600 mb-2">$4.99/month</div>
                  <div className="text-gray-600 mb-4">Instead of $120+ monthly in subscriptions</div>
                  <div className="text-sm text-gray-500">
                    ⚡ Instant access to all tools • 🚀 No setup required • 💰 Monthly subscription
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Section */}
            <div className="bg-gray-50 py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">STOP OVERPAYING!</h3>
                  <p className="text-xl">Why pay $120+ monthly for subscriptions when you can get EVERYTHING for $4.99/MONTH?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="bg-white border border-red-200 rounded-lg p-8">
                    <h4 className="text-xl font-bold text-red-600 mb-4">❌ OTHER PROVIDERS</h4>
                    <div className="text-3xl font-bold text-red-600 mb-4">$120+ monthly</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>• Jasper AI: $49/month</li>
                      <li>• Copy.ai: $49/month</li>
                      <li>• Writesonic: $45/month</li>
                      <li>• Grammarly: $30/month</li>
                      <li>• Notion AI: $20/month</li>
                      <li>• + 15 more tools...</li>
                    </ul>
                    <div className="font-bold">TOTAL: $120+/month</div>
                  </div>

                  <div className="bg-white border-2 border-green-500 rounded-lg p-8">
                    <h4 className="text-xl font-bold text-green-600 mb-4">🔥 OUR OFFER</h4>
                    <div className="text-3xl font-bold text-green-600 mb-4">$4.99/month</div>
                    <ul className="space-y-2 text-sm mb-4">
                      <li>• ✅ ALL 20 AI Tools Included</li>
                      <li>• ✅ Blog Post Generator</li>
                      <li>• ✅ Social Media AI</li>
                      <li>• ✅ Ad Copy Creator</li>
                      <li>• ✅ Email Marketing AI</li>
                      <li>• ✅ + 15 more premium tools</li>
                    </ul>
                    <div className="font-bold text-green-600">SAVE $115+ MONTHLY!</div>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <div className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg inline-block mb-4">
                    <div className="font-bold text-lg">⚡ LIMITED TIME OFFER ⚡</div>
                    <div>Get ALL 20 Tools for 97% OFF</div>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setShowAuthModal(true);
                      }}
                      className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:from-green-700 hover:to-blue-700 transition-all"
                    >
                      CLAIM YOUR 97% DISCOUNT
                    </button>
                  </div>
                  <div className="text-sm text-gray-500 mt-4">
                    ⚡ Instant access • 🚀 No contracts • 💰 30-day money back guarantee
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-4">1000+ BUSINESSES ALREADY SAVING THOUSANDS!</h3>
                  <p className="text-xl">Trusted by Enterprise Leaders</p>
                  <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
                  <div className="font-semibold">4.9/5 from 500+ organizations</div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">"Somali AI Dataset's market tools saved us $80+ monthly. The Enterprise AI suite transformed our operations completely."</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-3">AH</div>
                      <div>
                        <div className="font-semibold">Ahmed Hassan</div>
                        <div className="text-sm text-gray-500">CEO, TechStart Somalia</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">"Professional-grade AI tools with Somali language support. Perfect for our expanding East African operations."</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold mr-3">FA</div>
                      <div>
                        <div className="font-semibold">Fatima Ali</div>
                        <div className="text-sm text-gray-500">Marketing Director, Global Ventures</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">"20 enterprise tools for $4.99/month? This is incredible value. Our productivity increased 300% in the first month."</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-3">OM</div>
                      <div>
                        <div className="font-semibold">Omar Mohamud</div>
                        <div className="text-sm text-gray-500">Startup Founder, Innovation Hub</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enterprise Section */}
            <div className="bg-blue-600 text-white py-16">
              <div className="container mx-auto px-4 text-center">
                <h3 className="text-3xl font-bold mb-6">Ready for Enterprise AI Tools?</h3>
                <p className="text-xl mb-8">Join 500+ organizations using Somali AI Dataset's professional market tools suite.</p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <h4 className="font-bold mb-2">Enterprise Trial</h4>
                    <p className="text-blue-200">Full access for 14 days</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Enterprise SLA</h4>
                    <p className="text-blue-200">99.9% uptime guarantee</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Professional Support</h4>
                    <p className="text-blue-200">Dedicated account manager</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setAuthMode('signup');
                    setShowAuthModal(true);
                  }}
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
                >
                  Start Enterprise Trial
                </button>
              </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <h4 className="font-bold mb-4">Somali AI Dataset</h4>
                    <p className="text-gray-400">Professional AI Market Tools for enterprise organizations. Building the future of AI-powered business automation.</p>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4">Enterprise</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>AI Market Tools</li>
                      <li>Tools Suite</li>
                      <li>Meeting AI</li>
                      <li>Investors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>About</li>
                      <li>Dataset</li>
                      <li>Support</li>
                      <li>Contact</li>
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  <p>© 2024 Somali AI Dataset. Professional AI Market Tools. All rights reserved.</p>
                </div>
              </div>
            </footer>
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