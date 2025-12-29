
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrivacyContent } from '../types';
import { Reveal } from './Reveal';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

interface PrivacyPolicyProps {
  content: PrivacyContent;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ content }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen relative bg-bone dark:bg-dark transition-colors duration-500 overflow-hidden">
        {/* Background ambient elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
            <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-brown blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
            <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-neon blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse-slow delay-1000"></div>
        </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal>
            <button 
                onClick={() => navigate('/')} 
                className="flex items-center gap-2 text-gray-500 hover:text-charcoal dark:hover:text-white mb-12 transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform text-brown dark:text-neon" />
                <span className="text-sm font-bold uppercase tracking-wider">{content.back}</span>
            </button>
        </Reveal>

        <Reveal delay={100}>
            <div className="relative mb-16">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-charcoal dark:text-white leading-tight mb-6 uppercase tracking-tight relative z-10">
                    {content.title}
                </h1>
                {/* Decorative underline */}
                <div className="absolute -bottom-4 left-0 w-24 h-1 bg-gradient-to-r from-brown to-transparent dark:from-neon dark:to-transparent"></div>
                
                <div className="flex items-center gap-3 mt-8 text-sm font-mono text-gray-500 uppercase tracking-widest">
                     <ShieldCheck size={16} className="text-brown dark:text-neon" />
                     <span>{content.lastUpdated}</span>
                </div>
            </div>
        </Reveal>

        <div className="space-y-12">
            {content.blocks.map((block, index) => (
                <Reveal key={index} delay={200 + (index * 50)}>
                    <div className="group relative pl-8 border-l-2 border-gray-200 dark:border-gray-800 hover:border-brown dark:hover:border-neon transition-colors duration-500">
                        {/* Glowing dot on the timeline */}
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-bone dark:bg-dark border-2 border-gray-300 dark:border-gray-700 group-hover:border-brown dark:group-hover:border-neon group-hover:scale-125 transition-all duration-300">
                            <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-brown dark:group-hover:bg-neon transition-colors duration-300"></div>
                        </div>

                        {block.title && (
                            <h2 className="text-2xl font-display font-bold text-charcoal dark:text-white mb-6 group-hover:text-brown dark:group-hover:text-neon transition-colors duration-300">
                                {block.title}
                            </h2>
                        )}
                        
                        <div 
                            className="prose prose-lg dark:prose-invert prose-headings:font-display prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-a:text-brown dark:prose-a:text-neon prose-li:text-gray-600 dark:prose-li:text-gray-400 max-w-none"
                            dangerouslySetInnerHTML={{ __html: block.content }}
                        />
                        
                        {/* Hover accent background */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brown/5 to-transparent dark:from-neon/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-r-lg"></div>
                    </div>
                </Reveal>
            ))}
        </div>

      </div>
    </div>
  );
};
