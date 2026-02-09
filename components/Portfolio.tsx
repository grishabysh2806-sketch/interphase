import React, { useState, useRef, useEffect } from 'react';
import { ProjectItem } from '../types';
import { Reveal } from './Reveal';
import { RollingText } from './RollingText';
import { supabase } from '../services/supabaseClient';
import { X, Loader, ExternalLink, Play, Maximize, Minimize, Smartphone, Monitor } from 'lucide-react';
import { createPortal } from 'react-dom';

interface PortfolioProps {
  title: string;
  subtitle: string;
  outro?: string;
  items: ProjectItem[];
  visitLink?: string;
  lang?: 'en' | 'ru';
}

// --- Preview Modal ---
const PreviewModal: React.FC<{ url: string; title: string; image?: string; onClose: () => void; lang: 'en' | 'ru' }> = ({ url, title, onClose, lang }) => {
  const [loading, setLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Reset loading and zoom when URL changes
  useEffect(() => {
    setLoading(true);
    setIsZoomed(false);
  }, [url]);

  // Calculate Scale for Iframe
  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (isZoomed) {
        setScale(1);
        return;
      }

      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setScale(width / 1280);
      }
    };

    const observer = new ResizeObserver(() => {
      window.requestAnimationFrame(updateScale);
    });

    observer.observe(containerRef.current);
    updateScale();

    return () => observer.disconnect();
  }, [isZoomed]);

  const t = {
    loading: lang === 'ru' ? 'Загрузка...' : 'Loading Experience...',
    close: lang === 'ru' ? 'Закрыть' : 'Close',
    desktop: lang === 'ru' ? 'Настольная версия' : 'Desktop View',
    mobile: lang === 'ru' ? 'Мобильная версия' : 'Mobile View'
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[95vw] h-[95vh] bg-zinc-950 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10 ring-1 ring-white/5 z-10 transition-all duration-300">

        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 bg-zinc-900 border-b border-white/5 shrink-0 z-20">
          {/* Left: Zoom Toggle (Mobile Only) */}
          <div className="w-12 sm:w-[140px] flex items-center">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="group flex items-center justify-center gap-2 w-10 h-10 sm:w-auto sm:px-4 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 transition-all duration-300 border border-white/10"
              title={isZoomed ? t.desktop : t.mobile}
            >
              {isZoomed ? <Monitor size={18} /> : <Smartphone size={18} />}
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">{isZoomed ? t.desktop : t.mobile}</span>
            </button>
          </div>

          {/* Center: Title (Optional, hidden on mobile usually to save space, or just empty) */}
          <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            {/* Can add title here if needed, but keeping clean for now */}
          </div>

          {/* Right: Close Button */}
          <div className="w-12 sm:w-[140px] flex items-center justify-end">
            <button
              onClick={onClose}
              className="group flex items-center justify-center gap-2 w-8 h-8 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-zinc-400 transition-all duration-200 border border-white/5"
            >
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">{t.close}</span>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden bg-[#0c0c0c] flex flex-col items-center justify-center p-2 sm:p-4">

          {/* Project Title Label (Background) */}
          <div className="absolute top-8 left-0 right-0 text-center pointer-events-none z-0 opacity-20 select-none overflow-hidden">
            <h3 className="text-zinc-500 font-display font-bold text-[10vw] leading-none uppercase tracking-tighter whitespace-nowrap opacity-50">{title}</h3>
          </div>

          {/* Frame Container */}
          <div
            ref={containerRef}
            className={`relative transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] z-10 flex flex-col shadow-2xl ${isZoomed
              ? 'w-full md:w-[400px] h-full rounded-xl border border-white/10 bg-zinc-950 overflow-auto mx-auto'
              : 'w-full aspect-video rounded-lg border border-white/10 bg-zinc-950 overflow-hidden'
              }`}
          >
            {/* Show Loader */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 z-20">
                <div className="flex flex-col items-center gap-4">
                  <Loader className="animate-spin text-indigo-500" size={32} />
                  <span className="text-zinc-500 text-xs uppercase tracking-wider font-semibold">{t.loading}</span>
                </div>
              </div>
            )}

            {/* Scrollable Content Wrapper */}
            <div className={`w-full h-full relative`}>
              {/* Iframe */}
              <iframe
                ref={iframeRef}
                src={url}
                style={{
                  width: isZoomed ? '100%' : '1280px',
                  height: isZoomed ? '100%' : '720px',
                  minHeight: isZoomed ? '720px' : undefined,
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  pointerEvents: 'auto',
                  backgroundColor: '#0c0c0c'
                }}
                className={`bg-zinc-950 transition-opacity duration-300 w-full min-h-full ${loading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setLoading(false)}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={`${title} Preview`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};



// --- Single Project Card ---
const ProjectCard: React.FC<{
  item: ProjectItem;
  onClick: () => void;
  priority: boolean;
  actionLabel: string;
}> = ({ item, onClick, priority, actionLabel }) => {
  const [isHover, setIsHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col gap-4"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Media Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-800 border border-charcoal/10 dark:border-white/10 shadow-sm transition-all duration-300 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] group-hover:-translate-y-1">

        {/* Iframe Preview - Lazy Loaded */}
        {/* Static Preview Image */}
        <div className="absolute inset-0 w-full h-full bg-zinc-900">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              loading={priority ? "eager" : "lazy"}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-700">
              <Loader className="animate-spin text-zinc-700" size={24} />
            </div>
          )}
        </div>

        {/* Overlay Button */}
        <div className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 transition-opacity duration-300 ${isHover ? 'opacity-100' : ''}`}>
          <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-bold uppercase tracking-wider hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-xl flex items-center gap-2">
            {actionLabel}
            <ExternalLink size={16} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-charcoal/50 dark:text-white/50">{item.category}</span>
          <ExternalLink size={14} className="text-charcoal/30 dark:text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-xl md:text-2xl font-display font-bold text-charcoal dark:text-white group-hover:text-brown dark:group-hover:text-neon transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
};

export const Portfolio: React.FC<PortfolioProps> = ({ title, subtitle, items, lang = 'en', visitLink }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section className="py-24 bg-transparent relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-3xl">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-brown dark:bg-neon rounded-full" />
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-brown dark:text-neon">Selected Works</span>
              </div>
            </Reveal>
            <RollingText
              text={title}
              as="h2"
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-charcoal dark:text-white tracking-tighter mb-6"
            />
            <Reveal delay={0.1}>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-2xl">
                {subtitle}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1} width="100%">
              <ProjectCard
                item={item}
                onClick={() => item.visitLink && setSelectedProject(item)}
                priority={index < 2}
                actionLabel={visitLink || (lang === 'ru' ? 'Смотреть сайт' : 'Visit Site')}
              />
            </Reveal>
          ))}
        </div>

      </div>

      {/* Modal */}
      {selectedProject && selectedProject.visitLink && (
        <PreviewModal
          url={selectedProject.visitLink}
          title={selectedProject.title}
          image={selectedProject.imageUrl}
          onClose={() => setSelectedProject(null)}
          lang={lang}
        />
      )}
    </section>
  );
};
