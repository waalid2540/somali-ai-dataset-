// AI Tool Interface - Universal component for all 20 AI tools
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Copy, 
  Download, 
  Share, 
  Star, 
  Clock, 
  DollarSign,
  Loader,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AIToolConfig, InputField, AIToolResult } from '../services/ai-tools-engine';

interface AIToolInterfaceProps {
  tool: AIToolConfig;
  onBack: () => void;
  userSubscription?: 'free' | 'pro' | 'enterprise';
}

function AIToolInterface({ 
  tool, 
  onBack, 
  userSubscription = 'free' 
}: AIToolInterfaceProps) {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AIToolResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (fieldId: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [fieldId]: value
    }));
    setError(null);
  };

  const validateInputs = (): string[] => {
    const errors: string[] = [];
    
    tool.inputs.forEach(input => {
      if (input.required && !inputs[input.id]) {
        errors.push(`${input.label} is required`);
      }
      
      if (inputs[input.id] && input.maxLength && inputs[input.id].length > input.maxLength) {
        errors.push(`${input.label} must be under ${input.maxLength} characters`);
      }
    });

    return errors;
  };

  const handleGenerate = async () => {
    const validationErrors = validateInputs();
    if (validationErrors.length > 0) {
      setError(validationErrors[0]);
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/ai-tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer user-demo-key-${Date.now()}` // Demo key
        },
        body: JSON.stringify({
          toolId: tool.id,
          inputs: inputs
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process request');
      }

      if (data.success) {
        setResult({
          success: true,
          content: data.result.content,
          metadata: data.result.metadata,
        });
      } else {
        throw new Error(data.error || 'Processing failed');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopyResult = () => {
    if (result?.content) {
      navigator.clipboard.writeText(result.content);
      // Could add a toast notification here
    }
  };

  const renderInput = (input: InputField) => {
    const value = inputs[input.id] || '';

    switch (input.type) {
      case 'textarea':
        return (
          <textarea
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-24 text-gray-900 placeholder-gray-500 bg-white"
            {...(input.maxLength ? { maxLength: input.maxLength } : {})}
            {...(input.required ? { required: true } : {})}
          />
        );

      case 'select':
        return (
          <select
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
            {...(input.required ? { required: true } : {})}
          >
            <option value="">{input.placeholder}</option>
            {input.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
            {...(input.required ? { required: true } : {})}
          />
        );

      default: // text
        return (
          <input
            type="text"
            id={input.id}
            value={value}
            onChange={(e) => handleInputChange(input.id, e.target.value)}
            placeholder={input.placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
            {...(input.maxLength ? { maxLength: input.maxLength } : {})}
            {...(input.required ? { required: true } : {})}
          />
        );
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'content': 'bg-blue-100 text-blue-800',
      'business': 'bg-green-100 text-green-800',
      'creative': 'bg-purple-100 text-purple-800',
      'communication': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const renderProfessionalOutput = (content: string, tool: AIToolConfig) => {
    const toolId = tool.id || tool.name.toLowerCase().replace(/\s+/g, '-');
    
    switch (toolId) {
      case 'blog-post-generator':
        return renderBlogPost(content);
      case 'email-marketing-ai':
        return renderEmail(content);
      case 'invoice-generator-ai':
        return renderInvoice(content);
      case 'ad-copy-creator':
        return renderAdCopy(content);
      case 'social-media-ai':
        return renderSocialPost(content);
      case 'proposal-writer-ai':
        return renderProposal(content);
      case 'resume-builder-ai':
        return renderResume(content);
      case 'contract-creator-ai':
        return renderContract(content);
      default:
        return renderDefault(content);
    }
  };

  const renderBlogPost = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const title = lines[0] || 'Blog Post Title';
    const body = lines.slice(1);

    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-4 max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">{title}</h1>
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <span>📅 {new Date().toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>✍️ AI Generated Content</span>
            <span className="mx-2">•</span>
            <span>📖 {Math.ceil(content.split(' ').length / 200)} min read</span>
          </div>
          {body.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const renderEmail = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const subject = lines.find(line => line.toLowerCase().includes('subject')) || 'Email Subject';
    const body = lines.filter(line => !line.toLowerCase().includes('subject'));

    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4">
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-gray-700">From:</div>
            <div className="text-sm text-gray-600">your-business@email.com</div>
          </div>
          <div className="flex items-center space-x-4 mt-2">
            <div className="text-sm font-medium text-gray-700">Subject:</div>
            <div className="text-sm text-gray-900 font-medium">{subject}</div>
          </div>
        </div>
        <div className="p-6">
          {body.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              📧 Professional Email Template • ✨ AI Generated
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInvoice = (content: string) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-4 max-w-2xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">INVOICE</h1>
            <div className="text-sm text-gray-600 mt-2">#{Date.now().toString().slice(-6)}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</div>
            <div className="text-sm text-gray-600">Due: {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono bg-gray-50 p-4 rounded">
            {content}
          </pre>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center">
          <div className="text-sm text-gray-500">📄 Professional Invoice • 💼 Business Ready</div>
        </div>
      </div>
    );
  };

  const renderAdCopy = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const headline = lines[0] || 'Your Headline Here';
    const description = lines.slice(1, -1).join(' ');
    const cta = lines[lines.length - 1] || 'Call to Action';

    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6 mb-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{headline}</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">{description}</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            {cta}
          </button>
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <div className="text-sm text-gray-500">📢 Professional Ad Copy • 🎯 Conversion Optimized</div>
          </div>
        </div>
      </div>
    );
  };

  const renderSocialPost = (content: string) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4 max-w-lg mx-auto">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            YB
          </div>
          <div>
            <div className="font-semibold text-gray-900">Your Business</div>
            <div className="text-sm text-gray-500">Just now</div>
          </div>
        </div>
        <p className="text-gray-800 mb-4 leading-relaxed">{content}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-6 text-sm text-gray-500">
            <span>👍 Like</span>
            <span>💬 Comment</span>
            <span>🔄 Share</span>
          </div>
          <div className="text-sm text-gray-500">📱 Social Media Ready</div>
        </div>
      </div>
    );
  };

  const renderProposal = (content: string) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-4">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Business Proposal</h1>
          <div className="text-sm text-gray-600 mt-2">
            Prepared on {new Date().toLocaleDateString()} • Professional Document
          </div>
        </div>
        <div className="prose max-w-none">
          {content.split('\n\n').map((section, index) => (
            <div key={index} className="mb-6">
              <p className="text-gray-700 leading-relaxed">{section}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <div className="text-sm text-gray-500">💼 Professional Proposal • 📈 Business Ready</div>
        </div>
      </div>
    );
  };

  const renderResume = (content: string) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-4 max-w-2xl mx-auto">
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Professional Resume</h1>
          <div className="text-sm text-gray-600 mt-2">ATS-Optimized Format</div>
        </div>
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
            {content}
          </pre>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <div className="text-sm text-gray-500">📄 Professional Resume • 🎯 ATS Optimized</div>
        </div>
      </div>
    );
  };

  const renderContract = (content: string) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-4">
        <div className="text-center border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-xl font-bold text-gray-900">LEGAL CONTRACT</h1>
          <div className="text-sm text-gray-600 mt-2">Document #{Date.now().toString().slice(-8)}</div>
        </div>
        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed font-serif">
            {content}
          </pre>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            ⚖️ Legal Document Template • 📋 Professional Format • ⚠️ Review with legal counsel
          </div>
        </div>
      </div>
    );
  };

  const renderDefault = (content: string) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
        <div className="prose max-w-none">
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {content}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <div className="text-sm text-gray-500">✨ AI Generated Content • 🚀 Professional Quality</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="text-3xl">{tool.icon}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{tool.name}</h1>
                <p className="text-gray-600">{tool.description}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(tool.category)}`}>
              {tool.category}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Input Parameters</h2>
            
            <div className="space-y-6">
              {tool.inputs.map(input => (
                <div key={input.id}>
                  <label 
                    htmlFor={input.id}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {input.label}
                    {input.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderInput(input)}
                  {input.maxLength && (
                    <div className="text-xs text-gray-500 mt-1">
                      {inputs[input.id]?.length || 0} / {input.maxLength} characters
                    </div>
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={isProcessing}
              className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Generate Content</span>
                </>
              )}
            </button>

            {/* Examples */}
            {tool.examples && tool.examples.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-2">Examples:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {tool.examples.map((example, index) => (
                    <li key={index}>• {example}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Result Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Generated Content</h2>
              {result && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyResult}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Download as text"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Share"
                  >
                    <Share className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {!result && !isProcessing && (
              <div className="text-center py-12 text-gray-500">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <p>Enter your inputs and click "Generate Content" to see results</p>
              </div>
            )}

            {isProcessing && (
              <div className="text-center py-12">
                <Loader className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
                <p className="text-gray-600">AI is generating your content...</p>
              </div>
            )}

            {result && (
              <div>
                {renderProfessionalOutput(result.content, tool)}
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className="mt-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Actions</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyResult}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    <Share className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

                {/* Metadata */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-lg font-semibold text-blue-600">
                      {result.metadata.processingTime}ms
                    </div>
                    <div className="text-xs text-blue-700">Processing Time</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="flex items-center justify-center mb-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="text-lg font-semibold text-green-600">
                      {result.metadata.wordsGenerated}
                    </div>
                    <div className="text-xs text-green-700">Words Generated</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="flex items-center justify-center mb-1">
                      <Star className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-lg font-semibold text-purple-600">
                      {Math.round(result.metadata.confidence * 100)}%
                    </div>
                    <div className="text-xs text-purple-700">Confidence</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Usage Tips */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips for Best Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Input Quality</h4>
              <ul className="space-y-1">
                <li>• Be specific and detailed in your inputs</li>
                <li>• Use clear, concise language</li>
                <li>• Provide context when relevant</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Optimization</h4>
              <ul className="space-y-1">
                <li>• Review and refine generated content</li>
                <li>• Try different input variations</li>
                <li>• Use examples as inspiration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIToolInterface;