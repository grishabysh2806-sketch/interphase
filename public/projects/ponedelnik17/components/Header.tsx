import React, { useEffect, useState } from 'react';
import { Language } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onAbout?: () => void;
  onHome?: () => void;
  onShop?: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, onAbout, onHome, onShop }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobileMenuOpen]);

  const handleGoShop = () => {
    setIsMobileMenuOpen(false);
    onShop?.();
  };

  const handleGoAbout = () => {
    setIsMobileMenuOpen(false);
    onAbout?.();
  };

  const handleGoHome = () => {
    setIsMobileMenuOpen(false);
    onHome?.();
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-4 py-5 md:px-12 md:py-8 flex justify-between items-center transition-all duration-500">
        <div className="flex flex-col">
          <h1
            onClick={handleGoHome}
            className={`text-xl md:text-2xl font-unbounded font-black tracking-tighter leading-none text-white ${onHome ? 'cursor-pointer transition-transform duration-200 ease-out hover:scale-[1.02]' : ''}`}
          >
            ПОНЕДЕЛЬНИК
          </h1>
          <span className="text-[7px] md:text-[8px] tracking-[0.35em] md:tracking-[0.4em] font-unbounded text-white/60 mt-1 uppercase">
            DIGITAL MAGAZINE
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-12 text-[10px] font-unbounded tracking-[0.2em]">
          <button onClick={onShop} className="hover:text-white/60 transition-all duration-200 ease-out hover:scale-105">SHOP</button>
          <button onClick={onAbout} className="hover:text-white/60 transition-all duration-200 ease-out hover:scale-105">ABOUT</button>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')}
            className="w-10 h-10 md:w-10 md:h-10 border border-white/20 rounded-full flex items-center justify-center hover:border-white transition-all duration-200 ease-out hover:scale-105 text-[10px] font-unbounded font-bold"
          >
            {lang}
          </button>
          <button
            className="md:hidden w-10 h-10 flex flex-col justify-center items-end gap-1 px-2 transition-transform duration-200 ease-out active:scale-95"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
              <span className={`w-6 h-[1px] bg-white transition-transform duration-200 ease-out origin-right ${isMobileMenuOpen ? '-rotate-45 translate-y-[3px]' : ''}`}></span>
              <span className={`w-4 h-[1px] bg-white transition-transform duration-200 ease-out origin-right ${isMobileMenuOpen ? 'rotate-45 -translate-y-[3px] w-6' : ''}`}></span>
          </button>
        </div>
      </header>

      <div
       className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ease-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
       onClick={() => setIsMobileMenuOpen(false)}
       aria-hidden={!isMobileMenuOpen}
     >
       <div className="absolute inset-0 bg-black/70 backdrop-blur" />
       <div
         className={`absolute top-0 right-0 h-full w-[78vw] max-w-xs bg-[#070707] border-l border-white/10 px-6 pt-24 pb-10 flex flex-col gap-6 transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
         onClick={(e) => e.stopPropagation()}
         role="dialog"
         aria-modal="true"
       >
         <button
           onClick={handleGoShop}
           className="text-left text-[12px] font-unbounded tracking-[0.25em] uppercase text-white/90 hover:text-white transition-all duration-200 ease-out hover:scale-[1.02] origin-left"
         >
           SHOP
         </button>
         <button
           onClick={handleGoAbout}
           className="text-left text-[12px] font-unbounded tracking-[0.25em] uppercase text-white/90 hover:text-white transition-all duration-200 ease-out hover:scale-[1.02] origin-left"
         >
           ABOUT
         </button>
         <div className="mt-auto pt-8 border-t border-white/10">
           <button
             onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')}
             className="w-full h-12 border border-white/20 rounded-md flex items-center justify-center hover:border-white transition-all duration-200 ease-out hover:scale-[1.01] text-[12px] font-unbounded font-bold tracking-[0.25em]"
           >
             {lang}
           </button>
         </div>
       </div>
     </div>
     </>
  );
};

export default Header;
