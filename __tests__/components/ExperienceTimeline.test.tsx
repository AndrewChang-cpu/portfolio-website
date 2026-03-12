import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ExperienceTimeline from '@/app/components/ExperienceTimeline';
import type { Experience } from '@/lib/resume';

const MOCK_EXPERIENCES: Experience[] = [
  {
    id: 'exp-1',
    company: 'Acme Corp',
    location: 'New York, NY',
    role: 'Engineer',
    dateRange: 'Jan 2023 – Jan 2024',
    bullets: ['Did thing A', 'Did thing B'],
  },
  {
    id: 'exp-2',
    company: 'Globex',
    location: 'Springfield, IL',
    role: 'Intern',
    dateRange: 'Jun 2022 – Aug 2022',
    bullets: ['Built stuff'],
  },
  {
    id: 'exp-3',
    company: 'Initech',
    location: 'Austin, TX',
    role: 'Contractor',
    dateRange: 'Jan 2021 – Dec 2021',
    bullets: ['Fixed bugs'],
  },
];

describe('ExperienceTimeline', () => {
  it('renders N entries', () => {
    render(<ExperienceTimeline experiences={MOCK_EXPERIENCES} />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Globex')).toBeInTheDocument();
    expect(screen.getByText('Initech')).toBeInTheDocument();
  });

  it('renders N list items in the outer ordered list', () => {
    const { container } = render(<ExperienceTimeline experiences={MOCK_EXPERIENCES} />);
    // Select only direct <li> children of the outer <ol>
    const ol = container.querySelector('ol');
    expect(ol).not.toBeNull();
    const items = ol!.querySelectorAll(':scope > li');
    expect(items).toHaveLength(3);
  });

  it('even items use md:flex-row class', () => {
    const { container } = render(<ExperienceTimeline experiences={MOCK_EXPERIENCES} />);
    const ol = container.querySelector('ol')!;
    const items = Array.from(ol.querySelectorAll(':scope > li'));
    expect(items[0].className).toContain('md:flex-row');
    expect(items[2].className).toContain('md:flex-row');
  });

  it('odd items use md:flex-row-reverse class', () => {
    const { container } = render(<ExperienceTimeline experiences={MOCK_EXPERIENCES} />);
    const ol = container.querySelector('ol')!;
    const items = Array.from(ol.querySelectorAll(':scope > li'));
    expect(items[1].className).toContain('md:flex-row-reverse');
  });

  it('renders bullet points', () => {
    render(<ExperienceTimeline experiences={MOCK_EXPERIENCES} />);
    expect(screen.getByText('Did thing A')).toBeInTheDocument();
    expect(screen.getByText('Did thing B')).toBeInTheDocument();
  });
});
