import React, { useEffect, useRef } from 'react';

export const FloatingGlyphs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const glyphs = ['安', '水', '火', '山', 'ب', 'ج', 'د', 'م', 'A', 'S', 'R', 'Z', '文', '字', 'ه', 'و'];
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      text: string;
      speedY: number;
      opacity: number;
    }

    const particles: Particle[] = [];

    const initParticles = () => {
      const count = window.innerWidth < 768 ? 15 : 30;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 20 + 10,
          text: glyphs[Math.floor(Math.random() * glyphs.length)],
          speedY: Math.random() * 0.5 + 0.1,
          opacity: Math.random() * 0.3 + 0.05
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < -50) {
          p.y = height + 50;
          p.x = Math.random() * width;
        }

        ctx.font = `${p.size}px serif`;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fillText(p.text, p.x, p.y);
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
       width = canvas.width = window.innerWidth;
       height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    initParticles();
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-1 pointer-events-none"
    />
  );
};