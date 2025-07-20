// Integration Manager - UI for customers to manage their integrations
import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Check, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff,
  RefreshCw,
  ExternalLink,
  Shield,
  Zap,
  Mail,
  Calendar,
  CreditCard,
  Users,
  MessageSquare,
  FileText
} from 'lucide-react';
import IntegrationEngine, { IntegrationConfig, IntegrationResult } from '../services/integration-engine';

interface IntegrationCredentials {
  integrationId: string;
  credentials: Record<string, string>;
  isValid: boolean;
  lastValidated: Date;
}

const IntegrationManager: React.FC = () => {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [userCredentials, setUserCredentials] = useState<IntegrationCredentials[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationConfig | null>(null);
  const [showCredentials, setShowCredentials] = useState<Record<string, boolean>>({});
  const [isValidating, setIsValidating] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, IntegrationResult>>({});
  const [activeTab, setActiveTab] = useState<'all' | 'email' | 'social' | 'payment' | 'crm' | 'calendar' | 'notification'>('all');

  const integrationEngine = new IntegrationEngine();

  useEffect(() => {
    loadIntegrations();
    loadUserCredentials();
  }, []);

  const loadIntegrations = () => {
    const allIntegrations = integrationEngine.getAllIntegrations();
    setIntegrations(allIntegrations);
  };

  const loadUserCredentials = () => {
    // In a real app, this would load from user's account/database
    const savedCredentials = localStorage.getItem('integrationCredentials');
    if (savedCredentials) {
      setUserCredentials(JSON.parse(savedCredentials));
    }
  };

  const saveCredentials = (integrationId: string, credentials: Record<string, string>) => {
    const newCredentials: IntegrationCredentials = {
      integrationId,
      credentials,
      isValid: false,
      lastValidated: new Date()
    };

    const updatedCredentials = [
      ...userCredentials.filter(c => c.integrationId !== integrationId),
      newCredentials
    ];

    setUserCredentials(updatedCredentials);
    localStorage.setItem('integrationCredentials', JSON.stringify(updatedCredentials));
  };

  const validateCredentials = async (integrationId: string) => {
    setIsValidating(integrationId);
    
    const userCreds = userCredentials.find(c => c.integrationId === integrationId);
    if (!userCreds) {
      setIsValidating(null);
      return;
    }

    try {
      const isValid = await integrationEngine.validateCredentials(integrationId, userCreds.credentials);
      
      const updatedCredentials = userCredentials.map(c =>
        c.integrationId === integrationId
          ? { ...c, isValid, lastValidated: new Date() }
          : c
      );

      setUserCredentials(updatedCredentials);
      localStorage.setItem('integrationCredentials', JSON.stringify(updatedCredentials));
    } catch (error) {
      console.error('Validation failed:', error);
    }

    setIsValidating(null);
  };

  const testIntegration = async (integrationId: string) => {
    const userCreds = userCredentials.find(c => c.integrationId === integrationId);
    if (!userCreds || !userCreds.isValid) return;

    try {
      let result: IntegrationResult;

      switch (integrationId) {
        case 'gmail':
          result = await integrationEngine.sendEmail(userCreds.credentials, {
            to: ['test@example.com'],
            subject: 'Test Email from AI Tools',
            htmlContent: '<p>This is a test email from your AI Tools integration.</p>',
            textContent: 'This is a test email from your AI Tools integration.'
          });
          break;
        case 'slack':
          result = await integrationEngine.sendSlackNotification(userCreds.credentials, {
            message: 'Test notification from AI Tools integration'
          });
          break;
        default:
          result = {
            success: true,
            message: 'Integration configured successfully',
            integrationUsed: integrationId
          };
      }

      setTestResults(prev => ({ ...prev, [integrationId]: result }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [integrationId]: {
          success: false,
          message: 'Test failed',
          error: error instanceof Error ? error.message : 'Unknown error',
          integrationUsed: integrationId
        }
      }));
    }
  };

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-5 h-5" />;
      case 'social': return <MessageSquare className="w-5 h-5" />;
      case 'payment': return <CreditCard className="w-5 h-5" />;
      case 'crm': return <Users className="w-5 h-5" />;
      case 'calendar': return <Calendar className="w-5 h-5" />;
      case 'notification': return <MessageSquare className="w-5 h-5" />;
      case 'signature': return <FileText className="w-5 h-5" />;
      default: return <Settings className="w-5 h-5" />;
    }
  };

  const filteredIntegrations = activeTab === 'all' 
    ? integrations 
    : integrations.filter(i => i.type === activeTab);

  const getUserCredentials = (integrationId: string) => {
    return userCredentials.find(c => c.integrationId === integrationId);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Zap className="w-6 h-6 text-blue-600 mr-3" />
                Integration Manager
              </h2>
              <p className="text-gray-600 mt-2">
                Connect your AI tools to external services for automated workflows
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">
                {userCredentials.filter(c => c.isValid).length}
              </div>
              <div className="text-sm text-gray-500">Active Integrations</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All', icon: Settings },
              { id: 'email', label: 'Email', icon: Mail },
              { id: 'social', label: 'Social', icon: MessageSquare },
              { id: 'payment', label: 'Payment', icon: CreditCard },
              { id: 'crm', label: 'CRM', icon: Users },
              { id: 'calendar', label: 'Calendar', icon: Calendar },
              { id: 'notification', label: 'Notifications', icon: MessageSquare }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {tab.id === 'all' 
                    ? integrations.length 
                    : integrations.filter(i => i.type === tab.id).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Integration Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map(integration => {
              const userCreds = getUserCredentials(integration.id);
              const isConfigured = !!userCreds;
              const isValid = userCreds?.isValid ?? false;
              const testResult = testResults[integration.id];

              return (
                <div key={integration.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                  {/* Integration Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isValid ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {getIntegrationIcon(integration.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                        <p className="text-xs text-gray-500 capitalize">{integration.type}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {isValid && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      )}
                      {isConfigured && !isValid && (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      )}
                      {!integration.isActive && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          Beta
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

                  {/* Status */}
                  <div className="mb-4">
                    {isValid && (
                      <div className="flex items-center text-emerald-600 text-sm">
                        <Check className="w-4 h-4 mr-2" />
                        Connected & Validated
                      </div>
                    )}
                    {isConfigured && !isValid && (
                      <div className="flex items-center text-orange-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Configuration Error
                      </div>
                    )}
                    {!isConfigured && (
                      <div className="flex items-center text-gray-500 text-sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Not Configured
                      </div>
                    )}
                  </div>

                  {/* Test Result */}
                  {testResult && (
                    <div className={`p-3 rounded-lg mb-4 text-sm ${
                      testResult.success 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {testResult.message}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedIntegration(integration)}
                      className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                        isConfigured
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isConfigured ? 'Edit' : 'Setup'}
                    </button>
                    
                    {isValid && (
                      <button
                        onClick={() => testIntegration(integration.id)}
                        className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                        title="Test Integration"
                      >
                        <Zap className="w-4 h-4" />
                      </button>
                    )}
                    
                    {isConfigured && (
                      <button
                        onClick={() => validateCredentials(integration.id)}
                        disabled={isValidating === integration.id}
                        className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50"
                        title="Validate Credentials"
                      >
                        <RefreshCw className={`w-4 h-4 ${isValidating === integration.id ? 'animate-spin' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Setup Modal */}
      {selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    {getIntegrationIcon(selectedIntegration.type)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedIntegration.name}</h3>
                    <p className="text-gray-600">Configure your integration</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Setup Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Setup Instructions
                </h4>
                <div className="text-sm text-blue-800 whitespace-pre-line">
                  {selectedIntegration.setupInstructions}
                </div>
              </div>

              {/* Credential Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const credentials: Record<string, string> = {};
                
                selectedIntegration.requiredCredentials.forEach(cred => {
                  credentials[cred] = formData.get(cred) as string;
                });

                saveCredentials(selectedIntegration.id, credentials);
                setSelectedIntegration(null);
              }}>
                <div className="space-y-4">
                  {selectedIntegration.requiredCredentials.map(credentialKey => {
                    const userCreds = getUserCredentials(selectedIntegration.id);
                    const currentValue = userCreds?.credentials[credentialKey] || '';
                    const isSecret = credentialKey.includes('secret') || credentialKey.includes('key');

                    return (
                      <div key={credentialKey}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {credentialKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={isSecret && !showCredentials[credentialKey] ? 'password' : 'text'}
                            name={credentialKey}
                            defaultValue={currentValue}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder={`Enter your ${credentialKey.replace(/_/g, ' ')}`}
                          />
                          {isSecret && (
                            <button
                              type="button"
                              onClick={() => setShowCredentials(prev => ({
                                ...prev,
                                [credentialKey]: !prev[credentialKey]
                              }))}
                              className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                            >
                              {showCredentials[credentialKey] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex space-x-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Configuration
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedIntegration(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* Help Link */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a
                  href="#"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Need help? View detailed setup guide
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationManager;