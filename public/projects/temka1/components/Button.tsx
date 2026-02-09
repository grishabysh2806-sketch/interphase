import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseStyles = "relative px-8 py-3 font-display font-bold uppercase tracking-wider transition-all duration-300 overflow-hidden group";
  
  // Theme aware variants
  const variants = {
    primary: "bg-brown dark:bg-neon text-bone dark:text-dark hover:bg-charcoal dark:hover:bg-white",
    outline: "border border-charcoal/20 dark:border-white/20 text-charcoal dark:text-white hover:border-brown dark:hover:border-neon hover:text-brown dark:hover:text-neon"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-charcoal dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
      )}
    </button>
  );
};