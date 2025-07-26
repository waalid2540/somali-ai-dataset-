// AI Service Manager - Fallback system for optimal performance
// Tries DeepSeek first (cheap), falls back to OpenAI if slow

export class AIServiceManager {
  private deepseekKey: string;
  private openaiKey: string;
  private deepseekTimeout: number = 15000; // 15 seconds max for DeepSeek

  constructor() {
    this.deepseekKey = process.env.DEEPSEEK_API_KEY || '';
    this.openaiKey = process.env.OPENAI_API_KEY || '';
  }

  async generateContent(prompt: string, options: {
    maxTokens?: number;
    temperature?: number;
    systemPrompt?: string;
  } = {}): Promise<{
    content: string;
    provider: 'deepseek' | 'openai';
    cost: number;
    processingTime: number;
  }> {
    const startTime = Date.now();
    const { maxTokens = 500, temperature = 0.3, systemPrompt = '' } = options;

    // Try DeepSeek first (95% cheaper)
    if (this.deepseekKey) {
      try {
        console.log('🚀 Trying DeepSeek first...');
        const result = await this.callDeepSeek(prompt, { maxTokens, temperature, systemPrompt });
        const processingTime = Date.now() - startTime;
        
        if (processingTime < this.deepseekTimeout) {
          console.log(`✅ DeepSeek success in ${processingTime}ms`);
          return {
            content: result,
            provider: 'deepseek',
            cost: this.calculateDeepSeekCost(maxTokens),
            processingTime
          };
        } else {
          console.log(`⚠️ DeepSeek too slow (${processingTime}ms), trying OpenAI...`);
        }
      } catch (error) {
        console.log('❌ DeepSeek failed, falling back to OpenAI:', error);
      }
    }

    // Fallback to OpenAI
    if (this.openaiKey) {
      try {
        console.log('🔄 Using OpenAI fallback...');
        const result = await this.callOpenAI(prompt, { maxTokens, temperature, systemPrompt });
        const processingTime = Date.now() - startTime;
        
        console.log(`✅ OpenAI success in ${processingTime}ms`);
        return {
          content: result,
          provider: 'openai',
          cost: this.calculateOpenAICost(maxTokens),
          processingTime
        };
      } catch (error) {
        console.error('❌ Both AI services failed:', error);
        throw new Error('AI generation failed: Both DeepSeek and OpenAI unavailable');
      }
    }

    throw new Error('No AI service configured');
  }

  private async callDeepSeek(prompt: string, options: {
    maxTokens: number;
    temperature: number;
    systemPrompt: string;
  }): Promise<string> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.deepseekTimeout);

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.deepseekKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            ...(options.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
            { role: 'user', content: prompt }
          ],
          max_tokens: options.maxTokens,
          temperature: options.temperature,
          top_p: 0.9,
          stream: false,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`DeepSeek error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async callOpenAI(prompt: string, options: {
    maxTokens: number;
    temperature: number;
    systemPrompt: string;
  }): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Faster and cheaper than GPT-4
        messages: [
          ...(options.systemPrompt ? [{ role: 'system', content: options.systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        max_tokens: options.maxTokens,
        temperature: options.temperature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  private calculateDeepSeekCost(tokens: number): number {
    // DeepSeek pricing: ~$0.0014 input + $0.0028 output per 1K tokens
    // Estimate 50% input, 50% output
    return ((tokens * 0.5 * 0.0014) + (tokens * 0.5 * 0.0028)) / 1000;
  }

  private calculateOpenAICost(tokens: number): number {
    // GPT-4o-mini pricing: ~$0.15 input + $0.60 output per 1M tokens  
    // Much cheaper than GPT-4 but still 20x more than DeepSeek
    return ((tokens * 0.5 * 0.15) + (tokens * 0.5 * 0.60)) / 1000000;
  }

  // Get service health
  async getServiceStatus(): Promise<{
    deepseek: 'available' | 'slow' | 'unavailable';
    openai: 'available' | 'unavailable';
  }> {
    const status = {
      deepseek: 'unavailable' as 'available' | 'slow' | 'unavailable',
      openai: 'unavailable' as 'available' | 'unavailable'
    };

    // Test DeepSeek speed
    if (this.deepseekKey) {
      try {
        const start = Date.now();
        await this.callDeepSeek('Test', { maxTokens: 10, temperature: 0.1, systemPrompt: '' });
        const time = Date.now() - start;
        
        status.deepseek = time < 10000 ? 'available' : 'slow';
      } catch {
        status.deepseek = 'unavailable';
      }
    }

    // Test OpenAI availability
    if (this.openaiKey) {
      try {
        await this.callOpenAI('Test', { maxTokens: 10, temperature: 0.1, systemPrompt: '' });
        status.openai = 'available';
      } catch {
        status.openai = 'unavailable';
      }
    }

    return status;
  }
}

// Export singleton
export const aiManager = new AIServiceManager();