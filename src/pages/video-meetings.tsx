// Video Meetings Platform - Zoom Competitor at $9.99/month unlimited
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
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

interface User {
  id: string;
  email: string;
  name?: string;
}

interface Meeting {
  id: string;
  room_name: string;
  meeting_url: string;
  created_by: string;
  created_at: string;
  is_active: boolean;
}

// Replace this with your actual backend API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function VideoMeetings() {
  const router = useRouter();
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newMeetingName, setNewMeetingName] = useState('');
  const [copiedUrl, setCopiedUrl] = useState('');

  const createMeeting = () => {
    if (!newMeetingName.trim()) return;

    const roomId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const meetingUrl = `${window.location.origin}/room/${roomId}`;

    const newMeeting: Meeting = {
      id: roomId,
      room_name: newMeetingName,
      meeting_url: meetingUrl,
      created_by: 'guest',
      created_at: new Date().toISOString(),
      is_active: true
    };

    setMeetings([newMeeting, ...meetings]);
    setShowCreateModal(false);
    setNewMeetingName('');

    // Join the meeting immediately
    router.push(`/room/${roomId}?name=${encodeURIComponent(newMeetingName)}`);
  };

  const copyMeetingUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(''), 2000);
  };

  const joinMeeting = (roomId: string, roomName: string) => {
    router.push(`/room/${roomId}?name=${encodeURIComponent(roomName)}`);
  };

  // Dashboard - accessible to everyone without authentication
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
