import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PixelButton from '@/app/components/PixelButton';

describe('PixelButton', () => {
  it('renders an <a> when href is provided', () => {
    render(<PixelButton label="CLICK" href="https://example.com" />);
    const el = screen.getByRole('link', { name: 'CLICK' });
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('href', 'https://example.com');
  });

  it('renders a <button> when href is not provided', () => {
    render(<PixelButton label="PRESS" />);
    const el = screen.getByRole('button', { name: 'PRESS' });
    expect(el).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', async () => {
    const fn = vi.fn();
    render(<PixelButton label="GO" onClick={fn} />);
    await userEvent.click(screen.getByRole('button'));
    expect(fn).toHaveBeenCalledOnce();
  });

  it('renders label text correctly', () => {
    render(<PixelButton label="MY LABEL" />);
    expect(screen.getByText('MY LABEL')).toBeInTheDocument();
  });
});
