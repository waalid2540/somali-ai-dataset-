import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  Download, 
  Upload,
  Wand2,
  Globe,
  LogOut,
  BarChart3,
  Trash2,
  Eye,
  Share2,
  Brain,
  Volume2,
  Users,
  Sparkles
} from 'lucide-react';

interface VoiceRecording {
  id: string;
  title: string;
  duration: string;
  size: string;
  created_at: string;
  type: 'voice-sample' | 'cloned-voice' | 'ai-response';
  language: 'somali' | 'english' | 'arabic';
}

const VoiceCloneStudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<VoiceRecording[]>([]);
  const [activeTab, setActiveTab] = useState<'record' | 'clone' | 'ai-chat'>('record');
  const [cloneProgress, setCloneProgress] = useState(0);
  const [isCloning, setIsCloning] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{user: string, ai: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load saved recordings on component mount
  useEffect(() => {
    const savedRecordings = JSON.parse(localStorage.getItem('voice-recordings') || '[]');
    setRecordings(savedRecordings);
  }, []);

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

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 22050,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      
      streamRef.current = stream;
      
      if (audioRef.current) {
        audioRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream, { 
        mimeType: 'audio/webm' 
      });
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        
        const newRecording: VoiceRecording = {
          id: Date.now().toString(),
          title: `Somali Voice Sample ${new Date().toLocaleString()}`,
          duration: formatTime(recordingTime),
          size: `${(blob.size / (1024 * 1024)).toFixed(1)} MB`,
          created_at: new Date().toISOString().split('T')[0],
          type: 'voice-sample',
          language: 'somali'
        };
        
        // Save recording
        const savedRecordings = JSON.parse(localStorage.getItem('voice-recordings') || '[]');
        savedRecordings.unshift(newRecording);
        localStorage.setItem('voice-recordings', JSON.stringify(savedRecordings));
        
        // Save the actual audio blob
        const audioData = { id: newRecording.id, blob: blob, url: url };
        const savedAudio = JSON.parse(localStorage.getItem('voice-audio') || '{}');
        savedAudio[newRecording.id] = audioData;
        localStorage.setItem('voice-audio', JSON.stringify(savedAudio));
        
        setRecordings(prev => [newRecording, ...prev]);
        setRecordingTime(0);
        
        alert(`✅ Voice sample recorded! 
⏱️ Duration: ${formatTime(recordingTime)}
📊 Size: ${(blob.size / (1024 * 1024)).toFixed(1)} MB

Ready for voice cloning!`);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not start recording. Please allow microphone access.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && streamRef.current) {
      setIsRecording(false);
      mediaRecorderRef.current.stop();
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const cloneVoice = async (recordingId: string) => {
    setIsCloning(true);
    setCloneProgress(0);
    
    // Simulate voice cloning process
    const steps = [
      'Analyzing voice characteristics...',
      'Extracting speaker embeddings...',
      'Training voice model...',
      'Optimizing for Somali phonemes...',
      'Finalizing cloned voice...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCloneProgress((i + 1) * 20);
    }
    
    // Create cloned voice entry
    const clonedVoice: VoiceRecording = {
      id: `cloned_${Date.now()}`,
      title: `Cloned Somali Voice - ${new Date().toLocaleString()}`,
      duration: 'Voice Model',
      size: 'Ready',
      created_at: new Date().toISOString().split('T')[0],
      type: 'cloned-voice',
      language: 'somali'
    };
    
    const savedRecordings = JSON.parse(localStorage.getItem('voice-recordings') || '[]');
    savedRecordings.unshift(clonedVoice);
    localStorage.setItem('voice-recordings', JSON.stringify(savedRecordings));
    setRecordings(prev => [clonedVoice, ...prev]);
    
    setIsCloning(false);
    setCloneProgress(100);
    
    alert(`🎉 Voice cloning complete! 
🧬 Your Somali voice has been successfully cloned
🤖 Ready to use with AI assistant`);
  };

  const sendAIMessage = async () => {
    if (!currentMessage.trim()) return;
    
    const userMessage = currentMessage;
    setCurrentMessage('');
    
    // Simulate AI response
    const aiResponses = [
      'Wa alaykumu salaan! Waan ku faraxsanahay inaan kula hadlayo afka Soomaaliga.',
      'Subhaan Allah! Maxaad doonaysaa inaan kaa caawiyo maanta?',
      'Alhamdulillah! Waxaan halkan u joogaa si aan ku caawiyo su\'aaladaada.',
      'Baraka Allahu feeki! Hadal bay tahay in aan wada tashano arrintan.',
      'Masha Allah! Waa mid fiican tahay inaad Soomali ku hadlayso.'
    ];
    
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    
    // Add to chat history
    const newChat = { user: userMessage, ai: randomResponse };
    setChatHistory(prev => [...prev, newChat]);
    
    // Create AI response recording
    const aiRecording: VoiceRecording = {
      id: `ai_${Date.now()}`,
      title: `AI Response: "${randomResponse.substring(0, 30)}..."`,
      duration: '3-5s',
      size: 'Generated',
      created_at: new Date().toISOString().split('T')[0],
      type: 'ai-response',
      language: 'somali'
    };
    
    const savedRecordings = JSON.parse(localStorage.getItem('voice-recordings') || '[]');
    savedRecordings.unshift(aiRecording);
    localStorage.setItem('voice-recordings', JSON.stringify(savedRecordings));
    setRecordings(prev => [aiRecording, ...prev]);
  };

  const handleLogout = () => {
    localStorage.removeItem('api_key');
    window.location.href = '/login';
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
    const savedRecordings = JSON.parse(localStorage.getItem('voice-recordings') || '[]');
    const updatedRecordings = savedRecordings.filter((r: VoiceRecording) => r.id !== id);
    localStorage.setItem('voice-recordings', JSON.stringify(updatedRecordings));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Voice Clone Studio
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
            Somali Voice Clone Studio
          </h1>
          <p className="text-gray-300">
            Clone your voice, create AI assistants, and generate speech in perfect Somali
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1 mb-8 w-fit">
          <button
            onClick={() => setActiveTab('record')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'record'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4 inline mr-2" />
            Record Voice
          </button>
          <button
            onClick={() => setActiveTab('clone')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'clone'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Wand2 className="w-4 h-4 inline mr-2" />
            Clone Voice
          </button>
          <button
            onClick={() => setActiveTab('ai-chat')}
            className={`px-6 py-3 rounded-lg transition-all ${
              activeTab === 'ai-chat'
                ? 'bg-purple-600 text-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4 inline mr-2" />
            AI Assistant
          </button>
        </div>

        {/* Record Voice Tab */}
        {activeTab === 'record' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <Mic className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-xl font-bold text-white">Record Your Somali Voice</h2>
              </div>

              <div className="mb-6">
                <div className="bg-black rounded-lg overflow-hidden aspect-video mb-4">
                  <audio
                    ref={audioRef}
                    className="w-full h-full bg-gray-800"
                    controls={false}
                  />
                  {!isRecording && (
                    <div className="flex items-center justify-center h-full bg-gray-800">
                      <div className="text-center text-gray-400">
                        <Mic className="w-12 h-12 mx-auto mb-2" />
                        <p>Click start to record your voice</p>
                      </div>
                    </div>
                  )}
                  {isRecording && (
                    <div className="flex items-center justify-center h-full bg-red-900/20">
                      <div className="text-center text-white">
                        <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-4 animate-pulse"></div>
                        <p className="text-lg font-semibold">Recording...</p>
                        <p className="text-red-400 font-mono text-xl">{formatTime(recordingTime)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                {!isRecording ? (
                  <button
                    onClick={startVoiceRecording}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </button>
                )}

                {isRecording && (
                  <div className="text-gray-300">
                    <p className="text-sm">Speak clearly in Somali</p>
                    <p className="text-xs text-gray-400">3-10 seconds recommended</p>
                  </div>
                )}
              </div>

              <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                <h4 className="font-semibold text-white mb-2">💡 Recording Tips:</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Use a quiet environment</li>
                  <li>• Speak clearly and naturally</li>
                  <li>• Record 3-10 seconds for best results</li>
                  <li>• Try: "Magacaygu waa [Your Name]. Waxaan ku hadlayaa afka Soomaaliga."</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <Sparkles className="w-6 h-6 text-emerald-400 mr-3" />
                <h2 className="text-xl font-bold text-white">Suggested Somali Phrases</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    category: "Islamic Greetings",
                    text: "Assalaamu alaykum wa rahmatullahi wa barakatuh. Alhamdulillahi rabbil aalameen.",
                    translation: "Peace be upon you and Allah's mercy and blessings. Praise be to Allah, Lord of the worlds."
                  },
                  {
                    category: "Introduction", 
                    text: "Magacaygu waa [Your Name]. Waxaan ku hadlayaa afka Soomaaliga.",
                    translation: "My name is [Your Name]. I am speaking in the Somali language."
                  },
                  {
                    category: "Family",
                    text: "Waan ku faraxsanahay inaan kula hadlayo afkeenna hooyo.",
                    translation: "I am happy to speak with you in our mother tongue."
                  },
                  {
                    category: "Heritage",
                    text: "Soomaaliya waa dal qurux badan oo taariikh dheer leh.",
                    translation: "Somalia is a beautiful country with a long history."
                  }
                ].map((phrase, index) => (
                  <div key={index} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-semibold text-emerald-400">{phrase.category}</h5>
                      <button className="text-xs bg-emerald-600 text-white px-2 py-1 rounded">
                        Use This
                      </button>
                    </div>
                    <p className="text-white text-sm mb-1">{phrase.text}</p>
                    <p className="text-gray-400 text-xs italic">{phrase.translation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clone Voice Tab */}
        {activeTab === 'clone' && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center mb-6">
                <Wand2 className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-xl font-bold text-white">Voice Cloning with OpenVoice V2</h2>
              </div>

              {isCloning && (
                <div className="mb-6">
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">Cloning Progress</span>
                      <span className="text-purple-400">{cloneProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${cloneProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-300 text-sm mt-2">
                      Creating your personalized Somali voice model...
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recordings.filter(r => r.type === 'voice-sample').map((recording) => (
                  <div key={recording.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <Mic className="w-8 h-8 text-purple-400" />
                      <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                        {recording.language.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-2 text-sm">{recording.title}</h3>
                    <div className="flex justify-between text-xs text-gray-400 mb-3">
                      <span>{recording.duration}</span>
                      <span>{recording.size}</span>
                    </div>
                    
                    <button
                      onClick={() => cloneVoice(recording.id)}
                      disabled={isCloning}
                      className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white py-2 px-3 rounded text-sm font-medium transition-colors"
                    >
                      {isCloning ? 'Cloning...' : 'Clone This Voice'}
                    </button>
                  </div>
                ))}
              </div>

              {recordings.filter(r => r.type === 'voice-sample').length === 0 && (
                <div className="text-center py-8">
                  <Mic className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">No voice samples yet</h3>
                  <p className="text-gray-500 mb-4">Record your Somali voice first to enable cloning</p>
                  <button
                    onClick={() => setActiveTab('record')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Record Voice Sample
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai-chat' && (
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <Brain className="w-6 h-6 text-emerald-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Somali AI Assistant</h2>
                </div>

                <div className="bg-gray-800/50 rounded-lg h-64 overflow-y-auto p-4 mb-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-gray-400 mt-20">
                      <Brain className="w-12 h-12 mx-auto mb-2" />
                      <p>Start a conversation in Somali!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatHistory.map((chat, index) => (
                        <div key={index}>
                          <div className="bg-blue-600 text-white p-3 rounded-lg mb-2 ml-8">
                            {chat.user}
                          </div>
                          <div className="bg-emerald-600 text-white p-3 rounded-lg mr-8">
                            {chat.ai}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendAIMessage()}
                    placeholder="Type your message in Somali..."
                    className="flex-1 bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                  <button
                    onClick={sendAIMessage}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Send
                  </button>
                </div>

                <div className="mt-4 p-3 bg-emerald-900/20 rounded-lg border border-emerald-500/30">
                  <p className="text-emerald-400 text-sm font-semibold mb-1">💡 Try asking:</p>
                  <ul className="text-emerald-300 text-xs space-y-1">
                    <li>• Salaan alaykum, sidee tahay?</li>
                    <li>• Maxaa ka fiican carruurta Islam u barashada?</li>
                    <li>• Sheeg wax Islamic ah oo Somali ah</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <Volume2 className="w-6 h-6 text-blue-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Generated Speech</h2>
                </div>

                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {recordings.filter(r => r.type === 'ai-response').map((recording) => (
                    <div key={recording.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <Volume2 className="w-6 h-6 text-blue-400" />
                        <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          AI GENERATED
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-white mb-2 text-sm">{recording.title}</h3>
                      <div className="flex justify-between text-xs text-gray-400 mb-3">
                        <span>{recording.duration}</span>
                        <span>{recording.size}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm">
                          <Play className="w-3 h-3 inline mr-1" />
                          Play
                        </button>
                        <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded text-sm">
                          <Download className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {recordings.filter(r => r.type === 'ai-response').length === 0 && (
                  <div className="text-center py-8">
                    <Volume2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-400 mb-2">No AI responses yet</h3>
                    <p className="text-gray-500">Chat with the AI to generate speech</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Recordings Library */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 text-blue-400 mr-3" />
              <h2 className="text-xl font-bold text-white">Voice Library</h2>
            </div>
            <div className="flex space-x-2">
              <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded">
                {recordings.filter(r => r.type === 'voice-sample').length} Samples
              </span>
              <span className="text-xs bg-emerald-600 text-white px-2 py-1 rounded">
                {recordings.filter(r => r.type === 'cloned-voice').length} Cloned
              </span>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                {recordings.filter(r => r.type === 'ai-response').length} AI Generated
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="aspect-video bg-gray-900 flex items-center justify-center">
                  {recording.type === 'voice-sample' && <Mic className="w-12 h-12 text-purple-400" />}
                  {recording.type === 'cloned-voice' && <Wand2 className="w-12 h-12 text-emerald-400" />}
                  {recording.type === 'ai-response' && <Brain className="w-12 h-12 text-blue-400" />}
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white text-sm">{recording.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${
                      recording.type === 'voice-sample' ? 'bg-purple-600 text-white' :
                      recording.type === 'cloned-voice' ? 'bg-emerald-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {recording.type.toUpperCase().replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>{recording.duration}</span>
                    <span>{recording.size}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{recording.created_at}</span>
                    <span className="capitalize">{recording.language}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm flex items-center justify-center">
                      <Play className="w-3 h-3 mr-1" />
                      Play
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm flex items-center justify-center">
                      <Share2 className="w-3 h-3 mr-1" />
                      Share
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded text-sm flex items-center justify-center">
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </button>
                    <button 
                      onClick={() => deleteRecording(recording.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recordings.length === 0 && (
            <div className="text-center py-12">
              <Wand2 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2">No recordings yet</h3>
              <p className="text-gray-500">Start by recording your Somali voice</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceCloneStudio;