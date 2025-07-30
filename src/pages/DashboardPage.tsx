import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Key, 
  BarChart3, 
  Database, 
  Settings, 
  LogOut,
  Copy,
  CheckCircle,
  TrendingUp,
  Zap,
  Shield,
  Users,
  Video
} from 'lucide-react';

interface UserStats {
  total_requests: number;
  requests_today: number;
  plan: string;
  api_key: string;
  created_at: string;
}

const DashboardPage = () => {
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [copied, setCopied] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const apiKey = localStorage.getItem('api_key');
      if (!apiKey) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch('http://localhost:8000/user/stats', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (response.ok) {
        const stats = await response.json();
        setUserStats(stats);
      } else {
        console.error('Failed to fetch user stats');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const copyApiKey = () => {
    if (userStats?.api_key) {
      navigator.clipboard.writeText(userStats.api_key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const testAPI = async () => {
    setTestLoading(true);
    try {
      const apiKey = localStorage.getItem('api_key');
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          text: 'Allaah waa mid ka keliya, uma baahan cid, umana dhalin cidna umana dhalan.'
        })
      });

      if (response.ok) {
        const result = await response.json();
        setTestResult(result);
        fetchUserStats(); // Refresh stats
      }
    } catch (error) {
      console.error('API test error:', error);
    } finally {
      setTestLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('api_key');
    localStorage.removeItem('user_info');
    window.location.href = '/';
  };

  if (!userStats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const planColor = userStats.plan === 'unlimited' ? 'emerald' : 'gray';

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
                Somali AI Dataset
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium bg-${planColor}-500/20 text-${planColor}-400 border border-${planColor}-500/30`}>
                {userStats.plan.toUpperCase()} PLAN
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-300">
            Manage your Somali AI Dataset API access and monitor your usage
          </p>
          
          {/* TUTORIAL STUDIO - PROMINENT PLACEMENT */}
          <div className="mt-6 p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl border-2 border-red-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Video className="w-8 h-8 text-white mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-white">🎥 TUTORIAL STUDIO IS HERE!</h3>
                  <p className="text-red-100">Record professional demos of your SaaS products</p>
                </div>
              </div>
              <a
                href="/tutorial-studio"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors"
              >
                Open Studio →
              </a>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Total Requests</h3>
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400">{userStats.total_requests}</div>
            <p className="text-gray-400 text-sm">All time usage</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-xl p-6 border border-emerald-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Today's Usage</h3>
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">{userStats.requests_today}</div>
            <p className="text-gray-400 text-sm">Requests today</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Plan Status</h3>
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400">
              {userStats.plan === 'unlimited' ? 'UNLIMITED' : 'FREE'}
            </div>
            <p className="text-gray-400 text-sm">
              {userStats.plan === 'unlimited' ? '$9.99/month' : '100 requests'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-xl p-6 border border-emerald-500/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Dataset Size</h3>
              <Database className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">150+</div>
            <p className="text-gray-400 text-sm">Religious sentences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Key Section */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Key className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Your API Key</h2>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <code className="text-blue-400 font-mono text-sm break-all">
                  {userStats.api_key}
                </code>
                <button
                  onClick={copyApiKey}
                  className="ml-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
              <h4 className="font-semibold text-white mb-2">Usage Example:</h4>
              <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -X POST "http://localhost:8000/analyze" \\
  -H "Authorization: Bearer ${userStats.api_key}" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Allaah waa mid ka keliya"}'`}
              </pre>
            </div>
          </div>

          {/* API Testing */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-emerald-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Test Your API</h2>
            </div>

            <p className="text-gray-300 mb-4">
              Test your API with authentic Somali religious content
            </p>

            <button
              onClick={testAPI}
              disabled={testLoading}
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 mb-4"
            >
              {testLoading ? 'Testing...' : 'Test API Call'}
            </button>

            {testResult && (
              <div className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">API Response:</h4>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  {JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <a
              href="/tutorial-studio"
              className="bg-gradient-to-br from-red-900/50 to-red-800/50 rounded-xl p-6 border border-red-500/40 hover:border-red-500/60 transition-all duration-300 group"
            >
              <Video className="w-8 h-8 text-red-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">🎥 TUTORIAL STUDIO</h3>
              <p className="text-gray-300">
                Record and manage tutorial videos for your SaaS products
              </p>
            </a>

            <a
              href="/voice-clone-studio"
              className="bg-gradient-to-br from-purple-900/50 to-pink-800/50 rounded-xl p-6 border border-purple-500/40 hover:border-purple-500/60 transition-all duration-300 group"
            >
              <span className="text-2xl mb-4 block group-hover:scale-110 transition-transform">🎤</span>
              <h3 className="text-lg font-semibold text-white mb-2">🚀 VOICE CLONE STUDIO</h3>
              <p className="text-gray-300">
                Clone your Somali voice, create AI assistants, generate speech
              </p>
            </a>

            <a
              href="/docs"
              className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
            >
              <Database className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">API Documentation</h3>
              <p className="text-gray-300">
                Complete guide to using the Somali AI Dataset API
              </p>
            </a>

            <a
              href="/examples"
              className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group"
            >
              <Zap className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">Code Examples</h3>
              <p className="text-gray-300">
                Ready-to-use code snippets in multiple languages
              </p>
            </a>

            <a
              href="/support"
              className="bg-gradient-to-br from-blue-900/30 to-emerald-900/30 rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group"
            >
              <Users className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-semibold text-white mb-2">Get Support</h3>
              <p className="text-gray-300">
                Need help? Contact our support team
              </p>
            </a>
          </div>
        </div>

        {/* Upgrade Notice for Free Users */}
        {userStats.plan === 'free' && (
          <div className="mt-8 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-2xl p-6 border border-emerald-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Upgrade to Unlimited Pro
                </h3>
                <p className="text-gray-300">
                  Get unlimited API requests for just $9.99/month and dominate the market!
                </p>
              </div>
              <a
                href="/upgrade"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Upgrade Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;