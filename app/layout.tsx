import type { Metadata } from 'next';
import './globals.css';
import PixelCursor from '@/app/components/PixelCursor';
import { Analytics } from '@vercel/analytics/next';

// Swap the icon href to match your city:
//   NYC → /favicon-liberty.svg
//   SF  → /favicon-golden-gate.svg
export const metadata: Metadata = {
  title: 'Andrew Chang — Portfolio',
  description: 'Software Engineer specializing in distributed systems and infrastructure.',
  icons: { icon: '/favicon-liberty.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" />
        {/* Inline script runs before first paint to prevent theme flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
      </head>
      <body className="scanlines min-h-screen antialiased">
        <PixelCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
