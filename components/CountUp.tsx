import React, { useEffect, useState, useRef } from 'react';

interface CountUpProps {
  end: string;
  label?: string;
  duration?: number;
  className?: string;
}

export const CountUp: React.FC<CountUpProps> = ({ end, label, duration = 2000, className = "" }) => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Extract numeric part if possible, otherwise just show text
  const numericEnd = parseFloat(end.replace(/[^0-9.]/g, ''));
  const suffix = end.replace(/[0-9.]/g, '');
  const isNumber = !isNaN(numericEnd);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !isNumber) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setValue(numericEnd * ease);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, numericEnd, duration, isNumber]);

  if (!isNumber) {
      return <div className={className}>{end}</div>;
  }

  // Format value to match decimals of original if needed, typically int for stats
  const displayValue = Number.isInteger(numericEnd) 
    ? Math.round(value) 
    : value.toFixed(1);

  return (
    <div ref={ref} className={className}>
      <span className="inline-block tabular-nums tracking-tighter">
        {displayValue}
      </span>
      <span>{suffix}</span>
    </div>
  );
};
