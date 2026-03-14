import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkillInventory from '@/app/components/SkillInventory';
import type { Skill } from '@/lib/resume';

const MOCK_SKILLS: Skill[] = [
  { id: 'py', label: 'Python', category: 'languages', icon: '🐍', level: 5 },
  { id: 'go', label: 'Go', category: 'languages', icon: '🐹', level: 4 },
  { id: 'react', label: 'React', category: 'frameworks', icon: '⚛️', level: 3 },
  { id: 'aws', label: 'AWS', category: 'technologies', icon: '☁️', level: 5 },
];

describe('SkillInventory', () => {
  it('renders only skills matching the given category', () => {
    render(<SkillInventory skills={MOCK_SKILLS} category="languages" label="LANGUAGES" />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(screen.queryByText('React')).toBeNull();
    expect(screen.queryByText('AWS')).toBeNull();
  });

  it('renders the section label', () => {
    render(<SkillInventory skills={MOCK_SKILLS} category="languages" label="LANGUAGES" />);
    expect(screen.getByText('LANGUAGES')).toBeInTheDocument();
  });

  it('renders skill icons', () => {
    render(<SkillInventory skills={MOCK_SKILLS} category="languages" label="LANGUAGES" />);
    expect(screen.getByText('🐍')).toBeInTheDocument();
    expect(screen.getByText('🐹')).toBeInTheDocument();
  });

  it('renders a level bar with 5 blocks per skill', () => {
    const { container } = render(
      <SkillInventory skills={MOCK_SKILLS} category="languages" label="LANGUAGES" />
    );
    // 2 skills × 5 blocks each = 10 block spans in level bars
    const levelBars = container.querySelectorAll('[aria-label^="Proficiency:"]');
    expect(levelBars).toHaveLength(2);
    levelBars.forEach((bar) => {
      expect(bar.querySelectorAll('span')).toHaveLength(5);
    });
  });

  it('fills the correct number of blocks based on level', () => {
    const { container } = render(
      <SkillInventory skills={MOCK_SKILLS} category="languages" label="LANGUAGES" />
    );
    const bars = container.querySelectorAll('[aria-label^="Proficiency:"]');
    // Python: level 5 — all 5 blocks should have bg-pixel-green
    const pythonBlocks = Array.from(bars[0].querySelectorAll('span'));
    expect(pythonBlocks.filter((b) => b.className.includes('bg-pixel-green'))).toHaveLength(5);

    // Go: level 4 — 4 blocks bg-pixel-green, 1 bg-pixel-bg
    const goBlocks = Array.from(bars[1].querySelectorAll('span'));
    expect(goBlocks.filter((b) => b.className.includes('bg-pixel-green'))).toHaveLength(4);
    expect(goBlocks.filter((b) => b.className.includes('bg-pixel-bg'))).toHaveLength(1);
  });

  it('renders empty state when no skills match category', () => {
    render(<SkillInventory skills={MOCK_SKILLS} category="technologies" label="TECH" />);
    // Only AWS matches; Python and Go should not appear
    expect(screen.queryByText('Python')).toBeNull();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });

  it('has correct aria-label on level bars', () => {
    render(<SkillInventory skills={MOCK_SKILLS} category="languages" label="LANGUAGES" />);
    expect(screen.getByLabelText('Proficiency: 5 of 5')).toBeInTheDocument();
    expect(screen.getByLabelText('Proficiency: 4 of 5')).toBeInTheDocument();
  });
});
