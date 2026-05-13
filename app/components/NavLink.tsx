'use client';

import { usePathname } from 'next/navigation';

interface NavLinkProps {
  label: string;
  href: string;
}

export default function NavLink({ label, href }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`font-pixel text-[10px] transition-colors hover:text-pixel-text ${isActive ? 'text-pixel-text' : 'text-[#a7a9be]'}`}
    >
      {label}
    </a>
  );
}
