import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { Plus, Minus } from 'lucide-react';

const FAQ: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      className="max-w-3xl mx-auto px-4 py-16"
    >
      <h1 className="text-3xl sm:text-5xl font-display font-black text-white mb-8 md:mb-12 text-center break-words">{t.title}</h1>

      <div className="space-y-4 md:space-y-6">
        {t.items.map((item, index) => (
          <div key={index} className="border border-neo-purple bg-black group hover:border-neo-acid transition-colors duration-300">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-4 md:p-6 text-left"
            >
              <span className={`text-base md:text-xl font-display font-bold transition-colors pr-4 ${openIndex === index ? 'text-neo-acid' : 'text-neo-cyan group-hover:text-white'}`}>
                {item.q}
              </span>
              {openIndex === index ? <Minus className="text-neo-pink" /> : <Plus className="text-neo-acid" />}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-300 font-mono border-t border-gray-800">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQ;
