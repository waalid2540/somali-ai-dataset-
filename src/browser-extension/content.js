// AI Meeting Pro - Content Script for Meeting Platform Integration
// Automatically detects and records meetings from various platforms

class MeetingDetector {
  constructor() {
    this.isRecording = false;
    this.meetingPlatform = this.detectPlatform();
    this.audioContext = null;
    this.mediaRecorder = null;
    this.recordedChunks = [];
    this.meetingData = {
      title: '',
      participants: [],
      startTime: null,
      platform: this.meetingPlatform
    };
    
    this.init();
  }

  detectPlatform() {
    const hostname = window.location.hostname;
    
    if (hostname.includes('meet.google.com')) return 'google-meet';
    if (hostname.includes('zoom.us')) return 'zoom';
    if (hostname.includes('teams.microsoft.com')) return 'teams';
    if (hostname.includes('webex.com')) return 'webex';
    
    return 'unknown';
  }

  init() {
    this.injectUI();
    this.detectMeetingStart();
    this.setupMessageListener();
    console.log(`AI Meeting Pro: Initialized for ${this.meetingPlatform}`);
  }

  injectUI() {
    // Create floating AI Meeting Pro button
    const floatingButton = document.createElement('div');
    floatingButton.id = 'ai-meeting-pro-button';
    floatingButton.innerHTML = `
      <div class="ai-meeting-button">
        <div class="ai-status ${this.isRecording ? 'recording' : 'ready'}">
          <span class="ai-icon">🤖</span>
          <span class="ai-text">${this.isRecording ? 'Recording...' : 'AI Meeting Pro'}</span>
        </div>
        <div class="ai-controls">
          <button id="start-ai-recording" ${this.isRecording ? 'disabled' : ''}>
            ${this.isRecording ? '⏹️ Stop' : '🎙️ Start AI Recording'}
          </button>
        </div>
      </div>
    `;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
      .ai-meeting-button {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: linear-gradient(135deg, #1e3a8a, #059669);
        border-radius: 12px;
        padding: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        backdrop-filter: blur(10px);
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .ai-status {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 600;
      }
      
      .ai-status.recording .ai-icon {
        animation: pulse 1s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .ai-icon {
        margin-right: 6px;
        font-size: 16px;
      }
      
      #start-ai-recording {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        padding: 8px 12px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.2s;
      }
      
      #start-ai-recording:hover:not(:disabled) {
        background: rgba(255,255,255,0.3);
        transform: translateY(-1px);
      }
      
      #start-ai-recording:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(floatingButton);

    // Add event listeners
    document.getElementById('start-ai-recording').addEventListener('click', () => {
      if (this.isRecording) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    });
  }

  detectMeetingStart() {
    // Platform-specific meeting detection
    switch (this.meetingPlatform) {
      case 'google-meet':
        this.detectGoogleMeetStart();
        break;
      case 'zoom':
        this.detectZoomStart();
        break;
      case 'teams':
        this.detectTeamsStart();
        break;
      case 'webex':
        this.detectWebexStart();
        break;
    }
  }

  detectGoogleMeetStart() {
    // Watch for Google Meet specific elements
    const observer = new MutationObserver((mutations) => {
      // Check if we're in an active meeting
      const meetingTitle = document.querySelector('[data-meeting-title]') || 
                          document.querySelector('div[jsname="r4nke"]');
      
      if (meetingTitle && !this.meetingData.title) {
        this.meetingData.title = meetingTitle.textContent || 'Google Meet';
        this.updateMeetingInfo();
      }

      // Detect participants
      const participantElements = document.querySelectorAll('[data-participant-id]');
      if (participantElements.length > 0) {
        this.meetingData.participants = Array.from(participantElements)
          .map(el => el.getAttribute('aria-label') || 'Unknown')
          .filter(name => name !== 'Unknown');
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }

  detectZoomStart() {
    // Watch for Zoom specific elements
    const observer = new MutationObserver((mutations) => {
      // Zoom meeting title
      const meetingTitle = document.querySelector('.meeting-topic') ||
                          document.querySelector('[class*="meeting-title"]');
      
      if (meetingTitle && !this.meetingData.title) {
        this.meetingData.title = meetingTitle.textContent || 'Zoom Meeting';
        this.updateMeetingInfo();
      }

      // Zoom participants
      const participantList = document.querySelector('.participants-list') ||
                             document.querySelector('[class*="participant"]');
      
      if (participantList) {
        const participants = participantList.querySelectorAll('[class*="participant-name"]');
        this.meetingData.participants = Array.from(participants)
          .map(el => el.textContent.trim())
          .filter(name => name);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  detectTeamsStart() {
    // Microsoft Teams detection logic
    const observer = new MutationObserver((mutations) => {
      // Teams meeting title
      const meetingTitle = document.querySelector('[data-tid="meeting-title"]') ||
                          document.querySelector('.ts-calling-thread-header');
      
      if (meetingTitle && !this.meetingData.title) {
        this.meetingData.title = meetingTitle.textContent || 'Teams Meeting';
        this.updateMeetingInfo();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  detectWebexStart() {
    // Webex detection logic
    const observer = new MutationObserver((mutations) => {
      const meetingTitle = document.querySelector('.meeting-header-title') ||
                          document.querySelector('[class*="meeting-title"]');
      
      if (meetingTitle && !this.meetingData.title) {
        this.meetingData.title = meetingTitle.textContent || 'Webex Meeting';
        this.updateMeetingInfo();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  async startRecording() {
    try {
      // Request screen capture with audio
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // Set up MediaRecorder
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8,opus'
      });

      this.recordedChunks = [];
      this.meetingData.startTime = new Date().toISOString();

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.processRecording();
      };

      this.mediaRecorder.start(1000); // Collect data every second
      this.isRecording = true;
      this.updateUI();

      // Notify background script
      chrome.runtime.sendMessage({
        action: 'recording_started',
        meetingData: this.meetingData
      });

    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Unable to start recording. Please ensure you grant screen sharing permissions.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
      this.isRecording = false;
      this.updateUI();
    }
  }

  async processRecording() {
    try {
      // Create video blob
      const videoBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
      
      // Extract audio from video
      const audioBlob = await this.extractAudioFromVideo(videoBlob);
      
      // Send to AI Meeting Pro for processing
      await this.sendToAIMeetingPro(audioBlob);
      
    } catch (error) {
      console.error('Failed to process recording:', error);
    }
  }

  async extractAudioFromVideo(videoBlob) {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const audioContext = new AudioContext();
      
      video.src = URL.createObjectURL(videoBlob);
      video.onloadedmetadata = () => {
        // For now, return the video blob - in production, extract audio
        resolve(videoBlob);
      };
    });
  }

  async sendToAIMeetingPro(audioBlob) {
    try {
      // Get user's AI Meeting Pro API endpoint
      const result = await chrome.storage.sync.get(['aiMeetingProEndpoint', 'userApiKey']);
      
      const formData = new FormData();
      formData.append('audio', audioBlob, 'meeting-recording.webm');
      formData.append('meetingData', JSON.stringify(this.meetingData));
      
      const response = await fetch(`${result.aiMeetingProEndpoint || 'https://your-domain.com'}/api/process-meeting`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${result.userApiKey}`,
        },
        body: formData
      });
      
      if (response.ok) {
        const summary = await response.json();
        this.showSummaryNotification(summary);
      }
      
    } catch (error) {
      console.error('Failed to send to AI Meeting Pro:', error);
    }
  }

  showSummaryNotification(summary) {
    // Show notification that summary is ready
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="position: fixed; top: 80px; right: 20px; z-index: 10001; background: #059669; color: white; padding: 16px; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.3);">
        <h4 style="margin: 0 0 8px 0; font-size: 14px;">✅ Meeting Summary Ready!</h4>
        <p style="margin: 0 0 8px 0; font-size: 12px;">Your AI-generated summary is available</p>
        <button onclick="window.open('https://your-domain.com/dashboard', '_blank')" style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 11px;">
          View Summary
        </button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
      notification.remove();
    }, 10000);
  }

  updateMeetingInfo() {
    // Update UI with meeting information
    const textElement = document.querySelector('.ai-text');
    if (textElement) {
      textElement.textContent = `${this.meetingData.title.substring(0, 20)}...`;
    }
  }

  updateUI() {
    const button = document.getElementById('start-ai-recording');
    const status = document.querySelector('.ai-status');
    
    if (button) {
      button.textContent = this.isRecording ? '⏹️ Stop AI Recording' : '🎙️ Start AI Recording';
      button.disabled = false;
    }
    
    if (status) {
      status.className = `ai-status ${this.isRecording ? 'recording' : 'ready'}`;
    }
  }

  setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'get_meeting_status') {
        sendResponse({
          isRecording: this.isRecording,
          meetingData: this.meetingData,
          platform: this.meetingPlatform
        });
      }
    });
  }
}

// Initialize when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new MeetingDetector();
  });
} else {
  new MeetingDetector();
}