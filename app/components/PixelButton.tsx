interface PixelButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function PixelButton({
  label,
  href,
  onClick,
  variant = 'primary',
  className = '',
}: PixelButtonProps) {
  const base =
    'inline-block font-pixel text-[10px] px-4 py-2 border-2 transition-colors cursor-pointer select-none';
  const variants = {
    primary:   'border-pixel-text text-pixel-text hover:bg-pixel-text hover:text-pixel-bg',
    secondary: 'border-pixel-muted text-pixel-muted hover:border-pixel-text hover:text-pixel-text',
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {label}
    </button>
  );
}
