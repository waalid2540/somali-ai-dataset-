import React, { useState } from 'react';
import { ArrowRight, Globe, Zap, Star, DollarSign, Image, FileText, Receipt, Megaphone, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const AIToolsPage = () => {
  const [language, setLanguage] = useState('english');

  const tools = [
    {
      id: 'logo-generator',
      title: 'AI Logo Generator',
      description: 'Create professional logos in seconds with bilingual text support',
      icon: Image,
      price: 47,
      features: [
        'Unlimited logo generations',
        'English & Somali text support',
        'High-resolution downloads',
        'Commercial license included',
        'Multiple file formats (PNG, SVG, PDF)',
        '24/7 access forever'
      ],
      gradient: 'from-blue-600 to-emerald-600'
    },
    {
      id: 'ad-copy-generator',
      title: 'Ad Copy Generator',
      description: 'Generate compelling marketing copy in English and Somali',
      icon: Megaphone,
      price: 37,
      features: [
        'Unlimited ad copy generation',
        'Facebook, Google, Instagram formats',
        'Bilingual content creation',
        'Cultural context optimization',
        'A/B testing variations',
        'Export to all platforms'
      ],
      gradient: 'from-emerald-600 to-blue-600'
    },
    {
      id: 'invoice-generator',
      title: 'Invoice Generator',
      description: 'Professional invoices with multilingual support',
      icon: Receipt,
      price: 27,
      features: [
        'Unlimited invoice creation',
        'English & Somali language options',
        'Professional templates',
        'Tax calculations',
        'PDF export',
        'Client management'
      ],
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      id: 'content-writer',
      title: 'Content Writer AI',
      description: 'Blog posts, articles, and web content in both languages',
      icon: FileText,
      price: 57,
      features: [
        'Unlimited content generation',
        'SEO-optimized writing',
        'Bilingual capabilities',
        'Multiple content types',
        'Plagiarism-free guarantee',
        'Research integration'
      ],
      gradient: 'from-orange-600 to-red-600'
    }
  ];

  const handlePurchase = (toolId: string, price: number) => {
    // This would integrate with actual payment processing
    alert(`Redirecting to payment for ${toolId} - $${price} one-time unlimited access`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Somali AI Dataset
              </span>
            </Link>
            <div className="flex items-center space-x-6">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="english">🇺🇸 English</option>
                <option value="somali">🇸🇴 Somali</option>
              </select>
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
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-900/50 to-emerald-900/50 border border-blue-500/30 mb-8">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-blue-200 font-medium">AI Marketplace Tools - One-Time Unlimited Access</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            AI Tools for
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
              {language === 'english' ? 'Global Business' : 'Ganacsi Caalami Ah'}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {language === 'english' 
              ? <>Professional AI tools that work in <strong className="text-blue-400">English</strong> and <strong className="text-emerald-400">Somali</strong>. One-time payment, unlimited access forever.</>
              : <>Qaladaha AI-ga xirfadda leh oo ka shaqeeya <strong className="text-blue-400">Ingiriis</strong> iyo <strong className="text-emerald-400">Soomaali</strong>. Hal mar lacag bixin, isticmaal aan xadidnayn weligaa.</>
            }
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                {language === 'english' ? 'ONE-TIME' : 'HAL MAR'}
              </div>
              <div className="text-gray-400">
                {language === 'english' ? 'Payment Only' : 'Lacag Bixin Keliya'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                {language === 'english' ? 'UNLIMITED' : 'XADIDLAAN'}
              </div>
              <div className="text-gray-400">
                {language === 'english' ? 'Usage Forever' : 'Isticmaal Weligaa'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {language === 'english' ? 'BILINGUAL' : 'LUUQAD LABAAD'}
              </div>
              <div className="text-gray-400">
                {language === 'english' ? 'EN + SO Support' : 'EN + SO Taageero'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              {language === 'english' ? 'Professional AI Tools' : 'Qaladaha AI-ga Xirfadda leh'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {language === 'english' 
                ? 'Build your business with AI tools that understand both cultures and languages'
                : 'Dhis ganacsigaaga iyadoo la isticmaalayo qalabka AI-ga oo fahanaya dhaqamada iyo luqadaha labada'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <div 
                  key={tool.id}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center mr-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{tool.title}</h3>
                      <p className="text-gray-300">{tool.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl font-bold text-white">${tool.price}</span>
                      <div className="ml-3">
                        <div className="text-emerald-400 font-semibold">
                          {language === 'english' ? 'One-time payment' : 'Hal mar lacag bixin'}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {language === 'english' ? 'Unlimited access forever' : 'Isticmaal aan xadidnayn weligaa'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-300">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      if (tool.id === 'logo-generator') {
                        window.location.href = '/logo-generator';
                      } else if (tool.id === 'ad-copy-generator') {
                        window.location.href = '/ad-copy-generator';
                      } else if (tool.id === 'invoice-generator') {
                        window.location.href = '/invoice-generator';
                      } else {
                        handlePurchase(tool.id, tool.price);
                      }
                    }}
                    className={`w-full bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center`}
                  >
                    <DollarSign className="w-5 h-5 mr-2" />
                    {language === 'english' ? `Get Unlimited Access - $${tool.price}` : `Hel Isticmaal Xadidlaan - $${tool.price}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Tools */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              {language === 'english' ? 'Why Choose Our AI Tools?' : 'Maxaa loo dooranayaa Qaladaha AI-ga?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'english' ? 'Bilingual AI' : 'AI Luuqad Labaad'}
              </h3>
              <p className="text-gray-300">
                {language === 'english' 
                  ? 'First AI tools that truly understand both English and Somali cultures'
                  : 'Qaladaha AI-ga ugu horreeyay ee dhab ahaan fahanaya dhaqanka Ingiriiska iyo Soomaalida'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'english' ? 'One-Time Payment' : 'Hal Mar Lacag Bixin'}
              </h3>
              <p className="text-gray-300">
                {language === 'english' 
                  ? 'No monthly subscriptions. Pay once, use forever with unlimited access'
                  : 'Ma jiraan lacag-bixin bil kasta. Hal mar lacag bixin, weligaa isticmaal'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'english' ? 'Cultural Authenticity' : 'Dhaqan Asaasi'}
              </h3>
              <p className="text-gray-300">
                {language === 'english' 
                  ? 'Built by Somali cultural authority with deep understanding of both markets'
                  : 'Waxaa dhisay mas\'uul dhaqan Soomaali oo si qoto dheer u fahanaya labada suuq'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {language === 'english' 
              ? 'Start Building Your Business Today' 
              : 'Bilow Dhismahaagaaga Ganacsiga Maanta'
            }
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            {language === 'english' 
              ? 'Join thousands of entrepreneurs using our AI tools to dominate their markets'
              : 'Ku biir kumanaan ganacsato oo adeegsanaya qaladaha AI-ga si ay u taliyaan suuqooda'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#tools"
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105"
            >
              {language === 'english' ? 'Choose Your Tools' : 'Dooro Qaladahaaga'}
              <ArrowRight className="ml-2 w-5 h-5 inline" />
            </Link>
            <Link 
              href="/"
              className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-white/5"
            >
              {language === 'english' ? 'Learn More' : 'Wax Badan Baro'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Somali AI Dataset - AI Tools
            </span>
          </div>
          <p className="text-gray-400">
            {language === 'english' 
              ? '© 2024 Somali AI Dataset. Professional AI tools for global business.'
              : '© 2024 Somali AI Dataset. Qaladaha AI-ga xirfadda leh ganacsiga caalamiga ah.'
            }
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AIToolsPage;