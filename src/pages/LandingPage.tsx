import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Globe, Users, Database, Shield, Zap, Star } from 'lucide-react';

const LandingPage = () => {
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    window.location.href = '/signup';
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
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#docs" className="text-gray-300 hover:text-white transition-colors">API Docs</a>
              <a href="/login" className="text-gray-300 hover:text-white transition-colors">Sign In</a>
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Started
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
            <span className="text-blue-200 font-medium">World's First Professional Somali AI Dataset API</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Enterprise-Grade
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Somali AI Dataset
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            <strong className="text-white">25 million Somali speakers.</strong> 
            <span className="text-blue-400"> Zero quality AI datasets.</span>
            <br />
            <span className="text-emerald-400">We're changing that with scholar-approved, culturally authentic content.</span>
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">25M+</div>
              <div className="text-gray-400">Somali Speakers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">95%+</div>
              <div className="text-gray-400">Quality Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-400">Scholar Approved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">$9.99</div>
              <div className="text-gray-400">Unlimited Access</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Start Building Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <a 
              href="#demo" 
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white/5"
            >
              View Live Demo
            </a>
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

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Why Choose Our Somali AI Dataset?
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-300 mb-16">
            Get unlimited access to our entire Somali AI dataset for less than the cost of a Netflix subscription.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Tier */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">Free Trial</h3>
              <div className="text-4xl font-bold text-gray-400 mb-6">$0</div>
              <p className="text-gray-300 mb-8">Perfect for testing and evaluation</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  100 API requests
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  Full feature access
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  Community support
                </li>
              </ul>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-gradient-to-br from-blue-900/50 to-emerald-900/50 rounded-2xl p-8 border-2 border-emerald-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                  🔥 MOST POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Unlimited Pro</h3>
              <div className="text-4xl font-bold text-emerald-400 mb-2">$9.99</div>
              <p className="text-gray-300 mb-8">per month • Unlimited everything</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  <strong>Unlimited API requests</strong>
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  Advanced NLP analysis
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  Bulk processing support
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                  Commercial license
                </li>
              </ul>
              <button 
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Get Started Now
              </button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400">
              🔒 Cancel anytime • 💳 Secure payments by Stripe • 🏆 30-day money-back guarantee
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
            Ready to Build with Somali AI?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of developers and organizations using our API to power their Somali language applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Trial
            </button>
            <a 
              href="/docs" 
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white/5"
            >
              Read Documentation
            </a>
          </div>

          <p className="text-gray-400">
            No credit card required • Start building in minutes • Cancel anytime
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