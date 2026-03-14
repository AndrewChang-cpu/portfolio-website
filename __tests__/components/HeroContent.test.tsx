import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import HeroContent from '@/app/components/HeroContent';
import type { PersonalInfo } from '@/lib/resume';

const MOCK_PERSONAL: PersonalInfo = {
  name: 'Andrew Chang',
  email: 'andrew@example.com',
  phone: '555-0000',
  linkedin: 'https://linkedin.com/in/andrewchang',
  github: 'https://github.com/andrewchang',
  tagline: 'Software Engineer',
};

describe('HeroContent', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the init prompt hidden initially', () => {
    render(<HeroContent personal={MOCK_PERSONAL} />);
    const initLine = screen.getByText('> INITIALIZING...');
    expect(initLine.className).toContain('opacity-0');
  });

  it('shows init prompt after step 1 delay (300ms)', () => {
    render(<HeroContent personal={MOCK_PERSONAL} />);
    act(() => { vi.advanceTimersByTime(300); });
    const initLine = screen.getByText('> INITIALIZING...');
    expect(initLine.className).toContain('opacity-100');
  });

  it('renders CTA buttons', () => {
    render(<HeroContent personal={MOCK_PERSONAL} />);
    expect(screen.getByText('[ VIEW WORK ]')).toBeInTheDocument();
    expect(screen.getByText('[ SEE PROJECTS ]')).toBeInTheDocument();
    expect(screen.getByText('[ ACADEMICS ]')).toBeInTheDocument();
  });

  it('buttons are hidden initially and visible after full boot sequence', () => {
    render(<HeroContent personal={MOCK_PERSONAL} />);
    const buttonContainer = screen.getByText('[ VIEW WORK ]').closest('div')!;
    expect(buttonContainer.className).toContain('opacity-0');

    act(() => { vi.advanceTimersByTime(1800); });
    expect(buttonContainer.className).toContain('opacity-100');
  });

  it('renders tagline hidden initially and visible after step 3 delay (1300ms)', () => {
    render(<HeroContent personal={MOCK_PERSONAL} />);
    const tagline = screen.getByText('Software Engineer');
    expect(tagline.className).toContain('opacity-0');

    act(() => { vi.advanceTimersByTime(1300); });
    expect(tagline.className).toContain('opacity-100');
  });

  it('eventually types out full name after boot sequence', () => {
    render(<HeroContent personal={MOCK_PERSONAL} />);
    // Advance past boot step 2 (700ms) + typewriter for "Andrew Chang" (12 chars × 60ms = 720ms)
    act(() => { vi.advanceTimersByTime(700 + 12 * 60 + 100); });
    expect(screen.getByRole('heading').textContent).toContain('Andrew Chang');
  });
});
