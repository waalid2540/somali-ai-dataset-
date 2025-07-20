// AI Meeting Pro - Background Service Worker
// Handles extension lifecycle and communication

class BackgroundService {
  constructor() {
    this.setupEventListeners();
    this.activeMeetings = new Map();
  }

  setupEventListeners() {
    // Extension installation
    chrome.runtime.onInstalled.addListener((details) => {
      if (details.reason === 'install') {
        this.handleFirstInstall();
      }
    });

    // Tab updates - detect when user joins meetings
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.url) {
        this.checkForMeetingPlatform(tab);
      }
    });

    // Messages from content scripts
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true; // Keep message channel open for async responses
    });

    // Alarm for periodic checks
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === 'meeting-check') {
        this.checkActiveMeetings();
      }
    });

    // Start periodic meeting checks
    chrome.alarms.create('meeting-check', { periodInMinutes: 1 });
  }

  handleFirstInstall() {
    // Set default settings
    chrome.storage.sync.set({
      autoRecord: false,
      aiMeetingProEndpoint: 'https://your-domain.com',
      userApiKey: '',
      enabledPlatforms: {
        'google-meet': true,
        'zoom': true,
        'teams': true,
        'webex': true
      }
    });

    // Open welcome page
    chrome.tabs.create({
      url: 'https://your-domain.com/extension-setup'
    });
  }

  checkForMeetingPlatform(tab) {
    const url = new URL(tab.url);
    const hostname = url.hostname;

    // Check if it's a meeting platform
    const platforms = {
      'meet.google.com': 'Google Meet',
      'zoom.us': 'Zoom',
      'teams.microsoft.com': 'Microsoft Teams',
      'webex.com': 'Webex'
    };

    for (const [domain, platform] of Object.entries(platforms)) {
      if (hostname.includes(domain)) {
        this.notifyMeetingDetected(tab.id, platform);
        break;
      }
    }
  }

  notifyMeetingDetected(tabId, platform) {
    // Show notification that AI Meeting Pro is available
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'AI Meeting Pro Ready!',
      message: `${platform} detected. Click the AI button to start recording.`
    });

    // Store active meeting
    this.activeMeetings.set(tabId, {
      platform,
      startTime: Date.now(),
      isRecording: false
    });
  }

  async handleMessage(message, sender, sendResponse) {
    switch (message.action) {
      case 'recording_started':
        await this.handleRecordingStarted(message, sender);
        sendResponse({ success: true });
        break;

      case 'recording_stopped':
        await this.handleRecordingStopped(message, sender);
        sendResponse({ success: true });
        break;

      case 'process_audio':
        await this.processAudioWithAI(message.audioBlob, message.meetingData);
        sendResponse({ success: true });
        break;

      case 'get_settings':
        const settings = await chrome.storage.sync.get([
          'autoRecord',
          'aiMeetingProEndpoint',
          'userApiKey',
          'enabledPlatforms'
        ]);
        sendResponse(settings);
        break;

      case 'save_settings':
        await chrome.storage.sync.set(message.settings);
        sendResponse({ success: true });
        break;

      default:
        sendResponse({ error: 'Unknown action' });
    }
  }

  async handleRecordingStarted(message, sender) {
    const tabId = sender.tab.id;
    
    if (this.activeMeetings.has(tabId)) {
      const meeting = this.activeMeetings.get(tabId);
      meeting.isRecording = true;
      meeting.recordingStartTime = Date.now();
      meeting.meetingData = message.meetingData;
    }

    // Update badge to show recording status
    chrome.action.setBadgeText({
      text: 'REC',
      tabId: tabId
    });
    
    chrome.action.setBadgeBackgroundColor({
      color: '#ef4444',
      tabId: tabId
    });
  }

  async handleRecordingStopped(message, sender) {
    const tabId = sender.tab.id;
    
    if (this.activeMeetings.has(tabId)) {
      const meeting = this.activeMeetings.get(tabId);
      meeting.isRecording = false;
      meeting.recordingEndTime = Date.now();
    }

    // Clear badge
    chrome.action.setBadgeText({
      text: '',
      tabId: tabId
    });
  }

  async processAudioWithAI(audioBlob, meetingData) {
    try {
      // Get user settings
      const settings = await chrome.storage.sync.get([
        'aiMeetingProEndpoint',
        'userApiKey'
      ]);

      if (!settings.userApiKey) {
        throw new Error('User API key not configured');
      }

      // Prepare form data
      const formData = new FormData();
      formData.append('audio', audioBlob, 'meeting-recording.webm');
      formData.append('meetingData', JSON.stringify(meetingData));

      // Send to AI Meeting Pro API
      const response = await fetch(`${settings.aiMeetingProEndpoint}/api/process-meeting`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${settings.userApiKey}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();
      
      // Show success notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Meeting Summary Ready!',
        message: 'Your AI-generated meeting summary is available in your dashboard.'
      });

      return result;

    } catch (error) {
      console.error('Failed to process audio:', error);
      
      // Show error notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Processing Failed',
        message: 'Unable to process meeting recording. Please try again.'
      });
      
      throw error;
    }
  }

  checkActiveMeetings() {
    // Clean up old meetings
    const now = Date.now();
    const maxAge = 4 * 60 * 60 * 1000; // 4 hours

    for (const [tabId, meeting] of this.activeMeetings.entries()) {
      if (now - meeting.startTime > maxAge) {
        this.activeMeetings.delete(tabId);
        
        // Clear badge if still set
        chrome.action.setBadgeText({
          text: '',
          tabId: parseInt(tabId)
        });
      }
    }
  }
}

// Initialize background service
new BackgroundService();