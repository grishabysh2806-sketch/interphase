
import React from 'react';
import { ProcessStep, Testimonial } from '../types';
import { Reveal } from './Reveal';
import { Workflow, CreditCard, Star, ArrowRight, Quote } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

interface ProcessProps {
  content: {
    title: string;
    subtitle: string;
    steps: ProcessStep[];
    paymentTitle: string;
    paymentDescription: string;
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    testimonials: Testimonial[];
    ctaTitle: string;
    ctaButton: string;
  };
}

export const Process: React.FC<ProcessProps> = ({ content }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <Workflow className="text-brown dark:text-neon shrink-0" size={20} />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-brown dark:text-neon">{content.subtitle}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-charcoal dark:text-white leading-tight max-w-2xl">
            {content.title}
          </h2>
        </Reveal>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-24 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brown/30 dark:via-neon/30 to-transparent z-0"></div>

          {content.steps.map((step, index) => (
            <Reveal key={index} delay={index * 100}>
              <div className="relative z-10 group cursor-default">
                <div className="w-24 h-24 mb-6 relative transition-transform duration-500 group-hover:scale-110">
                   <div className="absolute inset-0 bg-white dark:bg-card rounded-full border border-charcoal/10 dark:border-white/10 flex items-center justify-center group-hover:border-brown dark:group-hover:border-neon transition-colors duration-300 shadow-lg group-hover:shadow-brown/20 dark:group-hover:shadow-neon/20">
                     <span className="text-2xl font-display font-bold text-brown dark:text-neon">{step.number}</span>
                   </div>
                   {/* Dot on line */}
                   <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-4 w-2 h-2 rounded-full bg-charcoal/20 dark:bg-white/20 transition-colors group-hover:bg-brown dark:group-hover:bg-neon"></div>
                </div>
                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3 uppercase group-hover:text-brown dark:group-hover:text-neon transition-colors">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Payment & CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
            <Reveal delay={200} width="100%" className="h-full">
                <div className="h-full rounded-3xl bg-white/50 dark:bg-white/5 border border-charcoal/10 dark:border-white/10 p-8 md:p-12 backdrop-blur-sm hover:border-brown/30 dark:hover:border-neon/30 transition-all duration-300">
                    <div className="flex flex-col items-start gap-6">
                        <div className="p-4 rounded-full bg-brown/10 dark:bg-neon/10 text-brown dark:text-neon">
                            <CreditCard size={32} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-display font-bold text-charcoal dark:text-white mb-4 uppercase">
                                {content.paymentTitle}
                            </h3>
                            <p className="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                                {content.paymentDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </Reveal>

            <Reveal delay={300} width="100%" className="h-full">
                 <div className="h-full rounded-3xl bg-charcoal dark:bg-card border border-charcoal dark:border-white/10 p-8 md:p-12 relative overflow-hidden group">
                     {/* Abstract BG */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-brown/20 dark:bg-neon/10 rounded-full blur-[80px] group-hover:bg-brown/30 dark:group-hover:bg-neon/20 transition-all duration-700"></div>
                     
                     <div className="relative z-10 flex flex-col justify-center h-full gap-8">
                         <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                            {content.ctaTitle}
                         </h3>
                         <div>
                            <Button onClick={() => navigate('/portfolio')} variant="primary" className="border-white/20">
                                {content.ctaButton} <ArrowRight size={20} />
                            </Button>
                         </div>
                     </div>
                 </div>
            </Reveal>
        </div>

        {/* Testimonials */}
        <Reveal>
             <div className="mb-12 text-center">
                 <div className="flex items-center justify-center gap-2 mb-4">
                    <Star size={16} className="text-brown dark:text-neon shrink-0" />
                    <span className="text-sm font-bold tracking-[0.2em] uppercase text-brown dark:text-neon">{content.testimonialsSubtitle}</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl font-display font-bold text-charcoal dark:text-white">{content.testimonialsTitle}</h2>
             </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 150}>
                    <div className="h-full p-8 rounded-2xl bg-white dark:bg-black/20 border border-charcoal/5 dark:border-white/5 hover:border-brown/30 dark:hover:border-neon/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                        <Quote className="text-brown/20 dark:text-neon/20 mb-6" size={40} />
                        <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-8 italic">
                            "{t.text}"
                        </p>
                        <div className="mt-auto border-t border-charcoal/5 dark:border-white/5 pt-4">
                            <div className="font-bold text-charcoal dark:text-white uppercase tracking-wide">{t.author}</div>
                            <div className="text-xs text-gray-500 font-mono mt-1">
                                <span className="text-brown dark:text-neon">{t.role}</span> @ {t.company}
                            </div>
                        </div>
                    </div>
                </Reveal>
            ))}
        </div>

      </div>
    </section>
  );
};
