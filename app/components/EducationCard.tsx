import type { Education } from '@/lib/resume';

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="border border-pixel-border bg-pixel-surface p-6 pixel-border">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="font-pixel text-[11px] text-pixel-text mb-2">{education.school}</h3>
          <p className="font-pixel text-[9px] text-pixel-accent">{education.degree}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] text-pixel-muted">{education.location}</p>
          <p className="font-mono text-[11px] text-pixel-muted">{education.dateRange}</p>
          <p className="font-pixel text-[9px] text-pixel-green mt-1">GPA: {education.gpa}</p>
        </div>
      </div>

      <div className="border-t border-pixel-border pt-4">
        <p className="font-pixel text-[9px] text-pixel-muted mb-3 uppercase">Courses</p>
        <div className="flex flex-wrap gap-2">
          {education.courses.map((course) => (
            <span
              key={course}
              className="font-mono text-[13px] text-pixel-text border border-pixel-border px-2 py-1"
            >
              {course}
            </span>
          ))}
        </div>
      </div>

      {education.honors.length > 0 && (
        <div className="border-t border-pixel-border pt-4 mt-4">
          <p className="font-pixel text-[9px] text-pixel-muted mb-2 uppercase">Honors</p>
          <ul className="space-y-1">
            {education.honors.map((honor) => (
              <li key={honor} className="font-mono text-[13px] text-pixel-text flex gap-2">
                <span className="text-pixel-accent">★</span>
                <span>{honor}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
