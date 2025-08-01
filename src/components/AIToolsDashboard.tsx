// AI Tools Dashboard - Main interface for 20 AI Tools Bundle
import React, { useState } from 'react';
import { 
  Search, 
  Grid, 
  List, 
  Filter, 
  Star, 
  Clock, 
  DollarSign,
  Zap,
  TrendingUp,
  Users,
  Video,
  Bot,
  Crown
} from 'lucide-react';
import AIToolsEngine, { AIToolConfig } from '../services/ai-tools-engine';
import BarakahAgentsDashboard from './BarakahAgentsDashboard';

interface AIToolsDashboardProps {
  userSubscription?: 'free' | 'pro' | 'enterprise';
  userId?: string;
  onToolSelect?: (tool: AIToolConfig) => void;
  onBackToLanding?: () => void;
}

function AIToolsDashboard({ 
  userSubscription = 'free',
  userId,
  onToolSelect,
  onBackToLanding
}: AIToolsDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [showAgents, setShowAgents] = useState(false);

  // Initialize AI Tools Engine
  const aiEngine = new AIToolsEngine();
  const allTools = aiEngine.getAllTools();

  // Filter tools based on search and category
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Tools', count: allTools.length },
    { id: 'content', name: 'Content Creation', count: allTools.filter(t => t.category === 'content').length },
    { id: 'business', name: 'Business Operations', count: allTools.filter(t => t.category === 'business').length },
    { id: 'creative', name: 'Creative & Design', count: allTools.filter(t => t.category === 'creative').length },
    { id: 'communication', name: 'Communication', count: allTools.filter(t => t.category === 'communication').length }
  ];

  const handleToolSelect = (tool: AIToolConfig) => {
    if (onToolSelect) {
      onToolSelect(tool);
    } else {
      setSelectedTool(tool);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'content': 'bg-blue-100 text-blue-800',
      'business': 'bg-green-100 text-green-800',
      'creative': 'bg-purple-100 text-purple-800',
      'communication': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">


      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Advanced AI Suite</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">21 premium AI tools powered by GPT-3.5-turbo for $7.99/month</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm">
                  <span className="font-semibold">{userSubscription.toUpperCase()}</span>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-xs sm:text-sm text-gray-500">Monthly Savings</div>
                  <div className="text-base sm:text-lg font-bold text-green-600">$115+</div>
                </div>
              </div>
              <div className="flex gap-2">
                {onBackToLanding && (
                  <button 
                    onClick={onBackToLanding}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Landing Page
                  </button>
                )}
                <button 
                  onClick={async () => {
                    const { supabase } = await import('../lib/supabase');
                    await supabase.auth.signOut();
                    window.location.href = '/';
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-3 sm:p-4 text-white">
              <div className="flex items-center">
                <Zap className="h-4 sm:h-6 w-4 sm:w-6 mr-2" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">20</div>
                  <div className="text-xs sm:text-sm opacity-90">AI Tools</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 sm:p-4 text-white">
              <div className="flex items-center">
                <DollarSign className="h-4 sm:h-6 w-4 sm:w-6 mr-2" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">$4.99</div>
                  <div className="text-xs sm:text-sm opacity-90">Per Month</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-3 sm:p-4 text-white">
              <div className="flex items-center">
                <TrendingUp className="h-4 sm:h-6 w-4 sm:w-6 mr-2" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">95%</div>
                  <div className="text-xs sm:text-sm opacity-90">Accuracy</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-3 sm:p-4 text-white">
              <div className="flex items-center">
                <Clock className="h-4 sm:h-6 w-4 sm:w-6 mr-2" />
                <div>
                  <div className="text-xl sm:text-2xl font-bold">&lt;30s</div>
                  <div className="text-xs sm:text-sm opacity-90">Avg Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Agents Showcase */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 sm:p-6 mt-4 sm:mt-6 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="w-5 h-5 text-yellow-300" />
                  <h3 className="text-lg sm:text-xl font-bold">🤖 NEW: Enterprise AI Agents</h3>
                </div>
                <p className="text-purple-100 mb-3 sm:mb-4 text-sm sm:text-base">Beyond tools - AI agents that THINK, PLAN & EXECUTE complete workflows automatically!</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>6 Enterprise Agents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Full Workflow Automation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Live Integrations</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-auto">
                <button 
                  onClick={() => setShowAgents(true)}
                  className="w-full lg:w-auto bg-white text-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold hover:bg-purple-50 transition-colors text-sm sm:text-base flex items-center justify-center space-x-2"
                >
                  <Bot className="w-4 h-4" />
                  <span className="hidden sm:inline">Launch AI Agents →</span>
                  <span className="sm:hidden">AI Agents →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Integration Showcase */}
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-4 sm:p-6 mt-4 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold mb-2">🚀 Business Automation Integrations</h3>
                <p className="text-emerald-100 mb-3 sm:mb-4 text-sm sm:text-base">Connect your AI tools to Gmail, Stripe, Facebook, LinkedIn, HubSpot, and more!</p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>11 Integrations Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Zero Setup Costs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-yellow-300 rounded-full"></span>
                    <span>Customer API Keys</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-auto">
                <button 
                  onClick={() => {
                    // This will be handled by parent component
                    const event = new CustomEvent('switchToIntegrations');
                    window.dispatchEvent(event);
                  }}
                  className="w-full lg:w-auto bg-white text-emerald-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">View Integrations →</span>
                  <span className="sm:hidden">Integrations →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 sm:h-5 w-4 sm:w-5" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center justify-center sm:justify-start">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-all ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
              >
                <Grid className="h-3 sm:h-4 w-3 sm:w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-all ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
              >
                <List className="h-3 sm:h-4 w-3 sm:w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <span className="hidden sm:inline">{category.name} ({category.count})</span>
              <span className="sm:hidden">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* INTEGRATIONS BANNER - For Future Barakah AI Agency */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-xl p-6 text-white mb-6">
          <h2 className="text-2xl font-bold mb-2">🚀 Business Automation Integrations</h2>
          <p className="text-emerald-100">Connect your AI tools to external services for complete automation</p>
          <div className="mt-4">
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Coming Soon - Barakah AI Agency
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                onClick={() => handleToolSelect(tool)}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="text-2xl sm:text-3xl">{tool.icon}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
                    <span className="hidden sm:inline">{tool.category}</span>
                    <span className="sm:hidden">{tool.category.slice(0, 3)}</span>
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{tool.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                    <Star className="h-3 sm:h-4 w-3 sm:w-4 fill-current text-yellow-400" />
                    <span>4.9</span>
                  </div>
                  <button className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors">
                    <span className="hidden sm:inline">Use Tool</span>
                    <span className="sm:hidden">Use</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                onClick={() => handleToolSelect(tool)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{tool.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                      <p className="text-gray-600 text-sm">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
                      {tool.category}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Use Tool
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pricing Footer */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Unlock All 20 AI Tools</h2>
            <p className="text-blue-100 mb-4">Get access to our complete AI tools bundle for just $4.99/month</p>
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold">$4.99</div>
                <div className="text-sm text-blue-200">per month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold line-through text-blue-300">$120+</div>
                <div className="text-sm text-blue-200">monthly value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-300">97%</div>
                <div className="text-sm text-blue-200">savings</div>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIToolsDashboard;