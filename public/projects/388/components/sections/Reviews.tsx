import React from 'react';
import { REVIEWS, IMAGES } from '../../constants';
import { SectionHeading } from '../ui/SectionHeading';
import { motion } from 'framer-motion';
import { TropicalAnimal } from '../ui/ParallaxElement';
import { Star } from 'lucide-react';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="relative py-24 bg-tropical-dark">
      {/* Reusing parrot for decoration */}
      <TropicalAnimal 
        src={IMAGES.parrot} 
        alt="Parrot" 
        speed={0.15} 
        className="top-[-50px] left-[-30px] md:left-[5%] z-20 opacity-80"
        size="w-32 h-32 md:w-48 md:h-48"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="Отзывы" subtitle="Что говорят наши гости" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: [0.9, 1.05, 1] }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              className="glass-panel p-8 rounded-3xl flex flex-col relative border border-tropical-leaf/20 hover:bg-tropical-green/20 transition-all duration-300 group"
            >
              <div className="flex text-tropical-gold mb-4 group-hover:scale-105 transition-transform duration-300 origin-left">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" className="mr-1" />
                ))}
              </div>
              <p className="text-gray-300 italic mb-6 flex-grow leading-relaxed">"{review.text}"</p>
              <div className="mt-auto flex items-center">
                 <div className="w-10 h-10 bg-tropical-pink/20 rounded-full flex items-center justify-center mr-3 text-tropical-pink font-bold group-hover:bg-tropical-pink group-hover:text-white transition-colors duration-300">
                    {review.name.charAt(0)}
                 </div>
                 <p className="font-serif text-tropical-sand text-lg">{review.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};