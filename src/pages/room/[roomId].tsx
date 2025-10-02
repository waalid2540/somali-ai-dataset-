// Jitsi Video Meeting Room - Dynamic room based on URL
import React, { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  PhoneOff,
  Settings,
  Users,
  MessageSquare,
  MoreVertical,
  Camera,
  Speaker
} from 'lucide-react';

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

interface User {
  id: string;
  email: string;
  name?: string;
}

// Replace this with your actual backend API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function MeetingRoom() {
  const router = useRouter();
  const { roomId, name } = router.query;
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [meetingLoaded, setMeetingLoaded] = useState(false);
  const [participantCount, setParticipantCount] = useState(1);

  useEffect(() => {
    checkUserAndSubscription();
  }, []);

  useEffect(() => {
    if (roomId && user && isSubscribed && !jitsiApiRef.current) {
      loadJitsiMeet();
    }

    return () => {
      // Cleanup Jitsi when component unmounts
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
    };
  }, [roomId, user, isSubscribed]);

  const checkUserAndSubscription = async () => {
    try {
      // Call your backend API to get current user
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        withCredentials: true
      });

      const userData = response.data;
      setUser(userData);

      if (userData) {
        const subscribed = await checkSubscription(userData.id);
        setIsSubscribed(subscribed);

        if (!subscribed) {
          // Redirect to subscription page if not subscribed
          router.push('/video-meetings');
        }
      } else {
        // Redirect to login if not authenticated
        router.push('/login?redirect=/video-meetings');
      }
    } catch (error) {
      console.error('Error getting user:', error);
      router.push('/login?redirect=/video-meetings');
    }

    setLoading(false);
  };

  const checkSubscription = async (userId: string): Promise<boolean> => {
    try {
      // Call your backend API to check subscription
      const response = await axios.get(`${API_BASE_URL}/subscriptions/check/${userId}`, {
        withCredentials: true
      });

      return response.data.isSubscribed;
    } catch (error) {
      console.error('Error checking subscription:', error);
      return false;
    }
  };

  const loadJitsiMeet = () => {
    if (!jitsiContainerRef.current || !roomId) return;

    // Load Jitsi Meet script
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = () => initializeJitsi();
    document.body.appendChild(script);
  };

  const initializeJitsi = () => {
    if (!jitsiContainerRef.current || !roomId || !user) return;

    const domain = 'meet.jit.si'; // Using Jitsi's free server, you can self-host later
    const options = {
      roomName: `SomaiData_${roomId}`, // Prefix to avoid collisions
      width: '100%',
      height: '100%',
      parentNode: jitsiContainerRef.current,
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        disableDeepLinking: true,
        enableClosePage: false,
        defaultLanguage: 'en',
        toolbarButtons: [
          'microphone',
          'camera',
          'closedcaptions',
          'desktop',
          'fullscreen',
          'fodeviceselection',
          'hangup',
          'profile',
          'chat',
          'recording',
          'livestreaming',
          'etherpad',
          'sharedvideo',
          'settings',
          'raisehand',
          'videoquality',
          'filmstrip',
          'invite',
          'feedback',
          'stats',
          'shortcuts',
          'tileview',
          'videobackgroundblur',
          'download',
          'help',
          'mute-everyone',
          'security'
        ],
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        SHOW_BRAND_WATERMARK: false,
        BRAND_WATERMARK_LINK: '',
        SHOW_POWERED_BY: false,
        DISPLAY_WELCOME_PAGE_CONTENT: false,
        DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
        APP_NAME: 'Somai Data Meetings',
        NATIVE_APP_NAME: 'Somai Data Meetings',
        PROVIDER_NAME: 'Somai Data',
        MOBILE_APP_PROMO: false,
        TOOLBAR_ALWAYS_VISIBLE: true,
      },
      userInfo: {
        displayName: name || user.email?.split('@')[0] || 'Guest',
        email: user.email || undefined,
      }
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    jitsiApiRef.current = api;

    // Event listeners
    api.addEventListener('videoConferenceJoined', () => {
      setMeetingLoaded(true);
      console.log('✅ Joined meeting successfully');
    });

    api.addEventListener('participantJoined', () => {
      updateParticipantCount();
    });

    api.addEventListener('participantLeft', () => {
      updateParticipantCount();
    });

    api.addEventListener('videoConferenceLeft', () => {
      console.log('👋 Left meeting');
      router.push('/video-meetings');
    });

    api.addEventListener('readyToClose', () => {
      router.push('/video-meetings');
    });
  };

  const updateParticipantCount = () => {
    if (jitsiApiRef.current) {
      const participants = jitsiApiRef.current.getParticipantsInfo();
      setParticipantCount(participants.length + 1); // +1 for current user
    }
  };

  const leaveMeeting = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('hangup');
    }
    router.push('/video-meetings');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading meeting room...</p>
        </div>
      </div>
    );
  }

  if (!isSubscribed) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Video className="w-20 h-20 text-gray-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Subscription Required</h2>
          <p className="text-gray-400 mb-6">
            Subscribe to Somai Data Video Meetings at $9.99/month for unlimited access.
          </p>
          <button
            onClick={() => router.push('/video-meetings')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all"
          >
            View Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{name || 'Meeting Room'} | Somai Data Meetings</title>
      </Head>
      <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white font-bold">{name || 'Meeting Room'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">{participantCount} {participantCount === 1 ? 'participant' : 'participants'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-gray-400 text-sm">
              Unlimited time • No restrictions
            </div>
            <button
              onClick={leaveMeeting}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
            >
              <PhoneOff className="w-4 h-4" />
              Leave
            </button>
          </div>
        </div>

        {/* Jitsi Meeting Container */}
        <div className="flex-1 relative">
          <div
            ref={jitsiContainerRef}
            className="absolute inset-0 w-full h-full"
          />

          {!meetingLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-white text-xl">Connecting to meeting...</p>
                <p className="text-gray-400 mt-2">Please allow camera and microphone access</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Info Bar */}
        <div className="bg-gray-800 border-t border-gray-700 px-6 py-2 z-10">
          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-400">
              🔒 End-to-end encrypted • Powered by Jitsi
            </div>
            <div className="text-gray-400">
              Somai Data Video Meetings - $9.99/month unlimited
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
