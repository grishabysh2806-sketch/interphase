import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../constants';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    // Если это ссылка наверх (логотип)
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Если это внешняя ссылка или телефон
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      window.location.href = href;
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Отступ для фиксированной шапки (немного больше высоты навбара для "воздуха")
      const headerOffset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-tropical-dark/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a 
            href="#" 
            onClick={(e) => handleScrollToSection(e, '#')}
            className="text-2xl font-serif font-bold text-tropical-sand tracking-tighter cursor-pointer"
          >
            388<span className="text-tropical-pink">.</span>nail
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="text-tropical-sand/80 hover:text-tropical-pink transition-colors font-medium text-sm tracking-wide uppercase cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleScrollToSection(e, '#contact')}
            className="px-5 py-2 rounded-full border border-tropical-pink text-tropical-pink hover:bg-tropical-pink hover:text-white transition-all duration-300 text-sm font-bold cursor-pointer"
          >
            Записаться
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-tropical-sand hover:text-tropical-pink"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-tropical-dark/95 backdrop-blur-xl absolute top-full left-0 w-full border-t border-white/10 h-screen">
          <div className="px-4 py-6 space-y-6 flex flex-col items-center justify-center h-3/4">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollToSection(e, link.href)}
                className="text-2xl text-tropical-sand font-serif hover:text-tropical-pink transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact"
              onClick={(e) => handleScrollToSection(e, '#contact')}
              className="mt-8 px-10 py-4 bg-tropical-pink text-white rounded-full font-bold shadow-lg shadow-tropical-pink/30 text-xl cursor-pointer"
            >
              Записаться Онлайн
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};