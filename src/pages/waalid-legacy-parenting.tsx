// Waalid Legacy AI Parenting Coach - Dedicated Platform
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import AuthModal from '../components/AuthModal';
import { 
  ArrowLeft,
  Send,
  Mic,
  MicOff,
  Globe,
  Heart,
  Users,
  MessageCircle,
  Book,
  Star,
  Shield,
  Clock,
  CheckCircle,
  Crown,
  Zap,
  Play
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language?: string;
}

interface FamilyProfile {
  parentName: string;
  children: Array<{
    name: string;
    age: number;
    challenges: string[];
  }>;
  location: string;
  primaryLanguage: 'english' | 'somali' | 'arabic';
  subscriptionTier: 'free' | 'premium';
  dailyMessagesUsed: number;
  lastResetDate: string;
}

export default function WaalidLegacyParenting() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'somali' | 'arabic'>('english');
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      
      if (session?.user) {
        await loadFamilyProfile(session.user.id);
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        if (session?.user) {
          loadFamilyProfile(session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadFamilyProfile = async (userId: string) => {
    // Load family profile from your database
    // For now, using mock data
    const mockProfile: FamilyProfile = {
      parentName: 'Sister Amina',
      children: [
        { name: 'Ahmed', age: 14, challenges: ['school_integration', 'prayer_consistency'] },
        { name: 'Fatima', age: 11, challenges: ['language_preservation'] }
      ],
      location: 'Minneapolis, MN',
      primaryLanguage: 'english',
      subscriptionTier: 'free',
      dailyMessagesUsed: 2,
      lastResetDate: new Date().toDateString()
    };
    
    setFamilyProfile(mockProfile);
    setSelectedLanguage(mockProfile.primaryLanguage);
  };

  const canSendMessage = () => {
    if (!familyProfile) return false;
    if (familyProfile.subscriptionTier === 'premium') return true;
    
    // Check if it's a new day
    const today = new Date().toDateString();
    if (familyProfile.lastResetDate !== today) {
      // Reset daily usage
      setFamilyProfile(prev => prev ? {
        ...prev,
        dailyMessagesUsed: 0,
        lastResetDate: today
      } : null);
      return true;
    }
    
    return familyProfile.dailyMessagesUsed < 5;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !user || isLoading) return;
    
    if (!canSendMessage()) {
      setShowUpgradeModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
      language: selectedLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInputMessage('');

    try {
      // Call your Barakah AI backend with parenting agent
      const response = await fetch('/api/waalid-legacy-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputMessage,
          language: selectedLanguage,
          familyContext: familyProfile,
          userId: user.id
        })
      });

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || 'Assalamu alaikum! I\'m here to help with your parenting challenges.',
        timestamp: new Date(),
        language: selectedLanguage
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update usage count
      if (familyProfile?.subscriptionTier === 'free') {
        setFamilyProfile(prev => prev ? {
          ...prev,
          dailyMessagesUsed: prev.dailyMessagesUsed + 1
        } : null);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment. Barakallahu feeki for your patience!',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getLanguageFlag = (lang: string) => {
    const flags = {
      english: '🇺🇸',
      somali: '🇸🇴', 
      arabic: '🇸🇦'
    };
    return flags[lang as keyof typeof flags] || '🇺🇸';
  };

  const getRemainingMessages = () => {
    if (!familyProfile || familyProfile.subscriptionTier === 'premium') return null;
    return 5 - familyProfile.dailyMessagesUsed;
  };

  if (!user) {
    return (
      <>
        <Head>
          <title>Waalid Legacy AI - Parenting Coach for Muslim Families</title>
          <meta name="description" content="Get personalized parenting guidance for raising Muslim children in the West. Trusted by 100K+ Somali families worldwide." />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
          <AuthModal 
            isOpen={showAuth}
            onClose={() => setShowAuth(false)}
            onSuccess={() => setShowAuth(false)}
            initialMode="signup"
          />

          {/* Navigation */}
          <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Waalid Legacy AI
                    </span>
                    <p className="text-xs text-gray-500">Parenting Coach</p>
                  </div>
                </Link>
                
                <div className="flex items-center space-x-4">
                  <Link href="/" className="text-gray-600 hover:text-emerald-600 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                  <button 
                    onClick={() => setShowAuth(true)}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all font-semibold"
                  >
                    Start Coaching
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-emerald-800 font-semibold text-sm mb-8">
                <Users className="w-4 h-4 mr-2" />
                Trusted by 100K+ Somali families worldwide
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Waalid Legacy AI<br />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Parenting Coach
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
                Get personalized guidance for raising Muslim children in the West. Ultra-smart AI coach that speaks English, Somali, and Arabic. Built with Islamic wisdom and cultural understanding.
              </p>

              {/* Pricing Preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Free Tier</h3>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">$0</div>
                  <div className="text-gray-600 mb-6">5 messages per day</div>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                      Basic parenting guidance
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                      English language support
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                      Islamic wisdom integration
                    </li>
                  </ul>
                  <button 
                    onClick={() => setShowAuth(true)}
                    className="w-full border-2 border-emerald-600 text-emerald-600 py-3 rounded-lg hover:bg-emerald-50 transition-all font-semibold"
                  >
                    Start Free
                  </button>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-xl text-white p-8 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Premium</h3>
                  <div className="text-4xl font-bold mb-2">$4.99</div>
                  <div className="text-emerald-100 mb-6">per month</div>
                  <ul className="space-y-3 text-left mb-8">
                    <li className="flex items-center">
                      <Crown className="w-5 h-5 text-yellow-400 mr-3" />
                      Unlimited messages
                    </li>
                    <li className="flex items-center">
                      <Globe className="w-5 h-5 text-yellow-400 mr-3" />
                      Trilingual support (English/Somali/Arabic)
                    </li>
                    <li className="flex items-center">
                      <Zap className="w-5 h-5 text-yellow-400 mr-3" />
                      Priority responses
                    </li>
                    <li className="flex items-center">
                      <Users className="w-5 h-5 text-yellow-400 mr-3" />
                      Family profile tracking
                    </li>
                    <li className="flex items-center">
                      <Shield className="w-5 h-5 text-yellow-400 mr-3" />
                      Crisis support priority
                    </li>
                  </ul>
                  <button 
                    onClick={() => setShowAuth(true)}
                    className="w-full bg-white text-emerald-600 py-3 rounded-lg hover:shadow-lg transition-all font-bold"
                  >
                    Start Premium Trial
                  </button>
                </div>
              </div>

              <button 
                onClick={() => setShowAuth(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center mx-auto"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Free Coaching
              </button>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 text-center mb-16">
                Why Choose Waalid Legacy AI?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Trilingual Support</h3>
                  <p className="text-gray-600">
                    Communicate in English, Somali, or Arabic. Get guidance in the language you're most comfortable with.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Book className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Islamic Wisdom</h3>
                  <p className="text-gray-600">
                    Every response includes relevant Quranic verses and Hadith, helping you parent with Islamic principles.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Cultural Bridge</h3>
                  <p className="text-gray-600">
                    Navigate between Somali heritage and Western society with confidence and wisdom.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }

  // Main Chat Interface for logged-in users
  return (
    <>
      <Head>
        <title>Waalid Legacy AI Parenting Coach - Chat</title>
        <meta name="description" content="Chat with your personal AI parenting coach" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Link href="/" className="text-gray-600 hover:text-emerald-600">
                  <ArrowLeft className="w-5 h-5" />
                </Link>
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">Waalid Legacy AI</span>
                  <p className="text-xs text-gray-500">Parenting Coach</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Language Selector */}
                <div className="flex items-center space-x-2">
                  {(['english', 'somali', 'arabic'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        selectedLanguage === lang
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {getLanguageFlag(lang)}
                    </button>
                  ))}
                </div>

                {/* Usage Indicator */}
                {familyProfile?.subscriptionTier === 'free' && (
                  <div className="text-sm text-gray-600">
                    {getRemainingMessages()} messages left today
                  </div>
                )}

                {/* Upgrade Button */}
                {familyProfile?.subscriptionTier === 'free' && (
                  <button 
                    onClick={() => setShowUpgradeModal(true)}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all text-sm font-semibold"
                  >
                    Upgrade to Premium
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Chat Interface */}
        <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-4rem)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Assalamu Alaikum, {familyProfile?.parentName || 'Parent'}!
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    I'm here to help you navigate parenting challenges with Islamic wisdom and cultural understanding. What would you like to discuss today?
                  </p>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Type your parenting question... (${selectedLanguage})`}
                  className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-400"
                  rows={3}
                  disabled={!canSendMessage() && familyProfile?.subscriptionTier === 'free'}
                />
              </div>
              
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`p-2 rounded-lg transition-all ${
                    isRecording 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  disabled={!canSendMessage() && familyProfile?.subscriptionTier === 'free'}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading || (!canSendMessage() && familyProfile?.subscriptionTier === 'free')}
                  className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {!canSendMessage() && familyProfile?.subscriptionTier === 'free' && (
              <div className="mt-2 text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
                You've used all 5 free messages today. Upgrade to Premium for unlimited conversations!
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Upgrade to Premium</h3>
              <p className="text-gray-600 mb-6">
                Get unlimited messages, trilingual support, and priority responses for just $4.99/month.
              </p>
              
              <div className="space-y-4">
                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg hover:shadow-lg transition-all font-semibold">
                  Upgrade Now - $4.99/month
                </button>
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="w-full text-gray-600 py-3 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}