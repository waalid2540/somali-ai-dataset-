import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ArrowRight, 
  BookOpen,
  Users,
  Award,
  Briefcase,
  Globe,
  Zap,
  Target,
  CheckCircle,
  Play,
  Clock,
  Star,
  TrendingUp,
  Code,
  Brain,
  Robot,
  GraduationCap,
  Stethoscope,
  Mosque,
  Palette,
  Building2,
  DollarSign,
  Database,
  Rocket
} from 'lucide-react';

export default function SomaiAcademy() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const careerPaths = [
    {
      id: 'ai-developer',
      title: 'AI Developer',
      icon: <Code className="w-8 h-8" />,
      description: 'Build real tools and solve real-world problems. Ship apps, deploy agents, launch platforms.',
      duration: '4-6 months',
      difficulty: 'Beginner to Advanced',
      salary: '$80K - $150K',
      jobCount: '50K+ jobs',
      color: 'from-blue-600 to-cyan-600',
      skills: ['JavaScript/Python', 'API Integration', 'App Development', 'Deployment'],
      workplaces: ['Startups', 'Freelance platforms', 'Software companies', 'Open-source communities'],
      builds: ['Chatbots', 'Assistants', 'Mobile tools', 'Voice interfaces', 'Internal AI systems']
    },
    {
      id: 'ai-engineer',
      title: 'AI Engineer',
      icon: <Brain className="w-8 h-8" />,
      description: 'Go deep into AI architecture. Work with LLMs, MLOps, vector databases, embeddings.',
      duration: '6-8 months',
      difficulty: 'Intermediate to Advanced',
      salary: '$120K - $200K+',
      jobCount: '25K+ jobs',
      color: 'from-purple-600 to-pink-600',
      skills: ['Machine Learning', 'LLM Architecture', 'Vector Databases', 'MLOps'],
      workplaces: ['Big Tech (Google, OpenAI)', 'AI research startups', 'Enterprise AI teams', 'Government units'],
      builds: ['AI workflows', 'Memory systems', 'Fine-tuned models', 'AI middleware', 'Production pipelines']
    },
    {
      id: 'ai-automation',
      title: 'AI Automation Specialist',
      icon: <Robot className="w-8 h-8" />,
      description: 'Replace repetitive work with intelligent systems. Make businesses efficient with no-code AI.',
      duration: '3-4 months',
      difficulty: 'Beginner to Intermediate',
      salary: '$60K - $120K',
      jobCount: '40K+ jobs',
      color: 'from-green-600 to-emerald-600',
      skills: ['Process Automation', 'No-code Tools', 'Workflow Design', 'Business Analysis'],
      workplaces: ['Agencies', 'Remote teams', 'Small businesses', 'Online stores', 'Internal ops'],
      builds: ['Email automation', 'Review systems', 'Report generators', 'Scheduling bots', 'Customer support']
    },
    {
      id: 'ai-education',
      title: 'AI in Education',
      icon: <GraduationCap className="w-8 h-8" />,
      description: 'Reinvent learning from schools to self-study. Make education faster, cheaper, personalized.',
      duration: '4-5 months',
      difficulty: 'Beginner to Intermediate',
      salary: '$50K - $100K',
      jobCount: '30K+ jobs',
      color: 'from-orange-600 to-red-600',
      skills: ['Educational Technology', 'Learning Systems', 'Content Creation', 'Assessment Tools'],
      workplaces: ['EdTech startups', 'Online course platforms', 'Schools', 'Tutoring centers', 'Language apps'],
      builds: ['AI tutors', 'Grading bots', 'Homework helpers', 'Progress dashboards', 'Multilingual education']
    },
    {
      id: 'ai-healthcare',
      title: 'AI in Healthcare',
      icon: <Stethoscope className="w-8 h-8" />,
      description: 'Use AI to assist patients, providers, and public health systems with compassion + efficiency.',
      duration: '5-6 months',
      difficulty: 'Intermediate',
      salary: '$70K - $130K',
      jobCount: '20K+ jobs',
      color: 'from-teal-600 to-cyan-600',
      skills: ['Healthcare Systems', 'Medical AI', 'Privacy/HIPAA', 'Clinical Workflows'],
      workplaces: ['Hospitals', 'Medical startups', 'Remote clinics', 'Health nonprofits', 'Interpreter services'],
      builds: ['Documentation tools', 'Triage assistants', 'Appointment systems', 'Health education bots', 'Translation tools']
    },
    {
      id: 'ai-values',
      title: 'AI for Values-Based Innovation',
      icon: <Mosque className="w-8 h-8" />,
      description: 'Use AI to protect, elevate, and serve communities. The conscience of AI development.',
      duration: '4-5 months',
      difficulty: 'Beginner to Intermediate',
      salary: '$60K - $110K',
      jobCount: '15K+ jobs',
      color: 'from-amber-600 to-yellow-600',
      skills: ['Ethical AI', 'Cultural Sensitivity', 'Community Engagement', 'Bias Detection'],
      workplaces: ['Faith organizations', 'Cultural institutions', 'Community builders', 'NGOs', 'Educational leaders'],
      builds: ['Ethical AI systems', 'Cultural language models', 'Spiritual guidance platforms', 'Community storytelling tools']
    },
    {
      id: 'ai-creator',
      title: 'AI Creator / Content Generator',
      icon: <Palette className="w-8 h-8" />,
      description: 'Use AI to make content — fast, smart, and scalable. Future of creative media.',
      duration: '3-4 months',
      difficulty: 'Beginner to Intermediate',
      salary: '$50K - $120K',
      jobCount: '35K+ jobs',
      color: 'from-pink-600 to-rose-600',
      skills: ['Content Creation', 'Creative AI', 'Media Production', 'Brand Development'],
      workplaces: ['Media brands', 'Agencies', 'Influencers', 'YouTubers', 'Personal businesses'],
      builds: ['AI videos', 'Voice generation', 'Design templates', 'News summaries', 'Podcasts', 'Visual content']
    },
    {
      id: 'ai-government',
      title: 'AI in Government & Civic Tech',
      icon: <Building2 className="w-8 h-8" />,
      description: 'Make public systems smarter, more responsive, and inclusive. Serve communities better.',
      duration: '4-6 months',
      difficulty: 'Intermediate',
      salary: '$65K - $120K',
      jobCount: '10K+ jobs',
      color: 'from-indigo-600 to-purple-600',
      skills: ['Civic Technology', 'Public Service', 'Accessibility', 'Government Systems'],
      workplaces: ['Cities and states', 'NGOs', 'Civic startups', 'Public outreach', 'Human rights orgs'],
      builds: ['Language access agents', 'Service bots', 'Government FAQ chat', 'Community feedback tools', 'Accessibility interfaces']
    },
    {
      id: 'ai-consultant',
      title: 'AI Business Coach / Consultant',
      icon: <DollarSign className="w-8 h-8" />,
      description: 'Help others grow using AI power. Make AI understandable and valuable to entrepreneurs.',
      duration: '3-4 months',
      difficulty: 'Beginner to Intermediate',
      salary: '$70K - $150K+',
      jobCount: '25K+ jobs',
      color: 'from-emerald-600 to-green-600',
      skills: ['Business Strategy', 'AI Consulting', 'Training & Coaching', 'Marketing'],
      workplaces: ['Remote coaching', 'Marketing agencies', 'AI platforms', 'YouTube channels', 'Client businesses'],
      builds: ['AI content strategies', 'Business automation', 'Workflow design', 'Audience building', 'Sales optimization']
    },
    {
      id: 'dataset-engineer',
      title: 'Dataset & LLM Engineer',
      icon: <Database className="w-8 h-8" />,
      description: 'Specialize in data that feeds models. Foundation of every smart AI system in the world.',
      duration: '5-7 months',
      difficulty: 'Intermediate to Advanced',
      salary: '$100K - $180K',
      jobCount: '15K+ jobs',
      color: 'from-violet-600 to-purple-600',
      skills: ['Data Engineering', 'Model Training', 'Vector Search', 'Data Quality'],
      workplaces: ['Research labs', 'NLP startups', 'LLM teams', 'Dataset marketplaces', 'AI model builders'],
      builds: ['Data cleaning pipelines', 'Fine-tuning systems', 'Embeddings', 'Language alignment', 'Vector optimization']
    },
    {
      id: 'ai-founder',
      title: 'AI Startup Founder',
      icon: <Rocket className="w-8 h-8" />,
      description: 'Launch AI-powered businesses. Create markets, don\'t just follow them. Build the future.',
      duration: '6-12 months',
      difficulty: 'Advanced',
      salary: '$100K - $1M+',
      jobCount: 'Unlimited',
      color: 'from-red-600 to-pink-600',
      skills: ['Entrepreneurship', 'AI Strategy', 'Fundraising', 'Product Development'],
      workplaces: ['Your own startup', 'Accelerators', 'Venture capital', 'Tech hubs', 'Global markets'],
      builds: ['AI platforms', 'SaaS products', 'Mobile apps', 'Enterprise tools', 'Community solutions']
    }
  ];

  const academyStats = [
    { number: '11', label: 'Career Paths', icon: <Target className="w-5 h-5" /> },
    { number: '50+', label: 'Practical Projects', icon: <Briefcase className="w-5 h-5" /> },
    { number: '100%', label: 'Job-Ready Skills', icon: <Award className="w-5 h-5" /> },
    { number: '24/7', label: 'Community Support', icon: <Users className="w-5 h-5" /> }
  ];

  return (
    <>
      <Head>
        <title>Somai Academy - AI Career Training for Global Success</title>
        <meta name="description" content="Master AI skills with practical, career-focused training. 11 high-income career paths designed for global success. Join the AI revolution." />
        <meta name="keywords" content="AI training, AI careers, AI education, AI courses, AI certification, tech careers, AI jobs" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Somai Academy
                  </span>
                  <p className="text-xs text-gray-500">AI Career Training</p>
                </div>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link href="/subscription" className="text-gray-600 hover:text-gray-900">AI Tools</Link>
                <Link href="#careers" className="text-gray-600 hover:text-gray-900">Careers</Link>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-blue-800 font-semibold text-sm mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Global • Practical • High-Income AI Careers
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
              Master AI Skills.<br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Launch Your Career.
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto">
              11 career paths designed for real-world success. Learn by building actual projects, get job-ready skills, and join a global community of AI professionals. No theory. Just results.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-purple-400 transition-all flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Careers
              </button>
            </div>

            {/* Academy Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {academyStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-blue-600">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-black text-gray-900">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Paths Section */}
        <section id="careers" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Choose Your AI Career Path
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each path includes hands-on projects, real-world applications, and direct connections to hiring companies. No fluff, just skills that pay.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {careerPaths.map((path, index) => (
                <div
                  key={path.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedPath(path.id)}
                >
                  <div className={`h-2 bg-gradient-to-r ${path.color}`}></div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${path.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                        {path.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-green-600">{path.salary}</div>
                        <div className="text-xs text-gray-500">{path.jobCount}</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{path.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{path.description}</p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {path.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {path.difficulty}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-gray-700">Top Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {path.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className={`w-full mt-4 bg-gradient-to-r ${path.color} text-white py-2 rounded-lg hover:shadow-md transition-all flex items-center justify-center`}>
                      Explore Path
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Somai Academy Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Why Choose Somai Academy?
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                We don't just teach AI theory. We build AI professionals who can ship products, land jobs, and create value from day one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">100% Practical</h3>
                <p className="text-blue-100">
                  Every lesson includes hands-on projects. Build real tools, solve real problems, create a portfolio that employers want to see.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Global Community</h3>
                <p className="text-blue-100">
                  Connect with students and professionals worldwide. Get mentorship, find collaborators, and access job opportunities globally.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Career-Focused</h3>
                <p className="text-blue-100">
                  Direct pathways to high-income careers. We track salary outcomes, job placement rates, and career progression of our graduates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Ready to Start Your AI Career?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of students building the future with AI. Start with a free trial and see the difference practical education makes.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-purple-400 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold">Somai Academy</span>
                </div>
                <p className="text-gray-400">
                  Empowering global careers through practical AI education.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Career Paths</h4>
                <div className="space-y-2 text-gray-400">
                  <Link href="#ai-developer" className="block hover:text-white">AI Developer</Link>
                  <Link href="#ai-engineer" className="block hover:text-white">AI Engineer</Link>
                  <Link href="#ai-automation" className="block hover:text-white">AI Automation</Link>
                  <Link href="#ai-creator" className="block hover:text-white">AI Creator</Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <div className="space-y-2 text-gray-400">
                  <Link href="#" className="block hover:text-white">Free Courses</Link>
                  <Link href="#" className="block hover:text-white">Career Guide</Link>
                  <Link href="#" className="block hover:text-white">Community</Link>
                  <Link href="#" className="block hover:text-white">Job Board</Link>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <div className="space-y-2 text-gray-400">
                  <Link href="/" className="block hover:text-white">Home</Link>
                  <Link href="/subscription" className="block hover:text-white">AI Tools</Link>
                  <Link href="#" className="block hover:text-white">About</Link>
                  <Link href="#" className="block hover:text-white">Contact</Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 Somai Academy. Empowering AI careers globally.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}