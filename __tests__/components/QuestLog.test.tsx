import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuestLog from '@/app/components/QuestLog';
import type { Hackathon } from '@/lib/resume';

const MOCK_HACKATHONS: Hackathon[] = [
  {
    id: 'hack-1',
    name: 'HackFoo 2025',
    year: 2025,
    description: 'Built a cool app',
    placement: 'WINNER',
    status: 'COMPLETED',
  },
  {
    id: 'hack-2',
    name: 'BarHack 2024',
    year: 2024,
    description: 'Another cool project',
    placement: 'FINALIST',
    status: 'COMPLETED',
  },
  {
    id: 'hack-3',
    name: 'BazJam 2023',
    year: 2023,
    description: 'Fun hackathon',
    placement: 'PARTICIPANT',
    status: 'COMPLETED',
  },
];

describe('QuestLog', () => {
  it('renders all hackathon names', () => {
    render(<QuestLog hackathons={MOCK_HACKATHONS} />);
    expect(screen.getByText('HackFoo 2025')).toBeInTheDocument();
    expect(screen.getByText('BarHack 2024')).toBeInTheDocument();
    expect(screen.getByText('BazJam 2023')).toBeInTheDocument();
  });

  it('renders placement badges', () => {
    render(<QuestLog hackathons={MOCK_HACKATHONS} />);
    expect(screen.getByText('1ST PLACE')).toBeInTheDocument();
    expect(screen.getByText('FINALIST')).toBeInTheDocument();
    expect(screen.getByText('PARTICIPANT')).toBeInTheDocument();
  });

  it('renders hackathon descriptions', () => {
    render(<QuestLog hackathons={MOCK_HACKATHONS} />);
    expect(screen.getByText('Built a cool app')).toBeInTheDocument();
  });

  it('renders years', () => {
    render(<QuestLog hackathons={MOCK_HACKATHONS} />);
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });
});
