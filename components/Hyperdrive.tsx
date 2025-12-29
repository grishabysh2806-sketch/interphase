import React from 'react';

interface HyperdriveProps {
  active: boolean;
}

export const Hyperdrive: React.FC<HyperdriveProps> = ({ active }) => {
  // Only render if active (or fading out) - managed by parent, but here we just render structure
  // The CSS class 'active' on container handles the black background fade in.
  
  if (!active) return null;

  // Dense star field
  const stars = [...Array(300)].map((_, i) => {
    const angle = Math.random() * 360;
    // Stars start further out to leave center mostly clear initially, then fill in
    const distance = Math.random() * 300 + 20; 
    const radians = (angle * Math.PI) / 180;
    
    const tx = Math.cos(radians) * distance;
    const ty = Math.sin(radians) * distance;

    return {
      id: i,
      style: {
        '--tx': `${tx}px`,
        '--ty': `${ty}px`,
        // Vary thickness for depth perception
        width: Math.random() > 0.7 ? '3px' : '1px', 
        height: Math.random() > 0.7 ? '3px' : '1px',
        // Rotate star to face center (radially)
        transform: `translate(${tx}px, ${ty}px) rotate(${angle + 90}deg)`,
        // Randomize speed slightly for chaotic feel
        animation: `stretchToLightSpeed ${0.6 + Math.random() * 0.4}s ease-in forwards`,
        animationDelay: `${Math.random() * 0.4}s`,
        backgroundColor: Math.random() > 0.9 ? '#CCFF00' : 'white', // Occasional neon streak
      } as React.CSSProperties
    };
  });

  return (
    <div className={`falcon-container ${active ? 'active' : ''}`}>
      {/* Flash at the end */}
      <div 
        className="absolute inset-0 bg-white z-50 pointer-events-none" 
        style={{ 
            opacity: 0, 
            animation: 'pulse 0.2s ease-out 1.1s forwards' 
        }}
      ></div>

      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          {stars.map((star) => (
            <div
              key={star.id}
              className="falcon-star"
              style={star.style}
            />
          ))}
      </div>
    </div>
  );
};