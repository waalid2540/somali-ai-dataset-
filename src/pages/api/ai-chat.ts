import { NextApiRequest, NextApiResponse } from 'next';
import { deepSeekService } from '../../services/deepseek-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory, userSubscription } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversational prompt with history
    const chatPrompt = `You are a helpful AI assistant like ChatGPT. Have a natural conversation with the user.

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n\n` : ''}

User's current message: ${message}

Respond naturally and helpfully. Be conversational, friendly, and provide detailed assistance when needed. If the user asks about coding, writing, analysis, or creative tasks, provide comprehensive help.`;

    // Generate response using DeepSeek
    const result = await deepSeekService.generateCompletion(chatPrompt, {
      maxTokens: 800,
      temperature: 0.7,
      model: 'deepseek-chat'
    });

    res.status(200).json({
      content: result.content,
      usage: result.usage,
      cost: result.cost
    });

  } catch (error: any) {
    console.error('AI Chat API Error:', error);
    
    if (error.message.includes('timed out')) {
      res.status(408).json({ 
        error: 'Response took too long. Please try a shorter message.' 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to generate response. Please try again.' 
      });
    }
  }
}