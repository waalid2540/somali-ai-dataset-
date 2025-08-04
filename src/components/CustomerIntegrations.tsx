import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, XCircle, Settings, Eye, EyeOff } from 'lucide-react';

interface CustomerIntegrationsProps {
  userId: string;
  onBack: () => void;
}

interface Integration {
  id: string;
  name: string;
  type: string;
  icon: string;
  status: 'connected' | 'disconnected';
  credentials?: Record<string, string>;
}

export default function CustomerIntegrations({ userId, onBack }: CustomerIntegrationsProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'gmail',
      name: 'Gmail',
      type: 'email',
      icon: '📧',
      status: 'disconnected'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      type: 'social',
      icon: '💼',
      status: 'disconnected'
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      type: 'cms',
      icon: '🌐',
      status: 'disconnected'
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [credentials, setCredentials] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectIntegration = async (integration: Integration) => {
    setSelectedIntegration(integration);
    
    // Pre-populate existing credentials if any
    if (integration.credentials) {
      setCredentials(integration.credentials);
    } else {
      // Set default credential fields based on integration type
      switch (integration.id) {
        case 'gmail':
          setCredentials({
            gmail_email: '',
            gmail_app_password: ''
          });
          break;
        case 'linkedin':
          setCredentials({
            linkedin_access_token: ''
          });
          break;
        case 'wordpress':
          setCredentials({
            wordpress_url: '',
            wordpress_username: '',
            wordpress_app_password: ''
          });
          break;
      }
    }
  };

  const handleSaveCredentials = async () => {
    if (!selectedIntegration) return;

    setIsConnecting(true);
    
    try {
      // Test the connection
      const response = await fetch(`/api/integrations/${selectedIntegration.id}/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKeys: credentials,
          testData: 'Connection test'
        })
      });

      const result = await response.json();
      
      if (result.success) {
        // Update integration status
        setIntegrations(prev => prev.map(int => 
          int.id === selectedIntegration.id 
            ? { ...int, status: 'connected', credentials }
            : int
        ));
        
        // Store credentials securely (in real app, this would be encrypted in backend)
        localStorage.setItem(`integration_${selectedIntegration.id}_${userId}`, JSON.stringify(credentials));
        
        alert('✅ Integration connected successfully!');
        setSelectedIntegration(null);
      } else {
        // Show detailed error message from backend
        const errorMessage = result.data?.error || result.error || 'Unknown error';
        alert(`❌ Connection failed:\n\n${errorMessage}`);
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('❌ Connection failed. Please check:\n• Gmail App Password (16 characters, no spaces)\n• 2-Step Verification enabled\n• Correct Gmail address');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrations(prev => prev.map(int => 
      int.id === integrationId 
        ? { ...int, status: 'disconnected', credentials: undefined }
        : int
    ));
    
    // Remove stored credentials
    localStorage.removeItem(`integration_${integrationId}_${userId}`);
    alert('Integration disconnected');
  };

  // Load stored credentials on component mount
  useEffect(() => {
    const loadStoredCredentials = () => {
      const updatedIntegrations = integrations.map(integration => {
        const stored = localStorage.getItem(`integration_${integration.id}_${userId}`);
        if (stored) {
          try {
            const credentials = JSON.parse(stored);
            return {
              ...integration,
              status: 'connected' as const,
              credentials
            };
          } catch (error) {
            console.error('Error parsing stored credentials:', error);
          }
        }
        return integration;
      });
      setIntegrations(updatedIntegrations);
    };

    loadStoredCredentials();
  }, [userId]);

  const getCredentialFields = (integrationId: string) => {
    switch (integrationId) {
      case 'gmail':
        return [
          { key: 'gmail_email', label: 'Gmail Email', type: 'email', placeholder: 'your-email@gmail.com' },
          { key: 'gmail_app_password', label: 'Gmail App Password', type: 'password', placeholder: '16-character app password' }
        ];
      case 'linkedin':
        return [
          { key: 'linkedin_access_token', label: 'LinkedIn Access Token', type: 'password', placeholder: 'Your LinkedIn API token' }
        ];
      case 'wordpress':
        return [
          { key: 'wordpress_url', label: 'WordPress URL', type: 'url', placeholder: 'https://your-site.com' },
          { key: 'wordpress_username', label: 'Username', type: 'text', placeholder: 'Your WordPress username' },
          { key: 'wordpress_app_password', label: 'App Password', type: 'password', placeholder: 'WordPress app password' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🔗 My Integrations</h1>
              <p className="text-gray-600">Connect your accounts to enable AI agent automation</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {!selectedIntegration ? (
          // Integrations List
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration) => (
              <div
                key={integration.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{integration.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{integration.type}</p>
                    </div>
                  </div>
                  {integration.status === 'connected' ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-gray-400" />
                  )}
                </div>

                <div className="mb-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    integration.status === 'connected' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {integration.status === 'connected' ? '✅ Connected' : '❌ Not Connected'}
                  </span>
                </div>

                <div className="space-y-2">
                  {integration.status === 'connected' ? (
                    <>
                      <button
                        onClick={() => handleConnectIntegration(integration)}
                        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Update Settings</span>
                      </button>
                      <button
                        onClick={() => handleDisconnect(integration.id)}
                        className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleConnectIntegration(integration)}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Connect {integration.name}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Connection Form
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl">{selectedIntegration.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Connect {selectedIntegration.name}</h2>
                  <p className="text-gray-600">Enter your credentials to enable automation</p>
                </div>
              </div>

              {selectedIntegration.id === 'gmail' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">📧 How to get Gmail App Password:</h4>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Go to <a href="https://myaccount.google.com/security" target="_blank" className="underline">Google Account Security</a></li>
                    <li>2. Enable 2-Step Verification (if not already enabled)</li>
                    <li>3. Go to <a href="https://myaccount.google.com/apppasswords" target="_blank" className="underline">App Passwords</a></li>
                    <li>4. Select "Mail" and "Other" → Enter "Barakah AI Agents"</li>
                    <li>5. Copy the 16-character password</li>
                  </ol>
                </div>
              )}

              <div className="space-y-4">
                {getCredentialFields(selectedIntegration.id).map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                    </label>
                    <div className="relative">
                      <input
                        type={field.type === 'password' && !showPassword ? 'password' : 'text'}
                        value={credentials[field.key] || ''}
                        onChange={(e) => setCredentials(prev => ({
                          ...prev,
                          [field.key]: e.target.value
                        }))}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
                      />
                      {field.type === 'password' && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCredentials}
                  disabled={isConnecting || !Object.values(credentials).every(val => val.trim())}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? 'Testing Connection...' : 'Connect & Test'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}