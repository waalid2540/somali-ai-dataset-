// Somai Academy Course Data Structure
// This file contains all course information for the 11 career paths

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'project' | 'quiz' | 'live';
  description: string;
  resources: string[];
  completed: boolean;
}

export interface Module {
  id: number;
  title: string;
  duration: string;
  description: string;
  lessons: Lesson[];
  project: {
    title: string;
    description: string;
    deliverables: string[];
    timeline: string;
  };
  skills: string[];
  completed: boolean;
}

export interface CareerPath {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Beginner to Advanced' | 'Intermediate to Advanced';
  salary: string;
  jobCount: string;
  color: string;
  icon: string;
  skills: string[];
  workplaces: string[];
  builds: string[];
  outcomes: string[];
  modules: Module[];
  prerequisites: string[];
  certification: {
    name: string;
    description: string;
    requirements: string[];
  };
  careerSupport: {
    resume: boolean;
    portfolio: boolean;
    interviews: boolean;
    jobBoard: boolean;
    mentorship: boolean;
  };
}

// Course Templates - Ready for your content
export const academyCourses: Record<string, CareerPath> = {
  'ai-developer': {
    id: 'ai-developer',
    title: 'AI Developer',
    subtitle: 'Build Real AI Applications',
    description: 'Build real tools and solve real-world problems. Ship apps, deploy agents, launch platforms.',
    longDescription: 'AI Developers are the builders of the AI revolution. They create applications that users interact with daily - from chatbots that help customers to mobile apps powered by AI. This path focuses on practical development skills, teaching you to build, deploy, and scale AI applications that solve real business problems.',
    duration: '4-6 months',
    difficulty: 'Beginner to Advanced',
    salary: '$80K - $150K',
    jobCount: '50,000+ jobs',
    color: 'from-blue-600 to-cyan-600',
    icon: 'Code',
    skills: ['JavaScript/Python', 'React/Next.js', 'API Integration', 'Cloud Deployment', 'AI Integration'],
    workplaces: ['Tech Startups', 'Software Companies', 'Freelance Platforms', 'Open Source Projects', 'Your Own Startup'],
    builds: ['AI Chatbots', 'Voice Assistants', 'Mobile AI Apps', 'Web AI Tools', 'Internal AI Systems'],
    outcomes: [
      'Build 10+ AI applications from scratch',
      'Deploy production-ready apps to the cloud',
      'Create a professional developer portfolio',
      'Master modern development workflows',
      'Land your first AI developer role'
    ],
    prerequisites: ['Basic computer skills', 'Willingness to learn programming', 'Access to computer with internet'],
    certification: {
      name: 'Certified AI Application Developer',
      description: 'Industry-recognized certification demonstrating your ability to build and deploy AI applications',
      requirements: ['Complete all modules', 'Build 5 portfolio projects', 'Pass final assessment']
    },
    careerSupport: {
      resume: true,
      portfolio: true,
      interviews: true,
      jobBoard: true,
      mentorship: true
    },
    modules: [
      {
        id: 1,
        title: 'Programming Foundations for AI',
        duration: '3 weeks',
        description: 'Master the programming fundamentals needed for AI development',
        completed: false,
        skills: ['JavaScript ES6+', 'Python Basics', 'Git & GitHub', 'API Concepts'],
        lessons: [
          {
            id: '1-1',
            title: 'JavaScript for AI Developers',
            duration: '45 mins',
            type: 'video',
            description: 'Learn modern JavaScript concepts essential for AI app development',
            resources: ['Code examples', 'Practice exercises', 'Cheat sheet'],
            completed: false
          },
          {
            id: '1-2',
            title: 'Python Fundamentals',
            duration: '60 mins',
            type: 'video',
            description: 'Master Python basics for AI and data processing',
            resources: ['Python scripts', 'Interactive coding', 'Reference guide'],
            completed: false
          },
          {
            id: '1-3',
            title: 'Version Control with Git',
            duration: '30 mins',
            type: 'video',
            description: 'Professional code management and collaboration',
            resources: ['Git commands', 'GitHub setup', 'Best practices'],
            completed: false
          },
          {
            id: '1-4',
            title: 'Understanding APIs',
            duration: '40 mins',
            type: 'video',
            description: 'How APIs work and how to integrate them',
            resources: ['API documentation', 'Testing tools', 'Example requests'],
            completed: false
          }
        ],
        project: {
          title: 'Build Your First AI-Powered Tool',
          description: 'Create a simple weather assistant that answers questions about weather using an API',
          deliverables: ['Working web application', 'GitHub repository', 'README documentation'],
          timeline: '1 week'
        }
      },
      {
        id: 2,
        title: 'AI Integration & OpenAI APIs',
        duration: '4 weeks',
        description: 'Learn to integrate AI capabilities into applications',
        completed: false,
        skills: ['OpenAI API', 'Prompt Engineering', 'Error Handling', 'Authentication'],
        lessons: [
          {
            id: '2-1',
            title: 'OpenAI API Setup and Authentication',
            duration: '35 mins',
            type: 'video',
            description: 'Set up your development environment and authenticate with OpenAI',
            resources: ['API keys setup', 'Environment variables', 'Security best practices'],
            completed: false
          },
          {
            id: '2-2',
            title: 'Prompt Engineering Mastery',
            duration: '55 mins',
            type: 'video',
            description: 'Craft effective prompts that get the results you want',
            resources: ['Prompt templates', 'Testing framework', 'Optimization techniques'],
            completed: false
          },
          {
            id: '2-3',
            title: 'Handling AI Responses',
            duration: '40 mins',
            type: 'video',
            description: 'Process, validate, and display AI-generated content',
            resources: ['Response parsing', 'Error handling', 'Data validation'],
            completed: false
          },
          {
            id: '2-4',
            title: 'Rate Limiting and Optimization',
            duration: '30 mins',
            type: 'video',
            description: 'Manage API costs and optimize performance',
            resources: ['Cost monitoring', 'Caching strategies', 'Performance tips'],
            completed: false
          }
        ],
        project: {
          title: 'AI Writing Assistant Web App',
          description: 'Build a web application that helps users write better content with AI assistance',
          deliverables: ['React web app', 'Multiple AI features', 'User-friendly interface', 'Deployed application'],
          timeline: '1.5 weeks'
        }
      }
      // Additional modules will be added here as courses are developed
    ]
  },

  'ai-engineer': {
    id: 'ai-engineer',
    title: 'AI Engineer',
    subtitle: 'Deep AI Architecture & Systems',
    description: 'Go deep into AI architecture. Work with LLMs, MLOps, vector databases, embeddings.',
    longDescription: 'AI Engineers are the architects behind intelligent systems. They design and build the infrastructure that powers AI at scale - from fine-tuning models to building vector databases. This advanced path prepares you for senior technical roles at leading AI companies.',
    duration: '6-8 months',
    difficulty: 'Intermediate to Advanced',
    salary: '$120K - $200K+',
    jobCount: '25,000+ jobs',
    color: 'from-purple-600 to-pink-600',
    icon: 'Brain',
    skills: ['Machine Learning', 'Python/PyTorch', 'Vector Databases', 'MLOps', 'Model Fine-tuning'],
    workplaces: ['Big Tech (Google, OpenAI)', 'AI Research Labs', 'Enterprise AI Teams', 'AI Startups', 'Government Research'],
    builds: ['ML Pipelines', 'Vector Search Systems', 'Fine-tuned Models', 'AI Infrastructure', 'Research Prototypes'],
    outcomes: [
      'Design production ML systems',
      'Fine-tune and deploy custom models',
      'Build scalable AI infrastructure',
      'Lead technical AI projects',
      'Join top-tier AI companies'
    ],
    prerequisites: ['Programming experience (Python preferred)', 'Basic understanding of math/statistics', 'Familiarity with command line'],
    certification: {
      name: 'Certified AI Systems Engineer',
      description: 'Advanced certification for AI infrastructure and systems design',
      requirements: ['Complete all modules', 'Build production ML system', 'Technical presentation']
    },
    careerSupport: {
      resume: true,
      portfolio: true,
      interviews: true,
      jobBoard: true,
      mentorship: true
    },
    modules: [
      {
        id: 1,
        title: 'Machine Learning Foundations',
        duration: '4 weeks',
        description: 'Deep dive into ML concepts, algorithms, and practical implementation',
        completed: false,
        skills: ['Python ML Stack', 'Data Processing', 'Model Training', 'Evaluation Metrics'],
        lessons: [
          {
            id: '1-1',
            title: 'ML Fundamentals and Python Setup',
            duration: '60 mins',
            type: 'video',
            description: 'Core ML concepts and setting up your Python environment',
            resources: ['Python environment', 'Jupyter setup', 'Essential libraries'],
            completed: false
          }
        ],
        project: {
          title: 'Business Intelligence ML Model',
          description: 'Build an end-to-end machine learning model for business prediction',
          deliverables: ['Trained model', 'Performance analysis', 'Documentation'],
          timeline: '2 weeks'
        }
      }
      // Additional modules for AI Engineer path
    ]
  },

  'ai-healthcare': {
    id: 'ai-healthcare',
    title: 'AI in Healthcare',
    subtitle: 'Building the Future with Technology',
    description: 'Use AI to assist patients, providers, and public health systems with compassion + efficiency.',
    longDescription: 'AI in Healthcare professionals bridge the gap between technology and medical care. They develop AI systems that assist healthcare providers, improve patient outcomes, and make medical services more accessible. This course focuses on ethical AI development with practical applications using public datasets.',
    duration: '5-6 months',
    difficulty: 'Intermediate',
    salary: '$70K - $130K',
    jobCount: '20,000+ jobs',
    color: 'from-teal-600 to-cyan-600',
    icon: 'Stethoscope',
    skills: ['Healthcare AI', 'Medical NLP', 'Computer Vision', 'HIPAA Compliance', 'Python/ML'],
    workplaces: ['Hospitals', 'Medical AI Startups', 'Remote Clinics', 'Health Nonprofits', 'Telemedicine Platforms'],
    builds: ['Medical Chatbots', 'Image Analysis Tools', 'Appointment Systems', 'Health Education Bots', 'Patient Documentation'],
    outcomes: [
      'Build AI tools that assist healthcare professionals',
      'Understand medical AI ethics and privacy requirements',
      'Create patient-facing AI applications',
      'Develop medical image classification systems',
      'Land roles in healthcare technology companies'
    ],
    prerequisites: ['Basic Python programming', 'Interest in healthcare technology', 'Understanding of data privacy'],
    certification: {
      name: 'Certified Healthcare AI Developer',
      description: 'Specialized certification in ethical AI development for healthcare applications',
      requirements: ['Complete all modules', 'Build healthcare AI project portfolio', 'Pass ethics assessment']
    },
    careerSupport: {
      resume: true,
      portfolio: true,
      interviews: true,
      jobBoard: true,
      mentorship: true
    },
    modules: [
      {
        id: 1,
        title: 'Introduction to AI in Healthcare',
        duration: '1 week',
        description: 'Understanding AI applications in modern healthcare and their limitations',
        completed: false,
        skills: ['Healthcare AI Overview', 'Medical Technology', 'AI Ethics', 'Industry Research'],
        lessons: [
          {
            id: '1-1',
            title: 'What is AI in Healthcare?',
            duration: '45 mins',
            type: 'video',
            description: 'Explore real-world AI applications: X-ray analysis, hospital chatbots, wearable health trackers',
            resources: ['Case studies', 'Industry examples', 'Technology overview'],
            completed: false
          },
          {
            id: '1-2',
            title: 'What AI Can and Cannot Do in Medicine',
            duration: '40 mins',
            type: 'video',
            description: 'Understanding AI as an assistant to healthcare professionals, not a replacement',
            resources: ['Limitation guidelines', 'Ethical boundaries', 'Professional standards'],
            completed: false
          }
        ],
        project: {
          title: 'Healthcare AI Product Research',
          description: 'Research and present 3 real-world AI healthcare products, analyzing their features and impact',
          deliverables: ['Research presentation', 'Product comparison chart', 'Impact analysis'],
          timeline: '3 days'
        }
      },
      {
        id: 2,
        title: 'Tools & Medical Datasets',
        duration: '1 week',
        description: 'Setting up development environment and working with public medical datasets',
        completed: false,
        skills: ['Python Setup', 'Jupyter Notebooks', 'Medical Datasets', 'Data Privacy'],
        lessons: [
          {
            id: '2-1',
            title: 'Development Environment Setup',
            duration: '50 mins',
            type: 'video',
            description: 'Install Python, Jupyter Notebook, Teachable Machine, and Hugging Face tools',
            resources: ['Installation guides', 'Environment setup', 'Tool tutorials'],
            completed: false
          },
          {
            id: '2-2',
            title: 'Introduction to Open Medical Datasets',
            duration: '55 mins',
            type: 'video',
            description: 'Explore NIH Chest X-ray dataset, WHO public health statistics, and data ethics',
            resources: ['Dataset access', 'Privacy guidelines', 'Data exploration notebooks'],
            completed: false
          }
        ],
        project: {
          title: 'Medical Dataset Exploration',
          description: 'Download, explore, and analyze a public medical dataset while following privacy guidelines',
          deliverables: ['Data exploration notebook', 'Privacy compliance checklist', 'Data insights summary'],
          timeline: '4 days'
        }
      },
      {
        id: 3,
        title: 'AI for Medical Language (NLP)',
        duration: '1 week',
        description: 'Building safe, helpful chatbots for patient communication and wellness support',
        completed: false,
        skills: ['Medical NLP', 'Chatbot Development', 'OpenAI API', 'Patient Communication'],
        lessons: [
          {
            id: '3-1',
            title: 'Building Patient FAQ Chatbots',
            duration: '60 mins',
            type: 'video',
            description: 'Create chatbots using OpenAI API and Hugging Face for patient frequently asked questions',
            resources: ['API integration', 'Chatbot templates', 'Response guidelines'],
            completed: false
          },
          {
            id: '3-2',
            title: 'Safe Symptom-Checker Bot Development',
            duration: '65 mins',
            type: 'video',
            description: 'Train non-diagnostic wellness bots that provide general health information',
            resources: ['Safety protocols', 'Disclaimer templates', 'Wellness guidelines'],
            completed: false
          }
        ],
        project: {
          title: 'Wellness Information Chatbot',
          description: 'Build a chatbot that answers general wellness questions with appropriate disclaimers',
          deliverables: ['Working chatbot application', 'Safety documentation', 'User interaction flows'],
          timeline: '5 days'
        }
      },
      {
        id: 4,
        title: 'AI for Medical Images (Computer Vision)',
        duration: '1 week',
        description: 'Safe medical image classification using public datasets and ethical guidelines',
        completed: false,
        skills: ['Medical Image Analysis', 'Computer Vision', 'Teachable Machine', 'Image Classification'],
        lessons: [
          {
            id: '4-1',
            title: 'Introduction to Medical Image Classification',
            duration: '55 mins',
            type: 'video',
            description: 'Understand medical imaging AI and its applications in healthcare',
            resources: ['Imaging overview', 'Classification concepts', 'Medical applications'],
            completed: false
          },
          {
            id: '4-2',
            title: 'Training Safe Image Classification Models',
            duration: '70 mins',
            type: 'video',
            description: 'Train models to categorize X-rays as "normal" vs. "needs review" using safe labels',
            resources: ['Model training guides', 'Safety protocols', 'Classification examples'],
            completed: false
          }
        ],
        project: {
          title: 'Medical Image Classification System',
          description: 'Create a Teachable Machine model for classifying medical images with safe, non-diagnostic labels',
          deliverables: ['Trained classification model', 'Safety documentation', 'Performance evaluation'],
          timeline: '6 days'
        }
      },
      {
        id: 5,
        title: 'AI for Healthcare Predictions & Analytics',
        duration: '1 week',
        description: 'Using AI for healthcare operations and data analysis with public health data',
        completed: false,
        skills: ['Healthcare Analytics', 'Predictive Modeling', 'Data Visualization', 'Public Health Data'],
        lessons: [
          {
            id: '5-1',
            title: 'Predicting Hospital Operations',
            duration: '60 mins',
            type: 'video',
            description: 'Build models to predict hospital wait times using historical public data',
            resources: ['Prediction algorithms', 'Historical data', 'Model evaluation'],
            completed: false
          },
          {
            id: '5-2',
            title: 'Healthcare Data Visualization',
            duration: '50 mins',
            type: 'video',
            description: 'Create compelling visualizations for health reports and public health data',
            resources: ['Visualization tools', 'Health dashboards', 'Report templates'],
            completed: false
          }
        ],
        project: {
          title: 'Healthcare Analytics Dashboard',
          description: 'Build a predictive model and visualization dashboard for hospital wait times',
          deliverables: ['Prediction model', 'Interactive dashboard', 'Analytics report'],
          timeline: '5 days'
        }
      },
      {
        id: 6,
        title: 'Ethics, Privacy & Professional Practice',
        duration: '1 week',
        description: 'Understanding healthcare data privacy, ethics, and professional standards',
        completed: false,
        skills: ['HIPAA Compliance', 'Healthcare Ethics', 'Data Privacy', 'Professional Standards'],
        lessons: [
          {
            id: '6-1',
            title: 'HIPAA & GDPR for Healthcare AI',
            duration: '45 mins',
            type: 'video',
            description: 'Essential privacy regulations and compliance requirements for healthcare AI',
            resources: ['Privacy regulations', 'Compliance checklists', 'Legal guidelines'],
            completed: false
          },
          {
            id: '6-2',
            title: 'Healthcare AI Ethics & Responsibility',
            duration: '50 mins',
            type: 'video',
            description: 'Ethical considerations, bias prevention, and responsible AI development',
            resources: ['Ethics frameworks', 'Bias detection', 'Responsibility guidelines'],
            completed: false
          },
          {
            id: '6-3',
            title: 'Guest Healthcare Professional Session',
            duration: '60 mins',
            type: 'live',
            description: 'Live session with healthcare professional discussing real-world AI applications',
            resources: ['Professional insights', 'Q&A session', 'Industry perspectives'],
            completed: false
          }
        ],
        project: {
          title: 'Healthcare AI Capstone Project',
          description: 'Choose from: AI chatbot for appointments, medical image classifier, or AI wellness assistant',
          deliverables: ['Complete AI application', 'Ethics compliance documentation', 'Professional presentation'],
          timeline: '1 week'
        }
      }
    ]
  }

  // Additional career paths will be added here
  // 'ai-automation': { ... },
  // 'ai-education': { ... },
  // etc.
};

// Helper functions for course management
export const getCourseById = (id: string): CareerPath | undefined => {
  return academyCourses[id];
};

export const getAllCourses = (): CareerPath[] => {
  return Object.values(academyCourses);
};

export const getCourseProgress = (courseId: string): number => {
  const course = getCourseById(courseId);
  if (!course) return 0;
  
  const totalModules = course.modules.length;
  const completedModules = course.modules.filter(m => m.completed).length;
  
  return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
};

export const getModuleProgress = (module: Module): number => {
  const totalLessons = module.lessons.length;
  const completedLessons = module.lessons.filter(l => l.completed).length;
  
  return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
};

// Course difficulty levels
export const difficultyLevels = {
  'Beginner': {
    color: 'text-green-600',
    description: 'No prior experience required'
  },
  'Intermediate': {
    color: 'text-yellow-600', 
    description: 'Some programming experience helpful'
  },
  'Advanced': {
    color: 'text-red-600',
    description: 'Solid technical background required'
  },
  'Beginner to Advanced': {
    color: 'text-blue-600',
    description: 'Comprehensive progression from basics to expert'
  },
  'Intermediate to Advanced': {
    color: 'text-purple-600',
    description: 'For those with some experience ready to level up'
  }
};