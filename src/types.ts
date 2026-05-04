export type GemId = 
  | 'university-regulations' 
  | 'lesson-plan' 
  | 'academics' 
  | 'placements' 
  | 'reports' 
  | 'plagiarism' 
  | 'docs-gen' 
  | 'semester-forecast';

export interface Gem {
  id: GemId;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  prompt: string; // System prompt for this Gem
}

export const GEMS: Gem[] = [
  {
    id: 'university-regulations',
    title: 'University Regulations',
    description: 'Get instant answers about university rules, exam policies, and academic regulations.',
    icon: 'Book',
    prompt: 'You are an AI assistant specialized in Aditya University regulations. Provide accurate, structured information about exam policies, attendance rules, and academic guidelines. Always link to standard practices when possible.'
  },
  {
    id: 'lesson-plan',
    title: 'Lesson Plan Gem',
    description: 'Generate structured weekly lesson plans based on your subject, syllabus, and timeframe.',
    icon: 'Calendar',
    prompt: 'You are an expert academic planner. Generate detailed, structured weekly lesson plans that include learning objectives, topics, teaching methodologies, and assessment strategies based on the provided syllabus.'
  },
  {
    id: 'academics',
    title: 'Academics Gem',
    description: 'Generate comprehensive notes, question banks, and tailored exam preparation strategies.',
    icon: 'GraduationCap',
    prompt: 'You are an academic content creator. Generate high-quality study notes, comprehensive question banks (with difficulty levels), and strategic exam preparation tips for the given subject.'
  },
  {
    id: 'placements',
    title: 'Placements Gem',
    description: 'Build your resume, practice interview questions, and prepare for aptitude tests.',
    icon: 'Briefcase',
    prompt: 'You are a career consultant. Help students build technical resumes, simulate mock interview scenarios for top tech companies, and provide solved aptitude patterns.'
  },
  {
    id: 'reports',
    title: 'Reports Gem',
    description: 'Analyze student performance, attendance data, and generate downloadable summaries.',
    icon: 'BarChart3',
    prompt: 'You are a data analyst for academic records. Analyze the provided performance or attendance data and generate clear, executive summaries highlighting trends and areas of improvement.'
  },
  {
    id: 'plagiarism',
    title: 'Project Plagiarism',
    description: 'Analyze project documents for similarity and ensure original content for submissions.',
    icon: 'Search',
    prompt: 'You are a technical document reviewer. Analyze the provided project text for structural similarity, citation clarity, and overall originality. Provide a detailed report on findings.'
  },
  {
    id: 'docs-gen',
    title: 'Documents Generation',
    description: 'Automate the creation of certificates, formal letters, and university-standard documents.',
    icon: 'FileText',
    prompt: 'You are a university administration AI. Generate formal letters, standard certificates, and internal memos following the typical Aditya University formatting standards.'
  },
  {
    id: 'semester-forecast',
    title: 'Semester Outcome Forecast',
    description: 'Predict academic outcomes based on current progress and historical performance benchmarks.',
    icon: 'TrendingUp',
    prompt: 'You are an academic success predictor. Based on current student performance trends and historical benchmarks, provide a realistic forecast of semester outcomes and recommend corrective actions if needed.'
  }
];
