import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageBackground from '@/app/components/PageBackground';
import PixelButton from '@/app/components/PixelButton';
import HeroSceneWrapper from '@/app/components/HeroSceneWrapper';
import { getPersonal } from '@/lib/resume';

export default function LandingPage() {
  const personal = getPersonal();

  return (
    <PageBackground page="landing">
      <Navbar links={[
        { label: '[ HOME ]',       href: '/' },
        { label: '[ EXPERIENCE ]', href: '/experience' },
        { label: '[ ACADEMICS ]',  href: '/academics' },
        { label: '[ PROJECTS ]',   href: '/projects' },
      ]} />

      <main className="flex-1 flex flex-col">
        {/* Hero section */}
        <section className="relative flex-1 flex flex-col items-center justify-center px-6 py-16 min-h-[60vh]">
          {/* Three.js canvas layer */}
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <HeroSceneWrapper />
          </div>

          {/* Hero content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <p className="font-mono text-pixel-muted text-sm mb-4 animate-[blink_1s_step-start_infinite]">
              {'> INITIALIZING...'}
            </p>

            <h1 className="font-pixel text-pixel-text text-xl sm:text-2xl md:text-3xl leading-relaxed mb-6">
              {personal.name}
            </h1>

            <p className="font-mono text-pixel-accent text-base sm:text-lg mb-8">
              {personal.tagline}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <PixelButton label="[ VIEW WORK ]"        href="/experience" variant="primary" />
              <PixelButton label="[ SEE PROJECTS ]"     href="/projects"   variant="secondary" />
              <PixelButton label="[ ACADEMICS ]"        href="/academics"  variant="secondary" />
            </div>
          </div>
        </section>

        {/* Quick stats bar */}
        <section className="border-t border-pixel-border bg-pixel-surface px-6 py-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-pixel text-[9px] text-pixel-muted mb-1">STATUS</p>
              <p className="font-mono text-pixel-green text-sm">SEEKING_ROLES</p>
            </div>
            <div>
              <p className="font-pixel text-[9px] text-pixel-muted mb-1">PROGRAM</p>
              <p className="font-mono text-pixel-text text-sm">MSE @ CMU</p>
            </div>
            <div>
              <p className="font-pixel text-[9px] text-pixel-muted mb-1">INTERNSHIPS</p>
              <p className="font-mono text-pixel-text text-sm">4 COMPLETED</p>
            </div>
            <div>
              <p className="font-pixel text-[9px] text-pixel-muted mb-1">CONTACT</p>
              <a
                href={`mailto:${personal.email}`}
                className="font-mono text-pixel-accent text-sm hover:text-pixel-text transition-colors"
              >
                EMAIL_ME
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer personal={personal} />
    </PageBackground>
  );
}
