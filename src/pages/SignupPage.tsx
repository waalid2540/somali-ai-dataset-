import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Globe, Shield, Zap, CreditCard } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    organization: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('unlimited');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Register user with backend
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          organization: formData.organization
        })
      });

      if (response.ok) {
        const userData = await response.json();
        
        if (selectedPlan === 'unlimited') {
          // Redirect to Stripe Checkout for payment
          const stripe = await (window as any).Stripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY');
          
          const checkoutResponse = await fetch('http://localhost:8000/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: formData.email,
              plan: 'unlimited',
              price_id: 'price_YOUR_STRIPE_PRICE_ID'
            })
          });

          const session = await checkoutResponse.json();
          await stripe.redirectToCheckout({ sessionId: session.id });
        } else {
          // Free plan - redirect to dashboard
          window.location.href = '/dashboard';
        }
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Somali AI Dataset
              </span>
            </div>
            <a 
              href="/" 
              className="flex items-center text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                Join Somali AI Dataset
              </h1>
              <p className="text-gray-300">
                Start building with the world's first professional Somali AI dataset
              </p>
            </div>

            {/* Plan Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Choose Your Plan</h3>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPlan === 'free' 
                      ? 'border-blue-500 bg-blue-900/20' 
                      : 'border-gray-600 bg-gray-800/20'
                  }`}
                  onClick={() => setSelectedPlan('free')}
                >
                  <h4 className="font-bold text-white">Free Trial</h4>
                  <div className="text-2xl font-bold text-gray-400 my-2">$0</div>
                  <p className="text-sm text-gray-300">100 API requests</p>
                </div>
                
                <div 
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all relative ${
                    selectedPlan === 'unlimited' 
                      ? 'border-emerald-500 bg-emerald-900/20' 
                      : 'border-gray-600 bg-gray-800/20'
                  }`}
                  onClick={() => setSelectedPlan('unlimited')}
                >
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold">
                      POPULAR
                    </span>
                  </div>
                  <h4 className="font-bold text-white">Unlimited Pro</h4>
                  <div className="text-2xl font-bold text-emerald-400 my-2">$9.99</div>
                  <p className="text-sm text-gray-300">Unlimited requests</p>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Organization (Optional)
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Company or organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? (
                  'Processing...'
                ) : selectedPlan === 'unlimited' ? (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Subscribe for $9.99/month
                  </>
                ) : (
                  'Start Free Trial'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-blue-400 hover:text-blue-300">
                  Sign in here
                </a>
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs">
                🔒 Secure payments by Stripe • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="flex-1 bg-black/20 flex items-center justify-center px-8 py-12">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-8">
              Why Choose Somali AI Dataset?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Scholar Approved</h3>
                  <p className="text-gray-300">
                    Every piece of content is validated by Islamic scholars and cultural experts for 100% authenticity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Enterprise Performance</h3>
                  <p className="text-gray-300">
                    Lightning-fast API responses, 99.9% uptime, and enterprise-grade security.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">25M+ Speakers</h3>
                  <p className="text-gray-300">
                    Serving the global Somali community with culturally authentic content.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/30 to-emerald-900/30 rounded-xl border border-blue-500/20">
              <h4 className="font-bold text-white mb-3">What You Get:</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Unlimited API access
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  150+ religious sentences
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  95%+ quality scores
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
                  Commercial license
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Script */}
      <script src="https://js.stripe.com/v3/"></script>
    </div>
  );
};

export default SignupPage;