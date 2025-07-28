import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader, Sparkles, History, Plus, Trash2, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
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
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('ai-chat-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChatHistory(parsed.map((chat: any) => ({
          ...chat,
          createdAt: new Date(chat.createdAt),
          updatedAt: new Date(chat.updatedAt),
          messages: chat.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        })));
      } catch (error) {
        console.error('Failed to load chat history:', error);
      }
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Save chat history to localStorage
  const saveChatHistory = (history: ChatHistory[]) => {
    try {
      localStorage.setItem('ai-chat-history', JSON.stringify(history));
      setChatHistory(history);
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  };

  // Generate a title from the first user message
  const generateChatTitle = (messages: Message[]): string => {
    const firstUserMessage = messages.find(m => m.role === 'user');
    if (firstUserMessage) {
      return firstUserMessage.content.length > 50 
        ? firstUserMessage.content.substring(0, 50) + '...'
        : firstUserMessage.content;
    }
    return 'New Chat';
  };

  // Save current chat to history
  const saveCurrentChat = () => {
    if (messages.length <= 1) return; // Don't save if only initial message
    
    const chatTitle = generateChatTitle(messages);
    const now = new Date();
    
    if (currentChatId) {
      // Update existing chat
      const updatedHistory = chatHistory.map(chat => 
        chat.id === currentChatId 
          ? { ...chat, messages, title: chatTitle, updatedAt: now }
          : chat
      );
      saveChatHistory(updatedHistory);
    } else {
      // Create new chat
      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title: chatTitle,
        messages,
        createdAt: now,
        updatedAt: now
      };
      setCurrentChatId(newChat.id);
      saveChatHistory([newChat, ...chatHistory]);
    }
  };

  // Start a new chat
  const startNewChat = () => {
    if (messages.length > 1) {
      saveCurrentChat();
    }
    setMessages([{
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI assistant. I can help you with a wide variety of tasks including writing, analysis, math, coding, creative projects, and answering questions. How can I assist you today?",
      timestamp: new Date()
    }]);
    setCurrentChatId(null);
    setCurrentMessage('');
    setStreamingMessage('');
  };

  // Load a previous chat
  const loadChat = (chatId: string) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      if (messages.length > 1) {
        saveCurrentChat();
      }
      setMessages(chat.messages);
      setCurrentChatId(chatId);
      setCurrentMessage('');
      setStreamingMessage('');
      setShowHistory(false);
    }
  };

  // Delete a chat
  const deleteChat = (chatId: string) => {
    const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
    saveChatHistory(updatedHistory);
    
    if (currentChatId === chatId) {
      startNewChat();
    }
  };

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
      
      // Auto-save chat after response
      setTimeout(() => {
        if (messages.length > 1) { // Save after there are actual conversations
          saveCurrentChat();
        }
      }, 1000);
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
    <div className="min-h-screen h-screen bg-gray-900 text-white flex relative overflow-hidden">
      {/* Chat History Sidebar */}
      {showHistory && (
        <div className="w-full md:w-80 bg-gray-800 border-r border-gray-700 flex flex-col absolute md:relative z-40 h-full">
          <div className="p-4 md:p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-lg font-semibold text-white">Chat History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-gray-400 hover:text-white p-2 text-lg"
              >
                ✕
              </button>
            </div>
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors text-base font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>New Chat</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                  currentChatId === chat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
                onClick={() => loadChat(chat.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-base md:text-sm font-medium truncate">{chat.title}</span>
                  </div>
                  <div className="text-sm md:text-xs text-gray-400">
                    {chat.updatedAt.toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 p-2 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <History className="w-10 h-10 md:w-8 md:h-8 mx-auto mb-3 opacity-50" />
                <p className="text-base md:text-sm">No chat history yet</p>
                <p className="text-sm">Start a conversation to see it here</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Overlay */}
      {showHistory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setShowHistory(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Modern Dark Style */}
        <div className="border-b border-gray-700 px-3 md:px-4 py-4 md:py-3 bg-gray-800">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
              <button
                onClick={onBack}
                className="text-gray-400 hover:text-white text-base md:text-sm font-medium transition-colors hidden sm:block"
              >
                ← Back
              </button>
              <button
                onClick={onBack}
                className="text-gray-400 hover:text-white text-lg font-medium transition-colors sm:hidden"
              >
                ←
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-gray-400 hover:text-white p-2 md:p-1 transition-colors"
                title="Chat History"
              >
                <History className="w-5 h-5 md:w-5 md:h-5" />
              </button>
              <button
                onClick={startNewChat}
                className="text-gray-400 hover:text-white p-2 md:p-1 transition-colors"
                title="New Chat"
              >
                <Plus className="w-5 h-5 md:w-5 md:h-5" />
              </button>
              <div className="flex items-center space-x-2 min-w-0">
                <div className="w-7 h-7 md:w-6 md:h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 md:w-4 md:h-4 text-white" />
                </div>
                <span className="font-medium text-white text-lg md:text-base truncate">AI Assistant</span>
              </div>
            </div>
            <div className="text-sm text-gray-400 hidden sm:block">
              {userSubscription === 'pro' ? 'Unlimited' : '3 free messages'}
            </div>
            <div className="text-sm text-gray-400 sm:hidden">
              {userSubscription === 'pro' ? '∞' : '3'}
            </div>
          </div>
        </div>

      {/* Chat Messages - Modern Dark Style */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 md:px-4 py-6 md:py-6">
          {messages.map((message) => (
            <div key={message.id} className="group mb-6 md:mb-6">
              <div className="flex items-start space-x-3 md:space-x-4">
                {/* Avatar */}
                <div className="w-8 h-8 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center">
                  {message.role === 'user' ? (
                    <div className="w-8 h-8 md:w-8 md:h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 md:w-5 md:h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Bot className="w-5 h-5 md:w-5 md:h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-sm font-medium text-gray-300 mb-2">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </div>
                  <div className="text-gray-100 prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap leading-relaxed text-lg md:text-base font-normal">
                      {message.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Streaming message - Shows real-time response */}
          {streamingMessage && (
            <div className="group mb-6 md:mb-6">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-8 h-8 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-sm font-medium text-gray-300 mb-2">AI Assistant</div>
                  <div className="text-gray-100 prose prose-lg max-w-none">
                    <div className="whitespace-pre-wrap leading-relaxed text-lg md:text-base font-normal">
                      {streamingMessage}
                      <span className="inline-block w-0.5 h-5 md:h-5 bg-blue-400 ml-1 animate-pulse"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Loading indicator - Modern Dark Style */}
          {isLoading && !streamingMessage && (
            <div className="group mb-6 md:mb-6">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-8 h-8 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 md:w-5 md:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm md:text-sm font-medium text-gray-300 mb-2">AI Assistant</div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 md:w-2 md:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 md:w-2 md:h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
      <div className="border-t border-gray-700 bg-gray-800 p-4 md:p-0">
        <div className="max-w-3xl mx-auto md:p-4">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message AI Assistant..."
              className="w-full resize-none border border-gray-600 rounded-lg px-4 md:px-4 py-4 md:py-3 pr-12 md:pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white placeholder-gray-400 text-lg md:text-base"
              style={{
                minHeight: '50px',
                maxHeight: '180px',
                overflow: 'hidden'
              }}
              rows={1}
              disabled={isLoading}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = '50px';
                target.style.height = Math.min(target.scrollHeight, 180) + 'px';
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
              className="absolute right-2 md:right-2 top-1/2 transform -translate-y-1/2 p-2 md:p-2 rounded-md transition-colors disabled:opacity-30 hover:bg-gray-600"
            >
              <Send className="w-5 h-5 md:w-4 md:h-4 text-gray-300 hover:text-white" />
            </button>
          </div>
          
          {userSubscription !== 'pro' && (
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-400">
                <span className="hidden sm:inline">Free plan • </span>
                <span className="text-blue-400 hover:text-blue-300 hover:underline cursor-pointer">
                  <span className="hidden sm:inline">Upgrade for unlimited</span>
                  <span className="sm:hidden">Upgrade for unlimited</span>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}