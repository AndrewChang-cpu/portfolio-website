'use client';

import { useEffect, useRef, useState } from 'react';
import type { PersonalInfo } from '@/lib/resume';
import PixelButton from '@/app/components/PixelButton';

interface HeroContentProps {
  personal: PersonalInfo;
}

// Boot sequence steps: 0=hidden, 1=init line, 2=name typing, 3=tagline, 4=buttons
const STEP_DELAYS = [0, 300, 700, 1300, 1800];

export default function HeroContent({ personal }: HeroContentProps) {
  const [step, setStep]           = useState(0);
  const [typedName, setTypedName] = useState('');
  const sectionRef  = useRef<HTMLElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  // Track current step in a ref so the typewriter effect doesn't re-run on step changes
  const stepRef     = useRef(0);

  // Boot sequence — advances stepRef and state together
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEP_DELAYS.forEach((delay, i) => {
      timers.push(setTimeout(() => {
        stepRef.current = i + 1;
        setStep(i + 1);
      }, delay));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  // Typewriter for name — stable dependency array, polls stepRef to avoid re-triggering
  useEffect(() => {
    // Wait until step 2 is reached (checked via a one-time timeout after boot delay)
    const start = setTimeout(() => {
      if (stepRef.current < 2) return;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTypedName(personal.name.slice(0, i));
        if (i >= personal.name.length) clearInterval(interval);
      }, 60);
      return () => clearInterval(interval);
    }, STEP_DELAYS[2]); // same delay as step 2
    return () => clearTimeout(start);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Parallax on mouse move — direct DOM mutation, zero re-renders
  useEffect(() => {
    const section = sectionRef.current;
    const card    = cardRef.current;
    if (!section || !card) return;

    function onMove(e: MouseEvent) {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = ((e.clientX - cx) / cx) * -0;
      const dy = ((e.clientY - cy) / cy) * -0;
      card!.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex-1 flex flex-col items-center justify-center px-6 py-16 min-h-[60vh]"
    >
      <div
        ref={cardRef}
        className="text-center max-w-3xl mx-auto bg-pixel-overlay backdrop-blur-sm px-8 py-10 border border-pixel-border transition-transform duration-100"
      >
        {/* Line 1: init prompt */}
        <p
          className={`font-mono text-pixel-muted text-sm mb-4 animate-[blink_1s_step-start_infinite] transition-opacity duration-300 ${step >= 1 ? 'opacity-100' : 'opacity-0'}`}
        >
          {'> INITIALIZING...'}
        </p>

        {/* Line 2: name typewriter */}
        <h1
          className={`font-pixel text-pixel-text text-xl sm:text-2xl md:text-3xl leading-relaxed mb-6 transition-opacity duration-300 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}
        >
          {typedName}
          {step >= 2 && typedName.length < personal.name.length && (
            <span className="animate-[blink_0.5s_step-start_infinite]">_</span>
          )}
        </h1>

        {/* Line 3: tagline */}
        <p
          className={`font-mono text-pixel-accent text-base sm:text-lg mb-8 transition-opacity duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-0'}`}
        >
          {personal.tagline}
        </p>

        {/* Line 4: buttons */}
        <div
          className={`flex flex-wrap gap-4 justify-center transition-opacity duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}
        >
          <PixelButton label="[ VIEW WORK ]"    href="/experience" variant="secondary" />
          <PixelButton label="[ SEE PROJECTS ]" href="/projects"   variant="secondary" />
          <PixelButton label="[ ACADEMICS ]"    href="/academics"  variant="secondary" />
        </div>
      </div>
    </section>
  );
}
