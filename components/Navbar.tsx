
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Moon, Sun, ArrowRight } from 'lucide-react';
import { NavItem, Language, UIContent } from '../types';
import { Logo } from './Logo';

interface NavbarProps {
  items: NavItem[];
  lang: Language;
  setLang: (lang: Language) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  ui: UIContent;
}

export const Navbar: React.FC<NavbarProps> = ({ items, lang, setLang, theme, toggleTheme, ui }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const toggleLang = () => setLang(lang === 'en' ? 'ru' : 'en');

  return (
    <>
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-bone/90 dark:bg-dark/90 backdrop-blur-md border-b border-charcoal/5 dark:border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-50 text-2xl font-display font-bold tracking-tighter text-charcoal dark:text-white hover:text-brown dark:hover:text-neon transition-colors duration-300">
            INTERPHASE<span className="text-brown dark:text-neon animate-pulse">.</span>
          </Link>

          {/* Desktop Menu */}
          <div 
            className="hidden md:flex items-center space-x-8"
            onMouseLeave={() => setHoveredItem(null)}
          >
            {items.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onMouseEnter={() => setHoveredItem(item.id)}
                className={`relative px-2 py-1 text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                    hoveredItem && hoveredItem !== item.id 
                        ? 'text-gray-400 blur-[1px] scale-95' 
                        : 'text-charcoal dark:text-white scale-100'
                } hover:text-brown dark:hover:text-neon`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brown dark:bg-neon transition-all duration-300 ${
                    hoveredItem === item.id ? 'opacity-100 w-full h-[1px] rounded-none blur-[2px]' : 'opacity-0'
                }`} />
              </Link>
            ))}
            
            <div className="flex items-center gap-3 pl-4 border-l border-gray-300 dark:border-gray-700">
                <button
                    onClick={toggleTheme}
                    className="p-2 text-charcoal dark:text-white hover:text-brown dark:hover:text-neon transition-all hover:rotate-12 hover:scale-110"
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button 
                  onClick={toggleLang}
                  className="flex items-center gap-1 text-xs font-bold text-charcoal dark:text-white border border-charcoal/20 dark:border-white/20 px-3 py-1 rounded-full hover:border-brown dark:hover:border-neon hover:text-brown dark:hover:text-neon transition-all hover:scale-105"
                >
                  <Globe size={14} />
                  {lang.toUpperCase()}
                </button>
            </div>
          </div>

          {/* Mobile Burger - Custom Animated */}
          <div className="md:hidden relative z-50">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="group flex flex-col justify-center items-end w-12 h-12 gap-[6px] p-2 focus:outline-none"
            >
                <span className={`h-[2px] w-full bg-charcoal dark:bg-white transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[8px] bg-brown dark:bg-neon' : ''}`} />
                <span className={`h-[2px] w-3/4 bg-charcoal dark:bg-white transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''} group-hover:w-full`} />
                <span className={`h-[2px] w-1/2 bg-charcoal dark:bg-white transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[8px] w-full bg-brown dark:bg-neon' : ''} group-hover:w-full`} />
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Full Screen Mobile Menu Overlay */}
    <div 
        className={`fixed inset-0 z-40 bg-bone dark:bg-dark transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
    >
        {/* Decorative Grid Floor in Menu */}
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40 pointer-events-none">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(150,75,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(150,75,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(204,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(204,255,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-12">
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={item.id} className="overflow-hidden">
                        <Link
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`block text-5xl sm:text-7xl font-display font-bold uppercase tracking-tight transition-transform duration-700 ease-out hover:text-stroke-brown dark:hover:text-stroke-neon ${
                                isOpen ? 'translate-y-0' : '-translate-y-[120%]'
                            }`}
                            style={{ 
                                transitionDelay: `${200 + index * 100}ms`,
                                WebkitTextStroke: location.pathname === item.path ? '0px' : '1px currentColor',
                                WebkitTextFillColor: location.pathname === item.path ? (theme === 'dark' ? '#CCFF00' : '#964B00') : 'transparent',
                                color: location.pathname === item.path ? (theme === 'dark' ? '#CCFF00' : '#964B00') : 'inherit'
                            }}
                        >
                           <span className="flex items-center gap-4 group">
                                <span className="text-sm font-mono opacity-50 translate-y-2 group-hover:text-brown dark:group-hover:text-neon">0{index + 1}</span>
                                <span className="text-charcoal dark:text-white group-hover:pl-4 transition-all duration-500">{item.label}</span>
                                <ArrowRight className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-brown dark:text-neon w-8 h-8 md:w-12 md:h-12" />
                           </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div 
                className={`mt-12 flex items-center justify-between border-t border-charcoal/10 dark:border-white/10 pt-8 transition-all duration-700 delay-500 ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="flex gap-6">
                    <button onClick={toggleTheme} className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-charcoal dark:hover:text-white">
                        {theme === 'dark' ? ui.lightMode : ui.darkMode}
                    </button>
                    <button onClick={toggleLang} className="text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-charcoal dark:hover:text-white">
                        {lang === 'en' ? 'Russian' : 'English'}
                    </button>
                </div>
                
                <div className="text-sm font-mono text-gray-400">
                    INTERPHASE © {new Date().getFullYear()}
                </div>
            </div>
        </div>
    </div>
    </>
  );
};
