import LessonLayout from '@/pages/layouts/LessonLayout.tsx';
import LessonMainContent from './components/LessonMainContent.tsx';
import LessonNavbar from './components/LessonNavbar.tsx';

export default function Index() {
  return (
    <LessonLayout>
      <LessonNavbar />
      <LessonMainContent />
    </LessonLayout>
  );
}
