
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
        </Reveal>

        {/* Feed Layout */}
        {content.items.length > 0 ? (
          <div className="flex flex-col gap-8 md:gap-12 w-full mb-24">
            {content.items.map((post, index) => (
              <Reveal key={post.id} delay={index * 100}>
                <div 
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="group cursor-pointer flex flex-col md:flex-row gap-6 md:gap-12 items-start border-b border-charcoal/5 dark:border-white/5 pb-12 last:border-0"
                >
                  {/* Image Section - Left Side */}
                  <div className="w-full md:w-[320px] lg:w-[400px] shrink-0">
                    <div className="rounded-2xl overflow-hidden bg-gray-100 dark:bg-charcoal/50 aspect-[16/10] relative">
                      {post.imageUrl ? (
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        /* Fallback gradient placeholder if no image */
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-charcoal dark:to-black flex items-center justify-center">
                           <BookOpen className="text-charcoal/20 dark:text-white/20" size={48} />
                        </div>
                      )}
                      
                      {/* Mobile Category Badge (visible only on mobile over image) */}
                      <div className="absolute top-4 left-4 md:hidden">
                         <span className="px-3 py-1 bg-white/90 dark:bg-black/90 text-charcoal dark:text-white text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                            {post.category}
                         </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Section - Right Side */}
                  <div className="flex-1 flex flex-col justify-center py-2">
                    {/* Desktop Category & Date */}
                    <div className="hidden md:flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-charcoal/5 dark:bg-white/10 text-charcoal dark:text-white text-xs font-bold uppercase tracking-wider rounded-full border border-charcoal/10 dark:border-white/10">
                          {post.category}
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                          {post.date}
                        </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-bold text-charcoal dark:text-white mb-4 group-hover:text-brown dark:group-hover:text-neon transition-colors leading-tight">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                       <div className="flex items-center gap-2 text-charcoal dark:text-white text-sm font-bold uppercase tracking-wider group-hover:gap-4 transition-all duration-300">
                         {content.readMore} <ArrowRight size={16} className="text-brown dark:text-neon" />
                       </div>
                       
                       <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                         <span className="w-1 h-1 bg-brown dark:bg-neon rounded-full"></span>
                         <span>{post.readTime}</span>
                       </div>
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
