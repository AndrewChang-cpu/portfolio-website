'use client';

import { useState } from 'react';
import type { Experience } from '@/lib/resume';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenSet(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="relative">
      {/* vertical center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-pixel-accent -translate-x-1/2 hidden md:block" />

      <ol className="space-y-12">
        {experiences.map((exp, idx) => {
          const isEven = idx % 2 === 0;
          const isOpen = openSet.has(exp.id);
          return (
            <li key={exp.id} className="relative md:grid md:grid-cols-2 flex flex-col gap-6 md:gap-0">
              {/* Center dot */}
              <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-pixel-accent border-2 border-pixel-highlight" />
              </div>

              <div className={`${isEven ? 'md:col-start-1 md:pr-8' : 'md:col-start-2 md:pl-8'}`}>
                <div className="border border-pixel-border bg-pixel-overlay backdrop-blur-sm pixel-border">
                  {/* Clickable header */}
                  <button
                    onClick={() => toggle(exp.id)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h3 className="font-pixel text-[11px] text-pixel-text">{exp.company}</h3>
                        <span className="font-mono text-[11px] text-pixel-muted">{exp.dateRange}</span>
                      </div>
                      <p className="font-pixel text-[9px] text-pixel-accent mb-1">{exp.role}</p>
                      <p className="font-mono text-[11px] text-pixel-muted">{exp.location}</p>
                    </div>
                    <span className="font-mono text-pixel-accent shrink-0 mt-0.5">
                      {isOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* Preview: first bullet always visible */}
                  {exp.bullets[0] && (
                    <div className="px-6 pb-4">
                      <div className="flex gap-2 font-mono text-[13px] text-pixel-muted">
                        <span className="text-pixel-accent shrink-0">▸</span>
                        <span className={isOpen ? '' : 'truncate'}>{exp.bullets[0]}</span>
                      </div>
                    </div>
                  )}

                  {/* Expandable body: remaining bullets */}
                  {isOpen && exp.bullets.length > 1 && (
                    <div className="px-6 pb-6">
                      <ul className="space-y-2">
                        {exp.bullets.slice(1).map((bullet, bi) => (
                          <li key={bi} className="flex gap-2 font-mono text-[13px] text-pixel-text">
                            <span className="text-pixel-accent shrink-0">▸</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
