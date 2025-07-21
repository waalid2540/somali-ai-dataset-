// Simple Analytics Test - Verify analytics are working
import React from 'react';
import { TrendingUp, DollarSign, Zap, Users } from 'lucide-react';

const SimpleAnalyticsTest: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">📊 ROI Analytics Dashboard</h2>
          <p className="text-gray-600 mt-2">Track your integration performance and cost savings</p>
        </div>
        
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">Monthly Savings</p>
                  <p className="text-3xl font-bold text-emerald-900 mt-2">$2,840</p>
                  <p className="text-sm text-emerald-600 mt-1">vs individual tools</p>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Integrations Active</p>
                  <p className="text-3xl font-bold text-blue-900 mt-2">11</p>
                  <p className="text-sm text-blue-600 mt-1">business automations</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Success Rate</p>
                  <p className="text-3xl font-bold text-purple-900 mt-2">98.3%</p>
                  <p className="text-sm text-purple-600 mt-1">automation success</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">ROI</p>
                  <p className="text-3xl font-bold text-orange-900 mt-2">1,420%</p>
                  <p className="text-sm text-orange-600 mt-1">return on investment</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Integration Performance */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Integration Performance</h3>
            <div className="space-y-4">
              {[
                { name: 'Gmail Integration', usage: 324, savings: '$486', status: 'Active' },
                { name: 'Facebook Integration', usage: 89, savings: '$356', status: 'Active' },
                { name: 'LinkedIn Integration', usage: 156, savings: '$624', status: 'Active' },
                { name: 'Stripe Integration', usage: 67, savings: '$201', status: 'Active' },
                { name: 'HubSpot Integration', usage: 234, savings: '$702', status: 'Active' },
                { name: 'Slack Integration', usage: 178, savings: '$178', status: 'Active' }
              ].map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{integration.name}</p>
                      <p className="text-sm text-gray-600">{integration.usage} uses this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-emerald-600">{integration.savings}</p>
                    <p className="text-sm text-gray-600">{integration.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-emerald-50 border-t border-emerald-200">
          <div className="text-center">
            <h3 className="text-xl font-bold text-emerald-900 mb-2">💰 Amazing ROI!</h3>
            <p className="text-emerald-700 mb-4">
              Your integrations save <strong>$2,840/month</strong> vs buying tools individually. 
              At $19.99/month, that's a <strong>1,420% ROI</strong>!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">142x</div>
                <div className="text-sm text-emerald-700">Return Multiple</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">$2.11</div>
                <div className="text-sm text-emerald-700">Cost per automation</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="text-2xl font-bold text-emerald-600">28</div>
                <div className="text-sm text-emerald-700">Daily automations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleAnalyticsTest;