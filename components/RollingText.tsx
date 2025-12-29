import React from 'react';

interface RollingTextProps {
  text: string;
  className?: string;
  duration?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const RollingText: React.FC<RollingTextProps> = ({ 
  text, 
  className = "", 
  duration = 0.8, 
  stagger = 0.03,
  as: Component = 'div'
}) => {
  // Split into words, then characters for the true "wheel" effect
  const words = text.split(" ");

  return (
    <Component className={`flex flex-wrap gap-x-[0.25em] ${className}`}>
      {words.map((word, wIndex) => (
        <span key={wIndex} className="inline-flex overflow-hidden leading-tight">
          {word.split("").map((char, cIndex) => {
            const delay = (wIndex * 5 + cIndex) * stagger;
            
            return (
               <span key={cIndex} className="relative overflow-hidden">
                  <span 
                    className="inline-block"
                    style={{ 
                        animationName: 'rollIn',
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                        animationTimingFunction: 'cubic-bezier(0.2, 0.6, 0.2, 1)',
                        animationFillMode: 'forwards'
                    }}
                  >
                    {char}
                  </span>
               </span>
            );
          })}
        </span>
      ))}
    </Component>
  );
};