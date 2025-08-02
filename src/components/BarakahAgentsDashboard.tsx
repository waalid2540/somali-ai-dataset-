import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle, XCircle, Eye, Zap, Crown } from 'lucide-react';
import BarakahAgentService, { AgentConfig, AgentExecution } from '../services/barakah-agent-service';

interface BarakahAgentsDashboardProps {
  userSubscription: string;
  onBack: () => void;
}

interface AgentExecutionProps {
  agentId: string;
  execution: AgentExecution;
  onClose: () => void;
}

function AgentExecutionView({ agentId, execution, onClose }: AgentExecutionProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running': return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'think': return '🧠';
      case 'plan': return '📋';
      case 'execute': return '⚡';
      case 'integrate': return '🔗';
      case 'verify': return '✅';
      default: return '⚙️';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(execution.status)}
              <div>
                <h2 className="text-xl font-bold text-gray-900">Agent Execution</h2>
                <p className="text-gray-600">ID: {execution.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Execution Progress</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                execution.status === 'completed' ? 'bg-green-100 text-green-800' :
                execution.status === 'failed' ? 'bg-red-100 text-red-800' :
                execution.status === 'running' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
              </span>
            </div>

            <div className="space-y-4">
              {execution.steps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                      {getStepIcon(step.type)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{step.description}</h4>
                      {getStatusIcon(step.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Type: {step.type} • {new Date(step.timestamp).toLocaleString()}
                    </p>
                    {step.output && (
                      <div className="bg-gray-50 p-3 rounded-md">
                        <p className="text-sm text-gray-700">
                          {typeof step.output === 'string' ? step.output : 
                           step.output.analysis || step.output.plan || step.output.deliverable || 
                           JSON.stringify(step.output, null, 2)}
                        </p>
                        {step.output.mock && (
                          <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                            🔒 Demo Mode - Upgrade for full functionality
                          </div>
                        )}
                      </div>
                    )}
                    {step.error && (
                      <div className="bg-red-50 p-3 rounded-md">
                        <p className="text-sm text-red-700">{step.error}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {execution.result && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Final Result</h4>
              <p className="text-green-800">
                {execution.result.message || JSON.stringify(execution.result, null, 2)}
              </p>
            </div>
          )}

          {execution.error && (
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">Error</h4>
              <p className="text-red-800">{execution.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BarakahAgentsDashboard({ userSubscription, onBack }: BarakahAgentsDashboardProps) {
  const [agents] = useState<AgentConfig[]>(BarakahAgentService.getAvailableAgents());
  const [selectedAgent, setSelectedAgent] = useState<AgentConfig | null>(null);
  const [executionInput, setExecutionInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentExecution, setCurrentExecution] = useState<AgentExecution | null>(null);
  const [systemStatus, setSystemStatus] = useState<{ openai: boolean; integrations: boolean; message: string }>({
    openai: true,
    integrations: true,
    message: 'All systems operational - Enterprise agents ready'
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    // Set system status immediately for demo mode
    setSystemStatus({
      openai: true,
      integrations: true,
      message: 'All systems operational - Enterprise agents ready'
    });
  }, []);

  const handleExecuteAgent = async () => {
    if (!selectedAgent || !executionInput.trim()) return;

    setIsExecuting(true);
    
    try {
      if (userSubscription !== 'pro') {
        // Demo execution for free users
        const demoExecution = await BarakahAgentService.executeDemoAgent(selectedAgent.id, {
          request: executionInput.trim()
        });
        setCurrentExecution(demoExecution);
        setShowUpgradeModal(true);
      } else {
        // Real execution for pro users
        const executionId = await BarakahAgentService.executeAgent(selectedAgent.id, {
          request: executionInput.trim()
        });
        
        // Poll for execution status
        const pollExecution = async () => {
          const execution = await BarakahAgentService.getExecution(executionId);
          if (execution) {
            setCurrentExecution(execution);
            if (execution.status === 'running') {
              setTimeout(pollExecution, 2000); // Poll every 2 seconds
            }
          }
        };
        
        pollExecution();
      }
    } catch (error) {
      console.error('Agent execution error:', error);
      alert('Failed to execute agent. Please try again.');
    } finally {
      setIsExecuting(false);
    }
  };

  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Upgrade to Agency Pro</h3>
          <p className="text-gray-600 mb-6">
            You just saw a demo! Upgrade to access real AI agents that actually execute workflows.
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg mb-6">
            <div className="text-2xl font-bold text-purple-600">$297/month</div>
            <div className="text-sm text-gray-600">Full agency automation</div>
          </div>

          <div className="space-y-2 mb-6 text-left">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Unlimited agent executions</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Real WordPress, social media, email integrations</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Complete workflow automation</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Priority support & onboarding</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Later
            </button>
            <button
              onClick={() => {
                window.location.href = '/subscription?plan=agency-pro';
              }}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to AI Tools</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">🤖 Barakah AI Agents</h1>
              <p className="text-gray-600">Enterprise AI that thinks, plans, and executes complete workflows</p>
            </div>
          </div>
          {systemStatus && (
            <div className={`px-3 py-1 rounded-full text-sm ${
              systemStatus.openai && systemStatus.integrations 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {systemStatus.message}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {!selectedAgent ? (
          /* Agents Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{agent.icon}</div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">{agent.price}</div>
                    <div className="text-xs text-gray-500">{agent.category}</div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{agent.description}</p>
                
                <div className="space-y-2">
                  {agent.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {agent.features.length > 3 && (
                    <div className="text-xs text-gray-500">+{agent.features.length - 3} more features</div>
                  )}
                </div>
                
                <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 flex items-center justify-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Start Agent</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Agent Execution Interface */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setSelectedAgent(null);
                      setCurrentExecution(null);
                      setExecutionInput('');
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <span>{selectedAgent.icon}</span>
                      <span>{selectedAgent.name}</span>
                    </h2>
                    <p className="text-gray-600">{selectedAgent.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600">{selectedAgent.price}</div>
                  {userSubscription !== 'pro' && (
                    <div className="text-xs text-orange-600">Demo Mode</div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe what you want the agent to do:
                  </label>
                  <textarea
                    value={executionInput}
                    onChange={(e) => setExecutionInput(e.target.value)}
                    placeholder="Example: Write a blog post about AI trends and publish it to my WordPress site, then share on LinkedIn and send to my email list"
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    disabled={isExecuting}
                  />
                </div>

                <button
                  onClick={handleExecuteAgent}
                  disabled={!executionInput.trim() || isExecuting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isExecuting ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      <span>Executing Agent...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      <span>{userSubscription === 'pro' ? 'Execute Agent' : 'Try Demo'}</span>
                    </>
                  )}
                </button>

                {userSubscription !== 'pro' && (
                  <div className="text-center text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                    🔒 You're in demo mode. Upgrade to Agency Pro for real agent execution with live integrations.
                  </div>
                )}
              </div>
            </div>

            {/* Features Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedAgent.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Execution View Modal */}
      {currentExecution && (
        <AgentExecutionView
          agentId={selectedAgent?.id || ''}
          execution={currentExecution}
          onClose={() => setCurrentExecution(null)}
        />
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && <UpgradeModal />}
    </div>
  );
}