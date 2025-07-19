import React, { useState } from 'react';
import { ArrowRight, Globe, Zap, Star, DollarSign, Brain, Users, TrendingUp, Shield, Target, Mic, FileText, CheckCircle, Play, Download, Clock, Languages } from 'lucide-react';
import Link from 'next/link';

const AIMeetingPro = () => {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [isRecording, setIsRecording] = useState(false);
  const [meetingData, setMeetingData] = useState<{
    transcript: string;
    summary: string;
    actionItems: string[];
    participants: string[];
  }>({
    transcript: '',
    summary: '',
    actionItems: [],
    participants: []
  });

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 9.99,
      description: 'Perfect for individuals and small teams',
      features: [
        'Up to 10 meetings/month',
        'AI meeting summaries',
        'Basic transcription',
        'Email summaries',
        'English + Somali support',
        'Mobile app access'
      ],
      buttonText: 'Start Free Trial',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 14.99,
      description: 'Most popular for growing businesses',
      features: [
        'Unlimited meetings',
        'Advanced AI summaries',
        'Action items extraction',
        'Meeting insights & analytics',
        'Multi-language support (50+ languages)',
        'Zoom/Teams/Meet integration',
        'Priority support',
        'Custom branding'
      ],
      buttonText: 'Get Professional',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 49.99,
      description: 'Advanced features for large organizations',
      features: [
        'Everything in Professional',
        'Advanced meeting analytics',
        'Custom AI training',
        'API access',
        'SSO integration',
        'Advanced security',
        'Dedicated account manager',
        'Custom integrations'
      ],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const demoMeeting = {
    title: "Q4 Marketing Strategy Meeting",
    duration: "45 minutes",
    participants: ["Sarah Johnson (Marketing Director)", "Ahmed Ali (Product Manager)", "Maria Garcia (Sales Lead)"],
    summary: "Team discussed Q4 marketing campaigns focusing on expanding into Middle East markets. Key decisions made on budget allocation and timeline for Somali language marketing materials.",
    actionItems: [
      "Sarah to create Q4 budget proposal by Friday",
      "Ahmed to research Somali market demographics",
      "Maria to connect with regional sales partners",
      "Team to reconvene next Tuesday for campaign review"
    ],
    keyInsights: [
      "Middle East expansion identified as top priority",
      "Somali language content gap discovered",
      "75% budget increase approved for Q4",
      "Regional partnerships crucial for success"
    ]
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    // Simulate meeting recording and AI processing
    setTimeout(() => {
      setMeetingData({
        transcript: "Meeting transcript would appear here with full conversation details...",
        summary: demoMeeting.summary,
        actionItems: demoMeeting.actionItems,
        participants: demoMeeting.participants
      });
      setIsRecording(false);
    }, 3000);
  };

  const handlePurchase = (planId: string, price: number) => {
    alert(`Redirecting to payment for ${planId} plan - $${price}/month. Your Somali AI dataset integration included!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                AI Meeting Pro
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                🇸🇴 Somali AI Powered
              </div>
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-900/50 to-blue-900/50 border border-emerald-500/30 mb-8">
            <Languages className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-emerald-200 font-medium">World's First Multilingual AI Meeting Assistant</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Never Take
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Meeting Notes Again
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            AI-powered meeting summaries in <strong className="text-emerald-400">50+ languages</strong> including Somali. 
            Get intelligent summaries, action items, and insights from every meeting. 
            <strong className="text-blue-400"> Start making money from better meetings today.</strong>
          </p>

          {/* Demo Meeting Recorder */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-6">🎬 Live Demo - Try It Now</h3>
              
              {!isRecording && !meetingData.summary ? (
                <button
                  onClick={handleStartRecording}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Start Demo Meeting Recording
                </button>
              ) : isRecording ? (
                <div className="text-center">
                  <div className="animate-pulse bg-red-500 w-4 h-4 rounded-full mx-auto mb-4"></div>
                  <p className="text-red-400 font-semibold">🎙️ Recording & Processing with AI...</p>
                  <p className="text-gray-400 text-sm mt-2">Our Somali AI is analyzing the meeting content</p>
                </div>
              ) : (
                <div className="text-left space-y-4">
                  <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-500/30">
                    <h4 className="text-emerald-400 font-semibold mb-2">📝 AI Summary Generated:</h4>
                    <p className="text-gray-300 text-sm">{demoMeeting.summary}</p>
                  </div>
                  <div className="bg-blue-900/20 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="text-blue-400 font-semibold mb-2">✅ Action Items:</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {demoMeeting.actionItems.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">50+</div>
              <div className="text-gray-400">Languages Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">95%</div>
              <div className="text-gray-400">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">3-5hrs</div>
              <div className="text-gray-400">Saved Per Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">$14.99</div>
              <div className="text-gray-400">Starting Price</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              🚀 Powered by Advanced Somali AI Dataset
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The only meeting AI that truly understands multilingual conversations and cultural context
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-2xl p-8 border border-emerald-500/20">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Languages className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Multilingual Intelligence</h3>
              <p className="text-gray-300 mb-6">
                First AI that understands Somali, Arabic, English conversations naturally. No more language barriers in global teams.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Somali cultural context understanding
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  50+ languages supported
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Real-time translation summaries
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-blue-500/20">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Intelligent Summaries</h3>
              <p className="text-gray-300 mb-6">
                Advanced AI extracts key decisions, action items, and insights automatically. No more manual note-taking.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                  Action items with owners & deadlines
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                  Key decision tracking
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-blue-400 mr-2" />
                  Meeting sentiment analysis
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-8 border border-purple-500/20">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Business Impact</h3>
              <p className="text-gray-300 mb-6">
                Track meeting ROI, productivity improvements, and team performance. Turn meetings into business results.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                  Meeting productivity analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                  Team performance insights
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2" />
                  ROI tracking & reporting
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              💰 Simple Pricing That Pays for Itself
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Save 3-5 hours per week on meeting admin. That's $300-500/week in time savings for just $14.99/month.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border transition-all duration-300 relative ${
                  plan.popular 
                    ? 'border-emerald-500/50 scale-105 shadow-2xl shadow-emerald-500/20' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                      🔥 MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 mb-4">{plan.description}</p>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan.id, plan.price)}
                  className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {plan.buttonText}
                </button>

                {plan.popular && (
                  <p className="text-center text-emerald-400 text-sm mt-3 font-semibold">
                    💰 Saves $2,000+ in time per month
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Enterprise CTA */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">
                🏢 Enterprise & Custom Solutions
              </h3>
              <p className="text-gray-300 mb-6">
                Need custom AI training, on-premise deployment, or integration with your existing systems? 
                Let's build a solution that scales with your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300">
                  Schedule Enterprise Demo
                </button>
                <button className="border border-gray-600 hover:border-gray-500 text-white py-3 px-8 rounded-lg font-semibold transition-all duration-300">
                  Contact Sales Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            🔗 Works With Your Existing Tools
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Seamless integration with all major meeting platforms. No workflow changes needed.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Zoom', 'Microsoft Teams', 'Google Meet', 'WebEx'].map((platform) => (
              <div key={platform} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold">{platform}</h3>
                <p className="text-emerald-400 text-sm mt-2">✅ Integrated</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            🚀 Start Making Money From Better Meetings
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of professionals who save 5+ hours per week with AI meeting summaries. 
            First multilingual AI that understands your business context.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              onClick={() => handlePurchase('professional', 14.99)}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-12 py-4 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105"
            >
              🎯 Start Professional Plan - $14.99/month
            </button>
            <button className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-white/5">
              📅 Book Demo Call
            </button>
          </div>

          <p className="text-gray-400">
            💰 ROI Guarantee: Save 5+ hours/week or money back • 🇸🇴 Somali AI Dataset included • 🔒 Enterprise security
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              AI Meeting Pro
            </span>
          </div>
          <p className="text-gray-400">
            © 2024 AI Meeting Pro. Powered by Advanced Somali AI Dataset. 
            The world's first multilingual meeting intelligence platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIMeetingPro;