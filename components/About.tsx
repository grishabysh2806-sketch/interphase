
import React from 'react';
import { ArrowDown, Fingerprint, Globe, Sun, Moon, Check } from 'lucide-react';
import { AboutContent, Language } from '../types';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { RollingText } from './RollingText';

interface AboutProps {
  content: AboutContent;
  onScrollDown: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const About: React.FC<AboutProps> = ({ content, onScrollDown, lang, setLang, theme, toggleTheme }) => {
  const toggleLang = () => setLang(lang === 'en' ? 'ru' : 'en');

  return (
    <section className="py-24 relative overflow-hidden bg-white/50 dark:bg-black/50 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Text Content */}
        <div>
          <Reveal width="100%">
            <div className="flex items-center justify-center gap-3 mb-6">
                <Fingerprint className="text-brown dark:text-neon shrink-0" size={24} />
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-brown dark:text-neon">{content.subtitle}</span>
            </div>
            
            <RollingText 
                text={content.title}
                as="h2"
                className="text-4xl md:text-6xl font-display font-bold mb-8 text-charcoal dark:text-white leading-tight justify-center"
            />
          </Reveal>

          <Reveal delay={200} width="100%">
            <div className="space-y-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-16">
              <p>
                {content.description1}
              </p>
              <p>
                {content.description2}
              </p>
            </div>
          </Reveal>

          {/* Why Choose Us Section */}
          <Reveal delay={300} width="100%">
            <div className="mb-16">
               <RollingText 
                    text={content.whyChooseUs.title}
                    as="h3"
                    className="text-2xl font-display font-bold text-charcoal dark:text-white mb-8 justify-center"
                />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                {content.whyChooseUs.items.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-6 bg-white dark:bg-white/5 border border-charcoal/5 dark:border-white/5 rounded-xl shadow-sm hover:shadow-[0_10px_20px_-5px_rgba(193,155,118,0.15)] dark:hover:shadow-[0_10px_20px_-5px_rgba(204,255,0,0.1)] hover:-translate-y-1 hover:border-brown/30 dark:hover:border-neon/30 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-brown/10 dark:bg-neon/10 rounded-full shrink-0 group-hover:bg-brown/20 dark:group-hover:bg-neon/20 transition-colors">
                        <Check size={18} className="text-brown dark:text-neon" />
                      </div>
                      <div>
                        <h4 className="font-bold text-charcoal dark:text-white uppercase tracking-wide text-sm mb-2 group-hover:text-brown dark:group-hover:text-neon transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={400} width="100%">
             {/* Settings Controls */}
            <div className="flex justify-center items-center gap-6 mt-10 mb-2">
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal/10 dark:border-white/10 hover:border-brown dark:hover:border-neon transition-all duration-300 group bg-white/20 dark:bg-white/5"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? (
                        <Sun size={18} className="text-white group-hover:text-neon group-hover:rotate-12 transition-transform" />
                    ) : (
                        <Moon size={18} className="text-charcoal group-hover:text-brown group-hover:-rotate-12 transition-transform" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-white group-hover:text-brown dark:group-hover:text-neon">
                        {theme === 'dark' ? 'Light' : 'Dark'}
                    </span>
                </button>

                <div className="w-[1px] h-6 bg-charcoal/10 dark:bg-white/10"></div>

                <button 
                  onClick={toggleLang}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-charcoal/10 dark:border-white/10 hover:border-brown dark:hover:border-neon transition-all duration-300 group bg-white/20 dark:bg-white/5"
                >
                  <Globe size={18} className="text-charcoal dark:text-white group-hover:text-brown dark:group-hover:text-neon" />
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal dark:text-white group-hover:text-brown dark:group-hover:text-neon">
                    {lang === 'en' ? 'Russian' : 'English'}
                  </span>
                </button>
            </div>
          </Reveal>

          <Reveal delay={500} width="100%">
            <div className="mt-8 flex justify-center">
              <Button onClick={onScrollDown} variant="outline">
                  {content.cta} <ArrowDown size={18} />
              </Button>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};
