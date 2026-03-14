'use client';

import { useState } from 'react';
import type { Project, ProjectCategory } from '@/lib/resume';
import ProjectCard from '@/app/components/ProjectCard';

interface ProjectGridProps {
  projects: Project[];
}

const FILTER_CATEGORIES: { label: string; value: ProjectCategory }[] = [
  { label: 'ALL UNITS',    value: 'ALL_UNITS' },
  { label: 'HACKATHONS',   value: 'HACKATHON' },
  { label: 'REACT NATIVE', value: 'REACT_NATIVE' },
  { label: 'AWS INFRA',    value: 'AWS_INFRA' },
  { label: 'KUBERNETES',   value: 'KUBERNETES' },
];

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('ALL_UNITS');

  const filtered =
    activeFilter === 'ALL_UNITS'
      ? projects
      : projects.filter((p) => p.categories.includes(activeFilter));

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-8" role="group" aria-label="Filter projects by category">
        {FILTER_CATEGORIES.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => setActiveFilter(value)}
            className={`font-pixel text-[9px] px-3 py-2 border transition-colors cursor-pointer ${
              activeFilter === value
                ? 'border-pixel-text text-pixel-text bg-pixel-surface'
                : 'border-pixel-border text-pixel-muted hover:border-pixel-accent hover:text-pixel-accent'
            }`}
            aria-pressed={activeFilter === value}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      {filtered.length === 0 ? (
        <p className="font-mono text-[12px] text-pixel-muted">
          No projects found for this category.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
