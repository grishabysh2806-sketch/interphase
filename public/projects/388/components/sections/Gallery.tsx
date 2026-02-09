import React, { useState } from 'react';
import { IMAGES } from '../../constants';
import { SectionHeading } from '../ui/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
import { TropicalAnimal } from '../ui/ParallaxElement';
import { Eye, X } from 'lucide-react';

export const Gallery: React.FC = () => {
  const galleryImages = [IMAGES.nails1, IMAGES.nails2, IMAGES.nails3, IMAGES.nails4];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-24 bg-tropical-dark">
      {/* Toucan Peeking */}
      <TropicalAnimal 
        src={IMAGES.toucan} 
        alt="Toucan" 
        speed={0.3} 
        className="top-10 right-[-20px] md:right-[15%] z-30"
        size="w-32 h-32 md:w-48 md:h-48"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="Галерея Работ" subtitle="Искусство на кончиках пальцев" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {galleryImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer ${idx % 2 === 0 ? 'mt-0' : 'mt-8 md:mt-12'}`}
              onClick={() => setSelectedImage(src)}
            >
              {/* Subtle light overlay on hover */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 duration-500 pointer-events-none" />

              <img 
                src={src} 
                alt={`Nail Art ${idx + 1}`} 
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Dark gradient for text legibility, always present but stronger on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-tropical-dark/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity z-20 duration-300" />

              <div className="absolute inset-x-0 bottom-0 p-6 z-30 flex flex-col items-start justify-end h-full pointer-events-none">
                <p className="text-white font-serif text-lg mb-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">Тропический Вайб</p>
                
                {/* View Details Button */}
                <div className="overflow-hidden">
                  <button className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-tropical-sand hover:text-white border border-tropical-sand/30 hover:border-tropical-sand/80 bg-white/5 hover:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform translate-y-full group-hover:translate-y-0 pointer-events-auto">
                    <Eye size={14} />
                    <span>Подробнее</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-tropical-dark/95 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-tropical-pink transition-colors z-50 p-2 hover:bg-white/10 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl max-h-[90vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size nail art"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-tropical-sand/20"
              />
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <h3 className="text-2xl md:text-3xl font-serif text-tropical-sand mb-2">Тропический Вайб</h3>
                <p className="text-gray-400">Эксклюзивный дизайн от мастеров 388.nail</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};