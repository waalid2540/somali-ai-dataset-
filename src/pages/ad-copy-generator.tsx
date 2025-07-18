import React, { useState } from 'react';
import { ArrowLeft, Copy, Megaphone, Target, Zap, DollarSign, CheckCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const AdCopyGenerator = () => {
  const [language, setLanguage] = useState('english');
  const [isPurchased, setIsPurchased] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('facebook');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [adConfig, setAdConfig] = useState({
    product: '',
    audience: '',
    goal: 'sales',
    tone: 'professional'
  });

  const [generatedAds, setGeneratedAds] = useState([
    {
      id: 1,
      platform: 'Facebook',
      language: 'English',
      headline: '🚀 Transform Your Business with AI-Powered Solutions!',
      body: 'Discover how thousands of entrepreneurs are scaling their businesses using our cutting-edge AI tools. Join the revolution and unlock unlimited growth potential today!',
      cta: 'Start Free Trial'
    },
    {
      id: 2,
      platform: 'Facebook',
      language: 'Somali',
      headline: '🚀 Beddel Ganacsigaaga iyada oo AI la isticmaalayo!',
      body: 'Ogow sida kumanaan ganacsato oo koritaanaya ganacsigoodii iyagoo adeegsanaya qaladaha AI-ga ugu horreeya. Ku biir kacaankaan oo fur fursadaha koritaan aan xadidnayn!',
      cta: 'Bilow Tijaabo Bilaash'
    },
    {
      id: 3,
      platform: 'Google Ads',
      language: 'English',
      headline: 'AI Business Tools | 50% Off Limited Time',
      body: 'Professional AI tools for modern entrepreneurs. Generate logos, ads, content & more. Unlimited access, one-time payment.',
      cta: 'Get 50% Off Now'
    },
    {
      id: 4,
      platform: 'Instagram',
      language: 'Somali',
      headline: 'Qaladaha AI-ga Xirfadda leh 🎯',
      body: 'Samee astaamaha, xayaysiisyo, qoraal iyo wax kale oo badan. Isticmaal aan xadadnayn, hal mar lacag bixin. Bilow maanta! #SomaliAI #TechSomalia',
      cta: 'Bilow Hada'
    }
  ]);

  const handlePurchase = () => {
    alert('Redirecting to payment for Ad Copy Generator - $37 one-time unlimited access');
    setTimeout(() => {
      setIsPurchased(true);
    }, 2000);
  };

  const generateNewAds = () => {
    if (!isPurchased) {
      alert('Please purchase unlimited access to generate custom ad copy');
      return;
    }
    
    alert(language === 'english' 
      ? 'Generating new ad copy with your specifications...' 
      : 'Waxaa la sameynayaa xayaysiisyo cusub oo ku habboon qoraalkaaga...'
    );
  };

  const copyToClipboard = (text: string) => {
    if (!isPurchased) {
      alert('Please purchase unlimited access to copy ad content');
      return;
    }
    navigator.clipboard.writeText(text);
    alert(language === 'english' ? 'Copied to clipboard!' : 'Waxaa lagu koobiyay clipboard-ka!');
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
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Megaphone className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              {language === 'english' ? 'AI Ad Copy Generator' : 'Sameye Xayaysiisyo AI'}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {language === 'english' 
                ? 'Generate unlimited high-converting ad copy in English and Somali'
                : 'Samee xayaysiisyo aan xadadnayn leh oo sii-jiidaya macaamiisha Ingiriis iyo Soomaali'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview Section */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {language === 'english' ? 'Ad Copy Examples' : 'Tusaalayaal Xayaysiisyo'}
              </h3>
              <div className="space-y-4">
                {generatedAds.slice(0, 2).map((ad) => (
                  <div key={ad.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-blue-400 font-semibold">{ad.platform}</span>
                      <span className="text-emerald-400 text-sm">{ad.language}</span>
                    </div>
                    <h4 className="text-white font-bold mb-2">{ad.headline}</h4>
                    <p className="text-gray-300 text-sm mb-3">{ad.body}</p>
                    <div className="bg-blue-600 text-white text-center py-2 rounded text-sm font-semibold">
                      {ad.cta}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Section */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-white mb-2">$37</div>
                <div className="text-emerald-400 font-semibold mb-2">
                  {language === 'english' ? 'One-Time Payment' : 'Hal Mar Lacag Bixin'}
                </div>
                <div className="text-gray-400">
                  {language === 'english' ? 'Unlimited Access Forever' : 'Isticmaal Aan Xaddidnayn Weligaa'}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  language === 'english' ? 'Unlimited ad copy generation' : 'Sameyn xayaysiisyo aan xaddidnayn',
                  language === 'english' ? 'Facebook, Google, Instagram formats' : 'Qaabab Facebook, Google, Instagram',
                  language === 'english' ? 'Bilingual content creation' : 'Abuuritaan qoraal luuqad-labaad',
                  language === 'english' ? 'Cultural context optimization' : 'Habaynta macnaha dhaqameed',
                  language === 'english' ? 'A/B testing variations' : 'Kala-soocid tijaabooyin A/B',
                  language === 'english' ? 'Export to all platforms' : 'Dheeheyn dhammaan goobaha'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handlePurchase}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                {language === 'english' ? 'Get Unlimited Access - $37' : 'Hel Isticmaal Xaddidlaan - $37'}
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
          {/* Ad Configuration */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3" />
                {language === 'english' ? 'Ad Settings' : 'Dejinta Xayaysiisyo'}
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Platform' : 'Goobta'}
                  </label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="facebook">Facebook</option>
                    <option value="google">Google Ads</option>
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Ad Language' : 'Luuqada Xayaysiiska'}
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="english">🇺🇸 English</option>
                    <option value="somali">🇸🇴 Somali</option>
                    <option value="both">{language === 'english' ? '🌍 Both Languages' : '🌍 Labada Luuqad'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Product/Service' : 'Alaab/Adeeg'}
                  </label>
                  <input
                    type="text"
                    value={adConfig.product}
                    onChange={(e) => setAdConfig({...adConfig, product: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder={language === 'english' ? 'What are you advertising?' : 'Maxaad xayaysiinaysaa?'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Target Audience' : 'Macaamiisha Bartilmaameedka'}
                  </label>
                  <input
                    type="text"
                    value={adConfig.audience}
                    onChange={(e) => setAdConfig({...adConfig, audience: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder={language === 'english' ? 'Who is your audience?' : 'Yaa ah macaamiishaaga?'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Campaign Goal' : 'Hadafka Ololaha'}
                  </label>
                  <select
                    value={adConfig.goal}
                    onChange={(e) => setAdConfig({...adConfig, goal: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="sales">{language === 'english' ? 'Drive Sales' : 'Kordhi Iibka'}</option>
                    <option value="leads">{language === 'english' ? 'Generate Leads' : 'Hel Macaamiil'}</option>
                    <option value="awareness">{language === 'english' ? 'Brand Awareness' : 'Aqoonsiga Calaamadda'}</option>
                    <option value="traffic">{language === 'english' ? 'Website Traffic' : 'Booqitaanka Website-ka'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {language === 'english' ? 'Tone' : 'Codka'}
                  </label>
                  <select
                    value={adConfig.tone}
                    onChange={(e) => setAdConfig({...adConfig, tone: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="professional">{language === 'english' ? 'Professional' : 'Xirfad leh'}</option>
                    <option value="casual">{language === 'english' ? 'Casual' : 'Caadi'}</option>
                    <option value="urgent">{language === 'english' ? 'Urgent' : 'Degdeg ah'}</option>
                    <option value="friendly">{language === 'english' ? 'Friendly' : 'Saaxiib'}</option>
                  </select>
                </div>

                <button
                  onClick={generateNewAds}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  {language === 'english' ? 'Generate New Ads' : 'Samee Xayaysiisyo Cusub'}
                </button>
              </div>
            </div>
          </div>

          {/* Generated Ads */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-8">
              {language === 'english' ? 'Your Generated Ad Copy' : 'Xayaysiisyadaada La Sameeyay'}
            </h2>
            
            <div className="space-y-6">
              {generatedAds.map((ad) => (
                <div key={ad.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold">
                        {ad.platform}
                      </span>
                      <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-semibold">
                        {ad.language}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${ad.headline}\n\n${ad.body}\n\n${ad.cta}`)}
                      className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      {language === 'english' ? 'Copy' : 'Koobiyeey'}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 uppercase tracking-wide">
                        {language === 'english' ? 'Headline' : 'Cinwaanka'}
                      </label>
                      <p className="text-white font-bold text-lg">{ad.headline}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 uppercase tracking-wide">
                        {language === 'english' ? 'Body Text' : 'Qoraalka Dhexe'}
                      </label>
                      <p className="text-gray-300">{ad.body}</p>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 uppercase tracking-wide">
                        {language === 'english' ? 'Call to Action' : 'Wicitaanka Ficilka'}
                      </label>
                      <div className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold">
                        {ad.cta}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCopyGenerator;