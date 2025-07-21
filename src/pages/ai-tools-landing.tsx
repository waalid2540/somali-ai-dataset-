// AI Tools Bundle Landing Page - ONE-TIME PAYMENT $19.99 - No Subscriptions!
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
  BarChart3
} from 'lucide-react';

function AIToolsLandingPage() {
  const [showPricingDetails, setShowPricingDetails] = useState(false);

  const tools = [
    { name: 'Blog Post Generator', icon: '📝', category: 'Content' },
    { name: 'Social Media AI', icon: '📱', category: 'Content' },
    { name: 'Ad Copy Creator', icon: '📢', category: 'Content' },
    { name: 'Email Marketing AI', icon: '📧', category: 'Content' },
    { name: 'Product Description AI', icon: '🛍️', category: 'Content' },
    { name: 'Invoice Generator AI', icon: '📄', category: 'Business' },
    { name: 'Contract Creator AI', icon: '📋', category: 'Business' },
    { name: 'Proposal Writer AI', icon: '💼', category: 'Business' },
    { name: 'Resume Builder AI', icon: '📄', category: 'Business' },
    { name: 'Job Description AI', icon: '👔', category: 'Business' },
    { name: 'Business Name Generator', icon: '🏢', category: 'Creative' },
    { name: 'Slogan Creator AI', icon: '💭', category: 'Creative' },
    { name: 'Presentation AI', icon: '📊', category: 'Creative' },
    { name: 'Script Writer AI', icon: '🎬', category: 'Creative' },
    { name: 'Newsletter AI', icon: '📰', category: 'Creative' },
    { name: 'Translation AI', icon: '🌍', category: 'Communication' },
    { name: 'Chatbot Builder AI', icon: '🤖', category: 'Communication' },
    { name: 'Meeting Summarizer AI', icon: '📝', category: 'Communication' },
    { name: 'Review Response AI', icon: '⭐', category: 'Communication' },
    { name: 'Customer Service AI', icon: '🎧', category: 'Communication' }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechStart Inc",
      image: "/testimonials/sarah.jpg",
      content: "This AI tools bundle saved us $800+ monthly. The Blog Generator alone generates 10x more content than our previous solution.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Small Business Owner",
      company: "Rodriguez Consulting",
      image: "/testimonials/marcus.jpg",
      content: "Finally, professional AI tools that don't break the bank. The Invoice Generator and Contract Creator are game-changers.",
      rating: 5
    },
    {
      name: "Emily Watson",
      role: "Content Creator",
      company: "Watson Media",
      image: "/testimonials/emily.jpg",
      content: "20 tools for the price of one? This is incredible value. My productivity increased 300% in the first month.",
      rating: 5
    }
  ];

  const competitors = [
    { name: "Jasper AI", price: "$39/month", tools: "5 tools", limitation: "Limited features" },
    { name: "Copy.ai", price: "$35/month", tools: "8 tools", limitation: "Usage limits" },
    { name: "Writesonic", price: "$45/month", tools: "6 tools", limitation: "Word limits" },
    { name: "Our Bundle", price: "$19.99/month", tools: "20 tools", limitation: "No limits", highlight: true }
  ];

  return (
    <>
      <Head>
        <title>AI Tools Bundle - 20 Professional AI Tools for $19.99/month | 97% Savings</title>
        <meta 
          name="description" 
          content="Get 20 professional AI tools including Blog Generator, Social Media AI, Ad Copy Creator, and more for just $19.99/month. Save 97% compared to buying individual tools. Used by 50,000+ entrepreneurs worldwide." 
        />
        <meta name="keywords" content="AI tools bundle, artificial intelligence, content generation, blog writing, social media marketing, business automation, Jasper AI alternative, Copy.ai alternative" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Tools Bundle - 20 Professional AI Tools for $19.99/month" />
        <meta property="og:description" content="Save 97% with our complete AI tools bundle. 20 professional tools for the price of one." />
        <meta property="og:image" content="/images/ai-tools-bundle-og.jpg" />
        <meta property="og:url" content="https://yoursite.com/ai-tools-landing" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tools Bundle - 20 AI Tools for $19.99/month" />
        <meta name="twitter:description" content="Professional AI tools bundle with 97% savings. Used by 50,000+ entrepreneurs." />
        <meta name="twitter:image" content="/images/ai-tools-bundle-twitter.jpg" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AI Tools Bundle</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#tools" className="text-gray-600 hover:text-gray-900">Tools</a>
                <a href="#testimonials" className="text-gray-600 hover:text-gray-900">Reviews</a>
                <Link href="/ai-tools-bundle" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Get Access $19.99
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {/* Social Proof Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-8">
                <Users className="w-4 h-4 mr-2" />
                Trusted by 50,000+ entrepreneurs worldwide
              </div>

              <div className="mb-6">
                <span className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                  🔥 LIMITED TIME: 75% OFF - WAS $79.99
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                20 AI Tools for
                <br />
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  $19.99 ONLY
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                <strong className="text-green-600">ONE-TIME PAYMENT</strong> - No subscriptions, no monthly fees! 
                Get lifetime access to all 20 professional AI tools that would cost <strong className="text-red-500">$1,200+ per year</strong> individually.
              </p>

              {/* Value Proposition */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl font-bold text-green-600 mb-2">$1,200+</div>
                  <div className="text-gray-600">Annual Savings</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl font-bold text-blue-600 mb-2">20</div>
                  <div className="text-gray-600">Professional Tools</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                  <div className="text-gray-600">Lifetime Access</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/ai-tools-bundle"
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  Get Instant Access - $19.99
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors">
                  Watch Demo
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-4">
                <span>✅ Instant Access</span>
                <span>✅ No Monthly Fees</span>
                <span>✅ 30-Day Guarantee</span>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">
              Stop Paying <span className="text-red-500">$1,200+ Per Year</span> for AI Tool Subscriptions!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="text-red-500 text-4xl mb-4">💸</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Expensive Subscriptions</h3>
                <p className="text-gray-600">Individual AI tools cost $15-50/month each. 20 tools = $1,200+ annually. Crazy expensive!</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="text-red-500 text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Time Wasted</h3>
                <p className="text-gray-600">Switching between different platforms and learning multiple interfaces.</p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="text-red-500 text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Limited Features</h3>
                <p className="text-gray-600">Most tools have usage limits, restrictions, and missing features you need.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-8">
              Introducing the Complete <span className="text-blue-600">AI Tools Bundle</span>
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Everything you need to automate your business, create content, and scale your operations - all in one place for just $19.99/month.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">20 Professional AI Tools</h3>
                      <p className="text-gray-600">Content creation, business automation, marketing, and communication tools.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Unlimited Usage</h3>
                      <p className="text-gray-600">No word limits, no generation limits, no restrictions on usage.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">97% Cost Savings</h3>
                      <p className="text-gray-600">Save $780+ monthly compared to buying tools individually.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">One Dashboard</h3>
                      <p className="text-gray-600">Access all tools from a single, unified dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-2">$19.99</div>
                  <div className="text-lg text-gray-600 mb-4">per month</div>
                  <div className="text-sm text-green-600 font-medium mb-6">vs $800+ individually</div>
                  <Link 
                    href="/ai-tools-bundle"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all inline-block"
                  >
                    Start Free Trial
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Grid Section */}
        <section id="tools" className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Complete Arsenal of AI Tools
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every tool you need to run and grow your business, all in one bundle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tools.map((tool, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">{tool.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                href="/ai-tools-bundle"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 inline-flex items-center"
              >
                Try All Tools Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section id="pricing" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Compare and Save 97%
              </h2>
              <p className="text-xl text-gray-600">
                See how our bundle compares to popular AI tools like Jasper, Copy.ai, and Writesonic.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-6 font-semibold text-gray-900">Service</th>
                    <th className="text-center p-6 font-semibold text-gray-900">Price/Month</th>
                    <th className="text-center p-6 font-semibold text-gray-900">AI Tools</th>
                    <th className="text-center p-6 font-semibold text-gray-900">Limitations</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((competitor, index) => (
                    <tr key={index} className={`border-b border-gray-100 ${competitor.highlight ? 'bg-green-50' : ''}`}>
                      <td className="p-6 font-semibold text-gray-900">{competitor.name}</td>
                      <td className="p-6 text-center font-semibold">{competitor.price}</td>
                      <td className="p-6 text-center">{competitor.tools}</td>
                      <td className="p-6 text-center text-gray-600">{competitor.limitation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <div className="inline-flex items-center px-6 py-3 bg-green-100 rounded-full text-green-800 font-semibold">
                <TrendingUp className="w-5 h-5 mr-2" />
                Save $780+ monthly with our bundle
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                What Our Users Say
              </h2>
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-current text-yellow-400" />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-900">4.9/5 from 2,847 reviews</span>
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
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
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

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Get All 20 AI Tools for Just $19.99!
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join 50,000+ entrepreneurs who chose our one-time payment over expensive subscriptions.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                <div className="text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">One-Time Payment</div>
                  <div className="text-sm text-green-100">No monthly subscriptions</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">30-Day Guarantee</div>
                  <div className="text-sm text-green-100">100% money back</div>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Instant Access</div>
                  <div className="text-sm text-green-100">Download immediately</div>
                </div>
              </div>
            </div>

            <Link 
              href="/ai-tools-bundle"
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold text-xl hover:bg-yellow-300 transition-all transform hover:scale-105 inline-flex items-center"
            >
              Get Instant Access - $19.99
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            
            <div className="mt-6 text-green-100 text-sm">
              ⚡ Limited Time: 75% OFF • 50,000+ happy customers • Rated 4.9/5 stars
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">AI Tools Bundle</span>
            </div>
            <p className="text-gray-400 mb-8">
              20 professional AI tools for entrepreneurs and businesses worldwide.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Support</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400 text-sm">
              © 2024 AI Tools Bundle. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default AIToolsLandingPage;