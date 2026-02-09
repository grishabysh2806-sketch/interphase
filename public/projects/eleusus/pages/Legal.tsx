import React from 'react';
import { motion } from 'framer-motion';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';

const Legal: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang].legal;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-16 font-mono text-sm leading-relaxed"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-display text-neo-cyan mb-8 md:mb-12 border-b-4 border-white pb-4 break-words">
        {t.title}
      </h1>

      <div className="grid grid-cols-1 gap-8 md:gap-16">
        {t.sections.map((section, idx) => (
          <motion.section
            key={idx}
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${idx % 2 === 0 ? 'text-neo-pink' : 'text-neo-acid'}`}>
              {section.title}
            </h2>
            <div className="space-y-4 text-gray-300">
              {section.content.map((rule, i) => (
                 <p key={i} className="flex gap-4">
                   <span className="text-gray-500">{`0${i + 1}.`}</span>
                   {rule}
                 </p>
              ))}
            </div>
          </motion.section>
        ))}

        <div className="p-4 border border-red-500 bg-red-900/20 text-red-400 mt-8">
          WARNING: CHEATING OR HACKING ON CLUB HARDWARE WILL RESULT IN A PERMANENT BAN AND REPORT TO AUTHORITIES.
        </div>
      </div>
    </motion.div>
  );
};

export default Legal;
