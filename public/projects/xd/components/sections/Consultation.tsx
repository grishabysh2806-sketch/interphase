
import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';
import { Button } from '../ui/Button';

export const Consultation: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Logic to send form data would go here
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal width="100%">
          <div className="bg-white dark:bg-black border border-zinc-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            
            {/* Visual Side */}
            <div className="lg:w-5/12 relative min-h-[400px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop" 
                alt="Student studying" 
                className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-blue-900/20 dark:bg-black/40"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-lg transform translate-y-4 opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500">
                   <p className="text-sm font-medium text-zinc-900 dark:text-white">
                     «Секрет успеха — это дисциплина, помноженная на амбиции. Мы даем инструменты, вы строите результат.»
                   </p>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:w-7/12 p-8 md:p-12 lg:p-16 bg-white dark:bg-zinc-950 relative">
               {!isSubmitted ? (
                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
                        Расскажем о программе и ответим на вопросы
                      </h2>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {['Подготовка с любого уровня', 'Помощь с поступлением', 'Индивидуальный план'].map((tag, i) => (
                          <span key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-xs font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-white/10">
                            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Ваше имя" 
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        required
                        value={formState.name}
                        onChange={e => setFormState({...formState, name: e.target.value})}
                      />
                      <input 
                        type="email" 
                        placeholder="Email (для материалов)" 
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        required
                        value={formState.email}
                        onChange={e => setFormState({...formState, email: e.target.value})}
                      />
                      <input 
                        type="tel" 
                        placeholder="+7 (999) 000-00-00" 
                        className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-xl px-5 py-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        required
                        value={formState.phone}
                        onChange={e => setFormState({...formState, phone: e.target.value})}
                      />
                    </div>

                    <div className="flex items-start gap-3 py-2">
                       <div className="relative flex items-center">
                          <input type="checkbox" id="consent" required className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-300 dark:border-zinc-600 checked:bg-blue-500 checked:border-blue-500 transition-all" />
                          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity" viewBox="0 0 14 10" fill="none">
                            <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                       </div>
                       <label htmlFor="consent" className="text-xs text-zinc-500 cursor-pointer select-none leading-relaxed">
                          Нажимая кнопку, я даю согласие на обработку персональных данных и получение информационных рассылок.
                       </label>
                    </div>

                    <Button type="submit" className="w-full py-5 text-lg shadow-xl shadow-blue-900/20">
                       Получить консультацию
                    </Button>
                 </form>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center text-center py-20">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6 animate-fade-up visible">
                       <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Заявка принята</h3>
                    <p className="text-zinc-500">Наш менеджер свяжется с вами в течение 15 минут.</p>
                 </div>
               )}

               {/* Bottom Stats */}
               <div className="mt-10 pt-8 border-t border-zinc-100 dark:border-white/5">
                  <div className="flex items-center gap-4 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-500/10">
                     <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                           <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 overflow-hidden">
                              <img src={`https://randomuser.me/api/portraits/thumb/men/${i*10}.jpg`} className="w-full h-full object-cover" alt="Student" />
                           </div>
                        ))}
                     </div>
                     <div>
                        <p className="text-sm font-bold text-zinc-900 dark:text-white">Выпустили 1000+ учеников</p>
                        <p className="text-xs text-zinc-500">Высокие результаты с 2020 года</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
