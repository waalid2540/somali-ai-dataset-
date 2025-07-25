// AI Market Tools - Professional Enterprise Landing Page
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  Star, 
  Zap, 
  Globe,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Shield,
  Smartphone,
  BarChart3,
  Building2,
  Mail
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import AuthModal from '../components/AuthModal';
import AIToolsDashboard from '../components/AIToolsDashboard';
import AIToolInterface from '../components/AIToolInterface';
import AIToolsEngine, { AIToolConfig } from '../services/ai-tools-engine';
import { useSubscription } from '../hooks/useSubscription';

function HomePage() {
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const subscription = useSubscription(user);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  const tools = [
    { name: 'Blog Post Generator', icon: '📝', category: 'Content Creation', description: 'SEO-optimized blog posts' },
    { name: 'Social Media AI', icon: '📱', category: 'Content Creation', description: 'Platform-specific content' },
    { name: 'Ad Copy Creator', icon: '📢', category: 'Content Creation', description: 'High-converting advertisements' },
    { name: 'Email Marketing AI', icon: '📧', category: 'Content Creation', description: 'Email campaigns & sequences' },
    { name: 'Product Description AI', icon: '🛍️', category: 'Content Creation', description: 'Converting product copy' },
    { name: 'Invoice Generator AI', icon: '📄', category: 'Business Operations', description: 'Professional invoicing' },
    { name: 'Contract Creator AI', icon: '📋', category: 'Business Operations', description: 'Legal agreements' },
    { name: 'Proposal Writer AI', icon: '💼', category: 'Business Operations', description: 'Winning proposals' },
    { name: 'Resume Builder AI', icon: '📄', category: 'Business Operations', description: 'ATS-optimized resumes' },
    { name: 'Job Description AI', icon: '👔', category: 'Business Operations', description: 'Talent acquisition' },
    { name: 'Business Name Generator', icon: '🏢', category: 'Creative & Design', description: 'Brand naming solutions' },
    { name: 'Slogan Creator AI', icon: '💭', category: 'Creative & Design', description: 'Memorable taglines' },
    { name: 'Presentation AI', icon: '📊', category: 'Creative & Design', description: 'Professional presentations' },
    { name: 'Script Writer AI', icon: '🎬', category: 'Creative & Design', description: 'Video & marketing scripts' },
    { name: 'Newsletter AI', icon: '📰', category: 'Creative & Design', description: 'Engaging newsletters' },
    { name: 'Translation AI', icon: '🌍', category: 'Communication', description: 'Multi-language support' },
    { name: 'Live Chatbot Creator', icon: '💬', category: 'Communication', description: 'Live website chatbots (use your OpenAI key)' },
    { name: 'Meeting Summarizer AI', icon: '📝', category: 'Communication', description: 'Meeting transcription' },
    { name: 'Review Response AI', icon: '⭐', category: 'Communication', description: 'Review management' },
    { name: 'Customer Service AI', icon: '🎧', category: 'Communication', description: 'Support automation' }
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "CEO",
      company: "TechStart Somalia",
      image: "/testimonials/ahmed.jpg",
      content: "Somali AI Dataset's market tools saved us $115+ monthly. The Enterprise AI suite transformed our operations completely.",
      rating: 5
    },
    {
      name: "Fatima Ali", 
      role: "Marketing Director",
      company: "Global Ventures",
      image: "/testimonials/fatima.jpg",
      content: "Professional-grade AI tools with Somali language support. Perfect for our expanding East African operations.",
      rating: 5
    },
    {
      name: "Omar Mohamud",
      role: "Startup Founder",
      company: "Innovation Hub",
      image: "/testimonials/omar.jpg",
      content: "20 enterprise tools for $4.99/month? This is incredible value. Our productivity increased 300% in the first month.",
      rating: 5
    }
  ];

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
    
    // Check if user has active subscription
    if (!subscription.hasActiveSubscription) {
      alert('Please complete your subscription to access AI tools. You will be redirected to payment.');
      window.location.href = '/api/create-checkout-session';
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
        <title>AI Tools Bundle - 20 Professional AI Tools for $4.99/month</title>
        <meta 
          name="description" 
          content="Get 20 professional AI tools for $4.99/month. Content creation, business automation, chatbots, and more. Save $115+ monthly vs individual subscriptions." 
        />
        <meta name="keywords" content="AI tools, artificial intelligence, content creation, business automation, chatbot, social media AI, blog generator" />
        
        {/* PWA Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
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
        <meta property="og:title" content="Somali AI - 20 Professional AI Tools for $4.99/month" />
        <meta property="og:description" content="Get 20 professional AI tools for $4.99/month. Save $115+ monthly vs individual subscriptions." />
        <meta property="og:image" content="/images/og-image.jpg" />
        <meta property="og:url" content="https://somaidataset.com" />
        <meta property="og:site_name" content="Somali AI Dataset" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Somali AI - 20 Professional AI Tools for $4.99/month" />
        <meta name="twitter:description" content="Get 20 professional AI tools for $4.99/month. Save $115+ monthly vs individual subscriptions." />
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
          <div className="min-h-screen bg-white">
            {/* Modern Professional Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-lg shadow-gray-900/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                  {/* Logo Section */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
                        <Globe className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                        AI Tools Bundle
                      </span>
                      <span className="text-xs font-semibold text-gray-500 -mt-1">
                        Professional AI Tools
                      </span>
                    </div>
                  </div>

                  {/* Desktop Navigation */}
                  <div className="hidden lg:flex items-center space-x-1">
                    <Link 
                      href="/#about" 
                      className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                    >
                      About
                    </Link>
                    <Link 
                      href="/dataset" 
                      className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                    >
                      Dataset
                    </Link>
                    <Link 
                      href="/subscription" 
                      className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                    >
                      Pricing
                    </Link>
                    <Link 
                      href="/investor" 
                      className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                    >
                      Investors
                    </Link>
                  </div>

                  {/* Enterprise Navigation */}
                  <div className="flex items-center space-x-4">
                    {user ? (
                      <div className="flex items-center space-x-3">
                        {/* User Profile Dropdown */}
                        <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-blue-50 px-4 py-2 rounded-full border border-emerald-200">
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {user.email?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">Welcome back</span>
                            <span className="text-xs text-gray-600">{user.email}</span>
                          </div>
                          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        </div>

                        {/* Dashboard Button */}
                        <button
                          onClick={() => setShowLandingPage(false)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                        >
                          <Zap className="w-5 h-5" />
                          <span>Dashboard</span>
                        </button>

                        {/* Logout Button */}
                        <button
                          onClick={async () => {
                            await supabase.auth.signOut();
                            setUser(null);
                            setShowLandingPage(true);
                          }}
                          className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-xl font-medium transition-all duration-200 border border-gray-200 hover:border-red-200"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        {/* Professional Login Button */}
                        <button
                          onClick={() => {
                            setAuthMode('signin');
                            setShowAuthModal(true);
                          }}
                          className="bg-white text-gray-700 hover:text-blue-600 px-6 py-3 rounded-2xl font-semibold border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 hidden sm:flex items-center space-x-2"
                        >
                          <Users className="w-4 h-4" />
                          <span>Sign In</span>
                        </button>

                        {/* Premium CTA Button */}
                        <button
                          onClick={() => {
                            setAuthMode('signup');
                            setShowAuthModal(true);
                          }}
                          className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:from-blue-700 hover:via-purple-700 hover:to-emerald-700 text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse"></div>
                          <Zap className="w-5 h-5 relative z-10" />
                          <span className="hidden sm:inline relative z-10">Start Free Trial</span>
                          <span className="sm:hidden relative z-10">Try Free</span>
                          <div className="relative z-10 text-xs bg-yellow-400 text-black px-2 py-1 rounded-full ml-2">
                            $4.99/mo
                          </div>
                        </button>
                      </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                      <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                        <div className="w-6 h-0.5 bg-gray-600 rounded-full"></div>
                        <div className="w-6 h-0.5 bg-gray-600 rounded-full"></div>
                        <div className="w-6 h-0.5 bg-gray-600 rounded-full"></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Overlay - Hidden by default */}
              <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg hidden">
                <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
                  <Link 
                    href="/#about" 
                    className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    About
                  </Link>
                  <Link 
                    href="/dataset" 
                    className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    Dataset
                  </Link>
                  <Link 
                    href="/#pricing" 
                    className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    Pricing
                  </Link>
                  <Link 
                    href="/investor" 
                    className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium"
                  >
                    Investors
                  </Link>
                </div>
              </div>
            </nav>

            {/* Powerful Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 bg-gradient-to-br from-slate-900 via-blue-900 to-black overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500"></div>
              </div>

              <div className="relative z-10 max-w-6xl mx-auto text-center">
                {/* Attention-Grabbing Badge */}
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-300 font-bold text-sm mb-8 animate-bounce">
                  <Zap className="w-4 h-4 mr-2" />
                  🔥 SAVE $780+ MONTHLY • 97% COST REDUCTION
                </div>

                {/* Power Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white mb-6 md:mb-8 leading-tight">
                  <span className="text-yellow-400">20 AI TOOLS</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                    ONE PRICE
                  </span>
                </h1>

                {/* Compelling Value Proposition */}
                <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-200 mb-4 font-semibold px-4">
                  Get <span className="text-yellow-400">$120+ worth</span> of AI tools for just <span className="text-emerald-400 text-2xl sm:text-3xl lg:text-4xl font-bold">$4.99/MONTH</span>
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 md:mb-12 max-w-4xl mx-auto px-4">
                  <strong className="text-yellow-400">MONTHLY SUBSCRIPTION!</strong> Stop paying hundreds for individual AI tools. Get access to everything you need.
                </p>

                {/* Powerful Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 md:mb-16 max-w-4xl mx-auto px-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all">
                    <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-yellow-400 mb-1 sm:mb-2">20</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-300 font-semibold">Premium AI Tools</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all">
                    <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-emerald-400 mb-1 sm:mb-2">97%</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-300 font-semibold">Cost Savings</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all">
                    <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-black text-purple-400 mb-1 sm:mb-2">$115+</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-300 font-semibold">You Save Monthly</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/20 transition-all">
                    <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-blue-400 mb-1 sm:mb-2">24/7</div>
                    <div className="text-xs sm:text-sm lg:text-base text-gray-300 font-semibold">Support</div>
                  </div>
                </div>

                {/* Professional CTA Section */}
                <div className="space-y-6 px-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setShowAuthModal(true);
                      }}
                      className="inline-flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:from-blue-700 hover:via-purple-700 hover:to-emerald-700 text-white px-8 lg:px-12 py-4 lg:py-6 rounded-2xl font-black text-lg lg:text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-blue-500/25 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 animate-pulse"></div>
                      <Zap className="mr-3 w-6 lg:w-8 h-6 lg:h-8 relative z-10" />
                      <span className="relative z-10">START FREE TRIAL</span>
                      <ArrowRight className="ml-3 w-6 lg:w-8 h-6 lg:h-8 relative z-10" />
                    </button>
                    
                    <Link
                      href="/subscription"
                      className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all transform hover:scale-105"
                    >
                      <Users className="mr-3 w-6 h-6" />
                      <span>View All Plans</span>
                    </Link>
                  </div>
                  
                  <div className="text-gray-400 text-sm sm:text-base">
                    ⚡ 14-day free trial • 🔒 No credit card required • 💰 Cancel anytime
                  </div>
                  
                  <div className="flex items-center justify-center space-x-8 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span className="text-sm">Enterprise Security</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span className="text-sm">10,000+ Users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-sm">4.9/5 Rating</span>
                    </div>
                  </div>
                </div>

                {/* Urgency/Scarcity */}
                <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-red-500/20 border border-red-500/30 rounded-xl max-w-2xl mx-auto mx-4">
                  <div className="text-red-300 font-bold text-base sm:text-lg mb-2">🔥 LIMITED TIME: 75% OFF</div>
                  <div className="text-white text-sm sm:text-base">Join 10,000+ professionals who chose subscription over expensive individual tools</div>
                </div>
              </div>
            </section>

            {/* Powerful Tools Showcase */}
            <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 md:mb-16 px-4">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 md:mb-6">
                    <span className="text-yellow-400">20 POWERFUL</span> AI TOOLS
                  </h2>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 md:mb-8 max-w-4xl mx-auto">
                    Live chatbots alone cost $50+/month. You get that PLUS 19 other professional tools for just $4.99/month!
                  </p>
                  
                  {/* Value Calculator */}
                  <div className="bg-gradient-to-r from-red-600/20 to-yellow-600/20 border border-yellow-500/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-8 md:mb-12">
                    <div className="text-lg sm:text-xl text-gray-300 mb-3 sm:mb-4">If you bought these tools separately:</div>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-400 mb-2 line-through">$120+ monthly</div>
                    <div className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-2">(Individual subscriptions cost $15-50/month each)</div>
                    <div className="text-2xl sm:text-3xl text-gray-300 mb-3 sm:mb-4">Our price:</div>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-400">$4.99/MONTH</div>
                    <div className="text-yellow-400 text-lg sm:text-xl font-bold mt-3 sm:mt-4">YOU SAVE $115+ MONTHLY</div>
                  </div>
                </div>

                {/* Tools Grid with Value */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {tools.map((tool, index) => {
                    const isLiveChatbot = tool.name === 'Live Chatbot Creator';
                    return (
                      <div key={index} className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-all group hover:scale-105 ${
                        isLiveChatbot 
                          ? 'bg-gradient-to-br from-yellow-600/30 to-orange-600/30 border-yellow-500/50 ring-2 ring-yellow-400/20' 
                          : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/20 hover:border-yellow-500/50'
                      }`}>
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                          <div className="text-3xl sm:text-4xl">{tool.icon}</div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            isLiveChatbot 
                              ? 'bg-yellow-500 text-black font-bold' 
                              : 'bg-red-500 text-white'
                          }`}>
                            {isLiveChatbot ? 'Worth $500/mo' : 'Worth $40/mo'}
                          </div>
                        </div>
                        {isLiveChatbot && (
                          <div className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full mb-2 sm:mb-3 font-bold text-center">
                            🔥 PREMIUM TOOL
                          </div>
                        )}
                        <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{tool.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">{tool.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                            {tool.category}
                          </span>
                          <div className="text-emerald-400 font-bold text-xs sm:text-sm">INCLUDED</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Massive CTA */}
                <div className="text-center mt-16">
                  <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-8 max-w-2xl mx-auto mb-8">
                    <div className="text-3xl font-black text-white mb-4">GET ALL 20 TOOLS</div>
                    <div className="text-6xl font-black text-yellow-400 mb-4">$4.99/month</div>
                    <div className="text-gray-300 mb-6">Instead of $120+ monthly in subscriptions</div>
                    
                    <button
                      onClick={() => {
                        setAuthMode('signup');
                        setShowAuthModal(true);
                      }}
                      className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black px-12 py-6 rounded-2xl font-black text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-yellow-500/25 inline-flex items-center"
                    >
                      <Zap className="mr-3 w-8 h-8" />
                      START SAVING NOW
                      <ArrowRight className="ml-3 w-8 h-8" />
                    </button>
                  </div>
                  
                  <div className="text-gray-400 text-lg">
                    ⚡ Instant access to all tools • 🚀 No setup required • 💰 Monthly subscription
                  </div>
                </div>
              </div>
            </section>

            {/* Irresistible Pricing Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                  STOP OVERPAYING!
                </h2>
                <p className="text-2xl text-white mb-12 font-bold">
                  Why pay $120+ monthly for subscriptions when you can get EVERYTHING for $4.99/MONTH?
                </p>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {/* Other Providers */}
                  <div className="bg-gray-800 rounded-2xl p-8 border-4 border-red-500 relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                      ❌ OTHER PROVIDERS
                    </div>
                    <div className="text-center pt-4">
                      <div className="text-4xl font-black text-red-400 mb-4">$120+</div>
                      <div className="text-white font-bold mb-6">monthly in subscriptions</div>
                      <ul className="space-y-3 text-left text-gray-300">
                        <li>• Jasper AI: $49/month</li>
                        <li>• Copy.ai: $49/month</li>
                        <li>• Writesonic: $45/month</li>
                        <li>• Grammarly: $30/month</li>
                        <li>• Notion AI: $20/month</li>
                        <li>• + 15 more tools...</li>
                      </ul>
                      <div className="mt-6 text-red-400 font-bold">TOTAL: $120+/month</div>
                    </div>
                  </div>

                  {/* Our Offer */}
                  <div className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-8 border-4 border-yellow-400 relative transform scale-105">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-2 rounded-full font-black text-sm animate-pulse">
                      🔥 OUR OFFER
                    </div>
                    <div className="text-center pt-4">
                      <div className="text-6xl font-black text-white mb-4">$4.99</div>
                      <div className="text-yellow-300 font-bold mb-6">MONTHLY SUBSCRIPTION</div>
                      <ul className="space-y-3 text-left text-white">
                        <li>• ✅ ALL 20 AI Tools Included</li>
                        <li>• ✅ Blog Post Generator</li>
                        <li>• ✅ Social Media AI</li>
                        <li>• ✅ Ad Copy Creator</li>
                        <li>• ✅ Email Marketing AI</li>
                        <li>• ✅ + 15 more premium tools</li>
                      </ul>
                      <div className="mt-6 text-yellow-300 font-black text-xl">SAVE $115+ MONTHLY!</div>
                    </div>
                  </div>
                </div>

                {/* Massive CTA */}
                <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 mb-8">
                  <div className="text-4xl font-black text-white mb-4">⚡ LIMITED TIME OFFER ⚡</div>
                  <div className="text-2xl text-yellow-300 mb-6 font-bold">Get ALL 20 Tools for 97.5% OFF</div>
                  
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-16 py-8 rounded-2xl font-black text-3xl transition-all transform hover:scale-110 shadow-2xl shadow-yellow-500/50 inline-flex items-center animate-pulse"
                  >
                    <Zap className="mr-4 w-10 h-10" />
                    CLAIM YOUR 97.5% DISCOUNT
                    <ArrowRight className="ml-4 w-10 h-10" />
                  </button>
                  
                  <div className="mt-6 text-white text-lg">
                    ⚡ Instant access • 🚀 Cancel anytime • 💰 30-day money back guarantee
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center px-8 py-4 bg-green-500 rounded-full text-white font-black text-xl animate-bounce">
                    <TrendingUp className="w-6 h-6 mr-3" />
                    1000+ BUSINESSES ALREADY SAVING THOUSANDS!
                  </div>
                </div>
              </div>
            </section>

            {/* Professional Testimonials */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    Trusted by Enterprise Leaders
                  </h2>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-current text-yellow-400" />
                    ))}
                    <span className="ml-2 text-lg font-semibold text-gray-900">4.9/5 from 500+ organizations</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                      <div className="flex items-center space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Professional CTA */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-emerald-600">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready for Enterprise AI Tools?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Join 500+ organizations using Somali AI Dataset's professional market tools suite.
                </p>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                    <div className="text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-semibold">Enterprise Trial</div>
                      <div className="text-sm text-blue-100">Full access for 14 days</div>
                    </div>
                    <div className="text-center">
                      <Shield className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-semibold">Enterprise SLA</div>
                      <div className="text-sm text-blue-100">99.9% uptime guarantee</div>
                    </div>
                    <div className="text-center">
                      <Users className="w-8 h-8 mx-auto mb-2" />
                      <div className="font-semibold">Professional Support</div>
                      <div className="text-sm text-blue-100">Dedicated account manager</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setAuthMode('signup');
                      setShowAuthModal(true);
                    }}
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 inline-flex items-center justify-center"
                  >
                    Start Enterprise Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                  <Link 
                    href="/investor"
                    className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                  >
                    <Building2 className="mr-2 w-5 h-5" />
                    Investment Opportunities
                  </Link>
                </div>
                
                <div className="mt-6 text-blue-100 text-sm">
                  Trusted by enterprise organizations • Professional licensing available
                </div>
              </div>
            </section>

            {/* Business Creation Cross-Promotion */}
            <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
              <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl lg:text-5xl font-black mb-8">
                  Love These Tools? Get Your Own AI Business!
                </h2>
                <p className="text-2xl mb-12 max-w-4xl mx-auto">
                  Why just use AI tools when you can <strong>own an AI business?</strong> I'll build a complete AI platform like this one, customized for your market, for just $2,000-$5,000.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-black text-yellow-400 mb-2">$2,000</div>
                    <div className="font-bold mb-2">vs $50,000+ agencies</div>
                    <div className="text-sm text-gray-200">Get the same quality for 95% less</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-black text-yellow-400 mb-2">6 weeks</div>
                    <div className="font-bold mb-2">to launch</div>
                    <div className="text-sm text-gray-200">From idea to revenue-generating business</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="text-3xl font-black text-yellow-400 mb-2">$18K</div>
                    <div className="font-bold mb-2">average monthly revenue</div>
                    <div className="text-sm text-gray-200">By month 6 for our clients</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Link 
                    href="/ai-business-creation"
                    className="bg-yellow-500 text-black px-12 py-6 rounded-2xl font-black text-2xl hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center"
                  >
                    <Building2 className="mr-3 w-8 h-8" />
                    BUILD MY AI BUSINESS
                    <ArrowRight className="ml-3 w-8 h-8" />
                  </Link>
                  
                  <div className="text-gray-200 text-lg">
                    ⚡ Custom AI tools for your niche • 💰 Your business, your profits • 🎯 Proven business model
                  </div>
                </div>

                <div className="mt-12 p-6 bg-black/20 rounded-xl max-w-3xl mx-auto">
                  <div className="text-yellow-300 font-bold mb-2">💡 IMAGINE THIS:</div>
                  <div className="text-lg">
                    Instead of paying $4.99 monthly for tools, your customers pay YOU $19.99 monthly for YOUR AI business. 
                    <strong> From customer to competitor in 6 weeks.</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Professional Footer */}
            <footer className="py-12 px-4 bg-gray-900 text-white">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold">Somali AI Dataset</span>
                    </div>
                    <p className="text-gray-400 mb-4">
                      Professional AI Market Tools for enterprise organizations. Building the future of AI-powered business automation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Enterprise</h4>
                    <div className="space-y-2 text-gray-400">
                      <Link href="/ai-market-tools" className="block hover:text-white transition-colors">AI Market Tools</Link>
                      <Link href="#" className="block hover:text-white transition-colors">Tools Suite</Link>
                      <Link href="/ai-meeting-pro" className="block hover:text-white transition-colors">Meeting AI</Link>
                      <Link href="/investor" className="block hover:text-white transition-colors">Investors</Link>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <div className="space-y-2 text-gray-400">
                      <Link href="/#about" className="block hover:text-white transition-colors">About</Link>
                      <Link href="/dataset" className="block hover:text-white transition-colors">Dataset</Link>
                      <Link href="#" className="block hover:text-white transition-colors">Support</Link>
                      <Link href="#" className="block hover:text-white transition-colors">Contact</Link>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
                  © 2024 Somali AI Dataset. Professional AI Market Tools. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        ) : user ? (
          // Check if user has active subscription
          subscription.loading ? (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Checking subscription...</p>
              </div>
            </div>
          ) : !subscription.hasActiveSubscription ? (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
              <div className="text-center max-w-md">
                <div className="text-6xl mb-6">💳</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Subscription Required</h1>
                <p className="text-gray-600 mb-6">Please complete your $4.99/month subscription to access all 20 AI tools.</p>
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-2">Current status: {subscription.subscriptionStatus}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-blue-600 hover:text-blue-800 text-sm underline"
                  >
                    Refresh Status
                  </button>
                </div>
                <button
                  onClick={async () => {
                    const response = await fetch('/api/create-checkout-session', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email: user.email, userId: user.id })
                    });
                    const { url } = await response.json();
                    if (url) window.location.href = url;
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Complete Subscription - $4.99/month
                </button>
              </div>
            </div>
          ) : selectedTool ? (
            <AIToolInterface 
              tool={selectedTool}
              onBack={handleBackToDashboard}
              userSubscription="pro"
            />
          ) : (
            <AIToolsDashboard 
              onToolSelect={handleToolSelect}
              userSubscription="pro"
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