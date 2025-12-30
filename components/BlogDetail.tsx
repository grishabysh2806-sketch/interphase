
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogPost, UIContent } from '../types';
import { Reveal } from './Reveal';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';

interface BlogDetailProps {
  content: {
    items: BlogPost[];
    backText: string;
  };
  ui: UIContent;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ content, ui }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = content.items.find(item => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: post?.title || 'Interphase Blog',
      text: post?.excerpt || 'Check out this article from Interphase.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  if (!post) {
    return (
        <div className="min-h-screen flex items-center justify-center pt-20">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{ui.articleNotFound}</h2>
                <button 
                  onClick={() => navigate('/blog')}
                  className="text-brown dark:text-neon hover:underline uppercase tracking-widest font-bold"
                >
                    {ui.backToJournal}
                </button>
            </div>
        </div>
    );
  }

  return (
    <article className="pt-32 pb-24 min-h-screen relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Reveal>
            <button 
                onClick={() => navigate('/blog')} 
                className="flex items-center gap-2 text-gray-500 hover:text-charcoal dark:hover:text-white mb-12 transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform text-brown dark:text-neon" />
                <span className="text-sm font-bold uppercase tracking-wider">{content.backText}</span>
            </button>
        </Reveal>

        {/* Header */}
        <Reveal delay={100}>
            <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-brown/10 dark:bg-neon/10 text-brown dark:text-neon border border-brown/20 dark:border-neon/20 rounded-full text-xs font-bold uppercase tracking-wider">
                    {post.category}
                </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-charcoal dark:text-white leading-tight mb-8">
                {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 md:gap-12 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-charcoal/10 dark:border-white/10 pb-8 mb-12">
                <div className="flex items-center gap-2">
                    <User size={16} className="text-brown dark:text-neon" />
                    <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-brown dark:text-neon" />
                    <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={16} className="text-brown dark:text-neon" />
                    <span>{post.readTime}</span>
                </div>
                 <div 
                    className="flex items-center gap-2 ml-auto cursor-pointer hover:text-brown dark:hover:text-neon transition-colors"
                    onClick={handleShare}
                >
                    <Share2 size={16} />
                    <span className="hidden sm:inline">{ui.share}</span>
                </div>
            </div>
        </Reveal>

        {/* Featured Image */}
        <Reveal delay={200}>
            <div className="aspect-video w-full rounded-2xl overflow-hidden mb-16 border border-charcoal/10 dark:border-white/10 shadow-2xl">
                <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                />
            </div>
        </Reveal>

        {/* Content Body */}
        <Reveal delay={300}>
            <div 
                className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-display prose-headings:font-bold prose-headings:text-charcoal dark:prose-headings:text-white
                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:font-light prose-p:leading-relaxed
                prose-strong:text-brown dark:prose-strong:text-neon
                prose-a:text-brown dark:prose-a:text-neon hover:prose-a:underline
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </Reveal>

      </div>
    </article>
  );
};
