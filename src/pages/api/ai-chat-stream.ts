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
      // Start streaming immediately without waiting
      res.write(`data: ${JSON.stringify({ content: '' })}\n\n`);
      
      // Create the API call with optimized settings for speed
      const deepSeekPromise = deepSeekService.generateCompletion(chatPrompt, {
        maxTokens: 400, // Shorter for faster generation
        temperature: 0.01, // Very low for maximum speed
        model: 'deepseek-chat'
      });

      // No delay - start immediately
      // await new Promise(resolve => setTimeout(resolve, 50)); // Removed delay
      
      // Get the result
      const result = await deepSeekPromise;
      const response = result.content;
      
      // Stream super fast - 3 characters at a time with minimal delay
      const chunkSize = 3;
      for (let i = 0; i < response.length; i += chunkSize) {
        const chunk = response.slice(i, i + chunkSize);
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
        
        // Super fast streaming - 5ms delay
        await new Promise(resolve => setTimeout(resolve, 5));
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