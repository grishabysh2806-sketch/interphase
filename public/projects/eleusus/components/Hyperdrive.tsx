import React from 'react';
import { motion } from 'framer-motion';

const Hyperdrive: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black touch-none"
    >
      <div className="absolute inset-0 bg-neo-purple opacity-50 mix-blend-overlay"></div>
      
      {/* Central bright light simulating hyperspace exit/entry */}
      <motion.div
        animate={{ scale: [0, 100], opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-20 h-20 bg-white rounded-full blur-2xl"
      />

      {/* Streaks */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[150vmax] h-[2px] md:h-[3px] bg-neo-cyan origin-center"
          style={{ 
            top: '50%', 
            left: '50%',
            rotate: `${i * 30}deg`
          }}
          initial={{ translateX: '-50%', scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 0.6, delay: Math.random() * 0.2, repeat: 0 }}
        />
      ))}
      
       <motion.div
        className="absolute text-neo-acid font-display text-xl md:text-4xl tracking-[0.2em] md:tracking-[0.5em] text-center w-full px-4"
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2] }}
        transition={{ duration: 1 }}
       >
         LOADING_ASSETS
       </motion.div>
    </motion.div>
  );
};

export default Hyperdrive;
