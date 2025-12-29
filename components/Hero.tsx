import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './Button';
import { Reveal } from './Reveal';
import { RollingText } from './RollingText';

interface HeroProps {
  title: string;
  subtitle: string;
  cta: string;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, cta, onExplore }) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Trigger animation on mount
    
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            setScrollY(window.scrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations
  const gridTranslateY = scrollY * 0.5; // Moves slower than scroll
  const textOpacity = Math.max(0, 1 - scrollY / 600); // Fades out
  const textScale = Math.max(0.9, 1 - scrollY / 2000); // Slight shrink
  const textTranslateY = scrollY * 0.3; // Text moves slightly down

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Local 3D Grid Background with Parallax */}
      <div className="perspective-container">
         <div 
            className="grid-floor-container opacity-60 dark:opacity-100 transition-opacity duration-500 will-change-transform"
            style={{ transform: `rotateX(60deg) translateY(${gridTranslateY}px) scale(2)` }}
         >
             <div className="grid-floor animate-grid-flow"></div>
         </div>
      </div>

      {/* Horizon Fade Masks */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-bone dark:from-dark via-bone/90 dark:via-dark/90 to-transparent z-1 pointer-events-none transition-colors duration-500"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-bone dark:from-dark via-bone/50 dark:via-dark/50 to-transparent z-1 pointer-events-none transition-colors duration-500"></div>

      <div 
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center will-change-transform"
        style={{ 
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px) scale(${textScale})` 
        }}
      >
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
            {isMounted && (
                <RollingText 
                    text={title.toUpperCase()} 
                    as="h1" 
                    className="hero-title-gradient text-5xl md:text-8xl font-display font-bold leading-tight tracking-tighter drop-shadow-2xl justify-center text-center w-full"
                    stagger={0.03}
                    duration={1}
                />
            )}
        </div>
        
        <Reveal delay={800} variant="fade-up">
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 font-light leading-relaxed backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-charcoal/5 dark:border-white/10 hover:border-brown/30 dark:hover:border-neon/30 transition-all duration-300 hover:shadow-lg">
            {subtitle}
          </p>
        </Reveal>

        <Reveal delay={1000} variant="scale-up">
          <div className="flex justify-center">
            <Button onClick={onExplore} className="shadow-xl hover:shadow-2xl hover:shadow-brown/20 dark:hover:shadow-neon/20">
              {cta} <ArrowRight size={20} />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};