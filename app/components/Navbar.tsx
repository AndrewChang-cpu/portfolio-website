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
        <ul className="flex flex-wrap gap-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-pixel text-[10px] text-pixel-muted hover:text-pixel-text transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
