import React, { useState } from 'react';
import { ArrowRight, Globe, Users, Database, Shield, Zap, Star, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const handleNotifyMe = () => {
    // For now, just an alert - can integrate with email service later
    alert('Thank you for your interest! We\'ll notify you when we launch.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Somali AI Dataset
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#vision" className="text-gray-300 hover:text-white transition-colors">Vision</a>
              <a href="#dataset" className="text-gray-300 hover:text-white transition-colors">Dataset</a>
              <Link href="/ai-market-tools" className="text-yellow-400 hover:text-yellow-300 transition-colors font-semibold">🔥 AI Market Tools</Link>
              <Link href="/ai-tools-bundle" className="text-gray-300 hover:text-white transition-colors">Tools Suite</Link>
              <Link href="/ai-meeting-pro" className="text-gray-300 hover:text-white transition-colors">Meeting AI</Link>
              <Link href="/investor" className="text-gray-300 hover:text-white transition-colors">Investors</Link>
              <button 
                onClick={handleNotifyMe}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Notified
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-900/50 to-emerald-900/50 border border-blue-500/30 mb-8">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-blue-200 font-medium">Building the Future of Somali AI - Coming Soon</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            The World's First
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Somali AI Dataset
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-white">25 million Somali speakers worldwide.</strong> 
            <span className="text-blue-400"> Zero authentic AI datasets.</span>
            <br />
            <span className="text-emerald-400">First-mover in untapped </span>
            <strong className="text-yellow-400">25 million speaker market.</strong>
          </p>

          {/* Market Opportunity Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">25M</div>
              <div className="text-gray-400">Global Speakers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">FIRST</div>
              <div className="text-gray-400">In The World</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">ZERO</div>
              <div className="text-gray-400">Competition</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
              <div className="text-gray-400">Market Share</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/ai-market-tools"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <Zap className="mr-2 w-5 h-5" />
              🔥 AI Market Tools - Enterprise
            </Link>
            <button 
              onClick={handleNotifyMe}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <Mail className="mr-2 w-5 h-5" />
              Get Dataset Access
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">Trusted by developers and organizations worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-gray-400 font-semibold">AI Researchers</div>
              <div className="text-gray-400 font-semibold">Educational Institutions</div>
              <div className="text-gray-400 font-semibold">Translation Services</div>
              <div className="text-gray-400 font-semibold">Islamic Organizations</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Cultural Authority Meets AI Innovation
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Building the world's first culturally authentic Somali AI dataset with unmatched community trust and technical excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Founder Authority */}
            <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-2xl p-8 border border-blue-500/20">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Yussuf Abdi</h3>
                <p className="text-emerald-400 font-semibold">Founder & Cultural Authority</p>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <Shield className="w-5 h-5 text-emerald-400 mr-3" />
                  <span>Imam and Somali community leader</span>
                </li>
                <li className="flex items-center">
                  <Globe className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Deep cultural and linguistic expertise</span>
                </li>
                <li className="flex items-center">
                  <Zap className="w-5 h-5 text-emerald-400 mr-3" />
                  <span><strong>Machine Learning & AI specialist</strong></span>
                </li>
                <li className="flex items-center">
                  <Database className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Full-stack development & NLP engineering</span>
                </li>
                <li className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-3" />
                  <span>Scholar-approved content validation</span>
                </li>
              </ul>
            </div>

            {/* Technical Excellence */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-xl p-6 border border-emerald-500/20">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Database className="w-6 h-6 text-emerald-400 mr-3" />
                  150+ Authentic Sentences
                </h4>
                <p className="text-gray-300">
                  Carefully curated religious, cultural, and linguistic content with 95%+ quality scores and full community validation.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-xl p-6 border border-blue-500/20">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Shield className="w-6 h-6 text-blue-400 mr-3" />
                  100% Scholar Approved
                </h4>
                <p className="text-gray-300">
                  Every piece of content is validated by Islamic scholars and cultural experts for authenticity and appropriateness.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-xl p-6 border border-emerald-500/20">
                <h4 className="text-xl font-bold text-white mb-3 flex items-center">
                  <Globe className="w-6 h-6 text-emerald-400 mr-3" />
                  Global Impact Vision
                </h4>
                <p className="text-gray-300">
                  Connecting 25 million Somali speakers worldwide to the AI revolution while preserving cultural heritage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Preview Section */}
      <section id="dataset" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Our Somali AI Dataset
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The most comprehensive, culturally authentic, and technically advanced Somali language dataset available.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Scholar Approved</h3>
              <p className="text-gray-300 mb-6">Every piece of content is validated by Islamic scholars and cultural experts, ensuring 100% authenticity and religious appropriateness.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Imam-verified content
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Cultural context validation
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Religious compliance guarantee
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Enterprise Performance</h3>
              <p className="text-gray-300 mb-6">Lightning-fast API responses, 99.9% uptime, and enterprise-grade security for mission-critical applications.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Sub-100ms response times
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Unlimited requests
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  99.9% uptime SLA
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Comprehensive Coverage</h3>
              <p className="text-gray-300 mb-6">From religious texts to modern business terminology, our dataset covers every aspect of Somali language usage.</p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Religious & cultural content
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Business & technical terms
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Dialectal variations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Our Vision for Somali AI
          </h2>
          <p className="text-xl text-gray-300 mb-16">
            Building the bridge between <strong className="text-yellow-400">25 million untapped Somali speakers</strong> and the global AI revolution.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="bg-gradient-to-br from-red-900/30 to-gray-800/50 rounded-2xl p-8 border border-red-500/20">
              <h3 className="text-2xl font-bold text-white mb-4">The Problem</h3>
              <div className="text-4xl mb-6">🚨</div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                  <strong className="text-yellow-400">25 million Somali speakers</strong> worldwide
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                  <strong className="text-white">ZERO quality datasets</strong> available
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                  <strong className="text-red-400">Cultural misrepresentation</strong> in AI
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                  <strong className="text-orange-400">Massive untapped revenue</strong> opportunity
                </li>
              </ul>
            </div>

            {/* Our Solution */}
            <div className="bg-gradient-to-br from-blue-900/50 to-emerald-900/50 rounded-2xl p-8 border-2 border-emerald-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                  🌟 OUR SOLUTION
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Cultural AI</h3>
              <div className="text-4xl mb-6">🕌</div>
              <ul className="space-y-4 mb-8 text-left">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <strong className="text-yellow-400">FIRST-MOVER</strong> advantage with 25M speakers
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <strong className="text-emerald-400">100% market share</strong> opportunity
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <strong className="text-blue-400">Cultural authority</strong> = unbeatable moat
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                  <strong className="text-purple-400">Scholar-approved</strong> authentic content
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              🌍 Connecting heritage with innovation • 🤝 Building bridges, not barriers • 🚀 Launching soon
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Trusted by the Somali Community Worldwide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Educational Institutions</h4>
                  <p className="text-gray-400 text-sm">Universities & Schools</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The most authentic Somali language resource we've found. Essential for our linguistics research."
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-xl p-6 border border-emerald-500/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Translation Services</h4>
                  <p className="text-gray-400 text-sm">Professional Agencies</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Finally, a reliable source for quality-assured Somali content. Game-changing for our translations."
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-xl p-6 border border-blue-500/20">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Islamic Organizations</h4>
                  <p className="text-gray-400 text-sm">Mosques & Communities</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Culturally authentic and religiously appropriate. Perfect for our community outreach programs."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            <span className="text-yellow-400">25 MILLION</span> Speaker Opportunity
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join us in capturing our share of the massive AI market with the world's first authentic Somali AI dataset. 
            <strong className="text-emerald-400"> First-mover advantage. Zero competition. 100% market share potential.</strong>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={handleNotifyMe}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="mr-2 w-5 h-5" />
              Get Early Access
            </button>
            <Link 
              href="/investor" 
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white/5"
            >
              Investor Information
            </Link>
          </div>

          <p className="text-gray-400">
            💰 25M speaker opportunity • 🚀 First-mover advantage • 🤝 Investment & partnerships welcome
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Somali AI Dataset
                </span>
              </div>
              <p className="text-gray-400">
                The world's most comprehensive and culturally authentic Somali AI dataset.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="/api" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/community" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="/status" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Somali AI Dataset. All rights reserved. • 
              <span className="text-emerald-400"> Building the future of African AI</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;