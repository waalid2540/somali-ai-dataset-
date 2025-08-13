// Enterprise Landing Page - Professional AI Platform
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
  Mail,
  Bot,
  Briefcase,
  Database,
  GraduationCap,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface EnterpriseLandingPageProps {
  user: User | null;
  onShowAuth: () => void;
  onNavigate: (section: string) => void;
}

export default function EnterpriseLandingPage({ user, onShowAuth, onNavigate }: EnterpriseLandingPageProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <Head>
        <title>Somai Data | Enterprise AI Solutions for Business Growth</title>
        <meta name="description" content="Transform your business with AI Agents, AI Tools, Business Creation Suite, and Somali Dataset. Start with Tutorial Studio - FREE forever." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 lg:h-20">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
                <span className="text-xl lg:text-2xl font-bold text-white">Somai Data</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                {/* Products Dropdown */}
                <div className="relative group">
                  <button className="text-white hover:text-blue-300 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10 flex items-center">
                    Products
                    <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="p-4 space-y-3">
                      <button 
                        onClick={() => onNavigate('ai-agents')}
                        className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-all group/item"
                      >
                        <div className="font-semibold text-gray-900 group-hover/item:text-blue-600">🤖 AI Agents</div>
                        <div className="text-sm text-gray-600">Intelligent workflow automation</div>
                      </button>
                      <button 
                        onClick={() => onNavigate('ai-tools')}
                        className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-all group/item"
                      >
                        <div className="font-semibold text-gray-900 group-hover/item:text-blue-600">⚡ AI Tools</div>
                        <div className="text-sm text-gray-600">20+ powerful AI utilities</div>
                      </button>
                      <button 
                        onClick={() => onNavigate('business-creation')}
                        className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-all group/item"
                      >
                        <div className="font-semibold text-gray-900 group-hover/item:text-blue-600">💼 Business Suite</div>
                        <div className="text-sm text-gray-600">Complete business creation</div>
                      </button>
                      <button 
                        onClick={() => onNavigate('dataset')}
                        className="w-full text-left p-3 rounded-lg hover:bg-blue-50 transition-all group/item"
                      >
                        <div className="font-semibold text-gray-900 group-hover/item:text-blue-600">📊 Dataset</div>
                        <div className="text-sm text-gray-600">Exclusive language data</div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Free Tools */}
                <button 
                  onClick={() => onNavigate('tutorial-studio')}
                  className="text-white hover:text-blue-300 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10 flex items-center"
                >
                  Tutorial Studio
                  <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-bold">FREE</span>
                </button>

                {/* Academy */}
                <a 
                  href="/academy"
                  className="text-white hover:text-blue-300 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10 flex items-center"
                >
                  Academy
                  <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full font-bold">NEW</span>
                </a>

                {/* Pricing */}
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="text-white hover:text-blue-300 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Pricing
                </button>

                {/* CTA Button */}
                {user ? (
                  <button 
                    onClick={() => onNavigate('dashboard')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105"
                  >
                    Dashboard
                  </button>
                ) : (
                  <button 
                    onClick={onShowAuth}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold transform hover:scale-105"
                  >
                    Get Started
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="lg:hidden bg-white/10 backdrop-blur-md border-t border-white/20 animate-in slide-in-from-top duration-300">
                <div className="px-4 py-6 space-y-2">
                  {/* Products Section */}
                  <div className="mb-4">
                    <div className="text-blue-200 text-sm font-semibold px-4 py-2 uppercase tracking-wide">Products</div>
                    <div className="space-y-1">
                      <button 
                        onClick={() => { onNavigate('ai-agents'); setShowMobileMenu(false); }}
                        className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium"
                      >
                        🤖 AI Agents
                      </button>
                      <button 
                        onClick={() => { onNavigate('ai-tools'); setShowMobileMenu(false); }}
                        className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium"
                      >
                        ⚡ AI Tools
                      </button>
                      <button 
                        onClick={() => { onNavigate('business-creation'); setShowMobileMenu(false); }}
                        className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium"
                      >
                        💼 Business Suite
                      </button>
                      <button 
                        onClick={() => { onNavigate('dataset'); setShowMobileMenu(false); }}
                        className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium"
                      >
                        📊 Dataset
                      </button>
                    </div>
                  </div>

                  {/* Free Tools & Learning */}
                  <div className="mb-4">
                    <div className="text-green-200 text-sm font-semibold px-4 py-2 uppercase tracking-wide">Free & Learning</div>
                    <div className="space-y-1">
                      <button 
                        onClick={() => { onNavigate('tutorial-studio'); setShowMobileMenu(false); }}
                        className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium flex items-center justify-between"
                      >
                        <span>🎥 Tutorial Studio</span>
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">FREE</span>
                      </button>
                      <a 
                        href="/academy"
                        onClick={() => setShowMobileMenu(false)}
                        className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium flex items-center justify-between"
                      >
                        <span>🎓 Academy</span>
                        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">NEW</span>
                      </a>
                    </div>
                  </div>

                  {/* Business */}
                  <button 
                    onClick={() => { onNavigate('pricing'); setShowMobileMenu(false); }}
                    className="block w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all duration-300 font-medium"
                  >
                    💰 Pricing
                  </button>
                  
                  <div className="pt-4 border-t border-white/20">
                    {user ? (
                      <button 
                        onClick={() => { onNavigate('dashboard'); setShowMobileMenu(false); }}
                        className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300"
                      >
                        Dashboard
                      </button>
                    ) : (
                      <button 
                        onClick={() => { onShowAuth(); setShowMobileMenu(false); }}
                        className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold text-center hover:shadow-lg transition-all duration-300"
                      >
                        Get Started
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 lg:pt-32 pb-16 lg:pb-20 px-4 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto text-center w-full">
            <div className="mb-12 lg:mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 lg:mb-8 leading-tight">
                Transform Your Business with
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent block sm:inline"> AI Intelligence</span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8 lg:mb-12 max-w-4xl mx-auto leading-relaxed">
                Complete AI ecosystem: Intelligent Agents, Powerful Tools, Business Creation Suite, and Exclusive Dataset
              </p>
            </div>

            {/* Free Tutorial Studio CTA */}
            <div className="mb-12 lg:mb-16 p-6 lg:p-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl max-w-3xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center mb-6">
                <GraduationCap className="w-10 h-10 text-green-400 mr-3" />
                <span className="text-2xl lg:text-3xl font-bold text-green-400">FREE FOREVER</span>
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3">Tutorial Studio</h3>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">Professional screen recording and video tutorials - No signup required!</p>
              <button 
                onClick={() => onNavigate('tutorial-studio')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg transform hover:scale-105"
              >
                Start Recording Free
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
              <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-3xl lg:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">6</div>
                <div className="text-gray-300 text-sm lg:text-base font-medium">AI Agents</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-3xl lg:text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">20+</div>
                <div className="text-gray-300 text-sm lg:text-base font-medium">AI Tools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                <div className="text-gray-300 text-sm lg:text-base font-medium">Automation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="text-3xl lg:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-gray-300 text-sm lg:text-base font-medium">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16 lg:py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center mb-16 lg:mb-20">
              Choose Your AI Solution
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* AI Agents */}
              <div 
                onClick={() => onNavigate('ai-agents')}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Bot className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">AI Agents</h3>
                <p className="text-gray-300 mb-6 text-sm lg:text-Base leading-relaxed">Bundle of 6 intelligent agents that think, plan, and execute complete business workflows automatically.</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Email Campaign Agent
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Blog Publisher Agent
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Social Media Agent
                  </div>
                </div>
                <div className="text-blue-400 font-bold text-xl lg:text-2xl mb-1">$150/month</div>
                <div className="text-gray-400 text-sm font-medium">6 AI agents bundle</div>
              </div>

              {/* AI Tools */}
              <div 
                onClick={() => onNavigate('ai-tools')}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Zap className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">AI Tools</h3>
                <p className="text-gray-300 mb-6 text-sm lg:text-base leading-relaxed">Bundle of 20+ powerful AI tools for content creation, business operations, and creative design.</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Content Creation Suite
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Business Operations
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Creative & Design
                  </div>
                </div>
                <div className="text-purple-400 font-bold text-xl lg:text-2xl mb-1">$7.99/month</div>
                <div className="text-gray-400 text-sm font-medium">20+ AI tools bundle</div>
              </div>

              {/* Business Creation */}
              <div 
                onClick={() => onNavigate('business-creation')}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-green-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Briefcase className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-green-300 transition-colors duration-300">Business Creation</h3>
                <p className="text-gray-300 mb-6 text-sm lg:text-base leading-relaxed">Complete business creation suite with AI-powered planning, strategy, and execution.</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Business Plan Generator
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Market Analysis
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Strategy Planning
                  </div>
                </div>
                <div className="text-green-400 font-bold text-xl lg:text-2xl mb-1">$7.99/month</div>
                <div className="text-gray-400 text-sm font-medium">Complete suite</div>
              </div>

              {/* Dataset */}
              <div 
                onClick={() => onNavigate('dataset')}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-yellow-500/50 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Database className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300">Dataset</h3>
                <p className="text-gray-300 mb-6 text-sm lg:text-base leading-relaxed">Exclusive language AI dataset for training models and cultural preservation.</p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Clean Language Data
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Cultural Context
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Check className="w-4 h-4 text-green-400 mr-2" />
                    Regular Updates
                  </div>
                </div>
                <div className="text-yellow-400 font-bold text-xl lg:text-2xl mb-1">Custom Pricing</div>
                <div className="text-gray-400 text-sm font-medium">Enterprise access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorial Studio Highlight */}
        <section className="py-16 lg:py-24 px-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-green-500/20 rounded-full text-green-400 font-bold mb-8 text-lg">
              <GraduationCap className="w-6 h-6 mr-3" />
              FREE FOREVER - NO SIGNUP REQUIRED
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
              Tutorial Studio
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Professional screen recording with webcam overlay. Create stunning tutorials, demos, and presentations instantly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Screen + Webcam</h3>
                <p className="text-gray-300 leading-relaxed">Record your screen with webcam overlay for professional tutorials</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Instant Download</h3>
                <p className="text-gray-300 leading-relaxed">Download your recordings immediately in high quality</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">No Limits</h3>
                <p className="text-gray-300 leading-relaxed">Unlimited recordings, unlimited length, completely free</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('tutorial-studio')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-5 rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-xl transform hover:scale-105"
            >
              Start Recording Now - FREE
            </button>
          </div>
        </section>

        {/* Pricing Overview */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Simple, Transparent Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI Tools */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">AI Tools</h3>
                <div className="text-4xl font-bold text-purple-400 mb-2">$7.99</div>
                <div className="text-gray-300 mb-6">per month</div>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    20+ AI Tools
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Unlimited Usage
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Priority Support
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('ai-tools')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Get Started
                </button>
              </div>

              {/* AI Agents */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border-2 border-blue-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Agents</h3>
                <div className="text-4xl font-bold text-blue-400 mb-2">$150</div>
                <div className="text-gray-300 mb-6">per month</div>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    6 AI Agents
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Real Workflow Execution
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Business Automation
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('ai-agents')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Start Free Trial
                </button>
              </div>

              {/* Complete Suite */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Complete Suite</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">$14.99</div>
                <div className="text-gray-300 mb-6">per month</div>
                <ul className="space-y-3 text-left mb-8">
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Everything Included
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Business Creation Suite
                  </li>
                  <li className="flex items-center text-gray-300">
                    <Check className="w-5 h-5 text-green-400 mr-3" />
                    Priority Support
                  </li>
                </ul>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg hover:shadow-lg transition-all"
                >
                  Get Everything
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Somai Data</span>
                </div>
                <p className="text-gray-400">
                  Transform your business with intelligent AI solutions designed for the modern enterprise.
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Products</h4>
                <div className="space-y-2">
                  <button onClick={() => onNavigate('ai-agents')} className="block text-gray-400 hover:text-white transition-colors">AI Agents</button>
                  <button onClick={() => onNavigate('ai-tools')} className="block text-gray-400 hover:text-white transition-colors">AI Tools</button>
                  <button onClick={() => onNavigate('business-creation')} className="block text-gray-400 hover:text-white transition-colors">Business Creation</button>
                  <button onClick={() => onNavigate('dataset')} className="block text-gray-400 hover:text-white transition-colors">Somali Dataset</button>
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Free Tools</h4>
                <div className="space-y-2">
                  <button onClick={() => onNavigate('tutorial-studio')} className="block text-gray-400 hover:text-white transition-colors">Tutorial Studio</button>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Documentation</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">API Reference</a>
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <div className="space-y-2">
                  <button onClick={() => onNavigate('pricing')} className="block text-gray-400 hover:text-white transition-colors">Pricing</button>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                  <a href="#" className="block text-gray-400 hover:text-white transition-colors">Support</a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/20 text-center text-gray-400">
              <p>&copy; 2024 Somai Data. All rights reserved. Built with cutting-edge AI technology.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}