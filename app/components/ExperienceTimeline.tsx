import type { Experience } from '@/lib/resume';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      {/* vertical center line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-pixel-accent -translate-x-1/2 hidden md:block" />

      <ol className="space-y-12">
        {experiences.map((exp, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <li key={exp.id} className="relative md:grid md:grid-cols-2 flex flex-col gap-6 md:gap-0">
              {/* Center dot — pinned to the timeline line */}
              <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-pixel-accent border-2 border-pixel-highlight" />
              </div>

              {/* Content card — alternates sides via order */}
              <div className={`md:px-8 ${isEven ? 'md:col-start-1' : 'md:col-start-2'}`}>
                <div className="border border-pixel-border bg-pixel-overlay backdrop-blur-sm p-6 pixel-border">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="font-pixel text-[11px] text-pixel-text">{exp.company}</h3>
                    <span className="font-mono text-[11px] text-pixel-muted">{exp.dateRange}</span>
                  </div>
                  <p className="font-pixel text-[9px] text-pixel-accent mb-4">{exp.role}</p>
                  <p className="font-mono text-[11px] text-pixel-muted mb-3">{exp.location}</p>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, bi) => (
                      <li key={bi} className="flex gap-2 font-mono text-[12px] text-pixel-text">
                        <span className="text-pixel-accent shrink-0">▸</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
