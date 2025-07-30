const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8001;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../voice-clone/recordings/');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `somali_voice_${timestamp}.webm`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Voice Clone Server Running', timestamp: new Date().toISOString() });
});

// Upload and process voice recording
app.post('/api/upload-voice', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file uploaded' });
  }

  const audioPath = req.file.path;
  const metadata = {
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    uploadTime: new Date().toISOString(),
    language: 'somali'
  };

  // Save metadata
  const metadataPath = path.join(path.dirname(audioPath), `${path.basename(audioPath, '.webm')}_metadata.json`);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  res.json({
    success: true,
    message: 'Voice recording uploaded successfully',
    file: req.file.filename,
    metadata: metadata
  });
});

// Clone voice using OpenVoice
app.post('/api/clone-voice', (req, res) => {
  const { audioFile } = req.body;
  
  if (!audioFile) {
    return res.status(400).json({ error: 'Audio file required for cloning' });
  }

  const audioPath = path.join(__dirname, '../voice-clone/recordings/', audioFile);
  
  if (!fs.existsSync(audioPath)) {
    return res.status(404).json({ error: 'Audio file not found' });
  }

  // Execute Python voice cloning script
  const pythonScript = path.join(__dirname, '../voice-clone/somali_voice_clone.py');
  const command = `cd "${path.dirname(pythonScript)}" && python3 "${pythonScript}" "${path.basename(audioPath)}"`;
  
  console.log('Executing:', command);
  
  exec(command, { timeout: 120000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('Voice cloning error:', error);
      return res.status(500).json({ 
        error: 'Voice cloning failed', 
        details: error.message,
        stderr: stderr
      });
    }

    console.log('Voice cloning output:', stdout);
    
    res.json({
      success: true,
      message: 'Voice cloned successfully',
      output: stdout,
      clonedVoiceId: `cloned_${Date.now()}`
    });
  });
});

// Generate speech using cloned voice
app.post('/api/generate-speech', (req, res) => {
  const { text, voiceId } = req.body;
  
  if (!text || !voiceId) {
    return res.status(400).json({ error: 'Text and voice ID are required' });
  }

  // Execute Python AI assistant script
  const pythonScript = path.join(__dirname, '../voice-clone/somali_ai_assistant.py');
  const command = `cd "${path.dirname(pythonScript)}" && python3 "${pythonScript}" "${text}" "${voiceId}"`;
  
  console.log('Generating speech:', command);
  
  exec(command, { timeout: 60000 }, (error, stdout, stderr) => {
    if (error) {
      console.error('Speech generation error:', error);
      return res.status(500).json({ 
        error: 'Speech generation failed', 
        details: error.message,
        stderr: stderr
      });
    }

    console.log('Speech generation output:', stdout);
    
    res.json({
      success: true,
      message: 'Speech generated successfully',
      output: stdout,
      audioId: `generated_${Date.now()}`
    });
  });
});

// List available voice recordings
app.get('/api/recordings', (req, res) => {
  const recordingsDir = path.join(__dirname, '../voice-clone/recordings/');
  
  if (!fs.existsSync(recordingsDir)) {
    return res.json({ recordings: [] });
  }

  try {
    const files = fs.readdirSync(recordingsDir)
      .filter(file => file.endsWith('.webm'))
      .map(file => {
        const filePath = path.join(recordingsDir, file);
        const stats = fs.statSync(filePath);
        const metadataPath = path.join(recordingsDir, `${path.basename(file, '.webm')}_metadata.json`);
        
        let metadata = {};
        if (fs.existsSync(metadataPath)) {
          metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
        }

        return {
          filename: file,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
          metadata: metadata
        };
      });

    res.json({ recordings: files });
  } catch (error) {
    res.status(500).json({ error: 'Failed to list recordings', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`🎤 Voice Clone Server running at http://localhost:${port}`);
  console.log(`📁 Recordings directory: ${path.join(__dirname, '../voice-clone/recordings/')}`);
  console.log(`🐍 Python scripts directory: ${path.join(__dirname, '../voice-clone/')}`);
});