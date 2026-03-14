import ThemeToggle from '@/app/components/ThemeToggle';
import NavLink from '@/app/components/NavLink';

export interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  links: NavLink[];
}

const DEFAULT_LINKS: NavLink[] = [
  { label: '[ HOME ]',       href: '/' },
  { label: '[ EXPERIENCE ]', href: '/experience' },
  { label: '[ ACADEMICS ]',  href: '/academics' },
  { label: '[ PROJECTS ]',   href: '/projects' },
];

export default function Navbar({ links = DEFAULT_LINKS }: NavbarProps) {
  return (
    <nav className="w-full border-b border-pixel-border bg-pixel-surface px-6 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <span className="font-pixel text-[10px] text-pixel-accent tracking-widest">
          ANDREW_CHANG.EXE
        </span>
        <div className="flex flex-wrap items-center gap-4">
          <ul className="flex flex-wrap gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink label={link.label} href={link.href} />
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
