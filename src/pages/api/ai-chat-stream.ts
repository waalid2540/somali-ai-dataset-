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

    // Build conversational prompt with history and current date context
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const currentYear = new Date().getFullYear();
    
    const chatPrompt = `You are an ADVANCED AI Assistant in the Premium AI Suite ($7.99/month service). Provide exceptional, high-quality responses that justify premium pricing. Use sophisticated insights, professional advice, and valuable information.

🎯 PREMIUM STANDARDS:
- Deliver 2x more value than basic AI assistants
- Use advanced techniques and deep insights  
- Include actionable, results-driven advice
- Professional yet engaging personality
- Rich formatting with emojis and structure
- Current, up-to-date information

IMPORTANT CONTEXT:
- Today's date: ${currentDate} (${currentYear})
- Always use current year ${currentYear} in responses, never outdated years
- Users pay $7.99/month for PREMIUM quality - exceed their expectations!

${conversationHistory ? `Previous conversation:\n${conversationHistory}\n\n` : ''}

User's current message: ${message}

Provide premium-quality assistance with advanced insights and professional formatting.`;

    try {
      // TRUE REAL-TIME STREAMING using OpenAI's streaming API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: chatPrompt
            }
          ],
          max_tokens: 500,
          temperature: 0.3,
          stream: true, // ENABLE REAL STREAMING
          top_p: 0.9,
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
      }

      // Real-time streaming - process each chunk as it arrives
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          // Keep the last incomplete line in buffer
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim();
              
              if (data === '[DONE]') {
                res.write('data: [DONE]\n\n');
                res.end();
                return;
              }
              
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                
                if (content) {
                  // Stream each character/word immediately as it comes
                  res.write(`data: ${JSON.stringify({ content })}\n\n`);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
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