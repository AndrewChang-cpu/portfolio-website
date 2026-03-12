export type BackgroundPage = 'landing' | 'experience' | 'academics' | 'projects';

interface PageBackgroundProps {
  page: BackgroundPage;
  children: React.ReactNode;
}

// TODO: Replace placeholder colors with actual 8-bit background PNGs
const BACKGROUND_MAP: Record<BackgroundPage, string> = {
  landing:    '/images/backgrounds/landing-bg.png',    // TODO: 8-bit Hunt Library scene
  experience: '/images/backgrounds/experience-bg.png', // TODO: 8-bit city skyline
  academics:  '/images/backgrounds/academics-bg.png',  // TODO: 8-bit field/meadow
  projects:   '/images/backgrounds/projects-bg.png',   // TODO: 8-bit space/stars
};

const FALLBACK_MAP: Record<BackgroundPage, string> = {
  landing:    '#0d1117',
  experience: '#0d1120',
  academics:  '#0d1410',
  projects:   '#0a0a12',
};

export default function PageBackground({ page, children }: PageBackgroundProps) {
  const bgUrl = BACKGROUND_MAP[page];
  const fallback = FALLBACK_MAP[page];

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      // Approved inline style exception: dynamic URL cannot be a Tailwind class
      style={{
        backgroundImage: `url('${bgUrl}')`,
        backgroundColor: fallback,
      }}
    >
      {children}
    </div>
  );
}
