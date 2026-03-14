import type { Extracurricular } from '@/lib/resume';

interface ExtracurricularsPanelProps {
  extracurriculars: Extracurricular[];
}

export default function ExtracurricularsPanel({ extracurriculars }: ExtracurricularsPanelProps) {
  return (
    <div className="border border-pixel-border bg-pixel-surface pixel-border">
      <div className="border-b border-pixel-border px-4 py-3">
        <p className="font-pixel text-[9px] text-pixel-muted">EXTRACURRICULARS — ACTIVITIES & LEADERSHIP</p>
      </div>
      <ol className="divide-y divide-pixel-border">
        {extracurriculars.map((item) => (
          <li key={item.id} className="px-4 py-4 flex flex-wrap items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <span className="font-pixel text-[10px] text-pixel-text">{item.organization}</span>
                <span className="font-mono text-[10px] text-pixel-accent border border-pixel-border px-2 py-1">
                  {item.role}
                </span>
              </div>
              <p className="font-mono text-[12px] text-pixel-muted">{item.description}</p>
            </div>
            <span className="font-mono text-[11px] text-pixel-muted shrink-0 whitespace-nowrap">{item.dateRange}</span>
          </li>
        ))}
      </ol>
      <div className="border-t border-pixel-border px-4 py-2">
        <p className="font-pixel text-[8px] text-pixel-muted">--- END OF LOG ---</p>
      </div>
    </div>
  );
}
