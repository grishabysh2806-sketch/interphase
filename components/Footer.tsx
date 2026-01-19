
import React from 'react';
import { Link } from 'react-router-dom';
import { FooterContent, NavItem } from '../types';
import { Send, Mail } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  content: FooterContent;
  navItems: NavItem[];
}

export const Footer: React.FC<FooterProps> = ({ content, navItems }) => {
  return (
    <footer className="bg-bone dark:bg-dark border-t border-charcoal/10 dark:border-white/10 transition-colors duration-500 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {/* Brand Column */}
            <div className="lg:col-span-1">
                <Link to="/" className="mb-6 block">
                    <Logo />
                </Link>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                   Digital craftsmanship for the bold. We build future-proof web experiences that merge art with engineering.
                </p>
            </div>

            {/* Sitemap */}
            <div>
                <h4 className="font-display font-bold text-charcoal dark:text-white uppercase tracking-wider mb-6">
                    {content.sitemapTitle}
                </h4>
                <ul className="space-y-3">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <Link 
                                to={item.path} 
                                className="text-gray-600 dark:text-gray-400 hover:text-brown dark:hover:text-neon transition-colors text-sm uppercase tracking-wide"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Contacts */}
            <div>
                 <h4 className="font-display font-bold text-charcoal dark:text-white uppercase tracking-wider mb-6">
                    {content.contactTitle}
                </h4>
                <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-center gap-3">
                        <Mail size={18} className="text-brown dark:text-neon shrink-0" />
                        <a href="mailto:bushuev@interphase.pro" className="hover:text-brown dark:hover:text-neon transition-colors break-all">
                            bushuev@interphase.pro
                        </a>
                    </li>
                    <li className="flex items-center gap-3">
                         <Send size={18} className="text-brown dark:text-neon shrink-0" />
                         <a href="https://t.me/interphase_art" target="_blank" rel="noopener noreferrer" className="hover:text-brown dark:hover:text-neon transition-colors">
                            @interphase_art
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-wider">
             <div className="flex flex-col md:flex-row items-center gap-4">
                <span>© {new Date().getFullYear()} Interphase. {content.rights}</span>
                <span className="hidden md:inline text-charcoal/20 dark:text-white/20">|</span>
                <Link to="/privacy" className="hover:text-charcoal dark:hover:text-white transition-colors">{content.privacy}</Link>
             </div>
             <div>
                {content.developedBy}
             </div>
        </div>

      </div>
    </footer>
  );
};
