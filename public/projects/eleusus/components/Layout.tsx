import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import StarField from './3d/StarField';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Menu, Globe, X, Send } from 'lucide-react';

// Use casted constants to avoid JSX.IntrinsicElements errors in strict environments
const Color = 'color' as any;

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (l: Language) => void;
  triggerHyperdrive: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, lang, setLang, triggerHyperdrive }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const t = TRANSLATIONS[lang].nav;

  // Track scroll speed to affect stars
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollSpeed = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY);
      setScrollSpeed(1 + speed * 0.1); // Base speed 1, increase on scroll
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollSpeed);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (path: string) => {
    if (location.pathname !== path) {
      triggerHyperdrive();
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-neo-black text-white font-body selection:bg-neo-pink selection:text-black">
      {/* Background 3D Layer - Temporarily disabled for debugging
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 500], fov: 75 }}>
          <Color attach="background" args={['#050505']} />
          <StarField speed={scrollSpeed} />
        </Canvas>
      </div>
      */}

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b-2 border-neo-purple bg-neo-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavClick('/')}>
               <Link to="/" className="text-3xl font-display font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neo-acid to-neo-cyan hover:from-neo-pink hover:to-neo-acid transition-all duration-500">
                ELEUSIS
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  { name: t.work, path: '/work' },
                  { name: t.pricing, path: '/pricing' },
                  { name: t.legal, path: '/legal' },
                  { name: t.faq, path: '/faq' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={(e) => {
                       e.preventDefault();
                       handleNavClick(item.path);
                       setTimeout(() => { window.location.hash = item.path }, 800);
                    }}
                    className="text-gray-300 hover:text-neo-acid hover:scale-110 px-3 py-2 rounded-md text-sm font-bold font-display transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Language & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setLang(lang === Language.EN ? Language.RU : Language.EN)}
                className="p-2 border border-neo-cyan text-neo-cyan hover:bg-neo-cyan hover:text-black transition-colors"
              >
                <Globe size={20} />
                <span className="sr-only">Switch Language</span>
              </button>
              
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  {isMenuOpen ? <X /> : <Menu />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-neo-purple/90 backdrop-blur-xl border-b border-neo-acid"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                 {[
                  { name: t.work, path: '/work' },
                  { name: t.pricing, path: '/pricing' },
                  { name: t.legal, path: '/legal' },
                  { name: t.faq, path: '/faq' },
                ].map((item) => (
                   <Link
                    key={item.name}
                    to={item.path}
                    onClick={(e) => {
                       e.preventDefault();
                       handleNavClick(item.path);
                       setTimeout(() => { window.location.hash = item.path }, 800);
                    }}
                    className="text-gray-300 hover:text-neo-pink block px-3 py-2 rounded-md text-base font-medium font-display"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content */}
      <main className="relative z-10 pt-20 min-h-screen flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-neo-black border-t border-neo-purple mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
             <div>
               <h3 className="text-xl font-display text-neo-acid mb-4">ELEUSIS</h3>
               <p className="text-gray-400 text-sm">Forging the esports future since 2024.</p>
             </div>
             <div>
                <h3 className="text-xl font-display text-neo-pink mb-4">CONTACT</h3>
                <p className="text-gray-400 text-sm">admin@eleusis.gg</p>
                <p className="text-gray-400 text-sm">+1 (000) 555-FRAG</p>
             </div>
             <div>
                <h3 className="text-xl font-display text-neo-cyan mb-4">CONNECT</h3>
                <div className="flex justify-center md:justify-start space-x-6">
                  <a href="https://t.me/mondeydelnik" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-neo-cyan hover:text-white transform hover:scale-105 transition-transform bg-neo-purple/30 px-4 py-2 rounded-full border border-neo-cyan/30">
                     <Send size={18} />
                     <span>@mondeydelnik</span>
                  </a>
                </div>
             </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800">
             <p className="text-center text-base text-gray-500 font-display">
              &copy; {new Date().getFullYear()} ELEUSIS CYBER CLUB. All rights reserved. Do not cheat.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;