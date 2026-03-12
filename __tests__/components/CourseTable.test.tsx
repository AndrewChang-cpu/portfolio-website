import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CourseTable from '@/app/components/CourseTable';
import type { Education } from '@/lib/resume';

const MOCK_EDUCATION: Education[] = [
  {
    id: 'cmu',
    school: 'CMU',
    location: 'Pittsburgh, PA',
    degree: 'MSE',
    gpa: '4.0/4.0',
    dateRange: '2026',
    description: '',
    courses: ['Distributed Systems', 'DevOps'],
    honors: [],
    links: [],
    image: null,
  },
  {
    id: 'mizzou',
    school: 'Mizzou',
    location: 'Columbia, MO',
    degree: 'BS',
    gpa: '4.0/4.0',
    dateRange: '2025',
    description: '',
    courses: ['Operating Systems', 'Networks'],
    honors: [],
    links: [],
    image: null,
  },
];

describe('CourseTable', () => {
  it('renders the correct number of rows (one per course)', () => {
    render(<CourseTable education={MOCK_EDUCATION} />);
    // 4 courses total = 4 data rows
    expect(screen.getByText('Distributed Systems')).toBeInTheDocument();
    expect(screen.getByText('DevOps')).toBeInTheDocument();
    expect(screen.getByText('Operating Systems')).toBeInTheDocument();
    expect(screen.getByText('Networks')).toBeInTheDocument();
  });

  it('renders institution column for each row', () => {
    render(<CourseTable education={MOCK_EDUCATION} />);
    const cmuCells = screen.getAllByText('CMU');
    expect(cmuCells).toHaveLength(2);
    const mizzouCells = screen.getAllByText('Mizzou');
    expect(mizzouCells).toHaveLength(2);
  });

  it('renders table header columns', () => {
    render(<CourseTable education={MOCK_EDUCATION} />);
    expect(screen.getByText('COURSE')).toBeInTheDocument();
    expect(screen.getByText('INSTITUTION')).toBeInTheDocument();
  });
});
