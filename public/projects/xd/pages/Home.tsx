
import React from 'react';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';
import { HeroBackground } from '../components/ui/HeroBackground';
import { FloatingGlyphs } from '../components/ui/FloatingGlyphs';
import { Consultation } from '../components/sections/Consultation';
import { FAQ } from '../components/sections/FAQ';
import { COURSES, REVIEWS } from '../constants';
import { Course, Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
  onSelectCourse: (course: Course) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectCourse }) => {
  return (
    <div className="w-full relative bg-zinc-50 dark:bg-black transition-colors duration-500">
      
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
        <HeroBackground />
        <FloatingGlyphs />
        
        {/* Dark overlay for text readability in both modes, slightly adjusted for light */}
        <div className="absolute inset-0 bg-white/30 dark:bg-black/40 z-0 backdrop-blur-[1px]"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <Reveal>
             <div 
               onClick={() => onNavigate(Page.ABOUT)}
               className="mb-8 inline-flex items-center gap-2 px-4 py-2 border border-zinc-900/10 dark:border-white/10 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-xl hover:bg-white/30 dark:hover:bg-white/10 transition-colors cursor-pointer group shadow-sm"
             >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200 tracking-wider uppercase group-hover:text-black dark:group-hover:text-white transition-colors">Новый набор открыт</span>
             </div>
          </Reveal>
          
          <Reveal delay={200}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-8 leading-[0.9] drop-shadow-2xl">
              Четвертый <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-zinc-800 to-zinc-500 dark:from-white dark:to-white/50">Интернационал</span>
            </h1>
          </Reveal>

          <Reveal delay={400}>
            <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed drop-shadow-md">
              Мы не просто учим языкам. Мы передаем культурный код и историческую память. Китайский, Арабский, Английский — как оружие интеллектуала.
            </p>
          </Reveal>

          <Reveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" onClick={() => onNavigate(Page.COURSES)} className="w-full sm:w-auto min-w-[200px] text-lg">
                Выбрать направление
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.open('https://t.me/mondeydelnik', '_blank')} className="w-full sm:w-auto min-w-[200px] gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.638z"/></svg>
                Telegram канал
              </Button>
            </div>
          </Reveal>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <svg className="w-6 h-6 text-zinc-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32 bg-white dark:bg-zinc-950 relative border-t border-zinc-200 dark:border-white/5 overflow-hidden transition-colors duration-500">
         {/* Decoration */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 dark:bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                 <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-zinc-900 dark:text-white">Не просто курсы.<br/>Академическая среда.</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-6 leading-relaxed">
                       В отличие от масс-маркет школ, мы не продаем "успешный успех" и "английский за 2 часа". Мы создали комьюнити, где преподают фанатики своего дела.
                    </p>
                    <div className="space-y-6">
                       <div 
                         onClick={() => onNavigate(Page.ABOUT)}
                         className="group p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                       >
                          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">Политех и МГИМО</h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">Наши преподаватели — студенты и выпускники лучших ВУЗов, практикующие специалисты, а не теоретики.</p>
                       </div>
                       <div 
                         onClick={() => onNavigate(Page.COURSES)}
                         className="group p-6 rounded-2xl bg-zinc-50 dark:bg-white/5 border border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                       >
                          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">Культурный иммерсив</h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">Нельзя выучить язык в отрыве от истории. Наши факультативы дают контекст каждому иероглифу.</p>
                       </div>
                    </div>
                 </div>
                 <div className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer border border-zinc-200 dark:border-white/5 shadow-2xl dark:shadow-none" onClick={() => onNavigate(Page.ABOUT)}>
                    <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-80" alt="Library" />
                    <div className="absolute inset-0 bg-black/30 dark:bg-black/50 group-hover:bg-black/20 dark:group-hover:bg-black/30 transition-colors"></div>
                    <div className="absolute bottom-8 left-8 right-8">
                       <p className="text-3xl font-bold text-white drop-shadow-lg">«Знать много языков — значит иметь много ключей к одному замку»</p>
                       <p className="mt-4 text-zinc-200">— Вольтер</p>
                    </div>
                 </div>
              </div>
            </Reveal>
         </div>
      </section>

      {/* Courses Preview */}
      <section className="py-32 bg-zinc-50 dark:bg-black relative transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
             <div className="flex justify-between items-end mb-16">
               <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white">Направления</h2>
               <Button variant="link" onClick={() => onNavigate(Page.COURSES)} className="hidden md:block">Смотреть весь каталог</Button>
             </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES.slice(0, 3).map((course, i) => (
              <Reveal key={course.id} delay={i * 150} width="100%">
                <div 
                  onClick={() => onSelectCourse(course)}
                  className="group relative h-[550px] w-full bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden cursor-pointer border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-500 hover:shadow-2xl shadow-lg dark:shadow-blue-900/10"
                >
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-80 dark:opacity-60 group-hover:opacity-70 dark:group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  
                  <div className="absolute top-6 left-6">
                     <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                        {course.level}
                     </span>
                  </div>

                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <p className={`text-sm font-bold uppercase tracking-wider mb-2 text-${course.accentColor}-300 dark:text-${course.accentColor}-400`}>
                      {course.subtitle}
                    </p>
                    <h3 className="text-3xl font-bold text-white mb-3 group-hover:-translate-y-2 transition-transform duration-300">{course.title}</h3>
                    <p className="text-zinc-300 dark:text-zinc-400 line-clamp-3 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 text-sm leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-2 text-white font-medium group-hover:text-blue-300 transition-colors">
                      <span>Подробнее</span>
                      <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            
            {/* Electives Promo Card */}
            <Reveal delay={450} width="100%">
               <div 
                  onClick={() => onNavigate(Page.COURSES)}
                  className="group relative h-[550px] w-full bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden cursor-pointer border border-zinc-200 dark:border-white/5 flex flex-col items-center justify-center text-center p-8 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-lg"
               >
                   <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 mb-6 blur-xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                   <div className="relative z-10">
                      <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">История <br/>Цивилизаций</h3>
                      <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-xs mx-auto">Факультативные курсы по истории Китая и Ближнего Востока. Пойми контекст.</p>
                      <Button variant="outline">Смотреть факультативы</Button>
                   </div>
               </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NEW: Consultation Form */}
      <Consultation />

      {/* NEW: FAQ Section */}
      <FAQ />

      {/* Reviews */}
      <section className="py-32 bg-zinc-50 dark:bg-black transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
             <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-zinc-900 dark:text-white">Голоса сообщества</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review, i) => (
              <Reveal key={review.id} delay={i * 150}>
                <div 
                  className="glass-panel p-8 rounded-3xl h-full flex flex-col justify-between hover:bg-white/80 dark:hover:bg-white/5 transition-colors duration-300 cursor-default shadow-lg"
                >
                  <div className="mb-8">
                    <div className="flex gap-1 mb-4">
                       {[1,2,3,4,5].map(star => <span key={star} className="text-yellow-500">★</span>)}
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed italic text-lg">"{review.text}"</p>
                  </div>
                  <div className="flex items-center gap-4 border-t border-zinc-200 dark:border-white/5 pt-6">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
                       {review.name[0]}
                    </div>
                    <div>
                      <div className="text-zinc-900 dark:text-white font-bold">{review.name}</div>
                      <div className="text-zinc-500 text-sm">{review.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-20 border-t border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center text-center transition-colors duration-500">
         <Reveal>
           <h2 className="text-4xl md:text-6xl font-bold mb-8 text-zinc-900 dark:text-white">Готовы начать?</h2>
           <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-10">
             Присоединяйтесь к «Четвертому Интернационалу» сегодня. Количество мест на потоке ограничено для поддержания качества.
           </p>
           <Button size="lg" onClick={() => window.open('https://t.me/mondeydelnik', '_blank')}>
              Написать в Telegram
           </Button>
         </Reveal>
      </section>
    </div>
  );
};
