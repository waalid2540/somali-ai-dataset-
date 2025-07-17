import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Globe, TrendingUp, Users, Shield } from 'lucide-react';

const InvestorPortal = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  // Simple password protection - in production, use proper authentication
  const INVESTOR_PASSWORD = 'SomaliAI2024!';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === INVESTOR_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please contact Yussuf for access.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Investor Portal
              </h1>
              <p className="text-gray-300">
                Private access for Utah investors and partners
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Access Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none pr-12"
                    placeholder="Enter investor password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {error && (
                  <p className="text-red-400 text-sm mt-2">{error}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Access Investor Materials
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                For password access, contact:
              </p>
              <p className="text-blue-400 font-semibold">
                Yussuf Abdi - Founder & CEO
              </p>
              <p className="text-gray-400 text-sm">
                yussuf@somaliai.com | Utah-based
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Somali AI Dataset - Investor Portal
              </span>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              CONFIDENTIAL
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-900/50 to-emerald-900/50 border border-blue-500/30 mb-8">
            <Shield className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-blue-200 font-medium">Private Investor Materials</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Somali AI Dataset
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Investment Opportunity
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <strong className="text-white">$2.5B African Language AI Market.</strong>
            <span className="text-blue-400"> 25 Million Somali Speakers.</span>
            <br />
            <span className="text-emerald-400">Zero Quality Datasets. Until Now.</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">$250K-$500K</div>
              <div className="text-gray-400">Seed Round</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">15-20%</div>
              <div className="text-gray-400">Equity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">$14M</div>
              <div className="text-gray-400">ARR Target (Y3)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">Utah</div>
              <div className="text-gray-400">Based Founder</div>
            </div>
          </div>
        </div>

        {/* Key Materials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Pitch Deck */}
          <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-2xl p-8 border border-blue-500/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 text-blue-400 mr-3" />
              Investment Pitch Deck
            </h3>
            <p className="text-gray-300 mb-6">
              Complete 10-slide investor presentation covering market opportunity, competitive advantages, financial projections, and Utah connection.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Market size & opportunity ($2.5B)
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                Competitive analysis & moats
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Financial projections (3-year)
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                Utah ecosystem advantages
              </li>
            </ul>
            <a 
              href="/pitch-deck" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              View Pitch Deck
            </a>
          </div>

          {/* Live Platform Demo */}
          <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-2xl p-8 border border-emerald-500/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Globe className="w-6 h-6 text-emerald-400 mr-3" />
              Live Platform Demo
            </h3>
            <p className="text-gray-300 mb-6">
              Working Somali AI Dataset platform with real users, API authentication, payment processing, and enterprise dashboard.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                150+ scholar-approved sentences
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Real-time API text analysis
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                Stripe payment integration
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Enterprise user dashboard
              </li>
            </ul>
            <a 
              href="/signup" 
              className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Demo Platform
            </a>
          </div>
        </div>

        {/* Founder Profile */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Users className="w-6 h-6 text-blue-400 mr-3" />
            Founder Profile - Yussuf Abdi
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Cultural Authority</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Imam in Somali community</li>
                <li>• Deep cultural and religious knowledge</li>
                <li>• Established diaspora connections</li>
                <li>• Scholar validation for all content</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Technical Expertise</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Built entire platform solo</li>
                <li>• React/Next.js, Python, FastAPI</li>
                <li>• Enterprise architecture experience</li>
                <li>• Utah-based with global vision</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-6">Ready to Discuss?</h3>
          <p className="text-xl text-gray-300 mb-8">
            Let's schedule a demo and dive deeper into this massive opportunity
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:yussuf@somaliai.com" 
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              Schedule Meeting
            </a>
            <a 
              href="tel:+1-801-XXX-XXXX" 
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white/5"
            >
              Call Direct
            </a>
          </div>
          
          <div className="mt-8 text-gray-400">
            <p><strong>Yussuf Abdi</strong> - Founder & CEO</p>
            <p>Utah Resident | Somali Cultural Authority | Tech Entrepreneur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorPortal;