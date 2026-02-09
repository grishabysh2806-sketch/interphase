import React, { useState } from 'react';
import { Course, Lesson as LessonType, Page, Lesson } from '../types';
import { Button } from '../components/ui/Button';
import { Quiz } from '../components/learning/Quiz';
import { useAuth } from '../context/AuthContext';

interface LessonProps {
  course: Course;
  lesson: LessonType;
  onBack: () => void;
  onNavigate: (page: Page) => void;
  onStartLesson: (course: Course, lesson: Lesson) => void;
}

export const LessonView: React.FC<LessonProps> = ({ course, lesson, onBack, onNavigate, onStartLesson }) => {
  const { completeLesson } = useAuth();
  const [completed, setCompleted] = useState(false);

  // Helper to find next lesson
  const findNextLesson = (): Lesson | null => {
    if (!course.fullCurriculum) return null;
    let foundCurrent = false;
    for (const module of course.fullCurriculum) {
      for (const l of module.lessons) {
        if (foundCurrent) return l;
        if (l.id === lesson.id) foundCurrent = true;
      }
    }
    return null;
  };

  const nextLesson = findNextLesson();

  const handleFinish = () => {
    completeLesson(lesson.id);
    setCompleted(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-24 pb-20">
      
      {/* Top Bar */}
      <div className="fixed top-20 left-0 right-0 h-16 bg-white/80 dark:bg-zinc-900/80 backdrop-blur border-b border-zinc-200 dark:border-white/5 flex items-center px-6 z-40 justify-between">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors flex items-center gap-2 text-sm">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
               К курсу
            </button>
            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className={`text-${course.accentColor}-600 dark:text-${course.accentColor}-400 font-bold uppercase text-xs tracking-wider`}>{course.title}</span>
            <span className="text-zinc-400 dark:text-zinc-500 text-sm hidden md:inline">/</span>
            <span className="text-zinc-900 dark:text-white text-sm font-medium truncate max-w-[200px] md:max-w-none">{lesson.title}</span>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-12">
         <div className="mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">{lesson.title}</h1>
            <div className="flex gap-4">
               <span className="px-3 py-1 bg-zinc-200 dark:bg-white/10 rounded-full text-xs text-zinc-700 dark:text-white border border-zinc-300 dark:border-white/10">{lesson.type === 'lecture' ? 'Теория' : 'Практика'}</span>
               <span className="px-3 py-1 bg-zinc-200 dark:bg-white/10 rounded-full text-xs text-zinc-700 dark:text-white border border-zinc-300 dark:border-white/10">{lesson.duration}</span>
            </div>
         </div>

         {/* Content Area */}
         <div className="prose prose-lg dark:prose-invert max-w-none 
                         prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-white
                         prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-p:leading-relaxed
                         prose-strong:text-zinc-900 dark:prose-strong:text-white
                         prose-ul:text-zinc-700 dark:prose-ul:text-zinc-300">
            {lesson.data.type === 'text' && lesson.data.content && (
               <div dangerouslySetInnerHTML={{ __html: lesson.data.content }} className="bg-transparent" />
            )}

            {lesson.data.type === 'quiz' && lesson.data.questions && (
               <Quiz questions={lesson.data.questions} onComplete={handleFinish} />
            )}
         </div>

         {/* Navigation Footer */}
         <div className="mt-20 pt-10 border-t border-zinc-200 dark:border-white/10">
            {lesson.data.type !== 'quiz' && !completed && (
                <div className="flex justify-between items-center mb-10">
                   <p className="text-zinc-500 text-sm">Изучите материал выше и нажмите кнопку для завершения.</p>
                   <Button onClick={handleFinish} size="lg">
                      Завершить урок
                   </Button>
                </div>
            )}

            {completed && (
               <div className="bg-zinc-100 dark:bg-zinc-900/50 p-8 rounded-2xl border border-zinc-200 dark:border-white/10 animate-fade-up visible">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Урок пройден!</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-8">Материал усвоен. Вы можете перейти к следующему заданию или вернуться в кабинет.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                     {nextLesson ? (
                        <Button onClick={() => onStartLesson(course, nextLesson)} size="lg" className="w-full sm:w-auto">
                           Следующий урок: {nextLesson.title} →
                        </Button>
                     ) : (
                        <div className="px-6 py-3 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 font-medium">
                           Курс завершен! Поздравляем!
                        </div>
                     )}
                     
                     <Button variant="secondary" onClick={onBack} className="w-full sm:w-auto">
                        В личный кабинет
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};