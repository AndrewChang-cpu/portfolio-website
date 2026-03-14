'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface NavLinkProps {
  label: string;
  href: string;
}

export default function NavLink({ label, href }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="font-pixel text-[10px] text-pixel-muted hover:text-pixel-text transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isActive && hovered && (
        <span className="inline-block text-pixel-accent mr-1">▶</span>
      )}
      {label}
    </a>
  );
}
