import React, { useEffect } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { COURSES } from '../constants';
import { Course } from '../types';

interface CoursesProps {
  onSelectCourse: (course: Course) => void;
}

export const Courses: React.FC<CoursesProps> = ({ onSelectCourse }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 relative overflow-hidden transition-colors duration-500">
      {/* Background blobs for depth */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-300/20 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-300/20 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6">Каталог знаний</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-zinc-600 dark:text-zinc-400 text-xl max-w-2xl mb-16 font-light">
             В каждом курсе мы объединили академическую глубину и современные методики. Выбирайте свой путь развития.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-12">
          {COURSES.map((course, index) => (
            <Reveal key={course.id} delay={index * 150} width="100%">
              <div 
                onClick={() => onSelectCourse(course)}
                className="group flex flex-col md:flex-row bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 rounded-[2rem] overflow-hidden hover:bg-zinc-50 dark:hover:bg-zinc-900/80 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 cursor-pointer shadow-xl shadow-zinc-200/50 dark:shadow-lg dark:shadow-none hover:shadow-2xl"
              >
                {/* Image Section */}
                <div className="w-full md:w-2/5 h-72 md:h-auto relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/10 dark:bg-black/30 group-hover:bg-transparent transition-colors"></div>
                  <div className="absolute top-6 left-6 flex gap-2">
                     <span className={`px-3 py-1 bg-white/90 dark:bg-${course.accentColor}-500/20 backdrop-blur-md rounded-full text-xs font-bold text-${course.accentColor}-600 dark:text-${course.accentColor}-300 uppercase tracking-wider border border-white dark:border-${course.accentColor}-500/20 shadow-sm`}>
                        {course.duration}
                     </span>
                     <span className="px-3 py-1 bg-white/90 dark:bg-black/40 backdrop-blur-md rounded-full text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider border border-white dark:border-white/10 shadow-sm">
                        {course.level}
                     </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center relative">
                  <div className="mb-6">
                    <span className={`text-sm font-bold uppercase tracking-wider text-${course.accentColor}-600 dark:text-${course.accentColor}-400 mb-2 block`}>{course.subtitle}</span>
                    <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">{course.title}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 text-lg">{course.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-8 mt-auto pt-6 text-sm border-t border-zinc-100 dark:border-white/5">
                    <div className="text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                       <span className="text-zinc-400 dark:text-zinc-500">Преподаватели:</span>
                       <span className="font-medium text-zinc-900 dark:text-white">{course.teacher.name}</span>
                    </div>
                    <div className="ml-auto text-zinc-900 dark:text-white font-bold text-2xl">
                      {course.price}
                    </div>
                  </div>
                  
                  {/* Hover Arrow */}
                  <div className="absolute top-10 right-10 text-zinc-900 dark:text-white opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};