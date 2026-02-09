import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import PixelHero from '../components/3d/PixelHero';
import { ArrowRight, Monitor, Cpu, Gamepad2, Trophy, Crosshair, Sparkles } from 'lucide-react';

// Use casted constants to avoid JSX.IntrinsicElements errors in strict environments
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

const Home: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const th = t.home;
  const navigate = useNavigate();

  const services = [
    { icon: <Monitor size={40} />, title: '540Hz Visuals', desc: 'ASUS ROG Swift Pro. See the frame before it happens.' },
    { icon: <Cpu size={40} />, title: 'Extreme Hardware', desc: 'RTX 4090 & i9-14900K. Zero bottlenecks. Pure power.' },
    { icon: <Gamepad2 size={40} />, title: 'Pro Peripherals', desc: 'Logitech G Pro X Superlight 2 & Wooting 60HE.' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col w-full"
    >
      {/* Hero Section */}
      <section className="relative h-[90vh] md:h-[90vh] min-h-[600px] w-full overflow-hidden border-b-4 border-neo-acid">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
            <AmbientLight intensity={0.5} />
            <PointLight position={[10, 10, 10]} />
            <PixelHero />
          </Canvas>
        </div>
        
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 bg-black/30 backdrop-blur-sm">
          <motion.h1 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-4xl sm:text-6xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-neo-pink via-white to-neo-cyan glitch-text leading-tight"
            data-text={t.hero.title}
          >
            {t.hero.title}
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm sm:text-xl md:text-2xl font-mono text-neo-acid max-w-xs sm:max-w-2xl bg-black px-4 py-2"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.button
            onClick={() => navigate('/pricing')}
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.9 }}
            className="mt-8 md:mt-12 px-6 md:px-8 py-3 md:py-4 bg-neo-acid text-black font-display font-bold text-lg md:text-xl uppercase tracking-widest hover:bg-white transition-colors flex items-center gap-2 clip-path-polygon"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)'}}
          >
            {t.hero.cta} <ArrowRight size={20} />
          </motion.button>
        </div>
      </section>

      {/* Services Marquee */}
      <div className="bg-neo-acid text-black py-4 overflow-hidden whitespace-nowrap border-y-4 border-black">
        <div className="inline-block animate-[scroll_20s_linear_infinite]">
          {[...Array(10)].map((_, i) => (
             <span key={i} className="text-2xl font-display font-bold mx-8">
               CS2 /// DOTA 2 /// VALORANT /// WARZONE /// APEX LEGENDS ///
             </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Services Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -20, boxShadow: '0px 0px 20px #ff00ff' }}
                className="bg-gray-900 border border-neo-purple p-8 rounded-none relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neo-purple to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                
                {/* Animated Icon Wrapper */}
                <motion.div 
                  className="relative z-10 text-neo-cyan mb-4 inline-block"
                  animate={{ 
                    y: [0, -5, 0],
                    scale: [1, 1.1, 1],
                    filter: ['drop-shadow(0 0 0px #00ffff)', 'drop-shadow(0 0 5px #00ffff)', 'drop-shadow(0 0 0px #00ffff)']
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.5 // Stagger animations
                  }}
                >
                  {s.icon}
                </motion.div>

                <h3 className="relative z-10 text-2xl font-display font-bold mb-2 text-white">{s.title}</h3>
                <p className="relative z-10 text-gray-400 font-mono">{s.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Arsenal / Hardware Section */}
      <section className="py-24 bg-neo-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
           <motion.h2 
             initial={{ x: -100, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
             viewport={{ once: true }}
             className="text-5xl md:text-8xl font-display font-bold text-transparent text-stroke stroke-white mb-16"
             style={{ WebkitTextStroke: '1px #ccff00', color: 'transparent' }}
           >
             {th.arsenalTitle}
           </motion.h2>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {th.arsenal.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ rotateX: 90, opacity: 0 }}
                  whileInView={{ rotateX: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.05, rotateY: 10, zIndex: 10 }}
                  className="bg-gray-900/80 p-6 border-t-2 border-neo-cyan hover:bg-neo-purple/30 transition-all perspective-1000"
                >
                  <div className="mb-4 text-neo-pink font-mono text-sm tracking-widest">{item.type}</div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">{item.name}</h3>
                  <div className="h-1 w-12 bg-neo-acid mb-4"></div>
                  <p className="text-gray-400 font-mono text-sm">{item.specs}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Tournaments Section */}
      <section className="py-24 border-y border-neo-purple bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="text-4xl md:text-6xl font-display font-bold text-white"
               >
                 <Trophy className="inline-block mr-4 text-neo-acid mb-2" size={48} />
                 {th.tournamentsTitle}
               </motion.h2>
               <div className="animate-pulse text-neo-pink font-mono mt-4 md:mt-0">LIVE UPDATES ///</div>
            </div>

            <div className="space-y-4">
              {th.tournaments.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  className="flex flex-col md:flex-row items-center justify-between bg-black/50 border border-gray-800 p-6 backdrop-blur-md group"
                >
                   <div className="flex items-center gap-6 w-full md:w-1/3">
                      <Crosshair className="text-gray-500 group-hover:text-neo-cyan transition-colors" />
                      <div>
                        <h3 className="text-2xl font-display font-bold text-white">{t.game}</h3>
                        <span className="text-neo-acid font-mono text-xs">{t.status}</span>
                      </div>
                   </div>
                   <div className="font-mono text-gray-300 w-full md:w-1/3 text-center md:text-left py-2 md:py-0">{t.date}</div>
                   <div className="text-2xl font-display font-bold text-neo-pink w-full md:w-1/3 text-right">{t.prize}</div>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* Membership / Big Vibe */}
      <section className="py-32 relative overflow-hidden">
        {/* Background pulsing effect */}
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-neo-purple via-black to-neo-purple"
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block p-4 border-2 border-neo-acid mb-8 rounded-full"
          >
             <Sparkles className="text-neo-acid w-12 h-12" />
          </motion.div>
          
          <h2 className="text-5xl md:text-8xl font-display font-black text-white mb-8 leading-tight">
            {th.membershipTitle}
          </h2>
          
          <motion.button
            onClick={() => navigate('/pricing')}
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px #00ffff" }}
            whileTap={{ scale: 0.95 }}
            className="bg-neo-cyan text-black text-2xl font-bold font-display py-6 px-12 rounded-none hover:bg-white transition-all uppercase tracking-widest clip-path-polygon"
            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 80%, 90% 100%, 0 100%, 0 20%)'}}
          >
             {th.membershipCta}
          </motion.button>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;