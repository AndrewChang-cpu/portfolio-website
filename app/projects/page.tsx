import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageBackground from '@/app/components/PageBackground';
import SectionHeader from '@/app/components/SectionHeader';
import ProjectGrid from '@/app/components/ProjectGrid';
import { getPersonal, getProjects } from '@/lib/resume';

export default function ProjectsPage() {
  const personal = getPersonal();
  const projects = getProjects(); // already includes hackathon entries from resume.json

  return (
    <PageBackground page="projects">
      <Navbar links={[
        { label: '[ HOME ]',       href: '/' },
        { label: '[ EXPERIENCE ]', href: '/experience' },
        { label: '[ ACADEMICS ]',  href: '/academics' },
        { label: '[ PROJECTS ]',   href: '/projects' },
      ]} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <SectionHeader title="> PROJECT_REGISTRY" as="h1" />
        <ProjectGrid projects={projects} />
      </main>

      <Footer personal={personal} />
    </PageBackground>
  );
}
