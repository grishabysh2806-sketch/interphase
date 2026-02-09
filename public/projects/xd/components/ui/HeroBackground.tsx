
import React, { useEffect, useRef } from 'react';

export const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // More vibrant colors and higher speeds
    const blobs = [
      { x: width * 0.2, y: height * 0.3, r: 450, color: 'rgba(59, 130, 246, 0.25)', vx: 0.8, vy: 0.6 }, // Blue
      { x: width * 0.8, y: height * 0.7, r: 550, color: 'rgba(220, 38, 38, 0.2)', vx: -0.7, vy: -0.5 }, // Red
      { x: width * 0.5, y: height * 0.5, r: 650, color: 'rgba(249, 115, 22, 0.15)', vx: 0.4, vy: -0.8 }, // Orange
    ];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update blob positions
      blobs.forEach(blob => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        if (blob.x <= -100 || blob.x >= width + 100) blob.vx *= -1;
        if (blob.y <= -100 || blob.y >= height + 100) blob.vy *= -1;

        // Draw blob
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
       width = canvas.width = window.innerWidth;
       height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full z-0 opacity-100 mix-blend-screen dark:mix-blend-normal"
    />
  );
};
