// Professional OpenAI Integration Service
// Real GPT-4 and Whisper API integration

interface TranscriptionResult {
  text: string;
  language: string;
  duration: number;
}

interface SummaryRequest {
  transcript: string;
  participants?: string[];
  meetingTitle?: string;
  language?: string;
}

interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
}

interface MeetingSummary {
  id: string;
  summary: string;
  keyPoints: string[];
  actionItems: ActionItem[];
  decisions: string[];
  nextSteps: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  participants: string[];
  duration: number;
  language: string;
  confidence: number;
  createdAt: string;
}

class OpenAIService {
  private apiKey: string;
  private baseURL = 'https://api.openai.com/v1';

  constructor() {
    // In production, use environment variables
    this.apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('OpenAI API key not found. Please set NEXT_PUBLIC_OPENAI_API_KEY');
    }
  }

  /**
   * Transcribe audio using OpenAI Whisper API
   */
  async transcribeAudio(audioFile: File): Promise<TranscriptionResult> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key is required for transcription');
    }

    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');
    formData.append('language', 'en'); // Auto-detect or specify
    formData.append('response_format', 'verbose_json');

    try {
      const response = await fetch(`${this.baseURL}/audio/transcriptions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Transcription failed: ${error.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      
      return {
        text: result.text,
        language: result.language || 'en',
        duration: result.duration || 0
      };

    } catch (error) {
      console.error('Transcription error:', error);
      throw new Error('Failed to transcribe audio. Please try again.');
    }
  }

  /**
   * Generate comprehensive meeting summary using GPT-4
   */
  async generateMeetingSummary(request: SummaryRequest): Promise<MeetingSummary> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key is required for summary generation');
    }

    const prompt = this.buildSummaryPrompt(request);

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: `You are an expert meeting analyst and professional assistant. You create comprehensive, actionable meeting summaries that help teams stay productive and accountable.

Key requirements:
- Extract clear, specific action items with owners
- Identify concrete decisions made
- Provide executive-level summary
- Maintain professional tone
- Focus on business outcomes
- Support multilingual content (English, Somali, Arabic)
- Return structured JSON format`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.2,
          response_format: { type: "json_object" }
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Summary generation failed: ${error.error?.message || 'Unknown error'}`);
      }

      const result = await response.json();
      const summaryData = JSON.parse(result.choices[0].message.content);

      return this.formatMeetingSummary(summaryData, request);

    } catch (error) {
      console.error('Summary generation error:', error);
      throw new Error('Failed to generate meeting summary. Please try again.');
    }
  }

  /**
   * Build comprehensive prompt for GPT-4
   */
  private buildSummaryPrompt(request: SummaryRequest): string {
    return `
Please analyze this meeting transcript and provide a comprehensive summary in JSON format.

Meeting Details:
${request.meetingTitle ? `Title: ${request.meetingTitle}` : ''}
${request.participants ? `Participants: ${request.participants.join(', ')}` : ''}
${request.language ? `Primary Language: ${request.language}` : ''}

Transcript:
${request.transcript}

Required JSON Structure:
{
  "summary": "Executive summary of the meeting (2-3 sentences)",
  "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
  "actionItems": [
    {
      "task": "Specific action to be taken",
      "assignee": "Person responsible (if mentioned)",
      "deadline": "Deadline if mentioned, or 'TBD'",
      "priority": "high|medium|low"
    }
  ],
  "decisions": ["Decision 1", "Decision 2"],
  "nextSteps": ["Next step 1", "Next step 2"],
  "sentiment": "positive|neutral|negative",
  "confidence": 0.95
}

Focus on:
- Specific, actionable items
- Clear ownership and deadlines
- Business impact and outcomes
- Cultural context if multilingual content
- Professional tone and clarity
`;
  }

  /**
   * Format and enrich the meeting summary
   */
  private formatMeetingSummary(summaryData: any, request: SummaryRequest): MeetingSummary {
    const now = new Date().toISOString();
    
    // Process action items with unique IDs
    const actionItems: ActionItem[] = summaryData.actionItems?.map((item: any, index: number) => ({
      id: `action_${Date.now()}_${index}`,
      task: item.task || 'Review meeting notes',
      assignee: item.assignee || 'TBD',
      deadline: item.deadline || 'Next meeting',
      priority: item.priority || 'medium',
      status: 'pending' as const
    })) || [];

    return {
      id: `meeting_${Date.now()}`,
      summary: summaryData.summary || 'Meeting summary generated successfully',
      keyPoints: summaryData.keyPoints || [],
      actionItems,
      decisions: summaryData.decisions || [],
      nextSteps: summaryData.nextSteps || [],
      sentiment: summaryData.sentiment || 'neutral',
      participants: request.participants || [],
      duration: 0, // Will be set from transcription
      language: request.language || 'en',
      confidence: summaryData.confidence || 0.9,
      createdAt: now
    };
  }

  /**
   * Analyze meeting sentiment in detail
   */
  async analyzeSentiment(transcript: string): Promise<{
    overall: 'positive' | 'neutral' | 'negative';
    confidence: number;
    details: {
      engagement: number;
      collaboration: number;
      clarity: number;
      efficiency: number;
    };
  }> {
    if (!this.apiKey) {
      return {
        overall: 'neutral',
        confidence: 0.8,
        details: { engagement: 0.8, collaboration: 0.8, clarity: 0.8, efficiency: 0.8 }
      };
    }

    const prompt = `
Analyze the sentiment and quality of this meeting transcript. Rate on a scale of 0-1:

Transcript:
${transcript}

Return JSON with:
{
  "overall": "positive|neutral|negative",
  "confidence": 0.95,
  "details": {
    "engagement": 0.8,
    "collaboration": 0.9,
    "clarity": 0.7,
    "efficiency": 0.85
  }
}
`;

    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
          temperature: 0.1,
          response_format: { type: "json_object" }
        }),
      });

      const result = await response.json();
      return JSON.parse(result.choices[0].message.content);
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return {
        overall: 'neutral',
        confidence: 0.8,
        details: { engagement: 0.8, collaboration: 0.8, clarity: 0.8, efficiency: 0.8 }
      };
    }
  }

  /**
   * Generate meeting insights and recommendations
   */
  async generateInsights(summary: MeetingSummary): Promise<string[]> {
    const insights = [
      `Meeting efficiency: ${summary.confidence > 0.9 ? 'Excellent' : summary.confidence > 0.7 ? 'Good' : 'Needs improvement'}`,
      `Action items clarity: ${summary.actionItems.length > 0 ? 'Clear' : 'Could be more specific'}`,
      `Decision making: ${summary.decisions.length > 0 ? 'Effective' : 'Consider more decisive outcomes'}`,
      `Sentiment: ${summary.sentiment} - Team engagement appears ${summary.sentiment}`
    ];

    if (summary.actionItems.length > 5) {
      insights.push('Consider breaking down meetings with many action items');
    }

    if (summary.participants.length > 6) {
      insights.push('Large meeting - consider smaller focused sessions');
    }

    return insights;
  }

  /**
   * Calculate processing cost for transparency
   */
  calculateCost(transcript: string): {
    transcriptionCost: number;
    summaryGenerationCost: number;
    totalCost: number;
  } {
    // Whisper API: $0.006 per minute
    const estimatedMinutes = Math.ceil(transcript.length / 200); // Rough estimate
    const transcriptionCost = estimatedMinutes * 0.006;

    // GPT-4 API costs
    const inputTokens = Math.ceil(transcript.length / 4);
    const outputTokens = 800; // Estimated for summary
    
    const inputCost = (inputTokens / 1000) * 0.03;
    const outputCost = (outputTokens / 1000) * 0.06;
    const summaryGenerationCost = inputCost + outputCost;

    return {
      transcriptionCost,
      summaryGenerationCost,
      totalCost: transcriptionCost + summaryGenerationCost
    };
  }

  /**
   * Validate API key and connection
   */
  async validateConnection(): Promise<boolean> {
    if (!this.apiKey) return false;

    try {
      const response = await fetch(`${this.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });

      return response.ok;
    } catch {
      return false;
    }
  }
}

export default OpenAIService;
export type { TranscriptionResult, SummaryRequest, MeetingSummary, ActionItem };