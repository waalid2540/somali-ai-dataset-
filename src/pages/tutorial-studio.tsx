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
  Edit3,
  Share2
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
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [recordingMode, setRecordingMode] = useState<'screen' | 'webcam' | 'mixed'>('screen');
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Load saved recordings on component mount
  useEffect(() => {
    const savedRecordings = JSON.parse(localStorage.getItem('tutorial-recordings') || '[]');
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

  const startRecording = async () => {
    try {
      let stream: MediaStream;
      
      if (recordingMode === 'screen') {
        // Try simple approach first
        try {
          // Screen recording with microphone
          const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
            video: true,
            audio: true
          });
          
          const micStream = await navigator.mediaDevices.getUserMedia({ 
            video: false,
            audio: true
          });
          
          // Simple approach: just combine tracks without Web Audio API
          const allTracks = [
            ...screenStream.getVideoTracks(),
            ...screenStream.getAudioTracks(),
            ...micStream.getAudioTracks()
          ];
          
          stream = new MediaStream(allTracks);
          (stream as any)._originalStreams = [screenStream, micStream];
          
        } catch (audioError) {
          console.warn('Audio mixing failed, trying screen-only:', audioError);
          
          // Fallback: screen with mic only
          const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
            video: true,
            audio: false
          });
          
          const micStream = await navigator.mediaDevices.getUserMedia({ 
            video: false,
            audio: true
          });
          
          stream = new MediaStream([
            ...screenStream.getVideoTracks(),
            ...micStream.getAudioTracks()
          ]);
          
          (stream as any)._originalStreams = [screenStream, micStream];
        }
        
      } else if (recordingMode === 'webcam') {
        // Webcam recording - this works fine
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: true
        });
      } else {
        // Mixed mode - screen + webcam with simple approach
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ 
          video: true,
          audio: true
        });
        
        const webcamStream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: true
        });
        
        // Create canvas for video mixing
        const canvas = document.createElement('canvas');
        canvas.width = 1920;
        canvas.height = 1080;
        const ctx = canvas.getContext('2d')!;
        
        // Create video elements and add to DOM temporarily
        const screenVideo = document.createElement('video');
        const webcamVideo = document.createElement('video');
        
        // Set up video elements
        screenVideo.srcObject = screenStream;
        webcamVideo.srcObject = webcamStream;
        screenVideo.muted = true;
        webcamVideo.muted = true;
        screenVideo.autoplay = true;
        webcamVideo.autoplay = true;
        
        // Handle screen sharing track changes (when user switches screens)
        screenStream.getVideoTracks()[0].addEventListener('ended', () => {
          console.log('Screen sharing ended - user may have switched screens');
          // Try to refresh the screen capture
          if (shouldContinueDrawing) {
            navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
              .then(newScreenStream => {
                screenVideo.srcObject = newScreenStream;
                // Update the stream tracks
                const videoTrack = newScreenStream.getVideoTracks()[0];
                if (videoTrack) {
                  // Replace the old track
                  const sender = stream.getVideoTracks().find(track => track.kind === 'video');
                  if (sender) {
                    stream.removeTrack(sender);
                    stream.addTrack(videoTrack);
                  }
                }
              })
              .catch(err => console.log('Failed to refresh screen capture:', err));
          }
        });
        
        // Hide video elements but add to DOM for proper loading
        screenVideo.style.position = 'absolute';
        screenVideo.style.top = '-9999px';
        webcamVideo.style.position = 'absolute';
        webcamVideo.style.top = '-9999px';
        
        document.body.appendChild(screenVideo);
        document.body.appendChild(webcamVideo);
        
        // Wait for videos to load and start playing
        await new Promise((resolve) => {
          let loadedCount = 0;
          
          const checkLoaded = () => {
            loadedCount++;
            if (loadedCount === 2) {
              // Longer delay to ensure videos are ready
              setTimeout(resolve, 500);
            }
          };
          
          screenVideo.onloadedmetadata = () => {
            screenVideo.play().then(checkLoaded);
          };
          
          webcamVideo.onloadedmetadata = () => {
            webcamVideo.play().then(checkLoaded);
          };
          
          // Fallback timeout
          setTimeout(resolve, 3000);
        });
        
        // Simple audio combining - just use all audio tracks
        const allAudioTracks = [
          ...screenStream.getAudioTracks(),
          ...webcamStream.getAudioTracks()
        ];
        
        // Start the drawing animation
        let animationFrame: number | null = null;
        let isDrawing = false;
        
        let shouldContinueDrawing = true;
        
        const drawFrame = () => {
          if (shouldContinueDrawing && !isDrawing) {
            isDrawing = true;
            
            try {
              // Clear canvas with black background
              ctx.fillStyle = '#000000';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              
              // Always draw screen capture (full canvas)
              if (screenVideo.readyState >= 2 && screenVideo.videoWidth > 0 && screenVideo.videoHeight > 0) {
                ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
              } else {
                // Show loading message if screen not ready
                ctx.fillStyle = '#333333';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = 'white';
                ctx.font = '48px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Loading screen...', canvas.width / 2, canvas.height / 2);
              }
              
              // Always draw webcam in bottom-right corner (picture-in-picture)
              if (webcamVideo.readyState >= 2 && webcamVideo.videoWidth > 0 && webcamVideo.videoHeight > 0) {
                const webcamWidth = 320;
                const webcamHeight = 240;
                const margin = 20;
                
                // White border for webcam (more visible)
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.fillRect(
                  canvas.width - webcamWidth - margin - 5,
                  canvas.height - webcamHeight - margin - 5,
                  webcamWidth + 10,
                  webcamHeight + 10
                );
                
                // Draw webcam video
                ctx.drawImage(
                  webcamVideo,
                  canvas.width - webcamWidth - margin,
                  canvas.height - webcamHeight - margin,
                  webcamWidth,
                  webcamHeight
                );
              } else {
                // Show webcam placeholder
                const webcamWidth = 320;
                const webcamHeight = 240;
                const margin = 20;
                
                ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
                ctx.fillRect(
                  canvas.width - webcamWidth - margin,
                  canvas.height - webcamHeight - margin,
                  webcamWidth,
                  webcamHeight
                );
                ctx.fillStyle = 'white';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(
                  'Loading webcam...', 
                  canvas.width - webcamWidth/2 - margin, 
                  canvas.height - webcamHeight/2 - margin
                );
              }
            } catch (error) {
              console.log('Canvas drawing error:', error);
            }
            
            isDrawing = false;
            
            if (shouldContinueDrawing) {
              animationFrame = requestAnimationFrame(drawFrame);
            }
          }
        };
        
        // Start drawing immediately and also show preview
        console.log('Starting mixed mode canvas drawing...');
        setTimeout(() => {
          console.log('Canvas setup - Screen video ready:', screenVideo.readyState, 'Webcam video ready:', webcamVideo.readyState);
          animationFrame = requestAnimationFrame(drawFrame);
        }, 1000);
        
        // Create combined stream with canvas video + all audio
        const canvasStream = canvas.captureStream(30);
        stream = new MediaStream([
          ...canvasStream.getVideoTracks(),
          ...allAudioTracks
        ]);
        
        // Store references for cleanup
        (stream as any)._originalStreams = [screenStream, webcamStream];
        (stream as any)._videoElements = [screenVideo, webcamVideo];
        (stream as any)._animationFrame = animationFrame;
        (stream as any)._shouldContinueDrawing = () => { shouldContinueDrawing = false; };
      }

      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Simple MediaRecorder setup
      let mediaRecorder: MediaRecorder;
      
      try {
        // Try with webm first
        if (MediaRecorder.isTypeSupported('video/webm')) {
          mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        } else {
          // Fallback to default
          mediaRecorder = new MediaRecorder(stream);
        }
      } catch (error) {
        // Ultimate fallback
        mediaRecorder = new MediaRecorder(stream);
      }
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
          title: `Recording ${new Date().toLocaleString()}`,
          duration: formatTime(recordingTime),
          size: `${(blob.size / (1024 * 1024)).toFixed(1)} MB`,
          created_at: new Date().toISOString().split('T')[0],
          thumbnail: url,
          type: recordingMode
        };
        
        // Save recording to localStorage for persistence
        const savedRecordings = JSON.parse(localStorage.getItem('tutorial-recordings') || '[]');
        savedRecordings.unshift(newRecording);
        localStorage.setItem('tutorial-recordings', JSON.stringify(savedRecordings));
        
        // Save the actual video blob for download
        const videoData = {
          id: newRecording.id,
          blob: blob,
          url: url
        };
        const savedVideos = JSON.parse(localStorage.getItem('tutorial-videos') || '{}');
        savedVideos[newRecording.id] = {
          url: url,
          blob: blob
        };
        localStorage.setItem('tutorial-videos', JSON.stringify(savedVideos));
        
        setRecordings(prev => [newRecording, ...prev]);
        setRecordingTime(0);
        
        // Show success message without auto-download
        alert(`✅ Recording saved! 
⏱️ Duration: ${formatTime(recordingTime)}
📊 Size: ${(blob.size / (1024 * 1024)).toFixed(1)} MB

Use the Download or Share buttons in your recordings library below.`);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      
      let errorMessage = 'Could not start recording. ';
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          errorMessage += 'Please grant permission to access your camera/screen.';
        } else if (error.name === 'NotFoundError') {
          errorMessage += 'No camera or microphone found.';
        } else if (error.name === 'NotSupportedError') {
          errorMessage += 'Recording not supported in this browser.';
        } else {
          errorMessage += `Error: ${error.message}`;
        }
      } else {
        errorMessage += 'Please try again or use a different browser.';
      }
      
      alert(errorMessage);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && streamRef.current) {
      setIsRecording(false);
      
      // Stop drawing animation for mixed mode
      const stopDrawing = (streamRef.current as any)._shouldContinueDrawing;
      if (stopDrawing) {
        stopDrawing();
      }
      
      // Stop animation frame if it exists
      const animationFrame = (streamRef.current as any)._animationFrame;
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      mediaRecorderRef.current.stop();
      
      // Stop main stream
      streamRef.current.getTracks().forEach(track => track.stop());
      
      // Stop original streams if they exist
      const originalStreams = (streamRef.current as any)._originalStreams;
      if (originalStreams) {
        originalStreams.forEach((stream: MediaStream) => {
          stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        });
      }
      
      // Clean up video elements
      const videoElements = (streamRef.current as any)._videoElements;
      if (videoElements) {
        videoElements.forEach((video: HTMLVideoElement) => {
          if (video.parentNode) {
            video.parentNode.removeChild(video);
          }
        });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('api_key');
    window.location.href = '/login';
  };

  const deleteRecording = (id: string) => {
    setRecordings(prev => prev.filter(r => r.id !== id));
    
    // Update localStorage
    const savedRecordings = JSON.parse(localStorage.getItem('tutorial-recordings') || '[]');
    const updatedRecordings = savedRecordings.filter((r: Recording) => r.id !== id);
    localStorage.setItem('tutorial-recordings', JSON.stringify(updatedRecordings));
    
    // Remove video data
    const savedVideos = JSON.parse(localStorage.getItem('tutorial-videos') || '{}');
    delete savedVideos[id];
    localStorage.setItem('tutorial-videos', JSON.stringify(savedVideos));
  };

  const downloadRecording = (id: string, title: string) => {
    const savedVideos = JSON.parse(localStorage.getItem('tutorial-videos') || '{}');
    const videoData = savedVideos[id];
    
    if (videoData && videoData.url) {
      const a = document.createElement('a');
      a.href = videoData.url;
      a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp4`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Show success message
      alert(`✅ Video saved to your Downloads folder as: ${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.mp4`);
    } else {
      alert('Video data not found. This may happen after browser restart.');
    }
  };

  const viewRecording = (id: string) => {
    const savedVideos = JSON.parse(localStorage.getItem('tutorial-videos') || '{}');
    const videoData = savedVideos[id];
    
    if (videoData && videoData.url) {
      window.open(videoData.url, '_blank');
    } else {
      alert('Video data not found. This may happen after browser restart.');
    }
  };

  const shareRecording = async (id: string, title: string) => {
    const savedVideos = JSON.parse(localStorage.getItem('tutorial-videos') || '{}');
    const videoData = savedVideos[id];
    
    if (!videoData || !videoData.blob) {
      alert('Video data not found. This may happen after browser restart.');
      return;
    }

    // Create a File object for sharing
    const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.webm`;
    const file = new File([videoData.blob], fileName, { type: 'video/webm' });

    // Check if Web Share API is supported (for mobile and some desktop browsers)
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: `Tutorial: ${title}`,
          text: 'Check out this tutorial recording!',
          files: [file]
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to manual sharing options
        showShareOptions(videoData.url, title);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      showShareOptions(videoData.url, title);
    }
  };

  const showShareOptions = (videoUrl: string, title: string) => {
    const shareText = `Check out this tutorial: ${title}`;
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(videoUrl);

    const shareOptions = [
      { name: 'Copy Link', action: () => copyVideoLink(videoUrl, title) },
      { name: 'Download & Share', action: () => downloadRecording(title.split(' ')[0], title) },
      { name: 'WhatsApp', action: () => window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`) },
      { name: 'Twitter', action: () => window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`) },
      { name: 'LinkedIn', action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`) }
    ];

    const choice = prompt(`Choose sharing option:
1. Copy Link
2. Download & Share  
3. WhatsApp
4. Twitter
5. LinkedIn

Enter number (1-5):`);

    const optionIndex = parseInt(choice || '0') - 1;
    if (optionIndex >= 0 && optionIndex < shareOptions.length) {
      shareOptions[optionIndex].action();
    }
  };

  const copyVideoLink = (url: string, title: string) => {
    navigator.clipboard.writeText(url).then(() => {
      alert(`✅ Video link copied to clipboard!\n\nTitle: ${title}\nYou can now paste this link anywhere to share your tutorial.`);
    }).catch(() => {
      alert('Failed to copy link to clipboard. Please try downloading the video instead.');
    });
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
                  
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button 
                      onClick={() => viewRecording(recording.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button 
                      onClick={() => shareRecording(recording.id, recording.title)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm flex items-center justify-center"
                      title="Share recording"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => downloadRecording(recording.id, recording.title)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded text-sm flex items-center justify-center"
                      title="Download recording"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                    <button 
                      onClick={() => deleteRecording(recording.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded text-sm"
                      title="Delete recording"
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