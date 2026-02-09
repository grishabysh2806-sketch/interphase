
import React, { useEffect, useState } from 'react';
import { Course, Page, Teacher } from '../types';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { useAuth } from '../context/AuthContext';

interface CourseDetailProps {
  course: Course;
  onNavigate?: (page: Page) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onNavigate }) => {
  const [activeModule, setActiveModule] = useState<number>(0);
  const { user, enrollCourse } = useAuth();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [course.id]);

  const handleAction = () => {
    if (user) {
       enrollCourse(course.id);
       if (onNavigate) onNavigate(Page.DASHBOARD);
    } else {
       if (onNavigate) onNavigate(Page.AUTH);
    }
  };

  return (
    <div className="bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white min-h-screen transition-colors duration-500">
      
      {/* Product Hero */}
      <div className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          {/* Replaced Image with Abstract Gradient Background */}
          <div className="absolute inset-0 bg-zinc-100 dark:bg-zinc-950 transition-colors duration-500"></div>
          
          {/* Dynamic Accent Blob */}
          <div 
             className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[120px] opacity-40 dark:opacity-20 animate-pulse"
             style={{ backgroundColor: course.accentColor }}
          ></div>
          
          {/* Secondary Blob */}
          <div 
             className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" 
             style={{ animationDelay: '2s' }}
          ></div>
          
          {/* Texture and Fade */}
          <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-50 via-transparent to-transparent dark:from-black dark:via-transparent dark:to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl px-6 mt-16">
          <Reveal>
            <div className={`inline-block px-4 py-1 rounded-full border border-zinc-900/10 dark:border-${course.accentColor}-500/30 bg-white/30 dark:bg-${course.accentColor}-500/10 backdrop-blur-md mb-6 shadow-lg`}>
               <span className={`text-sm font-bold tracking-widest uppercase text-zinc-900 dark:text-${course.accentColor}-400`}>
                 {course.subtitle}
               </span>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tighter leading-[0.9] text-zinc-900 dark:text-white drop-shadow-2xl">{course.title}</h1>
          </Reveal>
          <Reveal delay={400}>
            <p className="text-xl md:text-3xl text-zinc-800 dark:text-zinc-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-lg">
              {course.description}
            </p>
          </Reveal>
          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="px-12 text-lg h-14" onClick={handleAction}>
                {user ? 'Начать обучение' : 'Записаться на курс'}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Sticky Stats Bar */}
      <div className="sticky top-[89px] z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-y border-zinc-200 dark:border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
           <div className="font-bold text-xl hidden md:block text-zinc-900 dark:text-white">{course.title}</div>
           <div className="flex gap-12 text-zinc-500 dark:text-zinc-400">
             <div className="flex flex-col items-center">
               <span className="text-zinc-900 dark:text-white font-bold text-lg">{course.duration}</span>
               <span className="text-xs uppercase tracking-wider">Длительность</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="text-zinc-900 dark:text-white font-bold text-lg">{course.stats.hours}</span>
               <span className="text-xs uppercase tracking-wider">Часов</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="text-zinc-900 dark:text-white font-bold text-lg">{course.level}</span>
               <span className="text-xs uppercase tracking-wider">Уровень</span>
             </div>
           </div>
           <div className="hidden md:flex items-center gap-6">
             <span className="text-zinc-900 dark:text-white font-bold text-2xl">{course.price}</span>
             <Button size="md" onClick={handleAction}>{user ? 'В кабинет' : 'Купить'}</Button>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-32">
            
            {/* About Section */}
            <section>
              <Reveal>
                 <h2 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-white">Манифест курса</h2>
                 <p className="text-zinc-600 dark:text-zinc-300 text-xl leading-relaxed mb-6">
                   Мы не занимаемся зубрежкой. Этот курс — погружение в экосистему. Вы начнете понимать, почему носители языка думают именно так, а не иначе.
                 </p>
                 <ul className="space-y-4 mt-8">
                    {['Прямой контакт с преподавателем', 'Доступ в закрытое комьюнити', 'Авторские материалы, которых нет в учебниках'].map((item, i) => (
                       <li key={i} className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400 text-lg">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          {item}
                       </li>
                    ))}
                 </ul>
              </Reveal>
            </section>

            {/* Syllabus */}
            <section>
              <Reveal>
                <h2 className="text-4xl font-bold mb-12 text-zinc-900 dark:text-white">Программа обучения</h2>
              </Reveal>

              {course.fullCurriculum && course.fullCurriculum.length > 0 ? (
                <div className="space-y-6">
                   {course.fullCurriculum.map((section, idx) => (
                      <Reveal key={idx} width="100%">
                        <div className={`border border-zinc-200 dark:border-white/10 rounded-3xl overflow-hidden transition-all duration-300 ${activeModule === idx ? 'bg-zinc-100 dark:bg-zinc-900/50' : 'bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/30'}`}>
                           <button 
                             onClick={() => setActiveModule(idx === activeModule ? -1 : idx)}
                             className="w-full flex items-center justify-between p-8 text-left"
                           >
                              <div>
                                 <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{section.title}</h3>
                                 <p className="text-zinc-500 text-sm font-medium">{section.hours} академических часов</p>
                              </div>
                              <div className={`w-10 h-10 rounded-full border border-zinc-300 dark:border-white/10 flex items-center justify-center transition-transform duration-300 ${activeModule === idx ? 'rotate-180 bg-zinc-900 dark:bg-white text-white dark:text-black' : 'text-zinc-400 dark:text-white'}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                              </div>
                           </button>
                           
                           <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeModule === idx ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                             <div className="p-8 pt-0 space-y-4 border-t border-zinc-200 dark:border-white/5 mt-2">
                               {section.lessons.map((lesson, lIdx) => (
                                 <div key={lIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 transition-colors shadow-sm dark:shadow-none">
                                   <div className="flex items-center gap-4">
                                     <div className={`w-2 h-2 rounded-full ${lesson.type === 'lecture' ? 'bg-blue-500' : lesson.type === 'practice' ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                                     <span className="text-zinc-800 dark:text-zinc-200 font-medium">{lesson.title}</span>
                                   </div>
                                   <div className="flex items-center gap-4 mt-2 sm:mt-0 pl-6 sm:pl-0">
                                      <span className="text-xs uppercase tracking-wider text-zinc-500 border border-zinc-200 dark:border-white/10 px-2 py-1 rounded-md">{lesson.type === 'lecture' ? 'Лекция' : lesson.type === 'practice' ? 'Практика' : 'Домашка'}</span>
                                      <span className="text-zinc-500 dark:text-zinc-400 text-sm">{lesson.duration}</span>
                                   </div>
                                 </div>
                               ))}
                             </div>
                           </div>
                        </div>
                      </Reveal>
                   ))}
                </div>
              ) : (
                <div className="text-zinc-500 dark:text-zinc-400 p-8 border border-dashed border-zinc-300 dark:border-white/10 rounded-2xl">
                  Программа обновляется. Ожидайте публикации новых модулей.
                </div>
              )}
            </section>

             {/* Teacher Mobile */}
             <div className="lg:hidden">
               <TeacherCard teacher={course.teacher} />
             </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-40">
              
              <div className="hidden lg:block mb-8">
                 <TeacherCard teacher={course.teacher} />
              </div>

              {course.facts && (
                <Reveal width="100%" delay={100}>
                  <div className="p-8 rounded-[2rem] bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 mb-8">
                    <h3 className="text-zinc-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                      <span className="text-yellow-500">⚡️</span> Знаете ли вы?
                    </h3>
                    <ul className="space-y-4">
                      {course.facts.map((fact, i) => (
                        <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-2 border-zinc-300 dark:border-white/10 pl-4">
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
              
              {/* Pricing Card */}
              <Reveal delay={200} width="100%">
                <div className="p-10 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 relative overflow-hidden group shadow-xl dark:shadow-none">
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                   
                   <div className="relative z-10">
                       <h3 className="text-zinc-500 text-sm font-bold uppercase tracking-wider mb-2">Полный доступ</h3>
                       <div className="text-5xl font-bold text-zinc-900 dark:text-white mb-8">{course.price}</div>
                       
                       <ul className="space-y-5 mb-10 text-sm text-zinc-600 dark:text-zinc-300">
                         <li className="flex gap-3 items-center"><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> {course.stats.hours} часов контента</li>
                         <li className="flex gap-3 items-center"><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Персональный разбор ДЗ</li>
                         <li className="flex gap-3 items-center"><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Закрытый чат с преподавателем</li>
                         <li className="flex gap-3 items-center"><svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Диплом на двух языках</li>
                       </ul>
                       
                       <Button size="lg" className="w-full" onClick={handleAction}>
                          {user ? 'В личный кабинет' : 'Забронировать место'}
                       </Button>
                       <p className="text-xs text-center text-zinc-500 mt-6">Есть возможность оплаты долями</p>
                   </div>
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const TeacherCard: React.FC<{teacher: Teacher}> = ({ teacher }) => (
  <Reveal width="100%">
    <div className="glass-panel p-8 rounded-[2rem] border border-zinc-200 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/5 transition-colors shadow-lg dark:shadow-none">
      <div className="flex flex-col items-center text-center mb-6">
        <div className="flex justify-center -space-x-4 mb-4">
           {teacher.images.map((img, i) => (
              <div key={i} className="w-20 h-20 rounded-full border-4 border-white dark:border-zinc-800 overflow-hidden shadow-lg">
                 <img src={img} alt={teacher.name} className="w-full h-full object-cover" />
              </div>
           ))}
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{teacher.name}</h3>
        <p className="text-sm text-blue-500 dark:text-blue-400 font-medium uppercase tracking-wide">{teacher.role}</p>
      </div>
      <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed text-center">
        {teacher.bio}
      </p>
    </div>
  </Reveal>
);
