import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  Mic, 
  Monitor, 
  Square, 
  Play, 
  Pause, 
  Download, 
  Upload,
  Settings,
  FileVideo,
  Wand2,
  Globe,
  LogOut,
  BarChart3,
  Trash2,
  Eye,
  Edit3
} from 'lucide-react';

interface Recording {
  id: string;
  title: string;
  duration: string;
  size: string;
  created_at: string;
  thumbnail: string;
  type: 'screen' | 'webcam' | 'mixed';
}

const TutorialStudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<Recording[]>([
    {
      id: '1',
      title: 'Somali AI Dataset API Demo',
      duration: '5:23',
      size: '45.2 MB',
      created_at: '2024-01-15',
      thumbnail: '/api-demo-thumb.jpg',
      type: 'screen'
    },
    {
      id: '2', 
      title: 'AI Tools Bundle Overview',
      duration: '8:15',
      size: '67.8 MB',
      created_at: '2024-01-14',
      thumbnail: '/tools-thumb.jpg',
      type: 'mixed'
    }
  ]);
  const [recordingMode, setRecordingMode] = useState<'screen' | 'webcam' | 'mixed'>('screen');
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      let stream: MediaStream;
      
      if (recordingMode === 'screen') {
        stream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true, 
          audio: true 
        });
      } else if (recordingMode === 'webcam') {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
      } else {
        // Mixed mode - combine screen and webcam
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true, 
          audio: true 
        });
        const webcamStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        // For now, use screen stream (in production, you'd combine them)
        stream = screenStream;
      }

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Create new recording entry
        const newRecording: Recording = {
          id: Date.now().toString(),
          title: `Recording ${new Date().toLocaleDateString()}`,
          duration: formatTime(recordingTime),
          size: `${(blob.size / (1024 * 1024)).toFixed(1)} MB`,
          created_at: new Date().toISOString().split('T')[0],
          thumbnail: url,
          type: recordingMode
        };
        
        setRecordings(prev => [newRecording, ...prev]);
        setRecordingTime(0);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not start recording. Please ensure you grant permission.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && streamRef.current) {
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('api_key');
    window.location.href = '/login';
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tutorial Studio
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/dashboard"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Tutorial Studio
          </h1>
          <p className="text-gray-300">
            Record and manage tutorial videos for your SaaS products
          </p>
        </div>

        {/* Recording Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recording Panel */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Video className="w-6 h-6 text-purple-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Record Tutorial</h2>
            </div>

            {/* Recording Mode Selection */}
            <div className="mb-6">
              <label className="block text-gray-300 mb-3">Recording Mode:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setRecordingMode('screen')}
                  className={`p-3 rounded-lg border transition-all ${
                    recordingMode === 'screen'
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-purple-500'
                  }`}
                >
                  <Monitor className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-xs">Screen</div>
                </button>
                <button
                  onClick={() => setRecordingMode('webcam')}
                  className={`p-3 rounded-lg border transition-all ${
                    recordingMode === 'webcam'
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-purple-500'
                  }`}
                >
                  <Video className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-xs">Webcam</div>
                </button>
                <button
                  onClick={() => setRecordingMode('mixed')}
                  className={`p-3 rounded-lg border transition-all ${
                    recordingMode === 'mixed'
                      ? 'bg-purple-600 border-purple-500 text-white'
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:border-purple-500'
                  }`}
                >
                  <Wand2 className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-xs">Mixed</div>
                </button>
              </div>
            </div>

            {/* Recording Preview */}
            <div className="mb-6">
              <div className="bg-black rounded-lg overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                {!isRecording && (
                  <div className="flex items-center justify-center h-full bg-gray-800">
                    <div className="text-center text-gray-400">
                      <Video className="w-12 h-12 mx-auto mb-2" />
                      <p>Preview will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </button>
                )}
              </div>

              {isRecording && (
                <div className="flex items-center text-red-400">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  <span className="font-mono">{formatTime(recordingTime)}</span>
                </div>
              )}
            </div>
          </div>

          {/* AI Features Panel */}
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center mb-4">
              <Wand2 className="w-6 h-6 text-emerald-400 mr-3" />
              <h2 className="text-xl font-bold text-white">AI Features</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Auto Script Generation</h3>
                <p className="text-gray-300 text-sm mb-3">
                  AI generates talking points based on your screen content
                </p>
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm">
                  Generate Script
                </button>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Smart Highlights</h3>
                <p className="text-gray-300 text-sm mb-3">
                  Automatically highlight UI elements you interact with
                </p>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-gray-300 text-sm">Enable auto-highlights</span>
                </label>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Voice Enhancement</h3>
                <p className="text-gray-300 text-sm mb-3">
                  AI-powered noise reduction and voice clarity
                </p>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-gray-300 text-sm">Enable voice enhancement</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Recordings Library */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FileVideo className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Tutorial Library</h2>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center">
              <Upload className="w-4 h-4 mr-2" />
              Upload Video
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  <Play className="w-12 h-12 text-gray-500" />
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2">{recording.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>{recording.duration}</span>
                    <span>{recording.size}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{recording.created_at}</span>
                    <span className="capitalize">{recording.type}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm flex items-center justify-center">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded text-sm">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded text-sm">
                      <Download className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteRecording(recording.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recordings.length === 0 && (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No recordings yet</h3>
              <p className="text-gray-500">Start recording your first tutorial above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialStudio;