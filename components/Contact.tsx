
import React, { useState } from 'react';
import { Button } from './Button';
import { Reveal } from './Reveal';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { sendContactFormToTelegram } from '../services/telegramBotService';

interface ContactProps {
  text: {
    title: string;
    name: string;
    email: string;
    message: string;
    submit: string;
    telegramButton: string;
    telegramLink: string;
  };
  onSubmitEffect: () => void;
}

export const Contact: React.FC<ContactProps> = ({ text, onSubmitEffect }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      return; // Should be handled by 'required' attribute, but safety check
    }

    setStatus('sending');
    const success = await sendContactFormToTelegram(formData.name, formData.email, formData.message, formData.budget);

    if (success) {
      setStatus('success');
      onSubmitEffect();
      setFormData({ name: '', email: '', message: '', budget: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
    }
  };

  const handleRetry = () => {
    setStatus('idle');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-12 relative overflow-hidden transition-colors duration-500 min-h-screen flex items-center">
      {/* Background with blur */}
      <div className="absolute inset-0 bg-gray-100 dark:bg-black/40 -z-10"></div>
      <div className="absolute inset-0 bg-transparent dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-charcoal/50 dark:to-black pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 border-b border-charcoal/10 dark:border-white/10 pb-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-charcoal dark:text-white tracking-tighter leading-tight">
                {text.title}<span className="text-brown dark:text-neon">.</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-xl">
                {text.description}
              </p>
            </div>

            <div className="mt-8 md:mt-0">
              <a
                href={text.telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#24A1DE]/10 border border-[#24A1DE]/20 text-[#24A1DE] hover:bg-[#24A1DE] hover:text-white transition-all duration-300 font-bold uppercase tracking-wide group text-sm"
              >
                <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                {text.telegramButton}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div className="space-y-6">
                <div className="space-y-3 group">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em] group-focus-within:text-brown dark:group-focus-within:text-neon transition-colors duration-300">{text.name} <span className="text-brown dark:text-neon">*</span></label>
                  <input
                    type="text"
                    name="name"
                    placeholder={text.namePlaceholder}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-charcoal/20 dark:border-white/20 px-0 py-4 text-xl md:text-2xl text-charcoal dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:border-brown dark:focus:border-neon transition-all"
                  />
                </div>

                <div className="space-y-3 group">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em] group-focus-within:text-brown dark:group-focus-within:text-neon transition-colors duration-300">{text.email} <span className="text-brown dark:text-neon">*</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder={text.emailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-charcoal/20 dark:border-white/20 px-0 py-4 text-xl md:text-2xl text-charcoal dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:border-brown dark:focus:border-neon transition-all"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em] block mb-4">{text.budgetLabel || 'Budget'}</label>
                <div className="flex flex-wrap gap-3">
                  {text.budgetOptions?.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, budget: option }))}
                      className={`
                            px-6 py-3 rounded-full border text-sm font-bold uppercase tracking-wider transition-all duration-300
                            ${formData.budget === option
                          ? 'bg-brown dark:bg-neon border-brown dark:border-neon text-white dark:text-black shadow-lg scale-105'
                          : 'bg-transparent border-charcoal/20 dark:border-white/20 text-charcoal/60 dark:text-white/60 hover:border-charcoal/40 dark:hover:border-white/40 hover:text-charcoal dark:hover:text-white'}
                        `}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3 group pt-2">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-[0.1em] group-focus-within:text-brown dark:group-focus-within:text-neon transition-colors duration-300">
                {text.message}
              </label>
              <textarea
                rows={2}
                name="message"
                placeholder={text.messagePlaceholder}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-charcoal/20 dark:border-white/20 px-0 py-4 text-xl md:text-2xl text-charcoal dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:outline-none focus:border-brown dark:focus:border-neon transition-all resize-none min-h-[100px]"
              ></textarea>
            </div>

            <div className="pt-6 flex flex-col items-center gap-6">
              <Button
                type="submit"
                variant="primary"
                className="w-full rounded-full py-6 text-2xl font-bold uppercase tracking-widest shadow-2xl hover:shadow-[#B59A76]/50 dark:hover:shadow-[#D4FF00]/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 transform border-2 border-transparent hover:border-white/20"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? text.transmitting : text.submit}
              </Button>

              <div className="flex w-full items-center justify-between text-sm text-gray-400 px-2">

                {/* Status indicator removed */}

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-500 animate-fade-in">
                    <CheckCircle size={20} />
                    <span className="font-bold">{text.sentSuccess}</span>
                  </div>
                )}

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 animate-fade-in">
                    <AlertCircle size={20} />
                    <span className="font-bold">{text.sendFailed}. <button onClick={handleRetry} className="underline hover:text-red-600">{text.retry}</button></span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

