import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageBackground from '@/app/components/PageBackground';
import SectionHeader from '@/app/components/SectionHeader';
import ExperienceTimeline from '@/app/components/ExperienceTimeline';
import SkillInventory from '@/app/components/SkillInventory';
import { getPersonal, getExperience, getSkills } from '@/lib/resume';

export default function ExperiencePage() {
  const personal = getPersonal();
  const experiences = getExperience();
  const skills = getSkills();

  return (
    <PageBackground page="experience">
      <Navbar links={[
        { label: '[ HOME ]',       href: '/' },
        { label: '[ EXPERIENCE ]', href: '/experience' },
        { label: '[ ACADEMICS ]',  href: '/academics' },
        { label: '[ PROJECTS ]',   href: '/projects' },
      ]} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <SectionHeader title="> WORK_HISTORY.LOG" as="h1" />

        <ExperienceTimeline experiences={experiences} />

        <div className="mt-16 space-y-4">
          <SectionHeader title="> SKILL_INVENTORY" as="h2" />
          <SkillInventory skills={skills} category="languages"     label="Languages" />
          <SkillInventory skills={skills} category="frameworks"    label="Frameworks" />
          <SkillInventory skills={skills} category="technologies"  label="Technologies" />
        </div>
      </main>

      <Footer personal={personal} />
    </PageBackground>
  );
}
