import { NextApiRequest, NextApiResponse } from 'next';

interface Recording {
  id: string;
  title: string;
  duration: string;
  size: string;
  created_at: string;
  thumbnail: string;
  type: 'screen' | 'webcam' | 'mixed';
  file_url: string;
  user_id: string;
}

// In-memory storage for demo (use a real database in production)
let recordings: Recording[] = [
  {
    id: '1',
    title: 'Somali AI Dataset API Demo',
    duration: '5:23',
    size: '45.2 MB',
    created_at: '2024-01-15',
    thumbnail: '/api-demo-thumb.jpg',
    type: 'screen',
    file_url: '/recordings/demo1.webm',
    user_id: 'demo-user'
  },
  {
    id: '2', 
    title: 'AI Tools Bundle Overview',
    duration: '8:15',
    size: '67.8 MB',
    created_at: '2024-01-14',
    thumbnail: '/tools-thumb.jpg',
    type: 'mixed',
    file_url: '/recordings/demo2.webm',
    user_id: 'demo-user'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Basic auth check (in production, verify JWT token)
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const apiKey = authHeader.split(' ')[1];
  // In production, verify the API key against your database
  
  switch (req.method) {
    case 'GET':
      // Get all recordings for the user
      res.status(200).json({
        success: true,
        recordings: recordings.filter(r => r.user_id === 'demo-user') // Filter by actual user_id in production
      });
      break;

    case 'POST':
      // Create a new recording
      const { title, duration, size, type, file_data } = req.body;
      
      if (!title || !duration || !size || !type) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newRecording: Recording = {
        id: Date.now().toString(),
        title,
        duration,
        size,
        created_at: new Date().toISOString().split('T')[0],
        thumbnail: `/thumbnails/${Date.now()}.jpg`,
        type,
        file_url: `/recordings/${Date.now()}.webm`,
        user_id: 'demo-user' // Get from authenticated user in production
      };

      recordings.push(newRecording);
      
      res.status(201).json({
        success: true,
        recording: newRecording
      });
      break;

    case 'DELETE':
      // Delete a recording
      const { id } = req.query;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Recording ID required' });
      }

      const recordingIndex = recordings.findIndex(r => r.id === id && r.user_id === 'demo-user');
      
      if (recordingIndex === -1) {
        return res.status(404).json({ error: 'Recording not found' });
      }

      recordings.splice(recordingIndex, 1);
      
      res.status(200).json({
        success: true,
        message: 'Recording deleted successfully'
      });
      break;

    case 'PUT':
      // Update a recording
      const { id: updateId } = req.query;
      const { title: newTitle } = req.body;
      
      if (!updateId || typeof updateId !== 'string') {
        return res.status(400).json({ error: 'Recording ID required' });
      }

      const recordingToUpdate = recordings.find(r => r.id === updateId && r.user_id === 'demo-user');
      
      if (!recordingToUpdate) {
        return res.status(404).json({ error: 'Recording not found' });
      }

      if (newTitle) {
        recordingToUpdate.title = newTitle;
      }
      
      res.status(200).json({
        success: true,
        recording: recordingToUpdate
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}