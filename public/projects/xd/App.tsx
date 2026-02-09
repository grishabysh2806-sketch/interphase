
import React, { useState, Suspense } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CursorGlow } from './components/ui/CursorGlow';
import { Page, Course, Lesson } from './types';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Courses = React.lazy(() => import('./pages/Courses').then(module => ({ default: module.Courses })));
const CourseDetail = React.lazy(() => import('./pages/CourseDetail').then(module => ({ default: module.CourseDetail })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Offer = React.lazy(() => import('./pages/Offer').then(module => ({ default: module.Offer })));
const Agreement = React.lazy(() => import('./pages/Agreement').then(module => ({ default: module.Agreement })));
const AuthPage = React.lazy(() => import('./pages/Auth').then(module => ({ default: module.AuthPage })));
const Dashboard = React.lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const LessonView = React.lazy(() => import('./pages/Lesson').then(module => ({ default: module.LessonView })));

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage(Page.COURSE_DETAIL);
  };

  const handleStartLesson = (course: Course, lesson: Lesson) => {
    setSelectedCourse(course);
    setActiveLesson(lesson);
    setCurrentPage(Page.LESSON);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={handleNavigate} onSelectCourse={handleSelectCourse} />;
      case Page.COURSES:
        return <Courses onSelectCourse={handleSelectCourse} />;
      case Page.COURSE_DETAIL:
        return selectedCourse ? <CourseDetail course={selectedCourse} onNavigate={handleNavigate} /> : <Courses onSelectCourse={handleSelectCourse} />;
      case Page.ABOUT:
        return <About />;
      case Page.OFFER:
        return <Offer />;
      case Page.AGREEMENT:
        return <Agreement />;
      case Page.AUTH:
        return <AuthPage onNavigate={handleNavigate} />;
      case Page.DASHBOARD:
        return <Dashboard onNavigate={handleNavigate} onSelectCourse={handleSelectCourse} onStartLesson={handleStartLesson} />;
      case Page.LESSON:
        return selectedCourse && activeLesson ? <LessonView course={selectedCourse} lesson={activeLesson} onBack={() => handleNavigate(Page.DASHBOARD)} onNavigate={handleNavigate} onStartLesson={handleStartLesson} /> : <Dashboard onNavigate={handleNavigate} onSelectCourse={handleSelectCourse} onStartLesson={handleStartLesson} />;
      default:
        return <Home onNavigate={handleNavigate} onSelectCourse={handleSelectCourse} />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="bg-zinc-50 dark:bg-black min-h-screen text-zinc-900 dark:text-white font-sans selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-100 transition-colors duration-500">
          <CursorGlow />
          {currentPage !== Page.LESSON && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}

          <main className="transition-opacity duration-500 ease-in-out">
            <Suspense fallback={
              <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-white"></div>
              </div>
            }>
              {renderPage()}
            </Suspense>
          </main>

          {currentPage !== Page.LESSON && <Footer onNavigate={handleNavigate} />}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
