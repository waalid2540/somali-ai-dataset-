// Integration Dashboard - Shows usage stats and integration health
import React, { useState, useEffect } from 'react';
import {
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Mail,
  MessageSquare,
  CreditCard,
  Users,
  Calendar,
  Zap,
  BarChart3,
  PieChart,
  RefreshCw
} from 'lucide-react';
import IntegrationEngine from '../services/integration-engine';

interface IntegrationUsage {
  integrationId: string;
  integrationName: string;
  totalUses: number;
  successRate: number;
  lastUsed: Date;
  monthlyUsage: number;
  costSaved: number;
  status: 'active' | 'error' | 'inactive';
}

interface DashboardStats {
  totalIntegrations: number;
  activeIntegrations: number;
  totalAutomations: number;
  costSaved: number;
  successRate: number;
  monthlyUsage: number;
}

const IntegrationDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalIntegrations: 0,
    activeIntegrations: 0,
    totalAutomations: 0,
    costSaved: 0,
    successRate: 0,
    monthlyUsage: 0
  });

  const [usage, setUsage] = useState<IntegrationUsage[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  const integrationEngine = new IntegrationEngine();

  useEffect(() => {
    loadDashboardData();
  }, [timeRange]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    
    // Simulate loading dashboard data
    // In a real app, this would come from your analytics backend
    setTimeout(() => {
      const mockStats: DashboardStats = {
        totalIntegrations: 11,
        activeIntegrations: 8,
        totalAutomations: 1247,
        costSaved: 2840,
        successRate: 98.3,
        monthlyUsage: 847
      };

      const mockUsage: IntegrationUsage[] = [
        {
          integrationId: 'gmail',
          integrationName: 'Gmail',
          totalUses: 324,
          successRate: 99.1,
          lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          monthlyUsage: 324,
          costSaved: 486, // $1.50 per email vs $0.01
          status: 'active'
        },
        {
          integrationId: 'facebook',
          integrationName: 'Facebook',
          totalUses: 89,
          successRate: 96.6,
          lastUsed: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
          monthlyUsage: 89,
          costSaved: 356, // $4 per post vs $0
          status: 'active'
        },
        {
          integrationId: 'linkedin',
          integrationName: 'LinkedIn',
          totalUses: 156,
          successRate: 98.7,
          lastUsed: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
          monthlyUsage: 156,
          costSaved: 624, // $4 per post vs $0
          status: 'active'
        },
        {
          integrationId: 'stripe',
          integrationName: 'Stripe',
          totalUses: 67,
          successRate: 100,
          lastUsed: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
          monthlyUsage: 67,
          costSaved: 201, // $3 per invoice vs $0
          status: 'active'
        },
        {
          integrationId: 'hubspot',
          integrationName: 'HubSpot',
          totalUses: 234,
          successRate: 97.4,
          lastUsed: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          monthlyUsage: 234,
          costSaved: 702, // $3 per lead vs $0
          status: 'active'
        },
        {
          integrationId: 'google_calendar',
          integrationName: 'Google Calendar',
          totalUses: 45,
          successRate: 95.6,
          lastUsed: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
          monthlyUsage: 45,
          costSaved: 135, // $3 per booking vs $0
          status: 'active'
        },
        {
          integrationId: 'slack',
          integrationName: 'Slack',
          totalUses: 178,
          successRate: 99.4,
          lastUsed: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
          monthlyUsage: 178,
          costSaved: 178, // $1 per notification vs $0
          status: 'active'
        },
        {
          integrationId: 'zapier',
          integrationName: 'Zapier',
          totalUses: 154,
          successRate: 94.2,
          lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          monthlyUsage: 154,
          costSaved: 462, // $3 per automation vs $0
          status: 'active'
        }
      ];

      setStats(mockStats);
      setUsage(mockUsage);
      setIsLoading(false);
    }, 1000);
  };

  const getIntegrationIcon = (integrationId: string) => {
    switch (integrationId) {
      case 'gmail':
      case 'outlook':
        return <Mail className="w-5 h-5" />;
      case 'facebook':
      case 'linkedin':
      case 'twitter':
        return <MessageSquare className="w-5 h-5" />;
      case 'stripe':
        return <CreditCard className="w-5 h-5" />;
      case 'hubspot':
      case 'zapier':
        return <Users className="w-5 h-5" />;
      case 'google_calendar':
        return <Calendar className="w-5 h-5" />;
      case 'slack':
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <Zap className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-100';
      case 'error': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-lg text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Activity className="w-8 h-8 text-blue-600 mr-3" />
            Integration Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Monitor your automation performance and cost savings</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button
            onClick={loadDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Integrations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalIntegrations}</p>
              <p className="text-sm text-emerald-600 mt-1">
                {stats.activeIntegrations} active
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Automations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalAutomations.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +23% vs last month
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cost Saved</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${stats.costSaved.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 mt-1">
                This month
              </p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.successRate}%</p>
              <p className="text-sm text-emerald-600 mt-1 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Excellent
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Integration Performance Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Integration Performance
          </h2>
          <p className="text-gray-600 mt-1">Detailed usage and performance metrics for each integration</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Integration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost Saved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Used
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {usage.map((item) => (
                <tr key={item.integrationId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        {getIntegrationIcon(item.integrationId)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.integrationName}</div>
                        <div className="text-sm text-gray-500">{item.integrationId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.totalUses.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">uses this month</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`text-sm font-medium ${
                        item.successRate >= 98 ? 'text-emerald-600' : 
                        item.successRate >= 95 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.successRate}%
                      </div>
                      {item.successRate >= 98 && <CheckCircle className="w-4 h-4 text-emerald-500 ml-1" />}
                      {item.successRate < 95 && <AlertTriangle className="w-4 h-4 text-red-500 ml-1" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-emerald-600">${item.costSaved.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">this month</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{formatTimeAgo(item.lastUsed)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI Insights */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">💰 ROI Analysis</h3>
            <p className="text-gray-600 mb-4">
              Your integrations have saved you <strong className="text-emerald-600">${stats.costSaved.toLocaleString()}</strong> this month.
              At $19.99/month, your ROI is <strong className="text-emerald-600">{Math.round((stats.costSaved / 19.99) * 100)}%</strong>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">{Math.round(stats.costSaved / 19.99)}x</div>
                <div className="text-sm text-gray-600">Return on Investment</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">${Math.round(stats.costSaved / stats.totalAutomations * 100) / 100}</div>
                <div className="text-sm text-gray-600">Cost per automation</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{Math.round(stats.totalAutomations / 30)}</div>
                <div className="text-sm text-gray-600">Daily automations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationDashboard;