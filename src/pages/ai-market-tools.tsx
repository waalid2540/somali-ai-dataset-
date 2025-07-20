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
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
    { name: 'Chatbot Builder AI', icon: '🤖', category: 'Communication', description: 'Customer service bots' },
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
        <meta property="og:description" content="Professional AI Market Tools by Somali AI Dataset. 20 enterprise-grade tools for $19.99/month." />
        <meta property="og:image" content="/images/ai-market-tools-og.jpg" />
        <meta property="og:url" content="https://somaliaidataset.com/ai-market-tools" />
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
                <span className="text-sm text-gray-500 border-l border-gray-300 pl-3 ml-3">Professional AI Market Tools</span>
              </div>
              <div className="flex items-center space-x-6">
                <Link href="/#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</Link>
                <Link href="/#dataset" className="text-gray-600 hover:text-gray-900 transition-colors">Dataset</Link>
                <Link href="/ai-meeting-pro" className="text-gray-600 hover:text-gray-900 transition-colors">Meeting AI</Link>
                <Link href="/investor" className="text-gray-600 hover:text-gray-900 transition-colors">Investors</Link>
                <Link href="/ai-tools-bundle" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Try Tools
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-blue-50 to-emerald-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {/* Professional Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-8">
                <Building2 className="w-4 h-4 mr-2" />
                Trusted by 500+ Enterprise Organizations
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Professional
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  AI Market Tools
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                Enterprise-grade AI tools suite by <strong className="text-blue-600">Somali AI Dataset</strong>. 
                20 professional tools for content creation, business automation, and market operations.
              </p>

              {/* Professional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">20</div>
                  <div className="text-gray-600">Enterprise Tools</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
                  <div className="text-gray-600">Organizations</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl font-bold text-purple-600 mb-2">97%</div>
                  <div className="text-gray-600">Cost Savings</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                  <div className="text-gray-600">Enterprise Support</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/ai-tools-bundle"
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-emerald-700 transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Access Enterprise Tools
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  href="/investor"
                  className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Building2 className="mr-2 w-5 h-5" />
                  Investment Opportunities
                </Link>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                Professional enterprise licensing • Multi-language support • 24/7 support
              </div>
            </div>
          </div>
        </section>

        {/* Professional Tools Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Complete Enterprise AI Suite
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional-grade AI tools designed for enterprise operations, content creation, and business automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-200 group">
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{tool.description}</p>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/ai-tools-bundle"
                className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-emerald-700 transition-all transform hover:scale-105 inline-flex items-center"
              >
                Access All Enterprise Tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Professional Pricing */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Enterprise Pricing
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              Professional AI tools suite with enterprise support and multi-language capabilities.
            </p>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-gray-900 mb-2">$19.99</div>
                <div className="text-lg text-gray-600 mb-4">per month</div>
                <div className="text-sm text-emerald-600 font-medium mb-6">Enterprise License Included</div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <Check className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="font-semibold">20 Professional Tools</div>
                    <div className="text-sm text-gray-600">Complete enterprise suite</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="font-semibold">Enterprise Support</div>
                    <div className="text-sm text-gray-600">24/7 professional assistance</div>
                  </div>
                  <div className="text-center">
                    <Globe className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                    <div className="font-semibold">Multi-Language</div>
                    <div className="text-sm text-gray-600">Including Somali support</div>
                  </div>
                </div>

                <Link 
                  href="/ai-tools-bundle"
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all inline-block"
                >
                  Start Enterprise Trial
                </Link>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center px-6 py-3 bg-emerald-100 rounded-full text-emerald-800 font-semibold">
                <TrendingUp className="w-5 h-5 mr-2" />
                Save $780+ monthly vs individual enterprise tools
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
                href="/ai-tools-bundle"
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
                  <Link href="/ai-tools-bundle" className="block hover:text-white transition-colors">Tools Suite</Link>
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