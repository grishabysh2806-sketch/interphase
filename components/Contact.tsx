
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
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
       return; // Should be handled by 'required' attribute, but safety check
    }

    setStatus('sending');
    const success = await sendContactFormToTelegram(formData.name, formData.email, formData.message);
    
    if (success) {
        setStatus('success');
        onSubmitEffect();
        setFormData({ name: '', email: '', message: '' });
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
    <section className="py-24 bg-transparent relative transition-colors duration-500">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 backdrop-blur-md bg-white/5 p-8 rounded-3xl border border-white/10">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-center text-charcoal dark:text-white tracking-tighter">
            {text.title}<span className="text-brown dark:text-neon">.</span>
          </h2>
          
          <div className="flex justify-center mb-12">
            <a 
                href={text.telegramLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#24A1DE]/10 border border-[#24A1DE]/20 text-[#24A1DE] hover:bg-[#24A1DE] hover:text-white transition-all duration-300 font-bold uppercase tracking-wide group"
            >
                <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                {text.telegramButton}
            </a>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{text.name} <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-charcoal/10 dark:border-white/10 rounded-lg px-4 py-3 text-charcoal dark:text-white focus:outline-none focus:border-brown dark:focus:border-neon transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">{text.email} <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-charcoal/10 dark:border-white/10 rounded-lg px-4 py-3 text-charcoal dark:text-white focus:outline-none focus:border-brown dark:focus:border-neon transition-all"
                />
              </div>
            </div>
            <div className="space-y-2 pt-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                {text.message} <span className="text-xs text-gray-400 font-normal lowercase opacity-70 ml-1">(optional)</span>
              </label>
              <textarea 
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-charcoal/10 dark:border-white/10 rounded-lg px-4 py-3 text-charcoal dark:text-white focus:outline-none focus:border-brown dark:focus:border-neon transition-all resize-none"
              ></textarea>
            </div>
            
            <div className="pt-8 text-center">
              <Button 
                type="submit" 
                variant="outline" 
                className="w-full md:w-auto"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Transmitting...' : text.submit}
              </Button>
            </div>

            {status === 'success' && (
                <div className="flex items-center justify-center gap-2 text-green-500 mt-4 animate-fade-in">
                    <CheckCircle size={20} />
                    <span className="font-bold">Message sent successfully!</span>
                </div>
            )}
            
            {status === 'error' && (
               <div className="flex flex-col items-center gap-2">
                 <div className="flex items-center gap-2 text-red-500">
                   <AlertCircle size={20} />
                   <span className="font-bold uppercase tracking-wider">Sending Failed</span>
                 </div>
                 <p className="text-sm text-center text-gray-500">
                    Network error. Please try again or email us directly at <a href="mailto:hello@interphase.art" className="underline hover:text-brown dark:hover:text-neon">hello@interphase.art</a>
                 </p>
                 <button 
                    type="button" 
                    onClick={handleRetry}
                    className="mt-2 text-sm font-bold uppercase tracking-wider text-brown dark:text-neon hover:underline"
                 >
                    Retry
                 </button>
               </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
};
