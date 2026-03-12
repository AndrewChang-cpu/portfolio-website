import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import PageBackground from '@/app/components/PageBackground';
import SectionHeader from '@/app/components/SectionHeader';
import EducationCard from '@/app/components/EducationCard';
import CourseTable from '@/app/components/CourseTable';
import QuestLog from '@/app/components/QuestLog';
import { getPersonal, getEducation, getHackathons } from '@/lib/resume';

export default function AcademicsPage() {
  const personal = getPersonal();
  const education = getEducation();
  const hackathons = getHackathons();

  return (
    <PageBackground page="academics">
      <Navbar links={[
        { label: '[ HOME ]',       href: '/' },
        { label: '[ EXPERIENCE ]', href: '/experience' },
        { label: '[ ACADEMICS ]',  href: '/academics' },
        { label: '[ PROJECTS ]',   href: '/projects' },
      ]} />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12">
        <SectionHeader title="> ACADEMIC_STATUS.DAT" as="h1" />

        <div className="grid gap-6 mb-12">
          {education.map((edu) => (
            <EducationCard key={edu.id} education={edu} />
          ))}
        </div>

        <SectionHeader title="> COURSE_INVENTORY" as="h2" />
        <div className="mb-12">
          <CourseTable education={education} />
        </div>

        <SectionHeader title="> QUEST_LOG" as="h2" />
        <QuestLog hackathons={hackathons} />
      </main>

      <Footer personal={personal} />
    </PageBackground>
  );
}
