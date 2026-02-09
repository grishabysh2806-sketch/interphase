
import React, { useState } from 'react';
import { Reveal } from '../ui/Reveal';

const FAQ_ITEMS = [
  {
    q: "Есть ли на курсах сообщество единомышленников?",
    a: "Да, это основа нашей методики. Вы попадаете в закрытый чат группы (до 15 человек), где обсуждаете домашние задания, новости региона и делитесь успехами. Преподаватель также находится в чате."
  },
  {
    q: "Кому задавать вопросы во время курса?",
    a: "На каждом тарифе у вас есть наставник. Вопросы по материалу можно задавать в чате группы, лично преподавателю во время вебинара или в комментариях к уроку на платформе."
  },
  {
    q: "Можно общаться с преподавателем вебинара?",
    a: "Конечно. Все вебинары проходят в живом формате. Вы можете писать в чат, а на разговорных занятиях — выходить в эфир с микрофоном."
  },
  {
    q: "Можно заплатить половину сейчас, а всю остальную сумму — потом?",
    a: "Да, мы предоставляем внутреннюю рассрочку: 50% перед стартом и 50% в середине обучения. Также доступна оплата долями от банка-партнера."
  },
  {
    q: "Какие есть тарифы и в чём разница?",
    a: "У нас два основных трека: 'Слушатель' (доступ к лекциям и тестам) и 'Студент' (полный доступ с проверкой ДЗ, чатом и разговорными клубами). Подробности на странице курса."
  },
  {
    q: "Что делать, если предметы пересекаются по времени и дате?",
    a: "Все занятия записываются и доступны в личном кабинете сразу после окончания. Вы можете смотреть их в любое удобное время, ускорять или замедлять воспроизведение."
  },
  {
    q: "Можно скачать урок, чтобы смотреть без интернета?",
    a: "В целях защиты авторского права прямое скачивание видео недоступно, но наше мобильное приложение позволяет сохранять уроки в кэш для оффлайн-просмотра."
  },
  {
    q: "Кто ведёт занятия?",
    a: "Занятия ведут выпускники и аспиранты профильных ВУЗов (МГИМО, ИСАА МГУ, СПбГУ, Политех КНР) с опытом преподавания и проживания в стране изучаемого языка."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal width="100%">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-16">FAQ</h2>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <div 
                key={idx}
                className="border-b border-zinc-100 dark:border-white/5 last:border-none"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className={`text-lg md:text-xl font-medium transition-colors duration-300 ${openIndex === idx ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-900 dark:text-zinc-200 group-hover:text-blue-500'}`}>
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-zinc-200 dark:border-white/10 transition-all duration-300 ${openIndex === idx ? 'rotate-45 border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'text-zinc-400 group-hover:border-zinc-400'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed pr-8">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};
