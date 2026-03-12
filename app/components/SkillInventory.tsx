import type { Skill, SkillCategory } from '@/lib/resume';

interface SkillInventoryProps {
  skills: Skill[];
  category: SkillCategory;
  label: string;
}

export default function SkillInventory({ skills, category, label }: SkillInventoryProps) {
  const filtered = skills.filter((s) => s.category === category);

  return (
    <div className="border border-pixel-border bg-pixel-surface p-4 pixel-border">
      <h3 className="font-pixel text-[9px] text-pixel-muted mb-4 uppercase">{label}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {filtered.map((skill) => (
          <div
            key={skill.id}
            className="border border-pixel-border bg-pixel-bg p-2 flex flex-col items-center gap-1 text-center"
          >
            <span className="text-lg leading-none" aria-hidden="true">{skill.icon}</span>
            <span className="font-mono text-[11px] text-pixel-text">{skill.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
