// DeepSeek AI Service - 95% cheaper than OpenAI!
export class DeepSeekService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    this.baseUrl = 'https://api.deepseek.com/v1';
    
    if (!this.apiKey) {
      throw new Error('DEEPSEEK_API_KEY is required');
    }
  }

  async generateCompletion(prompt: string, options: {
    maxTokens?: number;
    temperature?: number;
    model?: string;
  } = {}) {
    const {
      maxTokens = 1000,
      temperature = 0.7,
      model = 'deepseek-v3'
    } = options;

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      return {
        content: data.choices[0]?.message?.content || '',
        usage: data.usage,
        cost: this.calculateCost(data.usage),
      };
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw error;
    }
  }

  async generateBlogPost(topic: string, keywords: string[] = []) {
    const prompt = `Write a comprehensive blog post about "${topic}".
    
Requirements:
- Include SEO keywords: ${keywords.join(', ')}
- 800-1200 words
- Include H2 and H3 headings
- Add a compelling introduction and conclusion
- Make it engaging and informative
- Include actionable tips

Topic: ${topic}`;

    return this.generateCompletion(prompt, { maxTokens: 1500 });
  }

  async generateSocialMediaPost(platform: string, topic: string, tone: string = 'professional') {
    const prompt = `Create an engaging ${platform} post about "${topic}".
    
Requirements:
- Tone: ${tone}
- Include relevant hashtags
- ${platform === 'Twitter' ? 'Under 280 characters' : ''}
- ${platform === 'LinkedIn' ? 'Professional and insightful' : ''}
- ${platform === 'Instagram' ? 'Visual and engaging with emojis' : ''}
- Call-to-action included

Topic: ${topic}`;

    return this.generateCompletion(prompt, { maxTokens: 300 });
  }

  async generateEmailCopy(type: string, audience: string, goal: string) {
    const prompt = `Write a ${type} email for ${audience} with the goal to ${goal}.
    
Requirements:
- Compelling subject line
- Personalized greeting
- Clear value proposition
- Strong call-to-action
- Professional but friendly tone
- Mobile-optimized length

Email Type: ${type}
Audience: ${audience}
Goal: ${goal}`;

    return this.generateCompletion(prompt, { maxTokens: 800 });
  }

  async generateProductDescription(product: string, features: string[], targetAudience: string) {
    const prompt = `Create a compelling product description for "${product}".
    
Product Features:
${features.map(f => `- ${f}`).join('\n')}

Target Audience: ${targetAudience}

Requirements:
- Highlight key benefits
- Address pain points
- Include social proof elements
- SEO-optimized
- Conversion-focused
- 150-300 words`;

    return this.generateCompletion(prompt, { maxTokens: 500 });
  }

  async generateCode(language: string, description: string, requirements: string[] = []) {
    const prompt = `Write ${language} code for: ${description}
    
Requirements:
${requirements.map(r => `- ${r}`).join('\n')}

Please provide:
1. Clean, well-commented code
2. Error handling
3. Best practices
4. Brief explanation of the solution`;

    return this.generateCompletion(prompt, { maxTokens: 1200 });
  }

  async improveText(text: string, improvements: string[] = ['grammar', 'clarity', 'engagement']) {
    const prompt = `Improve the following text focusing on: ${improvements.join(', ')}

Original text:
"${text}"

Please provide:
1. Improved version
2. Key changes made
3. Brief explanation of improvements`;

    return this.generateCompletion(prompt, { maxTokens: 800 });
  }

  async translateText(text: string, fromLanguage: string, toLanguage: string) {
    const prompt = `Translate the following text from ${fromLanguage} to ${toLanguage}.
    
Maintain:
- Original meaning and context
- Tone and style
- Cultural appropriateness
- Professional quality

Text to translate:
"${text}"`;

    return this.generateCompletion(prompt, { maxTokens: 600 });
  }

  async generateQuizQuestions(topic: string, difficulty: string, count: number = 5) {
    const prompt = `Create ${count} ${difficulty} level quiz questions about "${topic}".
    
Format for each question:
1. Question
2. 4 multiple choice options (A, B, C, D)
3. Correct answer
4. Brief explanation

Requirements:
- Challenging but fair
- Educational value
- Clear and unambiguous
- Appropriate difficulty level`;

    return this.generateCompletion(prompt, { maxTokens: 1000 });
  }

  private calculateCost(usage: any): number {
    if (!usage) return 0;
    
    // DeepSeek pricing (per 1K tokens)
    const inputCost = (usage.prompt_tokens / 1000) * 0.0014;
    const outputCost = (usage.completion_tokens / 1000) * 0.0028;
    
    return inputCost + outputCost;
  }

  async getAccountUsage() {
    try {
      const response = await fetch(`${this.baseUrl}/usage`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get usage: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error getting DeepSeek usage:', error);
      return null;
    }
  }
}

// Export singleton instance
export const deepSeekService = new DeepSeekService();