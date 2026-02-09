import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hammer, HardHat } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { openCallModal } = useModal();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Проекты', path: '/portfolio' },
    { name: 'Онлайн-Смета (AI)', path: '/estimator' },
    { name: 'Контакты', path: '/contacts' },
  ];

  return (
    <nav className="bg-construction-black text-white sticky top-0 z-50 shadow-lg border-b-4 border-construction-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="bg-construction-yellow p-2 rounded transform group-hover:rotate-12 transition-transform duration-300">
                <HardHat className="h-8 w-8 text-construction-black" />
              </div>
              <span className="font-bold text-2xl tracking-tighter uppercase">
                Строй<span className="text-construction-yellow">Мастер</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 uppercase tracking-wide
                  ${isActive(link.path) 
                    ? 'text-construction-yellow bg-white/10' 
                    : 'text-gray-300 hover:text-construction-yellow hover:bg-white/5'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
                onClick={openCallModal}
                className="bg-construction-yellow text-construction-black px-5 py-2.5 rounded font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <Hammer className="w-4 h-4" />
              <span>Заказать звонок</span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-construction-dark border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'text-construction-yellow bg-black/20'
                    : 'text-gray-300 hover:text-white hover:bg-black/20'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button 
                onClick={() => {
                    setIsOpen(false);
                    openCallModal();
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-construction-yellow hover:bg-black/20"
            >
                Заказать звонок
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;