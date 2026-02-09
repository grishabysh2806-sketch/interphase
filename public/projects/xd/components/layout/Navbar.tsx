
import React, { useState, useEffect } from 'react';
import { Page } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

interface NavbarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItemClass = (page: Page) => 
    `cursor-pointer text-sm font-medium tracking-wide transition-all duration-300 hover:scale-105 ${
      currentPage === page 
        ? 'text-black dark:text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' 
        : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'
    }`;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-zinc-200 dark:border-white/10 py-4 shadow-xl shadow-black/5' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate(Page.HOME)}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
            <div className="relative bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-white dark:to-zinc-400 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:shadow-xl transition-all duration-500 border border-white/50 dark:border-white/20">
               <span className="text-black font-black text-sm font-serif">IV</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-900 dark:text-white font-bold tracking-tight text-lg leading-none group-hover:text-blue-600 dark:group-hover:text-zinc-200 transition-colors">Интернационал</span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-500 tracking-[0.2em] uppercase">Школа языков</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <span onClick={() => onNavigate(Page.HOME)} className={navItemClass(Page.HOME)}>Главная</span>
          <span onClick={() => onNavigate(Page.COURSES)} className={navItemClass(Page.COURSES)}>Курсы</span>
          <span onClick={() => onNavigate(Page.ABOUT)} className={navItemClass(Page.ABOUT)}>О школе</span>
        </div>

        {/* CTA & Auth */}
        <div className="hidden md:flex items-center gap-4">
           {/* Theme Toggle */}
           <button 
             onClick={toggleTheme}
             className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
           >
             {theme === 'dark' ? (
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             ) : (
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
             )}
           </button>

           <a 
             href="https://t.me/mondeydelnik" 
             target="_blank" 
             rel="noopener noreferrer"
             className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300 hover:scale-110 group"
           >
             <svg className="w-5 h-5 group-hover:-rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.638z"/></svg>
           </a>
           
           {user ? (
             <div 
                onClick={() => onNavigate(Page.DASHBOARD)}
                className="flex items-center gap-3 cursor-pointer bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 px-4 py-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
             >
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold text-white dark:text-black">
                   {user.name[0]}
                </div>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-200">Кабинет</span>
             </div>
           ) : (
             <button 
               onClick={() => onNavigate(Page.AUTH)} 
               className="text-xs bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-105 transition-all duration-300 shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
             >
               Войти
             </button>
           )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-black dark:text-white cursor-pointer z-50 relative" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center gap-8 animate-fade-up visible">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100 via-white to-white dark:from-blue-900/20 dark:via-black dark:to-black -z-10"></div>
           
           <span onClick={() => { onNavigate(Page.HOME); setMobileMenuOpen(false); }} className="text-3xl text-zinc-900 dark:text-white font-bold cursor-pointer hover:text-blue-500 transition-colors">Главная</span>
           <span onClick={() => { onNavigate(Page.COURSES); setMobileMenuOpen(false); }} className="text-3xl text-zinc-900 dark:text-white font-bold cursor-pointer hover:text-blue-500 transition-colors">Курсы</span>
           <span onClick={() => { onNavigate(Page.ABOUT); setMobileMenuOpen(false); }} className="text-3xl text-zinc-900 dark:text-white font-bold cursor-pointer hover:text-blue-500 transition-colors">О школе</span>
           
           {user ? (
              <span onClick={() => { onNavigate(Page.DASHBOARD); setMobileMenuOpen(false); }} className="text-3xl text-blue-500 font-bold cursor-pointer">Личный кабинет</span>
           ) : (
              <span onClick={() => { onNavigate(Page.AUTH); setMobileMenuOpen(false); }} className="text-3xl text-zinc-900 dark:text-white font-bold cursor-pointer hover:text-blue-500 transition-colors">Войти / Регистрация</span>
           )}

           <div className="flex gap-8 mt-8 items-center">
             <button onClick={toggleTheme} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
               {theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
             </button>
             <a href="https://t.me/mondeydelnik" className="text-blue-500 font-medium text-lg">Telegram</a>
           </div>
        </div>
      )}
    </nav>
  );
};
