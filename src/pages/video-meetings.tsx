// Video Meetings Platform - Zoom Competitor at $9.99/month unlimited
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  Users,
  Calendar,
  Clock,
  Link as LinkIcon,
  Copy,
  Check,
  Crown,
  Zap,
  Shield,
  Globe,
  Share2,
  Plus,
  ArrowRight
} from 'lucide-react';

interface Meeting {
  id: string;
  room_name: string;
  meeting_url: string;
  created_by: string;
  created_at: string;
  is_active: boolean;
}

export default function VideoMeetings() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMeetingName, setNewMeetingName] = useState('');
  const [copiedUrl, setCopiedUrl] = useState('');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      await checkSubscription(user.id);
      await loadMeetings(user.id);
    }

    setLoading(false);
  };

  const checkSubscription = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('status')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      setIsSubscribed(!!data && !error);
    } catch (error) {
      console.error('Error checking subscription:', error);
      setIsSubscribed(false);
    }
  };

  const loadMeetings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('meetings')
        .select('*')
        .eq('created_by', userId)
        .order('created_at', { ascending: false });

      if (data && !error) {
        setMeetings(data);
      }
    } catch (error) {
      console.error('Error loading meetings:', error);
    }
  };

  const createMeeting = async () => {
    if (!user || !newMeetingName.trim()) return;

    const roomId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const meetingUrl = `${window.location.origin}/room/${roomId}`;

    try {
      const { data, error } = await supabase
        .from('meetings')
        .insert([{
          room_name: newMeetingName,
          meeting_url: meetingUrl,
          created_by: user.id,
          is_active: true
        }])
        .select()
        .single();

      if (data && !error) {
        setMeetings([data, ...meetings]);
        setShowCreateModal(false);
        setNewMeetingName('');

        // Join the meeting immediately
        router.push(`/room/${roomId}?name=${encodeURIComponent(newMeetingName)}`);
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  const copyMeetingUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2000);
  };

  const joinMeeting = (roomId: string, roomName: string) => {
    router.push(`/room/${roomId}?name=${encodeURIComponent(roomName)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Landing page for non-subscribed users
  if (!isSubscribed) {
    return (
      <>
        <Head>
          <title>Video Meetings - Unlimited at $9.99/month | Somai Data</title>
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          {/* Hero Section */}
          <div className="container mx-auto px-4 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                <span className="font-bold">Better than Zoom at 33% less cost</span>
              </div>

              <h1 className="text-6xl font-bold text-white mb-6">
                Unlimited Video Meetings
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  $9.99/month
                </span>
              </h1>

              <p className="text-2xl text-gray-300 mb-8">
                HD video calls, screen sharing, unlimited hours. No time limits, ever.
              </p>

              {/* Pricing Comparison */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-gray-700">
                  <div className="text-gray-400 mb-2">Zoom</div>
                  <div className="text-3xl font-bold text-white mb-2">$14.99</div>
                  <div className="text-gray-400 text-sm">per month</div>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 border-2 border-blue-400 transform scale-105 shadow-2xl">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-yellow-300" />
                    <div className="text-yellow-300 font-bold">Somai Data</div>
                  </div>
                  <div className="text-5xl font-bold text-white mb-2">$9.99</div>
                  <div className="text-blue-200 text-sm">per month - SAVE 33%</div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-gray-700">
                  <div className="text-gray-400 mb-2">Google Meet</div>
                  <div className="text-3xl font-bold text-white mb-2">$9.99</div>
                  <div className="text-gray-400 text-sm">limited features</div>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => router.push('/subscription')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl text-xl font-bold hover:scale-105 transition-all duration-300 shadow-2xl inline-flex items-center gap-3"
              >
                Start Unlimited Meetings
                <ArrowRight className="w-6 h-6" />
              </button>

              <p className="text-gray-400 mt-4">No credit card required for trial</p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">HD Video & Audio</h3>
                <p className="text-gray-300">
                  Crystal clear 1080p video and pristine audio quality for professional meetings.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Screen Sharing</h3>
                <p className="text-gray-300">
                  Share your screen, presentations, or specific apps with one click.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Unlimited Hours</h3>
                <p className="text-gray-300">
                  No 40-minute limits. Meet for as long as you need, 24/7.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="w-14 h-14 bg-yellow-600 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Up to 100 Participants</h3>
                <p className="text-gray-300">
                  Host large team meetings, webinars, or classes with ease.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Secure & Private</h3>
                <p className="text-gray-300">
                  End-to-end encryption and password-protected rooms for your security.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Works Everywhere</h3>
                <p className="text-gray-300">
                  No downloads needed. Join from any browser on desktop or mobile.
                </p>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mt-20 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Why Customers Love Us
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="text-yellow-400">⭐</div>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "Switched from Zoom and saved $60/year. The quality is just as good and I love the unlimited time!"
                  </p>
                  <div className="text-white font-bold">- Sarah M., Teacher</div>
                </div>

                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                  <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="text-yellow-400">⭐</div>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "Perfect for my remote team. No more watching the clock during important meetings."
                  </p>
                  <div className="text-white font-bold">- Ahmed K., Startup Founder</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Dashboard for subscribed users
  return (
    <>
      <Head>
        <title>My Video Meetings | Somai Data</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Video Meetings</h1>
              <p className="text-gray-300">Start or join unlimited video calls</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Meeting
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-8 rounded-2xl text-left transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <Video className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Start Instant Meeting</h3>
              <p className="text-blue-100">Create and join a meeting room immediately</p>
            </button>

            <div className="bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white p-8 rounded-2xl text-left transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer">
              <Calendar className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Schedule Meeting</h3>
              <p className="text-purple-100">Plan a meeting for later and send invites</p>
            </div>
          </div>

          {/* Recent Meetings */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Recent Meetings</h2>

            {meetings.length === 0 ? (
              <div className="text-center py-12">
                <Video className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No meetings yet. Create your first one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{meeting.room_name}</h3>
                        <p className="text-gray-400 text-sm">
                          Created {new Date(meeting.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => copyMeetingUrl(meeting.meeting_url)}
                        className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                      >
                        {copiedUrl === meeting.meeting_url ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => joinMeeting(meeting.meeting_url.split('/room/')[1], meeting.room_name)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold transition-colors"
                      >
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Create Meeting Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Create New Meeting</h2>

              <input
                type="text"
                value={newMeetingName}
                onChange={(e) => setNewMeetingName(e.target.value)}
                placeholder="Enter meeting name..."
                className="w-full bg-white/10 text-white px-4 py-3 rounded-xl mb-6 border border-white/20 focus:border-blue-500 focus:outline-none"
                onKeyPress={(e) => e.key === 'Enter' && createMeeting()}
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createMeeting}
                  disabled={!newMeetingName.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create & Join
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
