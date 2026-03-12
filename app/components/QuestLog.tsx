import type { Hackathon } from '@/lib/resume';
import Badge, { placementToVariant } from '@/app/components/Badge';

interface QuestLogProps {
  hackathons: Hackathon[];
}

const PLACEMENT_LABEL: Record<string, string> = {
  WINNER:      '1ST PLACE',
  FINALIST:    'FINALIST',
  PARTICIPANT: 'PARTICIPANT',
};

export default function QuestLog({ hackathons }: QuestLogProps) {
  return (
    <div className="border border-pixel-border bg-pixel-surface pixel-border">
      <div className="border-b border-pixel-border px-4 py-3">
        <p className="font-pixel text-[9px] text-pixel-muted">QUEST LOG — HACKATHONS</p>
      </div>
      <ol className="divide-y divide-pixel-border">
        {hackathons.map((hack) => (
          <li key={hack.id} className="px-4 py-4 flex flex-wrap items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <span className="font-pixel text-[10px] text-pixel-text">{hack.name}</span>
                <Badge
                  label={PLACEMENT_LABEL[hack.placement] ?? hack.placement}
                  variant={placementToVariant(hack.placement)}
                />
              </div>
              <p className="font-mono text-[12px] text-pixel-muted">{hack.description}</p>
            </div>
            <span className="font-mono text-[11px] text-pixel-muted shrink-0">{hack.year}</span>
          </li>
        ))}
      </ol>
      <div className="border-t border-pixel-border px-4 py-2">
        <p className="font-pixel text-[8px] text-pixel-muted">--- END OF LOG ---</p>
      </div>
    </div>
  );
}
