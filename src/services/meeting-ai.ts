// AI Meeting Summarizer Service
// Integrates GPT-4 API with Somali AI Dataset

interface MeetingData {
  transcript: string;
  duration: number;
  participants: string[];
  language?: string;
  title?: string;
}

interface MeetingSummary {
  summary: string;
  actionItems: ActionItem[];
  keyDecisions: string[];
  insights: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  nextMeetingRecommendations: string[];
}

interface ActionItem {
  task: string;
  assignee: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

class MeetingAIService {
  private apiKey: string;
  private somaliDatasetEndpoint: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
    this.somaliDatasetEndpoint = process.env.NEXT_PUBLIC_SOMALI_AI_ENDPOINT || '';
  }

  /**
   * Main function to process meeting and generate AI summary
   */
  async processMeeting(meetingData: MeetingData): Promise<MeetingSummary> {
    try {
      // Step 1: Detect language and enhance with Somali AI if needed
      const enhancedTranscript = await this.enhanceWithSomaliAI(meetingData);
      
      // Step 2: Generate comprehensive summary using GPT-4
      const summary = await this.generateSummaryWithGPT4(enhancedTranscript);
      
      // Step 3: Extract action items and insights
      const actionItems = await this.extractActionItems(enhancedTranscript);
      const keyDecisions = await this.extractKeyDecisions(enhancedTranscript);
      const insights = await this.generateInsights(enhancedTranscript);
      const sentiment = await this.analyzeSentiment(enhancedTranscript);
      const nextMeetingRecommendations = await this.generateRecommendations(summary, actionItems);

      return {
        summary,
        actionItems,
        keyDecisions,
        insights,
        sentiment,
        nextMeetingRecommendations
      };
    } catch (error) {
      console.error('Error processing meeting:', error);
      throw new Error('Failed to process meeting with AI');
    }
  }

  /**
   * Enhance transcript with Somali AI dataset for multilingual support
   */
  private async enhanceWithSomaliAI(meetingData: MeetingData): Promise<string> {
    // Check if transcript contains Somali or other non-English languages
    const languageDetection = await this.detectLanguages(meetingData.transcript);
    
    if (languageDetection.includes('somali') || languageDetection.includes('arabic')) {
      // Use our Somali AI dataset to improve understanding
      const enhancedTranscript = await this.applySomaliAIContext(meetingData.transcript);
      return enhancedTranscript;
    }
    
    return meetingData.transcript;
  }

  /**
   * Detect languages in the transcript
   */
  private async detectLanguages(transcript: string): Promise<string[]> {
    // Simple language detection - in production, use proper language detection service
    const somaliKeywords = ['waa', 'iyo', 'oo', 'ah', 'ku', 'la', 'maxaa', 'sida'];
    const arabicKeywords = ['والله', 'إن شاء الله', 'مع', 'في', 'هذا', 'ذلك'];
    
    const languages = ['english']; // Default
    
    if (somaliKeywords.some(keyword => transcript.toLowerCase().includes(keyword))) {
      languages.push('somali');
    }
    
    if (arabicKeywords.some(keyword => transcript.includes(keyword))) {
      languages.push('arabic');
    }
    
    return languages;
  }

  /**
   * Apply Somali AI context for better understanding
   */
  private async applySomaliAIContext(transcript: string): Promise<string> {
    // In production, this would call your Somali AI dataset API
    // For now, we'll simulate the enhancement
    
    const somaliContext = {
      'waa': 'is/it is',
      'iyo': 'and',
      'oo': 'and/that',
      'ah': 'is/being',
      'ku': 'in/on/with',
      'la': 'with/together',
      'maxaa': 'what',
      'sida': 'how/like',
      'ganacsi': 'business',
      'lacag': 'money',
      'suuq': 'market',
      'shirkad': 'company'
    };
    
    // Add context annotations to improve GPT-4 understanding
    let enhancedTranscript = transcript;
    
    Object.entries(somaliContext).forEach(([somali, english]) => {
      const regex = new RegExp(`\\b${somali}\\b`, 'gi');
      enhancedTranscript = enhancedTranscript.replace(regex, `${somali} [${english}]`);
    });
    
    return enhancedTranscript;
  }

  /**
   * Generate meeting summary using GPT-4
   */
  private async generateSummaryWithGPT4(transcript: string): Promise<string> {
    const prompt = `
    You are an expert meeting analyst. Please analyze this meeting transcript and provide a concise, professional summary.

    Focus on:
    - Main topics discussed
    - Key decisions made
    - Important outcomes
    - Overall meeting purpose and result

    Transcript:
    ${transcript}

    Provide a clear, business-focused summary in 2-3 paragraphs:
    `;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a professional meeting analyst who creates clear, actionable summaries.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 500,
          temperature: 0.3,
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error with GPT-4 API:', error);
      return 'Error generating summary. Please try again.';
    }
  }

  /**
   * Extract action items with assigned owners and deadlines
   */
  private async extractActionItems(transcript: string): Promise<ActionItem[]> {
    const prompt = `
    Analyze this meeting transcript and extract all action items, tasks, and commitments.
    
    For each action item, identify:
    - The specific task/action
    - Who is responsible (if mentioned)
    - Any deadline mentioned
    - Priority level (high/medium/low)

    Format as JSON array of objects with: task, assignee, deadline, priority

    Transcript:
    ${transcript}
    `;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You extract action items from meetings and format them as structured JSON.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 400,
          temperature: 0.2,
        }),
      });

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        return JSON.parse(content);
      } catch {
        // Fallback if JSON parsing fails
        return [
          {
            task: 'Review meeting notes and confirm action items',
            assignee: 'Meeting organizer',
            deadline: 'Within 24 hours',
            priority: 'medium' as const
          }
        ];
      }
    } catch (error) {
      console.error('Error extracting action items:', error);
      return [];
    }
  }

  /**
   * Extract key decisions made during the meeting
   */
  private async extractKeyDecisions(transcript: string): Promise<string[]> {
    const prompt = `
    Identify all key decisions, agreements, and conclusions from this meeting transcript.
    
    Focus on:
    - Definitive decisions made
    - Agreements reached
    - Conclusions drawn
    - Next steps decided
    
    Return as a simple array of decision statements.

    Transcript:
    ${transcript}
    `;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
          temperature: 0.2,
        }),
      });

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the response into an array
      return content.split('\n').filter((line: string) => line.trim().length > 0);
    } catch (error) {
      console.error('Error extracting decisions:', error);
      return ['Review meeting recording for key decisions'];
    }
  }

  /**
   * Generate business insights from the meeting
   */
  private async generateInsights(transcript: string): Promise<string[]> {
    const insights = [
      'Meeting duration optimized for productivity',
      'Strong collaboration observed among team members',
      'Clear action items identified for follow-up',
      'Effective decision-making process demonstrated'
    ];
    
    // In production, this would use AI to generate real insights
    return insights;
  }

  /**
   * Analyze overall sentiment of the meeting
   */
  private async analyzeSentiment(transcript: string): Promise<'positive' | 'neutral' | 'negative'> {
    // Simple sentiment analysis - in production, use proper sentiment analysis
    const positiveWords = ['great', 'excellent', 'good', 'successful', 'agree', 'progress'];
    const negativeWords = ['problem', 'issue', 'concern', 'delay', 'difficult', 'challenge'];
    
    const lowerTranscript = transcript.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerTranscript.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerTranscript.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  /**
   * Generate recommendations for next meeting
   */
  private async generateRecommendations(summary: string, actionItems: ActionItem[]): Promise<string[]> {
    const recommendations = [
      'Schedule follow-up meeting to review action item progress',
      'Share meeting summary with all stakeholders',
      'Set calendar reminders for action item deadlines',
      'Prepare status updates for next team meeting'
    ];
    
    if (actionItems.length > 5) {
      recommendations.push('Consider breaking down large action items into smaller tasks');
    }
    
    return recommendations;
  }

  /**
   * Calculate estimated cost for processing this meeting
   */
  calculateProcessingCost(transcript: string): number {
    const tokenCount = Math.ceil(transcript.length / 4); // Rough token estimation
    const inputCost = (tokenCount / 1000) * 0.03; // $0.03 per 1K tokens
    const outputCost = (500 / 1000) * 0.06; // Estimated 500 output tokens at $0.06 per 1K
    
    return inputCost + outputCost;
  }

  /**
   * Check if meeting processing is profitable at current pricing
   */
  isProfitable(transcript: string, subscriptionPrice: number = 14.99): boolean {
    const processingCost = this.calculateProcessingCost(transcript);
    const monthlyLimit = 30; // Assume 30 meetings per month max
    const costPerMeeting = processingCost;
    const monthlyCost = costPerMeeting * monthlyLimit;
    
    return subscriptionPrice > monthlyCost;
  }
}

export default MeetingAIService;
export type { MeetingData, MeetingSummary, ActionItem };