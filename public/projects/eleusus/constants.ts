import { Language, PricingTier, FAQItem, LegalSection, Tournament, GearItem } from './types';

interface TranslationData {
  nav: { [key: string]: string };
  hero: { title: string; subtitle: string; cta: string };
  pricing: { title: string; subtitle: string; whyExpensive: string; whyExpensiveDesc: string; paymentMethods: string };
  legal: { title: string; sections: LegalSection[] };
  faq: { title: string; items: FAQItem[] };
  home: {
    arsenalTitle: string;
    arsenal: GearItem[];
    tournamentsTitle: string;
    tournaments: Tournament[];
    membershipTitle: string;
    membershipCta: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationData> = {
  [Language.EN]: {
    nav: {
      work: 'ZONES',
      pricing: 'RATES',
      legal: 'RULES',
      faq: 'FAQ',
      contact: 'BOOK STATION'
    },
    hero: {
      title: 'PROJECT ELEUSIS',
      subtitle: 'THE ULTIMATE GAMING SANCTUARY. IMMERSE YOURSELF.',
      cta: 'JOIN THE LOBBY'
    },
    pricing: {
      title: 'ACCESS PROTOCOLS',
      subtitle: 'Pay for performance. Dominate the server.',
      whyExpensive: 'Why choose Eleusis?',
      whyExpensiveDesc: 'We do not compromise. 540Hz Monitors, RTX 4090s in every rig, and fiber-optic latency that defies physics. You aren\'t just playing; you are interfacing.',
      paymentMethods: 'ACCEPTED: CARDS, CASH, CRYPTO, SKINS',
    },
    legal: {
      title: 'CLUB MAINFRAME RULES',
      sections: [
        {
          title: '01 // CONDUCT & ETIQUETTE',
          content: [
            'Toxic behavior is grounds for immediate expulsion. Respect other players.',
            'Do not rage-smash peripherals. You break it, you buy it (at 200% markup).',
            'No shouting after 22:00. Maintain the focus of the hive mind.',
            'Smoking/Vaping is only permitted in the designated air-lock zone.'
          ]
        },
        {
          title: '02 // ACCOUNT SECURITY',
          content: [
            'Log out of Steam, Discord, and Battlenet before ending your session.',
            'We use Deep Freeze, so PCs wipe on restart, but do not rely on it.',
            'Do not install unauthorized software or cheats. VAC bans on our IPs = Lifetime Ban.'
          ]
        },
        {
          title: '03 // FOOD & DRINK',
          content: [
            'Only food purchased at the bar is allowed at the stations.',
            'Do not place drinks directly on the mousepads.',
            'Wash your hands before touching the white peripherals. We are watching.'
          ]
        }
      ]
    },
    faq: {
      title: 'KNOWLEDGE BASE',
      items: [
        {
          q: "Can I bring my own peripherals?",
          a: "Affirmative. Our ports are open. Just don't install drivers that require a restart without asking admin."
        },
        {
          q: "What games are pre-installed?",
          a: "Everything. CS2, Dota 2, Valorant, Apex, Warzone, LoL, PUBG, Overwatch 2, and single-player hits like Cyberpunk 2077."
        },
        {
          q: "Do you have accounts?",
          a: "We provide club accounts for most paid games, but for ranked play, we strongly suggest using your own."
        },
        {
          q: "Can I book a PC for a week?",
          a: "Yes. Ask about our 'Bootcamp Protocols' for team discounts and long-term lock-ins."
        },
        {
          q: "Is there a VIP room?",
          a: "Yes. Soundproof, private AC, PS5 access, and dedicated waiter service."
        }
      ]
    },
    home: {
      arsenalTitle: 'HARDWARE ARSENAL',
      arsenal: [
        { name: 'ASUS ROG SWIFT', type: 'DISPLAY', specs: '540Hz / 0.2ms / TN Panel' },
        { name: 'RTX 4090 OC', type: 'GPU', specs: '24GB VRAM / DLSS 3.5' },
        { name: 'WOOTING 60HE', type: 'INPUT', specs: 'Rapid Trigger / Analog Switches' },
        { name: 'LOGITECH G PRO X2', type: 'AUDIO', specs: 'Graphene Drivers / Wireless' }
      ],
      tournamentsTitle: 'WAR ZONE SCHEDULE',
      tournaments: [
        { game: 'COUNTER-STRIKE 2', date: 'EVERY FRIDAY 18:00', prize: '$500 + SKINS', status: 'REG OPEN' },
        { game: 'DOTA 2 5v5', date: 'LAST SUNDAY/MONTH', prize: '$1000 POOL', status: 'PREPARING' },
        { game: 'VALORANT', date: 'WEDNESDAYS', prize: 'MVP AWARDS', status: 'ONGOING' }
      ],
      membershipTitle: 'BECOME AN OPERATOR',
      membershipCta: 'INITIATE TIER 1'
    }
  },
  [Language.RU]: {
    nav: {
      work: 'ЗОНЫ',
      pricing: 'ТАРИФЫ',
      legal: 'ПРАВИЛА',
      faq: 'ВОПРОСЫ',
      contact: 'ЗАБРОНИРОВАТЬ'
    },
    hero: {
      title: 'ПРОЕКТ ЭЛЕВСИН',
      subtitle: 'КИБЕРСПОРТИВНОЕ СВЯТИЛИЩЕ. ПОГРУЖЕНИЕ НЕИЗБЕЖНО.',
      cta: 'ВОЙТИ В ЛОББИ'
    },
    pricing: {
      title: 'ПРОТОКОЛЫ ДОСТУПА',
      subtitle: 'Плати за скорость. Доминируй на сервере.',
      whyExpensive: 'Почему Элевсин?',
      whyExpensiveDesc: 'Мы не идем на компромиссы. Мониторы 540Гц, RTX 4090 в каждой сборке и оптоволокно, нарушающее законы физики. Вы не просто играете, вы подключаетесь к матрице.',
      paymentMethods: 'ПРИНИМАЕМ: КАРТЫ, НАЛИЧНЫЕ, КРИПТУ, СКИНЫ',
    },
    legal: {
      title: 'ПРАВИЛА СИСТЕМЫ',
      sections: [
        {
          title: '01 // ПОВЕДЕНИЕ И ЭТИКЕТ',
          content: [
            'Токсичность наказывается баном. Уважайте других операторов.',
            'Не бейте девайсы. Сломал — купил (с наценкой 200% за моральный ущерб).',
            'Никаких криков после 22:00. Соблюдайте тишину в эфире.',
            'Вейп и курение только в шлюзовой камере (на улице).'
          ]
        },
        {
          title: '02 // БЕЗОПАСНОСТЬ АККАУНТОВ',
          content: [
            'Выходите из Steam, Discord и Battlenet перед уходом.',
            'ПК сбрасываются при перезагрузке, но лучше перестраховаться.',
            'Установка читов запрещена. VAC бан на нашем IP = Пожизненный бан в клубе.'
          ]
        },
        {
          title: '03 // ЕДА И НАПИТКИ',
          content: [
            'За игровым местом разрешена только еда из нашего бара.',
            'Не ставьте напитки на ковры.',
            'Мойте руки перед игрой на белых девайсах. Мы следим.'
          ]
        }
      ]
    },
    faq: {
      title: 'БАЗА ЗНАНИЙ',
      items: [
        {
          q: "Можно со своими девайсами?",
          a: "Так точно. Порты открыты. Главное не ставьте софт, требующий перезагрузки, без админа."
        },
        {
          q: "Какие игры установлены?",
          a: "Все актуальные. CS2, Dota 2, Valorant, Apex, Warzone, LoL, PUBG, Overwatch 2 и синглы вроде Cyberpunk."
        },
        {
          q: "Есть клубные аккаунты?",
          a: "Да, для большинства платных игр есть клубные акки. Но для рейтинга лучше свой."
        },
        {
          q: "Можно забронировать на неделю?",
          a: "Да. Спросите про 'Буткемп Пакеты' для командных скидок."
        },
        {
          q: "Что в VIP комнате?",
          a: "Шумоизоляция, отдельный климат-контроль, PS5, диван и кнопка вызова официанта."
        }
      ]
    },
    home: {
      arsenalTitle: 'АРСЕНАЛ ОБОРУДОВАНИЯ',
      arsenal: [
        { name: 'ASUS ROG SWIFT', type: 'DISPLAY', specs: '540Hz / 0.2ms / TN Panel' },
        { name: 'RTX 4090 OC', type: 'GPU', specs: '24GB VRAM / DLSS 3.5' },
        { name: 'WOOTING 60HE', type: 'INPUT', specs: 'Rapid Trigger / Analog Switches' },
        { name: 'LOGITECH G PRO X2', type: 'AUDIO', specs: 'Graphene Drivers / Wireless' }
      ],
      tournamentsTitle: 'РАСПИСАНИЕ БИТВ',
      tournaments: [
        { game: 'COUNTER-STRIKE 2', date: 'КАЖДУЮ ПЯТНИЦУ 18:00', prize: '50.000₽ + СКИНЫ', status: 'РЕГ ОТКРЫТА' },
        { game: 'DOTA 2 5v5', date: 'ПОСЛЕДНЕЕ ВС МЕСЯЦА', prize: '100.000₽ ПРИЗОВОЙ', status: 'ПОДГОТОВКА' },
        { game: 'VALORANT', date: 'ПО СРЕДАМ', prize: 'MVP НАГРАДЫ', status: 'ИДЕТ' }
      ],
      membershipTitle: 'СТАНЬ ОПЕРАТОРОМ',
      membershipCta: 'АКТИВИРОВАТЬ TIER 1'
    }
  }
};

export const MOCK_PRICING: PricingTier[] = [
  {
    name: 'STANDARD',
    price: '$5 / 300₽ HOUR',
    description: 'Casual gaming in the main hall.',
    features: ['RTX 3070 Ti', '240Hz Monitors', 'Logitech G Peripherals', 'Comfortable Seating', 'Food & Drink Service']
  },
  {
    name: 'VIP BOOTCAMP',
    price: '$10 / 800₽ HOUR',
    description: 'Private soundproof room for squads.',
    features: ['RTX 4080 Super', '360Hz Zowie Monitors', 'Custom Mechanical Keyboards', 'Herman Miller Chairs', 'Private AC Control']
  },
  {
    name: 'GODLIKE',
    price: '$20 / 1500₽ HOUR',
    description: 'The absolute peak of computing power.',
    features: ['RTX 4090 OC', '540Hz ASUS PG248QP', 'Fiber 10Gbps Uplink', 'Stream Deck & Shure Mic', 'Personal Butler']
  }
];
