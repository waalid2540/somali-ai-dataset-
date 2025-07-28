import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatInterfaceProps {
  userSubscription: string;
  onBack: () => void;
}

export default function AIChatInterface({ userSubscription, onBack }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI assistant. I can help you with a wide variety of tasks including writing, analysis, math, coding, creative projects, and answering questions. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = currentMessage.trim();
    setCurrentMessage('');
    setIsLoading(true);
    setStreamingMessage('');

    try {
      // Build conversation context for AI
      const conversationHistory = [...messages, userMessage]
        .slice(-10) // Keep last 10 messages for context
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n\n');

      const response = await fetch('/api/ai-chat-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: messageText,
          conversationHistory,
          userSubscription 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullResponse += parsed.content;
                  setStreamingMessage(fullResponse);
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }

      // Add final message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fullResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setStreamingMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen h-full bg-gray-900 text-white flex flex-col fixed inset-0 z-50">
      {/* Header - Modern Dark Style */}
      <div className="border-b border-gray-700 px-4 py-3 bg-gray-800">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              ← Back
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-white">AI Assistant</span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {userSubscription === 'pro' ? 'Unlimited' : '3 free messages'}
          </div>
        </div>
      </div>

      {/* Chat Messages - Modern Dark Style */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.map((message) => (
            <div key={message.id} className="group mb-6">
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  {message.role === 'user' ? (
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-300 mb-1">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </div>
                  <div className="text-gray-100 prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Streaming message - Shows real-time response */}
          {streamingMessage && (
            <div className="group mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-300 mb-1">AI Assistant</div>
                  <div className="text-gray-100 prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {streamingMessage}
                      <span className="inline-block w-0.5 h-5 bg-blue-400 ml-1 animate-pulse"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading indicator - Modern Dark Style */}
          {isLoading && !streamingMessage && (
            <div className="group mb-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-300 mb-1">AI Assistant</div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input - Modern Dark Style */}
      <div className="border-t border-gray-700 bg-gray-800">
        <div className="max-w-3xl mx-auto p-4">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message AI Assistant..."
              className="w-full resize-none border border-gray-600 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400"
              style={{
                minHeight: '44px',
                maxHeight: '200px',
                overflow: 'hidden'
              }}
              rows={1}
              disabled={isLoading}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = '44px';
                target.style.height = Math.min(target.scrollHeight, 200) + 'px';
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md transition-colors disabled:opacity-30 hover:bg-gray-600"
            >
              <Send className="w-4 h-4 text-gray-300 hover:text-white" />
            </button>
          </div>
          
          {userSubscription !== 'pro' && (
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-400">
                Free plan • <span className="text-blue-400 hover:text-blue-300 hover:underline cursor-pointer">Upgrade for unlimited</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}