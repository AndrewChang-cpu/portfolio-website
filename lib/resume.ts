import resumeData from '@/data/resume.json';

// ─── Enums / Union Types ───────────────────────────────────────────────────

export type ProjectCategory = 'ALL_UNITS' | 'HACKATHON' | 'REACT_NATIVE' | 'AWS_INFRA' | 'KUBERNETES';
export type ProjectStatus = 'ACTIVE' | 'ONLINE' | 'ARCHIVED';
export type HackathonPlacement = 'WINNER' | 'FINALIST' | 'PARTICIPANT';
export type SkillCategory = 'languages' | 'frameworks' | 'technologies';

// ─── Interfaces ────────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  tagline: string;
}

export interface Education {
  id: string;
  school: string;
  location: string;
  degree: string;
  gpa: string;
  dateRange: string;
  description: string;
  courses: string[];
  honors: string[];
  links: string[];
  image: string | null;
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  dateRange: string;
  bullets: string[];
}

export interface Skill {
  id: string;
  label: string;
  category: SkillCategory;
  icon: string;
  level: number; // 1–5 proficiency
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  tech: string[];
  categories: ProjectCategory[];
  status: ProjectStatus;
  featured: boolean;
  image: string | null;
  links: {
    github: string | null;
    live: string | null;
  };
  // Hackathon-specific fields (only present when HACKATHON category)
  placement?: HackathonPlacement;
  year?: number;
}

export interface Hackathon {
  id: string;
  name: string;
  year: number;
  description: string;
  placement: HackathonPlacement;
  status: string;
}

export interface Extracurricular {
  id: string;
  organization: string;
  role: string;
  dateRange: string;
  description: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  hackathons: Hackathon[];
  extracurriculars: Extracurricular[];
}

// ─── Data Utilities ────────────────────────────────────────────────────────

export function getResumeData(): ResumeData {
  return resumeData as ResumeData;
}

export function getPersonal(): PersonalInfo {
  return resumeData.personal as PersonalInfo;
}

export function getEducation(): Education[] {
  return resumeData.education as Education[];
}

export function getExperience(): Experience[] {
  return resumeData.experience as Experience[];
}

export function getSkills(category?: SkillCategory): Skill[] {
  const skills = resumeData.skills as Skill[];
  if (!category) return skills;
  return skills.filter((s) => s.category === category);
}

export function getProjects(category?: ProjectCategory): Project[] {
  const projects = resumeData.projects as Project[];
  if (!category || category === 'ALL_UNITS') return projects;
  return projects.filter((p) => p.categories.includes(category));
}

export function getHackathons(): Hackathon[] {
  return resumeData.hackathons as Hackathon[];
}

export function getExtracurriculars(): Extracurricular[] {
  return (resumeData as ResumeData).extracurriculars;
}
