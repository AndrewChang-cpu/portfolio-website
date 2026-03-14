import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ThemeToggle from '@/app/components/ThemeToggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

afterEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

describe('ThemeToggle', () => {
  it('renders a button', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('reads persisted dark preference from localStorage on mount', async () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    await vi.waitFor(() =>
      expect(screen.getByRole('button').textContent).toBe('[ LIGHT ]')
    );
  });

  it('reads persisted light preference from localStorage on mount', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    await vi.waitFor(() =>
      expect(screen.getByRole('button').textContent).toBe('[ DARK ]')
    );
  });

  it('clicking dark-mode button switches to dark', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    await vi.waitFor(() =>
      expect(screen.getByRole('button').textContent).toBe('[ DARK ]')
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').textContent).toBe('[ LIGHT ]');
  });

  it('clicking twice returns to starting theme', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    await vi.waitFor(() =>
      expect(screen.getByRole('button').textContent).toBe('[ DARK ]')
    );
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn.textContent).toBe('[ DARK ]');
  });

  it('sets data-theme on documentElement when switching to dark', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    await vi.waitFor(() =>
      expect(screen.getByRole('button').textContent).toBe('[ DARK ]')
    );
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('sets data-theme on documentElement when switching to light', async () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);
    await vi.waitFor(() =>
      expect(screen.getByRole('button').textContent).toBe('[ LIGHT ]')
    );
    fireEvent.click(screen.getByRole('button'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('persists theme choice to localStorage', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    await vi.waitFor(() =>
      expect(screen.getByRole('button').textContent).toBe('[ DARK ]')
    );
    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('has correct aria-label reflecting current state', async () => {
    localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    await vi.waitFor(() =>
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode')
    );
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to light mode');
  });
});
