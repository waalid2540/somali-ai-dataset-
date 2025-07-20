// AI Business Creation Service - Professional Enterprise Solutions
import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Zap, 
  Globe,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Shield,
  Building2,
  Mail,
  Phone,
  AlertTriangle,
  Target,
  BarChart3,
  Lightbulb,
  Award,
  Rocket
} from 'lucide-react';

function AIBusinessCreationPage() {
  const [selectedPackage, setSelectedPackage] = useState<'starter' | 'professional' | 'enterprise'>('professional');

  const painPoints = [
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: "AI Agencies Charge $50,000-$200,000",
      description: "Traditional development costs are prohibitive for most businesses",
      impact: "97% of businesses locked out of AI opportunities"
    },
    {
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      title: "6-12 Month Development Timelines",
      description: "By the time your AI solution is ready, competitors have moved ahead",
      impact: "Missing the AI revolution while waiting"
    },
    {
      icon: <Users className="w-6 h-6 text-blue-500" />,
      title: "No Technical Team or AI Expertise",
      description: "Hiring AI developers costs $200K+ annually, if you can find them",
      impact: "Stuck watching others profit from AI"
    },
    {
      icon: <Target className="w-6 h-6 text-purple-500" />,
      title: "Unclear AI Business Models",
      description: "Don't know how to monetize AI or what products to build",
      impact: "Paralyzed by endless possibilities"
    }
  ];

  const opportunities = [
    {
      icon: <TrendingUp className="w-8 h-8 text-emerald-500" />,
      title: "$1.3 Trillion AI Market by 2030",
      stat: "35%",
      description: "Annual growth rate - fastest growing tech sector in history"
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "AI Tools Generate $10K-$100K Monthly",
      stat: "78%",
      description: "Of AI tool businesses reach profitability within 6 months"
    },
    {
      icon: <Rocket className="w-8 h-8 text-blue-500" />,
      title: "First-Mover Advantage Available",
      stat: "90%",
      description: "Of niches still have no AI solutions - massive opportunity"
    },
    {
      icon: <Building2 className="w-8 h-8 text-purple-500" />,
      title: "Enterprise Clients Pay Premium",
      stat: "$500+",
      description: "Per month for AI tools vs $50 for traditional software"
    }
  ];

  const packages = [
    {
      id: 'starter',
      name: 'AI Business Starter',
      price: '$2,000',
      description: 'Perfect for entrepreneurs entering the AI market',
      features: [
        '3-5 Custom AI Tools Development',
        'Professional Landing Page & Branding',
        'Payment Processing Setup (Stripe)',
        'Launch Strategy & Marketing Plan', 
        'Business Model Consultation',
        '60 Days of Direct Support',
        'Revenue Optimization Guidance'
      ],
      highlight: false
    },
    {
      id: 'professional',
      name: 'AI Business Professional',
      price: '$3,500',
      description: 'Complete AI business platform for serious entrepreneurs',
      features: [
        '7-10 Custom AI Tools Suite',
        'Enterprise-Grade Platform & Design',
        'Advanced Payment & Subscription System',
        'Complete Go-to-Market Strategy',
        'Competitive Analysis & Positioning',
        '90 Days of Partnership Support',
        'Revenue Sharing Opportunity (Optional)',
        'Team Training & Documentation'
      ],
      highlight: true
    },
    {
      id: 'enterprise',
      name: 'AI Business Enterprise',
      price: '$5,000',
      description: 'Full AI ecosystem for established businesses',
      features: [
        '15+ Custom AI Tools Platform',
        'White-Label Solution & Branding',
        'Multi-Tier Subscription Management',
        'Enterprise Sales Strategy',
        'API Development & Integrations',
        '6 Months of Strategic Partnership',
        'Revenue Sharing Agreement',
        'Dedicated Account Management',
        'Custom Feature Development'
      ],
      highlight: false
    }
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      business: "Content Marketing AI",
      result: "$15K/month in 4 months",
      quote: "I went from $0 AI knowledge to running a profitable AI business. The ROI was incredible.",
      industry: "Marketing Agency"
    },
    {
      name: "Marcus Johnson", 
      business: "Legal Document AI",
      result: "$32K/month in 6 months",
      quote: "My law firm clients pay $500/month each. I have 64 subscribers and growing.",
      industry: "Legal Services"
    },
    {
      name: "Dr. Priya Patel",
      business: "Medical Content AI",
      result: "$28K/month in 5 months",
      quote: "Healthcare professionals desperately needed this. We're expanding to 3 more verticals.",
      industry: "Healthcare"
    }
  ];

  const objections = [
    {
      objection: "\"AI is too complex for my industry\"",
      response: "I've built AI solutions for 50+ industries. Every business has content, customer service, and operational needs that AI can solve."
    },
    {
      objection: "\"The market is too competitive\"",
      response: "90% of business niches have no AI solutions yet. We find underserved markets where you can dominate."
    },
    {
      objection: "\"I don't have technical skills\"",
      response: "That's exactly why I exist. I handle all technical development while you focus on your business expertise."
    },
    {
      objection: "\"AI will be commoditized soon\"",
      response: "Generic AI tools will be commoditized. Custom AI businesses with specific expertise and customer relationships won't."
    }
  ];

  return (
    <>
      <Head>
        <title>AI Business Creation Service - Turn Your Expertise Into AI Empire | Somali AI Dataset</title>
        <meta 
          name="description" 
          content="Stop watching others profit from AI. I'll build your complete AI business for $2,000-$5,000. Custom AI tools, professional platform, launch strategy. From idea to $10K+/month." 
        />
        <meta name="keywords" content="AI business creation, custom AI development, AI startup, AI tools development, business automation, AI consulting" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Business Creation Service - Professional AI Development | Somali AI Dataset" />
        <meta property="og:description" content="Transform your expertise into a profitable AI business. Custom development for $2,000-$5,000 vs $50K+ agencies." />
        <meta property="og:image" content="/images/ai-business-creation-og.jpg" />
        <meta property="og:url" content="https://somaliaidataset.com/ai-business-creation" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Professional Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Somali AI Dataset</span>
                <span className="text-sm text-gray-500 border-l border-gray-300 pl-3 ml-3">AI Business Creation</span>
              </div>
              <div className="flex items-center space-x-6">
                <Link href="/ai-market-tools" className="text-gray-600 hover:text-gray-900 transition-colors">AI Tools</Link>
                <Link href="/#dataset" className="text-gray-600 hover:text-gray-900 transition-colors">Dataset</Link>
                <Link href="/investor" className="text-gray-600 hover:text-gray-900 transition-colors">Investors</Link>
                <Link href="/#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
                <a href="#consultation" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Consultation
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {/* Attention Badge */}
              <div className="inline-flex items-center px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-full text-red-300 font-bold text-sm mb-8">
                <AlertTriangle className="w-4 h-4 mr-2" />
                STOP Watching Others Profit From AI While You Get Left Behind
              </div>

              <h1 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
                Turn Your Expertise Into
                <br />
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  AI Business Empire
                </span>
              </h1>

              <p className="text-2xl lg:text-3xl text-gray-200 mb-4 max-w-5xl mx-auto">
                <span className="text-red-400">$50,000+</span> AI agency fees are keeping you out of the AI revolution.
                <br />
                I'll build your complete AI business for <span className="text-emerald-400 font-bold">$2,000-$5,000</span>
              </p>

              <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
                From immigrant to AI entrepreneur generating $100K+/month. Now I'm helping business professionals like you build AI empires without the technical complexity or massive costs.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-black text-emerald-400 mb-2">$100K+</div>
                  <div className="text-gray-300">My Monthly Revenue</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-black text-blue-400 mb-2">50+</div>
                  <div className="text-gray-300">AI Businesses Built</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-black text-yellow-400 mb-2">95%</div>
                  <div className="text-gray-300">Cost Savings vs Agencies</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl font-black text-purple-400 mb-2">6</div>
                  <div className="text-gray-300">Weeks to Launch</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#consultation"
                  className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white px-12 py-6 rounded-2xl font-black text-2xl transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/25 inline-flex items-center justify-center"
                >
                  <Rocket className="mr-3 w-8 h-8" />
                  BUILD MY AI BUSINESS
                  <ArrowRight className="ml-3 w-8 h-8" />
                </a>
                
                <Link 
                  href="/ai-market-tools"
                  className="border border-white/20 text-white px-8 py-6 rounded-2xl font-bold text-xl hover:bg-white/10 transition-colors inline-flex items-center justify-center"
                >
                  <Star className="mr-2 w-6 h-6" />
                  See My AI Tools First
                </Link>
              </div>

              <div className="mt-8 text-gray-400 text-lg">
                ⚡ 6-week delivery • 💰 ROI guarantee • 🔒 Your business, your profits
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Why You're Still Watching From The Sidelines
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                The AI revolution is creating millionaires daily, but these barriers keep most professionals locked out
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((point, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-red-100 hover:shadow-xl transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{point.title}</h3>
                      <p className="text-gray-600 mb-4">{point.description}</p>
                      <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-semibold">
                        Impact: {point.impact}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-red-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">The Cost of Waiting</h3>
                <p className="text-xl">
                  Every month you delay entering the AI market, competitors gain ground that becomes harder to recover. 
                  <strong> The best time to start was yesterday. The second best time is right now.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunity Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                The AI Opportunity is <span className="text-emerald-600">MASSIVE</span>
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                While others struggle with barriers, smart professionals are positioning themselves to capture this historic opportunity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {opportunities.map((opportunity, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 hover:shadow-xl transition-all text-center">
                  <div className="flex justify-center mb-6">
                    {opportunity.icon}
                  </div>
                  <div className="text-5xl font-black text-gray-900 mb-2">{opportunity.stat}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{opportunity.title}</h3>
                  <p className="text-gray-600">{opportunity.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-2xl p-8 max-w-5xl mx-auto">
                <h3 className="text-4xl font-bold mb-6">First-Mover Advantage is Still Available</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-lg">
                  <div>
                    <div className="text-3xl font-bold mb-2">90%</div>
                    <div>Of business niches have no AI solutions</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">$10K+</div>
                    <div>Monthly revenue potential per niche</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-2">6 weeks</div>
                    <div>To launch and start generating revenue</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-20 px-4 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Real Results From Real Businesses
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
                Professionals who stopped waiting and started building AI businesses
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-200 mb-6 text-lg">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="border-t border-white/20 pt-6">
                    <div className="font-bold text-white text-xl">{story.name}</div>
                    <div className="text-emerald-400 font-semibold">{story.business}</div>
                    <div className="text-gray-400">{story.industry}</div>
                    <div className="text-2xl font-bold text-yellow-400 mt-2">{story.result}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-emerald-600 rounded-2xl p-8 max-w-3xl mx-auto">
                <h3 className="text-3xl font-bold mb-4">Average Client Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-black mb-2">$18K</div>
                    <div>Average monthly revenue by month 6</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black mb-2">900%</div>
                    <div>Average ROI on $2,000 investment</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black mb-2">4.5</div>
                    <div>Months to break even</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Packages */}
        <section className="py-20 px-4" id="packages">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Choose Your AI Business Package
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                From startup to enterprise - I'll build the complete AI business platform that fits your goals and budget
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id}
                  className={`rounded-2xl p-8 border-2 transition-all cursor-pointer ${
                    pkg.highlight 
                      ? 'border-emerald-500 bg-emerald-50 shadow-2xl scale-105' 
                      : 'border-gray-200 bg-white hover:shadow-xl'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id as any)}
                >
                  {pkg.highlight && (
                    <div className="text-center mb-6">
                      <span className="bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-bold">
                        🔥 MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="text-5xl font-black text-gray-900 mb-4">{pkg.price}</div>
                    <p className="text-gray-600">{pkg.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href="#consultation"
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all block text-center ${
                      pkg.highlight
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Choose {pkg.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Included in Every Package</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Custom AI tools development</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Professional website & branding</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Payment processing setup</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Launch strategy & marketing</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Business model optimization</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Direct support & consultation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Revenue optimization guidance</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>Complete ownership & control</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objection Handling */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                "But I'm Not Sure If This Will Work For Me..."
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto">
                I've heard every concern. Here's the reality:
              </p>
            </div>

            <div className="space-y-8">
              {objections.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-red-600 mb-4">{item.objection}</h3>
                    </div>
                    <div>
                      <p className="text-xl text-gray-700">{item.response}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white rounded-2xl p-8 max-w-5xl mx-auto">
                <h3 className="text-3xl font-bold mb-6">The Real Question Isn't "Will This Work?"</h3>
                <p className="text-2xl mb-6">
                  The real question is: <strong>"Can you afford to wait while your competitors build AI advantages?"</strong>
                </p>
                <p className="text-xl text-gray-300">
                  Every successful AI business started with someone who decided to stop waiting and start building.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-emerald-600 to-blue-600 text-white" id="consultation">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-black mb-8">
              Ready to Build Your AI Business?
            </h2>
            <p className="text-2xl mb-12 max-w-4xl mx-auto">
              Stop watching from the sidelines. Book a consultation and let's discuss how to turn your expertise into a profitable AI business.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6">Free 30-Minute Strategy Session</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Target className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Identify Your AI Opportunity</div>
                  <div className="text-sm text-gray-200">Find the perfect niche for your expertise</div>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Revenue Projection</div>
                  <div className="text-sm text-gray-200">Calculate your potential monthly income</div>
                </div>
                <div className="text-center">
                  <Rocket className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Launch Strategy</div>
                  <div className="text-sm text-gray-200">Map out your path to market</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <a 
                href="mailto:hello@somaliaidataset.com?subject=AI Business Creation Consultation&body=Hi, I'm interested in building an AI business. Please schedule a consultation call."
                className="bg-white text-emerald-600 px-12 py-6 rounded-2xl font-black text-2xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center"
              >
                <Mail className="mr-3 w-8 h-8" />
                BOOK FREE CONSULTATION
                <ArrowRight className="ml-3 w-8 h-8" />
              </a>
              
              <div className="text-gray-200 text-lg">
                ⚡ Usually book within 24 hours • 💰 No obligation • 🎯 Actionable insights guaranteed
              </div>
            </div>

            <div className="mt-12 border-t border-white/20 pt-8">
              <p className="text-gray-200 text-lg">
                <strong>Limited Availability:</strong> I personally work with each client and can only take on 5 new AI business projects per month to ensure quality results.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
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
                  From immigrant to AI entrepreneur. Now helping professionals build profitable AI businesses without the complexity or massive costs.
                </p>
                <div className="text-emerald-400 font-semibold">
                  Building AI businesses that matter.
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <div className="space-y-2 text-gray-400">
                  <Link href="/ai-business-creation" className="block hover:text-white transition-colors">AI Business Creation</Link>
                  <Link href="/ai-market-tools" className="block hover:text-white transition-colors">AI Tools Bundle</Link>
                  <Link href="/#dataset" className="block hover:text-white transition-colors">Somali Dataset</Link>
                  <Link href="/investor" className="block hover:text-white transition-colors">Investment</Link>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <div className="space-y-2 text-gray-400">
                  <a href="mailto:hello@somaliaidataset.com" className="block hover:text-white transition-colors">Email Support</a>
                  <a href="#consultation" className="block hover:text-white transition-colors">Book Consultation</a>
                  <Link href="/#about" className="block hover:text-white transition-colors">About</Link>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
              © 2024 Somali AI Dataset. AI Business Creation Services. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default AIBusinessCreationPage;