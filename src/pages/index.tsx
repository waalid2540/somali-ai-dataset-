// AI Market Tools - Professional Enterprise Landing Page
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import AuthModal from '../components/AuthModal';
import AIToolsDashboard from '../components/AIToolsDashboard';
import AIToolInterface from '../components/AIToolInterface';
import AIToolsEngine, { AIToolConfig } from '../services/ai-tools-engine';
import { useSubscription } from '../hooks/useSubscription';
import EnterpriseLandingPage from '../components/EnterpriseLandingPage';
import BarakahAgentsDashboard from '../components/BarakahAgentsDashboard';

function HomePage() {
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const subscription = useSubscription(user);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [showBarakahAgents, setShowBarakahAgents] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
      
      // Check URL parameters for direct access
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('access') === 'tools' && session?.user) {
        setShowLandingPage(false);
      }
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
    
    // Users can access tools with free limits, no subscription required initially
    setSelectedTool(tool);
  };

  const handleBackToDashboard = () => {
    setSelectedTool(null);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowLandingPage(false);
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    
    if (section === 'ai-agents') {
      if (!user) {
        setAuthMode('signup');
        setShowAuthModal(true);
        return;
      }
      setShowBarakahAgents(true);
      setShowLandingPage(false);
    } else if (section === 'ai-tools') {
      setShowLandingPage(false);
    } else if (section === 'tutorial-studio') {
      if (!user) {
        setAuthMode('signup');
        setShowAuthModal(true);
        return;
      }
      const aiEngine = new AIToolsEngine();
      const toolConfig = aiEngine.getToolConfig('tutorial-studio');
      if (toolConfig) {
        setSelectedTool(toolConfig);
        setShowLandingPage(false);
      }
    } else if (section === 'dashboard') {
      setShowLandingPage(false);
      setShowBarakahAgents(false);
    }
  };

  const handleShowAuth = () => {
    setAuthMode('signup');
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
        <title>Somali AI | Enterprise AI Solutions for Business Growth</title>
        <meta name="description" content="Transform your business with AI Agents, AI Tools, Business Creation Suite, and Somali Dataset. Start with Tutorial Studio - FREE forever." />
        <meta name="keywords" content="AI tools, artificial intelligence, content creation, business automation, chatbot, social media AI, blog generator" />
        
        {/* Enhanced Mobile Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Somali AI Tools" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Favicons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Somali AI - Enterprise AI Solutions for Business Growth" />
        <meta property="og:description" content="Transform your business with AI Agents, AI Tools, Business Creation Suite, and Somali Dataset." />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://www.somaidata.com" />
        <meta property="og:site_name" content="Somali AI" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Somali AI - Enterprise AI Solutions for Business Growth" />
        <meta name="twitter:description" content="Transform your business with AI Agents, AI Tools, Business Creation Suite, and Somali Dataset." />
        <meta name="twitter:image" content="/images/twitter-card.jpg" />
      </Head>

      <div className="min-h-screen bg-white">
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => {}}
          onSuccess={handleAuthSuccess}
          initialMode={authMode}
        />
        
        {showLandingPage ? (
          <EnterpriseLandingPage 
            user={user}
            onShowAuth={handleShowAuth}
            onNavigate={handleNavigate}
          />
        ) : showBarakahAgents ? (
          <BarakahAgentsDashboard 
            onBackToLanding={() => {
              setShowLandingPage(true);
              setShowBarakahAgents(false);
            }}
          />
        ) : user ? (
          // Allow free users to access tools with usage limits (no subscription blocking)
          selectedTool ? (
            <AIToolInterface 
              tool={selectedTool}
              onBack={handleBackToDashboard}
              userSubscription={subscription.hasActiveSubscription ? "pro" : "free"}
            />
          ) : (
            <AIToolsDashboard 
              onToolSelect={handleToolSelect}
              userSubscription={subscription.hasActiveSubscription ? "pro" : "free"}
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