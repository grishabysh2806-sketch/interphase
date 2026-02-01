
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
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
import { Reveal } from './components/Reveal';
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
  blogPosts: BlogPost[];
}> = ({ lang, setLang, theme, toggleTheme, blogPosts }) => {
  const navigate = useNavigate();
  const content = CONTENT[lang];
  const latestPosts = (blogPosts.length ? blogPosts : content.blog.items).slice(0, 3);
  
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
      <section className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-brown dark:text-neon shrink-0" size={20} />
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-brown dark:text-neon">{content.homeBlog.subtitle}</span>
            </div>
          </Reveal>
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal dark:text-white">
              {content.homeBlog.title}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {latestPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 100} width="100%">
                <div
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="group cursor-pointer h-full flex flex-col rounded-3xl border border-charcoal/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 md:p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(111,78,55,0.18)] dark:hover:shadow-[0_24px_60px_rgba(204,255,0,0.16)] hover:border-brown/40 dark:hover:border-neon/40"
                >
                  <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-charcoal/50 aspect-[16/10] relative">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-charcoal dark:to-black flex items-center justify-center">
                        <BookOpen className="text-charcoal/20 dark:text-white/20" size={48} />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 dark:bg-black/90 text-charcoal dark:text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 bg-brown dark:bg-neon rounded-full"></span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-display font-bold text-charcoal dark:text-white group-hover:text-brown dark:group-hover:text-neon transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-gray-600 dark:text-gray-400 text-base leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-charcoal dark:text-white group-hover:gap-4 transition-all duration-300">
                    {content.blog.readMore} <ArrowRight size={16} className="text-brown dark:text-neon" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
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

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};

const setCookie = (name: string, value: string, days: number) => {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
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

  // Default to 'light' if not set in cookies, respecting system preference
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = getCookie('theme') as 'dark' | 'light';
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
    setCookie('theme', newTheme, 365);
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
          <Route path="/" element={<HomePage lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme} blogPosts={blogPosts} />} />
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
