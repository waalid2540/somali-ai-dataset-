// AI Tools Bundle - Main Page for 20 AI Tools at $19.99/month
import React, { useState } from 'react';
import Head from 'next/head';
import AIToolsDashboard from '../components/AIToolsDashboard';
import AIToolInterface from '../components/AIToolInterface';
import AIAgentsDashboard from '../components/AIAgentsDashboard';
import AIToolsEngine, { AIToolConfig } from '../services/ai-tools-engine';

function AIToolsBundlePage() {
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [activeTab, setActiveTab] = useState<'tools' | 'agents' | 'analytics'>('agents');
  const [userSubscription] = useState<'free' | 'pro' | 'enterprise'>('pro');

  const handleToolSelect = (tool: AIToolConfig) => {
    setSelectedTool(tool);
  };

  const handleBackToDashboard = () => {
    setSelectedTool(null);
  };

  // Listen for agents switch event
  React.useEffect(() => {
    const handleSwitchToAgents = () => {
      setActiveTab('agents');
    };

    window.addEventListener('switchToAgents', handleSwitchToAgents);
    return () => window.removeEventListener('switchToAgents', handleSwitchToAgents);
  }, []);

  return (
    <>
      <Head>
        <title>AI Tools Bundle - 20 Powerful AI Tools for $19.99/month</title>
        <meta 
          name="description" 
          content="Access 20 professional AI tools including Blog Generator, Social Media AI, Ad Copy Creator, Email Marketing AI, and more. All for just $19.99/month - Save 97% compared to individual tools." 
        />
        <meta name="keywords" content="AI tools, content generation, blog writing, social media, email marketing, business automation, artificial intelligence, content creation, marketing tools" />
      </Head>

      <div className="min-h-screen">
        {selectedTool ? (
          <AIToolInterface 
            tool={selectedTool}
            onBack={handleBackToDashboard}
            userSubscription={userSubscription}
          />
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('agents')}
                    className={`py-4 px-4 border-b-2 font-semibold text-base transition-colors relative ${
                      activeTab === 'agents'
                        ? 'border-emerald-500 text-emerald-600 bg-emerald-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    } rounded-t-lg`}
                  >
                    🤖 AI Agents Squad
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                      NEW
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('tools')}
                    className={`py-4 px-4 border-b-2 font-semibold text-base transition-colors ${
                      activeTab === 'tools'
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    } rounded-t-lg`}
                  >
                    🛠️ Classic AI Tools
                  </button>
                  <button
                    onClick={() => setActiveTab('analytics')}
                    className={`py-4 px-4 border-b-2 font-semibold text-base transition-colors ${
                      activeTab === 'analytics'
                        ? 'border-purple-500 text-purple-600 bg-purple-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    } rounded-t-lg`}
                  >
                    📊 ROI Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1">
              {activeTab === 'tools' && (
                <AIToolsDashboard 
                  userSubscription={userSubscription}
                  userId="demo-user"
                  onToolSelect={handleToolSelect}
                />
              )}
              {activeTab === 'integrations' && <SimpleIntegrationTest />}
              {activeTab === 'analytics' && <SimpleAnalyticsTest />}
            </div>
          </>
        )}
      </div>

      {!selectedTool && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">20 AI Tools Active</span>
                </div>
                <div className="text-sm text-gray-600">
                  Monthly savings: <span className="font-semibold text-green-600">$780+</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-blue-600">11 integrations</span> available
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <div className="text-lg font-bold text-gray-900">$19.99/month</div>
                  <div className="text-xs text-gray-500">vs $800+ individually</div>
                </div>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AIToolsBundlePage;// Force rebuild
