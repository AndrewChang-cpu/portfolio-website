import { notFound } from 'next/navigation';
import { getProjects, getPersonal } from '@/lib/resume';
import DemoFrame from '@/app/components/DemoFrame';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PixelButton from '@/app/components/PixelButton';

const NAV_LINKS = [
  { label: '[ HOME ]',       href: '/' },
  { label: '[ EXPERIENCE ]', href: '/experience' },
  { label: '[ ACADEMICS ]',  href: '/academics' },
  { label: '[ PROJECTS ]',   href: '/projects' },
];

interface DemoPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects
    .filter((p) => p.demoUrl)
    .map((p) => ({ slug: p.slug }));
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project?.demoUrl) notFound();

  const personal = getPersonal();

  return (
    <div className="min-h-screen flex flex-col bg-pixel-bg">
      <Navbar links={NAV_LINKS} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <PixelButton label="[ BACK ]" href="/projects" variant="secondary" />
            <h1 className="font-pixel text-[14px] text-pixel-text mt-2">{project.name}</h1>
            <p className="font-mono text-[12px] text-pixel-muted">{project.description}</p>
          </div>
          {project.links.github && (
            <PixelButton label="[ GITHUB ]" href={project.links.github} variant="secondary" external />
          )}
        </div>

        {/* Disclaimer */}
        <div className="border border-pixel-amber px-4 py-3 font-mono text-[11px] text-pixel-amber">
          &gt; SANDBOXED DEMO — sample data only. No real accounts, emails, or financial data.
        </div>

        {/* Demo iframe */}
        <DemoFrame src={project.demoUrl} title={project.name} />
      </main>
      <Footer personal={personal} />
    </div>
  );
}
