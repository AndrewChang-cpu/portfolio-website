import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageBackground from '@/app/components/PageBackground';
import HeroContent from '@/app/components/HeroContent';
import StatusTypewriter from '@/app/components/StatusTypewriter';
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
        <HeroContent personal={personal} />

        {/* Quick stats bar */}
        <section className="border-t border-pixel-border bg-pixel-surface px-6 py-8">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-pixel text-[9px] text-pixel-muted mb-1">STATUS</p>
              <StatusTypewriter statuses={personal.status} />
            </div>
            <div>
              <p className="font-pixel text-[9px] text-pixel-muted mb-1">PROGRAM</p>
              <p className="font-mono text-pixel-text text-sm">MSE @ CMU</p>
            </div>
            <div>
              <p className="font-pixel text-[9px] text-pixel-muted mb-1">EXPERIENCE</p>
              <p className="font-mono text-pixel-text text-sm">1 YEAR</p>
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
