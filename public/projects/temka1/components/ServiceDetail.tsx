
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { ServiceItem, UIContent } from '../types';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { FAQ } from './FAQ';

interface ServiceDetailProps {
  items: ServiceItem[];
  onContact: () => void;
  ui: UIContent;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ items, onContact, ui }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = items.find(item => item.id === id);

  if (!service) {
    return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{ui.notFound}</h2>
                <Button onClick={() => navigate('/')}>{ui.goHome}</Button>
            </div>
        </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Reveal>
            <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold uppercase tracking-wider">{ui.backToServices}</span>
            </button>
        </Reveal>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
                 <Reveal delay={100}>
                    <span className="text-brown dark:text-neon font-bold text-6xl md:text-8xl opacity-20 select-none block mb-[-2rem] md:mb-[-3rem]">
                        {service.number}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-charcoal dark:text-white uppercase leading-none tracking-tight mb-8">
                        {service.title}
                    </h1>
                 </Reveal>
            </div>
            <div className="flex items-end">
                <Reveal delay={200}>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light leading-relaxed backdrop-blur-[2px]">
                        {service.longDescription}
                    </p>
                </Reveal>
            </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
             {service.features.map((feature, index) => (
                 <Reveal key={index} delay={index * 100}>
                     <div className="p-8 border border-charcoal/10 dark:border-white/10 bg-white/5 backdrop-blur-[2px] rounded-xl hover:border-brown/50 dark:hover:border-neon/50 transition-colors">
                         <CheckCircle2 className="text-brown dark:text-neon mb-4" size={32} />
                         <h3 className="text-xl font-display font-bold text-charcoal dark:text-white uppercase tracking-wide">
                             {feature}
                         </h3>
                     </div>
                 </Reveal>
             ))}
        </div>

        {/* Specific FAQ for this service */}
        <div className="mb-24">
             <FAQ items={service.faq} subtitle="Details" title="Common Questions" ui={ui} />
        </div>

        {/* CTA */}
        <div className="text-center">
             <Reveal>
                 <h2 className="text-3xl font-display font-bold mb-8">{ui.readyToStart}</h2>
                 <Button onClick={onContact} className="shadow-2xl shadow-brown/20 dark:shadow-neon/20">
                     {service.cta}
                 </Button>
             </Reveal>
        </div>

      </div>
    </div>
  );
};
