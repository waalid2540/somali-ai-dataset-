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
      maxTokens = 400,        // Optimized for speed
      temperature = 0.05,     // Extremely low for maximum speed
      model = 'deepseek-chat'
    } = options;

    // Add strict 8-second timeout (buffer for processing)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

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
              role: 'system',
              content: `You are a professional business content specialist. Create sophisticated business content in PLAIN TEXT ONLY.

ABSOLUTE REQUIREMENTS:
- NEVER use ANY markdown symbols: no **, ##, ###, ####, ---, ***, +++
- NEVER use emojis of any kind - zero emojis allowed
- NEVER use special formatting characters
- Write in clean, professional paragraphs with line breaks between sections
- Use ONLY plain text with proper sentence structure
- NO visual formatting - just well-written content
- Write like a Harvard Business Review article - sophisticated and professional
- Focus on substance, expertise, and valuable insights
- Complete all responses fully without cutting off mid-sentence

Example of CORRECT format:
Title Here

This is the introduction paragraph with valuable information.

This is the next section with more insights. Numbers can be written as: First, second, third or using simple 1. 2. 3. format only when absolutely necessary.

Write ONLY in this clean, professional format.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: maxTokens,
          temperature,
          stream: false,           // Ensure non-streaming for consistency
          top_p: 0.9,             // Add top_p for better performance
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

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
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.log('⏱️ DeepSeek request timed out after 8 seconds');
        throw new Error('Request timed out after 8 seconds. Please try a shorter prompt or try again.');
      }
      console.error('DeepSeek API error:', error);
      throw error;
    }
  }

  async generateBlogPost(topic: string, keywords: string[] = []) {
    const prompt = `Write a comprehensive, professional blog post about "${topic}".

CRITICAL FORMATTING REQUIREMENTS:
- ABSOLUTELY NO markdown formatting - no **, ##, ###, or any special symbols
- ZERO emojis allowed anywhere in the content
- Write in PLAIN TEXT ONLY with clean paragraph breaks
- Professional, business-appropriate tone throughout
- Include SEO keywords naturally: ${keywords.join(', ')}
- 800-1200 words with substantial value
- Use clear section breaks with simple titles in plain text
- Compelling introduction and strong conclusion
- Provide actionable, expert-level insights
- Write like a Harvard Business Review article
- Complete the entire blog post without cutting off

Format like this example:
Understanding Digital Business Success

The digital marketplace has fundamentally transformed how businesses operate and generate revenue. This comprehensive analysis examines the key factors that drive sustainable growth in online business environments.

Essential Components of Digital Business Strategy

Modern digital businesses rely on several core principles to achieve long-term success...

Write the full blog post in this clean, professional format with NO formatting symbols.

Topic: ${topic}`;

    return this.generateCompletion(prompt, { maxTokens: 500 });
  }

  async generateSocialMediaPost(platform: string, topic: string, tone: string = 'professional') {
    const prompt = `Create an engaging ${platform} post about "${topic}".
    
Requirements:
- Tone: ${tone}
- Professional business language appropriate for ${platform}
- Include relevant hashtags (avoid excessive use)
- ${platform === 'Twitter' ? 'Under 280 characters, concise and impactful' : ''}
- ${platform === 'LinkedIn' ? 'Professional and insightful, business-focused' : ''}
- ${platform === 'Instagram' ? 'Engaging content with minimal, tasteful emojis' : ''}
- Clear, professional call-to-action
- Focus on value and expertise over flashy formatting

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

    return this.generateCompletion(prompt, { maxTokens: 500 });
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

    return this.generateCompletion(prompt, { maxTokens: 500 });
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