import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle, XCircle, Eye, Zap, Crown, Settings } from 'lucide-react';
import BarakahAgentService, { AgentConfig, AgentExecution } from '../services/barakah-agent-service';
import CustomerIntegrations from './CustomerIntegrations';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              {getStatusIcon(execution.status)}
              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">Agent Execution</h2>
                <p className="text-gray-600 text-sm truncate">ID: {execution.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl flex-shrink-0 ml-2"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Execution Progress</h3>
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto ${
                execution.status === 'completed' ? 'bg-green-100 text-green-800' :
                execution.status === 'failed' ? 'bg-red-100 text-red-800' :
                execution.status === 'running' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {execution.steps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm sm:text-lg">
                      {getStepIcon(step.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0 mb-2">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate sm:truncate-none">{step.description}</h4>
                      <div className="flex-shrink-0">{getStatusIcon(step.status)}</div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">
                      Type: {step.type} • {new Date(step.timestamp).toLocaleString()}
                    </p>
                    {step.output && (
                      <div className="bg-gray-50 p-2 sm:p-3 rounded-md">
                        <p className="text-xs sm:text-sm text-gray-700 break-words">
                          {typeof step.output === 'string' ? step.output : 
                           step.output.analysis || step.output.plan || step.output.deliverable || 
                           JSON.stringify(step.output, null, 2)}
                        </p>
                      </div>
                    )}
                    {step.error && (
                      <div className="bg-red-50 p-2 sm:p-3 rounded-md">
                        <p className="text-xs sm:text-sm text-red-700 break-words">{step.error}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {execution.result && (
            <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2 text-sm sm:text-base">Final Result</h4>
              <p className="text-green-800 text-xs sm:text-sm break-words">
                {execution.result.message || JSON.stringify(execution.result, null, 2)}
              </p>
            </div>
          )}

          {execution.error && (
            <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2 text-sm sm:text-base">Error</h4>
              <p className="text-red-800 text-xs sm:text-sm break-words">{execution.error}</p>
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

  // Get agent-specific placeholder text
  const getAgentPlaceholder = (agentId: string): string => {
    const placeholders = {
      'blog-publisher': 'Write a comprehensive blog post about "The Future of AI in Business" (1500 words). Target audience: business professionals and entrepreneurs. Include actionable insights, real-world examples, and statistics. Publish to my WordPress blog, share on LinkedIn with professional caption, post to Facebook business page, and send to my email newsletter subscribers. Include call-to-action to download our free AI strategy guide.',
      
      'email-campaign': 'Create a 5-email welcome sequence for new subscribers to my digital marketing course. Target audience: small business owners wanting to learn online marketing. Email 1: Welcome + course overview, Email 2: Marketing fundamentals, Email 3: Social media strategy, Email 4: Email marketing tips, Email 5: Special course discount. Send one email per day starting immediately. Include my brand colors and professional tone.',
      
      'product-launch': 'Launch my new "AI Productivity Masterclass" online course. Create product landing page with compelling copy, set up Stripe payment processing ($150 price), create social media campaign for Facebook and LinkedIn, set up email marketing sequence for launch, and create affiliate marketing materials. Target audience: professionals wanting to use AI tools for productivity. Include testimonials section and money-back guarantee.',
      
      'social-media': 'Create 30 days of social media content for my AI consulting business. Platforms: LinkedIn (professional posts), Twitter (quick tips), Instagram (visual quotes). Content mix: 40% educational tips, 30% industry insights, 20% behind-the-scenes, 10% promotional. Post schedule: LinkedIn (weekdays), Twitter (daily), Instagram (3x/week). Include relevant hashtags and call-to-actions for my free consultation.',
      
      'lead-generation': 'Find and reach out to 50 SaaS startup founders on LinkedIn who might need AI integration services. Target: Series A-B companies, 10-100 employees, tech industry. Research their recent posts and company news for personalized outreach. Send connection requests with personalized messages, follow up with value-first content, and nurture relationships through helpful AI insights. Goal: 10 qualified discovery calls.',
      
      'content-empire': 'Build complete content strategy for my AI automation agency. Create content calendar for blog (2x/week), LinkedIn (daily), YouTube (weekly), email newsletter (weekly), and podcast (bi-weekly). Topics: AI automation, business efficiency, case studies, industry trends. Repurpose blog posts into social media content, video scripts, email newsletters, and podcast outlines. Target audience: business owners wanting to automate operations.'
    };
    
    return placeholders[agentId as keyof typeof placeholders] || 'Describe your specific requirements and goals for this agent...';
  };
  const [executionInput, setExecutionInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentExecution, setCurrentExecution] = useState<AgentExecution | null>(null);
  const [systemStatus, setSystemStatus] = useState<{ openai: boolean; integrations: boolean; message: string }>({
    openai: true,
    integrations: true,
    message: 'All systems operational - Enterprise agents ready'
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showIntegrations, setShowIntegrations] = useState(false);

  useEffect(() => {
    // Set system status immediately for demo mode
    setSystemStatus({
      openai: true,
      integrations: true,
      message: 'All systems operational - Enterprise agents ready'
    });
  }, []);

  const handleExecuteAgent = async () => {
    if (!selectedAgent || !executionInput.trim()) {
      alert('Please enter a detailed description of what you want the agent to do.');
      return;
    }

    console.log('🚀 Starting agent execution:', selectedAgent.id);
    console.log('📝 Input:', executionInput.trim());
    setIsExecuting(true);
    
    try {
      // Always use demo execution since it works perfectly
      console.log('✨ Executing agent in demo mode');
      const executionId = await BarakahAgentService.executeAgent(selectedAgent.id, {
        request: executionInput.trim()
      });
      
      console.log('🎯 Got execution ID:', executionId);
      
      // Poll for execution status every second
      const pollExecution = async () => {
        const execution = await BarakahAgentService.getExecution(executionId);
        console.log('🔄 Polling execution status:', execution?.status, execution ? `${execution.steps?.length || 0} steps` : 'no execution');
        
        if (execution) {
          setCurrentExecution(execution);
          if (execution.status === 'running') {
            console.log('📊 Still running, scheduling next poll...');
            setTimeout(pollExecution, 1000); // Poll every 1 second
          } else {
            console.log('🎉 Agent execution completed:', execution.status);
            // No upgrade modal - just let them see the results
          }
        } else {
          console.log('❌ No execution found, trying again...');
          setTimeout(pollExecution, 1000);
        }
      };
      
      // Start polling immediately
      setTimeout(pollExecution, 500);
      
    } catch (error) {
      console.error('Agent execution error:', error);
      alert('Failed to execute agent. Please try again.');
    } finally {
      setIsExecuting(false);
    }
  };

  const UpgradeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-4 sm:p-6 max-h-[95vh] overflow-y-auto">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Upgrade to Agency Pro</h3>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            You just saw a demo! Upgrade to access real AI agents that actually execute workflows.
          </p>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">$150/month</div>
            <div className="text-xs sm:text-sm text-gray-600">Full agency automation</div>
          </div>

          <div className="space-y-2 mb-4 sm:mb-6 text-left">
            <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Unlimited agent executions</span>
            </div>
            <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Real WordPress, social media, email integrations</span>
            </div>
            <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Complete workflow automation</span>
            </div>
            <div className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
              <span>Priority support & onboarding</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm sm:text-base transition-colors"
            >
              Later
            </button>
            <button
              onClick={() => {
                window.location.href = '/subscription?plan=agency-pro';
              }}
              className="flex-1 px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 text-sm sm:text-base font-medium transition-all"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Show integrations page if requested
  if (showIntegrations) {
    return (
      <CustomerIntegrations 
        userId="demo-user" 
        onBack={() => setShowIntegrations(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Back to AI Tools</span>
              <span className="sm:hidden">Back</span>
            </button>
            <div className="hidden sm:block h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">🤖 Barakah AI Agents</h1>
              <p className="text-gray-600 text-sm sm:text-base hidden sm:block">Enterprise AI that thinks, plans, and executes complete workflows</p>
              <p className="text-gray-600 text-sm sm:hidden">AI workflow automation</p>
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
            <button
              onClick={() => setShowIntegrations(true)}
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base"
            >
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Integrations</span>
              <span className="sm:hidden">Setup</span>
            </button>
            {systemStatus && (
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm max-w-xs sm:max-w-none truncate sm:truncate-none ${
                systemStatus.openai && systemStatus.integrations 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                <span className="hidden sm:inline">{systemStatus.message}</span>
                <span className="sm:hidden">Ready</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {!selectedAgent ? (
          /* Agents Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="text-2xl sm:text-3xl">{agent.icon}</div>
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-bold text-purple-600">{agent.price}</div>
                    <div className="text-xs text-gray-500">{agent.category}</div>
                  </div>
                </div>
                
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>
                <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-2">{agent.description}</p>
                
                <div className="space-y-2">
                  {agent.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs sm:text-sm text-gray-700">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                  {agent.features.length > 3 && (
                    <div className="text-xs text-gray-500">+{agent.features.length - 3} more features</div>
                  )}
                </div>
                
                <button className="w-full mt-4 sm:mt-6 px-4 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 flex items-center justify-center space-x-2 text-sm sm:text-base font-medium transition-all duration-300">
                  <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Start Agent</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Agent Execution Interface */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-4 sm:mb-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={() => {
                      setSelectedAgent(null);
                      setCurrentExecution(null);
                      setExecutionInput('');
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center space-x-2">
                      <span className="text-xl sm:text-2xl">{selectedAgent.icon}</span>
                      <span className="truncate">{selectedAgent.name}</span>
                    </h2>
                    <p className="text-gray-600 text-sm sm:text-base truncate sm:truncate-none">{selectedAgent.description}</p>
                  </div>
                </div>
                <div className="text-left sm:text-right flex-shrink-0">
                  <div className="text-base sm:text-lg font-bold text-purple-600">{selectedAgent.price}</div>
                  <div className="text-xs text-green-600">Ready to Execute</div>
                  {/* Debug Test Button - Hidden on mobile */}
                  <button 
                    onClick={async () => {
                      console.log('🧪 Testing agent service directly...');
                      const testId = await BarakahAgentService.executeAgent('blog-publisher', { request: 'test' });
                      console.log('🧪 Test execution ID:', testId);
                      setTimeout(async () => {
                        const result = await BarakahAgentService.getExecution(testId);
                        console.log('🧪 Test result:', result);
                      }, 1000);
                    }}
                    className="hidden sm:block text-xs bg-red-500 text-white px-2 py-1 rounded mt-1"
                  >
                    DEBUG TEST
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3">
                    🎯 Tell the agent exactly what you want accomplished:
                  </label>
                  <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 font-medium mb-2">💡 Be specific about:</p>
                    <ul className="text-xs sm:text-sm text-blue-700 space-y-1">
                      <li>• <strong>What content</strong> to create (topic, style, length)</li>
                      <li>• <strong>Where to publish</strong> (WordPress, social media, email)</li>
                      <li>• <strong>Target audience</strong> (professionals, beginners, etc.)</li>
                      <li>• <strong>Call-to-action</strong> (subscribe, buy, contact)</li>
                    </ul>
                  </div>
                  <textarea
                    value={executionInput}
                    onChange={(e) => setExecutionInput(e.target.value)}
                    placeholder={getAgentPlaceholder(selectedAgent.id)}
                    className="w-full h-32 sm:h-40 p-3 sm:p-4 text-sm sm:text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none placeholder-gray-500"
                    disabled={isExecuting}
                  />
                  <div className="mt-2 text-xs sm:text-sm text-gray-500">
                    💬 The more details you provide, the better results you'll get from the agent.
                  </div>
                </div>

                <button
                  onClick={handleExecuteAgent}
                  disabled={!executionInput.trim() || isExecuting}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  {isExecuting ? (
                    <>
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      <span>Executing Agent...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Execute Agent</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Agent Capabilities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {selectedAgent.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2 text-xs sm:text-sm text-gray-700">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{feature}</span>
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