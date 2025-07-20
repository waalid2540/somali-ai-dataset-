// API endpoint for processing AI tools requests
import { NextApiRequest, NextApiResponse } from 'next';
import AIToolsEngine from '../../services/ai-tools-engine';

interface AIToolRequest {
  toolId: string;
  inputs: Record<string, any>;
}

interface APIResponse {
  success: boolean;
  result?: any;
  error?: string;
  cost?: number;
  processingTime?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<APIResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use POST.' 
    });
  }

  try {
    const { toolId, inputs }: AIToolRequest = req.body;

    // Validate required fields
    if (!toolId) {
      return res.status(400).json({
        success: false,
        error: 'Tool ID is required'
      });
    }

    if (!inputs || typeof inputs !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Inputs object is required'
      });
    }

    // Simple API key validation (in production, use proper auth)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Valid API key required. Format: Bearer <your-api-key>'
      });
    }

    const apiKey = authHeader.split(' ')[1];
    if (!apiKey || apiKey.length < 10) {
      return res.status(401).json({
        success: false,
        error: 'Invalid API key provided'
      });
    }

    // Initialize AI Tools Engine
    const aiEngine = new AIToolsEngine();

    // Validate tool exists
    const availableTools = aiEngine.getAllTools();
    const tool = availableTools.find(t => t.id === toolId);
    
    if (!tool) {
      return res.status(404).json({
        success: false,
        error: `Tool "${toolId}" not found. Available tools: ${availableTools.map(t => t.id).join(', ')}`
      });
    }

    // Validate required inputs
    const missingInputs = tool.inputs
      .filter(input => input.required && !inputs[input.id])
      .map(input => input.id);

    if (missingInputs.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required inputs: ${missingInputs.join(', ')}`
      });
    }

    // Process the AI tool request
    console.log(`Processing ${toolId} with inputs:`, Object.keys(inputs));
    const result = await aiEngine.processAITool(toolId, inputs);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error || 'AI processing failed',
        processingTime: result.metadata.processingTime
      });
    }

    // Return successful result
    res.status(200).json({
      success: true,
      result: {
        toolId: toolId,
        toolName: tool.name,
        content: result.content,
        metadata: {
          wordsGenerated: result.metadata.wordsGenerated,
          processingTime: result.metadata.processingTime,
          confidence: result.metadata.confidence
        }
      },
      cost: result.metadata.cost,
      processingTime: result.metadata.processingTime
    });

  } catch (error) {
    console.error('AI Tools API Error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Internal server error processing AI tool request',
      processingTime: 0
    });
  }
}