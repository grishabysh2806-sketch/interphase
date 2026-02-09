import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BrickWall, 
  Ruler, 
  Truck, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Plus,
  Minus,
  FileCheck,
  HardHat,
  Users,
  Star,
  Quote,
  Percent,
  Gift,
  Zap
} from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

const HomePage: React.FC = () => {
  const { openCallModal } = useModal();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(10 * 60 * 1000);

  useEffect(() => {
    const cookieName = 'promoTimerEnd';
    const cookies = document.cookie.split('; ').reduce<Record<string, string>>((acc, cur) => {
      const [key, value] = cur.split('=');
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    const storedEnd = cookies[cookieName] ? parseInt(cookies[cookieName], 10) : null;
    const now = Date.now();
    const endTime = Number.isFinite(storedEnd as number) ? (storedEnd as number) : now + 10 * 60 * 1000;

    if (!storedEnd || !Number.isFinite(storedEnd)) {
      const expires = new Date(endTime);
      document.cookie = `${cookieName}=${endTime}; path=/; expires=${expires.toUTCString()}`;
    }

    setTimeLeft(endTime > now ? endTime - now : 0);

    const interval = setInterval(() => {
      const currentNow = Date.now();
      const diff = endTime - currentNow;
      setTimeLeft(diff > 0 ? diff : 0);
      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  const milliseconds = timeLeft % 1000;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;

  const services = [
    {
      icon: <BrickWall className="w-12 h-12 text-construction-yellow" />,
      title: "Строительство домов",
      description: "Возведение частных домов из кирпича, газоблока и монолита под ключ.",
      badge: "Проект в подарок"
    },
    {
      icon: <Wrench className="w-12 h-12 text-construction-yellow" />,
      title: "Капитальный ремонт",
      description: "Полная реконструкция помещений, замена коммуникаций и перепланировка.",
      badge: "-10% на работы"
    },
    {
      icon: <Ruler className="w-12 h-12 text-construction-yellow" />,
      title: "Проектирование",
      description: "Разработка архитектурных и инженерных проектов любой сложности.",
      badge: "Смета бесплатно"
    },
    {
      icon: <Truck className="w-12 h-12 text-construction-yellow" />,
      title: "Снабжение",
      description: "Доставка качественных стройматериалов напрямую от производителей.",
      badge: "Оптовые цены"
    }
  ];

  const processSteps = [
    {
        icon: <FileCheck className="w-8 h-8 text-construction-black" />,
        title: "Заявка = Скидка",
        desc: "Вы оставляете заявку сейчас - мы фиксируем скидку 10% на работы."
    },
    {
        icon: <Ruler className="w-8 h-8 text-construction-black" />,
        title: "Бесплатный замер",
        desc: "Инженер приезжает на объект. Выезд, замер и смета — 0 рублей."
    },
    {
        icon: <CheckCircle2 className="w-8 h-8 text-construction-black" />,
        title: "Договор и цена",
        desc: "Фиксируем стоимость. Если материалы подорожают — это наши проблемы."
    },
    {
        icon: <HardHat className="w-8 h-8 text-construction-black" />,
        title: "Строительство",
        desc: "Закупка по оптовым ценам. Фотоотчеты каждый день в WhatsApp."
    },
    {
        icon: <Gift className="w-8 h-8 text-construction-yellow animate-bounce" />,
        title: "Сдача + Подарок",
        desc: "Финальная уборка, подписание актов и страховка объекта в подарок."
    }
  ];

  const specialOffers = [
    {
        title: "Проект дома бесплатно",
        subtitle: "Экономия до 50 000 ₽",
        desc: "При заключении договора на строительство 'под ключ' до конца месяца. Вы платите только за материалы и работу.",
        icon: <FileCheck className="w-12 h-12 text-construction-black" />,
        bg: "bg-construction-yellow",
        textColor: "text-construction-black",
        btnStyle: "bg-black text-white hover:bg-gray-800"
    },
    {
        title: "Фиксация зимних цен",
        subtitle: "Заморозьте цены 2024",
        desc: "Заключите договор сейчас, а стройтесь весной. Мы закупим материалы по старым ценам и будем хранить их бесплатно.",
        icon: <Percent className="w-12 h-12 text-construction-yellow" />,
        bg: "bg-construction-black",
        textColor: "text-white",
        btnStyle: "bg-construction-yellow text-black hover:bg-yellow-400"
    },
    {
        title: "Материалы по опту",
        subtitle: "Скидки до 20%",
        desc: "Благодаря прямым контрактам с заводами, мы отдаем материалы нашим клиентам без магазинной наценки.",
        icon: <Truck className="w-12 h-12 text-construction-yellow" />,
        bg: "bg-stone-800",
        textColor: "text-white",
        btnStyle: "border-2 border-construction-yellow text-white hover:bg-white/10"
    }
  ];

  const reviews = [
    {
        name: "Михаил В.",
        project: "Коттедж 250м²",
        text: "Очень переживал за бюджет, но благодаря акции 'Зимняя фиксация' сэкономил около 400 тысяч на подорожании арматуры. Смета не выросла ни на рубль!"
    },
    {
        name: "Елена С.",
        project: "Ремонт таунхауса",
        text: "Заказывали ремонт под ключ. Дизайн-проект нам подарили! Это было очень приятно и выгодно. Качество работ отличное."
    }
  ];

  const faqs = [
    {
        question: "Как получить максимальную скидку?",
        answer: "Оставьте заявку через сайт (скидка 10%) и запишитесь на замер на ближайшие 3 дня. При заключении договора в день замера мы дарим дополнительные бонусы."
    },
    {
        question: "Правда ли, что смета не вырастет?",
        answer: "Абсолютно. Мы фиксируем цены в договоре. Все риски инфляции и подорожания материалов мы берем на себя."
    },
    {
        question: "Какие подарки вы даете при сдаче объекта?",
        answer: "В зависимости от суммы договора это может быть: страховка недвижимости, профессиональный клининг, комплект видеонаблюдения или ландшафтный дизайн-проект."
    },
    {
        question: "Можно ли сэкономить на материалах?",
        answer: "Да! Мы закупаем материалы напрямую с заводов крупным оптом. Для наших клиентов цены ниже рыночных на 15-20%."
    },
    {
        question: "Есть ли рассрочка?",
        answer: "Мы работаем с поэтапной оплатой. Вы не платите всю сумму сразу, а оплачиваете работы частями по факту их выполнения."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <div className="fixed bottom-4 right-4 z-50 group cursor-pointer">
        <div className="inline-flex items-baseline gap-3 bg-red-600/95 px-5 py-2 rounded-full border border-red-400 shadow-xl animate-pulse text-white transition-opacity duration-300 group-hover:opacity-0">
          <Clock className="w-4 h-4 text-white" />
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-red-100">До конца акции осталось</span>
            <span className="font-mono text-xl">{formattedTime}</span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden bg-construction-black">
        {/* Floating Discount Stickers */}
        <div className="absolute top-24 right-[10%] z-20 hidden lg:block animate-float">
            <div className="bg-construction-yellow text-black font-black text-xl px-6 py-4 rounded shadow-[0_0_20px_rgba(255,184,0,0.5)] rotate-6 border-4 border-white dashed transform hover:scale-110 transition-transform">
                СКИДКА -15% <br/><span className="text-sm font-medium">до конца недели</span>
            </div>
        </div>
        <div className="absolute bottom-16 left-[5%] z-20 hidden lg:block animate-float" style={{animationDelay: '1.5s'}}>
            <div className="bg-white text-black font-semibold text-sm px-4 py-2 rounded-full shadow-md -rotate-3 flex items-center gap-1 border border-construction-yellow/80">
                <Gift className="w-4 h-4 text-construction-yellow" />
                Проект в подарок
            </div>
        </div>

        <div className="absolute inset-0 z-0">
            <img 
                src="/hero-building.jpg" 
                alt="Construction Site" 
                className="w-full h-full object-cover opacity-40 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-construction-black via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-construction-black via-transparent to-transparent opacity-80"></div>
        </div>
        
        <div className="relative z-10 px-4 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 border border-construction-yellow text-construction-yellow font-bold text-sm tracking-widest uppercase bg-black/60 backdrop-blur-md rounded-full animate-pulse">
               <Zap className="w-4 h-4 fill-construction-yellow" />
               Сезонное предложение
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              СТРОИМ БЕЗ <br/>
              <span className="text-construction-yellow underline decoration-white/20 decoration-4 underline-offset-8">
                ПЕРЕПЛАТ
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-xl leading-relaxed">
              Успейте зафиксировать цены 2024 года! Гарантия 5 лет, оплата по факту, проект в подарок.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                  to="/estimator" 
                  className="bg-construction-yellow text-black font-bold text-lg px-8 py-4 rounded hover:bg-yellow-400 transition-all transform hover:-translate-y-1 shadow-[0_0_25px_rgba(255,184,0,0.4)] flex items-center justify-center gap-2 animate-pulse-slow"
              >
                <Percent className="w-5 h-5" />
                Рассчитать со скидкой
              </Link>
              <button 
                  onClick={openCallModal}
                  className="border-2 border-white text-white font-bold text-lg px-8 py-4 rounded hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 text-center"
              >
                Получить подарок
              </button>
            </div>
          </div>
          
          {/* Hero Lead Magnet */}
          <div className="hidden md:block bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-2xl relative">
             <div className="absolute -top-6 -right-6">
                <div className="w-24 h-24 bg-construction-yellow rounded-full flex items-center justify-center font-black text-2xl animate-wiggle shadow-lg border-4 border-white text-construction-black transform rotate-12">
                    SALE
                </div>
             </div>
             <h3 className="text-white text-2xl font-bold mb-4">Ваша выгода сегодня:</h3>
             <ul className="text-gray-300 space-y-4 mb-8">
                <li className="flex items-center gap-3 text-lg text-white font-medium">
                    <div className="bg-construction-yellow/20 p-1 rounded-full"><CheckCircle2 className="text-construction-yellow w-5 h-5"/></div>
                    Выезд инженера — 0 ₽
                </li>
                <li className="flex items-center gap-3 text-lg text-white font-medium">
                    <div className="bg-construction-yellow/20 p-1 rounded-full"><CheckCircle2 className="text-construction-yellow w-5 h-5"/></div>
                    Смета за 24 часа — 0 ₽
                </li>
                <li className="flex items-center gap-3 text-lg text-white font-medium">
                    <div className="bg-construction-yellow/20 p-1 rounded-full"><CheckCircle2 className="text-construction-yellow w-5 h-5"/></div>
                    Скидка 10% при заказе с сайта
                </li>
             </ul>
             <Link to="/estimator" className="w-full block bg-white text-construction-black font-black text-center py-4 rounded hover:bg-gray-100 transition-colors shadow-lg uppercase tracking-wide text-lg">
                Забрать выгоду
             </Link>
          </div>
        </div>
      </section>

      {/* Construction Tape under Hero */}
      <div className="h-4 w-full bg-stripe-pattern animate-tape"></div>

      {/* Stats Stripe */}
      <div className="bg-construction-yellow py-12 relative">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center relative">
                <div className="text-5xl font-black text-construction-black mb-1 animate-pulse">0 ₽</div>
                <div className="text-sm font-bold uppercase tracking-wide opacity-80">Предоплата за работы</div>
            </div>
            <div className="text-center border-l border-black/10">
                <div className="text-5xl font-black text-construction-black mb-1">350+</div>
                <div className="text-sm font-bold uppercase tracking-wide opacity-80">Сданных объектов</div>
            </div>
            <div className="text-center border-l border-black/10">
                <div className="text-5xl font-black text-construction-black mb-1">-20%</div>
                <div className="text-sm font-bold uppercase tracking-wide opacity-80">На материалах</div>
            </div>
            <div className="text-center border-l border-black/10">
                <div className="text-5xl font-black text-construction-black mb-1">5 лет</div>
                <div className="text-sm font-bold uppercase tracking-wide opacity-80">Гарантии по договору</div>
            </div>
        </div>
      </div>

      {/* Services Section with Badges */}
      <section className="py-20 bg-stone-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-construction-black mb-4">Наши услуги + Бонусы</h2>
            <div className="w-24 h-1 bg-construction-yellow mx-auto"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Заказывая любую услугу сейчас, вы получаете гарантированный подарок или скидку.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-construction-yellow group relative overflow-hidden flex flex-col transform hover:-translate-y-2">
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-construction-black text-construction-yellow text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-sm animate-pulse-slow">
                    {service.badge}
                </div>

                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed flex-grow">{service.description}</p>
                
                {/* DISCOUNT BUTTON */}
                <button 
                    onClick={openCallModal}
                    className="w-full bg-construction-black text-construction-yellow font-bold py-3 rounded-md shadow-md hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all mb-4 flex items-center justify-center gap-2 group-hover:animate-pulse"
                >
                    <Zap className="w-4 h-4 fill-construction-yellow" />
                    Скидка 10% при заказе сегодня!
                </button>

                <button onClick={openCallModal} className="text-construction-black font-bold uppercase text-sm tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all hover:text-construction-yellow mt-auto justify-center">
                  Рассчитать с бонусом <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section (Replaces Team) */}
      <section className="py-24 bg-construction-dark relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-10" 
             style={{backgroundImage: "radial-gradient(#FFB800 1px, transparent 1px)", backgroundSize: "30px 30px"}}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
             <div className="text-center mb-16">
                <div className="inline-block bg-construction-yellow text-black font-bold px-4 py-1 rounded mb-4 animate-bounce">
                    Внимание! Ограниченное предложение
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    АКЦИИ МЕСЯЦА
                </h2>
                <div className="w-24 h-1 bg-white mx-auto opacity-50"></div>
                <p className="mt-4 text-gray-400 text-lg">Выберите свою выгоду при заказе до конца месяца</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {specialOffers.map((offer, index) => (
                    <div key={index} className={`${offer.bg} rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 shadow-2xl relative overflow-hidden group`}>
                        {/* Decorative circle */}
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="mb-6 bg-white/10 w-20 h-20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-inner">
                                {offer.icon}
                            </div>
                            <h3 className={`text-2xl font-black mb-1 uppercase ${offer.textColor}`}>{offer.title}</h3>
                            <div className={`text-sm font-bold uppercase tracking-wider mb-4 opacity-70 ${offer.textColor}`}>{offer.subtitle}</div>
                            
                            <p className={`mb-8 text-lg opacity-90 leading-relaxed flex-grow font-medium ${offer.textColor}`}>{offer.desc}</p>
                            
                            <button 
                                onClick={openCallModal}
                                className={`w-full py-4 rounded font-bold uppercase tracking-wide shadow-lg transition-all flex items-center justify-center gap-2 ${offer.btnStyle}`}
                            >
                                Получить <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-16 bg-white/5 rounded-xl p-6 text-center border border-white/10 max-w-3xl mx-auto backdrop-blur-sm">
                 <p className="text-gray-300">
                    <span className="text-construction-yellow font-bold">*</span> Количество мест по акциям ограничено количеством свободных бригад. 
                    На текущий момент свободно только <span className="text-white font-bold underline">2 бригады</span>.
                 </p>
            </div>
        </div>
      </section>

      {/* Work Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-construction-black mb-4">Этапы работы</h2>
                <div className="w-24 h-1 bg-construction-yellow mx-auto"></div>
                <p className="mt-4 text-gray-600">5 простых шагов к вашему новому дому</p>
            </div>
            
            <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-stone-200 -z-10"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {processSteps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-24 h-24 bg-construction-yellow rounded-full flex items-center justify-center border-4 border-white shadow-xl mb-6 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                                {step.icon}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed px-2">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-12 text-center">
                <button 
                    onClick={openCallModal}
                    className="bg-construction-black text-white px-12 py-5 rounded font-bold hover:bg-gray-800 transition-all shadow-lg animate-pulse-slow hover:-translate-y-1"
                >
                    Начать и получить скидку 10%
                </button>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4">
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-block bg-white border border-gray-200 px-4 py-1 rounded-full text-sm font-bold text-construction-black mb-4 shadow-sm">
                        ⭐ Проверено клиентами
                    </div>
                    <h2 className="text-4xl font-bold text-construction-black mb-6">Реальная экономия</h2>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Мы не просто строим, мы бережем бюджет заказчика. Почитайте, сколько сэкономили наши клиенты благодаря фиксации цен и оптовым закупкам.
                    </p>
                    <div className="flex gap-4">
                        <div className="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-md border-b-4 border-construction-yellow">
                            <Star className="text-yellow-400 fill-yellow-400 w-8 h-8" />
                            <div>
                                <div className="font-black text-xl">4.9</div>
                                <div className="text-gray-500 text-xs">Рейтинг</div>
                            </div>
                        </div>
                        <div className="bg-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-md border-b-4 border-construction-black">
                            <Users className="text-construction-black w-8 h-8" />
                            <div>
                                <div className="font-black text-xl">150+</div>
                                <div className="text-gray-500 text-xs">Счастливых семей</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="space-y-6">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl relative shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                            <Quote className="absolute top-6 right-6 text-construction-yellow opacity-30 w-12 h-12" />
                            <p className="text-gray-700 italic mb-6 leading-relaxed text-lg">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-construction-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <p className="text-sm text-construction-yellow font-bold">{review.project}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="text-center md:text-left">
                        <button onClick={openCallModal} className="text-construction-black font-bold hover:text-construction-yellow transition-colors flex items-center gap-2 underline decoration-2 underline-offset-4">
                             Хочу сэкономить так же <ArrowRight className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
             </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-construction-black mb-4">Вопросы о выгоде</h2>
                <div className="w-24 h-1 bg-construction-yellow mx-auto"></div>
            </div>
            
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-stone-50 border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                        <button 
                            onClick={() => toggleFaq(index)}
                            className="w-full flex justify-between items-center p-6 bg-stone-50 hover:bg-stone-100 transition-colors text-left focus:outline-none"
                        >
                            <span className="font-bold text-lg text-gray-800 pr-8">{faq.question}</span>
                            {openFaqIndex === index ? (
                                <Minus className="w-6 h-6 text-construction-yellow flex-shrink-0" />
                            ) : (
                                <Plus className="w-6 h-6 text-construction-yellow flex-shrink-0" />
                            )}
                        </button>
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="p-6 pt-0 text-gray-600 bg-stone-50 border-t border-gray-200 leading-relaxed text-lg">
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-stone-100 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 relative z-10">
             <div className="bg-gradient-to-br from-construction-yellow to-yellow-500 rounded-3xl p-12 md:p-20 shadow-2xl relative overflow-hidden text-center transform hover:scale-[1.01] transition-transform duration-500">
                 {/* Decorative background shapes */}
                 <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-20 transform translate-x-1/2 -translate-y-1/2 rotate-45 animate-float"></div>
                 <div className="absolute bottom-0 left-0 w-80 h-80 bg-black opacity-10 transform -translate-x-1/2 translate-y-1/2 rotate-45"></div>

                 <h2 className="text-4xl md:text-6xl font-black text-construction-black mb-6 relative z-10 leading-none">
                    ХВАТИТ ЖДАТЬ <br/> ПОВЫШЕНИЯ ЦЕН!
                 </h2>
                 <p className="text-xl text-black/80 mb-10 max-w-2xl mx-auto relative z-10 font-bold">
                    Рассчитайте смету прямо сейчас и зафиксируйте текущую стоимость материалов на 6 месяцев.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                    <Link to="/estimator" className="bg-construction-black text-white px-10 py-5 rounded-lg font-bold hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-1 text-lg">
                        Рассчитать стоимость
                    </Link>
                    <button 
                        onClick={openCallModal}
                        className="bg-white text-construction-black px-10 py-5 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
                    >
                        <Zap className="w-6 h-6 text-construction-yellow" />
                        Забрать скидку
                    </button>
                 </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
