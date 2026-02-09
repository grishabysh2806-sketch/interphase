import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number; // Negative for upward movement, positive for downward relative to scroll
  className?: string;
  offset?: number;
  zIndex?: number;
}

export const ParallaxElement: React.FC<ParallaxElementProps> = ({ 
  children, 
  speed = 0.5, 
  className = "",
  offset = 0,
  zIndex = 10
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yRange = [offset, offset - (300 * speed)]; // Calculate movement distance
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  
  // Add some spring physics to smooth it out
  const springY = useSpring(y, { stiffness: 400, damping: 90 });

  return (
    <motion.div 
      ref={ref}
      style={{ y: springY, zIndex }}
      className={`absolute pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface TropicalAnimalProps {
  src: string;
  alt: string;
  speed: number;
  className: string;
  size?: string;
  floating?: boolean;
  imageClassName?: string;
  containerClassName?: string;
}

export const TropicalAnimal: React.FC<TropicalAnimalProps> = ({ 
  src, 
  alt, 
  speed, 
  className, 
  size = "w-48 h-48",
  floating = false,
  imageClassName = "",
  containerClassName = ""
}) => {
  return (
    <ParallaxElement speed={speed} className={className}>
      <motion.div
        animate={floating ? { 
          y: [0, -15, 0],
          rotate: [0, 2, 0]
        } : {}}
        transition={floating ? {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        } : {}}
      >
        <div className={`relative rounded-full overflow-hidden border-4 border-tropical-gold/30 shadow-2xl ${size} ${containerClassName}`}>
           <img src={src} alt={alt} className={`w-full h-full object-cover ${imageClassName}`} />
           <div className="absolute inset-0 bg-gradient-to-t from-tropical-dark/50 to-transparent mix-blend-multiply"></div>
        </div>
      </motion.div>
    </ParallaxElement>
  );
};