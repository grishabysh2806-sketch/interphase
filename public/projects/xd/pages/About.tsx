
import React, { useEffect } from 'react';
import { Reveal } from '../components/ui/Reveal';
import { Button } from '../components/ui/Button';

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 overflow-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse"></div>
         <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-red-900/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Manifesto Header */}
        <Reveal>
          <div className="mb-40">
             <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 tracking-tighter leading-[0.9] mb-12">
               CODE<br/>OF<br/>THOUGHT
             </h1>
             <div className="max-w-2xl ml-auto">
                <p className="text-2xl md:text-3xl text-zinc-300 font-light leading-relaxed border-l-4 border-blue-600 pl-8">
                  Мы не учим "заказывать кофе". Мы учим понимать цивилизации.
                  Язык — это операционная система мышления. Мы помогаем вам установить новую.
                </p>
             </div>
          </div>
        </Reveal>

        {/* Marquee Strip */}
        <div className="w-full overflow-hidden py-12 border-y border-white/10 bg-white/5 backdrop-blur-sm mb-32 -mx-6 md:-mx-20">
           <div className="whitespace-nowrap animate-marquee flex gap-20 text-4xl font-bold text-zinc-500 uppercase tracking-widest opacity-50">
              <span>Arabic Mastery</span>
              <span>Chinese Intensive</span>
              <span>English Pro</span>
              <span>History & Culture</span>
              <span>Academic Depth</span>
              <span>Arabic Mastery</span>
              <span>Chinese Intensive</span>
              <span>English Pro</span>
           </div>
        </div>

        {/* Philosophy Grid (Abstract, No Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-40">
           <Reveal width="100%">
              <div className="p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 h-full relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full group-hover:bg-orange-500/20 transition-all duration-700"></div>
                 <span className="text-orange-500 font-mono mb-6 block text-xl">01. STRUCTURE</span>
                 <h3 className="text-4xl font-bold text-white mb-6">Академическая база</h3>
                 <p className="text-zinc-400 text-lg leading-relaxed">
                    Мы используем проверенные университетские методики (МГИМО, Политех), очищенные от бюрократии, но сохранившие глубину. Никаких "авторских методик за 2 дня". Только наука.
                 </p>
              </div>
           </Reveal>

           <Reveal width="100%" delay={200}>
              <div className="p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 h-full relative overflow-hidden group">
                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full group-hover:bg-red-500/20 transition-all duration-700"></div>
                 <span className="text-red-500 font-mono mb-6 block text-xl">02. CONTEXT</span>
                 <h3 className="text-4xl font-bold text-white mb-6">Исторический контекст</h3>
                 <p className="text-zinc-400 text-lg leading-relaxed">
                    Нельзя понять иероглиф "Дом" (家), не зная, что под крышей изображена свинья. Мы даем ключи к культурному коду через историю.
                 </p>
              </div>
           </Reveal>
           
           <Reveal width="100%">
              <div className="p-12 rounded-[3rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 h-full relative overflow-hidden group">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <span className="text-blue-500 font-mono mb-6 block text-xl">03. MENTORS</span>
                 <h3 className="text-4xl font-bold text-white mb-6">Преподаватели-фанатики</h3>
                 <p className="text-zinc-400 text-lg leading-relaxed">
                    С нами работают те, кто живет своим предметом. Студенты-отличники лучших ВУЗов, молодые ученые и практики, которые горят желанием передать знания.
                 </p>
              </div>
           </Reveal>

           <Reveal width="100%" delay={200}>
              <div className="flex flex-col justify-center items-center text-center p-12 rounded-[3rem] border border-dashed border-zinc-800 h-full hover:bg-zinc-900/50 transition-colors cursor-pointer" onClick={() => window.open('https://t.me/mondeydelnik', '_blank')}>
                 <h3 className="text-4xl font-bold text-white mb-6">Join the Elite</h3>
                 <p className="text-zinc-500 mb-8">
                   Станьте частью интеллектуального клуба "Четвертый Интернационал".
                 </p>
                 <Button variant="outline" size="lg">Telegram Канал</Button>
              </div>
           </Reveal>
        </div>

        <Reveal>
           <div className="text-center">
              <p className="text-sm font-mono text-zinc-600 tracking-[0.5em] uppercase">Est. 2024 • Moscow • Worldwide</p>
           </div>
        </Reveal>

      </div>
    </div>
  );
};
