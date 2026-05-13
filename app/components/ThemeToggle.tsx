'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');

  // On mount, sync React state with the theme already applied by the inline script
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    const resolved: Theme = stored === 'dark' || stored === 'light' ? stored : 'dark';
    setTheme(resolved); // only sync React state, DOM attribute set by inline <script>
  }, []);

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="font-pixel text-[9px] px-3 py-2 border border-pixel-border text-[#a7a9be] hover:border-pixel-accent hover:text-pixel-accent transition-colors cursor-pointer"
    >
      {theme === 'light' ? '[ DARK ]' : '[ LIGHT ]'}
    </button>
  );
}
