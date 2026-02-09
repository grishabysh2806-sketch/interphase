
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Page, Course, Lesson } from '../types';
import { COURSES } from '../constants';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';

interface DashboardProps {
  onNavigate: (page: Page) => void;
  onSelectCourse: (course: Course) => void;
  onStartLesson: (course: Course, lesson: Lesson) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onSelectCourse, onStartLesson }) => {
  const { user, logout } = useAuth();
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateProgress(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);
  
  if (!user) {
    onNavigate(Page.AUTH);
    return null;
  }

  const myCourses = COURSES.filter(c => user.enrolledCourses.includes(c.id));

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
         
         <div className="flex justify-between items-end mb-16">
            <Reveal>
               <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-2">Личный кабинет</h1>
               <p className="text-zinc-500 dark:text-zinc-400">Добро пожаловать, {user.name}</p>
            </Reveal>
            <Reveal delay={100}>
               <Button variant="secondary" onClick={() => { logout(); onNavigate(Page.HOME); }}>Выйти</Button>
            </Reveal>
         </div>

         {myCourses.length > 0 ? (
            <div className="grid grid-cols-1 gap-12">
               <Reveal width="100%">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Мое обучение</h2>
               </Reveal>
               {myCourses.map((course, idx) => {
                  // Determine progress
                  const calculatedProgress = user.completedLessons.filter(l => l.startsWith(course.id.substring(0,2))).length * 15;
                  const progress = Math.min(calculatedProgress, 100);

                  return (
                    <Reveal key={course.id} delay={idx * 100} width="100%">
                       <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-zinc-200/50 dark:shadow-none">
                          <div className="flex flex-col md:flex-row gap-8 items-start">
                             <div className="w-full md:w-1/4">
                                <img src={course.image} alt={course.title} className="w-full aspect-square object-cover rounded-2xl mb-4 grayscale hover:grayscale-0 transition-all duration-500" />
                                <div className={`text-${course.accentColor}-600 dark:text-${course.accentColor}-400 font-bold uppercase tracking-widest text-xs text-center`}>{course.subtitle}</div>
                             </div>
                             
                             <div className="w-full md:w-3/4">
                                <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6">{course.title}</h3>
                                
                                {/* Progress Bar with Animations */}
                                <div className="mb-8">
                                   <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                                      <span>Прогресс курса</span>
                                      <span>{progress}%</span>
                                   </div>
                                   <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden relative">
                                      <div 
                                        className={`h-full bg-${course.accentColor}-500 transition-all duration-[1500ms] ease-out relative`} 
                                        style={{ width: animateProgress ? `${progress}%` : '0%' }}
                                      >
                                         {/* Subtle Shimmer Effect */}
                                         <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                                      </div>
                                   </div>
                                </div>

                                <div className="space-y-4">
                                   <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Доступные модули:</h4>
                                   {course.fullCurriculum?.map((module, mIdx) => (
                                      <div key={mIdx} className="space-y-2">
                                         <div className="text-sm text-zinc-500 uppercase font-bold tracking-wider">{module.title}</div>
                                         {module.lessons.map((lesson, lIdx) => {
                                            const isCompleted = user.completedLessons.includes(lesson.id);
                                            return (
                                               <div 
                                                  key={lesson.id} 
                                                  className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${isCompleted ? 'bg-green-100 dark:bg-green-900/10 border-green-500/20' : 'bg-zinc-50 dark:bg-black border-zinc-200 dark:border-white/10 hover:border-zinc-400 dark:hover:border-white/30'}`}
                                               >
                                                  <div className="flex items-center gap-4">
                                                     <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-green-500 text-white dark:text-black scale-110' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500'}`}>
                                                        {isCompleted ? (
                                                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                        ) : (
                                                           <span className="text-xs font-bold">{lIdx + 1}</span>
                                                        )}
                                                     </div>
                                                     <div>
                                                        <div className={`font-medium ${isCompleted ? 'text-green-700 dark:text-green-200' : 'text-zinc-900 dark:text-zinc-200'}`}>{lesson.title}</div>
                                                        <div className="text-xs text-zinc-500">{lesson.type === 'lecture' ? 'Лекция' : 'Практика'} • {lesson.duration}</div>
                                                     </div>
                                                  </div>
                                                  <Button size="sm" variant={isCompleted ? "secondary" : "primary"} onClick={() => onStartLesson(course, lesson)}>
                                                     {isCompleted ? 'Повторить' : 'Начать'}
                                                  </Button>
                                               </div>
                                            );
                                         })}
                                      </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                       </div>
                    </Reveal>
                  );
               })}
            </div>
         ) : (
            <div className="text-center py-20">
               <h2 className="text-2xl text-zinc-900 dark:text-white mb-4">Вы пока не записаны ни на один курс</h2>
               <Button onClick={() => onNavigate(Page.COURSES)}>Перейти в каталог</Button>
            </div>
         )}
      </div>
    </div>
  );
};
