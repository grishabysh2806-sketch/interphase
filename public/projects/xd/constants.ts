
import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'arabic-mastery',
    title: 'Арабский язык',
    subtitle: 'Классическая академическая программа',
    description: 'Фундаментальный академический курс. От постановки произношения до чтения классической литературы. Мы сохранили строгую структуру университетского учебника, оживив её интерактивными заданиями и аудиоматериалами.',
    level: 'A1 - B2',
    duration: '12 месяцев',
    price: '45 990 ₽',
    image: 'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?q=80&w=2000&auto=format&fit=crop', // Warm, vibrant Arabic architecture
    accentColor: 'orange',
    stats: {
      students: 0,
      rating: 5.0,
      hours: 380
    },
    teacher: {
      name: 'Бушуев Григорий и Омаров Виталий',
      role: 'Ведущие арабисты',
      bio: 'Григорий обеспечивает строгую академическую базу, Виталий ставит живое произношение и диалекты.',
      images: [
        'https://images.unsplash.com/photo-1615813967515-e1838c1c5116?q=80&w=1000&auto=format&fit=crop', // Bushuev style
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop'  // Omarov style
      ]
    },
    facts: [
      "Курс полностью соответствует программе МГИМО.",
      "Изучаем все 10 пород арабского глагола.",
      "Постановка почерка 'Рука' и 'Насх'.",
      "Глубокий разбор Коранического текста с лингвистической точки зрения."
    ],
    syllabus: [
       { title: "Вводный фонетический курс (Уроки 1-5)", topics: ["Алфавит", "Огласовки", "Солнечные/Лунные буквы", "Ударение"] },
       { title: "Основы морфологии (Уроки 6-12)", topics: ["Род", "Число", "Падежи", "Идафа", "Предлоги"] },
       { title: "Глагольная система (Уроки 13-24)", topics: ["Породы глагола", "Масдары", "Слабые корни", "Числительные"] }
    ], 
    fullCurriculum: [
      {
        title: "Урок 1: Звуки и Буквы (Введение)",
        hours: 5,
        lessons: [
          { 
            id: 'ar-01-theory',
            title: "Согласные (د, ذ, ر, ز, و) и Алиф", 
            type: "lecture", 
            duration: "45 мин",
            data: {
              type: 'text',
              content: `
                <h2 class="text-3xl font-bold mb-6 text-orange-500">Урок №1. Фонетика и Графика</h2>
                <p class="mb-6 text-lg">Арабский язык входит в группу семитских языков. Корень слова обычно состоит из трех согласных звуков. Гласные играют служебную роль.</p>
                
                <h3 class="text-2xl font-bold mb-4 border-b border-orange-500/30 pb-2">1. Согласные звуки</h3>
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                   <div class="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10">
                      <div class="text-4xl font-serif mb-2 text-orange-600">د</div>
                      <div class="font-bold">Даль (d)</div>
                      <div class="text-sm text-zinc-500">Передненёбный, звонкий. Мягче русского "д".</div>
                   </div>
                   <div class="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10">
                      <div class="text-4xl font-serif mb-2 text-orange-600">ذ</div>
                      <div class="font-bold">Заль (ð)</div>
                      <div class="text-sm text-zinc-500">Межзубный звонкий. Как 'th' в 'this'.</div>
                   </div>
                   <div class="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-white/10">
                      <div class="text-4xl font-serif mb-2 text-orange-600">ر</div>
                      <div class="font-bold">Ра (r)</div>
                      <div class="text-sm text-zinc-500">Передненёбный, вибрирующий, раскатистый.</div>
                   </div>
                </div>

                <h3 class="text-2xl font-bold mb-4 border-b border-orange-500/30 pb-2">2. Краткие гласные (Огласовки)</h3>
                <ul class="space-y-4 text-lg bg-zinc-50 dark:bg-white/5 p-6 rounded-xl">
                   <li class="flex items-center gap-4"><span class="text-3xl font-serif">ــَــ</span> <strong>Фатха</strong> — звук [а]. Черта над буквой.</li>
                   <li class="flex items-center gap-4"><span class="text-3xl font-serif">ــِــ</span> <strong>Кясра</strong> — звук [и]. Черта под буквой.</li>
                   <li class="flex items-center gap-4"><span class="text-3xl font-serif">ــُــ</span> <strong>Дамма</strong> — звук [у]. Запятая над буквой.</li>
                </ul>
              `
            }
          },
          { 
            id: 'ar-01-practice',
            title: "Практикум: Чтение и транскрипция", 
            type: "homework", 
            duration: "30 мин",
            data: {
              type: 'quiz',
              questions: [
                {
                  id: 1,
                  question: "Как читается слог دَ?",
                  options: ["ди", "ду", "да", "д"],
                  correctAnswer: 2,
                  explanation: "Фатха (черта сверху) дает звук 'а'."
                },
                {
                  id: 2,
                  question: "Выберите букву, обозначающую межзубный звонкий звук (как th в this):",
                  options: ["د", "ذ", "ر", "ز"],
                  correctAnswer: 1,
                  explanation: "Это буква Заль (ذ)."
                }
              ]
            }
          }
        ]
      },
      {
        title: "Урок 2: Согласные б, т, к, м, й",
        hours: 6,
        lessons: [
          {
            id: 'ar-02-theory',
            title: "Новые буквы и Ударение",
            type: "lecture",
            duration: "45 мин",
            data: {
              type: 'text',
              content: "<h2>Согласные (ب, ت, ك, م, ي)</h2><p>Разбор написания букв в начале, середине и конце слова. Правило ударения: в арабском слове ударение обычно падает на третий слог от конца, если второй от конца краткий.</p>"
            }
          },
          {
            id: 'ar-02-practice',
            title: "Упражнение: Слитное написание",
            type: "practice",
            duration: "25 мин",
            data: {
              type: 'quiz',
              questions: [
                {
                  id: 1,
                  question: "Какая буква не соединяется слева?",
                  options: ["ب (Ба)", "و (Вау)", "م (Мим)", "ت (Та)"],
                  correctAnswer: 1,
                  explanation: "Буква Вау (و) относится к буквам-эгоистам и не соединяется с последующей буквой."
                }
              ]
            }
          }
        ]
      },
      {
        title: "Урок 3: Артикль и Солнечные буквы",
        hours: 8,
        lessons: [
          {
            id: 'ar-03-theory',
            title: "Артикль Аль (ال) и ассимиляция",
            type: "lecture",
            duration: "50 мин",
            data: {
              type: 'text',
              content: "<h2>Определенность имени</h2><p>Артикль ال (Аль) делает слово определенным. Если слово начинается с 'солнечной' буквы (т, д, з, р, с, ш, н...), то 'Л' артикля не читается, а первая буква слова удваивается.</p>"
            }
          },
          {
            id: 'ar-03-quiz',
            title: "Тест: Солнечные и Лунные",
            type: "homework",
            duration: "20 мин",
            data: {
              type: 'quiz',
              questions: [
                {
                  id: 1,
                  question: "Как прочитать 'al-shams' (солнце)?",
                  options: ["Аль-шамс", "Аш-шамс", "Ля-шамс"],
                  correctAnswer: 1,
                  explanation: "Буква Шин (ش) — солнечная, происходит ассимиляция."
                },
                {
                  id: 2,
                  question: "Как прочитать 'al-qamar' (луна)?",
                  options: ["Аль-камар", "Ак-камар", "А-камар"],
                  correctAnswer: 0,
                  explanation: "Буква Каф (ق) — лунная, ассимиляции нет."
                }
              ]
            }
          }
        ]
      },
      {
        title: "Урок 4: Эмфатические звуки",
        hours: 6,
        lessons: [
          {
            id: 'ar-04-theory',
            title: "Звуки (ص, ض, ط, ظ)",
            type: "lecture",
            duration: "45 мин",
            data: { type: 'text', content: "<h2>Эмфаза</h2><p>Изучаем 'твердые' аналоги звуков с, д, т, з. Артикуляция этих звуков требует подъема задней спинки языка к мягкому небу (веляризация)." }
          }
        ]
      },
      {
        title: "Урок 5: Женский род",
        hours: 6,
        lessons: [
           {
             id: 'ar-05-theory',
             title: "Та-марбута",
             type: "lecture",
             duration: "40 мин",
             data: { type: 'text', content: "<h2>Женский род</h2><p>Основной признак женского рода — окончание ة (та-марбута). Слова: город (мадина), комната (гурфа), машина (сайяра).</p>" }
           },
           {
             id: 'ar-05-quiz',
             title: "Практика: Определение рода",
             type: "practice",
             duration: "15 мин",
             data: {
                type: 'quiz',
                questions: [
                   {
                      id: 1,
                      question: "Какое слово мужского рода?",
                      options: ["مَدْرَسَة (Школа)", "كِتَاب (Книга)", "طَاوِلَة (Стол)"],
                      correctAnswer: 1,
                      explanation: "Китаб не имеет окончания та-марбута."
                   }
                ]
             }
           }
        ]
      },
      {
        title: "Урок 6: Идафа",
        hours: 8,
        lessons: [
           {
             id: 'ar-06-theory',
             title: "Изафетная конструкция",
             type: "lecture",
             duration: "60 мин",
             data: { type: 'text', content: "<h2>Идафа</h2><p>Конструкция принадлежности. Первое слово (мудаф) без артикля и танвина, второе (мудаф илейхи) в родительном падеже. Пример: Китаб ат-талиб (Книга студента).</p>" }
           }
        ]
      },
      {
        title: "Урок 7-9: Местоимения и Предлоги",
        hours: 12,
        lessons: [
          {
            id: 'ar-07-theory',
            title: "Слитные местоимения",
            type: "lecture",
            duration: "50 мин",
            data: { type: 'text', content: "<h2>Слитные местоимения</h2><p>Мой дом (бейти), твой дом (бейтука/бейтуки). Присоединение местоимений к именам и предлогам.</p>" }
          },
          {
            id: 'ar-09-theory',
            title: "Предлоги (Харф джар)",
            type: "lecture",
            duration: "45 мин",
            data: { type: 'text', content: "<h2>Предлоги</h2><p>Предлоги: фи (в), 'аля (на), мин (из), иля (к). После них имя всегда стоит в родительном падеже (кясра).</p>" }
          }
        ]
      },
      {
        title: "Урок 10-12: Именное предложение",
        hours: 10,
        lessons: [
          {
            id: 'ar-10-theory',
            title: "Мубтада и Хабар",
            type: "lecture",
            duration: "50 мин",
            data: { type: 'text', content: "<h2>Структура предложения</h2><p>Именное предложение состоит из Подлежащего (определено) и Сказуемого (неопределено). Ал-китаб джадид (Книга - новая).</p>" }
          }
        ]
      },
      {
        title: "Урок 13: Правильное множественное число",
        hours: 8,
        lessons: [
          {
            id: 'ar-13-theory',
            title: "Целое множественное число",
            type: "lecture",
            duration: "60 мин",
            data: { type: 'text', content: "<h2>Мужской и женский род</h2><p>Мужской род: окончание -уна (муаллимуна). Женский род: окончание -ат (муаллимат).</p>" }
          },
          {
             id: 'ar-13-practice',
             title: "Тест: Множественное число",
             type: "homework",
             duration: "30 мин",
             data: {
                type: 'quiz',
                questions: [
                   {
                      id: 1,
                      question: "Множественное число от مُهَنْدِس (инженер)?",
                      options: ["مُهَنْدِسَة", "مُهَنْدِسُونَ", "مُهَنْدِسَات"],
                      correctAnswer: 1,
                      explanation: "Добавляется окончание -уна для мужского рода."
                   }
                ]
             }
          }
        ]
      },
      {
        title: "Урок 14: Ломаное множественное число",
        hours: 12,
        lessons: [
          {
            id: 'ar-14-theory',
            title: "Разбитое множественное число",
            type: "lecture",
            duration: "90 мин",
            data: { type: 'text', content: "<h2>Формулы (Аузан)</h2><p>Большинство арабских слов образуют мн.ч. путем изменения основы. Книга (китаб) -> Книги (кутуб). Дом (бейт) -> Дома (буйут).</p>" }
          }
        ]
      },
      {
        title: "Урок 15: Глагол (Прошедшее время)",
        hours: 10,
        lessons: [
          {
            id: 'ar-15-theory',
            title: "Спряжение в прошедшем времени",
            type: "lecture",
            duration: "60 мин",
            data: { type: 'text', content: "<h2>Форма Фа'аля (فَعَلَ)</h2><p>Я писал (катабту), ты писал (катабта), он писал (катаба). Корневые буквы и окончания.</p>" }
          }
        ]
      },
      {
        title: "Урок 16: Степени сравнения (Элатив)",
        hours: 6,
        lessons: [
          {
            id: 'ar-16-theory',
            title: "Форма Аф'алю",
            type: "lecture",
            duration: "45 мин",
            data: { type: 'text', content: "<h2>Сравнительная и превосходная степень</h2><p>Красивый (джамиль) -> Красивее (аджмаль). Большой (кабир) -> Самый большой (акбар).</p>" }
          }
        ]
      },
      {
        title: "Урок 17-18: Производные породы (II, III, IV)",
        hours: 15,
        lessons: [
          {
            id: 'ar-17-theory',
            title: "II Порода (Фа'аля)",
            type: "lecture",
            duration: "50 мин",
            data: { type: 'text', content: "<h2>Усиление и каузатив</h2><p>Удвоение средней коренной. Дараса (учил) -> Дарраса (преподавал/обучал).</p>" }
          },
          {
            id: 'ar-18-theory',
            title: "III и IV Породы",
            type: "lecture",
            duration: "60 мин",
            data: { type: 'text', content: "<h2>Направленность и побуждение</h2><p>III: Катаба (писал) -> Катаба (переписывался). IV: Хараджа (вышел) -> Ахраджа (вывел/изгнал).</p>" }
          }
        ]
      },
      {
        title: "Урок 19: Числительные 1 и 2",
        hours: 4,
        lessons: [
          {
            id: 'ar-19-theory',
            title: "Согласование 1 и 2",
            type: "lecture",
            duration: "30 мин",
            data: { type: 'text', content: "<h2>Числа 1 и 2</h2><p>Ставятся ПОСЛЕ исчисляемого и согласуются с ним в роде. Китаб вахид (одна книга). Бинтан иснатан (две девочки).</p>" }
          }
        ]
      },
      {
        title: "Урок 20: Числительные 3-10",
        hours: 8,
        lessons: [
          {
            id: 'ar-20-theory',
            title: "Обратное согласование",
            type: "lecture",
            duration: "60 мин",
            data: { type: 'text', content: "<h2>Правило полярности</h2><p>Числительные от 3 до 10 имеют род, ПРОТИВОПОЛОЖНЫЙ роду единственного числа исчисляемого. Салясату кутуб (три книги - кутуб (м.р.), значит число с та-марбутой).</p>" }
          },
          {
             id: 'ar-20-quiz',
             title: "Задание: Посчитай предметы",
             type: "homework",
             duration: "25 мин",
             data: {
                type: 'quiz',
                questions: [
                   {
                      id: 1,
                      question: "5 домов (дом - бейт, м.р.)",
                      options: ["Хамсату буйут", "Хамсу буйут"],
                      correctAnswer: 0,
                      explanation: "Дом (бейт) мужского рода, значит 5 должно быть в женском (Хамсату)."
                   }
                ]
             }
          }
        ]
      },
      {
        title: "Урок 21: Породы V и VI",
        hours: 8,
        lessons: [
          {
            id: 'ar-21-theory',
            title: "Возвратность и Взаимность",
            type: "lecture",
            duration: "50 мин",
            data: { type: 'text', content: "<h2>Тафа'аля и Тафа'аля</h2><p>V порода: Таалляма (учился). VI порода: Тарасаля (переписывались друг с другом).</p>" }
          }
        ]
      },
      {
        title: "Урок 22: Породы VII, VIII, X",
        hours: 12,
        lessons: [
          {
            id: 'ar-22-theory',
            title: "Страдательность и Просьба",
            type: "lecture",
            duration: "70 мин",
            data: { type: 'text', content: "<h2>Инфа'аля, Ифта'аля, Истаф'аля</h2><p>VII: Инкасара (разбился). VIII: Иджтама'а (собрался). X: Истагфара (просил прощения).</p>" }
          }
        ]
      },
      {
        title: "Урок 23: Слабые глаголы (Мисаль)",
        hours: 10,
        lessons: [
          {
            id: 'ar-23-theory',
            title: "Подобноправильные глаголы",
            type: "lecture",
            duration: "60 мин",
            data: { type: 'text', content: "<h2>Глаголы с первой Вау</h2><p>Васаля (прибыл). В настоящем времени Вау выпадает: Ясилю (он прибывает).</p>" }
          }
        ]
      },
      {
        title: "Урок 24: Пустые глаголы (Аджваф)",
        hours: 12,
        lessons: [
          {
            id: 'ar-24-theory',
            title: "Глаголы с пустой серединой",
            type: "lecture",
            duration: "60 мин",
            data: { type: 'text', content: "<h2>Каля, Кана</h2><p>Каля (сказал) -> Якулю (говорит). Кана (был) -> Якуну (есть/будет). Изменение слабой коренной в зависимости от времени.</p>" }
          }
        ]
      },
      {
        title: "Урок 25: Недостаточные глаголы (Накис)",
        hours: 12,
        lessons: [
          {
            id: 'ar-25-theory',
            title: "Глаголы со слабой последней",
            type: "lecture",
            duration: "60 мин",
            data: { type: 'text', content: "<h2>Маша, Да'а</h2><p>Спряжение глаголов, оканчивающихся на Алиф или Йа. Нюансы усечения гласных.</p>" }
          },
          {
             id: 'ar-25-quiz',
             title: "Финальный тест по морфологии",
             type: "homework",
             duration: "45 мин",
             data: {
                type: 'quiz',
                questions: [
                   {
                      id: 1,
                      question: "Я был (от глагола Кана)",
                      options: ["Кунту", "Кяна", "Кунна"],
                      correctAnswer: 0,
                      explanation: "1 л. ед.ч. - Кунту."
                   }
                ]
             }
          }
        ]
      }
    ]
  },
  {
    id: 'chinese-intensive',
    title: 'Китайский язык',
    subtitle: 'Код Поднебесной',
    description: 'Фундаментальный курс от студентов Политеха. Идеально для тех, кто планирует бизнес или научную карьеру в Азии. Разбор иероглифики от ключей до каллиграфии.',
    level: 'HSK 1 - HSK 5',
    duration: '12 месяцев',
    price: '52 990 ₽',
    image: 'https://images.unsplash.com/photo-1535139262971-c51845709a48?q=80&w=2000&auto=format&fit=crop', // Neon cyberpunk Hong Kong/China vibes
    accentColor: 'red',
    stats: { students: 0, rating: 4.9, hours: 180 },
    teacher: { 
      name: 'Ткачук Иван и Гребеньков Кирилл', 
      role: 'Политех (КНР)', 
      bio: 'Молодые китаисты с техническим бэкграундом. Знают, как работает реальный Китай изнутри.', 
      images: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    syllabus: [],
    fullCurriculum: [
      {
        title: "Модуль 1: Фонетика и Тоны",
        hours: 30,
        lessons: [
          { 
            id: 'cn-01',
            title: "Система тонов: Музыка смысла", 
            type: "lecture", 
            duration: "30 мин",
            data: {
              type: 'text',
              content: `
                <h2 class="text-3xl font-bold mb-6">Почему китайцы "поют"?</h2>
                <p class="mb-6 text-lg">Китайский язык — тональный. Это значит, что высота голоса и её изменение (мелодия) влияют на лексическое значение слова.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                   <div class="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border-l-4 border-red-500">
                      <h4 class="font-bold text-xl mb-2">1 тон: Высокий ровный (mā)</h4>
                      <p class="mt-2 font-bold text-2xl">妈 (Мама)</p>
                   </div>
                   <div class="bg-yellow-50 dark:bg-yellow-900/10 p-6 rounded-xl border-l-4 border-yellow-500">
                      <h4 class="font-bold text-xl mb-2">2 тон: Восходящий (má)</h4>
                      <p class="mt-2 font-bold text-2xl">麻 (Конопля)</p>
                   </div>
                   <div class="bg-green-50 dark:bg-green-900/10 p-6 rounded-xl border-l-4 border-green-500">
                      <h4 class="font-bold text-xl mb-2">3 тон: Нисходяще-восходящий (mǎ)</h4>
                      <p class="mt-2 font-bold text-2xl">马 (Лошадь)</p>
                   </div>
                   <div class="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border-l-4 border-blue-500">
                      <h4 class="font-bold text-xl mb-2">4 тон: Падающий (mà)</h4>
                      <p class="mt-2 font-bold text-2xl">骂 (Ругать)</p>
                   </div>
                </div>
              `
            }
          }
        ]
      }
    ]
  },
  {
    id: 'english-pro',
    title: 'Английский язык',
    subtitle: 'Инструмент глобалиста',
    description: 'Английский без школьной скуки. Курс Слободянюка Романа направлен на преодоление языкового барьера. Глубокий разбор грамматики через логику, а не правила.',
    level: 'Intermediate - Proficiency',
    duration: '6 месяцев',
    price: '39 990 ₽',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop', // Modern London/Business style
    accentColor: 'blue',
    stats: { students: 0, rating: 5.0, hours: 90 },
    teacher: { 
      name: 'Слободянюк Роман', 
      role: 'Лингвист-практик', 
      bio: 'Преподаватель с уникальным подходом к семантике. Учит думать на языке.', 
      images: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop'
      ]
    },
    syllabus: [],
    fullCurriculum: []
  },
  {
    id: 'history-china',
    title: 'История Китая',
    subtitle: 'Факультатив: 5000 лет',
    description: 'Глубокое погружение в историю Срединного Государства. От мифических императоров до экономической сверхдержавы XXI века.',
    level: 'Для всех',
    duration: '3 месяца',
    price: '19 990 ₽',
    image: 'https://images.unsplash.com/photo-1508807526345-830672d7f74c?q=80&w=2000&auto=format&fit=crop', // Dramatic museum lighting
    accentColor: 'red',
    stats: { students: 0, rating: 5.0, hours: 45 },
    teacher: { name: 'Кафедра Востоковедения', role: 'Приглашенные лекторы', bio: 'Курс ведут лучшие историки-китаисты.', images: [] },
    syllabus: [],
    fullCurriculum: []
  },
  {
    id: 'history-middle-east',
    title: 'История Ближнего Востока',
    subtitle: 'Факультатив: Колыбель',
    description: 'От Шумера до Арабской весны. Понимаем корни современных конфликтов и величие исчезнувших империй.',
    level: 'Для всех',
    duration: '3 месяца',
    price: '19 990 ₽',
    image: 'https://images.unsplash.com/photo-1523821741486-1e58f09231a8?q=80&w=2000&auto=format&fit=crop', // Ancient ruins, moody
    accentColor: 'orange',
    stats: { students: 0, rating: 4.9, hours: 40 },
    teacher: { name: 'Кафедра Истории', role: 'Эксперты региона', bio: 'Историки и политологи.', images: [] },
    syllabus: [],
    fullCurriculum: []
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: "Анастасия",
    role: "Студентка",
    text: "Иван и Кирилл объясняют китайский так, что иероглифы перестают быть страшными картинками и обретают логику. Лучшая школа!",
    avatar: ""
  },
  {
    id: 2,
    name: "Михаил",
    role: "Историк",
    text: "Курс по истории Ближнего Востока открыл мне глаза на многие современные новости. Глубокий, аналитический подход.",
    avatar: ""
  },
  {
    id: 3,
    name: "Елена",
    role: "Бизнес-ассистент",
    text: "Английский с Романом — это разрыв шаблонов. Наконец-то я заговорила свободно, а не заученными фразами из учебников.",
    avatar: ""
  }
];
