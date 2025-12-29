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

const ProjectPreview: React.FC<{ item: ProjectItem; visitLink?: string }> = ({ item, visitLink }) => {
    const [shouldLoad, setShouldLoad] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobileActive, setIsMobileActive] = useState(false);
    const [scale, setScale] = useState(1);
    
    const DESKTOP_WIDTH = 1440;
    const DESKTOP_HEIGHT = 900; // 16:10 aspect ratio based on 1440px width

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const currentWidth = containerRef.current.offsetWidth;
                setScale(currentWidth / DESKTOP_WIDTH);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '50px' }
        );

        const resizeObserver = new ResizeObserver(updateScale);

        if (containerRef.current) {
            observer.observe(containerRef.current);
            resizeObserver.observe(containerRef.current);
            updateScale();
        }

        return () => {
            observer.disconnect();
            resizeObserver.disconnect();
        };
    }, []);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    const handleInteraction = () => {
        setIsMobileActive(prev => !prev);
    };

    const btnText = visitLink || "СМОТРЕТЬ САЙТ";

    return (
        <div 
            ref={containerRef} 
            className="w-full h-full relative bg-charcoal/5 group-hover:scale-[1.02] transition-transform duration-500 will-change-transform overflow-hidden cursor-pointer"
            onClick={handleInteraction}
        >
            {(shouldLoad && item.liveUrl) ? (
                 <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                      style={{
                          width: `${DESKTOP_WIDTH}px`,
                          height: `${DESKTOP_HEIGHT}px`,
                          transform: `scale(${scale})`,
                          transformOrigin: 'top left',
                      }}
                 >
                    <iframe 
                        src={item.liveUrl}
                        title={item.title}
                        className="w-full h-full border-0 pointer-events-none bg-white"
                        loading="lazy"
                        onLoad={handleLoad}
                        sandbox="allow-scripts allow-same-origin" 
                    />
                 </div>
            ) : null}

            {(!isLoaded || !shouldLoad) && (
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/10 text-charcoal/50 z-0">
                    <span className="loading-spinner">Loading Preview...</span>
                </div>
            )}
             
             {/* Hover Overlay with Button */}
             <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-20 ${isMobileActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <a 
                    href={item.liveUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-neon text-charcoal font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:bg-white hover:scale-105 active:scale-95 shadow-lg flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()} // Prevent closing on click
                >
                    <span>{btnText}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </a>
             </div>
        </div>
    );
};

export const Portfolio: React.FC<PortfolioProps> = ({ title, subtitle, outro, visitLink, items }) => {
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);

    useEffect(() => {
        let animationFrameId: number;
        let time = 0;

        const animate = () => {
             time += 0.005; // Gentle speed
             
             items.forEach((_, index) => {
                 if (index === items.length - 1) return;
                 
                 const isEven = index % 2 === 0;
                 // Base control points
                 const baseCp1x = isEven ? 37.5 : 62.5;
                 const baseCp2x = isEven ? 62.5 : 37.5;
                 
                 // Add sine wave motion
                 // Phase shift per item for flowing effect
                 const offset1 = Math.sin(time + index) * 10;
                 const offset2 = Math.cos(time + index * 0.5) * 10;
                 
                 const cp1x = baseCp1x + offset1;
                 const cp2x = baseCp2x + offset2;

                 const d = isEven 
                    ? `M 37.5 0 C ${cp1x} 50, ${cp2x} 50, 62.5 100` 
                    : `M 62.5 0 C ${cp1x} 50, ${cp2x} 50, 37.5 100`;

                 const p1 = pathRefs.current[index * 3 + 0];
                 const p2 = pathRefs.current[index * 3 + 1];
                 const p3 = pathRefs.current[index * 3 + 2];
                 
                 if (p1) p1.setAttribute('d', d);
                 if (p2) p2.setAttribute('d', d);
                 if (p3) p3.setAttribute('d', d);
             });

             animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [items]);

  return (
    <section className="py-24 bg-transparent relative transition-colors duration-500 overflow-visible w-full">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal variant="fade-down" width="100%">
            <div className="flex flex-col items-end mb-24 text-right">
                <div className="backdrop-blur-sm rounded-lg mb-4">
                    <RollingText 
                    text={title + "."}
                    as="h2"
                    className="text-4xl md:text-6xl font-display font-bold text-charcoal dark:text-white tracking-tighter text-right justify-end"
                    />
                </div>
                <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                {subtitle}
                </p>
            </div>
        </Reveal>

        <div className="flex flex-col gap-12 md:gap-0 relative pb-24">
            {items.map((item, index) => {
                const isEven = index % 2 === 0; // Left
                const isLast = index === items.length - 1;
                
                return (
                <div key={item.id} className="relative w-full flex flex-col">
                    {/* Item Container */}
                    <div className={`w-full md:w-[75%] relative z-20 ${isEven ? 'self-start md:mr-auto' : 'self-end md:ml-auto'}`}>
                        <Reveal delay={index * 100} variant={isEven ? "fade-right" : "fade-left"} duration={1000} width="100%">
                            <div className="flex flex-col gap-6">
                                {/* Preview Window */}
                                <div className="group relative overflow-hidden rounded-xl aspect-[16/10] border-2 border-charcoal/10 dark:border-white/10 hover:border-neon dark:hover:border-neon transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(204,255,0,0.3)] hover:-translate-y-2 bg-charcoal/5 active:scale-[0.98]">
                                    <ProjectPreview item={item} visitLink={visitLink} />
                                </div>

                                {/* Mobile Button */}
                                <div className="md:hidden w-full mt-2">
                                     <a 
                                        href={item.liveUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-charcoal dark:bg-white text-white dark:text-charcoal font-bold py-3 px-6 rounded-lg uppercase tracking-wider text-center flex items-center justify-center gap-2"
                                    >
                                        <span>{visitLink || "СМОТРЕТЬ САЙТ"}</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </a>
                                </div>

                                {/* Description Block (Now Outside) */}
                                <div className={`flex flex-col ${isEven ? 'items-start text-left' : 'items-end text-right'}`}>
                                    <span className="text-sm font-bold uppercase tracking-wider mb-2 text-brown dark:text-neon">
                                        {item.category}
                                    </span>
                                    <h3 className="text-2xl md:text-4xl font-display font-bold text-charcoal dark:text-white mb-3">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
                                            {item.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Connector Chain to Next Item */}
                    {!isLast && (
                        <div className="relative h-[400px] w-full pointer-events-none overflow-visible -mt-64 -mb-32 z-0 hidden md:block">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id={`ribbon-gradient-${index}`} gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: 'var(--ribbon-from)', transition: 'stop-color 0.5s' }} /> 
                                        <stop offset="100%" style={{ stopColor: 'var(--ribbon-to)', transition: 'stop-color 0.5s' }} />
                                    </linearGradient>
                                    <filter id={`ribbon-glow-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="4" result="blur" />
                                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                    </filter>
                                </defs>
                                
                                {/* Glow Layer */}
                                <path 
                                    ref={(el) => { pathRefs.current[index * 3 + 0] = el }}
                                    d={isEven 
                                        ? "M 37.5 0 C 37.5 50, 62.5 50, 62.5 100" 
                                        : "M 62.5 0 C 62.5 50, 37.5 50, 37.5 100"}
                                    stroke={`url(#ribbon-gradient-${index})`}
                                    strokeWidth="12"
                                    fill="none"
                                    className="opacity-20"
                                    vectorEffect="non-scaling-stroke"
                                />

                                {/* Core Ribbon */}
                                <path 
                                    ref={(el) => { pathRefs.current[index * 3 + 1] = el }}
                                    d={isEven 
                                        ? "M 37.5 0 C 37.5 50, 62.5 50, 62.5 100" 
                                        : "M 62.5 0 C 62.5 50, 37.5 50, 37.5 100"}
                                    stroke={`url(#ribbon-gradient-${index})`}
                                    strokeWidth="3"
                                    fill="none"
                                    className="opacity-60"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round"
                                />

                                {/* Animated Energy Flow */}
                                <path 
                                    ref={(el) => { pathRefs.current[index * 3 + 2] = el }}
                                    d={isEven 
                                        ? "M 37.5 0 C 37.5 50, 62.5 50, 62.5 100" 
                                        : "M 62.5 0 C 62.5 50, 37.5 50, 37.5 100"}
                                    stroke="var(--ribbon-from)"
                                    strokeWidth="1"
                                    fill="none"
                                    strokeDasharray="20 30"
                                    className="animate-dash opacity-50 mix-blend-overlay"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    )}
                </div>
            )})}
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
