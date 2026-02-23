// Portfolio Data Types

export interface PersonalData {
  _id?: string;
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  location: string;
  about: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  resumeUrl: string;
}

export interface SkillData {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  span?: {
    col?: number;
    row?: number;
  };
  order: number;
}

export interface StatData {
  _id?: string;
  number: number;
  label: string;
  order: number;
}

export interface ProjectData {
  _id?: string;
  number: string;
  emoji: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink: string;
  liveLink: string;
  order: number;
}

export interface JourneyData {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface EducationData {
  _id?: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  description: string;
  order: number;
}

export interface PortfolioData {
  personal: PersonalData;
  skills: SkillData[];
  stats: StatData[];
  projects: ProjectData[];
  journey: JourneyData[];
  education: EducationData[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
