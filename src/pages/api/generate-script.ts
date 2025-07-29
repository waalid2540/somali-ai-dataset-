import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Basic auth check
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { app_context, tutorial_type, target_audience } = req.body;

  if (!app_context || !tutorial_type) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // In production, you would call OpenAI API here
    // For now, we'll generate a mock script based on the context
    
    let script = '';
    
    if (app_context.includes('somali') || app_context.includes('dataset')) {
      script = `
Welcome to the Somali AI Dataset platform! Today I'll show you how to:

1. **Getting Started**
   - Sign up for your API access
   - Get your unique API key
   - Understanding our pricing model

2. **API Integration** 
   - Making your first API call
   - Authentication with Bearer tokens
   - Handling responses and errors

3. **Advanced Features**
   - Using different language models
   - Filtering by content type
   - Batch processing capabilities

4. **Best Practices**
   - Rate limiting considerations
   - Caching strategies
   - Error handling patterns

Let's dive in and see how easy it is to integrate authentic Somali AI into your applications!
      `.trim();
    } else if (app_context.includes('budul') || app_context.includes('islamic')) {
      script = `
Assalamu Alaikum! Welcome to Budul AI - Islamic Intelligence for the Modern World.

1. **Introduction to Budul AI**
   - Our mission: Your grandfather's wisdom, tomorrow's technology
   - Scholar-verified Islamic knowledge
   - Serving 1.8 billion Muslims worldwide

2. **Core Features**
   - Budul GPT: Islamic conversational AI
   - Budul API: For developers
   - Budul Studio: Video generation
   - Budul Vision: Islamic image creation

3. **Getting Started**
   - Creating your account
   - Exploring the dashboard
   - Making your first query

4. **Islamic Authentication**
   - How we verify Islamic content
   - Multi-madhab support
   - Citation system with Quran and Hadith

Let's explore how Budul AI can enhance your Islamic learning and content creation!
      `.trim();
    } else {
      script = `
Welcome to this tutorial! In this demonstration, I'll walk you through:

1. **Overview**
   - What we'll be covering today
   - Prerequisites and setup
   - Expected outcomes

2. **Step-by-Step Guide**
   - Feature overview
   - Practical demonstrations
   - Common use cases

3. **Best Practices**
   - Tips and tricks
   - Common pitfalls to avoid
   - Optimization strategies

4. **Next Steps**
   - Additional resources
   - Support channels
   - Advanced features

Let's get started!
      `.trim();
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({
      success: true,
      script,
      talking_points: script.split('\n').filter(line => line.trim().startsWith('-')),
      estimated_duration: '8-12 minutes',
      complexity_level: target_audience === 'beginner' ? 'Basic' : 'Intermediate'
    });

  } catch (error) {
    console.error('Script generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate script',
      message: 'Please try again later'
    });
  }
}