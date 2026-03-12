import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectGrid from '@/app/components/ProjectGrid';
import type { Project } from '@/lib/resume';

const MOCK_PROJECTS: Project[] = [
  {
    id: 'rn-project',
    name: 'RN App',
    slug: 'rn-app',
    description: 'A React Native project',
    tech: ['React Native'],
    categories: ['REACT_NATIVE'],
    status: 'ACTIVE',
    featured: false,
    image: null,
    links: { github: null, live: null },
  },
  {
    id: 'aws-project',
    name: 'AWS Service',
    slug: 'aws-service',
    description: 'An AWS infrastructure project',
    tech: ['AWS'],
    categories: ['AWS_INFRA'],
    status: 'ONLINE',
    featured: true,
    image: null,
    links: { github: null, live: null },
  },
  {
    id: 'k8s-project',
    name: 'K8s App',
    slug: 'k8s-app',
    description: 'A Kubernetes project',
    tech: ['Kubernetes'],
    categories: ['KUBERNETES', 'AWS_INFRA'],
    status: 'ARCHIVED',
    featured: false,
    image: null,
    links: { github: null, live: null },
  },
];

describe('ProjectGrid', () => {
  it('shows all projects by default (ALL UNITS filter)', () => {
    render(<ProjectGrid projects={MOCK_PROJECTS} />);
    expect(screen.getByText('RN App')).toBeInTheDocument();
    expect(screen.getByText('AWS Service')).toBeInTheDocument();
    expect(screen.getByText('K8s App')).toBeInTheDocument();
  });

  it('filters to REACT NATIVE projects when filter clicked', async () => {
    render(<ProjectGrid projects={MOCK_PROJECTS} />);
    await userEvent.click(screen.getByRole('button', { name: 'REACT NATIVE' }));
    expect(screen.getByText('RN App')).toBeInTheDocument();
    expect(screen.queryByText('AWS Service')).not.toBeInTheDocument();
    expect(screen.queryByText('K8s App')).not.toBeInTheDocument();
  });

  it('filters to AWS INFRA projects when filter clicked', async () => {
    render(<ProjectGrid projects={MOCK_PROJECTS} />);
    await userEvent.click(screen.getByRole('button', { name: 'AWS INFRA' }));
    expect(screen.queryByText('RN App')).not.toBeInTheDocument();
    expect(screen.getByText('AWS Service')).toBeInTheDocument();
    expect(screen.getByText('K8s App')).toBeInTheDocument(); // has AWS_INFRA category
  });

  it('filters to KUBERNETES projects when filter clicked', async () => {
    render(<ProjectGrid projects={MOCK_PROJECTS} />);
    await userEvent.click(screen.getByRole('button', { name: 'KUBERNETES' }));
    expect(screen.queryByText('RN App')).not.toBeInTheDocument();
    expect(screen.queryByText('AWS Service')).not.toBeInTheDocument();
    expect(screen.getByText('K8s App')).toBeInTheDocument();
  });

  it('returns to all projects when ALL UNITS clicked', async () => {
    render(<ProjectGrid projects={MOCK_PROJECTS} />);
    await userEvent.click(screen.getByRole('button', { name: 'REACT NATIVE' }));
    await userEvent.click(screen.getByRole('button', { name: 'ALL UNITS' }));
    expect(screen.getByText('RN App')).toBeInTheDocument();
    expect(screen.getByText('AWS Service')).toBeInTheDocument();
    expect(screen.getByText('K8s App')).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    render(<ProjectGrid projects={MOCK_PROJECTS} />);
    expect(screen.getByRole('button', { name: 'ALL UNITS' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'REACT NATIVE' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'AWS INFRA' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'KUBERNETES' })).toBeInTheDocument();
  });
});
