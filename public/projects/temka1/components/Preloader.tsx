
import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  text?: string;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, text = "System Initializing..." }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [dimension, setDimension] = useState({ w: 0, h: 0 });

  useEffect(() => {
    setDimension({ w: window.innerWidth, h: window.innerHeight });

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Non-linear progression for realism
        const increment = Math.random() * 15;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1000); // Wait for exit animation
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-12 bg-bone dark:bg-dark transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-start opacity-50">
        <div className="text-xs font-mono uppercase tracking-widest text-charcoal dark:text-white">
          {text}
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-charcoal dark:text-white">
          {dimension.w} x {dimension.h}
        </div>
      </div>

      {/* Center Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4">
        <div className="overflow-hidden mb-4">
          <h1 className="text-4xl md:text-8xl font-display font-bold tracking-tighter text-charcoal dark:text-white text-center animate-pulse">
            INTERPHASE
          </h1>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-charcoal/10 dark:bg-white/10 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-brown dark:bg-neon transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage */}
        <div className="mt-4 text-right">
          <span className="text-6xl md:text-9xl font-display font-bold text-transparent text-stroke-charcoal dark:text-stroke-white opacity-20">
            {Math.round(progress)}
          </span>
          <span className="text-xl md:text-2xl font-mono text-brown dark:text-neon align-top ml-2">
            %
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end">
        <div className="flex gap-2">
          <div className={`w-2 h-2 rounded-full ${progress > 20 ? 'bg-brown dark:bg-neon' : 'bg-gray-400'}`} />
          <div className={`w-2 h-2 rounded-full ${progress > 50 ? 'bg-brown dark:bg-neon' : 'bg-gray-400'}`} />
          <div className={`w-2 h-2 rounded-full ${progress > 80 ? 'bg-brown dark:bg-neon' : 'bg-gray-400'}`} />
        </div>
        <div className="text-xs font-mono uppercase tracking-widest text-charcoal dark:text-white opacity-50">
          v2.0.24 [BETA]
        </div>
      </div>

      <style>{`
        .text-stroke-charcoal {
          -webkit-text-stroke: 1px #262626;
        }
        .text-stroke-white {
          -webkit-text-stroke: 1px #ffffff;
        }
      `}</style>
    </div>
  );
};
