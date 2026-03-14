import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavLink from '@/app/components/NavLink';

// Mock next/navigation so usePathname is controllable
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

import { usePathname } from 'next/navigation';

describe('NavLink', () => {
  it('renders the label text', () => {
    vi.mocked(usePathname).mockReturnValue('/other');
    render(<NavLink label="[ HOME ]" href="/" />);
    expect(screen.getByText('[ HOME ]')).toBeInTheDocument();
  });

  it('renders an anchor with the correct href', () => {
    vi.mocked(usePathname).mockReturnValue('/other');
    render(<NavLink label="[ HOME ]" href="/" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('does not render ▶ when not on active route', () => {
    vi.mocked(usePathname).mockReturnValue('/other');
    render(<NavLink label="[ HOME ]" href="/" />);
    expect(screen.queryByText('▶')).toBeNull();
  });

  it('does not render ▶ on active route without hover', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<NavLink label="[ HOME ]" href="/" />);
    expect(screen.queryByText('▶')).toBeNull();
  });

  it('renders ▶ when active and hovered', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<NavLink label="[ HOME ]" href="/" />);
    const link = screen.getByRole('link');
    fireEvent.mouseEnter(link);
    expect(screen.getByText('▶')).toBeInTheDocument();
  });

  it('removes ▶ when mouse leaves active link', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<NavLink label="[ HOME ]" href="/" />);
    const link = screen.getByRole('link');
    fireEvent.mouseEnter(link);
    expect(screen.getByText('▶')).toBeInTheDocument();
    fireEvent.mouseLeave(link);
    expect(screen.queryByText('▶')).toBeNull();
  });

  it('does not render ▶ when not active but hovered', () => {
    vi.mocked(usePathname).mockReturnValue('/experience');
    render(<NavLink label="[ HOME ]" href="/" />);
    const link = screen.getByRole('link');
    fireEvent.mouseEnter(link);
    expect(screen.queryByText('▶')).toBeNull();
  });
});
