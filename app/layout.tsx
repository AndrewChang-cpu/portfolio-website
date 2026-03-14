import type { Metadata } from 'next';
import './globals.css';
import PixelCursor from '@/app/components/PixelCursor';

export const metadata: Metadata = {
  title: 'Andrew Chang — Portfolio',
  description: 'Software Engineer specializing in distributed systems and infrastructure.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="scanlines min-h-screen antialiased">
        <PixelCursor />
        {children}
      </body>
    </html>
  );
}
