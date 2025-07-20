import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Pause,
  Download, 
  Loader, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Users,
  Volume2,
  Waveform,
  Brain,
  Zap
} from 'lucide-react';
import OpenAIService, { MeetingSummary } from '../services/openai-service';

interface ProfessionalMeetingRecorderProps {
  onSummaryGenerated?: (summary: MeetingSummary) => void;
  userTier?: 'starter' | 'professional' | 'enterprise';
}

const ProfessionalMeetingRecorder: React.FC<ProfessionalMeetingRecorderProps> = ({ 
  onSummaryGenerated,
  userTier = 'professional'
}) => {
  // Core recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  
  // Meeting data
  const [meetingTitle, setMeetingTitle] = useState('');
  const [participants, setParticipants] = useState<string[]>(['']);
  const [transcript, setTranscript] = useState('');
  const [meetingSummary, setMeetingSummary] = useState<MeetingSummary | null>(null);
  
  // Technical state
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [error, setError] = useState('');
  const [processingStage, setProcessingStage] = useState('');
  
  // UI state
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  
  // Services
  const openAIService = new OpenAIService();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  // Audio level monitoring
  useEffect(() => {
    if (isRecording && analyserRef.current) {
      const updateAudioLevel = () => {
        const dataArray = new Uint8Array(analyserRef.current!.frequencyBinCount);
        analyserRef.current!.getByteFrequencyData(dataArray);
        
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average / 255);
        
        animationRef.current = requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      setError('');
      setProcessingStage('');
      
      // Request high-quality audio
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
          channelCount: 1
        }
      });

      // Set up audio context for level monitoring
      audioContextRef.current = new AudioContext();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      // Set up media recorder
      const recorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 128000
      });

      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        setAudioChunks(chunks);
        
        if (chunks.length > 0) {
          await processRecording(chunks);
        }
      };

      recorder.start(1000); // Collect data every second
      setMediaRecorder(recorder);
      setIsRecording(true);
      setRecordingTime(0);
      setAudioChunks([]);

    } catch (err) {
      console.error('Recording error:', err);
      setError('Unable to access microphone. Please check permissions and try again.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'paused') {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setIsPaused(false);
      setIsProcessing(true);
    }
  };

  const processRecording = async (chunks: Blob[]) => {
    try {
      setProcessingStage('Preparing audio file...');
      
      // Create audio file
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      const audioFile = new File([audioBlob], 'meeting-recording.webm', { type: 'audio/webm' });

      // Step 1: Transcribe audio
      setProcessingStage('Transcribing audio with AI...');
      const transcriptionResult = await openAIService.transcribeAudio(audioFile);
      setTranscript(transcriptionResult.text);

      // Step 2: Generate meeting summary
      setProcessingStage('Generating intelligent summary...');
      const summary = await openAIService.generateMeetingSummary({
        transcript: transcriptionResult.text,
        participants: participants.filter(p => p.trim()),
        meetingTitle: meetingTitle || undefined,
        language: transcriptionResult.language
      });

      // Step 3: Enhance with insights
      setProcessingStage('Analyzing insights and recommendations...');
      const insights = await openAIService.generateInsights(summary);
      
      const enhancedSummary = {
        ...summary,
        duration: recordingTime,
        insights
      };

      setMeetingSummary(enhancedSummary);
      setIsProcessing(false);
      setProcessingStage('');

      // Auto-save if enabled
      if (autoSave) {
        saveMeetingToHistory(enhancedSummary);
      }

      if (onSummaryGenerated) {
        onSummaryGenerated(enhancedSummary);
      }

    } catch (err) {
      console.error('Processing error:', err);
      setError('Failed to process meeting recording. Please try again.');
      setIsProcessing(false);
      setProcessingStage('');
    }
  };

  const saveMeetingToHistory = (summary: MeetingSummary) => {
    // Save to localStorage for now - in production, save to database
    const meetings = JSON.parse(localStorage.getItem('meeting-history') || '[]');
    meetings.unshift(summary);
    
    // Keep only last 50 meetings
    if (meetings.length > 50) {
      meetings.splice(50);
    }
    
    localStorage.setItem('meeting-history', JSON.stringify(meetings));
  };

  const downloadSummary = () => {
    if (!meetingSummary) return;

    const summaryContent = `
MEETING SUMMARY
${meetingTitle || 'Untitled Meeting'}
${new Date().toLocaleDateString()} | Duration: ${formatTime(recordingTime)}
Generated by AI Meeting Pro

PARTICIPANTS:
${participants.filter(p => p.trim()).map(p => `• ${p}`).join('\n') || '• Not specified'}

EXECUTIVE SUMMARY:
${meetingSummary.summary}

KEY POINTS:
${meetingSummary.keyPoints.map((point, i) => `${i + 1}. ${point}`).join('\n')}

ACTION ITEMS:
${meetingSummary.actionItems.map((item, i) => 
  `${i + 1}. ${item.task}\n   Assignee: ${item.assignee}\n   Deadline: ${item.deadline}\n   Priority: ${item.priority.toUpperCase()}\n`
).join('\n')}

KEY DECISIONS:
${meetingSummary.decisions.map((decision, i) => `${i + 1}. ${decision}`).join('\n')}

NEXT STEPS:
${meetingSummary.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

MEETING METRICS:
• Sentiment: ${meetingSummary.sentiment.toUpperCase()}
• Language: ${meetingSummary.language.toUpperCase()}
• AI Confidence: ${Math.round(meetingSummary.confidence * 100)}%
• Processing Quality: Professional Grade

---
Generated with AI Meeting Pro
Powered by Advanced Somali AI Dataset
Professional Meeting Intelligence Platform
    `;

    const blob = new Blob([summaryContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meeting-summary-${meetingTitle?.replace(/\s+/g, '-') || 'untitled'}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addParticipant = () => {
    setParticipants([...participants, '']);
  };

  const updateParticipant = (index: number, value: string) => {
    const updated = [...participants];
    updated[index] = value;
    setParticipants(updated);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      const updated = participants.filter((_, i) => i !== index);
      setParticipants(updated);
    }
  };

  const resetRecorder = () => {
    setMeetingSummary(null);
    setTranscript('');
    setRecordingTime(0);
    setError('');
    setProcessingStage('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          🎙️ Professional Meeting Recorder
        </h2>
        <p className="text-gray-400">
          Record, transcribe, and generate intelligent summaries with AI
        </p>
      </div>

      {/* Meeting Setup */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <Users className="w-5 h-5 mr-3" />
          Meeting Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Meeting Title
            </label>
            <input
              type="text"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              placeholder="e.g., Q4 Strategy Planning"
              className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Participants
            </label>
            {participants.map((participant, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={participant}
                  onChange={(e) => updateParticipant(index, e.target.value)}
                  placeholder="Participant name"
                  className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                {participants.length > 1 && (
                  <button
                    onClick={() => removeParticipant(index)}
                    className="ml-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addParticipant}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              + Add Participant
            </button>
          </div>
        </div>

        {/* Advanced Options */}
        <div className="mt-6">
          <button
            onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
            className="text-gray-400 hover:text-white transition-colors flex items-center"
          >
            <Zap className="w-4 h-4 mr-2" />
            Advanced Options
          </button>
          
          {showAdvancedOptions && (
            <div className="mt-4 p-4 bg-gray-800/30 rounded-lg border border-gray-600">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={autoSave}
                    onChange={(e) => setAutoSave(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Auto-save to history</span>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recording Interface */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
        <div className="text-center">
          {/* Recording Status */}
          {isRecording && (
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="animate-pulse bg-red-500 w-4 h-4 rounded-full mr-3"></div>
                <span className="text-red-400 font-bold text-2xl">{formatTime(recordingTime)}</span>
              </div>
              
              {/* Audio Level Indicator */}
              <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-4">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-red-500 rounded-full transition-all duration-100"
                  style={{ width: `${audioLevel * 100}%` }}
                ></div>
              </div>
              
              <p className="text-gray-400">Recording in progress... Speak clearly for best results</p>
            </div>
          )}

          {/* Processing Status */}
          {isProcessing && (
            <div className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 animate-pulse text-blue-400 mr-3" />
                <Loader className="w-6 h-6 animate-spin text-blue-400" />
              </div>
              <p className="text-blue-400 font-semibold text-lg">{processingStage}</p>
              <p className="text-gray-400 text-sm mt-2">Please wait while AI processes your meeting</p>
            </div>
          )}

          {/* Recording Controls */}
          <div className="flex justify-center space-x-4">
            {!isRecording && !isProcessing && !meetingSummary && (
              <button
                onClick={startRecording}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <Mic className="w-6 h-6 mr-3" />
                Start Recording
              </button>
            )}

            {isRecording && !isPaused && (
              <>
                <button
                  onClick={pauseRecording}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </button>
                <button
                  onClick={stopRecording}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop & Process
                </button>
              </>
            )}

            {isRecording && isPaused && (
              <>
                <button
                  onClick={resumeRecording}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Resume
                </button>
                <button
                  onClick={stopRecording}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop & Process
                </button>
              </>
            )}

            {meetingSummary && (
              <button
                onClick={resetRecorder}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Record New Meeting
              </button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 flex items-center justify-center text-red-400 bg-red-900/20 rounded-lg p-4 border border-red-500/30">
              <AlertCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Meeting Summary Results */}
      {meetingSummary && (
        <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-2xl p-8 border border-emerald-500/30">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-white flex items-center">
              <CheckCircle className="w-6 h-6 text-emerald-400 mr-3" />
              AI Meeting Summary Generated
            </h3>
            <div className="flex space-x-3">
              <button
                onClick={downloadSummary}
                className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Summary
              </button>
            </div>
          </div>

          {/* Meeting Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <Clock className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-semibold">{formatTime(recordingTime)}</div>
              <div className="text-gray-400 text-sm">Duration</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <Users className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
              <div className="text-white font-semibold">{meetingSummary.participants.length || 'N/A'}</div>
              <div className="text-gray-400 text-sm">Participants</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <Brain className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-semibold">{Math.round(meetingSummary.confidence * 100)}%</div>
              <div className="text-gray-400 text-sm">AI Confidence</div>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <Volume2 className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
              <div className="text-white font-semibold">{meetingSummary.sentiment.toUpperCase()}</div>
              <div className="text-gray-400 text-sm">Sentiment</div>
            </div>
          </div>

          {/* Summary Content */}
          <div className="space-y-6">
            {/* Executive Summary */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
              <h4 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Executive Summary
              </h4>
              <p className="text-gray-300 leading-relaxed">{meetingSummary.summary}</p>
            </div>

            {/* Key Points */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
              <h4 className="text-lg font-semibold text-blue-400 mb-4">🎯 Key Points</h4>
              <ul className="space-y-2">
                {meetingSummary.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="text-blue-400 mr-3 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
              <h4 className="text-lg font-semibold text-yellow-400 mb-4">✅ Action Items</h4>
              <div className="space-y-4">
                {meetingSummary.actionItems.map((item, index) => (
                  <div key={item.id} className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/30">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-white font-medium">{item.task}</h5>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        item.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {item.priority.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>👤 {item.assignee}</span>
                      <span>📅 {item.deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decisions and Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
                <h4 className="text-lg font-semibold text-purple-400 mb-4">🎯 Key Decisions</h4>
                <ul className="space-y-2">
                  {meetingSummary.decisions.map((decision, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-purple-400 mr-3 mt-1">•</span>
                      <span>{decision}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
                <h4 className="text-lg font-semibold text-pink-400 mb-4">🚀 Next Steps</h4>
                <ul className="space-y-2">
                  {meetingSummary.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-pink-400 mr-3 mt-1">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalMeetingRecorder;