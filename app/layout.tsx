import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      <body className="scanlines min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
