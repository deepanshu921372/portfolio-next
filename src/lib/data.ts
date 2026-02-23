import { getDb } from './mongodb';
import type {
  PersonalData,
  SkillData,
  StatData,
  ProjectData,
  JourneyData,
  EducationData,
  PortfolioData,
} from '@/types/portfolio';

// Fetch all portfolio data with caching
export async function getPortfolioData(): Promise<PortfolioData> {
  const db = await getDb();

  const [personal, skills, stats, projects, journey, education] = await Promise.all([
    db.collection<PersonalData>('personal').findOne({}),
    db.collection<SkillData>('skills').find({}).sort({ order: 1 }).toArray(),
    db.collection<StatData>('stats').find({}).sort({ order: 1 }).toArray(),
    db.collection<ProjectData>('projects').find({}).sort({ order: 1 }).toArray(),
    db.collection<JourneyData>('journey').find({}).sort({ order: 1 }).toArray(),
    db.collection<EducationData>('education').find({}).sort({ order: 1 }).toArray(),
  ]);

  // Default personal data if not found
  const defaultPersonal: PersonalData = {
    name: 'Deepanshu Sharma',
    firstName: 'DEEPANSHU',
    lastName: 'SHARMA',
    title: 'Full Stack Developer & AI Innovator',
    email: 'sharmadeepanshu1005@gmail.com',
    location: 'India',
    about: '',
    socialLinks: {
      github: 'https://github.com/deepanshu921372',
      linkedin: 'https://www.linkedin.com/in/deepanshusharma921372/',
      twitter: 'https://twitter.com/deepanshu921372',
    },
    resumeUrl: '',
  };

  // Serialize personal data _id (exclude MongoDB ObjectId)
  const serializedPersonal = personal
    ? (() => {
        const { _id, ...rest } = personal;
        return { ...rest, _id: _id?.toString() };
      })()
    : defaultPersonal;

  return {
    personal: serializedPersonal as PersonalData,
    skills: skills.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as SkillData[],
    stats: stats.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as StatData[],
    projects: projects.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as ProjectData[],
    journey: journey.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as JourneyData[],
    education: education.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as EducationData[],
  };
}

// Individual section fetchers
export async function getPersonalData(): Promise<PersonalData | null> {
  const db = await getDb();
  const personal = await db.collection<PersonalData>('personal').findOne({});
  if (!personal) return null;
  const { _id, ...rest } = personal;
  return { ...rest, _id: _id?.toString() } as PersonalData;
}

export async function getSkillsData(): Promise<SkillData[]> {
  const db = await getDb();
  const skills = await db.collection<SkillData>('skills').find({}).sort({ order: 1 }).toArray();
  return skills.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as SkillData[];
}

export async function getStatsData(): Promise<StatData[]> {
  const db = await getDb();
  const stats = await db.collection<StatData>('stats').find({}).sort({ order: 1 }).toArray();
  return stats.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as StatData[];
}

export async function getProjectsData(): Promise<ProjectData[]> {
  const db = await getDb();
  const projects = await db.collection<ProjectData>('projects').find({}).sort({ order: 1 }).toArray();
  return projects.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as ProjectData[];
}

export async function getJourneyData(): Promise<JourneyData[]> {
  const db = await getDb();
  const journey = await db.collection<JourneyData>('journey').find({}).sort({ order: 1 }).toArray();
  return journey.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as JourneyData[];
}

export async function getEducationData(): Promise<EducationData[]> {
  const db = await getDb();
  const education = await db.collection<EducationData>('education').find({}).sort({ order: 1 }).toArray();
  return education.map(({ _id, ...rest }) => ({ ...rest, _id: _id?.toString() })) as EducationData[];
}
