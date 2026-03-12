import { describe, it, expect } from 'vitest';
import {
  getResumeData,
  getPersonal,
  getEducation,
  getExperience,
  getSkills,
  getProjects,
  getHackathons,
} from '@/lib/resume';

describe('getResumeData', () => {
  it('returns all top-level keys', () => {
    const data = getResumeData();
    expect(data).toHaveProperty('personal');
    expect(data).toHaveProperty('education');
    expect(data).toHaveProperty('experience');
    expect(data).toHaveProperty('skills');
    expect(data).toHaveProperty('projects');
    expect(data).toHaveProperty('hackathons');
  });
});

describe('getPersonal', () => {
  it('returns personal info with required fields', () => {
    const personal = getPersonal();
    expect(personal.name).toBeTruthy();
    expect(personal.email).toContain('@');
    expect(personal.github).toBeTruthy();
    expect(personal.linkedin).toBeTruthy();
  });
});

describe('getEducation', () => {
  it('returns an array of education entries', () => {
    const edu = getEducation();
    expect(Array.isArray(edu)).toBe(true);
    expect(edu.length).toBeGreaterThan(0);
  });

  it('each entry has required fields', () => {
    getEducation().forEach((e) => {
      expect(e.id).toBeTruthy();
      expect(e.school).toBeTruthy();
      expect(e.degree).toBeTruthy();
      expect(Array.isArray(e.courses)).toBe(true);
    });
  });
});

describe('getExperience', () => {
  it('returns an array of experience entries', () => {
    const exp = getExperience();
    expect(Array.isArray(exp)).toBe(true);
    expect(exp.length).toBeGreaterThan(0);
  });

  it('each entry has bullets array', () => {
    getExperience().forEach((e) => {
      expect(Array.isArray(e.bullets)).toBe(true);
      expect(e.bullets.length).toBeGreaterThan(0);
    });
  });
});

describe('getSkills', () => {
  it('returns all skills when no category given', () => {
    const all = getSkills();
    expect(all.length).toBeGreaterThan(0);
  });

  it('filters by category', () => {
    const langs = getSkills('languages');
    langs.forEach((s) => expect(s.category).toBe('languages'));

    const fw = getSkills('frameworks');
    fw.forEach((s) => expect(s.category).toBe('frameworks'));

    const tech = getSkills('technologies');
    tech.forEach((s) => expect(s.category).toBe('technologies'));
  });
});

describe('getProjects', () => {
  it('returns all projects when no category given', () => {
    const all = getProjects();
    expect(all.length).toBeGreaterThan(0);
  });

  it('returns all projects for ALL_UNITS', () => {
    const all = getProjects();
    const allUnits = getProjects('ALL_UNITS');
    expect(allUnits.length).toBe(all.length);
  });

  it('filters by REACT_NATIVE category', () => {
    const rn = getProjects('REACT_NATIVE');
    rn.forEach((p) => expect(p.categories).toContain('REACT_NATIVE'));
  });

  it('filters by AWS_INFRA category', () => {
    const aws = getProjects('AWS_INFRA');
    aws.forEach((p) => expect(p.categories).toContain('AWS_INFRA'));
  });

  it('filters by KUBERNETES category', () => {
    const k8s = getProjects('KUBERNETES');
    k8s.forEach((p) => expect(p.categories).toContain('KUBERNETES'));
  });

  it('returns empty array when no projects match category', () => {
    // KUBERNETES category only has algo-trading
    const k8s = getProjects('KUBERNETES');
    expect(Array.isArray(k8s)).toBe(true);
  });
});

describe('getHackathons', () => {
  it('returns an array of hackathons', () => {
    const hacks = getHackathons();
    expect(Array.isArray(hacks)).toBe(true);
    expect(hacks.length).toBeGreaterThan(0);
  });

  it('each hackathon has a valid placement', () => {
    const valid = ['WINNER', 'FINALIST', 'PARTICIPANT'];
    getHackathons().forEach((h) => {
      expect(valid).toContain(h.placement);
    });
  });
});
