
import React from 'react';
import { ChevronRight, LayoutGrid, ArrowUpRight, Check } from 'lucide-react';
import { ServiceItem, UIContent } from '../types';
import { Reveal } from './Reveal';
import { useNavigate } from 'react-router-dom';

interface ServicesProps {
  title: string;
  subtitle: string;
  items: ServiceItem[];
  ui: UIContent;
  onNavigate?: (id: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ title, subtitle, items, ui, onNavigate }) => {
  const navigate = useNavigate();

  const handleServiceClick = (id: string) => {
    if (onNavigate) {
      onNavigate(`/services/${id}`);
    } else {
      navigate(`/services/${id}`);
    }
  };

  return (
    <section className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal variant="fade-in">
            <div className="flex items-center gap-3 mb-16">
                <LayoutGrid className="text-brown dark:text-neon shrink-0" size={20} />
                <span className="text-sm font-bold tracking-[0.2em] uppercase text-brown dark:text-neon">{subtitle}</span>
            </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 100} variant="fade-up" width="100%">
              <div className="group h-full flex flex-col p-8 md:p-10 rounded-3xl border border-charcoal/10 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-brown/30 dark:hover:border-neon/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(193,155,118,0.2)] dark:hover:shadow-[0_20px_40px_-15px_rgba(204,255,0,0.15)]">
                
                {/* Header: Number & Title */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <span className="inline-block text-xs font-mono text-brown dark:text-neon mb-2 px-2 py-1 rounded border border-brown/20 dark:border-neon/20 bg-brown/5 dark:bg-neon/5 group-hover:bg-brown dark:group-hover:bg-neon group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                            {ui.systemModule} {item.number}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-display font-bold text-charcoal dark:text-white uppercase leading-none mt-4 group-hover:text-brown dark:group-hover:text-neon transition-colors duration-300">
                            {item.title}
                        </h3>
                    </div>
                    <ArrowUpRight className="text-charcoal/30 dark:text-white/30 group-hover:text-brown dark:group-hover:text-neon group-hover:rotate-45 group-hover:scale-110 transition-all duration-300" size={32} />
                </div>

                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed flex-grow">
                    {item.shortDescription}
                </p>

                {/* Features Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                    {item.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Check size={14} className="text-brown dark:text-neon shrink-0" />
                            <span className="truncate">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Action */}
                <button 
                    onClick={() => handleServiceClick(item.id)}
                    className="w-full py-4 rounded-xl border border-charcoal/10 dark:border-white/10 font-bold uppercase tracking-wider text-sm text-charcoal dark:text-white hover:bg-charcoal hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 flex items-center justify-center gap-2 group/btn hover:scale-[1.02] active:scale-[0.98]"
                >
                    {item.cta || ui.viewDetails}
                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};
