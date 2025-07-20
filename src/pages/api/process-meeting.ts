// API endpoint to process meetings from browser extension
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAIService from '../../services/openai-service';
import formidable from 'formidable';
import fs from 'fs';

// Disable body parsing for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

interface MeetingData {
  title: string;
  participants: string[];
  startTime: string;
  platform: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the incoming form data
    const form = formidable({
      maxFileSize: 100 * 1024 * 1024, // 100MB max file size
      keepExtensions: true
    });

    const [fields, files] = await form.parse(req);
    
    // Extract meeting data
    const meetingDataStr = Array.isArray(fields.meetingData) 
      ? fields.meetingData[0] 
      : fields.meetingData;
    
    if (!meetingDataStr) {
      return res.status(400).json({ error: 'Meeting data is required' });
    }

    const meetingData: MeetingData = JSON.parse(meetingDataStr);
    
    // Extract audio file
    const audioFile = Array.isArray(files.audio) ? files.audio[0] : files.audio;
    
    if (!audioFile) {
      return res.status(400).json({ error: 'Audio file is required' });
    }

    // Validate API key (simple auth for now)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Valid API key required' });
    }

    const apiKey = authHeader.split(' ')[1];
    
    // For now, accept any API key - in production, validate against database
    if (!apiKey || apiKey.length < 10) {
      return res.status(401).json({ error: 'Invalid API key' });
    }

    // Initialize OpenAI service
    const openAIService = new OpenAIService();

    // Convert file to the format expected by OpenAI
    const audioBuffer = fs.readFileSync(audioFile.filepath);
    const audioFileForAPI = new File([audioBuffer], audioFile.originalFilename || 'recording.webm', {
      type: audioFile.mimetype || 'audio/webm'
    });

    // Step 1: Transcribe audio
    console.log('Transcribing audio...');
    const transcriptionResult = await openAIService.transcribeAudio(audioFileForAPI);

    // Step 2: Generate meeting summary
    console.log('Generating summary...');
    const summary = await openAIService.generateMeetingSummary({
      transcript: transcriptionResult.text,
      participants: meetingData.participants,
      meetingTitle: meetingData.title,
      language: transcriptionResult.language
    });

    // Step 3: Calculate processing cost
    const costs = openAIService.calculateCost(transcriptionResult.text);

    // Step 4: Store meeting in database (placeholder)
    const meetingRecord = {
      id: summary.id,
      userId: apiKey, // Use API key as user ID for now
      platform: meetingData.platform,
      title: meetingData.title,
      participants: meetingData.participants,
      startTime: meetingData.startTime,
      endTime: new Date().toISOString(),
      transcript: transcriptionResult.text,
      summary: summary,
      costs: costs,
      createdAt: new Date().toISOString()
    };

    // TODO: Save to database
    console.log('Meeting processed:', meetingRecord.id);

    // Clean up temporary file
    fs.unlinkSync(audioFile.filepath);

    // Return the processed summary
    res.status(200).json({
      success: true,
      meeting: {
        id: summary.id,
        title: meetingData.title,
        platform: meetingData.platform,
        summary: summary.summary,
        actionItems: summary.actionItems,
        keyPoints: summary.keyPoints,
        decisions: summary.decisions,
        sentiment: summary.sentiment,
        confidence: summary.confidence,
        language: summary.language,
        duration: Math.round((new Date().getTime() - new Date(meetingData.startTime).getTime()) / 1000),
        costs: costs
      },
      message: 'Meeting processed successfully'
    });

  } catch (error) {
    console.error('Meeting processing error:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to process meeting',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}