
import React, { useState } from 'react';
import { Terminal, Minus, Plus } from 'lucide-react';
import { FAQItem, UIContent } from '../types';
import { Reveal } from './Reveal';

interface FAQProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
  ui?: UIContent;
}

export const FAQ: React.FC<FAQProps> = ({ items, title, subtitle, className = '', ui }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-24 relative ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {(title || subtitle) && (
          <Reveal width="100%">
            <div className="text-center mb-16">
              {subtitle && (
                <div className="flex items-center justify-center gap-2 mb-4">
                   <Terminal size={20} className="text-brown dark:text-neon shrink-0" />
                   <span className="text-sm font-bold tracking-[0.2em] uppercase text-brown dark:text-neon">{subtitle}</span>
                </div>
              )}
              {title && (
                <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal dark:text-white">
                  {title}
                </h2>
              )}
            </div>
          </Reveal>
        )}

        <Reveal width="100%">
            <div className="bg-white/50 dark:bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-charcoal/10 dark:border-white/10 shadow-lg">
                {/* Terminal Header */}
                <div className="bg-gray-100 dark:bg-[#1a1a1a] px-4 py-3 flex items-center gap-4 border-b border-charcoal/10 dark:border-white/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                        {ui?.systemLog || "system_log.txt"}
                    </div>
                </div>

                {/* Content List */}
                <div className="divide-y divide-charcoal/5 dark:divide-white/5">
                    {items.map((item, index) => (
                        <div key={index} className="group">
                            <button 
                                onClick={() => toggle(index)}
                                className="w-full flex items-start text-left p-6 md:p-8 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                            >
                                <span className={`mt-1 mr-4 shrink-0 transition-colors duration-300 ${openIndex === index ? 'text-brown dark:text-neon' : 'text-gray-400'}`}>
                                    {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                </span>
                                <div>
                                    <div className="font-mono text-sm md:text-base text-charcoal dark:text-gray-200 group-hover:text-brown dark:group-hover:text-neon transition-colors duration-300 mb-2">
                                        <span className="text-brown/50 dark:text-neon/50 mr-2">{`>`}</span>
                                        {item.question}
                                    </div>
                                    
                                    <div 
                                        className={`grid transition-all duration-300 ease-in-out ${
                                            openIndex === index ? 'grid-rows-[1fr] opacity-100 pt-4' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed pl-6 border-l border-brown/20 dark:border-neon/20">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
                
                {/* Terminal Footer */}
                <div className="bg-gray-50 dark:bg-[#111] px-4 py-2 text-[10px] font-mono text-gray-400 flex justify-between uppercase tracking-widest border-t border-charcoal/5 dark:border-white/5">
                     <span>{ui?.endOfBuffer || "-- END OF BUFFER --"}</span>
                     <span>{ui?.readOnly || "READ-ONLY"}</span>
                </div>
            </div>
        </Reveal>

      </div>
    </section>
  );
};
