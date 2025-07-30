# 🎤 Somali Voice Clone Studio Setup

Complete setup guide for running the Voice Clone Studio with backend integration.

## 🚀 Quick Start

### 1. Install Backend Dependencies
```bash
cd api
npm install
```

### 2. Start Backend Server
```bash
cd api
npm start
```
The backend server will run on `http://localhost:8001`

### 3. Ensure Python Environment
Make sure you have the Python voice cloning environment set up:
```bash
cd voice-clone
python3 -m pip install -r requirements.txt
```

### 4. Test the System
1. Open your deployed website at somalidata.com
2. Navigate to Voice Clone Studio
3. Record a Somali voice sample (3-10 seconds)
4. Clone the voice using OpenVoice V2
5. Chat with the AI assistant

## 🔧 Backend API Endpoints

### Health Check
- `GET /health` - Check if server is running

### Voice Recording
- `POST /api/upload-voice` - Upload voice recording
  - Form data with `audio` file (webm/mp4/ogg)
  - Returns: `{ success, message, file, metadata }`

### Voice Cloning
- `POST /api/clone-voice` - Clone voice using OpenVoice
  - Body: `{ audioFile: "filename.webm" }`
  - Returns: `{ success, message, output, clonedVoiceId }`

### Speech Generation
- `POST /api/generate-speech` - Generate speech with cloned voice
  - Body: `{ text: "Somali text", voiceId: "voice_id" }`
  - Returns: `{ success, message, output, audioId }`

### Recordings List
- `GET /api/recordings` - List all voice recordings
  - Returns: `{ recordings: [...] }`

## 📁 File Structure
```
api/
├── voice-clone-server.js    # Express.js backend server
├── package.json            # Node.js dependencies
└── node_modules/          # Installed packages

voice-clone/
├── recordings/            # Uploaded voice files
├── OpenVoice/            # OpenVoice V2 model
├── somali_voice_clone.py # Voice cloning script
└── somali_ai_assistant.py # AI assistant script

src/pages/
└── voice-clone-studio.tsx # React frontend interface
```

## 🎯 Features Working

✅ **Voice Recording**: Browser-based recording with MediaRecorder API
✅ **File Upload**: Automatic upload to backend server  
✅ **Voice Cloning**: Integration with OpenVoice V2 Python scripts
✅ **AI Assistant**: Local Somali responses with chat interface
✅ **Audio Playback**: Play recorded and generated audio
✅ **Download**: Download voice recordings
✅ **Voice Library**: Manage all recordings and cloned voices

## 🐛 Troubleshooting

### Backend Server Not Starting
```bash
cd api
npm install express multer cors
npm start
```

### Voice Recording Not Working
- Allow microphone access in browser
- Check browser console for errors
- Ensure HTTPS connection for production

### Python Scripts Failing
```bash
cd voice-clone
python3 -c "import torch; print(torch.__version__)"
python3 -c "import openvoice; print('OpenVoice installed')"
```

### CORS Issues
The backend includes CORS headers for localhost development. For production, update the CORS configuration in `voice-clone-server.js`.

## 🌐 Production Deployment

### Frontend (Already Deployed)
The React interface is deployed at somalidata.com/voice-clone-studio

### Backend Deployment
Deploy the Node.js backend to your preferred service:
- Render.com
- Railway
- Heroku  
- DigitalOcean

Update the frontend API calls to use your production backend URL instead of `localhost:8001`.

## 🎤 Usage Flow

1. **Record Voice**: Click "Start Recording" and speak in Somali for 3-10 seconds
2. **Upload**: Audio is automatically uploaded to backend
3. **Clone Voice**: Select a voice sample and click "Clone This Voice"
4. **AI Chat**: Use the AI assistant to generate responses in your cloned voice
5. **Download**: Save any recordings or generated speech

The system is now fully functional with both frontend and backend integration!