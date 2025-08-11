import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  ArrowLeft,
  ArrowRight,
  Play,
  CheckCircle,
  Clock,
  Users,
  Award,
  Briefcase,
  Globe,
  Star,
  TrendingUp,
  Target,
  BookOpen,
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

const careerPathsData = {
  'ai-developer': {
    id: 'ai-developer',
    title: 'AI Developer',
    icon: <Code className="w-8 h-8" />,
    description: 'Build real tools and solve real-world problems. Ship apps, deploy agents, launch platforms.',
    longDescription: 'AI Developers are the builders of the AI revolution. They create applications that users interact with daily - from chatbots that help customers to mobile apps powered by AI. This path focuses on practical development skills, teaching you to build, deploy, and scale AI applications that solve real business problems.',
    duration: '4-6 months',
    difficulty: 'Beginner to Advanced',
    salary: '$80K - $150K',
    jobCount: '50K+ jobs',
    color: 'from-blue-600 to-cyan-600',
    skills: ['JavaScript/Python', 'API Integration', 'App Development', 'Deployment'],
    workplaces: ['Startups', 'Freelance platforms', 'Software companies', 'Open-source communities'],
    builds: ['Chatbots', 'Assistants', 'Mobile tools', 'Voice interfaces', 'Internal AI systems'],
    modules: [
      {
        id: 1,
        title: 'Foundation: Programming for AI',
        duration: '3 weeks',
        lessons: [
          'JavaScript/Python fundamentals for AI',
          'Understanding APIs and data flow',
          'Git version control and collaboration',
          'Setting up development environment'
        ],
        project: 'Build a simple weather chatbot using API calls'
      },
      {
        id: 2,
        title: 'AI Integration Basics',
        duration: '4 weeks',
        lessons: [
          'OpenAI API integration and authentication',
          'Prompt engineering fundamentals',
          'Error handling and rate limiting',
          'Data validation and security'
        ],
        project: 'Create an AI-powered writing assistant web app'
      },
      {
        id: 3,
        title: 'Building User Interfaces',
        duration: '4 weeks',
        lessons: [
          'React fundamentals for AI apps',
          'State management for AI responses',
          'Real-time UI updates and streaming',
          'Mobile-responsive design'
        ],
        project: 'Build a customer service chatbot with web interface'
      },
      {
        id: 4,
        title: 'Backend & Database',
        duration: '3 weeks',
        lessons: [
          'Node.js server setup and routing',
          'Database design for AI applications',
          'User authentication and sessions',
          'API design and documentation'
        ],
        project: 'Create a full-stack AI tool with user accounts'
      },
      {
        id: 5,
        title: 'Advanced AI Features',
        duration: '4 weeks',
        lessons: [
          'File upload and processing',
          'Image and voice AI integration',
          'Multi-agent workflows',
          'Performance optimization'
        ],
        project: 'Build a multi-modal AI assistant (text, voice, images)'
      },
      {
        id: 6,
        title: 'Deployment & Scaling',
        duration: '3 weeks',
        lessons: [
          'Cloud deployment (Vercel, Render, AWS)',
          'Environment variables and secrets',
          'Monitoring and error tracking',
          'Scaling and performance optimization'
        ],
        project: 'Deploy and scale your AI application to production'
      },
      {
        id: 7,
        title: 'Portfolio & Career',
        duration: '2 weeks',
        lessons: [
          'Building a developer portfolio',
          'Open source contributions',
          'Technical interview preparation',
          'Freelancing and job hunting strategies'
        ],
        project: 'Create a professional portfolio showcasing your AI projects'
      }
    ],
    outcomes: [
      'Build 7+ AI applications from scratch',
      'Deploy production-ready apps to the cloud',
      'Create a professional developer portfolio',
      'Master modern development tools and workflows',
      'Connect with hiring companies and clients'
    ]
  },
  'ai-engineer': {
    id: 'ai-engineer',
    title: 'AI Engineer',
    icon: <Brain className="w-8 h-8" />,
    description: 'Go deep into AI architecture. Work with LLMs, MLOps, vector databases, embeddings.',
    longDescription: 'AI Engineers are the architects of intelligent systems. They design and build the infrastructure that powers AI applications at scale. This advanced path covers machine learning operations, model fine-tuning, vector databases, and the deep technical skills needed for senior AI roles.',
    duration: '6-8 months',
    difficulty: 'Intermediate to Advanced',
    salary: '$120K - $200K+',
    jobCount: '25K+ jobs',
    color: 'from-purple-600 to-pink-600',
    skills: ['Machine Learning', 'LLM Architecture', 'Vector Databases', 'MLOps'],
    workplaces: ['Big Tech (Google, OpenAI)', 'AI research startups', 'Enterprise AI teams', 'Government units'],
    builds: ['AI workflows', 'Memory systems', 'Fine-tuned models', 'AI middleware', 'Production pipelines'],
    modules: [
      {
        id: 1,
        title: 'Machine Learning Fundamentals',
        duration: '4 weeks',
        lessons: [
          'ML concepts and algorithms overview',
          'Python for machine learning (NumPy, Pandas)',
          'Data preprocessing and feature engineering',
          'Model evaluation and validation'
        ],
        project: 'Build a classification model for business data'
      },
      {
        id: 2,
        title: 'Large Language Models Deep Dive',
        duration: '5 weeks',
        lessons: [
          'Transformer architecture and attention mechanisms',
          'Pre-training vs fine-tuning concepts',
          'Prompt engineering advanced techniques',
          'Model selection and evaluation'
        ],
        project: 'Fine-tune a language model for specific use case'
      },
      {
        id: 3,
        title: 'Vector Databases & Embeddings',
        duration: '4 weeks',
        lessons: [
          'Embedding models and vector representations',
          'Vector database setup (Pinecone, Chroma)',
          'Similarity search and retrieval',
          'Building RAG (Retrieval Augmented Generation) systems'
        ],
        project: 'Create an intelligent document search system'
      },
      {
        id: 4,
        title: 'MLOps and Production Systems',
        duration: '5 weeks',
        lessons: [
          'Model versioning and experiment tracking',
          'Containerization with Docker',
          'Automated testing for ML models',
          'Monitoring model performance in production'
        ],
        project: 'Build an end-to-end ML pipeline with monitoring'
      },
      {
        id: 5,
        title: 'Advanced AI Architecture',
        duration: '4 weeks',
        lessons: [
          'Multi-agent systems design',
          'Memory systems and state management',
          'AI workflow orchestration',
          'Scalability and performance optimization'
        ],
        project: 'Design a complex multi-agent AI system'
      },
      {
        id: 6,
        title: 'Enterprise AI Implementation',
        duration: '3 weeks',
        lessons: [
          'Security and privacy in AI systems',
          'Enterprise integration patterns',
          'Cost optimization strategies',
          'Compliance and governance'
        ],
        project: 'Build an enterprise-ready AI solution'
      },
      {
        id: 7,
        title: 'Career & Leadership',
        duration: '2 weeks',
        lessons: [
          'Technical leadership in AI teams',
          'Research paper analysis and implementation',
          'Speaking and presenting technical concepts',
          'Building your professional network'
        ],
        project: 'Present a technical solution to stakeholders'
      }
    ],
    outcomes: [
      'Design and implement production AI systems',
      'Work with cutting-edge AI research and tools',
      'Lead technical AI projects and teams',
      'Optimize AI systems for scale and performance',
      'Land senior roles at top AI companies'
    ]
  }
  // Add more career paths here as needed
};

export default function CareerPath() {
  const router = useRouter();
  const { career } = router.query;
  const [activeModule, setActiveModule] = useState(1);
  
  const careerData = careerPathsData[career as string];

  if (!careerData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Career Path Not Found</h1>
          <Link href="/academy" className="text-blue-600 hover:underline">
            Return to Academy
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{careerData.title} - Somai Academy</title>
        <meta name="description" content={careerData.description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/academy" className="flex items-center space-x-3 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Academy</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-12">
              <div className="flex-1">
                <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${careerData.color} bg-opacity-10 rounded-full text-blue-800 font-semibold text-sm mb-6`}>
                  {careerData.icon}
                  <span className="ml-2">Career Path</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                  {careerData.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  {careerData.longDescription}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-black text-gray-900">{careerData.duration}</div>
                    <div className="text-gray-600 text-sm">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-green-600">{careerData.salary}</div>
                    <div className="text-gray-600 text-sm">Salary Range</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-purple-600">{careerData.jobCount}</div>
                    <div className="text-gray-600 text-sm">Available Jobs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-orange-600">{careerData.difficulty}</div>
                    <div className="text-gray-600 text-sm">Level</div>
                  </div>
                </div>

                <button className={`bg-gradient-to-r ${careerData.color} text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center`}>
                  <Play className="w-5 h-5 mr-2" />
                  Start Free Trial
                </button>
              </div>

              <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">What You'll Build</h3>
                  <div className="space-y-4">
                    {careerData.builds.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Career Outcomes</h4>
                    <div className="space-y-2">
                      {careerData.outcomes.map((outcome, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-gray-600 text-sm">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Complete Curriculum
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hands-on modules designed to take you from beginner to job-ready professional. Each module includes practical projects and real-world applications.
              </p>
            </div>

            <div className="space-y-6">
              {careerData.modules.map((module, index) => (
                <div
                  key={module.id}
                  className={`bg-white rounded-xl border-2 transition-all duration-300 ${
                    activeModule === module.id 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => setActiveModule(activeModule === module.id ? 0 : module.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                          activeModule === module.id 
                            ? `bg-gradient-to-r ${careerData.color}` 
                            : 'bg-gray-400'
                        }`}>
                          {module.id}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {module.duration}
                            </div>
                            <div className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-1" />
                              {module.lessons.length} lessons
                            </div>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-transform ${
                        activeModule === module.id ? 'rotate-90' : ''
                      }`} />
                    </div>

                    {activeModule === module.id && (
                      <div className="mt-6 pl-16">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Lessons:</h4>
                            <ul className="space-y-2">
                              {module.lessons.map((lesson, idx) => (
                                <li key={idx} className="flex items-start space-x-3">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                                  <span className="text-gray-700 text-sm">{lesson}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Capstone Project:</h4>
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                              <div className="flex items-start space-x-3">
                                <Target className="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                  <p className="text-gray-800 font-medium">{module.project}</p>
                                  <p className="text-gray-600 text-sm mt-2">
                                    Build a real-world application that demonstrates your mastery of the concepts.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-6">
              Ready to Start Your {careerData.title} Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of students already building careers in AI. Get hands-on experience, build a portfolio, and connect with hiring companies.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className={`bg-gradient-to-r ${careerData.color} text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center`}>
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-gray-900 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}