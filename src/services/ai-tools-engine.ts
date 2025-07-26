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
   * Generate content using DeepSeek V3 (95% cheaper than GPT-4!)
   */
  private async generateContent(prompt: string, config: AIToolConfig): Promise<string> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-v3',
        messages: [
          {
            role: 'system',
            content: `You are a professional ${config.name} specialist. Create high-quality, professional content that delivers real business value. Always maintain excellent quality and creativity.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`AI generation failed: ${error.error?.message || 'Unknown error'}`);
    }

    const result = await response.json();
    return result.choices[0].message.content;
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
      // Content Creation Tools
      this.getBlogPostGenerator(),
      this.getSocialMediaAI(),
      this.getAdCopyCreator(),
      this.getEmailMarketingAI(),
      this.getProductDescriptionAI(),
      
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

  // Tool Configurations (First 5 MVP Tools)
  
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
      prompt: `Write a comprehensive, SEO-optimized blog post about "{topic}".

Requirements:
- Target keywords: {keywords}
- Tone: {tone}
- Length: {length}
- Include compelling headline
- Add subheadings (H2, H3)
- Include introduction, body sections, and conclusion
- Make it engaging and valuable for readers
- Optimize for search engines
- Include call-to-action at the end

Create a professional blog post that ranks well and converts readers.`,
      maxTokens: 2000,
      temperature: 0.7,
      examples: [
        'How to Build a Million-Dollar Business in 2024',
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
      prompt: `Create a high-engagement social media post for {platform}.

Post Details:
- Topic: {topic}
- Goal: {goal}
- Target Audience: {audience}

Requirements:
- Platform-optimized format and length
- Compelling hook in first line
- Include relevant hashtags (5-10 for Instagram, 2-3 for LinkedIn)
- Add call-to-action
- Make it shareable and engaging
- Include emojis where appropriate
- Optimize for {goal}

Create content that gets maximum engagement and achieves the specified goal.`,
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
      prompt: `Create high-converting ad copy for {platform}.

Product/Service: {product}
Target Audience: {audience}
Campaign Objective: {objective}
Special Offer: {offer}

Requirements:
- Attention-grabbing headline
- Compelling ad copy that addresses pain points
- Clear value proposition
- Strong call-to-action
- Platform-optimized format
- Include emotional triggers
- Focus on benefits over features
- Create urgency if applicable
- Optimize for {objective}

Generate ad copy that drives maximum conversions and ROI.`,
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
      prompt: `Create a professional email for {type}.

Details:
- Product/Service: {product}
- Audience: {audience}
- Goal: {goal}

Requirements:
- Compelling subject line
- Personalized greeting
- Clear value proposition
- Engaging content that serves the goal
- Strong call-to-action
- Professional tone
- Mobile-optimized format
- Include urgency or scarcity if appropriate
- Build trust and credibility

Generate an email that achieves maximum open rates, engagement, and conversions.`,
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
      prompt: `Write a compelling product description for "{product}".

Product Details:
- Key Features: {features}
- Target Customer: {audience}
- Style: {style}

Requirements:
- Attention-grabbing opening
- Highlight key benefits (not just features)
- Address customer pain points
- Use persuasive language
- Include social proof elements
- Create desire and urgency
- End with strong call-to-action
- Optimize for conversions
- Match the {style} tone
- Focus on how the product improves customer's life

Generate a description that turns browsers into buyers.`,
      maxTokens: 600,
      temperature: 0.7,
      examples: [
        'Tech gadget for professionals',
        'Fashion item for young adults',
        'Health supplement for fitness enthusiasts'
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
      prompt: `Create a professional invoice for {clientName}.

Business Information: {businessInfo}
Services/Products: {services}
Payment Terms: {paymentTerms}

Generate a complete invoice including:
- Invoice number and date
- Professional header with business info
- Itemized list of services/products
- Subtotal, taxes (if applicable), and total
- Payment terms and methods
- Professional footer with thank you message
- Due date calculation

Make it formal, clear, and ready to send to client.`,
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
      prompt: `Create a professional {contractType} between the following parties:

Parties: {parties}
Duration: {duration}
Key Terms: {terms}

Generate a comprehensive contract including:
- Title and contract identification
- Party definitions and details
- Scope of work/services
- Payment terms and schedule
- Timeline and deliverables
- Termination clauses
- Liability and warranty provisions
- Dispute resolution process
- Signatures section

Make it legally sound and professionally formatted.`,
      maxTokens: 1500,
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
      prompt: `Write a compelling {proposalType} for {client}.

Solution/Service: {solution}
Budget: {budget}

Create a persuasive proposal including:
- Executive summary
- Problem identification
- Proposed solution with benefits
- Timeline and methodology
- Team/company qualifications
- Budget breakdown (if budget provided)
- Success metrics and deliverables
- Next steps and call-to-action
- Professional conclusion

Make it compelling, client-focused, and results-oriented.`,
      maxTokens: 1200,
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
      prompt: `Create an ATS-optimized resume for {jobTitle} position.

Work Experience: {experience}
Skills: {skills}
Education: {education}

Generate a professional resume with:
- Strong professional summary
- Optimized work experience with quantified achievements
- Skills section with relevant keywords
- Education and certifications
- Clean, ATS-friendly formatting
- Action verbs and impact metrics
- Industry-specific keywords for {jobTitle}

Make it compelling and likely to pass ATS screening.`,
      maxTokens: 1000,
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
      prompt: `Write an attractive job description for {jobTitle} position.

Company: {company}
Requirements: {requirements}
Benefits: {benefits}

Create a compelling job posting including:
- Engaging job title and summary
- Company overview that sells the culture
- Clear role responsibilities
- Required qualifications and preferred skills
- Competitive benefits and compensation
- Application instructions
- Equal opportunity statement
- Keywords to attract right candidates

Make it appealing to top talent while being clear about expectations.`,
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
      prompt: `Generate creative business names for a {industry} business.

Style: {style}
Length: {length}
Keywords: {keywords}

Create 15 unique business names that are:
- Memorable and brandable
- Easy to pronounce and spell
- {style} in tone
- Suitable for {industry}
- Available for domain registration (.com)
- Legally protectable as trademarks

For each name, provide:
- The business name
- Brief explanation of meaning/inspiration
- Suggested tagline
- Domain availability check (.com)

Make them creative, professional, and market-ready.`,
      maxTokens: 1000,
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
      prompt: `Create memorable slogans for {business} in the {industry} industry.

Target Audience: {audience}
Brand Tone: {tone}

Generate 20 catchy slogans that:
- Capture the brand essence
- Appeal to {audience}
- Reflect {tone} personality
- Are memorable and quotable
- Work across marketing materials
- Differentiate from competitors
- Are short and punchy (under 8 words)

Include variety:
- Emotional appeals
- Benefit-focused
- Action-oriented
- Play on words/alliteration
- Inspirational/motivational

Make them brandable and marketing-ready.`,
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
      prompt: `Create a compelling presentation about {topic} for {audience}.

Duration: {duration}
Goal: {goal}

Generate comprehensive presentation content including:
- Powerful opening hook
- Clear agenda/outline
- Key talking points for each section
- Supporting data and examples
- Visual slide suggestions
- Engaging transitions
- Strong conclusion with call-to-action
- Q&A preparation points

Structure for {duration} timeframe:
- Introduction (10%)
- Main content (70-80%)
- Conclusion (10-20%)

Make it engaging, audience-appropriate, and goal-focused.`,
      maxTokens: 1200,
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
      prompt: `Write a compelling {scriptType} script about {topic}.

Target Audience: {audience}
Video Length: {length}

Create an engaging script including:
- Attention-grabbing hook (first 5 seconds)
- Clear introduction of topic/product
- Main content structured logically
- Visual cues and scene descriptions
- Engaging narrative flow
- Call-to-action
- Timing notes for {length}

Format as professional script with:
- [VISUAL CUES]
- Speaker dialogue
- Time markers
- Engagement points

Make it conversational, engaging, and conversion-focused.`,
      maxTokens: 1000,
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
      prompt: `Create an engaging {frequency} newsletter about {topic} for {audience}.

Content Sections: {sections}

Generate complete newsletter including:
- Compelling subject line
- Personal greeting/introduction
- Content for each section:
  {sections}
- Engaging headlines and subheaders
- Call-to-action buttons
- Social sharing links
- Unsubscribe footer

Make each section:
- Valuable and informative
- Engaging and conversational
- Scannable with bullets/lists
- Action-oriented where appropriate

Create content that builds community and drives engagement.`,
      maxTokens: 1200,
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
      prompt: `Translate the following text from {fromLanguage} to {toLanguage}.

Original text: {text}
Context: {context}

Provide accurate translation that:
- Preserves original meaning and intent
- Maintains appropriate tone for {context}
- Uses culturally appropriate expressions
- Follows target language conventions
- Keeps formatting and structure

Include:
- Primary translation
- Alternative translation (if applicable)
- Cultural notes (if relevant)
- Tone/formality level maintained

Ensure professional quality suitable for {context} use.`,
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
      maxTokens: 2000,
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
      prompt: `Summarize the {meetingType} with focus on {focus}.

Meeting Notes: {meetingNotes}
Participants: {participants}

Create organized summary including:
- Meeting overview (date, participants, purpose)
- Key discussion points
- Important decisions made
- Action items with owners and deadlines
- Next steps and follow-ups
- Open questions or concerns
- Meeting outcomes

Format for easy sharing:
- Executive summary (2-3 lines)
- Detailed sections with bullet points
- Clear action items list
- Next meeting/follow-up plans

Make it professional and actionable for all attendees.`,
      maxTokens: 1000,
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
      prompt: `Generate a professional response to this {rating} customer review for {business}.

Customer Review: {review}
Response Style: {responseStyle}

Create appropriate response that:
- Acknowledges the customer's feedback
- Thanks them for their review
- Addresses specific points mentioned
- Shows {responseStyle} tone
- Maintains professional image
- Encourages future business (if positive)
- Offers solutions (if negative)
- Invites further communication if needed

For positive reviews:
- Express genuine gratitude
- Highlight specific compliments
- Invite them back

For negative reviews:
- Acknowledge concerns professionally
- Apologize where appropriate
- Offer solutions or next steps
- Take conversation offline if needed

Keep response authentic and brand-appropriate.`,
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
      prompt: `Create a professional customer service {responseType} for a {customerType}.

Customer Inquiry: {inquiry}
Urgency Level: {urgency}

Generate appropriate response that:
- Acknowledges their concern promptly
- Shows empathy and understanding
- Provides clear, actionable solution
- Matches urgency level appropriately
- Uses professional, helpful tone
- Includes next steps if needed
- Offers additional assistance
- Maintains positive customer experience

For {customerType}:
- Use appropriate level of personalization
- Consider their relationship with company
- Adjust tone and approach accordingly

Make response helpful, professional, and customer-focused.`,
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