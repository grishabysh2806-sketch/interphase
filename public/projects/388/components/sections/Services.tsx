import React from 'react';
import { SERVICES, IMAGES } from '../../constants';
import { SectionHeading } from '../ui/SectionHeading';
import { motion } from 'framer-motion';
import { TropicalAnimal } from '../ui/ParallaxElement';

export const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-24 bg-tropical-dark overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-tropical-green/10 to-transparent pointer-events-none" />
      
      {/* Monkey Hanging */}
      <TropicalAnimal 
        src={IMAGES.monkey} 
        alt="Monkey" 
        speed={0.2} 
        className="top-[100px] left-[-20px] md:left-[5%] z-20 opacity-80 rotate-12"
        size="w-40 h-40 md:w-56 md:h-56"
      />

      {/* Flamingo on the right */}
      <TropicalAnimal 
        src={IMAGES.flamingo} 
        alt="Flamingo" 
        speed={0.15} 
        className="bottom-20 right-[-30px] md:right-[5%] z-20 opacity-80"
        size="w-48 h-48 md:w-64 md:h-64"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Наши Услуги" 
          subtitle="Для твоих рук и ножек" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:bg-tropical-green/20 transition-all duration-300 border border-tropical-leaf/20"
            >
              {/* Card Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-tropical-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex justify-between items-start mb-4">
                <h3 className="text-2xl font-serif text-tropical-sand group-hover:text-white transition-colors">
                  {service.title}
                </h3>
                <span className="text-xl font-bold text-tropical-pink whitespace-nowrap bg-tropical-dark/50 px-3 py-1 rounded-lg border border-tropical-pink/30">
                  {service.price}
                </span>
              </div>
              
              <p className="text-gray-300 mb-6 font-light leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex items-center text-sm text-tropical-leaf font-semibold uppercase tracking-wider">
                <span className="mr-2">⏱ {service.duration}</span>
              </div>

              {/* Decorative Leaf Icon inside card */}
              <div className="absolute -bottom-6 -right-6 text-tropical-leaf/10 transform rotate-45 group-hover:scale-110 transition-transform duration-500">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};