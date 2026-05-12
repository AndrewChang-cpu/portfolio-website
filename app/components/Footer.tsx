import type { PersonalInfo } from '@/lib/resume';

interface FooterProps {
  personal: PersonalInfo;
}

export default function Footer({ personal }: FooterProps) {
  return (
    <footer className="w-full border-t border-pixel-border bg-pixel-surface mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-pixel text-[9px] text-pixel-muted">
          © 2026 {personal.name}
        </p>
        <div className="flex gap-6">
          <a
            href={`https://${personal.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-[9px] text-pixel-muted hover:text-pixel-text transition-colors"
          >
            GITHUB
          </a>
          <a
            href={`https://${personal.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-pixel text-[9px] text-pixel-muted hover:text-pixel-text transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="font-pixel text-[9px] text-pixel-muted hover:text-pixel-text transition-colors"
          >
            EMAIL
          </a>
        </div>
      </div>
    </footer>
  );
}
