import type { Education } from '@/lib/resume';

interface CourseTableProps {
  education: Education[];
}

export default function CourseTable({ education }: CourseTableProps) {
  return (
    <div className="border border-pixel-border bg-pixel-surface pixel-border overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-pixel-border">
            <th className="font-pixel text-[9px] text-pixel-muted text-left px-4 py-3">COURSE</th>
            <th className="font-pixel text-[9px] text-pixel-muted text-left px-4 py-3">INSTITUTION</th>
          </tr>
        </thead>
        <tbody>
          {education.flatMap((edu) =>
            edu.courses.map((course) => (
              <tr
                key={`${edu.id}-${course}`}
                className="border-b border-pixel-border last:border-0 hover:bg-pixel-bg transition-colors"
              >
                <td className="font-mono text-[12px] text-pixel-text px-4 py-2">{course}</td>
                <td className="font-mono text-[11px] text-pixel-muted px-4 py-2">{edu.school}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
