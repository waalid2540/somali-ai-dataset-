import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, TrendingUp, Globe, DollarSign, Users, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "SOMALI AI DATASET",
      subtitle: "The World's First Professional Somali AI Dataset Platform",
      content: (
        <div className="text-center">
          <div className="text-6xl mb-8">🇸🇴</div>
          <h3 className="text-2xl font-bold text-white mb-4">Yussuf Abdi, Founder & CEO</h3>
          <ul className="text-gray-300 space-y-2 max-w-md mx-auto">
            <li>• Utah Resident & Somali Cultural Authority</li>
            <li>• Imam with Deep Community Connections</li>
            <li>• Tech Entrepreneur Building Cultural AI</li>
          </ul>
          <div className="mt-8 p-6 bg-emerald-900/20 rounded-xl border border-emerald-500/30">
            <h4 className="text-xl font-bold text-emerald-400 mb-2">Seeking: $250K - $500K Seed Round</h4>
            <p className="text-gray-300">For: 15-20% Equity</p>
          </div>
        </div>
      )
    },
    {
      title: "THE MASSIVE PROBLEM",
      subtitle: "25 Million Somali Speakers. Zero Quality AI.",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center">
                🚨 The Problem:
              </h3>
              <ul className="text-gray-300 space-y-3">
                <li>• <strong className="text-white">25 million Somali speakers</strong> worldwide</li>
                <li>• <strong className="text-blue-400">$2.5 billion African language AI market</strong> growing 40% annually</li>
                <li>• <strong className="text-red-400">ZERO authentic, high-quality Somali datasets</strong> available</li>
                <li>• <strong className="text-yellow-400">Cultural misrepresentation</strong> in existing AI systems</li>
                <li>• <strong className="text-emerald-400">Massive underserved market</strong> with no competition</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">💡 Why This Matters:</h3>
              <ul className="text-gray-300 space-y-3">
                <li>• Google, OpenAI, Meta desperately need African language data</li>
                <li>• Translation companies struggling with Somali accuracy</li>
                <li>• Educational institutions can't teach Somali properly</li>
                <li>• 25M people excluded from AI revolution</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "OUR UNIQUE SOLUTION",
      subtitle: "Authentic Somali AI with Cultural Authority",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">🎯 What We Built:</h3>
              <ul className="text-gray-300 space-y-3">
                <li>• <strong className="text-blue-400">Professional API platform</strong> for Somali text analysis</li>
                <li>• <strong className="text-emerald-400">Scholar-approved dataset</strong> with 95%+ quality scores</li>
                <li>• <strong className="text-yellow-400">Cultural authenticity</strong> validated by community Imam (me!)</li>
                <li>• <strong className="text-purple-400">Enterprise-grade platform</strong> ready for Fortune 500</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">🔥 Competitive Advantages:</h3>
              <ol className="text-gray-300 space-y-2">
                <li><strong className="text-emerald-400">1. Cultural Authority:</strong> I'm an Imam - unbeatable credibility</li>
                <li><strong className="text-blue-400">2. First-Mover:</strong> No competition with authentic Somali data</li>
                <li><strong className="text-yellow-400">3. Quality:</strong> 95%+ accuracy vs 60% industry standard</li>
                <li><strong className="text-purple-400">4. Market Timing:</strong> AI explosion + African language demand</li>
              </ol>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "MASSIVE MARKET OPPORTUNITY",
      subtitle: "$2.5B African Language AI Market",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">📊 Target Markets:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong className="text-blue-400">AI Companies:</strong> Google, OpenAI, Meta, Microsoft ($500M TAM)</li>
                <li>• <strong className="text-emerald-400">Translation Services:</strong> Professional agencies ($300M TAM)</li>
                <li>• <strong className="text-yellow-400">Educational Institutions:</strong> Universities, schools ($200M TAM)</li>
                <li>• <strong className="text-purple-400">Government Agencies:</strong> Immigration, security ($150M TAM)</li>
              </ul>
              
              <h3 className="text-xl font-bold text-blue-400 mb-4 mt-6">🎯 Our Beachhead:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Somali diaspora: 25 million speakers globally</li>
                <li>• Islamic organizations: Cultural authenticity matters</li>
                <li>• Tech companies: Need diverse language training data</li>
                <li>• Academic researchers: Studying African languages</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">💰 Revenue Potential:</h3>
              <div className="space-y-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400">Year 1:</h4>
                  <p className="text-gray-300">100 customers × $9.99 = $12K/month = <strong className="text-white">$144K ARR</strong></p>
                </div>
                <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/30">
                  <h4 className="font-semibold text-emerald-400">Year 2:</h4>
                  <p className="text-gray-300">1,000 customers × $9.99 = $120K/month = <strong className="text-white">$1.4M ARR</strong></p>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-400">Year 3:</h4>
                  <p className="text-gray-300">10,000 customers × $9.99 = $1.2M/month = <strong className="text-white">$14M ARR</strong></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "BUSINESS MODEL & TRACTION",
      subtitle: "$9.99 Unlimited = Market Domination Pricing",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">💰 Business Model:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong className="text-blue-400">SaaS Subscription:</strong> $9.99/month unlimited API access</li>
                <li>• <strong className="text-emerald-400">Enterprise Licensing:</strong> Custom pricing for Fortune 500</li>
                <li>• <strong className="text-yellow-400">Data Licensing:</strong> Sell raw dataset to AI companies</li>
                <li>• <strong className="text-purple-400">Consulting Services:</strong> Cultural validation for tech companies</li>
              </ul>
              
              <h3 className="text-xl font-bold text-blue-400 mb-4 mt-6">🚀 Validation:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong className="text-emerald-400">100% scholar-approved</strong> content quality</li>
                <li>• <strong className="text-blue-400">Cultural community support</strong> from Somali diaspora</li>
                <li>• <strong className="text-yellow-400">Technical platform</strong> built and tested</li>
                <li>• <strong className="text-purple-400">Market timing</strong> perfect with AI boom</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">✅ Current Traction:</h3>
              <div className="space-y-3">
                <div className="bg-emerald-900/20 p-3 rounded-lg border border-emerald-500/30">
                  <strong className="text-emerald-400">150+ authentic sentences</strong> in production database
                </div>
                <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
                  <strong className="text-blue-400">Professional platform</strong> deployed and live
                </div>
                <div className="bg-yellow-900/20 p-3 rounded-lg border border-yellow-500/30">
                  <strong className="text-yellow-400">API authentication</strong> system working
                </div>
                <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/30">
                  <strong className="text-purple-400">Payment integration</strong> ready (Stripe)
                </div>
                <div className="bg-pink-900/20 p-3 rounded-lg border border-pink-500/30">
                  <strong className="text-pink-400">Enterprise dashboard</strong> for customers
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "WHY UTAH? WHY NOW?",
      subtitle: "Utah Connection & Perfect Timing",
      content: (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">🏔️ Utah Advantages:</h3>
              <ul className="text-gray-300 space-y-3">
                <li>• <strong className="text-emerald-400">I live here</strong> - local founder with global vision</li>
                <li>• <strong className="text-blue-400">Tech ecosystem:</strong> Qualtrics, Adobe, Domo need multilingual AI</li>
                <li>• <strong className="text-yellow-400">Diverse workforce:</strong> Utah companies serve global markets</li>
                <li>• <strong className="text-purple-400">Investment climate:</strong> Strong VC support for innovative tech</li>
              </ul>
              
              <h3 className="text-xl font-bold text-emerald-400 mb-4 mt-6">🎯 Utah Customer Pipeline:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong className="text-blue-400">Qualtrics:</strong> Global surveys need Somali translation</li>
                <li>• <strong className="text-emerald-400">Adobe:</strong> Creative tools for Somali content creators</li>
                <li>• <strong className="text-yellow-400">Pluralsight:</strong> Educational content in multiple languages</li>
                <li>• <strong className="text-purple-400">Local universities:</strong> Research partnerships ready</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4">⏰ Perfect Timing:</h3>
              <div className="space-y-4">
                <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400">AI boom:</h4>
                  <p className="text-gray-300">ChatGPT made language AI mainstream</p>
                </div>
                <div className="bg-emerald-900/20 p-4 rounded-lg border border-emerald-500/30">
                  <h4 className="font-semibold text-emerald-400">Diversity focus:</h4>
                  <p className="text-gray-300">Companies need inclusive AI systems</p>
                </div>
                <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
                  <h4 className="font-semibold text-yellow-400">African market growth:</h4>
                  <p className="text-gray-300">Fastest growing tech market globally</p>
                </div>
                <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400">Cultural awareness:</h4>
                  <p className="text-gray-300">ESG and DEI requirements growing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "THE ASK & NEXT STEPS",
      subtitle: "Join Us in Building the Future of African AI",
      content: (
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-emerald-900/20 p-6 rounded-xl border border-emerald-500/30">
              <h3 className="text-2xl font-bold text-emerald-400 mb-2">$250K - $500K</h3>
              <p className="text-gray-300">Seed round amount</p>
            </div>
            <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">15-20%</h3>
              <p className="text-gray-300">Equity (negotiable)</p>
            </div>
            <div className="bg-yellow-900/20 p-6 rounded-xl border border-yellow-500/30">
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">60 Days</h3>
              <p className="text-gray-300">Timeline to close</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-6">🚀 What You Get:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ul className="text-left text-gray-300 space-y-2">
              <li>• <strong className="text-emerald-400">Ground floor</strong> of $2.5B African language AI market</li>
              <li>• <strong className="text-blue-400">Utah-based founder</strong> with global market opportunity</li>
              <li>• <strong className="text-yellow-400">Proven traction</strong> with working platform and customers</li>
            </ul>
            <ul className="text-left text-gray-300 space-y-2">
              <li>• <strong className="text-purple-400">Unbeatable moat</strong> through cultural authority</li>
              <li>• <strong className="text-pink-400">Clear path</strong> to $14M ARR in 3 years</li>
              <li>• <strong className="text-orange-400">First-mover advantage</strong> in massive underserved market</li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-2xl p-8 border border-emerald-500/30">
            <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
            <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Yussuf Abdi
            </p>
            <p className="text-gray-300 mb-4">Founder & CEO, Somali AI Dataset</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:yussuf@somaliai.com" className="text-blue-400 hover:text-blue-300">
                yussuf@somaliai.com
              </a>
              <span className="text-gray-500 hidden sm:block">|</span>
              <span className="text-gray-300">Utah, USA</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/investor" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Investor Portal
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Slide {currentSlide + 1} of {slides.length}
              </span>
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                CONFIDENTIAL
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Slide Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="min-h-[600px] flex flex-col">
          {/* Slide Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-gray-300">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Slide Content */}
          <div className="flex-1">
            {slides[currentSlide].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-emerald-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDeck;