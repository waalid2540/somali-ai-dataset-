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
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Somai Data</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <button 
                  onClick={() => onNavigate('ai-agents')}
                  className="text-white hover:text-blue-300 transition-colors font-medium"
                >
                  AI Agents
                </button>
                <button 
                  onClick={() => onNavigate('ai-tools')}
                  className="text-white hover:text-blue-300 transition-colors font-medium"
                >
                  AI Tools
                </button>
                <button 
                  onClick={() => onNavigate('business-creation')}
                  className="text-white hover:text-blue-300 transition-colors font-medium"
                >
                  Business Creation
                </button>
                <button 
                  onClick={() => onNavigate('dataset')}
                  className="text-white hover:text-blue-300 transition-colors font-medium"
                >
                  Somali Dataset
                </button>
                <button 
                  onClick={() => onNavigate('tutorial-studio')}
                  className="text-white hover:text-blue-300 transition-colors font-medium"
                >
                  Tutorial Studio
                  <span className="ml-1 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">FREE</span>
                </button>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="text-white hover:text-blue-300 transition-colors font-medium"
                >
                  Pricing
                </button>

                {user ? (
                  <button 
                    onClick={() => onNavigate('dashboard')}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    Dashboard
                  </button>
                ) : (
                  <button 
                    onClick={onShowAuth}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                  >
                    Get Started
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden text-white"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="md:hidden bg-white/10 backdrop-blur-md border-t border-white/20">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <button 
                    onClick={() => { onNavigate('ai-agents'); setShowMobileMenu(false); }}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
                  >
                    AI Agents
                  </button>
                  <button 
                    onClick={() => { onNavigate('ai-tools'); setShowMobileMenu(false); }}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
                  >
                    AI Tools
                  </button>
                  <button 
                    onClick={() => { onNavigate('business-creation'); setShowMobileMenu(false); }}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
                  >
                    Business Creation
                  </button>
                  <button 
                    onClick={() => { onNavigate('dataset'); setShowMobileMenu(false); }}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
                  >
                    Somali Dataset
                  </button>
                  <button 
                    onClick={() => { onNavigate('tutorial-studio'); setShowMobileMenu(false); }}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
                  >
                    Tutorial Studio <span className="text-green-400 text-sm">FREE</span>
                  </button>
                  <button 
                    onClick={() => { onNavigate('pricing'); setShowMobileMenu(false); }}
                    className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md"
                  >
                    Pricing
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Transform Your Business with
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> AI Intelligence</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Complete AI ecosystem: Intelligent Agents, Powerful Tools, Business Creation Suite, and Exclusive Somali Dataset
              </p>
            </div>

            {/* Free Tutorial Studio CTA */}
            <div className="mb-12 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-green-400 mr-3" />
                <span className="text-2xl font-bold text-green-400">FREE FOREVER</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Tutorial Studio</h3>
              <p className="text-gray-300 mb-4">Professional screen recording and video tutorials - No signup required!</p>
              <button 
                onClick={() => onNavigate('tutorial-studio')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
              >
                Start Recording Free
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-400">6</div>
                <div className="text-gray-300 text-sm">AI Agents</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-400">20+</div>
                <div className="text-gray-300 text-sm">AI Tools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-green-400">95%</div>
                <div className="text-gray-300 text-sm">Automation</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-gray-300 text-sm">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Choose Your AI Solution
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* AI Agents */}
              <div 
                onClick={() => onNavigate('ai-agents')}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-blue-500/50 transition-all cursor-pointer hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Agents</h3>
                <p className="text-gray-300 mb-6">Bundle of 6 intelligent agents that think, plan, and execute complete business workflows automatically.</p>
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
                <div className="text-blue-400 font-semibold text-lg">$150/month</div>
                <div className="text-gray-400 text-sm">6 AI agents bundle</div>
              </div>

              {/* AI Tools */}
              <div 
                onClick={() => onNavigate('ai-tools')}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-500/50 transition-all cursor-pointer hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">AI Tools</h3>
                <p className="text-gray-300 mb-6">Bundle of 20+ powerful AI tools for content creation, business operations, and creative design.</p>
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
                <div className="text-purple-400 font-semibold text-lg">$7.99/month</div>
                <div className="text-gray-400 text-sm">20+ AI tools bundle</div>
              </div>

              {/* Business Creation */}
              <div 
                onClick={() => onNavigate('business-creation')}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-green-500/50 transition-all cursor-pointer hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Business Creation</h3>
                <p className="text-gray-300 mb-6">Complete business creation suite with AI-powered planning, strategy, and execution.</p>
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
                <div className="text-green-400 font-semibold text-lg">$7.99/month</div>
                <div className="text-gray-400 text-sm">Complete suite</div>
              </div>

              {/* Somali Dataset */}
              <div 
                onClick={() => onNavigate('dataset')}
                className="group bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-yellow-500/50 transition-all cursor-pointer hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Somali Dataset</h3>
                <p className="text-gray-300 mb-6">Exclusive Somali language AI dataset for training models and cultural preservation.</p>
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
                <div className="text-yellow-400 font-semibold text-lg">Custom Pricing</div>
                <div className="text-gray-400 text-sm">Enterprise access</div>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorial Studio Highlight */}
        <section className="py-16 px-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full text-green-400 font-medium mb-6">
              <GraduationCap className="w-5 h-5 mr-2" />
              FREE FOREVER - NO SIGNUP REQUIRED
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Tutorial Studio
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Professional screen recording with webcam overlay. Create stunning tutorials, demos, and presentations instantly.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Screen + Webcam</h3>
                <p className="text-gray-300 text-sm">Record your screen with webcam overlay for professional tutorials</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Instant Download</h3>
                <p className="text-gray-300 text-sm">Download your recordings immediately in high quality</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No Limits</h3>
                <p className="text-gray-300 text-sm">Unlimited recordings, unlimited length, completely free</p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate('tutorial-studio')}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg hover:shadow-lg transition-all font-semibold text-lg"
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