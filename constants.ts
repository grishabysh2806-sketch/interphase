
import { ContentDictionary, Language } from './types';

export const CONTENT: Record<Language, ContentDictionary> = {
  en: {
    nav: [
      { id: 'home', label: 'Home', path: '/' },
      { id: 'services', label: 'Services', path: '/services' },
      { id: 'portfolio', label: 'Work', path: '/portfolio' },
      { id: 'blog', label: 'Blog', path: '/blog' },
      { id: 'contact', label: 'Contact', path: '/contact' },
    ],
    ui: {
      viewDetails: "View Details",
      systemModule: "System Module",
      backToServices: "Back to Services",
      backToJournal: "Back to Blog",
      readyToStart: "Ready to start?",
      share: "Share",
      readMore: "Read More",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      initializing: "System Initializing...",
      systemLog: "system_log.txt",
      endOfBuffer: "-- END OF BUFFER --",
      readOnly: "READ-ONLY",
      notFound: "Service not found",
      goHome: "Go Home",
      articleNotFound: "Article not found",
    },
    hero: {
      title: "Interphase: New Digital Reality.",
      subtitle: "We are a full-cycle agency merging high-end aesthetics, hand-crafted code, and data intelligence to create stylish, high-converting products for the next generation of brands.",
      cta: "Explore Our Work",
    },
    about: {
      title: "Let's Get Acquainted",
      subtitle: "WHO WE ARE",
      description1: "Interphase is a full-cycle agency offering a complete spectrum of services in web design, custom development, and data analytics. From brand naming and logo development to creating imagery and advertising materials.",
      description2: "We strictly reject site builders. We don't just design; we create stylish, selling products using clean code. We guide you from concept development to deployment, building bespoke digital assets tailored to your business DNA.",
      cta: "View Our Services",
      whyChooseUs: {
        title: "Why Choose Us?",
        items: [
          { title: "Full-Cycle Agency", description: "Comprehensive coverage from brand naming to deployment and support." },
          { title: "Hand-Coded Solutions", description: "Zero site builders. We deliver pure performance and unlimited scalability." },
          { title: "Data-Driven Strategy", description: "Strategic decisions backed by neural forecasting and market analysis." },
          { title: "High-Converting Design", description: "Avant-garde aesthetics engineered to drive real business results." }
        ]
      }
    },
    process: {
      title: "How We Work",
      subtitle: "THE PROCESS",
      steps: [
        { number: "01", title: "Discovery", description: "We dive deep into your business model, goals, and audience to build a solid strategic foundation." },
        { number: "02", title: "Architecture", description: "Developing the structural logic, user flows, and technical specifications for the project." },
        { number: "03", title: "Design", description: "Crafting the visual language. High-fidelity UI, motion design, and interactive prototypes." },
        { number: "04", title: "Development", description: "Writing clean, scalable code from scratch. No templates, no builders. Integrating APIs and databases." },
        { number: "05", title: "Launch", description: "Final testing, deployment to production servers, and post-launch monitoring." }
      ],
      paymentTitle: "Payment & Terms",
      paymentDescription: "We operate on a transparent milestone basis. Typically, this involves a 50% deposit to initiate the neural engines and resources, with the remaining 50% due upon successful project deployment and acceptance. We accept Bank Transfer (SWIFT/SEPA) and major Cryptocurrencies.",
      testimonialsTitle: "Client Logs",
      testimonialsSubtitle: "FEEDBACK",
      testimonials: [
        { id: 't1', text: "Interphase understood the gaming aesthetic instantly. The tournament platform they built handles high traffic effortlessly and looks incredible.", author: "Alexey", role: "Founder", company: "ELEUSIS" },
        { id: 't2', text: "Our digital magazine required a unique visual language. Interphase delivered a masterpiece that serves as a canvas for our content.", author: "Elena", role: "Editor-in-Chief", company: "Monday Magazine" },
        { id: 't4', text: "We needed a site that conveys trust. The result exceeded our expectations, and our lead generation has doubled.", author: "Dmitry", role: "CEO", company: "StroyMaster Pro" }
      ],
      ctaTitle: "See the results of our methodology.",
      ctaButton: "View Case Studies"
    },
    services: {
      title: "Our Expertise",
      subtitle: "FULL-CYCLE SERVICES",
      items: [
        { 
          id: 'ui-ux',
          number: '01', 
          title: 'UI/UX Design', 
          shortDescription: 'Immersive, user-centric interfaces that blend aesthetics with functionality.', 
          longDescription: 'We design digital experiences that captivate and convert. Our process involves deep user research, wireframing, and high-fidelity prototyping to ensure every interaction is intuitive and visually stunning. We have an individual approach to each client, all conditions are specifically discussed at the brief.',
          features: ['User Research & Personas', 'Wireframing & Prototyping', 'Design Systems', 'Interaction Design'],
          cta: 'Start Designing',
          faq: [
            { question: "Do you start with a prototype?", answer: "Yes, we always begin with wireframes and interactive prototypes to validate logic before applying visual styling." },
            { question: "What tools do you use?", answer: "We primarily work in Figma for design and prototyping, utilizing the latest plugins and auto-layout features." },
            { question: "Can you redesign an existing app?", answer: "Absolutely. We can audit your current interface and propose a modernization strategy." },
            { question: "Do you provide a design system?", answer: "Yes, we deliver a modular design system ensuring consistency across all future updates." },
            { question: "How many revisions are included?", answer: "We typically include 2-3 rounds of iterations per stage to ensure the vision aligns perfectly." }
          ]
        },
        { 
          id: 'web-dev',
          number: '02', 
          title: 'Web Development', 
          shortDescription: 'From landing pages to multi-page platforms. 100% Hand-coded, no site builders.', 
          longDescription: 'We strictly avoid site builders like Wix or Tilda. We build scalable, high-performance web solutions tailored to your business needs using pure code. Whether it is a single-page landing site or a massive enterprise portal, our code is clean, secure, and future-proof. We have an individual approach to each client, all conditions are specifically discussed at the brief.',
          features: ['Zero Site Builders (Pure Code)', 'Landing Pages & Promo Sites', 'Multi-page Corporate Sites', 'React & Next.js Architecture'],
          cta: 'Build Your Platform',
          faq: [
            { question: "Do you use Tilda or Wix?", answer: "No. We write custom code (HTML/CSS/JS/React) to ensure maximum performance, design freedom, and ownership." },
            { question: "Which tech stack do you use?", answer: "We specialize in the React ecosystem (Next.js) with TypeScript, Node.js, and modern cloud infrastructure." },
            { question: "Is the code SEO friendly?", answer: "Yes, we use Server-Side Rendering (SSR) and semantic HTML to ensure maximum search engine visibility." },
            { question: "Do you provide hosting?", answer: "We help set up cloud hosting (AWS, Vercel, DigitalOcean) but the accounts remain yours." },
            { question: "Can it handle high traffic?", answer: "Yes, because we code from scratch, we design scalable architectures capable of handling sudden spikes in user load." }
          ]
        },
        { 
          id: 'telegram-ecosystem',
          number: '03', 
          title: 'Telegram Ecosystem', 
          shortDescription: 'Full-fledged web apps and bots running directly inside Telegram.', 
          longDescription: 'Leverage the power of 800M+ users. We design and develop seamless Telegram Mini Apps (TMA) and advanced bots that function as complete products within the messenger interface. We have an individual approach to each client, all conditions are specifically discussed at the brief.',
          features: ['Telegram Mini Apps (TMA)', 'Seamless Login Integration', 'TON Wallet Connection', 'Interactive Bot Mechanics'],
          cta: 'Launch Mini App',
          faq: [
            { question: "What is a Telegram Mini App?", answer: "It is a web application that runs inside Telegram, looking and feeling like a native interface." },
            { question: "Can we accept payments?", answer: "Yes, we can integrate Stripe, Telegram Stars, or TON crypto payments directly." },
            { question: "Do users need to login?", answer: "No, authentication is seamless via their Telegram account ID." },
            { question: "Is it slower than a website?", answer: "No, Mini Apps are highly optimized and load instantly within the messenger." },
            { question: "Can it send push notifications?", answer: "The accompanying bot can send unlimited notifications to users who have interacted with the app." }
          ]
        },
        { 
          id: 'mobile-app',
          number: '04', 
          title: 'Mobile Applications', 
          shortDescription: 'Native and cross-platform mobile solutions for iOS and Android.', 
          longDescription: 'We create mobile applications that provide a native feel and high performance. Whether using React Native or native technologies, we ensure your app stands out in the App Store and Google Play. We have an individual approach to each client, all conditions are specifically discussed at the brief.',
          features: ['iOS & Android Development', 'React Native Solutions', 'App Store Optimization', 'Offline Functionality'],
          cta: 'Develop Mobile App',
          faq: [
            { question: "Native or Cross-platform?", answer: "We recommend React Native for 90% of business cases as it saves time and budget while maintaining native performance." },
            { question: "Do you handle App Store submission?", answer: "Yes, we handle the entire review and publication process for Apple and Google stores." },
            { question: "How do updates work?", answer: "We can push over-the-air updates for minor changes, or release version updates for major features." },
            { question: "Does it work offline?", answer: "Yes, we implement local caching and databases to ensure functionality without internet." },
            { question: "How long does development take?", answer: "A typical MVP mobile app takes 3-5 months from concept to launch." }
          ]
        },
        { 
          id: 'brand-identity',
          number: '05', 
          title: 'Brand Identity', 
          shortDescription: 'Strategic branding that defines your voice in the market.', 
          longDescription: 'A brand is more than a logo. We build comprehensive visual identity systems, including typography, color palettes, and tone of voice, to create a cohesive and memorable brand presence. We have an individual approach to each client, all conditions are specifically discussed at the brief.',
          features: ['Logo Design', 'Visual Identity Systems', 'Brand Guidelines', 'Marketing Collateral'],
          cta: 'Define Your Brand',
          faq: [
            { question: "What do I get at the end?", answer: "You receive a comprehensive Brand Book containing logo files, color codes, typography rules, and usage examples." },
            { question: "Сколько вариантов лого?", answer: "Обычно мы презентуем 3 различных концептуальных направления." },
            { question: "Do you do naming?", answer: "Yes, we can assist with naming and slogan generation based on market research." },
            { question: "Can I trademark the logo?", answer: "We create original work, but you should consult a legal expert for official trademark registration." },
            { question: "Do you design social media assets?", answer: "Yes, we can create templates for Instagram, LinkedIn, and other platforms." }
          ]
        },
        { 
          id: 'complex-integrations',
          number: '06', 
          title: 'Complex Integrations', 
          shortDescription: 'Connecting disparate systems into a unified workflow.', 
          longDescription: 'We specialize in API orchestration and connecting third-party services. Whether it is CRM, ERP, or payment gateways, we ensure your digital ecosystem flows without interruption. We have an individual approach to each client, all conditions are specifically discussed at the brief.',
          features: ['API Development', 'CRM/ERP Synchronization', 'Payment Gateway Setup', 'Cloud Infrastructure'],
          cta: 'Integrate Systems',
          faq: [
            { question: "Which CRMs do you support?", answer: "We work with Salesforce, HubSpot, Zoho, Pipedrive, and custom solutions." },
            { question: "Is the data transfer secure?", answer: "Yes, all integrations use encrypted channels and secure API authentication." },
            { question: "Can you build a custom API?", answer: "Yes, we design RESTful and GraphQL APIs to expose your data securely." },
            { question: "What if an API changes?", answer: "We build resilient middleware that can be easily updated if third-party services change." },
            { question: "Do you support legacy systems?", answer: "We can wrap legacy systems in modern API layers to make them usable with new tech." }
          ]
        },
        { 
          id: 'ai-agent',
          number: '07', 
          title: 'AI Agent Creation', 
          shortDescription: 'Autonomous assistants that work with your data, tools, and workflows.', 
          longDescription: 'We design and build AI agents that execute tasks, communicate with your stack, and deliver measurable business outcomes. From LLM orchestration to secure tool access and monitoring, we create reliable agents that operate safely and efficiently. We have an individual approach to each client, all conditions are specifically discussed at the brief.',
          features: ['LLM Strategy & Architecture', 'Tool & API Orchestration', 'Secure Data Connectors', 'Agent Monitoring & Guardrails'],
          cta: 'Launch AI Agent',
          faq: [
            { question: "Can the agent work with our internal tools?", answer: "Yes, we integrate CRMs, databases, ticketing systems, and custom APIs with secure access controls." },
            { question: "Is the agent safe for production?", answer: "We implement role-based permissions, audit logging, and safety guardrails before deployment." },
            { question: "What models do you use?", answer: "We select the best model for your use case, balancing quality, latency, and cost." },
            { question: "How do you measure performance?", answer: "We set KPIs, evaluate response quality, and continuously tune prompts and workflows." },
            { question: "Can it be multilingual?", answer: "Yes, agents can be configured for multilingual support and localized outputs." }
          ]
        },
        { 
          id: 'seo-geo',
          number: '08', 
          title: 'SEO & GEO Turnkey', 
          shortDescription: 'Search and generative visibility engineered for conversion.', 
          longDescription: 'We deliver a full-cycle visibility system: technical SEO, structured content, and GEO (Generative Engine Optimization) that positions your brand inside AI answers. We align information architecture, performance, and content strategy to grow qualified traffic and lead flow. We have an individual approach to each client, all conditions are specifically discussed at the brief.',
          features: ['Technical SEO & Core Web Vitals', 'Semantic Content Architecture', 'GEO for AI Search & Assistants', 'Analytics, Tracking & Growth'],
          cta: 'Boost Visibility',
          faq: [
            { question: "What is GEO?", answer: "GEO is optimization for AI-driven search and assistants, ensuring your brand is cited and recommended in generative responses." },
            { question: "Do you work with existing sites?", answer: "Yes, we audit your current stack and implement a prioritized roadmap without breaking live traffic." },
            { question: "How long to see results?", answer: "Early improvements can appear within weeks, with strong momentum typically in 2-4 months." },
            { question: "Will you write content?", answer: "Yes, we create or refine content based on intent mapping and semantic clusters." },
            { question: "Do you provide reporting?", answer: "We deliver transparent dashboards with traffic, rankings, and conversion metrics." }
          ]
        },
         { 
          id: 'reputation-guard',
          number: '09', 
          title: 'Reputation Guard', 
          shortDescription: 'Digital footprint management and brand protection strategies.', 
          longDescription: 'Your reputation is your currency. We implement SEO strategies and content monitoring to ensure your brand is perceived exactly how you intend across the digital landscape. We have an individual approach to each client, all conditions are specifically discussed at the brief.',
          features: ['SERP Management', 'Review Monitoring', 'Crisis Management', 'Positive Content Seeding'],
          cta: 'Protect Brand',
          faq: [
            { question: "Can you remove bad reviews?", answer: "We cannot delete legitimate reviews, but we can challenge fake ones and suppress them with positive content." },
            { question: "How fast do I see results?", answer: "SERP changes typically take 3-6 months to fully reflect in search engines." },
            { question: "Is this legal?", answer: "Yes, we use strictly white-hat SEO and PR techniques." },
            { question: "Do you monitor social media?", answer: "Yes, we track mentions of your brand across all major social platforms." },
            { question: "Is it confidential?", answer: "Absolutely. We sign strict NDAs and never disclose our reputation management clients." }
          ]
        },
      ]
    },
    portfolio: {
      title: "Selected Works",
      subtitle: "Trusted by many! From small businesses to large agencies across various industries and niches. Below you can explore demo versions of our clients' websites. Design and code are 100% developed by us.",
      outro: "Your business awaits design and code from our experts!",
      visitLink: "VISIT SITE",
      items: [
        { 
          id: '2', 
          title: 'StroyMaster Pro', 
          category: 'Construction', 
          videoDesktopUrl: '/stroymasterprodesctop.mov',
          videoMobileUrl: '/stroymasterpromob.mp4',
          description: 'Full-cycle construction and renovation services. From architectural design to turnkey delivery with fixed pricing. We were tasked with building a simple and clear functional landing page, while clearly pointing the user to discounts and special offers. The client was more than satisfied.'
        },
        { 
          id: '1', 
          title: 'ELEUSIS', 
          category: 'Gaming & Esports', 
          videoDesktopUrl: '/eleusisdesctop.mov',
          videoMobileUrl: '/eleusuismob.mp4',
          description: 'The ultimate gaming sanctuary. CS2, Dota 2, Valorant tournaments and hardware arsenal. We were tasked with making the site bright and memorable for gamers, resulting in a 29% increase in conversion.'
        },
        { 
          id: '5', 
          title: 'Fourth International', 
          category: 'Education & EdTech', 
          videoDesktopUrl: '/forthinternationaldesktop.mp4',
          videoMobileUrl: '/forthinternationalmob.mp4',
          description: 'Language school and academic community focusing on Chinese, Arabic, and English with cultural immersion. During creation, we integrated a complex system of courses, student and teacher accounts, and a payment system link. A demo version is presented on our site as an NDA was signed. The site successfully implements a complex of educational technologies.'
        },
        { 
          id: '6', 
          title: 'Monday Magazine', 
          category: 'Digital Media', 
          videoDesktopUrl: '/mondaydesctop.mp4',
          videoMobileUrl: '/mondaymob.mp4',
          description: 'A digital cultural magazine focusing on visual aesthetics and modern culture. Real-time content parsing from the database to the site was implemented. As a result - stylish work without glitches.'
        },
        { 
          id: '7', 
          title: '388.nail', 
          category: 'Beauty & Wellness', 
          videoDesktopUrl: '/388desctop.mp4',
          videoMobileUrl: '/388mob.mp4',
          description: 'A tropical paradise in the city. We created a digital experience that reflects their "mini-vacation" concept, bringing the Bali jungle vibes to the web.'
        },
      ]
    },
    homeBlog: {
      title: "Expert Articles",
      subtitle: "ANALYTICS & NEWS"
    },
    blog: {
      title: "Insights",
      subtitle: "BLOG",
      readMore: "Read Article",
      backText: "Back to Blog",
      items: [
        {
          id: 'future-of-interfaces',
          title: 'The Invisible Interface: Beyond Screens',
          excerpt: 'As we move towards spatial computing, the concept of a "page" is dying. Here is how we are designing for the era of gesture and voice.',
          date: 'OCT 12, 2023',
          readTime: '5 MIN READ',
          category: 'UX Design',
          author: 'Alex V.',
          imageUrl: 'https://picsum.photos/800/600?random=10',
          content: `
            <p>The screen has dominated our attention for decades. But the rectangle is a constraint, not a necessity. With the rise of spatial computing and advanced haptics, we are entering an era where the interface becomes invisible.</p>
            <br/>
            <h3>Context is King</h3>
            <p>In a screenless future, context is everything. Interfaces must predict intent based on environment, biometrics, and historical data. It's not about showing a button; it's about executing a task before the user even realizes they need to perform it.</p>
            <br/>
            <p>At Interphase, we are experimenting with proximity-based interactions that trigger micro-animations only when relevant. This reduces cognitive load and creates a seamless flow between the digital and physical worlds.</p>
          `
        },
        {
          id: 'brutalism-2024',
          title: 'Neo-Brutalism: Why Ugly is Selling',
          excerpt: 'Polished aesthetics are becoming invisible. Brands are turning to raw, unpolished, and high-contrast designs to stand out in the noise.',
          date: 'NOV 04, 2023',
          readTime: '4 MIN READ',
          category: 'Trends',
          author: 'Sarah K.',
          imageUrl: 'https://picsum.photos/800/600?random=11',
          content: `
            <p>Web design has become too safe. Perfect padding, rounded corners, and subtle shadows have created a sea of sameness. Neo-Brutalism is the reaction to this monotony.</p>
            <br/>
            <h3>Breaking the Grid</h3>
            <p>We are seeing a return to system fonts, high-contrast borders, and overlapping elements that defy traditional grid systems. It feels raw, honest, and urgent.</p>
            <br/>
            <p>However, chaos requires control. The most effective brutalist sites are actually highly structured underneath. They use the aesthetic of chaos to guide the user's eye to conversion points more aggressively than "friendly" designs ever could.</p>
          `
        },
        {
          id: 'ai-driven-ux',
          title: 'Generative UI: Interfaces that Draw Themselves',
          excerpt: 'Static websites are dead. Learn how we are using real-time user data to generate custom layouts on the fly for every unique visitor.',
          date: 'DEC 15, 2023',
          readTime: '7 MIN READ',
          category: 'Technology',
          author: 'Marcus R.',
          imageUrl: 'https://picsum.photos/800/600?random=12',
          content: `
            <p>Imagine a website that rearranges itself based on your mood, your browsing history, and the time of day. This isn't science fiction; it's Generative UI.</p>
            <br/>
            <h3>The Dynamic Canvas</h3>
            <p>Using large language models (LLMs) and real-time analytics, we can now generate UI components on the fly. If a user is skimming, we summarize content. If they are deep-diving, we expand technical details.</p>
            <br/>
            <p>This level of personalization goes beyond "Hello, [Name]". It changes the fundamental structure of the information architecture to suit the user's cognitive state.</p>
          `
        }
      ]
    },
    generalFaq: {
      title: "Common Questions",
      subtitle: "FAQ",
      items: [
        { question: "Do you use site builders like Wix?", answer: "No. Every project is hand-coded from scratch. This ensures you have full ownership, better performance, and no platform limitations." },
        { question: "How much does a project cost?", answer: "Project costs vary based on complexity, features, and timeline. We offer bespoke quotes after an initial discovery session." },
        { question: "What is the typical timeline?", answer: "1-2 weeks." },
        { question: "Do you offer post-launch support?", answer: "Yes, we provide a 30-day warranty period for bug fixes. We also offer ongoing maintenance retainers for updates and monitoring." },
        { question: "Will I own the source code?", answer: "Absolutely. Upon final payment, full intellectual property rights and source code are transferred to you." },
        { question: "Do you provide hosting?", answer: "We assist in setting up hosting environments on your preferred cloud provider (AWS, Vercel, etc.), but the accounts remain in your name." },
        { question: "Is SEO included?", answer: "We build with 'Technical SEO' in mind—clean code, fast loading, and proper tags. For content strategy and ranking, we offer separate services." },
        { question: "Can I update the content myself?", answer: "Yes, we usually integrate a Headless CMS (like Sanity or Strapi) that allows you to easily manage text and images." },
        { question: "Do you require a deposit?", answer: "Yes, we typically require a 50% deposit to schedule resources and begin the discovery phase." },
        { question: "Can you take over an existing project?", answer: "We can, subject to a code audit. If the existing codebase meets our quality standards, we can continue development." },
      ]
    },
    contact: {
      title: "Let's Talk",
      name: "Your Name",
      email: "Your Email",
      message: "Tell us about your project",
      submit: "Send Message",
      telegramButton: "Contact via Telegram",
      telegramLink: "https://t.me/interphase_art",
    },
    footer: {
      sitemapTitle: "Sitemap",
      socialTitle: "Connect",
      contactTitle: "Contact",
      rights: "All rights reserved.",
      privacy: "Privacy Policy",
      developedBy: "Developed by Interphase Core",
    },
    privacy: {
        title: "Privacy Policy",
        lastUpdated: "Last Updated: December 2024",
        back: "Back to Home",
        blocks: [
          {
            title: "1. Introduction",
            content: `<p>Interphase ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>`
          },
          {
            title: "2. Information We Collect",
            content: `<p>We may collect personal information that you voluntarily provide to us when you fill out contact forms, such as your name, email address, and project details.</p>`
          },
          {
            title: "3. Cookies and Local Storage",
            content: `<p>We use Local Storage to enhance your experience, specifically to remember your language preferences and theme settings (Light/Dark mode). We do not use third-party tracking cookies.</p>`
          },
          {
            title: "4. Use of Information",
            content: `<p>The information we collect is used solely to communicate with you regarding your inquiries, provide our services, and improve website performance.</p>`
          },
          {
            title: "5. Data Security",
            content: `<p>We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access or alteration.</p>`
          },
          {
            title: "6. Contact Us",
            content: `<p>If you have questions about this Privacy Policy, please contact us via Telegram or Email provided in the contact section.</p>`
          }
        ]
    },
  },
  ru: {
    nav: [
      { id: 'home', label: 'Главная', path: '/' },
      { id: 'services', label: 'Услуги', path: '/services' },
      { id: 'portfolio', label: 'Проекты', path: '/portfolio' },
      { id: 'blog', label: 'Блог', path: '/blog' },
      { id: 'contact', label: 'Контакты', path: '/contact' },
    ],
    ui: {
      viewDetails: "Подробнее",
      systemModule: "Системный Модуль",
      backToServices: "Назад к услугам",
      backToJournal: "Назад в Блог",
      readyToStart: "Готовы начать?",
      share: "Поделиться",
      readMore: "Читать",
      lightMode: "Светлая Тема",
      darkMode: "Темная Тема",
      initializing: "Инициализация Системы...",
      systemLog: "системный_лог.txt",
      endOfBuffer: "-- КОНЕЦ БУФЕРА --",
      readOnly: "ТОЛЬКО ЧТЕНИЕ",
      notFound: "Услуга не найдена",
      goHome: "На Главную",
      articleNotFound: "Статья не найдена",
    },
    hero: {
      title: "Interphase: Новая Цифровая Реальность.",
      subtitle: "Мы — агентство полного цикла, объединяющее эстетику, ручной код, аналитику данных и стратегию для создания стильных продающих продуктов.",
      cta: "СМОТРЕТЬ РАБОТЫ",
    },
    about: {
      title: "Давайте Познакомимся",
      subtitle: "КТО МЫ",
      description1: "Interphase — это агентство полного цикла, предлагающее спектр услуг по веб-дизайну, кастомной разработке и дата-аналитике. От формирования названия бренда и логотипа до создания образа и дизайна рекламных материалов.",
      description2: "Мы принципиально не используем конструкторы (Тильда, Wix). Мы создаем стильные продающие продукты, написанные чистым кодом. Мы работаем от концепции до деплоя и техподдержки.",
      cta: "Смотреть Услуги",
      whyChooseUs: {
        title: "Почему Мы?",
        items: [
          { title: "Агентство Полного Цикла", description: "Полное покрытие: от нейминга до запуска и поддержки." },
          { title: "Ручной Код", description: "Никаких конструкторов. Мы гарантируем чистую производительность и масштабируемость." },
          { title: "Стратегия на Данных", description: "Стратегические решения, подкрепленные нейро-прогнозами и анализом рынка." },
          { title: "Продающая Эстетика", description: "Авангардный дизайн, созданный для реальных бизнес-результатов." }
        ]
      }
    },
    process: {
      title: "Как Мы Работаем",
      subtitle: "ПРОЦЕСС",
      steps: [
        { number: "01", title: "Исследование", description: "Глубокое погружение в бизнес-модель, цели и аудиторию для построения прочного стратегического фундамента." },
        { number: "02", title: "Архитектура", description: "Разработка структурной логики, путей пользователя (User Flows) и технических спецификаций проекта." },
        { number: "03", title: "Дизайн", description: "Создание визуального языка. High-fidelity UI, моушн-дизайн и интерактивные прототипы." },
        { number: "04", title: "Разработка", description: "Только ручной код. Мы не используем шаблоны или конструкторы. Пишем чистый, масштабируемый код и интегрируем API." },
        { number: "05", title: "Запуск", description: "Финальное тестирование, развертывание на боевых серверах и пост-релизный мониторинг." }
      ],
      paymentTitle: "Оплата и Условия",
      paymentDescription: "Мы работаем по прозрачной системе этапов. Обычно это 50% предоплата для старта работы нейронных двигателей и ресурсов, и 50% после успешного развертывания проекта. Мы принимаем банковские переводы и криптовалюту.",
      testimonialsTitle: "Логи Клиентов",
      testimonialsSubtitle: "ОТЗЫВЫ",
      testimonials: [
        { id: 't1', text: "Interphase мгновенно уловили геймерскую эстетику. Платформа для турниров, которую они создали, легко держит нагрузки и выглядит невероятно.", author: "Алексей", role: "Основатель", company: "ELEUSIS" },
        { id: 't2', text: "Нашему журналу требовался уникальный визуальный язык. Interphase создали шедевр, который стал идеальным холстом для нашего контента.", author: "Елена", role: "Главный Редактор", company: "Понедельник" },
        { id: 't4', text: "Нам нужен был сайт, вызывающий доверие. Результат превзошел ожидания, поток заявок удвоился.", author: "Дмитрий", role: "CEO", company: "StroyMaster Pro" }
      ],
      ctaTitle: "Оцените результат нашей методологии.",
      ctaButton: "Смотреть Кейсы"
    },
    services: {
      title: "Наши Услуги",
      subtitle: "ПОЛНЫЙ ЦИКЛ УСЛУГ",
      items: [
        { 
          id: 'ui-ux',
          number: '01', 
          title: 'UI/UX Дизайн', 
          shortDescription: 'Иммерсивные интерфейсы, объединяющие эстетику и функциональность.', 
          longDescription: 'Мы создаем цифровой опыт, который привлекает и конвертирует. Наш процесс включает глубокое исследование пользователей, вайрфрейминг и прототипирование высокой точности. Мы имеем индивидуальный подход к каждому клиенту, все условия конкретно обговариваются на брифе.',
          features: ['UX Исследования', 'Прототипирование', 'Дизайн-системы', 'Дизайн взаимодействия'],
          cta: 'Начать Дизайн',
          faq: [
            { question: "Вы начинаете с прототипа?", answer: "Да, мы всегда начинаем с вайрфреймов и интерактивных прототипов для проверки логики." },
            { question: "В каких программах работаете?", answer: "Мы работаем преимущественно в Figma, используя последние плагины и функции auto-layout." },
            { question: "Можете сделать редизайн?", answer: "Безусловно. Мы проведем аудит текущего интерфейса и предложим стратегию модернизации." },
            { question: "Вы делаете дизайн-систему?", answer: "Да, мы передаем модульную дизайн-систему для обеспечения единства стиля в будущем." },
            { question: "Сколько правок включено?", answer: "Обычно мы включаем 2-3 итерации правок на каждом этапе." }
          ]
        },
        { 
          id: 'web-dev',
          number: '02', 
          title: 'Веб-Разработка', 
          shortDescription: 'От продающих лендингов до многостраничных платформ. Только код, никаких конструкторов.', 
          longDescription: 'Мы не работаем на конструкторах (Tilda, Wix). Мы создаем масштабируемые и высокопроизводительные веб-решения, написанные вручную. Будь то одностраничный лендинг или масштабный портал — наш код чистый, безопасный и принадлежит вам. Мы имеем индивидуальный подход к каждому клиенту, все условия конкретно обговариваются на брифе.',
          features: ['Без конструкторов (Чистый код)', 'Лендинги и Промо-сайты', 'Многостраничные порталы', 'Архитектура на React & Next.js'],
          cta: 'Создать Платформу',
          faq: [
            { question: "Вы делаете сайты на Тильде?", answer: "Нет. Мы пишем сайты только кодом (HTML/CSS/JS/React). Это дает полную свободу в дизайне и отсутствие ограничений." },
            { question: "Какой стек вы используете?", answer: "Мы специализируемся на экосистеме React (Next.js), TypeScript, Node.js и облачной инфраструктуре." },
            { question: "Будет ли SEO оптимизация?", answer: "Да, мы используем Server-Side Rendering (SSR) и семантический HTML для максимальной видимости." },
            { question: "Вы предоставляете хостинг?", answer: "Мы настраиваем облачный хостинг (AWS, Vercel), но аккаунты регистрируются на вас." },
            { question: "Выдержит ли сайт нагрузки?", answer: "Да, так как мы пишем код с нуля, мы проектируем архитектуру, готовую к любым нагрузкам." }
          ]
        },
        { 
          id: 'telegram-ecosystem',
          number: '03', 
          title: 'Экосистема Telegram', 
          shortDescription: 'Полноценные веб-приложения и боты внутри Telegram.', 
          longDescription: 'Используйте мощь 800M+ пользователей. Мы проектируем и разрабатываем бесшовные Telegram Mini Apps (TMA) и продвинутых ботов, работающих как полноценные продукты. Мы имеем индивидуальный подход к каждому клиенту, все условия конкретно обговариваются на брифе.',
          features: ['Telegram Mini Apps (TMA)', 'Бесшовная интеграция входа', 'Подключение TON Wallet', 'Интерактивные механики'],
          cta: 'Запустить Mini App',
          faq: [
            { question: "Что такое Telegram Mini App?", answer: "Это веб-приложение, работающее внутри Telegram, которое ощущается как нативное." },
            { question: "Можно принимать оплаты?", answer: "Да, мы интегрируем Stripe, Telegram Stars или крипто-платежи TON." },
            { question: "Нужна ли регистрация?", answer: "Нет, аутентификация происходит бесшовно через ID аккаунта Telegram." },
            { question: "Это медленнее сайта?", answer: "Нет, Mini Apps оптимизированы и загружаются мгновенно внутри мессенджера." },
            { question: "Можно слать уведомления?", answer: "Бот-компаньон может отправлять неограниченные уведомления пользователям, взаимодействовавшим с приложением." }
          ]
        },
        { 
          id: 'mobile-app',
          number: '04', 
          title: 'Мобильные Приложения', 
          shortDescription: 'Нативные и кроссплатформенные решения для iOS и Android.', 
          longDescription: 'Мы создаем мобильные приложения с нативным откликом и высокой производительностью. React Native или нативная разработка — ваше приложение будет выделяться в сторах. Мы имеем индивидуальный подход к каждому клиенту, все условия конкретно обговариваются на брифе.',
          features: ['Разработка под iOS и Android', 'React Native', 'ASO Оптимизация', 'Оффлайн режим'],
          cta: 'Разработать Приложение',
          faq: [
            { question: "Натив или кроссплатформа?", answer: "Мы рекомендуем React Native для 90% случаев — это экономит бюджет при нативной производительности." },
            { question: "Вы публикуете в сторы?", answer: "Да, мы берем на себя весь процесс ревью и публикации в Apple App Store и Play Store." },
            { question: "Как работают обновления?", answer: "Мы можем отправлять OTA обновления для мелких правок или версии для крупных фич." },
            { question: "Работает ли оффлайн?", answer: "Да, мы реализуем локальное кэширование, чтобы приложение работало без интернета." },
            { question: "Сколько времени занимает?", answer: "Типичное MVP мобильного приложения занимает 3-5 месяцев." }
          ]
        },
        { 
          id: 'brand-identity',
          number: '05', 
          title: 'Брендинг', 
          shortDescription: 'Стратегический брендинг, определяющий ваш голос на рынке.', 
          longDescription: 'Бренд — это больше, чем логотип. Мы создаем комплексные системы визуальной идентификации, включая типографику, цветовые палитры и tone of voice.',
          features: ['Логотипы', 'Айдентика', 'Брендбуки', 'Маркетинговые материалы'],
          cta: 'Создать Бренд',
          faq: [
            { question: "Что я получу в итоге?", answer: "Вы получите Brand Book с файлами логотипа, кодами цветов, шрифтами и правилами использования." },
            { question: "Сколько вариантов лого?", answer: "Обычно мы презентуем 3 различных концептуальных направления." },
            { question: "Вы делаете нейминг?", answer: "Да, мы можем помочь с названием и слоганом на основе анализа рынка." },
            { question: "Можно зарегистрировать марку?", answer: "Мы создаем оригинальный дизайн, но для регистрации ТМ лучше обратиться к юристу." },
            { question: "Делаете дизайн для соцсетей?", answer: "Да, мы создаем шаблоны для Instagram, LinkedIn и других платформ." }
          ]
        },
        { 
          id: 'complex-integrations',
          number: '06', 
          title: 'Сложные Интеграции', 
          shortDescription: 'Объединение разрозненных систем в единый рабочий процесс.', 
          longDescription: 'Мы специализируемся на оркестрации API и подключении сторонних сервисов. Будь то CRM, ERP, или платежные шлюзы, мы обеспечиваем бесперебойную работу вашей цифровой экосистемы.',
          features: ['Разработка API', 'Синхронизация CRM/ERP', 'Настройка платежных шлюзов', 'Облачная инфраструктура'],
          cta: 'Интегрировать Системы',
          faq: [
            { question: "С какими CRM работаете?", answer: "Мы работаем с Salesforce, HubSpot, Zoho, Pipedrive и кастомными решениями." },
            { question: "Безопасна ли передача данных?", answer: "Да, все интеграции используют шифрование и защищенную API аутентификацию." },
            { question: "Можете сделать свое API?", answer: "Да, мы проектируем RESTful и GraphQL API для безопасного доступа к данным." },
            { question: "Что если API изменится?", answer: "Мы создаем гибкий слой middleware, который легко обновляется при изменениях сторонних сервисов." },
            { question: "Поддерживаете старые системы?", answer: "Мы можем 'обернуть' легаси системы в современные API слои." }
          ]
        },
        { 
          id: 'ai-agent',
          number: '07', 
          title: 'Создание AI-агента', 
          shortDescription: 'Автономные ассистенты, работающие с вашими данными и инструментами.', 
          longDescription: 'Мы проектируем и создаем AI-агентов, которые выполняют задачи, общаются с вашими системами и дают измеримый бизнес-эффект. От оркестрации LLM до безопасного доступа к инструментам и мониторинга — мы строим надежных агентов для реальной нагрузки. Мы имеем индивидуальный подход к каждому клиенту, все условия конкретно обговариваются на брифе.',
          features: ['Стратегия LLM и архитектура', 'Оркестрация инструментов и API', 'Безопасные коннекторы данных', 'Мониторинг и контуры безопасности'],
          cta: 'Запустить AI-агента',
          faq: [
            { question: "Агент сможет работать с нашими системами?", answer: "Да, мы интегрируем CRM, базы данных, хелпдески и кастомные API с контролем доступа." },
            { question: "Насколько это безопасно?", answer: "Мы настраиваем роли, аудит логов и защитные контуры перед запуском в продакшен." },
            { question: "Какие модели вы используете?", answer: "Мы подбираем оптимальную модель по качеству, задержке и стоимости под вашу задачу." },
            { question: "Как измеряется эффективность?", answer: "Фиксируем KPI, оцениваем качество ответов и регулярно улучшаем цепочки действий." },
            { question: "Можно сделать мульти-язычный агент?", answer: "Да, мы настраиваем локализацию и многоязычную поддержку." }
          ]
        },
        { 
          id: 'seo-geo',
          number: '08', 
          title: 'SEO&GEO под ключ', 
          shortDescription: 'Видимость в поиске и ИИ-ответах с фокусом на конверсию.', 
          longDescription: 'Мы выстраиваем полный контур видимости: технический SEO, структурированный контент и GEO (Generative Engine Optimization), чтобы ваш бренд появлялся в ответах ИИ. Синхронизируем архитектуру, скорость и контент-стратегию для роста целевого трафика и заявок.',
          features: ['Технический SEO и Core Web Vitals', 'Семантическая архитектура контента', 'GEO для AI поиска и ассистентов', 'Аналитика, трекинг и рост'],
          cta: 'Усилить Видимость',
          faq: [
            { question: "Что такое GEO?", answer: "GEO — это оптимизация для AI-поиска и ассистентов, чтобы бренд цитировался в генеративных ответах." },
            { question: "Вы работаете с существующим сайтом?", answer: "Да, мы делаем аудит и внедряем дорожную карту без потери текущего трафика." },
            { question: "Когда появятся результаты?", answer: "Первые улучшения возможны через несколько недель, устойчивый рост — через 2-4 месяца." },
            { question: "Вы пишете контент?", answer: "Да, создаем и улучшаем контент на основе интент-кластеров и семантики." },
            { question: "Есть ли отчетность?", answer: "Мы даем прозрачные отчеты по трафику, позициям и конверсиям." }
          ]
        },
         { 
          id: 'reputation-guard',
          number: '09', 
          title: 'Защита Репутации', 
          shortDescription: 'Управление цифровым следом и стратегии защиты бренда.', 
          longDescription: 'Ваша репутация — это ваша валюта. Мы внедряем SEO-стратегии и мониторинг контента, чтобы ваш бренд воспринимался именно так, как вы задумали. Мы имеем индивидуальный подход к каждому клиенту, все условия конкретно обговариваются на брифе.',
          features: ['Управление выдачей (SERP)', 'Мониторинг отзывов', 'Антикризисный менеджмент', 'Посев позитивного контента'],
          cta: 'Защитить Бренд',
          faq: [
            { question: "Можно удалить плохие отзывы?", answer: "Мы не можем удалить реальные отзывы, но можем оспорить фейки и вытеснить негатив позитивом." },
            { question: "Как быстро виден результат?", answer: "Изменения в поисковой выдаче обычно занимают 3-6 месяцев." },
            { question: "Это законно?", answer: "Да, мы используем исключительно 'белые' методы SEO и PR." },
            { question: "Вы следите за соцсетями?", answer: "Да, мы мониторим упоминания бренда на всех основных платформах." },
            { question: "Это конфиденциально?", answer: "Абсолютно. Мы подписываем строгие NDA и никогда не разглашаем клиентов по репутации." }
          ]
        },
      ]
    },
    portfolio: {
      title: "Избранные Проекты",
      subtitle: "Нам доверяют многие! От малого бизнеса до крупных агентств в различных отраслях и нишах. Ниже вы можете ознакомиться с демо-версиями сайтов наших клиентов. Дизайн и код разработан нами на 100%",
      outro: "Ваш бизнес ждет дизайн и код от наших дизайнеров и программистов!",
      visitLink: "СМОТРЕТЬ САЙТ",
      items: [
        { 
          id: '2', 
          title: 'StroyMaster Pro', 
          category: 'Строительство', 
          videoDesktopUrl: '/stroymasterprodesctop.mov',
          videoMobileUrl: '/stroymasterpromob.mp4',
          description: 'Полный цикл строительных и ремонтных работ. От архитектурного проекта до сдачи под ключ с фиксированной ценой. Перед нами стояла задача построить простой и понятный функциональный лендинг, при этом явно указав пользователю на скидки и спецпредложения. Клиент остался более чем доволен.'
        },
        { 
          id: '1', 
          title: 'ELEUSIS', 
          category: 'Гейминг & Киберспорт', 
          videoDesktopUrl: '/eleusisdesctop.mov',
          videoMobileUrl: '/eleusuismob.mp4',
          description: 'Ультимативное игровое пространство. Турниры по CS2, Dota 2, Valorant и топовое железо. Перед нами стояла задача сделать сайт ярким и запоминающимся для геймеров, итогом стало повышение конверсии на 29%'
        },
        { 
          id: '5', 
          title: 'Четвертый Интернационал', 
          category: 'Образование & EdTech', 
          videoDesktopUrl: '/forthinternationaldesctop.mp4',
          videoMobileUrl: '/forthinternationalmob.mp4',
          description: 'Школа языков и академическое сообщество. Китайский, арабский и английский с культурным погружением. В ходе создания мы интегрировали сложную систему курсов, аккаунтов студентов и преподавателей и ссылку на платежную систему. На нашем сайте предоставлен демо-вариант сайта, так как был подписан NDA. Сайт успешно реализует комплекс образовательных технологий.'
        },
        { 
          id: '6', 
          title: 'Понедельник', 
          category: 'Digital Медиа', 
          videoDesktopUrl: '/mondaydesctop.mp4',
          videoMobileUrl: '/mondaymob.mp4',
          description: 'Цифровой журнал о культуре и визуальной эстетике. Современный взгляд на искусство и дизайн. Был реализован парсинг контента с базы данных на сайт в реальном времени. Как итог - стильная работа без сбоев.'
        },
        { 
          id: '7', 
          title: '388.nail', 
          category: 'Красота и Здоровье', 
          videoDesktopUrl: '/388desctop.mp4',
          videoMobileUrl: '/388mob.mp4',
          description: 'Тропический рай в городе. Мы создали цифровой опыт, отражающий концепцию "мини-отпуска", перенеся атмосферу джунглей Бали в веб.'
        },
      ]
    },
    homeBlog: {
      title: "Экспертные статьи",
      subtitle: "АНАЛИТИКА И НОВОСТИ"
    },
    blog: {
      title: "Инсайты",
      subtitle: "БЛОГ",
      readMore: "Читать Статью",
      backText: "Назад в Блог",
      items: [
        {
          id: 'future-of-interfaces',
          title: 'Невидимый Интерфейс: За Пределами Экранов',
          excerpt: 'По мере перехода к пространственным вычислениям понятие "страницы" умирает. Как мы проектируем для эры жестов и голоса.',
          date: '12 ОКТ 2023',
          readTime: '5 МИН',
          category: 'UX Дизайн',
          author: 'Алекс В.',
          imageUrl: 'https://picsum.photos/800/600?random=10',
          content: `
            <p>Экран доминировал над нашим вниманием десятилетиями. Но прямоугольник — это ограничение, а не необходимость. С ростом пространственных вычислений и продвинутой тактильной отдачи мы вступаем в эру, где интерфейс становится невидимым.</p>
            <br/>
            <h3>Контекст — это Король</h3>
            <p>В безэкранном будущем контекст решает всё. Интерфейсы должны предсказывать намерение на основе окружения, биометрии и исторических данных. Суть не в том, чтобы показать кнопку, а в том, чтобы выполнить задачу до того, как пользователь осознает необходимость.</p>
            <br/>
            <p>В Interphase мы экспериментируем с взаимодействиями на основе близости, которые запускают микро-анимации только когда это уместно. Это снижает когнитивную нагрузку и создает бесшовный поток между цифровым и физическим мирами.</p>
          `
        },
        {
          id: 'brutalism-2024',
          title: 'Нео-Брутализм: Почему "Некрасивое" Продает',
          excerpt: 'Идеальная эстетика становится невидимой. Бренды обращаются к сырому, необработанному и высококонтрастному дизайну, чтобы выделиться в шуме.',
          date: '04 НОЯ 2023',
          readTime: '4 МИН',
          category: 'Тренды',
          author: 'Сара К.',
          imageUrl: 'https://picsum.photos/800/600?random=11',
          content: `
            <p>Веб-дизайн стал слишком безопасным. Идеальные отступы, скругленные углы и мягкие тени создали море одинаковости. Нео-брутализм — это реакция на эту монотонность.</p>
            <br/>
            <h3>Ломая Сетку</h3>
            <p>Мы наблюдаем возвращение к системным шрифтам, высококонтрастным рамкам и перекрывающим друг друга элементам, которые бросают вызов традиционным сеткам. Это ощущается сырым, честным и срочным.</p>
            <br/>
            <p>Однако хаос требует контроля. Самые эффективные бруталистские сайты на самом деле имеют жесткую структуру внутри. Они используют эстетику хаоса, чтобы направлять взгляд пользователя к точкам конверсии агрессивнее, чем "дружелюбный" дизайн.</p>
          `
        },
        {
          id: 'ai-driven-ux',
          title: 'Генеративный UI: Интерфейсы, Рисующие Сами Себя',
          excerpt: 'Статичные сайты мертвы. Узнайте, как мы используем данные пользователей в реальном времени для генерации кастомных макетов на лету.',
          date: '15 ДЕК 2023',
          readTime: '7 МИН',
          category: 'Технологии',
          author: 'Маркус Р.',
          imageUrl: 'https://picsum.photos/800/600?random=12',
          content: `
            <p>Представьте сайт, который перестраивается в зависимости от вашего настроения, истории просмотров и времени суток. Это не научная фантастика, это Генеративный UI.</p>
            <br/>
            <h3>Динамический Холст</h3>
            <p>Используя большие языковые модели (LLM) и аналитику в реальном времени, мы можем генерировать компоненты UI на лету. Если пользователь сканирует текст, мы суммируем контент. Если он изучает детали, мы разворачиваем технические спецификации.</p>
            <br/>
            <p>Этот уровень персонализации идет дальше, чем "Привет, [Имя]". Он меняет фундаментальную структуру информационной архитектуры, подстраиваясь под когнитивное состояние пользователя.</p>
          `
        }
      ]
    },
    generalFaq: {
      title: "Частые Вопросы",
      subtitle: "FAQ",
      items: [
        { question: "Вы делаете сайты на Тильде (Tilda)?", answer: "Нет. Мы занимаемся исключительно ручной разработкой кода. Это обеспечивает отсутствие ограничений по дизайну, высокую скорость и полную независимость от платформ-конструкторов." },
        { question: "Сколько стоит проект?", answer: "Стоимость зависит от сложности и сроков. Мы предлагаем индивидуальную оценку после первичного брифинга." },
        { question: "Какие сроки разработки?", answer: "1-2 недели." },
        { question: "Есть ли поддержка после запуска?", answer: "Да, мы даем 30 дней гарантии на баги. Также предлагаем пакеты ежемесячной поддержки." },
        { question: "Кому принадлежит код?", answer: "Вам. После полной оплаты все права на интеллектуальную собственность и исходный код передаются вам." },
        { question: "Вы предоставляете хостинг?", answer: "Мы помогаем настроить облачный хостинг (AWS, Vercel и др.), но аккаунты оформляются на вас." },
        { question: "Включено ли SEO?", answer: "Мы делаем 'Техническое SEO' — чистый код, скорость, правильные теги. Продвижение — отдельная услуга." },
        { question: "Смогу ли я менять контент?", answer: "Да, мы обычно интегрируем Headless CMS, чтобы вы могли легко менять текст и картинки." },
        { question: "Нужна ли предоплата?", answer: "Да, стандартно мы работаем с 50% предоплатой для бронирования ресурсов команды." },
        { question: "Можете доделать чужой проект?", answer: "Можем после аудита кода. Если качество кода соответствует стандартам, мы продолжим разработку." },
      ]
    },
    contact: {
      title: "Свяжитесь с нами",
      name: "Ваше Имя",
      email: "Ваш Email",
      message: "Расскажите о проекте",
      submit: "Отправить",
      telegramButton: "Написать в Telegram",
      telegramLink: "https://t.me/interphase_art",
    },
    footer: {
      sitemapTitle: "Карта Сайта",
      socialTitle: "Связь",
      contactTitle: "Контакты",
      rights: "Все права защищены.",
      privacy: "Политика Конфиденциальности",
      developedBy: "Разработано Interphase Core",
    },
    privacy: {
        title: "Политика в отношении обработки персональных данных",
        lastUpdated: "Последнее обновление: Декабрь 2024",
        back: "На Главную",
        blocks: [
          {
            title: "Введение",
            content: `
              <p>Компания <strong>Interphase</strong> уделяет особое внимание защите вашей конфиденциальности. Мы стремимся обеспечить прозрачность и безопасность в отношении любой информации, которую вы предоставляете нам при использовании нашего веб-сайта (далее – «Сайт»), его сервисов, программ и связанных с ним услуг.</p>
              <p>Использование сервисов Сайта означает безоговорочное согласие Пользователя с настоящей Политикой; в случае несогласия Пользователь должен воздержаться от использования сервисов.</p>
            `
          },
          {
            title: "01. Общие положения",
            content: `
              <p>1.1. В данной Политике под понятием «персональная информация Пользователя» понимаются следующие аспекты:</p>
              <p>1.1.1. Персональная информация, которую Пользователь предоставляет о себе самостоятельно при заполнении и отправке форм заявок, подписки на обновления или при использовании Сервисов. Эта информация включает в себя персональные данные Пользователя. Некоторая информация, необходимая для предоставления Сервисов, обязательно помечена специальным образом. В то же время, Пользователь вправе предоставлять иной информации по своему усмотрению.</p>
              <p>1.1.2. Данные, которые автоматически передаются сервисам Сайта в ходе их использования при помощи установленного на устройстве Пользователя программного обеспечения. Эти данные включают в себя IP-адрес, информацию о файлах cookie, сведения о браузере Пользователя (или другой программе, используемой для доступа к сервисам), технические характеристики оборудования и программного обеспечения, используемых Пользователем, а также дату и время доступа к сервисам, адреса запрашиваемых страниц и подобную информацию.</p>
              <p>1.1.3. Прочая информация о Пользователе, обработка которой предусмотрена в Соглашении об использовании Сайта.</p>
              <p>1.1.4. Настоящая Политика конфиденциальности применяется исключительно к Сайту. Компания не контролирует и не несет ответственности за сайты третьих лиц, на которые Пользователь может перейти по ссылкам, доступным на Сайте.</p>
            `
          },
          {
            title: "02. Цели обработки персональной информации пользователей",
            content: `
              <p>Мы используем собранную информацию для следующих целей:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>Предоставление вам запрашиваемых услуг и обратной связи.</li>
                <li>Персонализация вашего опыта использования нашего сайта и услуг.</li>
                <li>Улучшение качества наших услуг и разработка новых продуктов и сервисов.</li>
                <li>Предоставление вам информации о наших продуктах, акциях и мероприятиях.</li>
              </ul>
              <p>Мы не продаем, не обмениваем и не передаем вашу личную информацию третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством.</p>
            `
          },
          {
            title: "03. Основные права и обязанности Оператора",
            content: `
              <p>3.1. Оператор имеет право:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>получать от субъекта персональных данных достоверные информацию и/или документы, содержащие персональные данные;</li>
                <li>в случае отзыва субъектом персональных данных согласия на обработку персональных данных, а также, направления обращения с требованием о прекращении обработки персональных данных, Оператор вправе продолжить обработку персональных данных без согласия субъекта персональных данных при наличии оснований, указанных в Законе о персональных данных;</li>
                <li>самостоятельно определять состав и перечень мер, необходимых и достаточных для обеспечения выполнения обязанностей, предусмотренных Законом о персональных данных и принятыми в соответствии с ним нормативными правовыми актами, если иное не предусмотрено Законом о персональных данных или другими федеральными законами.</li>
              </ul>
              <p>3.2. Оператор обязан:</p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>предоставлять субъекту персональных данных по его просьбе информацию, касающуюся обработки его персональных данных;</li>
                <li>организовывать обработку персональных данных в порядке, установленном действующим законодательством РФ;</li>
                <li>отвечать на обращения и запросы субъектов персональных данных и их законных представителей в соответствии с требованиями Закона о персональных данных;</li>
                <li>сообщать в уполномоченный орган по защите прав субъектов персональных данных по запросу этого органа необходимую информацию в течение 10 дней с даты получения такого запроса;</li>
                <li>публиковать или иным образом обеспечивать неограниченный доступ к настоящей Политике в отношении обработки персональных данных;</li>
                <li>принимать правовые, организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных;</li>
                <li>прекратить передачу (распространение, предоставление, доступ) персональных данных, прекратить обработку и уничтожить персональные данные в порядке и случаях, предусмотренных Законом о персональных данных;</li>
                <li>исполнять иные обязанности, предусмотренные Законом о персональных данных.</li>
              </ul>
            `
          },
          {
            title: "04. Принципы обработки персональных данных",
            content: `
              <p>4.1. Обработка персональных данных осуществляется на законной основе.</p>
              <p>4.2. Обработке подлежат только персональные данные, которые отвечают целям их обработки.</p>
              <p>4.3. Содержание и объем обрабатываемых персональных данных соответствуют заявленным целям обработки. Не допускается избыточность обрабатываемых персональных данных по отношению к заявленным целям их обработки.</p>
              <p>4.4. При обработке персональных данных обеспечивается точность персональных данных, их достаточность, а в необходимых случаях и актуальность по отношению к целям обработки персональных данных. Оператор принимает необходимые меры и/или обеспечивает их принятие по удалению или уточнению неполных или неточных данных.</p>
              <p>4.5. Хранение персональных данных осуществляется в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных, если срок хранения персональных данных не установлен федеральным законом, договором, стороной которого, выгодоприобретателем или поручителем по которому является субъект персональных данных.</p>
              <p>4.6. Обрабатываемые персональные данные уничтожаются либо обезличиваются по достижении целей обработки или в случае утраты необходимости в достижении этих целей, если иное не предусмотрено федеральным законом.</p>
            `
          },
          {
            title: "05. Порядок сбора, хранения, передачи и других видов обработки персональных данных",
            content: `
              <p>5.1. Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц.</p>
              <p>5.2. Персональные данные Пользователя никогда, ни при каких условиях не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства либо в случае, если субъектом персональных данных дано согласие Оператору на передачу данных третьему лицу для исполнения обязательств по гражданско-правовому договору.</p>
              <p>5.3. В случае выявления неточностей в персональных данных, Пользователь может актуализировать их самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора <a href="mailto:bushuev@interphase.pro" class="text-brown dark:text-neon hover:underline">bushuev@interphase.pro</a> с пометкой «Актуализация персональных данных».</p>
              <p>5.4. Пользователь может в любой момент отозвать свое согласие на обработку персональных данных, направив Оператору уведомление посредством электронной почты на электронный адрес Оператора <a href="mailto:bushuev@interphase.pro" class="text-brown dark:text-neon hover:underline">bushuev@interphase.pro</a> с пометкой «Отзыв согласия на обработку персональных данных».</p>
              <p>5.5. Условием прекращения обработки персональных данных может являться достижение целей обработки персональных данных, истечение срока действия согласия субъекта персональных данных, отзыв согласия субъектом персональных данных или требование о прекращении обработки персональных данных, а также выявление неправомерной обработки персональных данных.</p>
            `
          },
          {
            title: "06. Перечень действий, производимых Оператором с полученными персональными данными",
            content: `
              <p>6.1. Оператор осуществляет сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление и уничтожение персональных данных.</p>
            `
          },
          {
            title: "07. Конфиденциальность персональных данных",
            content: `
              <p>Оператор и иные лица, получившие доступ к персональным данным, обязаны не раскрывать третьим лицам и не распространять персональные данные без согласия субъекта персональных данных, если иное не предусмотрено федеральным законом.</p>
              <p>Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью телеграм <a href="https://t.me/interphase_art" target="_blank" rel="noopener noreferrer" class="text-brown dark:text-neon hover:underline">@interphase_art</a>.</p>
              <p>В данном документе будут отражены любые изменения политики обработки персональных данных Оператором. Политика действует бессрочно до замены ее новой версией.</p>
            `
          }
        ]
    }
  }
};
