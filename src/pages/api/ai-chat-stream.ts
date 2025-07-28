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
      // Try to use DeepSeek streaming if available, otherwise fallback to chunked simulation
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful AI assistant. Respond naturally and conversationally.'
            },
            {
              role: 'user',
              content: chatPrompt
            }
          ],
          stream: true,
          max_tokens: 800,
          temperature: 0.7,
        })
      });

      if (!response.ok) {
        throw new Error('DeepSeek API error');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No reader available');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              res.write('data: [DONE]\n\n');
              res.end();
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                res.write(`data: ${JSON.stringify({ content })}\n\n`);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();

    } catch (error: any) {
      console.error('AI Chat Stream Error:', error);
      
      // Fallback to non-streaming if streaming fails
      try {
        const result = await deepSeekService.generateCompletion(chatPrompt, {
          maxTokens: 800,
          temperature: 0.7,
          model: 'deepseek-chat'
        });

        // Simulate streaming with smaller chunks for better UX
        const response = result.content;
        const words = response.split(' ');
        const chunkSize = 1; // Send 1 word at a time for smoother effect
        
        for (let i = 0; i < words.length; i += chunkSize) {
          const chunk = words.slice(i, i + chunkSize).join(' ');
          const isLast = i + chunkSize >= words.length;
          
          // Add space after chunk if not last
          const chunkWithSpace = isLast ? chunk : chunk + ' ';
          
          res.write(`data: ${JSON.stringify({ content: chunkWithSpace })}\n\n`);
          
          // Very fast delay for smooth typing effect
          await new Promise(resolve => setTimeout(resolve, 30));
        }

        res.write('data: [DONE]\n\n');
        res.end();
      } catch (fallbackError) {
        const errorMessage = 'Failed to generate response. Please try again.';
        res.write(`data: ${JSON.stringify({ content: errorMessage })}\n\n`);
        res.write('data: [DONE]\n\n');
        res.end();
      }
    }

  } catch (error: any) {
    console.error('Stream API Error:', error);
    res.write(`data: ${JSON.stringify({ content: 'An error occurred. Please try again.' })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
}