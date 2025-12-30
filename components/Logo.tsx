import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", showText = true, animated = false }) => {
  return (
    <div className={`flex items-center gap-2 select-none group ${className}`}>
      {/* Icon Container */}
      <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-500 group-hover:scale-110"
        >
          {/* Background Shape - Subtle Hexagon or Square */}
          <rect 
            x="4" 
            y="4" 
            width="32" 
            height="32" 
            rx="8" 
            className="fill-charcoal/5 dark:fill-white/5 transition-colors duration-300"
          />
          
          {/* Main Path - The Interface Wave */}
          <path 
            d="M8 20H14C16 20 17 14 20 14C23 14 24 26 27 26C30 26 31 20 32 20H33" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-charcoal dark:text-white transition-colors duration-300"
          />

          {/* Accent Path - The 'Phase' Shift (Ghost) */}
          <path 
            d="M8 20H14C16 20 17 14 20 14C23 14 24 26 27 26C30 26 31 20 32 20H33" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`text-brown dark:text-neon opacity-0 transition-all duration-300 ${
              animated ? 'group-hover:opacity-100 group-hover:translate-x-[2px]' : ''
            }`}
          />
          
          {/* Dot at the end (optional, keeping it clean for now) */}
        </svg>
      </div>

      {/* Text Brand */}
      {showText && (
        <span className="text-2xl font-display font-bold tracking-tighter text-charcoal dark:text-white transition-colors duration-300">
          INTERPHASE<span className="text-brown dark:text-neon animate-pulse">.</span>
        </span>
      )}
    </div>
  );
};
