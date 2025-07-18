import React, { useState } from 'react';
import { ArrowLeft, Download, Palette, Type, Layers, Zap, Star, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const LogoGenerator = () => {
  const [language, setLanguage] = useState('english');
  const [isPurchased, setIsPurchased] = useState(false);
  const [logoConfig, setLogoConfig] = useState({
    companyName: '',
    tagline: '',
    industry: '',
    style: 'modern',
    colors: ['#3B82F6', '#10B981'],
    font: 'bold'
  });

  const [generatedLogos, setGeneratedLogos] = useState([
    {
      id: 1,
      style: 'Modern Tech',
      preview: 'https://via.placeholder.com/300x200/3B82F6/ffffff?text=LOGO+1',
      colors: ['#3B82F6', '#10B981']
    },
    {
      id: 2,
      style: 'Professional',
      preview: 'https://via.placeholder.com/300x200/10B981/ffffff?text=LOGO+2',
      colors: ['#10B981', '#3B82F6']
    },
    {
      id: 3,
      style: 'Creative',
      preview: 'https://via.placeholder.com/300x200/8B5CF6/ffffff?text=LOGO+3',
      colors: ['#8B5CF6', '#F59E0B']
    },
    {
      id: 4,
      style: 'Minimalist',
      preview: 'https://via.placeholder.com/300x200/1F2937/ffffff?text=LOGO+4',
      colors: ['#1F2937', '#6B7280']
    }
  ]);

  const handlePurchase = () => {
    // This would integrate with actual payment processing
    alert('Redirecting to payment for Logo Generator - $47 one-time unlimited access');
    // Simulate purchase success
    setTimeout(() => {
      setIsPurchased(true);
    }, 2000);
  };

  const generateLogos = () => {
    if (!isPurchased) {
      alert('Please purchase unlimited access to generate custom logos');
      return;
    }
    
    // Simulate logo generation
    alert(language === 'english' 
      ? 'Generating custom logos with your specifications...' 
      : 'Waxaa la sameynayaa astaamaha gaarka ah ee qoraalkaaga...'
    );
  };

  const downloadLogo = (logoId: number) => {
    if (!isPurchased) {
      alert('Please purchase unlimited access to download logos');
      return;
    }
    alert(language === 'english' 
      ? `Downloading logo ${logoId} in high resolution...` 
      : `Waxaa la soo degeynayaa astaan ${logoId} tasvir sare...'`
    );
  };

  if (!isPurchased) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Navigation */}
        <nav className="bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/ai-tools" className="flex items-center text-gray-300 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {language === 'english' ? 'Back to AI Tools' : 'Ku noqo Qaladaha AI'}
              </Link>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="english">🇺🇸 English</option>
                <option value="somali">🇸🇴 Somali</option>
              </select>
            </div>
          </div>
        </nav>

        {/* Purchase Page */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Palette className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {language === 'english' ? 'AI Logo Generator' : 'Sameye Astaan AI'}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {language === 'english' 
                ? 'Create unlimited professional logos with English and Somali text support'
                : 'Samee astaamaho xirfad leh oo aan xaddidnayn leh taageero qoraal Ingiriis iyo Soomaali'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {language === 'english' ? 'Logo Previews' : 'Muuqaal Astaamaha'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {generatedLogos.map((logo) => (
                  <div key={logo.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <img 
                      src={logo.preview} 
                      alt={`Logo ${logo.id}`}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <p className="text-gray-300 text-sm text-center">{logo.style}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Section */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-white mb-2">$47</div>
                <div className="text-emerald-400 font-semibold mb-2">
                  {language === 'english' ? 'One-Time Payment' : 'Hal Mar Lacag Bixin'}
                </div>
                <div className="text-gray-400">
                  {language === 'english' ? 'Unlimited Access Forever' : 'Isticmaal Aan Xaddidnayn Weligaa'}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  language === 'english' ? 'Unlimited logo generations' : 'Sameyn astaamaho aan xaddidnayn',
                  language === 'english' ? 'English & Somali text support' : 'Taageero qoraal Ingiriis iyo Soomaali',
                  language === 'english' ? 'High-resolution downloads' : 'Soo degin tasvir sare',
                  language === 'english' ? 'Commercial license included' : 'Shatiga ganacsi oo ku jira',
                  language === 'english' ? 'Multiple file formats' : 'Noocyo faylal kala duwan',
                  language === 'english' ? '24/7 access forever' : 'Helitaan 24/7 weligaa'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                {language === 'english' ? 'Get Unlimited Access - $47' : 'Hel Isticmaal Xaddidlaan - $47'}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                {language === 'english' 
                  ? 'Secure payment processing • 30-day money-back guarantee'
                  : 'Nidaam lacag bixin ammaan • 30 maalmood lacag-celis dhamaad'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/ai-tools" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'english' ? 'Back to AI Tools' : 'Ku noqo Qaladaha AI'}
            </Link>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {language === 'english' ? 'UNLIMITED ACCESS' : 'ISTICMAAL XADDIDLAAN'}
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
              >
                <option value="english">🇺🇸 English</option>
                <option value="somali">🇸🇴 Somali</option>
              </select>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logo Configuration */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Type className="w-6 h-6 mr-3" />
                {language === 'english' ? 'Logo Settings' : 'Dejinta Astaan'}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Company Name' : 'Magaca Shirkada'}
                  </label>
                  <input
                    type="text"
                    value={logoConfig.companyName}
                    onChange={(e) => setLogoConfig({...logoConfig, companyName: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder={language === 'english' ? 'Enter company name' : 'Gali magaca shirkada'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Tagline (Optional)' : 'Hal-ku-dhig (Ikhtiyaari)'}
                  </label>
                  <input
                    type="text"
                    value={logoConfig.tagline}
                    onChange={(e) => setLogoConfig({...logoConfig, tagline: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder={language === 'english' ? 'Enter tagline' : 'Gali hal-ku-dhig'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Industry' : 'Warshadaha'}
                  </label>
                  <select
                    value={logoConfig.industry}
                    onChange={(e) => setLogoConfig({...logoConfig, industry: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">{language === 'english' ? 'Select industry' : 'Dooro warshadaha'}</option>
                    <option value="technology">{language === 'english' ? 'Technology' : 'Teknoloji'}</option>
                    <option value="restaurant">{language === 'english' ? 'Restaurant' : 'Makhayad'}</option>
                    <option value="retail">{language === 'english' ? 'Retail' : 'Iibka'}</option>
                    <option value="consulting">{language === 'english' ? 'Consulting' : 'La-talin'}</option>
                    <option value="healthcare">{language === 'english' ? 'Healthcare' : 'Daryeelka Caafimaadka'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Style' : 'Qaabka'}
                  </label>
                  <select
                    value={logoConfig.style}
                    onChange={(e) => setLogoConfig({...logoConfig, style: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="modern">{language === 'english' ? 'Modern' : 'Casri'}</option>
                    <option value="classic">{language === 'english' ? 'Classic' : 'Dhaqameed'}</option>
                    <option value="creative">{language === 'english' ? 'Creative' : 'Hal-abuurnimo'}</option>
                    <option value="minimalist">{language === 'english' ? 'Minimalist' : 'Yar'}</option>
                  </select>
                </div>

                <button
                  onClick={generateLogos}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  {language === 'english' ? 'Generate Logos' : 'Samee Astaamaha'}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Logos */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-8">
              {language === 'english' ? 'Your Generated Logos' : 'Astaamahaaga La Sameeyay'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedLogos.map((logo) => (
                <div key={logo.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <img 
                    src={logo.preview} 
                    alt={`Logo ${logo.id}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{logo.style}</h3>
                      <div className="flex space-x-2 mt-2">
                        {logo.colors.map((color, index) => (
                          <div 
                            key={index}
                            className="w-6 h-6 rounded-full border-2 border-gray-600"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => downloadLogo(logo.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {language === 'english' ? 'Download HD' : 'Soo Deg HD'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoGenerator;