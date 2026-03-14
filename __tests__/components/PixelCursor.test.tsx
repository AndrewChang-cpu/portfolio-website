import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import PixelCursor from '@/app/components/PixelCursor';

// Helper: dispatch a mousemove on a DOM element so e.target is an Element with .closest()
function dispatchMouseMove(target: EventTarget, clientX: number, clientY: number) {
  const event = new MouseEvent('mousemove', { clientX, clientY, bubbles: true });
  target.dispatchEvent(event);
  // Also fire on window (which is where PixelCursor listens) with target overridden
  const windowEvent = new MouseEvent('mousemove', { clientX, clientY, bubbles: false });
  Object.defineProperty(windowEvent, 'target', { value: target as Element, configurable: true });
  window.dispatchEvent(windowEvent);
}

describe('PixelCursor', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  afterEach(() => {
    document.body.className = '';
  });

  it('renders without crashing', () => {
    const { container } = render(<PixelCursor />);
    expect(container.firstChild).not.toBeNull();
  });

  it('renders four arm divs inside the root container', () => {
    const { container } = render(<PixelCursor />);
    const root = container.firstChild as HTMLElement;
    expect(root.children).toHaveLength(4);
  });

  it('is aria-hidden so screen readers ignore it', () => {
    const { container } = render(<PixelCursor />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('aria-hidden', 'true');
  });

  it('has pointer-events-none so it does not block clicks', () => {
    const { container } = render(<PixelCursor />);
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain('pointer-events-none');
  });

  it('moves crosshair to mouse position on mousemove', () => {
    const { container } = render(<PixelCursor />);
    const root = container.firstChild as HTMLElement;

    act(() => {
      dispatchMouseMove(document.body, 100, 200);
    });

    expect(root.style.transform).toBe('translate(100px, 200px)');
  });

  it('removes cursor-selecting class on unmount', () => {
    document.body.classList.add('cursor-selecting');
    const { unmount } = render(<PixelCursor />);
    unmount();
    expect(document.body.classList.contains('cursor-selecting')).toBe(false);
  });

  it('removes the mousemove listener on unmount', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<PixelCursor />);
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
    removeSpy.mockRestore();
  });

  it('toggles cursor-selecting when mouse enters and leaves a nav link', () => {
    // Build a minimal nav > a structure in the document
    const nav = document.createElement('nav');
    const link = document.createElement('a');
    nav.appendChild(link);
    document.body.appendChild(nav);

    render(<PixelCursor />);

    // Hover over nav link
    act(() => {
      dispatchMouseMove(link, 50, 50);
    });
    expect(document.body.classList.contains('cursor-selecting')).toBe(true);

    // Move away from nav link
    act(() => {
      dispatchMouseMove(document.body, 50, 50);
    });
    expect(document.body.classList.contains('cursor-selecting')).toBe(false);

    document.body.removeChild(nav);
  });
});
