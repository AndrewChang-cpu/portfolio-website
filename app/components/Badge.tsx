import type { HackathonPlacement, ProjectStatus } from '@/lib/resume';

type BadgeVariant = 'default' | 'winner' | 'finalist' | 'participant' | 'active' | 'online' | 'archived' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default:     'border-pixel-border text-[#a7a9be]',
  winner:      'border-pixel-green text-pixel-green',
  finalist:    'border-pixel-amber text-pixel-amber',
  participant: 'border-[#a7a9be] text-[#a7a9be]',
  active:      'border-pixel-green text-pixel-green',
  online:      'border-pixel-amber text-pixel-amber',
  archived:    'border-pixel-red text-pixel-red',
  muted:       'border-pixel-border text-[#a7a9be]',
};

export function placementToVariant(p: HackathonPlacement): BadgeVariant {
  const map: Record<HackathonPlacement, BadgeVariant> = {
    WINNER: 'winner',
    FINALIST: 'finalist',
    PARTICIPANT: 'participant',
  };
  return map[p];
}

export function statusToVariant(s: ProjectStatus): BadgeVariant {
  const map: Record<ProjectStatus, BadgeVariant> = {
    ACTIVE: 'active',
    ONLINE: 'online',
    ARCHIVED: 'archived',
  };
  return map[s];
}

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-block border px-2 py-1 text-[10px] font-pixel leading-none ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </span>
  );
}
