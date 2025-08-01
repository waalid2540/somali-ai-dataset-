// AI Tools Engine - Core system for 20 AI tools bundle
// Powers all AI tools with consistent interface and processing

interface AIToolConfig {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'business' | 'creative' | 'communication';
  icon: string;
  inputs: InputField[];
  prompt: string;
  maxTokens: number;
  temperature: number;
  examples: string[];
}

interface InputField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  placeholder: string;
  required: boolean;
  options?: string[];
  maxLength?: number;
}

interface AIToolResult {
  success: boolean;
  content: string;
  metadata: {
    wordsGenerated: number;
    processingTime: number;
    cost: number;
    confidence: number;
  };
  error?: string;
}

class AIToolsEngine {
  private apiKey: string;
  private baseURL = 'https://api.deepseek.com/v1';
  
  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY || '';
    
    if (!this.apiKey) {
      console.error('DeepSeek API key not found. Please set DEEPSEEK_API_KEY in environment variables.');
    }
  }

  /**
   * Process any AI tool request
   */
  async processAITool(toolId: string, inputs: Record<string, any>): Promise<AIToolResult> {
    const startTime = Date.now();
    
    try {
      const toolConfig = this.getToolConfig(toolId);
      if (!toolConfig) {
        throw new Error(`Tool ${toolId} not found`);
      }

      // Build the prompt with user inputs
      const prompt = this.buildPrompt(toolConfig, inputs);
      
      // Generate content with GPT-4
      const content = await this.generateContent(prompt, toolConfig);
      
      // Calculate metadata
      const processingTime = Date.now() - startTime;
      const wordsGenerated = content.split(' ').length;
      const cost = this.calculateCost(prompt, content);
      
      return {
        success: true,
        content,
        metadata: {
          wordsGenerated,
          processingTime,
          cost,
          confidence: 0.95
        }
      };

    } catch (error) {
      return {
        success: false,
        content: '',
        metadata: {
          wordsGenerated: 0,
          processingTime: Date.now() - startTime,
          cost: 0,
          confidence: 0
        },
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate content using DeepSeek with 10-second timeout (95% cheaper than GPT-4!)
   */
  private async generateContent(prompt: string, config: AIToolConfig): Promise<string> {
    // Add strict 8-second timeout (buffer for processing)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout to ensure completion

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are a ${config.name} specialist. Create engaging, professional content with the unique style and personality defined in the tool prompt. Use emojis, formatting, and creative elements as specified in each tool's requirements. Focus on delivering high-quality, valuable content that matches the tool's specific purpose and target audience.

IMPORTANT: Today's date is ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} (${new Date().getFullYear()}). Always use the current year ${new Date().getFullYear()} in titles, examples, and content - NEVER use outdated years like 2024.`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: Math.min(config.maxTokens, 800), // Ensure complete content generation
          temperature: Math.min(config.temperature, 0.01), // Ultra-low for maximum speed
          top_p: 0.9,
          stream: false,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`AI generation failed: ${error.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      return result.choices[0].message.content;
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timed out after 15 seconds. Please try again.');
      }
      throw error;
    }
  }

  /**
   * Build prompt from template and user inputs
   */
  private buildPrompt(config: AIToolConfig, inputs: Record<string, any>): string {
    let prompt = config.prompt;
    
    // Replace placeholders with user inputs
    Object.entries(inputs).forEach(([key, value]) => {
      const placeholder = `{${key}}`;
      prompt = prompt.replace(new RegExp(placeholder, 'g'), value || '');
    });
    
    return prompt;
  }

  /**
   * Calculate processing cost for transparency
   */
  private calculateCost(prompt: string, output: string): number {
    const inputTokens = Math.ceil(prompt.length / 4);
    const outputTokens = Math.ceil(output.length / 4);
    
    const inputCost = (inputTokens / 1000) * 0.01; // $0.01 per 1K input tokens
    const outputCost = (outputTokens / 1000) * 0.03; // $0.03 per 1K output tokens
    
    return inputCost + outputCost;
  }

  /**
   * Get all available AI tools
   */
  getAllTools(): AIToolConfig[] {
    return [
      // AI Chat Assistant (ChatGPT Alternative)
      this.getAIChatAssistant(),
      
      // Content Creation Tools
      this.getBlogPostGenerator(),
      this.getSocialMediaAI(),
      this.getAdCopyCreator(),
      this.getEmailMarketingAI(),
      this.getProductDescriptionAI(),
      this.getTutorialStudio(),
      
      // Business Operation Tools
      this.getInvoiceGeneratorAI(),
      this.getContractCreatorAI(),
      this.getProposalWriterAI(),
      this.getResumeBuilderAI(),
      this.getJobDescriptionAI(),
      
      // Creative & Design Tools
      this.getBusinessNameGenerator(),
      this.getSloganCreatorAI(),
      this.getPresentationAI(),
      this.getScriptWriterAI(),
      this.getNewsletterAI(),
      
      // Communication Tools
      this.getTranslationAI(),
      this.getChatbotBuilderAI(),
      this.getMeetingSummarizerAI(),
      this.getReviewResponseAI(),
      this.getCustomerServiceAI()
    ];
  }

  /**
   * Get specific tool configuration
   */
  private getToolConfig(toolId: string): AIToolConfig | null {
    const tools = this.getAllTools();
    return tools.find(tool => tool.id === toolId) || null;
  }

  /**
   * Get tools by category
   */
  getToolsByCategory(category: string): AIToolConfig[] {
    return this.getAllTools().filter(tool => tool.category === category);
  }

  // Tool Configurations - AI Chat Assistant + 20 AI Tools
  
  private getAIChatAssistant(): AIToolConfig {
    return {
      id: 'ai-chat-assistant',
      name: 'AI Chat Assistant',
      description: 'ChatGPT-style AI chat assistant for any question or task',
      category: 'communication',
      icon: '🤖',
      inputs: [
        {
          id: 'message',
          label: 'Your Message',
          type: 'textarea',
          placeholder: 'Ask me anything... I can help with writing, coding, analysis, creative tasks, and more!',
          required: true,
          maxLength: 2000
        },
        {
          id: 'context',
          label: 'Context (Optional)',
          type: 'textarea',
          placeholder: 'Provide any background context that would help me give a better response',
          required: false,
          maxLength: 1000
        }
      ],
      prompt: `🤖 AI ASSISTANT EXTRAORDINAIRE: I'm your intelligent companion ready to tackle ANY challenge with expertise and enthusiasm! 🚀

💬 USER MESSAGE:
{message}

📈 CONTEXT:
{context}

✨ MY SUPERPOWERS:
📝 Writing Wizard: Essays, emails, creative content, technical docs
💻 Code Master: Programming, debugging, architecture, optimization
📈 Analysis Expert: Data insights, research, problem-solving strategies
🎨 Creative Genius: Brainstorming, storytelling, innovative solutions
📀 Learning Coach: Explanations, tutorials, skill development
🚀 Business Advisor: Strategy, marketing, operations, growth hacking

🎯 RESPONSE APPROACH:
- ⚡ Lightning-fast problem identification
- 💡 Creative solutions with multiple options
- 📈 Step-by-step actionable guidance
- 🎆 Real-world examples and applications
- 🚀 Go-beyond-expectations value delivery

👥 CONVERSATION STYLE:
- Friendly and approachable (like chatting with a genius friend)
- Professional when needed, casual when appropriate
- Encouraging and motivational
- Clear, structured, easy to follow
- Interactive and engaging

📝 RESPONSE STRUCTURE:
1. 🎯 Direct answer to your question
2. 💡 Additional insights and tips
3. 🚀 Next steps or follow-up suggestions
4. ❓ Questions to help you go deeper (if relevant)

Ready to make magic happen with your request! Let's dive in and create something amazing together! 💪✨`,
      maxTokens: 800,
      temperature: 0.7,
      examples: [
        "Help me write a professional email",
        "Explain quantum computing in simple terms", 
        "Create a marketing strategy for my business",
        "Debug this JavaScript code",
        "Write a creative story about space exploration"
      ]
    };
  }
  
  private getBlogPostGenerator(): AIToolConfig {
    return {
      id: 'blog-post-generator',
      name: 'Blog Post Generator',
      description: 'Create SEO-optimized blog posts that rank on Google and engage readers',
      category: 'content',
      icon: '📝',
      inputs: [
        {
          id: 'topic',
          label: 'Blog Topic',
          type: 'text',
          placeholder: 'e.g., How to Start a Successful Online Business',
          required: true,
          maxLength: 200
        },
        {
          id: 'keywords',
          label: 'Target Keywords (comma separated)',
          type: 'text',
          placeholder: 'e.g., online business, entrepreneurship, startup',
          required: false,
          maxLength: 500
        },
        {
          id: 'tone',
          label: 'Writing Tone',
          type: 'select',
          placeholder: 'Select tone',
          required: true,
          options: ['Professional', 'Conversational', 'Authoritative', 'Friendly', 'Technical']
        },
        {
          id: 'length',
          label: 'Post Length',
          type: 'select',
          placeholder: 'Select length',
          required: true,
          options: ['Short (500-800 words)', 'Medium (800-1500 words)', 'Long (1500-2500 words)']
        }
      ],
      prompt: `📚 BLOG MASTERY MODE: Create an irresistible, SEO-powerhouse blog post about "{topic}" that dominates Google and captivates readers!

🎯 MISSION BRIEFING:
- Target Keywords: {keywords}
- Voice & Tone: {tone}
- Word Count Goal: {length}

🏆 CONTENT ARCHITECTURE:
✅ Magnetic headline that promises value (include target keyword)
✅ Hook-laden introduction that makes readers NEED to continue
✅ Strategic H2/H3 subheadings with keyword optimization
✅ Value-packed sections with actionable insights
✅ Engaging storytelling mixed with hard facts
✅ Internal linking opportunities (mention where relevant)
✅ Powerful conclusion with clear next steps

🎨 WRITING STYLE GUIDE:
- {tone} voice throughout
- Use bullet points, numbered lists, and formatting for scannability
- Include relevant emojis for visual appeal (but keep it professional)
- Write like you're talking to a friend who needs expert advice
- Back claims with data and examples
- Create "Aha!" moments that make readers share

🚀 SEO MAGIC FORMULA:
- Keywords: {keywords} woven naturally throughout
- Meta-worthy title (under 60 characters)
- Subheadings that answer search questions
- Content that satisfies search intent completely
- Call-to-action that converts browsers to subscribers/customers

Ready to create content that ranks #1 and converts like crazy? Let's build something amazing! 🌟

IMPORTANT: 
1. Write a COMPLETE blog post from introduction to conclusion. Do not cut off mid-sentence. Ensure the full article is finished with a proper ending and call-to-action.
2. Always use the current year 2025 in titles, examples, and content. Never use outdated years like 2024.
3. Make content current and relevant to 2025 trends and developments.`,
      maxTokens: 1200,
      temperature: 0.6,
      examples: [
        'How to Build a Million-Dollar Business in 2025',
        'The Ultimate Guide to Social Media Marketing',
        '10 AI Tools Every Entrepreneur Needs'
      ]
    };
  }

  private getSocialMediaAI(): AIToolConfig {
    return {
      id: 'social-media-ai',
      name: 'Social Media Content AI',
      description: 'Create viral social media posts for all platforms with hashtags and engagement hooks',
      category: 'content',
      icon: '📱',
      inputs: [
        {
          id: 'platform',
          label: 'Platform',
          type: 'select',
          placeholder: 'Select platform',
          required: true,
          options: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'TikTok', 'YouTube']
        },
        {
          id: 'topic',
          label: 'Post Topic/Theme',
          type: 'text',
          placeholder: 'e.g., Morning motivation for entrepreneurs',
          required: true,
          maxLength: 200
        },
        {
          id: 'goal',
          label: 'Post Goal',
          type: 'select',
          placeholder: 'Select goal',
          required: true,
          options: ['Engagement', 'Traffic', 'Sales', 'Brand Awareness', 'Community Building']
        },
        {
          id: 'audience',
          label: 'Target Audience',
          type: 'text',
          placeholder: 'e.g., Small business owners, 25-45 years old',
          required: false,
          maxLength: 300
        }
      ],
      prompt: `🚀 SOCIAL MEDIA MAGIC TIME! Create a viral-worthy post for {platform} that stops the scroll! 

📱 Post Mission:
- Topic: {topic}
- Goal: {goal}  
- Target: {audience}

✨ VIRAL RECIPE:
- Hook that grabs attention in 0.3 seconds ⚡
- Use TONS of emojis for visual appeal 🎯
- Platform-specific formatting & length
- Trending hashtags that GET DISCOVERED 📈
- Irresistible call-to-action that converts 💰
- Share-worthy content that spreads like wildfire 🔥

🎪 STYLE GUIDE:
- Be energetic, authentic & conversational 
- Use line breaks for easy reading 📖
- Add emojis throughout (but not overwhelming)
- Create FOMO and urgency ⏰
- Make people WANT to engage 💬

Platform-specific tips:
📸 Instagram: Visual storytelling + 8-10 hashtags
🔗 LinkedIn: Professional but engaging + 2-3 hashtags
🐦 Twitter: Concise wit + trending topics
🎵 TikTok: Trendy language + action words
🎬 YouTube: Strong hook + clear value

Ready to create content that goes VIRAL? Let's make {audience} stop, engage, and convert! 🎯`,
      maxTokens: 800,
      temperature: 0.8,
      examples: [
        'Motivational Monday post for entrepreneurs',
        'Product launch announcement',
        'Behind-the-scenes business content'
      ]
    };
  }

  private getAdCopyCreator(): AIToolConfig {
    return {
      id: 'ad-copy-creator',
      name: 'Ad Copy Creator',
      description: 'Generate high-converting Facebook, Google, and Instagram ads that drive sales',
      category: 'content',
      icon: '📢',
      inputs: [
        {
          id: 'platform',
          label: 'Ad Platform',
          type: 'select',
          placeholder: 'Select platform',
          required: true,
          options: ['Facebook/Instagram', 'Google Ads', 'LinkedIn Ads', 'Twitter Ads', 'TikTok Ads']
        },
        {
          id: 'product',
          label: 'Product/Service',
          type: 'text',
          placeholder: 'e.g., AI Meeting Summarizer Software',
          required: true,
          maxLength: 200
        },
        {
          id: 'audience',
          label: 'Target Audience',
          type: 'text',
          placeholder: 'e.g., Business professionals, remote workers',
          required: true,
          maxLength: 300
        },
        {
          id: 'objective',
          label: 'Campaign Objective',
          type: 'select',
          placeholder: 'Select objective',
          required: true,
          options: ['Sales/Conversions', 'Lead Generation', 'Brand Awareness', 'Traffic', 'App Installs']
        },
        {
          id: 'offer',
          label: 'Special Offer (Optional)',
          type: 'text',
          placeholder: 'e.g., 50% off, Free trial, Limited time',
          required: false,
          maxLength: 100
        }
      ],
      prompt: `💰 AD CONVERSION MACHINE MODE: Create killer ad copy for {platform} that turns browsers into BUYERS! 🎯

🎪 AD MISSION BRIEFING:
- Product/Service: {product}
- Target Audience: {audience} 
- Objective: {objective}
- Special Offer: {offer}

⚡ CONVERSION FORMULA:
✨ Scroll-stopping headline that creates instant desire
🔥 Pain-point focused copy that hits emotional triggers
💎 Crystal-clear value proposition that screams "I NEED THIS!"
⏰ Urgency elements that create FOMO
🎨 Platform-specific formatting for maximum impact
📈 Benefit-driven messaging (not boring features)
💥 Irresistible call-to-action that demands clicks

🚀 PLATFORM OPTIMIZATION:
📱 Facebook/Instagram: Visual storytelling + social proof
🔍 Google Ads: Search intent + immediate solutions  
💼 LinkedIn: Professional value + career benefits
🐦 Twitter: Snappy hooks + trending vibes
🎵 TikTok: Gen Z language + action words

🎯 PSYCHOLOGICAL TRIGGERS:
- Fear of missing out (FOMO) ⏳
- Social proof and testimonials 👥
- Authority and expertise 🏆
- Scarcity and limited time ⚡
- Transformation promises 🌟

Ready to create ads that make {audience} click, convert, and become customers? Let's build campaigns that DOMINATE {platform}! 💪`,
      maxTokens: 600,
      temperature: 0.8,
      examples: [
        'SaaS software Facebook ad',
        'E-commerce product Google ad',
        'B2B service LinkedIn ad'
      ]
    };
  }

  private getEmailMarketingAI(): AIToolConfig {
    return {
      id: 'email-marketing-ai',
      name: 'Email Marketing AI',
      description: 'Create email sequences, newsletters, and campaigns that convert subscribers',
      category: 'content',
      icon: '📧',
      inputs: [
        {
          id: 'type',
          label: 'Email Type',
          type: 'select',
          placeholder: 'Select email type',
          required: true,
          options: ['Welcome Email', 'Sales Email', 'Newsletter', 'Follow-up Email', 'Abandoned Cart', 'Re-engagement']
        },
        {
          id: 'product',
          label: 'Product/Service',
          type: 'text',
          placeholder: 'e.g., Online Course, SaaS Platform, Physical Product',
          required: true,
          maxLength: 200
        },
        {
          id: 'audience',
          label: 'Audience Description',
          type: 'text',
          placeholder: 'e.g., New subscribers, existing customers, inactive users',
          required: true,
          maxLength: 300
        },
        {
          id: 'goal',
          label: 'Email Goal',
          type: 'select',
          placeholder: 'Select goal',
          required: true,
          options: ['Drive Sales', 'Build Relationship', 'Provide Value', 'Get Feedback', 'Increase Engagement']
        }
      ],
      prompt: `📧 EMAIL MASTERY MODE: Craft inbox-dominating emails that get OPENED, READ, and CLICKED! 🚀

🎩 EMAIL MISSION:
- Type: {type}
- Product/Service: {product}
- Target: {audience}
- Goal: {goal}

✨ INBOX DOMINATION STRATEGY:
📲 Subject line that triggers curiosity (avoid spam words!)
👋 Warm, personalized greeting that feels human
💎 Value-packed opening that hooks immediately
📈 Benefit-focused content that solves real problems
🔥 Emotional storytelling mixed with social proof
📱 Mobile-first design (60% read on mobile!)
💥 CTA button that screams "Click me NOW!"

🎯 EMAIL TYPE MASTERY:
👋 Welcome: Make them feel special + set expectations
💰 Sales: Problem-solution-urgency-action formula
📰 Newsletter: Value first, promotion second
🔄 Follow-up: Gentle persistence with fresh angles
🛍️ Abandoned Cart: FOMO + social proof + easy checkout
❤️ Re-engagement: "We miss you" + exclusive comeback offer

🚀 CONVERSION PSYCHOLOGY:
- Use power words: FREE, EXCLUSIVE, LIMITED, NOW
- Create urgency: "24 hours left", "Limited spots"
- Build trust: testimonials, guarantees, credentials
- Make it scannable: bullets, short paragraphs, emojis

Ready to create emails that turn {audience} into loyal customers? Let's build campaigns that CRUSH the competition! 💪🎆`,
      maxTokens: 800,
      temperature: 0.7,
      examples: [
        'Welcome email for new SaaS users',
        'Product launch announcement',
        'Re-engagement campaign for inactive subscribers'
      ]
    };
  }

  private getProductDescriptionAI(): AIToolConfig {
    return {
      id: 'product-description-ai',
      name: 'Product Description AI',
      description: 'Write compelling product descriptions that convert browsers into buyers',
      category: 'content',
      icon: '🛍️',
      inputs: [
        {
          id: 'product',
          label: 'Product Name',
          type: 'text',
          placeholder: 'e.g., Wireless Bluetooth Headphones',
          required: true,
          maxLength: 200
        },
        {
          id: 'features',
          label: 'Key Features (one per line)',
          type: 'textarea',
          placeholder: 'e.g., Noise cancelling\n20-hour battery\nWireless charging',
          required: true,
          maxLength: 500
        },
        {
          id: 'audience',
          label: 'Target Customer',
          type: 'text',
          placeholder: 'e.g., Music lovers, professionals, fitness enthusiasts',
          required: true,
          maxLength: 200
        },
        {
          id: 'style',
          label: 'Description Style',
          type: 'select',
          placeholder: 'Select style',
          required: true,
          options: ['Professional', 'Casual/Fun', 'Luxury/Premium', 'Technical', 'Emotional/Storytelling']
        }
      ],
      prompt: `🛍️ PRODUCT SALES WIZARD: Transform "{product}" into an irresistible must-have that customers can't resist! 💫

🎯 PRODUCT INTEL:
- Features: {features}
- Target Customer: {audience}
- Brand Voice: {style}

✨ CONVERSION ALCHEMY:
📍 Hook them with a problem they FEEL (pain point opener)
🎆 Paint the dream transformation (life after purchase)
🔥 Features → Benefits translation (what's in it for them?)
📈 Social proof sprinkles ("Join 10,000+ happy customers")
🚀 Sensory language that makes them WANT it
⏰ Urgency elements that trigger action NOW
💥 Guarantee/risk reversal (remove buying fears)
🎯 Irresistible CTA that demands immediate action

🎨 STYLE GUIDE ADAPTATION:
💼 Professional: Sophisticated, data-driven, trustworthy 
🎉 Casual/Fun: Playful, relatable, emoji-rich
👑 Luxury/Premium: Exclusive, sophisticated, aspirational
🔧 Technical: Precise, spec-focused, expert-level
📚 Emotional/Storytelling: Personal, narrative-driven, heart-focused

🗣️ BUYER PSYCHOLOGY TRIGGERS:
- WIIFM (What's In It For Me?)
- Fear of missing out (FOMO)
- Social validation (everyone has one!)
- Status elevation (be the envy of friends)
- Problem elimination (no more struggles)
- Time/money savings (get results faster)

Ready to create copy that makes {audience} say "TAKE MY MONEY!"? Let's build descriptions that convert like CRAZY! 💰🚀`,
      maxTokens: 600,
      temperature: 0.7,
      examples: [
        'Tech gadget for professionals',
        'Fashion item for young adults',
        'Health supplement for fitness enthusiasts'
      ]
    };
  }

  private getTutorialStudio(): AIToolConfig {
    return {
      id: 'tutorial-studio',
      name: 'Tutorial Script Generator',
      description: 'Generate scripts for professional demo videos and tutorials',
      category: 'content',
      icon: '🎥',
      inputs: [
        {
          id: 'product',
          label: 'Product/Software Name',
          type: 'text',
          placeholder: 'e.g., Project Management App, E-commerce Platform',
          required: true,
          maxLength: 200
        },
        {
          id: 'audience',
          label: 'Target Audience',
          type: 'text',
          placeholder: 'e.g., Small business owners, developers, marketers',
          required: true,
          maxLength: 200
        },
        {
          id: 'features',
          label: 'Key Features to Demonstrate (one per line)',
          type: 'textarea',
          placeholder: 'e.g., User dashboard\nFile upload system\nReporting tools',
          required: true,
          maxLength: 500
        },
        {
          id: 'duration',
          label: 'Tutorial Duration',
          type: 'select',
          placeholder: 'Select duration',
          required: true,
          options: ['2-3 minutes (Quick demo)', '5-7 minutes (Feature walkthrough)', '10-15 minutes (Complete tutorial)', '20+ minutes (In-depth training)']
        },
        {
          id: 'style',
          label: 'Tutorial Style',
          type: 'select',
          placeholder: 'Select style',
          required: true,
          options: ['Professional/Corporate', 'Casual/Friendly', 'Educational/Training', 'Marketing/Sales']
        }
      ],
      prompt: `🎥 TUTORIAL STUDIO DIRECTOR: Create an engaging professional tutorial script for "{product}" that converts viewers into users! 🚀

🎯 PROJECT BRIEF:
- Product: {product}
- Target Audience: {audience}
- Features to Demo: {features}
- Duration: {duration}
- Style: {style}

🎬 TUTORIAL STRUCTURE:
📍 HOOK (0-15 seconds):
- Problem statement that resonates with {audience}
- Promise of what they'll learn/achieve
- Quick preview of the transformation

🎯 INTRODUCTION (15-30 seconds):
- Brief product introduction
- Who this is perfect for
- What makes it special

🛠️ FEATURE DEMONSTRATIONS:
For each feature in {features}:
- Show the problem it solves
- Step-by-step demonstration
- Highlight user benefits
- Real-world use case example

💡 PRO TIPS THROUGHOUT:
- Time-saving shortcuts
- Best practices
- Common mistakes to avoid
- Advanced techniques

🏁 COMPELLING CONCLUSION:
- Recap key benefits
- Next steps for viewers
- Clear call-to-action
- Where to get started

🎨 STYLE ADAPTATION:
💼 Professional: Polished, data-driven, corporate tone
🎉 Casual: Conversational, relatable, friendly approach
📚 Educational: Detailed, step-by-step, learning-focused
📈 Marketing: Benefit-heavy, conversion-focused, persuasive

🎙️ TUTORIAL BEST PRACTICES:
- Clear, concise narration
- Logical flow and pacing
- Visual cues and callouts
- Engagement hooks every 30 seconds
- Problem → Solution → Benefit structure

Create a tutorial script that makes {audience} say "I NEED this product!" 🎯✨`,
      maxTokens: 800,
      temperature: 0.7,
      examples: [
        'SaaS dashboard walkthrough for business owners',
        'Mobile app tutorial for end users',
        'Software integration guide for developers'
      ]
    };
  }

  // Business Operation Tools (6-10)
  
  private getInvoiceGeneratorAI(): AIToolConfig {
    return {
      id: 'invoice-generator-ai',
      name: 'Invoice Generator AI',
      description: 'Create professional invoices and billing documents automatically',
      category: 'business',
      icon: '📄',
      inputs: [
        {
          id: 'clientName',
          label: 'Client Name',
          type: 'text',
          placeholder: 'e.g., ABC Corporation',
          required: true,
          maxLength: 200
        },
        {
          id: 'services',
          label: 'Services/Products (one per line)',
          type: 'textarea',
          placeholder: 'e.g., Web Development - $2000\nSEO Consultation - $500',
          required: true,
          maxLength: 1000
        },
        {
          id: 'paymentTerms',
          label: 'Payment Terms',
          type: 'select',
          placeholder: 'Select terms',
          required: true,
          options: ['Net 15', 'Net 30', 'Due on Receipt', 'Net 60', 'Custom']
        },
        {
          id: 'businessInfo',
          label: 'Your Business Info',
          type: 'textarea',
          placeholder: 'Business name, address, phone, email',
          required: true,
          maxLength: 500
        }
      ],
      prompt: `📊 INVOICE GENERATOR PRO: Create a polished, professional invoice for {clientName} that gets paid FAST! 💳

🏢 BUSINESS DETAILS:
{businessInfo}

📝 SERVICES PROVIDED:
{services}

📅 PAYMENT TERMS: {paymentTerms}

💼 PROFESSIONAL INVOICE STRUCTURE:
🏷️ Header Section:
- Company logo placement area
- Business name & contact details
- Professional tagline/slogan
- Invoice # (INV-2025-XXX format)
- Invoice date & due date

📍 Client Information:
- "Bill To:" section with client details
- Clean, organized contact format

📊 Itemized Services:
- Clear service descriptions
- Quantity/hours breakdown
- Rate per unit/hour
- Line totals for each item
- Professional formatting

💰 Financial Summary:
- Subtotal calculation
- Tax breakdown (if applicable)
- **TOTAL AMOUNT** (bold/highlighted)
- Currency clearly specified

💳 Payment Information:
- Accepted payment methods
- Bank details/payment instructions
- Online payment links (if available)
- Late payment terms/fees

🚀 Professional Footer:
- Grateful closing message
- Contact info for questions
- "Thank you for your business!"
- Terms & conditions reference

✨ PROFESSIONAL TOUCHES:
- Clean, modern layout design
- Consistent typography
- Professional color scheme suggestions
- Easy-to-scan format
- Print-friendly design

Create an invoice that looks professional, builds trust, and encourages prompt payment! 🎆`,
      maxTokens: 800,
      temperature: 0.3,
      examples: [
        'Freelance web development invoice',
        'Consulting services billing',
        'Product sales invoice'
      ]
    };
  }

  private getContractCreatorAI(): AIToolConfig {
    return {
      id: 'contract-creator-ai',
      name: 'Contract Creator AI',
      description: 'Generate legal contracts and agreements for business deals',
      category: 'business',
      icon: '📋',
      inputs: [
        {
          id: 'contractType',
          label: 'Contract Type',
          type: 'select',
          placeholder: 'Select contract type',
          required: true,
          options: ['Service Agreement', 'Employment Contract', 'NDA', 'Partnership Agreement', 'Sales Contract']
        },
        {
          id: 'parties',
          label: 'Parties Involved',
          type: 'textarea',
          placeholder: 'Party 1: Your Company\nParty 2: Client/Partner Name',
          required: true,
          maxLength: 300
        },
        {
          id: 'terms',
          label: 'Key Terms & Conditions',
          type: 'textarea',
          placeholder: 'Scope of work, payment terms, timeline, etc.',
          required: true,
          maxLength: 1000
        },
        {
          id: 'duration',
          label: 'Contract Duration',
          type: 'text',
          placeholder: 'e.g., 6 months, Until project completion',
          required: true,
          maxLength: 100
        }
      ],
      prompt: `⚖️ CONTRACT CREATOR PRO: Draft a bulletproof {contractType} that protects your business and ensures smooth partnerships! 📁

🎯 CONTRACT BRIEFING:
- Parties: {parties}
- Duration: {duration} 
- Key Terms: {terms}

📜 LEGAL DOCUMENT STRUCTURE:
🏷️ Title & Identification:
- Contract type clearly stated
- Unique contract number/reference
- Execution date and jurisdiction

👥 Party Definitions:
- Legal entity names and addresses
- Contact information and representatives
- Authority to enter agreement

🎯 Scope of Work/Services:
- Detailed description of obligations
- Specific deliverables and milestones
- Performance standards and metrics

💰 Financial Terms:
- Payment amounts and schedule
- Late payment penalties
- Expense reimbursement policies
- Currency and tax considerations

⏰ Timeline & Performance:
- Start and end dates
- Key milestone deadlines
- Delivery requirements
- Performance measurement criteria

🚪 Termination & Exit:
- Termination conditions and notice periods
- Early termination penalties
- Post-termination obligations
- Asset return requirements

🛡️ Risk Management:
- Liability limitations and exclusions
- Insurance requirements
- Indemnification clauses
- Force majeure provisions

⚖️ Dispute Resolution:
- Negotiation and mediation procedures
- Arbitration clauses (if applicable)
- Governing law and jurisdiction
- Attorney fees allocation

✍️ Execution Section:
- Signature blocks for all parties
- Date and location of signing
- Witness requirements (if needed)

📈 PROFESSIONAL FORMATTING:
- Clear section numbering
- Professional typography
- Defined terms in bold/caps
- Easy-to-reference structure

Create a contract that's legally robust, business-friendly, and crystal clear for all parties! 🎆`,
      maxTokens: 600,
      temperature: 0.2,
      examples: [
        'Freelance service agreement',
        'Employment contract template',
        'Business partnership agreement'
      ]
    };
  }

  private getProposalWriterAI(): AIToolConfig {
    return {
      id: 'proposal-writer-ai',
      name: 'Proposal Writer AI',
      description: 'Write winning business proposals that close deals',
      category: 'business',
      icon: '💼',
      inputs: [
        {
          id: 'proposalType',
          label: 'Proposal Type',
          type: 'select',
          placeholder: 'Select type',
          required: true,
          options: ['Business Proposal', 'Project Proposal', 'Service Proposal', 'Partnership Proposal', 'Grant Proposal']
        },
        {
          id: 'client',
          label: 'Client/Organization',
          type: 'text',
          placeholder: 'Client name and brief description',
          required: true,
          maxLength: 200
        },
        {
          id: 'solution',
          label: 'Your Solution/Service',
          type: 'textarea',
          placeholder: 'What you\'re proposing and how it solves their problem',
          required: true,
          maxLength: 800
        },
        {
          id: 'budget',
          label: 'Budget Range',
          type: 'text',
          placeholder: 'e.g., $5,000 - $10,000',
          required: false,
          maxLength: 100
        }
      ],
      prompt: `💼 PROPOSAL POWERHOUSE: Craft a winning {proposalType} for {client} that gets you HIRED! 🎆

🎨 PROPOSAL MISSION:
- Client: {client}
- Solution: {solution}
- Budget Range: {budget}

✨ DEAL-WINNING FORMULA:
🚀 Executive Summary (The Hook):
- One powerful paragraph that makes them say "YES!"
- Clear value proposition and ROI promise
- Teaser of transformation they'll experience

🔥 Problem Deep-Dive:
- Paint the pain they're feeling RIGHT NOW
- Quantify the cost of inaction
- Show you truly understand their struggles

💡 Solution Showcase:
- Your approach broken down simply
- Why your method beats the competition
- Specific benefits they'll gain
- Proof points and case studies

⏱️ Timeline & Methodology:
- Phase-by-phase breakdown
- Clear milestones and deliverables
- Realistic timelines that build confidence

🏆 Why You're THE Choice:
- Team credentials and expertise
- Past success stories and testimonials
- Unique advantages and differentiators

💰 Investment Breakdown:
- Clear pricing structure (if budget provided)
- Value-based positioning
- Payment terms and options
- ROI projections where possible

📈 Success Metrics:
- Measurable outcomes and KPIs
- How success will be tracked
- Reporting and communication schedule

🚀 Next Steps (The Close):
- Clear action items
- Timeline for decision
- Contact information
- Signature-ready acceptance

🎯 PSYCHOLOGICAL TRIGGERS:
- Social proof (other clients' success)
- Urgency (limited availability)
- Authority (credentials and expertise)
- Reciprocity (free insights included)

Ready to create a proposal that makes {client} choose YOU over everyone else? Let's win this deal! 💪💰`,
      maxTokens: 500,
      temperature: 0.6,
      examples: [
        'Web development project proposal',
        'Marketing services proposal',
        'Software solution proposal'
      ]
    };
  }

  private getResumeBuilderAI(): AIToolConfig {
    return {
      id: 'resume-builder-ai',
      name: 'Resume Builder AI',
      description: 'Create ATS-optimized resumes that get interviews',
      category: 'business',
      icon: '📄',
      inputs: [
        {
          id: 'jobTitle',
          label: 'Target Job Title',
          type: 'text',
          placeholder: 'e.g., Senior Software Developer',
          required: true,
          maxLength: 100
        },
        {
          id: 'experience',
          label: 'Work Experience (most recent first)',
          type: 'textarea',
          placeholder: 'Job title, company, years, key achievements',
          required: true,
          maxLength: 1500
        },
        {
          id: 'skills',
          label: 'Key Skills',
          type: 'textarea',
          placeholder: 'Technical skills, soft skills, certifications',
          required: true,
          maxLength: 500
        },
        {
          id: 'education',
          label: 'Education',
          type: 'text',
          placeholder: 'Degree, University, Year',
          required: false,
          maxLength: 200
        }
      ],
      prompt: `💼 RESUME CHAMPION: Build an interview-winning resume for {jobTitle} that dominates ATS systems and impresses hiring managers! 🎆

🎨 CAREER PROFILE:
- Target Role: {jobTitle}
- Experience: {experience}
- Skills Arsenal: {skills}
- Education: {education}

✨ ATS DOMINATION STRATEGY:
🎆 Professional Summary (The Power Opener):
- 3-4 lines of pure value proposition
- Industry keywords naturally woven in
- Quantified achievements preview
- Leadership/expertise highlights

🚀 Experience Section (The Proof):
- Action verbs that pack punch (Led, Achieved, Transformed)
- STAR method for each bullet (Situation-Task-Action-Result)
- Quantified wins ("Increased sales by 45%")
- Industry-specific keywords for {jobTitle}
- Progression story that shows growth

📈 Skills Powerhouse:
- Technical skills matching job requirements
- Soft skills with context
- Certifications and specializations
- Industry tools and platforms
- ATS keyword optimization

🎓 Education & Credentials:
- Degree with honors/achievements
- Relevant coursework (if recent grad)
- Professional certifications
- Continuous learning examples

📝 ATS-FRIENDLY FORMATTING:
- Clean, scannable layout
- Standard section headers
- No fancy graphics or tables
- Proper keyword density
- Contact info optimization

🎯 HIRING PSYCHOLOGY:
- Show progression and ambition
- Demonstrate problem-solving ability
- Highlight leadership potential
- Prove cultural fit indicators
- Emphasize unique value proposition

💥 POWER WORDS ARSENAL:
- Leadership: Spearheaded, Orchestrated, Championed
- Results: Achieved, Delivered, Exceeded, Generated
- Improvement: Optimized, Streamlined, Enhanced, Transformed
- Innovation: Pioneered, Launched, Developed, Created

Ready to build a resume that gets you HIRED for {jobTitle}? Let's create your career-changing document! 💪🚀`,
      maxTokens: 400,
      temperature: 0.4,
      examples: [
        'Software developer resume',
        'Marketing manager resume',
        'Sales executive resume'
      ]
    };
  }

  private getJobDescriptionAI(): AIToolConfig {
    return {
      id: 'job-description-ai',
      name: 'Job Description AI',
      description: 'Write compelling job descriptions that attract top talent',
      category: 'business',
      icon: '👔',
      inputs: [
        {
          id: 'jobTitle',
          label: 'Job Title',
          type: 'text',
          placeholder: 'e.g., Senior Frontend Developer',
          required: true,
          maxLength: 100
        },
        {
          id: 'company',
          label: 'Company Description',
          type: 'textarea',
          placeholder: 'Brief company overview and culture',
          required: true,
          maxLength: 300
        },
        {
          id: 'requirements',
          label: 'Key Requirements',
          type: 'textarea',
          placeholder: 'Skills, experience, education needed',
          required: true,
          maxLength: 800
        },
        {
          id: 'benefits',
          label: 'Benefits & Perks',
          type: 'textarea',
          placeholder: 'Salary range, benefits, remote work, etc.',
          required: false,
          maxLength: 400
        }
      ],
      prompt: `👑 TALENT MAGNET PRO: Create an irresistible job posting for {jobTitle} that attracts TOP-TIER candidates and builds your dream team! 🎆

🏢 COMPANY INTEL:
{company}

🎯 ROLE REQUIREMENTS:
{requirements}

🎁 BENEFITS PACKAGE:
{benefits}

✨ TALENT ATTRACTION FORMULA:
🚀 Magnetic Job Title:
- Attention-grabbing title that stands out
- Senior/Lead/Principal positioning (if applicable)
- Location flexibility highlighted

🏢 Company Story (Why Join Us?):
- Mission that inspires passion
- Culture that top talent craves
- Growth opportunities and career path
- Team dynamics and collaboration style

🔥 Role Impact Statement:
- How this role changes everything
- Big projects and exciting challenges
- Autonomy and decision-making power
- Innovation opportunities

🏆 What You'll Conquer:
- Day-to-day responsibilities that excite
- High-impact projects and initiatives
- Cross-functional collaboration
- Leadership and mentoring opportunities

📈 Ideal Candidate Profile:
- Must-have skills and experience
- Nice-to-have superpowers
- Cultural fit indicators
- Growth mindset requirements

🎆 Why You'll Love It Here:
- Competitive compensation package
- Amazing benefits and perks
- Work-life balance and flexibility
- Professional development opportunities
- Recognition and advancement paths

🚀 Ready to Apply?
- Simple application process
- What to include in your application
- Timeline and next steps
- Contact information

🌈 Equal Opportunity Commitment:
- Inclusive workplace statement
- Diversity and belonging emphasis
- Accommodation availability

🎯 TALENT PSYCHOLOGY TRIGGERS:
- Exclusive opportunity language
- Challenge and growth emphasis
- Team and culture highlights
- Impact and meaning focus
- Career advancement promises

Ready to create a job posting that makes A-players say "I MUST work here!"? Let's build your talent magnet! 💪✨`,
      maxTokens: 800,
      temperature: 0.6,
      examples: [
        'Tech startup developer position',
        'Marketing role at agency',
        'Remote customer success job'
      ]
    };
  }

  // Creative & Design Tools (11-15)
  
  private getBusinessNameGenerator(): AIToolConfig {
    return {
      id: 'business-name-generator',
      name: 'Business Name Generator',
      description: 'Generate creative business names with domain availability',
      category: 'creative',
      icon: '🏢',
      inputs: [
        {
          id: 'industry',
          label: 'Industry/Business Type',
          type: 'text',
          placeholder: 'e.g., AI Software, Restaurant, Consulting',
          required: true,
          maxLength: 100
        },
        {
          id: 'keywords',
          label: 'Keywords to Include',
          type: 'text',
          placeholder: 'e.g., smart, pro, solutions, tech',
          required: false,
          maxLength: 200
        },
        {
          id: 'style',
          label: 'Name Style',
          type: 'select',
          placeholder: 'Select style',
          required: true,
          options: ['Professional', 'Creative/Fun', 'Tech/Modern', 'Classic/Traditional', 'Abstract/Unique']
        },
        {
          id: 'length',
          label: 'Name Length',
          type: 'select',
          placeholder: 'Select length',
          required: true,
          options: ['Short (1-2 words)', 'Medium (2-3 words)', 'Descriptive (3+ words)']
        }
      ],
      prompt: `💫 BRAND GENIUS MODE: Generate breakthrough business names for {industry} that become household brands! 🎆

🎯 NAMING BRIEF:
- Industry: {industry}
- Style: {style}
- Length: {length}
- Keywords: {keywords}

✨ BRAND NAMING FORMULA:
🚀 15 KILLER NAME OPTIONS:

🏏 NAMING PSYCHOLOGY:
📍 Memorable Factor:
- Easy to say, spell, and remember
- Sticky sound combinations
- Emotional connection triggers

🌍 Global Appeal:
- Cross-cultural pronunciation
- No negative translations
- International expansion ready

🔍 SEO & Digital Ready:
- Available .com domains
- Social media handle availability
- Search engine friendly

🎯 STYLE MASTERY:
💼 Professional: Sophisticated, trustworthy, corporate-ready
🎉 Creative/Fun: Playful, memorable, personality-driven
📱 Tech/Modern: Innovative, cutting-edge, future-focused
🏦 Classic/Traditional: Timeless, established, heritage-feel
🎆 Abstract/Unique: Distinctive, trademark-able, standout

FOR EACH NAME PROVIDE:
🏷️ Business Name (stylized)
💡 Creative Inspiration Story
🎯 Suggested Tagline
🌍 Domain Status (.com availability)
📈 Brand Expansion Potential
🎆 Memorability Score (1-10)

🔥 BONUS FEATURES:
- Logo concept suggestions
- Color palette recommendations
- Industry positioning strategy
- Competitor differentiation

Ready to create names that become the next BIG BRANDS in {industry}? Let's build naming legends! 💪🌟`,
      maxTokens: 400,
      temperature: 0.8,
      examples: [
        'Tech startup names',
        'Restaurant business names',
        'Consulting firm names'
      ]
    };
  }

  private getSloganCreatorAI(): AIToolConfig {
    return {
      id: 'slogan-creator-ai',
      name: 'Slogan Creator AI',
      description: 'Create catchy slogans and taglines that stick',
      category: 'creative',
      icon: '💭',
      inputs: [
        {
          id: 'business',
          label: 'Business/Product Name',
          type: 'text',
          placeholder: 'e.g., AI Meeting Pro',
          required: true,
          maxLength: 100
        },
        {
          id: 'industry',
          label: 'Industry',
          type: 'text',
          placeholder: 'e.g., Software, Food, Fashion',
          required: true,
          maxLength: 100
        },
        {
          id: 'audience',
          label: 'Target Audience',
          type: 'text',
          placeholder: 'e.g., Entrepreneurs, Students, Families',
          required: true,
          maxLength: 200
        },
        {
          id: 'tone',
          label: 'Brand Tone',
          type: 'select',
          placeholder: 'Select tone',
          required: true,
          options: ['Professional', 'Fun/Playful', 'Inspirational', 'Bold/Confident', 'Trustworthy']
        }
      ],
      prompt: `🎨 SLOGAN MASTER MODE: Create legendary taglines for {business} that stick in minds and hearts FOREVER! 💫

🏢 BRAND PROFILE:
- Business: {business}
- Industry: {industry}
- Target: {audience}
- Personality: {tone}

✨ SLOGAN CREATION FORMULA:
🎆 20 UNFORGETTABLE TAGLINES:

🚀 SLOGAN CATEGORIES:
💖 Emotional Connectors:
- Tug at heartstrings
- Create instant bond
- Inspire feelings and memories

📈 Benefit Boosters:
- Clear value proposition
- "What's in it for me?" answers
- Problem-solution focus

⚡ Action Activators:
- Command attention
- Inspire immediate action
- Energy and momentum

🎭 Word Play Wizards:
- Clever alliteration
- Memorable rhymes
- Linguistic creativity

🌟 Inspirational Icons:
- Motivational messaging
- Aspirational language
- Dream-building power

🎯 TONE MASTERY:
💼 Professional: Sophisticated, trustworthy, authoritative
🎉 Fun/Playful: Energetic, lighthearted, memorable
🎆 Inspirational: Uplifting, motivational, empowering
💪 Bold/Confident: Strong, assertive, leadership-focused
👍 Trustworthy: Reliable, dependable, secure

🗺️ MARKETING POWER FEATURES:
- Under 8 words for maximum impact
- Cross-platform compatibility
- Easy to remember and repeat
- Trademark-friendly phrasing
- Competitor differentiation
- {audience} resonance testing

FOR EACH SLOGAN:
🏷️ The Tagline
💡 Psychology Behind It
🎆 Best Use Cases
📈 Memorability Factor

Ready to create slogans that make {business} LEGENDARY in the {industry} space? Let's build tagline magic! 🚀✨`,
      maxTokens: 800,
      temperature: 0.8,
      examples: [
        'Tech product slogans',
        'Restaurant taglines',
        'Service business slogans'
      ]
    };
  }

  private getPresentationAI(): AIToolConfig {
    return {
      id: 'presentation-ai',
      name: 'Presentation AI',
      description: 'Create compelling presentation content and slide outlines',
      category: 'creative',
      icon: '📊',
      inputs: [
        {
          id: 'topic',
          label: 'Presentation Topic',
          type: 'text',
          placeholder: 'e.g., Q4 Sales Results, Product Launch',
          required: true,
          maxLength: 200
        },
        {
          id: 'audience',
          label: 'Audience',
          type: 'text',
          placeholder: 'e.g., Board members, Team, Clients',
          required: true,
          maxLength: 200
        },
        {
          id: 'duration',
          label: 'Presentation Length',
          type: 'select',
          placeholder: 'Select duration',
          required: true,
          options: ['5-10 minutes', '15-20 minutes', '30-45 minutes', '1 hour+']
        },
        {
          id: 'goal',
          label: 'Presentation Goal',
          type: 'select',
          placeholder: 'Select goal',
          required: true,
          options: ['Inform/Educate', 'Persuade/Sell', 'Present Results', 'Propose Solution', 'Train/Teach']
        }
      ],
      prompt: `🎆 PRESENTATION POWERHOUSE: Create a show-stopping presentation about {topic} that captivates {audience} and achieves amazing results! 🚀

🎯 PRESENTATION MISSION:
- Topic: {topic}
- Audience: {audience}
- Duration: {duration}
- Goal: {goal}

✨ SLIDE MASTERY BLUEPRINT:
🔥 OPENING IMPACT (First 2 minutes):
- Attention-grabbing hook that stops scrolling
- Surprising statistic or bold statement
- Personal story or relatable scenario
- Clear promise of value they'll receive

🗺️ AGENDA ROADMAP:
- "Here's what we'll cover" preview
- Time estimates for each section
- Interactive elements planned
- Q&A timing expectations

📈 CONTENT ARCHITECTURE:
🎆 Main Points (70-80% of time):
- 3-5 key messages maximum
- Supporting data and proof points
- Real-world examples and case studies
- Visual storytelling opportunities
- Audience engagement moments

🎨 VISUAL STORYTELLING:
- Slide design recommendations
- Infographic opportunities
- Chart and graph suggestions
- Image and video placements
- Interactive elements

🔄 SMOOTH TRANSITIONS:
- Bridge statements between sections
- Momentum-building connectors
- Recap and preview techniques
- Energy management strategies

🌟 POWERFUL CLOSING:
- Key takeaways summary
- Memorable final thought
- Clear call-to-action
- Next steps roadmap
- Contact information

🔍 Q&A PREPARATION:
- Anticipated questions and answers
- Difficult question handling
- Additional supporting materials
- Follow-up resources

🎯 AUDIENCE PSYCHOLOGY:
💼 For Executives: ROI-focused, concise, strategic
👥 For Teams: Collaborative, practical, actionable
📊 For Clients: Value-driven, results-oriented, trustworthy
🎓 For Students: Educational, engaging, interactive

⏱️ TIME OPTIMIZATION FOR {duration}:
- Opening impact timing
- Content pacing strategies
- Interaction break points
- Buffer time management

Ready to create a presentation that makes {audience} say "WOW!" and achieves your {goal}? Let's build presentation magic! 💪✨`,
      maxTokens: 500,
      temperature: 0.6,
      examples: [
        'Sales pitch presentation',
        'Product demo slides',
        'Training workshop content'
      ]
    };
  }

  private getScriptWriterAI(): AIToolConfig {
    return {
      id: 'script-writer-ai',
      name: 'Script Writer AI',
      description: 'Write video scripts, ads, and marketing content',
      category: 'creative',
      icon: '🎬',
      inputs: [
        {
          id: 'scriptType',
          label: 'Script Type',
          type: 'select',
          placeholder: 'Select type',
          required: true,
          options: ['YouTube Video', 'Product Demo', 'Advertisement', 'Explainer Video', 'Social Media Video']
        },
        {
          id: 'topic',
          label: 'Video Topic/Product',
          type: 'text',
          placeholder: 'e.g., How to use our AI tool',
          required: true,
          maxLength: 200
        },
        {
          id: 'length',
          label: 'Video Length',
          type: 'select',
          placeholder: 'Select length',
          required: true,
          options: ['30 seconds', '1-2 minutes', '3-5 minutes', '5-10 minutes', '10+ minutes']
        },
        {
          id: 'audience',
          label: 'Target Audience',
          type: 'text',
          placeholder: 'e.g., Small business owners, Tech enthusiasts',
          required: true,
          maxLength: 200
        }
      ],
      prompt: `🎬 SCRIPT GENIUS MODE: Write a viral-worthy {scriptType} script about {topic} that hooks viewers and drives massive results! 🚀

🎯 VIDEO MISSION:
- Script Type: {scriptType}
- Topic: {topic}
- Target: {audience}
- Duration: {length}

✨ VIRAL VIDEO FORMULA:
🔥 HOOK MASTERY (0-5 seconds):
[VISUAL: Eye-catching opening scene]
"Did you know that..." or "What if I told you..."
- Pattern interrupt that stops the scroll
- Bold promise or shocking revelation
- Visual intrigue that demands attention

🎆 STORY ARC STRUCTURE:
📍 Problem Introduction (5-15% of time):
[VISUAL: Relatable scenario]
- Paint the pain point vividly
- Make audience nod "Yes, that's me!"
- Create emotional connection

💡 Solution Reveal (60-70% of time):
[VISUAL: Transformation sequence]
- Step-by-step breakdown
- Benefits and features showcase
- Social proof and testimonials
- Behind-the-scenes authenticity

🌟 Transformation (15-25% of time):
[VISUAL: Before vs. After]
- Results demonstration
- Success stories integration
- Future vision painting

🎬 PLATFORM OPTIMIZATION:
📺 YouTube: Educational focus, longer-form storytelling
📱 Social Media: Quick hooks, visual impact, trending audio
💼 Product Demo: Feature highlights, user experience journey
📺 Advertisement: Problem-solution-action formula
📈 Explainer: Complex to simple, visual metaphors

🎨 VISUAL STORYTELLING:
[CAMERA ANGLES]: Close-ups for emotion, wide shots for context
[GRAPHICS]: Text overlays, animations, infographics
[MUSIC]: Energy level matching content mood
[LIGHTING]: Professional setup suggestions
[PROPS]: Supporting visual elements

🔊 ENGAGEMENT TRIGGERS:
- Questions that make viewers comment
- Cliffhangers that build suspense
- Interactive elements (polls, choices)
- Personality moments that build connection

📈 CONVERSION CLIMAX:
[VISUAL: Clear CTA screen]
- Compelling reason to act NOW
- Multiple contact options
- Risk reversal and guarantees
- Urgency and scarcity elements

⏱️ TIMING OPTIMIZATION:
{length} Structure:
- Hook: First 5 seconds
- Setup: Next 10-15%
- Main content: 60-75%
- Close: Final 10-15%

🎯 AUDIENCE PSYCHOLOGY:
- {audience} language and references
- Pain points that resonate
- Dreams and aspirations
- Communication style preferences

Ready to create a script that goes VIRAL and converts like crazy? Let's make video magic happen! 💪🎆`,
      maxTokens: 400,
      temperature: 0.7,
      examples: [
        'Product explainer video',
        'YouTube tutorial script',
        'Social media ad script'
      ]
    };
  }

  private getNewsletterAI(): AIToolConfig {
    return {
      id: 'newsletter-ai',
      name: 'Newsletter AI',
      description: 'Create engaging newsletters that subscribers love',
      category: 'creative',
      icon: '📰',
      inputs: [
        {
          id: 'topic',
          label: 'Newsletter Topic/Theme',
          type: 'text',
          placeholder: 'e.g., Weekly business tips, Product updates',
          required: true,
          maxLength: 200
        },
        {
          id: 'audience',
          label: 'Subscriber Audience',
          type: 'text',
          placeholder: 'e.g., Entrepreneurs, Marketers, Tech professionals',
          required: true,
          maxLength: 200
        },
        {
          id: 'sections',
          label: 'Content Sections',
          type: 'textarea',
          placeholder: 'e.g., Industry news, Tips, Featured product, Community spotlight',
          required: true,
          maxLength: 500
        },
        {
          id: 'frequency',
          label: 'Newsletter Frequency',
          type: 'select',
          placeholder: 'Select frequency',
          required: true,
          options: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly']
        }
      ],
      prompt: `📨 NEWSLETTER NINJA MODE: Create an addictive {frequency} newsletter about {topic} that {audience} can't wait to open! 🚀

🎯 NEWSLETTER MISSION:
- Topic: {topic}
- Audience: {audience}
- Frequency: {frequency}
- Sections: {sections}

✨ INBOX DOMINATION FORMULA:
📧 SUBJECT LINE MAGIC:
- Curiosity-driven headlines
- Emoji enhancement (but not overwhelming)
- Urgency and exclusivity hints
- Personal touch elements
- A/B test variations

👋 WARM WELCOME:
"Hey [First Name]! 😊"
- Personal, conversational greeting
- Brief update on your world
- Tease what's inside this issue
- Build anticipation and excitement

📈 CONTENT ARCHITECTURE:

FOR EACH SECTION IN {sections}:
🏷️ Eye-catching section headers
💡 Value-packed insights and tips
📀 Scannable bullet points and lists
📸 Visual elements suggestions
🔗 Strategic link placements
📣 Mini calls-to-action throughout

🎆 ENGAGEMENT BOOSTERS:
🗣️ Conversation starters ("Hit reply and tell me...")
🎯 Interactive elements (polls, questions)
📅 Behind-the-scenes personal stories
🏆 Subscriber spotlights and wins
🎁 Exclusive offers and early access

📱 SOCIAL AMPLIFICATION:
"Love this newsletter? Share it! 🚀"
- One-click sharing buttons
- Social-worthy quotes and highlights
- Refer-a-friend incentives
- User-generated content features

📈 CONVERSION ELEMENTS:
🚀 Primary CTA (main newsletter goal)
🔗 Secondary CTAs (related offers)
📞 Contact and support links
👥 Community joining invitations

🌟 COMMUNITY BUILDERS:
- "Reader of the Week" features
- Exclusive insider information
- Member-only benefits highlights
- Feedback loops and surveys

📱 MOBILE OPTIMIZATION:
- Short paragraphs (2-3 sentences max)
- Thumb-friendly button sizes
- Fast-loading images
- Skimmable format

🔍 FOOTER FINISHER:
"Until next {frequency},
[Your signature] 😊

P.S. [Compelling post-script]"

- Unsubscribe (legally required)
- Contact information
- Social media links
- Company address

🎯 PSYCHOLOGY TRIGGERS:
- FOMO (exclusive content)
- Social proof (subscriber counts)
- Reciprocity (free value first)
- Authority (expert insights)
- Community (belonging feeling)

Ready to create newsletters that make {audience} say "This is exactly what I needed!"? Let's build newsletter magic! 💪✨`,
      maxTokens: 500,
      temperature: 0.7,
      examples: [
        'Business weekly newsletter',
        'Product update newsletter',
        'Industry news digest'
      ]
    };
  }

  // Communication Tools (16-20)
  
  private getTranslationAI(): AIToolConfig {
    return {
      id: 'translation-ai',
      name: 'Translation AI',
      description: 'Translate content while preserving context and tone',
      category: 'communication',
      icon: '🌍',
      inputs: [
        {
          id: 'text',
          label: 'Text to Translate',
          type: 'textarea',
          placeholder: 'Enter text you want to translate',
          required: true,
          maxLength: 2000
        },
        {
          id: 'fromLanguage',
          label: 'From Language',
          type: 'select',
          placeholder: 'Select source language',
          required: true,
          options: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Arabic', 'Chinese', 'Japanese', 'Auto-detect']
        },
        {
          id: 'toLanguage',
          label: 'To Language',
          type: 'select',
          placeholder: 'Select target language',
          required: true,
          options: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Arabic', 'Chinese', 'Japanese', 'Somali']
        },
        {
          id: 'context',
          label: 'Context/Purpose',
          type: 'select',
          placeholder: 'Select context',
          required: true,
          options: ['Business/Professional', 'Marketing/Sales', 'Technical/Documentation', 'Casual/Conversational', 'Legal/Formal']
        }
      ],
      prompt: `🌍 TRANSLATION MASTER: Transform text from {fromLanguage} to {toLanguage} with cultural precision and contextual perfection! ✨

📝 TRANSLATION BRIEF:
- Source: {fromLanguage}
- Target: {toLanguage}
- Context: {context}
- Original Text: {text}

🎯 TRANSLATION EXCELLENCE FORMULA:
🔄 PRIMARY TRANSLATION:
[Perfect {toLanguage} version that flows naturally]

🎆 CULTURAL ADAPTATION:
- Idiomatic expressions localized
- Cultural references adjusted
- Regional variations considered
- Social context awareness

🎨 CONTEXT MASTERY:
💼 Business/Professional:
- Formal register maintained
- Industry terminology precision
- Professional courtesy elements

📈 Marketing/Sales:
- Persuasive language adapted
- Emotional triggers localized
- Call-to-action culturally optimized

📚 Technical/Documentation:
- Precise terminology used
- Step-by-step clarity maintained
- Technical accuracy verified

👥 Casual/Conversational:
- Natural speech patterns
- Colloquial expressions appropriate
- Friendly, approachable tone

⚖️ Legal/Formal:
- Highest formality level
- Legal terminology precision
- Ceremonial language respected

📚 LINGUISTIC QUALITY FEATURES:
- Grammar and syntax perfection
- Natural word order and flow
- Appropriate punctuation adaptation
- Formatting preservation
- Readability optimization

🌍 CULTURAL INTELLIGENCE:
- Sensitivity to cultural norms
- Appropriate honorifics and titles
- Gender and social considerations
- Religious and cultural respect

🔄 ALTERNATIVE OPTIONS:
[Secondary translation if style differs]
[Regional variation if applicable]

📝 TRANSLATOR NOTES:
- Tone level: [Formal/Informal/Neutral as maintained]
- Cultural adaptations made: [If any]
- Terminology choices: [Key decisions explained]
- Suggested improvements: [If applicable]

🎆 QUALITY ASSURANCE:
- Meaning preservation: 100%
- Cultural appropriateness: Verified
- Target audience suitability: Confirmed
- Professional standard: Exceeded

Delivering translations that sound like they were written by native speakers! 💪🌍`,
      maxTokens: 800,
      temperature: 0.3,
      examples: [
        'Business document translation',
        'Marketing content localization',
        'Website content translation'
      ]
    };
  }

  private getChatbotBuilderAI(): AIToolConfig {
    return {
      id: 'live-chatbot-creator',
      name: 'Live Chatbot Creator',
      description: 'Create professional live chatbots for your website (customers provide their own OpenAI API key)',
      category: 'communication',
      icon: '💬',
      inputs: [
        {
          id: 'businessName',
          label: 'Business Name',
          type: 'text',
          placeholder: 'e.g., Mario\'s Pizza, TechStart Solutions',
          required: true,
          maxLength: 100
        },
        {
          id: 'businessType',
          label: 'Business Type/Industry',
          type: 'select',
          placeholder: 'Select your industry',
          required: true,
          options: ['Restaurant/Food Service', 'E-commerce/Retail', 'Professional Services', 'Healthcare/Medical', 'Real Estate', 'Technology/Software', 'Education/Training', 'Fitness/Wellness', 'Legal Services', 'Financial Services', 'Other']
        },
        {
          id: 'services',
          label: 'Main Products/Services',
          type: 'textarea',
          placeholder: 'List your main products, services, or offerings',
          required: true,
          maxLength: 500
        },
        {
          id: 'businessInfo',
          label: 'Key Business Information',
          type: 'textarea',
          placeholder: 'Hours, location, contact info, pricing, policies, etc.',
          required: true,
          maxLength: 800
        },
        {
          id: 'commonQuestions',
          label: 'Common Customer Questions',
          type: 'textarea',
          placeholder: 'What do customers usually ask? (pricing, hours, availability, etc.)',
          required: true,
          maxLength: 600
        },
        {
          id: 'chatbotTone',
          label: 'Chatbot Personality',
          type: 'select',
          placeholder: 'How should your chatbot sound?',
          required: true,
          options: ['Professional & Helpful', 'Friendly & Casual', 'Enthusiastic & Energetic', 'Calm & Supportive', 'Expert & Authoritative']
        },
        {
          id: 'websiteUrl',
          label: 'Website URL (Optional)',
          type: 'text',
          placeholder: 'https://yourwebsite.com',
          required: false,
          maxLength: 200
        }
      ],
      prompt: `Create a complete LIVE CHATBOT system for {businessName}, a {businessType} business.

Business Details:
- Services/Products: {services}
- Business Information: {businessInfo}
- Common Questions: {commonQuestions}
- Desired Tone: {chatbotTone}
- Website: {websiteUrl}

Generate a comprehensive live chatbot package including:

1. **CHATBOT CONFIGURATION:**
   - System prompt for the AI assistant
   - Personality and tone guidelines
   - Business knowledge base
   - Response templates for common scenarios

2. **EMBED CODE:**
   - Complete HTML/JavaScript code to add to website
   - Responsive chat widget design
   - Mobile-friendly interface
   - Customizable colors and branding

3. **BUSINESS KNOWLEDGE BASE:**
   - Structured information about services: {services}
   - Key business details: {businessInfo}
   - FAQ responses for: {commonQuestions}
   - Escalation procedures for complex queries

4. **CONVERSATION FLOWS:**
   - Welcome message and introduction
   - Service/product inquiries handling
   - Appointment/contact capture flows
   - Lead qualification questions
   - Handoff to human support procedures

5. **SETUP INSTRUCTIONS:**
   - How to get OpenAI API key (step-by-step)
   - How to add the chatbot to their website
   - How to customize colors and styling
   - How to monitor conversations and performance

6. **ADMIN DASHBOARD CONCEPT:**
   - Overview of conversation analytics
   - Common questions tracking
   - Customer contact collection
   - Performance optimization tips

Make the chatbot {chatbotTone} and specifically knowledgeable about {businessType} industry best practices. Include ready-to-use code that creates a professional live chat experience.

IMPORTANT: The chatbot should be configured to use the customer's own OpenAI API key for cost control and transparency.`,
      maxTokens: 600,
      temperature: 0.4,
      examples: [
        'Restaurant live chatbot with ordering',
        'E-commerce support chatbot',
        'Professional services lead capture bot'
      ]
    };
  }

  private getMeetingSummarizerAI(): AIToolConfig {
    return {
      id: 'meeting-summarizer-ai',
      name: 'Meeting Summarizer AI',
      description: 'Summarize meeting notes and extract action items',
      category: 'communication',
      icon: '📝',
      inputs: [
        {
          id: 'meetingNotes',
          label: 'Meeting Notes/Transcript',
          type: 'textarea',
          placeholder: 'Paste meeting notes or transcript here',
          required: true,
          maxLength: 3000
        },
        {
          id: 'meetingType',
          label: 'Meeting Type',
          type: 'select',
          placeholder: 'Select type',
          required: true,
          options: ['Team Meeting', 'Client Call', 'Project Review', 'Sales Call', 'Board Meeting']
        },
        {
          id: 'participants',
          label: 'Key Participants',
          type: 'text',
          placeholder: 'e.g., John (CEO), Sarah (Marketing), Mike (Dev)',
          required: false,
          maxLength: 300
        },
        {
          id: 'focus',
          label: 'Summary Focus',
          type: 'select',
          placeholder: 'Select focus',
          required: true,
          options: ['Action Items', 'Decisions Made', 'Key Discussion Points', 'Next Steps', 'Comprehensive']
        }
      ],
      prompt: `📝 MEETING MASTER MODE: Transform chaotic meeting notes into crystal-clear action plans that drive results! 🎆

📅 MEETING INTEL:
- Type: {meetingType}
- Focus: {focus}
- Participants: {participants}
- Raw Notes: {meetingNotes}

✨ EXECUTIVE SUMMARY MAGIC:
🎯 THE 30-SECOND OVERVIEW:
[2-3 powerful sentences that capture everything]
"In today's {meetingType}, we achieved [key outcome] and decided to [major decision] with [next milestone] by [date]."

📈 STRATEGIC BREAKDOWN:

🔥 KEY DISCUSSION HIGHLIGHTS:
- 💡 Major topics covered
- 👥 Who said what (key contributors)
- 📈 Data points and insights shared
- 📀 Decisions reached with rationale

✅ DECISION TRACKER:
- 🎯 What was decided
- 👥 Who made the call
- 📅 When it takes effect
- 📢 Who needs to be informed

🚀 ACTION ITEMS COMMAND CENTER:

FOR EACH ACTION ITEM:
✅ Task: [Clear, specific description]
👥 Owner: [Responsible person]
📅 Deadline: [Specific date/time]
🎯 Priority: [High/Medium/Low]
📈 Success Metric: [How we'll know it's done]

🔍 UNRESOLVED ITEMS:
- ❓ Open questions that need answers
- 🚧 Roadblocks identified
- 📅 Follow-up research required
- 👥 People to consult

📅 WHAT'S NEXT?
- 📅 Next meeting date/time
- 🎯 Agenda preview for next session
- 📧 Follow-up communications needed
- 📈 Progress check-in schedule

🎯 FOCUS AREA DEEP DIVE:

{focus} SPOTLIGHT:
- 🔍 Detailed analysis of focus area
- 📈 Specific insights and breakthroughs
- 🚀 Action items related to focus
- 🎯 Success metrics for this area

📱 MOBILE-FRIENDLY FORMAT:
- Short, scannable bullet points
- Clear section headers
- Action-oriented language
- Easy to reference later

🚀 PRODUCTIVITY BOOSTERS:
- One-page summary for quick reference
- Separate detailed action list
- Calendar-ready meeting requests
- Follow-up email templates

🎆 MEETING ROI TRACKER:
- Time invested: [Meeting duration]
- Decisions made: [Count and impact]
- Actions generated: [Count and priority]
- Value created: [Outcomes and benefits]

Transforming meeting chaos into organized action! Ready to make every meeting count? 💪✨`,
      maxTokens: 400,
      temperature: 0.4,
      examples: [
        'Weekly team sync summary',
        'Client project review',
        'Sales call recap'
      ]
    };
  }

  private getReviewResponseAI(): AIToolConfig {
    return {
      id: 'review-response-ai',
      name: 'Review Response AI',
      description: 'Generate professional responses to customer reviews',
      category: 'communication',
      icon: '⭐',
      inputs: [
        {
          id: 'review',
          label: 'Customer Review',
          type: 'textarea',
          placeholder: 'Paste the customer review here',
          required: true,
          maxLength: 1000
        },
        {
          id: 'rating',
          label: 'Review Rating',
          type: 'select',
          placeholder: 'Select rating',
          required: true,
          options: ['5 stars (Positive)', '4 stars (Positive)', '3 stars (Neutral)', '2 stars (Negative)', '1 star (Negative)']
        },
        {
          id: 'business',
          label: 'Business Name',
          type: 'text',
          placeholder: 'Your business name',
          required: true,
          maxLength: 100
        },
        {
          id: 'responseStyle',
          label: 'Response Style',
          type: 'select',
          placeholder: 'Select style',
          required: true,
          options: ['Professional/Formal', 'Friendly/Personal', 'Apologetic/Understanding', 'Grateful/Appreciative']
        }
      ],
      prompt: `⭐ REVIEW RESPONSE PRO: Craft the perfect response to this {rating} review for {business} that turns feedback into brand gold! 🎆

📝 REVIEW DETAILS:
- Business: {business}
- Rating: {rating}
- Customer Review: {review}
- Response Style: {responseStyle}

✨ RESPONSE MASTERY FORMULA:

💖 FOR POSITIVE REVIEWS (4-5 stars):
🎉 GRATITUDE EXPLOSION:
"[Customer Name], WOW! 😊 Thank you so much for this amazing review!"

🎆 SPECIFIC APPRECIATION:
- Quote their exact compliments
- Acknowledge team members mentioned
- Celebrate shared success moments

🚀 FUTURE INVITATION:
"We can't wait to serve you again and create more amazing experiences!"

🔥 FOR NEGATIVE REVIEWS (1-3 stars):
🙏 SINCERE ACKNOWLEDGMENT:
"[Customer Name], thank you for taking the time to share your experience."

💔 EMPATHY & OWNERSHIP:
"We're truly sorry to hear that we didn't meet your expectations."

🛠️ SOLUTION FOCUS:
"Here's what we're doing to make this right..."

📞 OFFLINE INVITATION:
"Please reach out to us directly at [contact] so we can resolve this personally."

🎯 STYLE ADAPTATION:

💼 Professional/Formal:
- Sophisticated language
- Respectful tone throughout
- Business-appropriate messaging

👥 Friendly/Personal:
- Warm, conversational approach
- Personal touches and emojis
- Human connection emphasis

🙏 Apologetic/Understanding:
- Deep empathy demonstration
- Responsibility acceptance
- Genuine concern expression

😍 Grateful/Appreciative:
- Enthusiastic thankfulness
- Positive energy radiating
- Customer value celebration

📈 BRAND BUILDING ELEMENTS:
- Company values demonstration
- Team dedication showcase
- Quality commitment reinforcement
- Community connection building

🚀 CONVERSION OPPORTUNITIES:
- Subtle service mentions (for positive reviews)
- Special offer invitations (if appropriate)
- Referral encouragement
- Social media follow invitations

🎆 PROFESSIONAL POLISH:
- Error-free grammar and spelling
- Consistent brand voice
- Appropriate length (not too long/short)
- Mobile-friendly formatting

📝 RESPONSE TEMPLATE:
"Hi [Customer Name] 😊,

[Personalized opening based on rating]

[Specific acknowledgment of their points]

[Action items or appreciation]

[Future-focused closing]

Best regards,
[Your Name]
[Title] at {business}"

🎯 PSYCHOLOGICAL IMPACT:
- Show other potential customers you care
- Demonstrate responsive customer service
- Build trust through transparency
- Create positive brand impression

Ready to turn every review into a reputation booster? Let's build customer love! 💪❤️`,
      maxTokens: 400,
      temperature: 0.6,
      examples: [
        'Positive restaurant review response',
        'Negative service review response',
        'Product review acknowledgment'
      ]
    };
  }

  private getCustomerServiceAI(): AIToolConfig {
    return {
      id: 'customer-service-ai',
      name: 'Customer Service AI',
      description: 'Create professional customer service responses and solutions',
      category: 'communication',
      icon: '🎧',
      inputs: [
        {
          id: 'inquiry',
          label: 'Customer Inquiry/Issue',
          type: 'textarea',
          placeholder: 'Describe the customer\'s question or problem',
          required: true,
          maxLength: 1000
        },
        {
          id: 'urgency',
          label: 'Issue Urgency',
          type: 'select',
          placeholder: 'Select urgency',
          required: true,
          options: ['Low (General Question)', 'Medium (Service Issue)', 'High (Billing Problem)', 'Critical (System Down)']
        },
        {
          id: 'customerType',
          label: 'Customer Type',
          type: 'select',
          placeholder: 'Select type',
          required: true,
          options: ['New Customer', 'Existing Customer', 'Premium Customer', 'Upset Customer', 'VIP Customer']
        },
        {
          id: 'responseType',
          label: 'Response Type',
          type: 'select',
          placeholder: 'Select type',
          required: true,
          options: ['Email Response', 'Chat Message', 'Phone Script', 'Help Article', 'Escalation Note']
        }
      ],
      prompt: `🎆 CUSTOMER SERVICE CHAMPION: Create exceptional {responseType} for {customerType} that turns problems into loyalty! 🚀

📧 SERVICE REQUEST:
- Customer Type: {customerType}
- Inquiry: {inquiry}
- Urgency: {urgency}
- Response Format: {responseType}

✨ SERVICE EXCELLENCE FORMULA:

👋 WARM ACKNOWLEDGMENT:
"Hi [Customer Name]! 😊 Thank you for reaching out to us."

💖 EMPATHY CONNECTION:
"I completely understand your [concern/frustration/question] about [specific issue]."

🎯 CUSTOMER TYPE MASTERY:

💆 New Customer:
- Extra welcoming tone
- Company introduction elements
- Onboarding support offers
- "Welcome to the family!" energy

퉣 Existing Customer:
- Relationship acknowledgment
- Account history awareness
- Loyalty appreciation
- Personalized service approach

👑 Premium Customer:
- VIP treatment language
- Priority handling indicators
- Exclusive benefits mentions
- Concierge-level service

🤯 Upset Customer:
- Extra empathy and patience
- Immediate ownership of issue
- Multiple solution options
- Follow-up commitment

🎆 VIP Customer:
- Executive-level attention
- Premium service indicators
- Direct contact information
- Special handling promises

🚑 URGENCY RESPONSE CALIBRATION:

🟢 Low (General Question):
- Friendly, informative approach
- Educational content included
- Resource sharing
- "Happy to help!" tone

🟡 Medium (Service Issue):
- Prompt response indicators
- Clear solution timeline
- Status update promises
- Proactive communication

🔴 High (Billing Problem):
- Immediate action language
- Same-day resolution commitment
- Direct contact offers
- Escalation path provided

⚠️ Critical (System Down):
- Emergency response protocol
- Real-time update promises
- Multiple contact channels
- Executive involvement indication

🛠️ SOLUTION ARCHITECTURE:
🎯 Immediate Actions:
"Here's what I'm doing right now to help..."

📅 Timeline Clarity:
"You can expect [resolution] by [specific time]."

📞 Next Steps:
"I'll follow up with you on [date] to ensure everything is perfect."

🎆 RESPONSE FORMAT OPTIMIZATION:

📧 Email Response:
- Professional subject line
- Structured, scannable format
- Action items clearly marked
- Contact information included

💬 Chat Message:
- Quick, conversational tone
- Immediate help indicators
- Emoji-enhanced friendliness
- Fast resolution focus

📞 Phone Script:
- Verbal emphasis markers
- Pause points indicated
- Empathy moments highlighted
- Call wrap-up protocol

📚 Help Article:
- Step-by-step clarity
- Visual cue suggestions
- Related resource links
- Contact option included

📈 Escalation Note:
- Issue summary for leadership
- Customer importance indicators
- Recommended action plan
- Urgency level justification

🚀 LOYALTY BUILDING ELEMENTS:
- Surprise and delight opportunities
- Additional value offers
- Personal appreciation notes
- Future prevention tips

🎆 PROFESSIONAL POLISH:
"Is there anything else I can help you with today? We're always here for you! 😊

Best regards,
[Your Name]
[Title] - Customer Success Team"

Ready to turn every customer interaction into a loyalty-building moment? Let's create service magic! 💪✨`,
      maxTokens: 600,
      temperature: 0.5,
      examples: [
        'Billing inquiry response',
        'Technical support email',
        'Refund request handling'
      ]
    };
  }
}

export default AIToolsEngine;
export type { AIToolConfig, InputField, AIToolResult };