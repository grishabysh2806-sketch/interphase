
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { ServiceDetail } from './components/ServiceDetail';
import { Portfolio } from './components/Portfolio';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { Preloader } from './components/Preloader';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { CONTENT } from './constants';
import { Language, BlogPost } from './types';
import { fetchTelegramPostsPage } from './services/telegramBotService';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper for Home to use useNavigate
const HomePage: React.FC<{ 
  lang: Language; 
  setLang: (lang: Language) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}> = ({ lang, setLang, theme, toggleTheme }) => {
  const navigate = useNavigate();
  const content = CONTENT[lang];
  
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        navigate('/services');
    }
  };

  return (
    <>
      <Hero 
        title={content.hero.title} 
        subtitle={content.hero.subtitle} 
        cta={content.hero.cta} 
        onExplore={scrollToServices}
      />
      <About 
        content={content.about} 
        onScrollDown={scrollToServices} 
        lang={lang}
        setLang={setLang}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div id="services-section">
          <Services 
            title={content.services.title} 
            subtitle={content.services.subtitle} 
            items={content.services.items} 
            ui={content.ui}
            onNavigate={(path) => navigate(path)}
          />
      </div>
      <Process content={content.process} />
      <Portfolio 
        title={content.portfolio.title} 
        subtitle={content.portfolio.subtitle} 
        outro={content.portfolio.outro}
        items={content.portfolio.items}
        visitLink={content.portfolio.visitLink}
      />
      <FAQ 
        title={content.generalFaq.title} 
        subtitle={content.generalFaq.subtitle} 
        items={content.generalFaq.items} 
        ui={content.ui}
      />
      <Contact text={content.contact} onSubmitEffect={() => {}} />
    </>
  );
};

function AppContent() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang') as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'ru')) {
        return savedLang;
      }
      
      const browserLang = navigator.language;
      if (browserLang && browserLang.toLowerCase().startsWith('ru')) {
        return 'ru';
      }
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Default to 'light' if not set in localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'dark' | 'light' || 'light';
    }
    return 'light';
  });
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const POSTS_PER_PAGE = 9;

  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Update favicon based on theme
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      (link as HTMLLinkElement).href = theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = theme === 'dark' ? '/favicon-dark.svg' : '/favicon-light.svg';
      document.head.appendChild(newLink);
    }
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Fetch Telegram Posts
  const loadPosts = async (reset = false) => {
    try {
      const currentOffset = reset ? 0 : offset;
      // If resetting, we force a refresh from the server to bypass internal cache
      const forceRefresh = reset; 
      const { posts, hasMore: moreAvailable } = await fetchTelegramPostsPage(POSTS_PER_PAGE, currentOffset, forceRefresh);
      
      if (reset) {
        setBlogPosts(posts);
        setOffset(POSTS_PER_PAGE);
      } else {
        setBlogPosts(prev => {
           // Filter out duplicates based on ID
           const existingIds = new Set(prev.map(p => p.id));
           const newPosts = posts.filter(p => !existingIds.has(p.id));
           return [...prev, ...newPosts];
        });
        setOffset(prev => prev + POSTS_PER_PAGE);
      }
      setHasMore(moreAvailable);
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts(true);

    // Poll every 60 seconds (only refreshes if we are at the start to avoid jumping)
    const interval = setInterval(() => {
       if (offset <= POSTS_PER_PAGE) {
          loadPosts(true);
       }
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const content = CONTENT[lang];
  
  // Use ONLY fetched posts
  const blogContent = { ...content.blog, items: blogPosts };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-dark text-white selection:bg-neon selection:text-black' : 'bg-bone text-charcoal selection:bg-brown selection:text-white'}`}>
        
        {loading && <Preloader text={content.ui.initializing} onComplete={() => setLoading(false)} />}

        <ScrollToTop />
        <Navbar items={content.nav} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} ui={content.ui} />
        
        <Routes>
          <Route path="/" element={<HomePage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/services" element={<Services title={content.services.title} subtitle={content.services.subtitle} items={content.services.items} ui={content.ui} onNavigate={(path) => navigate(path)} />} />
          <Route path="/services/:id" element={<ServiceDetail items={content.services.items} ui={content.ui} onContact={() => navigate('/contact')} />} />
          <Route path="/journal" element={<BlogList content={blogContent} hasMore={hasMore} onLoadMore={() => loadPosts(false)} />} />
          <Route path="/blog" element={<BlogList content={blogContent} hasMore={hasMore} onLoadMore={() => loadPosts(false)} />} />
          <Route path="/blog/:id" element={<BlogDetail content={blogContent} ui={content.ui} />} />
          <Route path="/privacy" element={<PrivacyPolicy content={content.privacy} />} />
          <Route path="/portfolio" element={<div className="pt-20 min-h-screen"><Portfolio title={content.portfolio.title} subtitle={content.portfolio.subtitle} outro={content.portfolio.outro} items={content.portfolio.items} visitLink={content.portfolio.visitLink} /></div>} />
          <Route path="/contact" element={<div className="pt-20 min-h-screen"><Contact text={content.contact} onSubmitEffect={() => {}} /></div>} />
        </Routes>

        <Footer content={content.footer} navItems={content.nav} />
        <BackToTop />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
