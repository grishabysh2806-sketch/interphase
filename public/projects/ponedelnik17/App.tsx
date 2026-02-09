
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Language, Post } from './types';
import { DICTIONARY, MOCK_POSTS } from './constants';
import Header from './components/Header';
import DoubleBackground from './components/DoubleBackground';
import PostCard from './components/PostCard';
import PostPage from './components/PostPage';
import AboutPage from './components/AboutPage';
import ShopPage from './components/ShopPage';
import { fetchTelegramPostsPage } from './telegramService';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('RU');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [route, setRoute] = useState<{ name: 'feed' } | { name: 'post'; id: string } | { name: 'about' } | { name: 'shop' }>({ name: 'feed' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState<string>('');
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash || '';
      if (hash === '#/about') {
        setRoute({ name: 'about' });
        return;
      }
      if (hash === '#/shop') {
        setRoute({ name: 'shop' });
        return;
      }
      const m = hash.match(/^#\/post\/(.+)$/);
      if (m?.[1]) {
        setRoute({ name: 'post', id: decodeURIComponent(m[1]) });
      } else {
        setRoute({ name: 'feed' });
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const mergePosts = useCallback((incoming: Post[]) => {
    setPosts(prev => {
      const byId = new Map<string, Post>();
      for (const p of prev) byId.set(p.id, p);
      for (const p of incoming) byId.set(p.id, p);
      return Array.from(byId.values()).sort((a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0));
    });
  }, []);

  useEffect(() => {
    const loadInitialPosts = async () => {
      setIsLoading(true);
      try {
        const pageSize = 10;
        const page = await fetchTelegramPostsPage(pageSize, 0);
        if (page.posts.length > 0) {
          mergePosts(page.posts);
          setOffset(page.posts.length);
          setHasMore(page.hasMore);
        } else {
          mergePosts(MOCK_POSTS);
          setOffset(MOCK_POSTS.length);
          setHasMore(false);
        }
      } catch (error) {
        mergePosts(MOCK_POSTS);
        setOffset(MOCK_POSTS.length);
        setHasMore(false);
      }
      setIsLoading(false);
    };
    
    loadInitialPosts();
  }, [mergePosts]);

  const fetchMorePosts = useCallback(async () => {
    if (!hasMore) return;
    setIsLoading(true);
    const pageSize = 10;
    const page = await fetchTelegramPostsPage(pageSize, offset);

    if (page.posts && page.posts.length > 0) {
      mergePosts(page.posts);
      setOffset(prev => prev + page.posts.length);
    }
    setHasMore(page.hasMore);
    setIsLoading(false);
  }, [hasMore, mergePosts, offset]);

  useEffect(() => {
    if (route.name !== 'feed') return;
    if (!loadMoreRef.current) return;

    const el = loadMoreRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first) return;
        if (first.isIntersecting && hasMore && !isLoading) {
          fetchMorePosts();
        }
      },
      { root: null, rootMargin: '600px 0px', threshold: 0 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [fetchMorePosts, hasMore, isLoading, route.name]);

  const openPost = useCallback((id: string) => {
    window.location.hash = `#/post/${encodeURIComponent(id)}`;
  }, []);

  const goHome = useCallback(() => {
    window.location.hash = '#/';
  }, []);

  const goAbout = useCallback(() => {
    window.location.hash = '#/about';
  }, []);

  const goShop = useCallback(() => {
    window.location.hash = '#/shop';
  }, []);

  const submitNewsletter = useCallback(async () => {
    const email = newsletterEmail.trim();
    if (!email) return;
    setNewsletterStatus('loading');
    setNewsletterMessage('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) {
        setNewsletterStatus('error');
        setNewsletterMessage(String((data as any)?.error ?? 'Error'));
        return;
      }
      setNewsletterStatus('success');
      setNewsletterMessage(lang === 'RU' ? 'ПОДПИСКА ОФОРМЛЕНА' : 'SUBSCRIBED');
      setNewsletterEmail('');
    } catch (e: any) {
      setNewsletterStatus('error');
      setNewsletterMessage(String(e?.message ?? e));
    }
  }, [lang, newsletterEmail]);

  if (route.name === 'post') {
    const post = posts.find(p => p.id === route.id);
    return (
      <main className="relative min-h-screen selection:bg-white selection:text-black">
        <DoubleBackground />
        <Header lang={lang} setLang={setLang} onAbout={goAbout} onHome={goHome} onShop={goShop} />
        <PostPage lang={lang} post={post} onBack={goHome} />
      </main>
    );
  }

  if (route.name === 'about') {
    return (
      <main className="relative min-h-screen selection:bg-white selection:text-black">
        <DoubleBackground />
        <Header lang={lang} setLang={setLang} onAbout={goAbout} onHome={goHome} onShop={goShop} />
        <AboutPage />
      </main>
    );
  }

  if (route.name === 'shop') {
    return (
      <main className="relative min-h-screen selection:bg-white selection:text-black">
        <DoubleBackground />
        <Header lang={lang} setLang={setLang} onAbout={goAbout} onHome={goHome} onShop={goShop} />
        <ShopPage onBack={goHome} />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen selection:bg-white selection:text-black">
      <DoubleBackground />
      <Header lang={lang} setLang={setLang} onAbout={goAbout} onHome={goHome} onShop={goShop} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <div className="relative z-20 flex flex-col justify-center items-center text-center">
        <div className="relative overflow-hidden mb-4">
          <h2 className={`text-6xl md:text-[10vw] font-pravoslavnaya font-black tracking-tighter transition-all duration-1000 ${hasScrolled ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
            {DICTIONARY.heroTitle[lang]}
          </h2>
        </div>
        <p className={`text-[10px] md:text-sm font-unbounded tracking-[0.5em] text-white/40 uppercase transition-all duration-1000 delay-100 ${hasScrolled ? 'opacity-0' : 'opacity-100'}`}>
          {DICTIONARY.heroSubtitle[lang]}
        </p>
        </div>
      </section>

      {/* Feed Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="flex flex-col">
          {posts.map((post, idx) => (
            <PostCard key={post.id} post={post} lang={lang} onReadMore={openPost} flip={idx % 2 === 1} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <div ref={loadMoreRef} className="h-1 w-full" />
          <div className="text-[10px] font-unbounded tracking-[0.3em] text-white/20 uppercase">
            {isLoading ? 'LOADING' : (hasMore ? '' : (lang === 'RU' ? 'КОНЕЦ' : 'END'))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-unbounded font-black">ПОНЕДЕЛЬНИК</h3>
            <p className="text-sm text-white/40 font-light leading-relaxed">
              {lang === 'RU' 
                ? "Цифровой архив визуальной культуры. Мы верим, что понедельник — это не начало конца, а начало творения." 
                : "A digital archive of visual culture. We believe that Monday is not the beginning of the end, but the beginning of creation."}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-unbounded tracking-widest text-white/20 uppercase">CONTACT</span>
            <a href="https://t.me/mondeydelnik" target="_blank" className="text-lg hover:text-white/60 transition-colors">@mondeydelnik</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-unbounded tracking-widest text-white/20 uppercase">NEWSLETTER</span>
            <div className="flex gap-2">
               <input 
                 type="email" 
                 placeholder="EMAIL" 
                 value={newsletterEmail}
                 onChange={(e) => {
                   setNewsletterEmail(e.target.value);
                   setNewsletterStatus('idle');
                   setNewsletterMessage('');
                 }}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') submitNewsletter();
                 }}
                 disabled={newsletterStatus === 'loading'}
                 className="bg-transparent border-b border-white/20 focus:border-white py-2 flex-grow outline-none text-sm font-unbounded"
               />
               <button
                 onClick={submitNewsletter}
                 disabled={newsletterStatus === 'loading'}
                 className="text-xs font-unbounded uppercase hover:text-white/60 disabled:opacity-40"
               >
                 SUBMIT
               </button>
            </div>
            {newsletterMessage ? (
              <div
                className={`text-[10px] font-unbounded tracking-widest uppercase ${newsletterStatus === 'success' ? 'text-white/30' : newsletterStatus === 'error' ? 'text-white/30' : 'text-white/20'}`}
              >
                {newsletterMessage}
              </div>
            ) : null}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-24 text-[10px] font-unbounded tracking-widest text-white/10 uppercase flex justify-between">
            <span>© 2024 MONDAY MAGAZINE</span>
        </div>
      </footer>
    </main>
  );
};

export default App;
