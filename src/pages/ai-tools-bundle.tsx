// AI Tools Bundle - Pure 20 AI Tools at $19.99 one-time payment
import React, { useState } from 'react';
import Head from 'next/head';
import AIToolsDashboard from '../components/AIToolsDashboard';
import AIToolInterface from '../components/AIToolInterface';
import AIToolsEngine, { AIToolConfig } from '../services/ai-tools-engine';

function AIToolsBundlePage() {
  const [selectedTool, setSelectedTool] = useState<AIToolConfig | null>(null);
  const [userSubscription] = useState<'pro'>('pro');

  const handleToolSelect = (tool: AIToolConfig) => {
    setSelectedTool(tool);
  };

  const handleBackToDashboard = () => {
    setSelectedTool(null);
  };

  return (
    <>
      <Head>
        <title>AI Tools Bundle - 20 Professional AI Tools for $19.99</title>
        <meta 
          name="description" 
          content="Access 20 professional AI tools including Blog Generator, Social Media AI, Ad Copy Creator, Email Marketing AI, and more. One-time payment of $19.99 - Save $1,200+ annually." 
        />
        <meta name="keywords" content="AI tools, content generation, blog writing, social media, email marketing, business automation, artificial intelligence, content creation, marketing tools, one-time payment" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {selectedTool ? (
          <AIToolInterface 
            tool={selectedTool}
            onBack={handleBackToDashboard}
            userSubscription={userSubscription}
          />
        ) : (
          <AIToolsDashboard 
            onToolSelect={handleToolSelect}
            userSubscription={userSubscription}
          />
        )}
      </div>
    </>
  );
}

export default AIToolsBundlePage;