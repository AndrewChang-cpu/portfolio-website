import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Badge from '@/app/components/Badge';

describe('Badge', () => {
  it('renders the label text', () => {
    render(<Badge label="WINNER" />);
    expect(screen.getByText('WINNER')).toBeInTheDocument();
  });

  it('applies winner variant class', () => {
    render(<Badge label="WINNER" variant="winner" />);
    const badge = screen.getByText('WINNER');
    expect(badge.className).toContain('border-pixel-green');
  });

  it('applies finalist variant class', () => {
    render(<Badge label="FINALIST" variant="finalist" />);
    const badge = screen.getByText('FINALIST');
    expect(badge.className).toContain('border-pixel-amber');
  });

  it('applies participant variant class', () => {
    render(<Badge label="PARTICIPANT" variant="participant" />);
    const badge = screen.getByText('PARTICIPANT');
    expect(badge.className).toContain('border-pixel-muted');
  });

  it('defaults to default variant', () => {
    render(<Badge label="DEFAULT" />);
    const badge = screen.getByText('DEFAULT');
    expect(badge.className).toContain('border-pixel-border');
  });
});
