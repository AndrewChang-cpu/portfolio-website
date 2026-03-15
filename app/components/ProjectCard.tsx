import type { Project } from '@/lib/resume';
import Badge, { statusToVariant, placementToVariant } from '@/app/components/Badge';
import PixelButton from '@/app/components/PixelButton';

interface ProjectCardProps {
  project: Project;
}

const PLACEMENT_LABEL: Record<string, string> = {
  WINNER:      '1ST PLACE',
  FINALIST:    'FINALIST',
  PARTICIPANT: 'PARTICIPANT',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const isHackathon = project.categories.includes('HACKATHON');

  return (
    <article
      className={`border border-pixel-border bg-pixel-surface p-6 pixel-border flex flex-col gap-4 ${
        project.featured ? 'ring-1 ring-pixel-accent' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-pixel text-[11px] text-pixel-text">{project.name}</h3>
          {isHackathon && project.year && (
            <p className="font-mono text-[10px] text-pixel-muted mt-1">{project.year}</p>
          )}
        </div>
        <div className="flex gap-2 shrink-0">
          {project.featured && (
            <span className="font-pixel text-[8px] text-pixel-amber border border-pixel-amber px-2 py-1">
              FEATURED
            </span>
          )}
          {isHackathon && project.placement ? (
            <Badge
              label={PLACEMENT_LABEL[project.placement] ?? project.placement}
              variant={placementToVariant(project.placement)}
            />
          ) : (
            <Badge label={project.status} variant={statusToVariant(project.status)} />
          )}
        </div>
      </div>

      <p className="font-mono text-[12px] text-pixel-muted flex-1">{project.description}</p>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] text-pixel-accent border border-pixel-border px-2 py-1"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-2 border-t border-pixel-border">
        {project.demoUrl && (
          <PixelButton label="[ TRY IT ]" href={`/projects/${project.slug}/demo`} variant="primary" />
        )}
        {project.links.github && (
          <PixelButton label="[ GITHUB ]" href={project.links.github} variant="secondary" external />
        )}
        {project.links.live && (
          <PixelButton label="[ LIVE ]" href={project.links.live} variant="primary" external />
        )}
      </div>
    </article>
  );
}
