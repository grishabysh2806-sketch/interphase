
import React, { useEffect, useRef } from 'react';
import { BlogPost } from '../types';
import { Reveal } from './Reveal';
import { BookOpen, ArrowRight, AlignLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BlogListProps {
  content: {
    title: string;
    subtitle: string;
    items: BlogPost[];
    readMore: string;
  };
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export const BlogList: React.FC<BlogListProps> = ({ content, hasMore = false, onLoadMore }) => {
  const navigate = useNavigate();
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && onLoadMore) {
          onLoadMore();
        }
      },
      { threshold: 1.0, rootMargin: '100px' }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, onLoadMore]);

  return (
    <section className="py-24 bg-transparent relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="text-brown dark:text-neon shrink-0" size={20} />
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-brown dark:text-neon">{content.subtitle}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-16 text-charcoal dark:text-white leading-tight">
            {content.title}<span className="text-brown dark:text-neon">.</span>
          </h2>
        </Reveal>

        {/* Grid */}
        {content.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {content.items.map((post, index) => (
              <Reveal key={post.id} delay={index * 150}>
                <div 
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="group cursor-pointer flex flex-col h-full bg-white/50 dark:bg-card/30 border border-charcoal/10 dark:border-white/10 rounded-2xl overflow-hidden hover:border-brown/50 dark:hover:border-neon/50 transition-all duration-500 hover:shadow-2xl hover:shadow-brown/10 dark:hover:shadow-neon/10"
                >
                  {/* Media Wrapper - Always rendered to maintain size consistency */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-charcoal/50">
                    {post.imageUrl ? (
                      <>
                          <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                           <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-charcoal/90 dark:bg-black/90 text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md border border-white/10">
                                  {post.category}
                              </span>
                           </div>
                      </>
                    ) : (
                      /* Text-Only Post Placeholder */
                      <div className="w-full h-full p-8 flex flex-col justify-between relative overflow-hidden group-hover:bg-brown/5 dark:group-hover:bg-neon/5 transition-colors duration-500">
                           {/* Abstract background pattern */}
                           <div className="absolute inset-0 opacity-10 dark:opacity-5">
                              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] bg-[size:20px_20px] text-charcoal dark:text-white transform rotate-12"></div>
                           </div>
                           
                           <div className="absolute top-4 left-4 z-10">
                              <span className="px-3 py-1 bg-charcoal/10 dark:bg-white/10 text-charcoal dark:text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md border border-charcoal/10 dark:border-white/10">
                                  {post.category}
                              </span>
                           </div>

                           {/* Large Typographic Preview */}
                           <div className="mt-8 z-10">
                               <AlignLeft size={32} className="text-brown dark:text-neon mb-4 opacity-50" />
                               <span className="text-4xl font-display font-bold text-charcoal/20 dark:text-white/20 uppercase leading-none select-none">
                                  {post.category}
                               </span>
                           </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 bg-brown dark:bg-neon rounded-full"></span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-display font-bold text-charcoal dark:text-white mb-4 group-hover:text-brown dark:group-hover:text-neon transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-charcoal dark:text-white text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
                      {content.readMore} <ArrowRight size={16} className="text-brown dark:text-neon" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          !hasMore && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-6">
                Не удалось загрузить записи. Возможно, проблема с подключением.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-brown dark:bg-neon text-white dark:text-black font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity"
              >
                Повторить
              </button>
            </div>
          )
        )}

        {/* Loading Indicator for Infinite Scroll */}
        {hasMore && (
          <div ref={loaderRef} className="flex justify-center py-12">
             <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-brown dark:bg-neon rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 <div className="w-2 h-2 bg-brown dark:bg-neon rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-2 h-2 bg-brown dark:bg-neon rounded-full animate-bounce"></div>
             </div>
          </div>
        )}

      </div>
    </section>
  );
};
