import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = '' 
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align];

  return (
    <div className={`mb-12 relative z-10 ${alignClass} ${className}`}>
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="block text-tropical-pink font-sans font-bold tracking-widest uppercase text-sm mb-2"
        >
          {subtitle}
        </motion.span>
      )}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl font-serif text-tropical-sand"
      >
        {title}
      </motion.h2>
      <div className={`mt-4 h-1 w-24 bg-tropical-pink rounded-full mx-auto ${align === 'left' ? 'ml-0' : align === 'right' ? 'mr-0' : ''}`} />
    </div>
  );
};