import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectCard from '@/app/components/ProjectCard';
import type { Project } from '@/lib/resume';

const BASE_PROJECT: Project = {
  id: 'test-project',
  name: "Test Project",
  slug: 'test-project',
  description: 'A test description',
  tech: ['React', 'TypeScript'],
  categories: ['REACT_NATIVE'],
  status: 'ACTIVE',
  featured: false,
  image: null,
  links: { github: null, live: null },
};

describe('ProjectCard', () => {
  it('renders project name', () => {
    render(<ProjectCard project={BASE_PROJECT} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });

  it('renders status badge', () => {
    render(<ProjectCard project={BASE_PROJECT} />);
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
  });

  it('renders ONLINE status badge', () => {
    render(<ProjectCard project={{ ...BASE_PROJECT, status: 'ONLINE' }} />);
    expect(screen.getByText('ONLINE')).toBeInTheDocument();
  });

  it('adds ring class when featured=true', () => {
    render(<ProjectCard project={{ ...BASE_PROJECT, featured: true }} />);
    const article = screen.getByRole('article');
    expect(article.className).toContain('ring-1');
  });

  it('does not add ring class when featured=false', () => {
    render(<ProjectCard project={BASE_PROJECT} />);
    const article = screen.getByRole('article');
    expect(article.className).not.toContain('ring-1');
  });

  it('renders FEATURED badge when featured=true', () => {
    render(<ProjectCard project={{ ...BASE_PROJECT, featured: true }} />);
    expect(screen.getByText('FEATURED')).toBeInTheDocument();
  });

  it('renders GitHub link when provided', () => {
    render(<ProjectCard project={{ ...BASE_PROJECT, links: { github: 'https://github.com/test', live: null } }} />);
    expect(screen.getByRole('link', { name: '[ GITHUB ]' })).toHaveAttribute('href', 'https://github.com/test');
  });

  it('renders tech tags', () => {
    render(<ProjectCard project={BASE_PROJECT} />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders TRY IT button linking to demo route when demoUrl is set', () => {
    render(<ProjectCard project={{ ...BASE_PROJECT, demoUrl: 'https://scotty.andrew.codes' }} />);
    const btn = screen.getByRole('link', { name: '[ TRY IT ]' });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('href', '/projects/test-project/demo');
  });

  it('does not render TRY IT button when demoUrl is absent', () => {
    render(<ProjectCard project={BASE_PROJECT} />);
    expect(screen.queryByRole('link', { name: '[ TRY IT ]' })).toBeNull();
  });
});
