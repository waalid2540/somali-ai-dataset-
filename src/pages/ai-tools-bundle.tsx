// AI Tools Bundle - Enterprise SaaS with Authentication
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { supabase } from '../lib/supabase';
import AuthModal from '../components/AuthModal';
import AIToolsDashboard from '../components/AIToolsDashboard';
import AIToolInterface from '../components/AIToolInterface';
import AIToolsEngine, { AIToolConfig } from '../services/ai-tools-engine';

function AIToolsBundlePage() {
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [userSubscription] = useState<'pro'>('pro');
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);

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
              user={user}
              onSignOut={handleSignOut}
            />
          )
        ) : (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <div className="text-6xl mb-6">🚀</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                20 AI Tools for $4.99/month
              </h1>
              <p className="text-gray-600 mb-8">
                Sign in to access your enterprise AI tools suite
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AIToolsBundlePage;