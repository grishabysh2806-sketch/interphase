import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TRANSLATIONS, MOCK_PRICING } from '../constants';
import { Language, PricingTier } from '../types';
import { Check, Star, Send } from 'lucide-react';
import Modal from '../components/Modal';

const Pricing: React.FC<{ lang: Language }> = ({ lang }) => {
  const t = TRANSLATIONS[lang].pricing;
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', date: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (tier: PricingTier) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
    setIsSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black text-neo-acid mb-4 break-words">{t.title}</h1>
        <p className="text-sm sm:text-xl font-mono text-white px-4">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {MOCK_PRICING.map((tier, i) => (
          <motion.div
            key={tier.name}
            whileHover={{ y: -10, boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)' }}
            className={`relative p-8 border-2 ${i === 2 ? 'border-neo-acid bg-neo-acid/10' : 'border-gray-700 bg-gray-900'} flex flex-col`}
          >
            {i === 2 && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-neo-acid text-black px-4 py-1 font-bold font-display text-sm">
                MOST POPULAR
              </div>
            )}
            <h3 className="text-2xl font-display font-bold text-neo-pink mb-2">{tier.name}</h3>
            <div className="text-3xl font-mono font-bold text-white mb-4">{tier.price}</div>
            <p className="text-gray-400 mb-8 h-12">{tier.description}</p>
            
            <ul className="space-y-4 mb-8 flex-1">
              {tier.features.map(f => (
                <li key={f} className="flex items-center text-sm font-mono text-gray-300">
                  <Check className="w-4 h-4 text-neo-cyan mr-2" />
                  {f}
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleSelect(tier)}
              className={`w-full py-4 font-bold font-display uppercase tracking-widest transition-colors ${i===2 ? 'bg-neo-acid text-black hover:bg-white' : 'bg-transparent border border-white hover:bg-white hover:text-black'}`}
            >
              SELECT PROTOCOL
            </button>
          </motion.div>
        ))}
      </div>

      <div className="bg-neo-purple/30 border border-neo-pink p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Star size={200} />
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold text-white mb-6">{t.whyExpensive}</h2>
          <p className="text-lg font-mono text-neo-cyan mb-8 max-w-3xl leading-relaxed">
            {t.whyExpensiveDesc}
          </p>
          <div className="inline-block border-b-2 border-neo-acid pb-1 text-neo-acid font-bold">
            {t.paymentMethods}
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={`BOOKING: ${selectedTier?.name}`}
      >
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-neo-cyan font-mono mb-2">CODENAME</label>
              <input 
                type="text" 
                required
                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-neo-acid outline-none font-mono transition-colors"
                value={formState.name}
                onChange={e => setFormState({...formState, name: e.target.value})}
                placeholder="ENTER ALIAS"
              />
            </div>
            <div>
              <label className="block text-neo-cyan font-mono mb-2">COMM LINK (EMAIL)</label>
              <input 
                type="email" 
                required
                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-neo-acid outline-none font-mono transition-colors"
                value={formState.email}
                onChange={e => setFormState({...formState, email: e.target.value})}
                placeholder="USER@DOMAIN.COM"
              />
            </div>
            <div>
              <label className="block text-neo-cyan font-mono mb-2">DEPLOYMENT DATE</label>
              <input 
                type="datetime-local" 
                required
                className="w-full bg-black border border-gray-700 p-3 text-white focus:border-neo-acid outline-none font-mono transition-colors"
                value={formState.date}
                onChange={e => setFormState({...formState, date: e.target.value})}
              />
            </div>
            
            <button 
              type="submit"
              className="w-full bg-neo-acid text-black font-bold font-display py-4 hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Send size={20} />
              INITIATE BOOKING
            </button>
          </form>
        ) : (
          <div className="text-center py-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block p-4 rounded-full border-2 border-neo-acid mb-6"
            >
              <Check size={48} className="text-neo-acid" />
            </motion.div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">REQUEST RECEIVED</h3>
            <p className="text-gray-400 font-mono">Our operators will contact you shortly via encrypted channel.</p>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Pricing;
