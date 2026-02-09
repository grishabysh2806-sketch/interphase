
import React, { useEffect, useState } from 'react';

const DoubleBackground: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Layer 1: Base Gradient & Mesh */}
      <div 
        className="absolute inset-0 bg-[#050505]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(30, 30, 60, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(60, 30, 30, 0.3) 0%, transparent 50%)
          `
        }}
      />
      
      {/* Layer 2: Moving Typography/Patterns */}
      <div 
        className="absolute inset-0 opacity-[0.03] select-none"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="flex flex-wrap text-[20vw] font-unbounded font-black leading-none uppercase gap-20 p-10">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="whitespace-nowrap">MONDAY ПОНЕДЕЛЬНИК</span>
          ))}
        </div>
      </div>

      {/* Layer 3: Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none bg-[url('/noise.svg')]" />
    </div>
  );
};

export default DoubleBackground;
