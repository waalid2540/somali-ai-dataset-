// Barakah AI Agents Integration Service
// Connects AI Tools frontend to Barakah AI Agents backend

interface AgentConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  price: string;
  features: string[];
}

interface AgentExecution {
  id: string;
  agentId: string;
  status: 'running' | 'completed' | 'failed' | 'paused';
  steps: AgentStep[];
  startTime: string;
  endTime?: string;
  result?: any;
  error?: string;
}

interface AgentStep {
  id: string;
  type: 'think' | 'plan' | 'execute' | 'integrate' | 'verify';
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: string;
  output?: any;
  error?: string;
}

class BarakahAgentService {
  private baseUrl: string;
  private apiKey: string | null = null;

  constructor() {
    // Use production Barakah API URL or localhost for development
    this.baseUrl = process.env.NEXT_PUBLIC_BARAKAH_API_URL || 'https://barakah-agents-api.onrender.com';
  }

  // Available AI Agents for the dashboard
  getAvailableAgents(): AgentConfig[] {
    return [
      {
        id: 'blog-publisher',
        name: 'Blog Publisher Agent',
        description: 'Writes blog posts AND publishes them across all platforms automatically',
        category: 'Content Marketing',
        icon: '📝',
        price: '$297/month',
        features: [
          'SEO-optimized blog writing',
          'WordPress auto-publishing',
          'Social media distribution',
          'Email newsletter integration',
          'Performance tracking'
        ]
      },
      {
        id: 'email-campaign',
        name: 'Email Campaign Agent',
        description: 'Creates email campaigns AND sends them to targeted lists',
        category: 'Email Marketing',
        icon: '📧',
        price: '$397/month',
        features: [
          'Audience segmentation',
          'Personalized email creation',
          'A/B testing automation',
          'Gmail/Outlook integration',
          'Conversion tracking'
        ]
      },
      {
        id: 'product-launch',
        name: 'Product Launch Agent',
        description: 'Creates product pages AND launches complete marketing campaigns',
        category: 'Product Marketing',
        icon: '🛒',
        price: '$597/month',
        features: [
          'Market research & analysis',
          'Product page creation',
          'Stripe payment setup',
          'Multi-channel promotion',
          'Sales optimization'
        ]
      },
      {
        id: 'social-media',
        name: 'Social Media Agent',
        description: 'Plans content AND posts across all social platforms',
        category: 'Social Media',
        icon: '📱',
        price: '$497/month',
        features: [
          'Content calendar creation',
          'Platform-specific posting',
          'Visual content generation',
          'Community engagement',
          'Analytics tracking'
        ]
      },
      {
        id: 'lead-generation',
        name: 'Lead Generation Agent',
        description: 'Finds prospects AND nurtures them into customers',
        category: 'Sales',
        icon: '👥',
        price: '$797/month',
        features: [
          'Prospect research',
          'LinkedIn outreach',
          'Personalized messaging',
          'Follow-up sequences',
          'CRM integration'
        ]
      },
      {
        id: 'content-empire',
        name: 'Content Empire Agent',
        description: 'Builds complete content strategies AND executes them',
        category: 'Content Strategy',
        icon: '🎯',
        price: '$1997/month',
        features: [
          'Brand voice analysis',
          'Multi-format content creation',
          'Cross-platform publishing',
          'Audience engagement',
          'Performance optimization'
        ]
      }
    ];
  }

  // Execute an AI agent workflow
  async executeAgent(
    agentId: string, 
    input: any, 
    userApiKeys?: Record<string, string>
  ): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/api/agents/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        },
        body: JSON.stringify({
          agentId,
          input,
          customerApiKeys: userApiKeys
        })
      });

      if (!response.ok) {
        throw new Error(`Agent execution failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.executionId;

    } catch (error) {
      console.error('Barakah Agent Service Error:', error);
      throw new Error('Failed to execute agent. Please try again.');
    }
  }

  // Get execution status and progress
  async getExecution(executionId: string): Promise<AgentExecution | null> {
    try {
      const response = await fetch(`${this.baseUrl}/api/executions/${executionId}`, {
        headers: {
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        }
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`Failed to get execution: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Get execution error:', error);
      return null;
    }
  }

  // Get all user executions
  async getUserExecutions(userId: string): Promise<AgentExecution[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/users/${userId}/executions`, {
        headers: {
          ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get user executions: ${response.statusText}`);
      }

      return await response.json();

    } catch (error) {
      console.error('Get user executions error:', error);
      return [];
    }
  }

  // Check system status
  async getSystemStatus(): Promise<{ openai: boolean; integrations: boolean; message: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      
      if (!response.ok) {
        return {
          openai: false,
          integrations: false,
          message: 'Barakah AI Agents service unavailable'
        };
      }

      const data = await response.json();
      return data.systemStatus || {
        openai: true,
        integrations: true,
        message: 'All systems operational'
      };

    } catch (error) {
      return {
        openai: false,
        integrations: false,
        message: 'Unable to connect to Barakah AI Agents'
      };
    }
  }

  // Set user API key for authenticated requests
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Get pricing for upgrade modal
  getAgentPricing(): { monthly: number; annual: number; savings: string } {
    return {
      monthly: 297, // Starting at $297/month for basic agent
      annual: 2970, // 10x monthly (2 months free)
      savings: 'Save $564/year'
    };
  }

  // Demo execution for non-subscribed users
  async executeDemoAgent(agentId: string, input: any): Promise<AgentExecution> {
    // Return mock execution for demo purposes
    const mockExecution: AgentExecution = {
      id: `demo_${Date.now()}`,
      agentId,
      status: 'completed',
      steps: [
        {
          id: 'demo_think',
          type: 'think',
          description: 'Analyzing your request...',
          status: 'completed',
          timestamp: new Date().toISOString(),
          output: {
            analysis: `Demo analysis for ${agentId}. This would analyze your specific requirements and create a tailored strategy.`,
            mock: true
          }
        },
        {
          id: 'demo_plan',
          type: 'plan',
          description: 'Creating execution plan...',
          status: 'completed',
          timestamp: new Date().toISOString(),
          output: {
            plan: `Demo plan showing how the ${agentId} would execute your request with real integrations.`,
            mock: true
          }
        },
        {
          id: 'demo_execute',
          type: 'execute',
          description: 'Creating deliverable...',
          status: 'completed',
          timestamp: new Date().toISOString(),
          output: {
            deliverable: `Demo output for ${agentId}. In the full version, this would be your complete, ready-to-use deliverable.`,
            mock: true
          }
        }
      ],
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      result: {
        success: true,
        message: 'Demo completed successfully! Upgrade to access full agent capabilities.',
        mock: true
      }
    };

    return mockExecution;
  }
}

export default new BarakahAgentService();
export type { AgentConfig, AgentExecution, AgentStep };