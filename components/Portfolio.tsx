import React, { useState, useRef, useEffect } from 'react';
import { ProjectItem } from '../types';
import { Reveal } from './Reveal';
import { RollingText } from './RollingText';

interface PortfolioProps {
  title: string;
  subtitle: string;
  outro?: string;
  visitLink?: string;
  items: ProjectItem[];
}

const ProjectMedia: React.FC<{ item: ProjectItem; hideMobileVideos: boolean }> = ({ item, hideMobileVideos }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(true);
  const [allowMotion, setAllowMotion] = useState(true);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);
  const [hasHover, setHasHover] = useState(true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverMedia = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => {
      const reduced = reduceMotion.matches;
      setCanAutoplay(!reduced);
      setAllowMotion(!reduced);
    };
    const updateHover = () => setHasHover(hoverMedia.matches);
    update();
    updateHover();
    if (reduceMotion.addEventListener) {
      reduceMotion.addEventListener('change', update);
      hoverMedia.addEventListener('change', updateHover);
    } else {
      reduceMotion.addListener(update);
      hoverMedia.addListener(updateHover);
    }
    return () => {
      if (reduceMotion.removeEventListener) {
        reduceMotion.removeEventListener('change', update);
        hoverMedia.removeEventListener('change', updateHover);
      } else {
        reduceMotion.removeListener(update);
        hoverMedia.removeListener(updateHover);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      const videos = [desktopVideoRef.current, mobileVideoRef.current].filter(Boolean) as HTMLVideoElement[];
      videos.forEach((video) => {
        video.pause();
        video.removeAttribute('src');
        video.load();
      });
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setShouldLoad(true);
        }
      },
      { rootMargin: '80px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const autoplayEnabled = canAutoplay && shouldLoad;
  const playbackEnabled = autoplayEnabled && isVisible;

  useEffect(() => {
    if (item.id === '7') {
      setShouldLoad(true);
    }
  }, [item.id]);

  useEffect(() => {
    const videos = [desktopVideoRef.current, mobileVideoRef.current].filter(Boolean) as HTMLVideoElement[];
    if (!videos.length) return;
    if (!playbackEnabled) {
      videos.forEach((video) => video.pause());
      return;
    }
    videos.forEach((video) => {
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => undefined);
      }
    });
  }, [isVisible, playbackEnabled]);

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allowMotion || !hasHover) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      setParallax({ x, y });
    });
  };

  const handlePointerEnter = () => {
    if (!hasHover) return;
    setIsHover(true);
  };

  const handlePointerLeave = () => {
    setIsHover(false);
    setParallax({ x: 0, y: 0 });
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
  };

  const motionX = allowMotion ? parallax.x : 0;
  const motionY = allowMotion ? parallax.y : 0;
  const motionEnabled = allowMotion && hasHover;
  const desktopTransform = `translate3d(${motionEnabled ? motionX : 0}px, ${motionEnabled ? motionY + (isHover ? -8 : 0) : 0}px, 0) scale(${isHover && motionEnabled ? 1.02 : 1})`;
  const mobileTransform = `translate3d(${motionEnabled ? motionX * -1.1 : 0}px, ${motionEnabled ? motionY * -1.1 + (isHover ? 6 : 0) : 0}px, 0) scale(${isHover && motionEnabled ? 1.03 : 1})`;
  const desktopCardClass = `relative overflow-hidden rounded-3xl border border-charcoal/10 dark:border-white/10 bg-white/70 dark:bg-charcoal/40 self-center shadow-[0_24px_70px_rgba(10,10,10,0.2)] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_55px_140px_rgba(10,10,10,0.5)]`;
  const mobileCardClass = `w-full md:w-full overflow-hidden rounded-3xl border border-charcoal/10 dark:border-white/10 bg-white/80 dark:bg-charcoal/60 self-center shadow-[0_18px_50px_rgba(10,10,10,0.25)] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-[0_45px_110px_rgba(10,10,10,0.45)]`;
  const desktopVideoClass = `w-full h-full aspect-[16/10] object-cover transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]`;
  const mobileVideoClass = `w-full h-full aspect-[9/16] object-cover transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]`;

  const hideOnMobile = hideMobileVideos && !hasHover;

  return (
    <div
      ref={containerRef}
      className={`portfolio-card ${isVisible ? 'portfolio-card--active' : ''} ${hideOnMobile ? 'hidden' : ''}`}
    >
      <div
        className="relative grid gap-6 md:gap-10 md:grid-cols-[1.05fr_0.55fr] items-center"
        onMouseMove={handlePointerMove}
        onMouseEnter={handlePointerEnter}
        onMouseLeave={handlePointerLeave}
      >
        <div className={desktopCardClass} style={{ transform: desktopTransform }}>
          <div className="portfolio-scanline absolute inset-0" />
          {shouldLoad ? (
            <video
              ref={desktopVideoRef}
              src={item.videoDesktopUrl}
              muted
              loop
              playsInline
              preload={item.id === '7' ? 'auto' : 'none'}
              autoPlay={autoplayEnabled && isVisible}
              className={desktopVideoClass}
            />
          ) : (
            <div className={desktopVideoClass} />
          )}
        </div>

        <div className={mobileCardClass} style={{ transform: mobileTransform }}>
          <div className="portfolio-scanline absolute inset-0" />
          {shouldLoad ? (
            <video
              ref={mobileVideoRef}
              src={item.videoMobileUrl}
              muted
              loop
              playsInline
              preload={item.id === '7' ? 'auto' : 'none'}
              autoPlay={autoplayEnabled && isVisible}
              className={mobileVideoClass}
            />
          ) : (
            <div className={mobileVideoClass} />
          )}
        </div>
      </div>
    </div>
  );
};

const DividerSnakeText: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const easingRef = useRef<number | null>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [allowMotion, setAllowMotion] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const targetRef = useRef(0);
  const [metrics, setMetrics] = useState({ viewport: 0, text: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowMotion(!reduceMotion.matches);
    update();
    if (reduceMotion.addEventListener) {
      reduceMotion.addEventListener('change', update);
      return () => reduceMotion.removeEventListener('change', update);
    }
    reduceMotion.addListener(update);
    return () => reduceMotion.removeListener(update);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;
    const updateTarget = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewport = window.innerHeight;
      const startOffset = viewport * 0.35;
      const total = rect.height + viewport + startOffset;
      targetRef.current = Math.min(Math.max((viewport + startOffset - rect.top) / total, 0), 1);
    };
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateTarget);
    };
    updateTarget();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !allowMotion) {
      setProgress(targetRef.current);
      return;
    }
    const animate = () => {
      setProgress((prev) => {
        const next = prev + (targetRef.current - prev) * 0.01;
        return Math.abs(next - targetRef.current) < 0.001 ? targetRef.current : next;
      });
      easingRef.current = requestAnimationFrame(animate);
    };
    easingRef.current = requestAnimationFrame(animate);
    return () => {
      if (easingRef.current) {
        cancelAnimationFrame(easingRef.current);
      }
    };
  }, [isActive, allowMotion]);

  useEffect(() => {
    const updateMetrics = () => {
      const viewport = window.innerWidth;
      const text = textRef.current?.getBoundingClientRect().width ?? 0;
      setMetrics({ viewport, text });
    };
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    let observer: ResizeObserver | null = null;
    if (textRef.current && 'ResizeObserver' in window) {
      observer = new ResizeObserver(updateMetrics);
      observer.observe(textRef.current);
    }
    return () => {
      window.removeEventListener('resize', updateMetrics);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
  const halfTravel = (metrics.viewport + metrics.text) / 2;
  const start = halfTravel;
  const end = -halfTravel;
  const translateX = allowMotion
    ? direction === 'right'
      ? start + (end - start) * eased
      : end + (start - end) * eased
    : 0;

  return (
    <div
      ref={containerRef}
      className="hidden md:block relative h-32 md:h-40 overflow-hidden w-screen left-1/2 -translate-x-1/2"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={textRef}
          className="font-display font-bold uppercase tracking-[0.35em] text-charcoal/30 dark:text-white/30 text-[clamp(48px,8vw,140px)] whitespace-nowrap"
          style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
        >
          INTERPHASE.ART
        </div>
      </div>
    </div>
  );
};

export const Portfolio: React.FC<PortfolioProps> = ({ title, subtitle, outro, items }) => {
  const [hideMobileVideos, setHideMobileVideos] = useState(false);

  return (
    <section className="py-24 bg-transparent relative transition-colors duration-500 overflow-visible w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-[36px] border border-charcoal/10 dark:border-white/10 bg-white/70 dark:bg-charcoal/30 overflow-hidden mb-24">
          <div className="relative z-10 grid gap-10 md:grid-cols-[1.05fr_0.95fr] items-center p-8 md:p-12">
            <div className="space-y-6">
              <RollingText
                text={title + "."}
                as="h2"
                className="text-4xl md:text-6xl font-display font-bold text-charcoal dark:text-white tracking-tighter"
              />
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                {subtitle}
              </p>
              <button
                type="button"
                onClick={() => setHideMobileVideos((prev) => !prev)}
                className="md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal/10 dark:border-white/10 bg-white/80 dark:bg-charcoal/60 text-xs uppercase tracking-[0.25em] text-charcoal/70 dark:text-white/70 transition-all duration-300 hover:text-brown dark:hover:text-neon hover:border-brown/40 dark:hover:border-neon/40"
              >
                {hideMobileVideos ? 'Показать видео' : 'Скрыть видео'}
              </button>
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-charcoal/60 dark:text-white/60">
                <span className="px-4 py-2 rounded-full border border-charcoal/10 dark:border-white/15 backdrop-blur-sm">
                  Visual Systems
                </span>
                <span className="px-4 py-2 rounded-full border border-charcoal/10 dark:border-white/15 backdrop-blur-sm">
                  Motion Preview
                </span>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[360px]">
              <div className="portfolio-orbit portfolio-orbit-lg" />
              <div className="portfolio-orbit portfolio-orbit-md" />
              <div className="portfolio-orbit portfolio-orbit-sm" />
              <div className="portfolio-core" />
              <div className="portfolio-spark" style={{ top: '12%', left: '20%' }} />
              <div className="portfolio-spark" style={{ top: '30%', left: '75%' }} />
              <div className="portfolio-spark" style={{ top: '58%', left: '62%' }} />
              <div className="portfolio-spark" style={{ top: '72%', left: '28%' }} />
              <div className="portfolio-spark" style={{ top: '45%', left: '45%' }} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:gap-6 pb-24">
          {items.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <React.Fragment key={item.id}>
                <div className="relative group py-6 md:py-8">
                  <div className="relative w-full">
                    <div className="relative grid gap-10 md:grid-cols-12 items-center rounded-[36px] px-4 sm:px-6 lg:px-10 py-10 md:py-16">
                      <div className={`md:col-span-8 order-2 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                        <ProjectMedia item={item} hideMobileVideos={hideMobileVideos} />
                      </div>
                      <div className={`md:col-span-4 order-1 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                        <div className="transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
                          <Reveal variant={isEven ? 'fade-left' : 'fade-right'} width="100%" duration={900}>
                            <div className="space-y-5">
                              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal/10 dark:border-white/10 bg-white/70 dark:bg-charcoal/60 text-xs uppercase tracking-[0.25em] text-charcoal/70 dark:text-white/70">
                                {item.category}
                              </div>
                              <h3 className="text-3xl md:text-4xl font-display font-bold text-charcoal dark:text-white">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </Reveal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {index < items.length - 1 && (
                  <>
                    <DividerSnakeText direction={isEven ? 'right' : 'left'} />
                    <div className="md:hidden h-px w-full bg-charcoal/10 dark:bg-white/10" />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {outro && (
          <Reveal variant="fade-up" width="100%">
            <div className="text-center mt-12 md:mt-24">
              <p className="text-lg md:text-2xl font-bold text-charcoal dark:text-white max-w-4xl mx-auto leading-relaxed">
                {outro}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};
