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

    // Set headers for Server-Sent Events
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    });

    // Build conversational prompt with history
    const chatPrompt = `You are a helpful AI assistant. Have a natural conversation with the user.

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n\n` : ''}

User's current message: ${message}

Respond naturally and helpfully. Be conversational, friendly, and provide detailed assistance when needed. If the user asks about coding, writing, analysis, or creative tasks, provide comprehensive help.`;

    try {
      // Get the full response first (DeepSeek doesn't support real streaming)
      const result = await deepSeekService.generateCompletion(chatPrompt, {
        maxTokens: 800,
        temperature: 0.7,
        model: 'deepseek-chat'
      });

      // Stream it word by word for real-time effect
      const response = result.content;
      const words = response.split(/(\s+)/); // Split on whitespace but keep the spaces
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        // Send each word/space immediately
        res.write(`data: ${JSON.stringify({ content: word })}\n\n`);
        
        // Small delay for natural typing effect (faster than before)
        if (word.trim()) { // Only delay on actual words, not spaces
          await new Promise(resolve => setTimeout(resolve, 50));
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();

    } catch (error: any) {
      console.error('AI Chat Stream Error:', error);
      
      const errorMessage = 'Failed to generate response. Please try again.';
      res.write(`data: ${JSON.stringify({ content: errorMessage })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }

  } catch (error: any) {
    console.error('Stream API Error:', error);
    res.write(`data: ${JSON.stringify({ content: 'An error occurred. Please try again.' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}