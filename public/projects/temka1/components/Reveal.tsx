import React, { useEffect, useRef, useState } from 'react';

type RevealVariant = 'fade-up' | 'fade-down' | 'fade-in' | 'scale-up' | 'slide-right' | 'slide-left' | 'blur-in';

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  threshold?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = "fit-content", 
  delay = 0,
  duration = 1000,
  variant = 'fade-up',
  threshold = 0.2,
  className = ""
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin: "0px 0px -50px 0px" });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1)';
    
    switch (variant) {
      case 'fade-in': return 'translate(0, 0) scale(1)';
      case 'fade-down': return 'translate(0, -30px) scale(1)';
      case 'scale-up': return 'translate(0, 30px) scale(0.9)';
      case 'slide-right': return 'translate(-40px, 0) scale(1)';
      case 'slide-left': return 'translate(40px, 0) scale(1)';
      case 'blur-in': return 'translate(0, 20px) scale(0.98)';
      case 'fade-up': default: return 'translate(0, 50px) scale(1)';
    }
  };

  const getOpacity = () => isVisible ? 1 : 0;
  
  const getFilter = () => {
    if (variant === 'blur-in') {
        return isVisible ? 'blur(0px)' : 'blur(10px)';
    }
    return 'none';
  };

  return (
    <div 
      ref={ref} 
      style={{ width }} 
      className={`relative ${className}`} 
    >
      <div
        style={{ 
          transform: getTransform(),
          opacity: getOpacity(),
          filter: getFilter(),
          transitionProperty: 'opacity, transform, filter',
          transitionDuration: `${duration}ms`, 
          transitionDelay: `${delay}ms`,
          transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className="will-change-transform"
      >
        {children}
      </div>
    </div>
  );
};