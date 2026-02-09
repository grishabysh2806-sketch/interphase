import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { IMAGES } from '../../constants';
import { ParallaxElement } from '../ui/ParallaxElement';

export const Hero: React.FC = () => {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    
    if (element) {
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
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-tropical-dark/60 via-tropical-dark/40 to-tropical-dark z-10" />
        <motion.img 
          src={IMAGES.heroBg} 
          alt="Tropical Background" 
          className="w-full h-full object-cover"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating Elements (Animals & Leaves) */}
      
      <ParallaxElement speed={-0.2} className="top-[15%] left-[-10%] z-20 opacity-60">
        <div className="w-[400px] h-[400px] bg-tropical-green/20 rounded-full blur-3xl"></div>
      </ParallaxElement>

      {/* Main Content */}
      <div className="relative z-30 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 border border-tropical-sand/30 rounded-full text-tropical-sand/80 text-sm tracking-widest mb-6 uppercase backdrop-blur-sm">
            Est. 2024 • Bali Vibes
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-tropical-sand mb-6 leading-tight">
            Твой Тропический <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tropical-pink via-tropical-coral to-tropical-gold italic pr-2">
              Рай
            </span>
            в Городе
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            388.nail — это больше, чем маникюр. Это мини-отпуск для твоих рук и души. Почувствуй атмосферу джунглей, не покидая мегаполиса.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a 
              href="#contact" 
              onClick={(e) => handleScrollToSection(e, 'contact')}
              className="px-8 py-4 bg-tropical-pink text-white rounded-full font-bold text-lg hover:bg-tropical-pink/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(219,39,119,0.5)] cursor-pointer"
            >
              Записаться на сеанс
            </a>
            <a 
              href="#services" 
              onClick={(e) => handleScrollToSection(e, 'services')}
              className="px-8 py-4 border border-tropical-sand/50 text-tropical-sand rounded-full font-bold text-lg hover:bg-tropical-sand/10 transition-all backdrop-blur-sm cursor-pointer"
            >
              Смотреть услуги
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 text-tropical-sand/70"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown size={32} />
      </motion.div>

      {/* Bottom Jungle Layer Parallax */}
      <ParallaxElement speed={-0.1} className="bottom-[-50px] left-0 w-full z-20">
         <div className="w-full h-32 bg-gradient-to-t from-tropical-dark to-transparent"></div>
      </ParallaxElement>
    </section>
  );
};