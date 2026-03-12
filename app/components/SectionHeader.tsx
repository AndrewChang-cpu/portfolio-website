import Badge from '@/app/components/Badge';

interface SectionHeaderProps {
  title: string;
  badge?: string;
  badgeVariant?: 'default' | 'winner' | 'finalist' | 'participant' | 'active' | 'online' | 'archived' | 'muted';
  as?: 'h1' | 'h2' | 'h3';
}

export default function SectionHeader({
  title,
  badge,
  badgeVariant = 'default',
  as: Tag = 'h2',
}: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 mb-8">
      <Tag className="font-pixel text-pixel-text leading-relaxed">{title}</Tag>
      {badge && <Badge label={badge} variant={badgeVariant} />}
    </div>
  );
}
