// AI Market Tools - Professional Enterprise Landing Page
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ArrowRight, 
  Check, 
  Star, 
  Zap, 
  Globe,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Shield,
  Smartphone,
  BarChart3,
  Building2,
  Mail
} from 'lucide-react';

function AIMarketToolsPage() {
  const [showDetails, setShowDetails] = useState(false);

  const tools = [
    { name: 'Blog Post Generator', icon: '📝', category: 'Content Creation', description: 'SEO-optimized blog posts' },
    { name: 'Social Media AI', icon: '📱', category: 'Content Creation', description: 'Platform-specific content' },
    { name: 'Ad Copy Creator', icon: '📢', category: 'Content Creation', description: 'High-converting advertisements' },
    { name: 'Email Marketing AI', icon: '📧', category: 'Content Creation', description: 'Email campaigns & sequences' },
    { name: 'Product Description AI', icon: '🛍️', category: 'Content Creation', description: 'Converting product copy' },
    { name: 'Invoice Generator AI', icon: '📄', category: 'Business Operations', description: 'Professional invoicing' },
    { name: 'Contract Creator AI', icon: '📋', category: 'Business Operations', description: 'Legal agreements' },
    { name: 'Proposal Writer AI', icon: '💼', category: 'Business Operations', description: 'Winning proposals' },
    { name: 'Resume Builder AI', icon: '📄', category: 'Business Operations', description: 'ATS-optimized resumes' },
    { name: 'Job Description AI', icon: '👔', category: 'Business Operations', description: 'Talent acquisition' },
    { name: 'Business Name Generator', icon: '🏢', category: 'Creative & Design', description: 'Brand naming solutions' },
    { name: 'Slogan Creator AI', icon: '💭', category: 'Creative & Design', description: 'Memorable taglines' },
    { name: 'Presentation AI', icon: '📊', category: 'Creative & Design', description: 'Professional presentations' },
    { name: 'Script Writer AI', icon: '🎬', category: 'Creative & Design', description: 'Video & marketing scripts' },
    { name: 'Newsletter AI', icon: '📰', category: 'Creative & Design', description: 'Engaging newsletters' },
    { name: 'Translation AI', icon: '🌍', category: 'Communication', description: 'Multi-language support' },
    { name: 'Live Chatbot Creator', icon: '💬', category: 'Communication', description: 'Live website chatbots (use your OpenAI key)' },
    { name: 'Meeting Summarizer AI', icon: '📝', category: 'Communication', description: 'Meeting transcription' },
    { name: 'Review Response AI', icon: '⭐', category: 'Communication', description: 'Review management' },
    { name: 'Customer Service AI', icon: '🎧', category: 'Communication', description: 'Support automation' }
  ];

  const testimonials = [
    {
      name: "Ahmed Hassan",
      role: "CEO",
      company: "TechStart Somalia",
      image: "/testimonials/ahmed.jpg",
      content: "Somali AI Dataset's market tools saved us $800+ monthly. The Enterprise AI suite transformed our operations completely.",
      rating: 5
    },
    {
      name: "Fatima Ali", 
      role: "Marketing Director",
      company: "Global Ventures",
      image: "/testimonials/fatima.jpg",
      content: "Professional-grade AI tools with Somali language support. Perfect for our expanding East African operations.",
      rating: 5
    },
    {
      name: "Omar Mohamud",
      role: "Startup Founder",
      company: "Innovation Hub",
      image: "/testimonials/omar.jpg",
      content: "20 enterprise tools for $19.99? This is incredible value. Our productivity increased 300% in the first month.",
      rating: 5
    }
  ];

  return (
    <>
      <Head>
        <title>AI Market Tools - Professional Enterprise Suite | Somali AI Dataset</title>
        <meta 
          name="description" 
          content="Professional AI Market Tools by Somali AI Dataset. 20 enterprise-grade tools for content creation, business operations, and automation. Trusted by leading organizations." 
        />
        <meta name="keywords" content="AI market tools, enterprise AI, Somali AI Dataset, business automation, content generation, professional AI suite" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Market Tools - Professional Enterprise Suite | Somali AI Dataset" />
        <meta property="og:description" content="Professional AI Market Tools by Somali AI Dataset. 20 enterprise-grade tools for $19.99 one-time." />
        <meta property="og:image" content="/images/ai-market-tools-og.jpg" />
        <meta property="og:url" content="https://somaidataset.com/ai-market-tools" />
      </Head>

      <div className="min-h-screen bg-white">

        {/* Powerful Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-black overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            {/* Attention-Grabbing Badge */}
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-300 font-bold text-sm mb-8 animate-bounce">
              <Zap className="w-4 h-4 mr-2" />
              🔥 SAVE $780+ MONTHLY • 97% COST REDUCTION
            </div>

            {/* Power Headline */}
            <h1 className="text-6xl lg:text-8xl font-black text-white mb-8 leading-tight">
              <span className="text-yellow-400">20 AI TOOLS</span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                ONE PRICE
              </span>
            </h1>

            {/* Compelling Value Proposition */}
            <p className="text-2xl lg:text-3xl text-gray-200 mb-4 font-semibold">
              Get <span className="text-yellow-400">$1,200+ worth</span> of AI tools for just <span className="text-emerald-400 text-4xl font-bold">$19.99 ONE-TIME</span>
            </p>
            <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
              <strong className="text-yellow-400">NO MONTHLY FEES!</strong> Stop paying hundreds for individual AI tools. Get lifetime access to everything you need.
            </p>

            {/* Powerful Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-4xl lg:text-5xl font-black text-yellow-400 mb-2">20</div>
                <div className="text-gray-300 font-semibold">Premium AI Tools</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-4xl lg:text-5xl font-black text-emerald-400 mb-2">97%</div>
                <div className="text-gray-300 font-semibold">Cost Savings</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-4xl lg:text-5xl font-black text-purple-400 mb-2">$1,200+</div>
                <div className="text-gray-300 font-semibold">You Save Annually</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all">
                <div className="text-4xl lg:text-5xl font-black text-blue-400 mb-2">24/7</div>
                <div className="text-gray-300 font-semibold">Support</div>
              </div>
            </div>

            {/* Massive CTA */}
            <div className="space-y-6">
              <Link 
                href="//"
                className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black px-12 py-6 rounded-2xl font-black text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-yellow-500/25"
              >
                <Zap className="mr-3 w-8 h-8" />
                GET ALL 20 TOOLS NOW
                <ArrowRight className="ml-3 w-8 h-8" />
              </Link>
              
              <div className="text-gray-400">
                ⚡ Instant access • 🔒 30-day money back guarantee • 💰 One-time payment
              </div>
            </div>

            {/* Urgency/Scarcity */}
            <div className="mt-12 p-6 bg-red-500/20 border border-red-500/30 rounded-xl max-w-2xl mx-auto">
              <div className="text-red-300 font-bold text-lg mb-2">🔥 LIMITED TIME: 75% OFF</div>
              <div className="text-white">Join 10,000+ professionals who chose one-time payment over expensive subscriptions</div>
            </div>
          </div>
        </section>

        {/* Powerful Tools Showcase */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
                <span className="text-yellow-400">20 POWERFUL</span> AI TOOLS
              </h2>
              <p className="text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Live chatbots alone cost $500+/month. You get that PLUS 19 other professional tools for just $19.99!
              </p>
              
              {/* Value Calculator */}
              <div className="bg-gradient-to-r from-red-600/20 to-yellow-600/20 border border-yellow-500/30 rounded-2xl p-8 max-w-3xl mx-auto mb-12">
                <div className="text-xl text-gray-300 mb-4">If you bought these tools separately:</div>
                <div className="text-5xl font-black text-red-400 mb-2 line-through">$1,200+ annually</div>
                <div className="text-sm text-gray-300 mb-2">(Individual subscriptions cost $15-50/month each)</div>
                <div className="text-3xl text-gray-300 mb-4">Our price:</div>
                <div className="text-6xl font-black text-emerald-400">$19.99 ONE-TIME</div>
                <div className="text-yellow-400 text-xl font-bold mt-4">YOU SAVE $1,180+ ANNUALLY</div>
              </div>
            </div>

            {/* Tools Grid with Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => {
                const isLiveChatbot = tool.name === 'Live Chatbot Creator';
                return (
                  <div key={index} className={`rounded-2xl p-6 border transition-all group hover:scale-105 ${
                    isLiveChatbot 
                      ? 'bg-gradient-to-br from-yellow-600/30 to-orange-600/30 border-yellow-500/50 ring-2 ring-yellow-400/20' 
                      : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/20 hover:border-yellow-500/50'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-4xl">{tool.icon}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        isLiveChatbot 
                          ? 'bg-yellow-500 text-black font-bold' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {isLiveChatbot ? 'Worth $500/mo' : 'Worth $40/mo'}
                      </div>
                    </div>
                    {isLiveChatbot && (
                      <div className="text-xs bg-yellow-400 text-black px-2 py-1 rounded-full mb-3 font-bold text-center">
                        🔥 PREMIUM TOOL
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">{tool.name}</h3>
                    <p className="text-sm text-gray-300 mb-4">{tool.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                        {tool.category}
                      </span>
                      <div className="text-emerald-400 font-bold text-sm">INCLUDED</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Massive CTA */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-3xl p-8 max-w-2xl mx-auto mb-8">
                <div className="text-3xl font-black text-white mb-4">GET ALL 20 TOOLS</div>
                <div className="text-6xl font-black text-yellow-400 mb-4">$19.99</div>
                <div className="text-gray-300 mb-6">Instead of $1,200+ annually in subscriptions</div>
                
                <Link 
                  href="//"
                  className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-black px-12 py-6 rounded-2xl font-black text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-yellow-500/25 inline-flex items-center"
                >
                  <Zap className="mr-3 w-8 h-8" />
                  START SAVING NOW
                  <ArrowRight className="ml-3 w-8 h-8" />
                </Link>
              </div>
              
              <div className="text-gray-400 text-lg">
                ⚡ Instant access to all tools • 🚀 No setup required • 💰 One-time payment
              </div>
            </div>
          </div>
        </section>

        {/* Irresistible Pricing Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              STOP OVERPAYING!
            </h2>
            <p className="text-2xl text-white mb-12 font-bold">
              Why pay $1,200+ annually for subscriptions when you can get EVERYTHING for $19.99 ONE-TIME?
            </p>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Other Providers */}
              <div className="bg-gray-800 rounded-2xl p-8 border-4 border-red-500 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                  ❌ OTHER PROVIDERS
                </div>
                <div className="text-center pt-4">
                  <div className="text-4xl font-black text-red-400 mb-4">$1,200+</div>
                  <div className="text-white font-bold mb-6">annually in subscriptions</div>
                  <ul className="space-y-3 text-left text-gray-300">
                    <li>• Jasper AI: $49/month</li>
                    <li>• Copy.ai: $49/month</li>
                    <li>• Writesonic: $45/month</li>
                    <li>• Grammarly: $30/month</li>
                    <li>• Notion AI: $20/month</li>
                    <li>• + 15 more tools...</li>
                  </ul>
                  <div className="mt-6 text-red-400 font-bold">TOTAL: $1,200+/year</div>
                </div>
              </div>

              {/* Our Offer */}
              <div className="bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl p-8 border-4 border-yellow-400 relative transform scale-105">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-2 rounded-full font-black text-sm animate-pulse">
                  🔥 OUR OFFER
                </div>
                <div className="text-center pt-4">
                  <div className="text-6xl font-black text-white mb-4">$19.99</div>
                  <div className="text-yellow-300 font-bold mb-6">ONE-TIME PAYMENT</div>
                  <ul className="space-y-3 text-left text-white">
                    <li>• ✅ ALL 20 AI Tools Included</li>
                    <li>• ✅ Blog Post Generator</li>
                    <li>• ✅ Social Media AI</li>
                    <li>• ✅ Ad Copy Creator</li>
                    <li>• ✅ Email Marketing AI</li>
                    <li>• ✅ + 15 more premium tools</li>
                  </ul>
                  <div className="mt-6 text-yellow-300 font-black text-xl">SAVE $1,180+ ANNUALLY!</div>
                </div>
              </div>
            </div>

            {/* Massive CTA */}
            <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-8 mb-8">
              <div className="text-4xl font-black text-white mb-4">⚡ LIMITED TIME OFFER ⚡</div>
              <div className="text-2xl text-yellow-300 mb-6 font-bold">Get ALL 20 Tools for 97.5% OFF</div>
              
              <Link 
                href="//"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black px-16 py-8 rounded-2xl font-black text-3xl transition-all transform hover:scale-110 shadow-2xl shadow-yellow-500/50 inline-flex items-center animate-pulse"
              >
                <Zap className="mr-4 w-10 h-10" />
                CLAIM YOUR 97.5% DISCOUNT
                <ArrowRight className="ml-4 w-10 h-10" />
              </Link>
              
              <div className="mt-6 text-white text-lg">
                ⚡ Instant access • 🚀 No contracts • 💰 30-day money back guarantee
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center px-8 py-4 bg-green-500 rounded-full text-white font-black text-xl animate-bounce">
                <TrendingUp className="w-6 h-6 mr-3" />
                1000+ BUSINESSES ALREADY SAVING THOUSANDS!
              </div>
            </div>
          </div>
        </section>

        {/* Professional Testimonials */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Trusted by Enterprise Leaders
              </h2>
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current text-yellow-400" />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-900">4.9/5 from 500+ organizations</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Professional CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-emerald-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready for Enterprise AI Tools?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join 500+ organizations using Somali AI Dataset's professional market tools suite.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Enterprise Trial</div>
                  <div className="text-sm text-blue-100">Full access for 14 days</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Enterprise SLA</div>
                  <div className="text-sm text-blue-100">99.9% uptime guarantee</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Professional Support</div>
                  <div className="text-sm text-blue-100">Dedicated account manager</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="//"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Start Enterprise Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/investor"
                className="border border-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                <Building2 className="mr-2 w-5 h-5" />
                Investment Opportunities
              </Link>
            </div>
            
            <div className="mt-6 text-blue-100 text-sm">
              Trusted by enterprise organizations • Professional licensing available
            </div>
          </div>
        </section>

        {/* Business Creation Cross-Promotion */}
        <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-black mb-8">
              Love These Tools? Get Your Own AI Business!
            </h2>
            <p className="text-2xl mb-12 max-w-4xl mx-auto">
              Why just use AI tools when you can <strong>own an AI business?</strong> I'll build a complete AI platform like this one, customized for your market, for just $2,000-$5,000.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-black text-yellow-400 mb-2">$2,000</div>
                <div className="font-bold mb-2">vs $50,000+ agencies</div>
                <div className="text-sm text-gray-200">Get the same quality for 95% less</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-black text-yellow-400 mb-2">6 weeks</div>
                <div className="font-bold mb-2">to launch</div>
                <div className="text-sm text-gray-200">From idea to revenue-generating business</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-3xl font-black text-yellow-400 mb-2">$18K</div>
                <div className="font-bold mb-2">average monthly revenue</div>
                <div className="text-sm text-gray-200">By month 6 for our clients</div>
              </div>
            </div>

            <div className="space-y-6">
              <Link 
                href="/ai-business-creation"
                className="bg-yellow-500 text-black px-12 py-6 rounded-2xl font-black text-2xl hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center"
              >
                <Building2 className="mr-3 w-8 h-8" />
                BUILD MY AI BUSINESS
                <ArrowRight className="ml-3 w-8 h-8" />
              </Link>
              
              <div className="text-gray-200 text-lg">
                ⚡ Custom AI tools for your niche • 💰 Your business, your profits • 🎯 Proven business model
              </div>
            </div>

            <div className="mt-12 p-6 bg-black/20 rounded-xl max-w-3xl mx-auto">
              <div className="text-yellow-300 font-bold mb-2">💡 IMAGINE THIS:</div>
              <div className="text-lg">
                Instead of paying $19.99 one-time for tools, your customers pay YOU $19.99 monthly for YOUR AI business. 
                <strong> From customer to competitor in 6 weeks.</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Footer */}
        <footer className="py-12 px-4 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">Somali AI Dataset</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Professional AI Market Tools for enterprise organizations. Building the future of AI-powered business automation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Enterprise</h4>
                <div className="space-y-2 text-gray-400">
                  <Link href="/ai-market-tools" className="block hover:text-white transition-colors">AI Market Tools</Link>
                  <Link href="//" className="block hover:text-white transition-colors">Tools Suite</Link>
                  <Link href="/ai-meeting-pro" className="block hover:text-white transition-colors">Meeting AI</Link>
                  <Link href="/investor" className="block hover:text-white transition-colors">Investors</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <div className="space-y-2 text-gray-400">
                  <Link href="/#about" className="block hover:text-white transition-colors">About</Link>
                  <Link href="/#dataset" className="block hover:text-white transition-colors">Dataset</Link>
                  <Link href="#" className="block hover:text-white transition-colors">Support</Link>
                  <Link href="#" className="block hover:text-white transition-colors">Contact</Link>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              © 2024 Somali AI Dataset. Professional AI Market Tools. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default AIMarketToolsPage;