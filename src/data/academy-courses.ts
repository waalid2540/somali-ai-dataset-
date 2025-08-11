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