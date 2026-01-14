
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
import { FooterLabel } from './components/FooterLabel';
import { BackToTop } from './components/BackToTop';
import { Preloader } from './components/Preloader';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { AdminLogin } from './pages/Admin/AdminLogin';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminBlogEditor } from './pages/Admin/AdminBlogEditor';
import { CONTENT } from './constants';
import { Language, BlogPost } from './types';
import { blogService } from './services/blogService';

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

  // Default to 'light' if not set in localStorage, respecting system preference
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
      if (savedTheme) {
        return savedTheme;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  // const [hasMore, setHasMore] = useState(true); // Removed pagination for now

  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

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

  // Fetch Posts
  const loadPosts = async () => {
    try {
      const posts = await blogService.getPosts();
      setBlogPosts(posts);
      // setHasMore(false); // No pagination yet
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    
    // Subscribe to real-time updates
    const subscription = blogService.subscribe(() => {
      loadPosts();
    });

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  const content = CONTENT[lang];
  
  // Use ONLY fetched posts
  const blogContent = { ...content.blog, items: blogPosts };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative overflow-x-hidden ${theme === 'dark' ? 'bg-dark text-white selection:bg-neon selection:text-black' : 'bg-bone text-charcoal selection:bg-brown selection:text-white'}`}>
        
        {loading && <Preloader text={content.ui.initializing} onComplete={() => setLoading(false)} />}

        <ScrollToTop />
        {!isAdmin && <Navbar items={content.nav} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} ui={content.ui} />}
        
        <Routes>
          <Route path="/" element={<HomePage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/services" element={<Services title={content.services.title} subtitle={content.services.subtitle} items={content.services.items} ui={content.ui} onNavigate={(path) => navigate(path)} />} />
          <Route path="/services/:id" element={<ServiceDetail items={content.services.items} ui={content.ui} onContact={() => navigate('/contact')} />} />
          <Route path="/journal" element={<BlogList content={blogContent} hasMore={false} onLoadMore={() => {}} />} />
          <Route path="/blog" element={<BlogList content={blogContent} hasMore={false} onLoadMore={() => {}} />} />
          <Route path="/blog/:id" element={<BlogDetail content={blogContent} ui={content.ui} />} />
          <Route path="/privacy" element={<PrivacyPolicy content={content.privacy} />} />
          <Route path="/portfolio" element={<div className="pt-20 min-h-screen"><Portfolio title={content.portfolio.title} subtitle={content.portfolio.subtitle} outro={content.portfolio.outro} items={content.portfolio.items} visitLink={content.portfolio.visitLink} /></div>} />
          <Route path="/contact" element={<div className="pt-20 min-h-screen"><Contact text={content.contact} onSubmitEffect={() => {}} /></div>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
          <Route path="/admin/blog/edit/:id" element={<AdminBlogEditor />} />
        </Routes>

        {!isAdmin && <Footer content={content.footer} navItems={content.nav} />}
        {!isAdmin && <FooterLabel />}
        {!isAdmin && <BackToTop />}
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
