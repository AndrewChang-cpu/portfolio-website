import { existsSync } from 'fs';
import { join } from 'path';
import LandingBackground from '@/app/components/LandingBackground';

export type BackgroundPage = 'landing' | 'experience' | 'academics' | 'projects';

interface PageBackgroundProps {
  page: BackgroundPage;
  children: React.ReactNode;
}

// TODO: Replace placeholder colors with actual 8-bit background PNGs
const BACKGROUND_MAP: Record<BackgroundPage, string> = {
  landing:    '/images/backgrounds/landing-bg.png',    // TODO: 8-bit Hunt Library scene
  experience: '/images/backgrounds/experience-bg.webp', // 8-bit city skyline (video poster)
  academics:  '/images/backgrounds/academics-bg.png',  // TODO: 8-bit field/meadow
  projects:   '/images/backgrounds/projects-bg.png',   // TODO: 8-bit space/stars
};

// Falls back to the theme's background color so it works in both light and dark mode
const FALLBACK_COLOR = 'var(--px-bg)';

/** Derives the video URL from the image path if an .mp4 exists alongside it. */
function getVideoUrl(pngPublicPath: string): string | undefined {
  const mp4PublicPath = pngPublicPath.replace(/\.(png|webp)$/, '.mp4');
  const mp4FilePath = join(process.cwd(), 'public', mp4PublicPath);
  return existsSync(mp4FilePath) ? mp4PublicPath : undefined;
}

export default function PageBackground({ page, children }: PageBackgroundProps) {
  const bgUrl = BACKGROUND_MAP[page];
  const videoUrl = getVideoUrl(bgUrl);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fixed background layer — stays in place while content scrolls */}
      {page === 'landing' ? (
        <LandingBackground />
      ) : videoUrl ? (
        <video
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="fixed inset-0 w-full h-full object-cover -z-10 bg-fade-in"
          poster={bgUrl}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-fade-in"
          // Approved inline style exception: dynamic URL cannot be a Tailwind class
          style={{
            backgroundImage: `url('${bgUrl}')`,
            backgroundColor: FALLBACK_COLOR,
          }}
          aria-hidden="true"
        />
      )}

      {/* Fallback color behind video in case it hasn't loaded */}
      <div
        className="fixed inset-0 -z-20"
        style={{ backgroundColor: FALLBACK_COLOR }}
        aria-hidden="true"
      />

      {/* Scrolling content */}
      {children}
    </div>
  );
}
