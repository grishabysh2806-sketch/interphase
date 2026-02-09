
import React, { useMemo, useState } from 'react';
import { Post, Language } from '../types';

interface PostCardProps {
  post: Post;
  lang: Language;
  onReadMore: (id: string) => void;
  flip?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, lang, onReadMore, flip = false }) => {
  const images = useMemo(() => {
    const list = post.images?.length ? post.images : [post.imageUrl];
    return list.filter(Boolean);
  }, [post.images, post.imageUrl]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffectResetIndex(images.length, setActiveIndex);

  const hasMedia = Boolean(images[0]);

  return (
    <div
      className={`group relative w-full mb-24 md:mb-32 overflow-hidden flex flex-col gap-8 items-center transition-transform duration-300 ease-out md:hover:scale-[1.01] ${
        hasMedia ? (flip ? 'md:flex-row-reverse' : 'md:flex-row') : ''
      }`}
    >
      {/* Media Side */}
      {hasMedia && (
        <div className="w-full md:w-3/5 overflow-hidden relative aspect-[16/10] bg-[#111]">
          <img 
            key={images[activeIndex]}
            src={images[activeIndex]} 
            alt={post.title[lang]} 
            className="w-full h-full object-contain carousel-fade opacity-90 group-hover:opacity-100 transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveIndex((i) => (i - 1 + images.length) % images.length);
                }}
                className="px-3 py-2 text-xs font-unbounded tracking-widest uppercase border border-white/20 bg-black/40 backdrop-blur hover:border-white transition-all duration-200 ease-out hover:scale-105 active:scale-95"
                aria-label="Prev image"
              >
                PREV
              </button>
              <span className="text-[10px] font-unbounded tracking-[0.3em] text-white/60">
                {activeIndex + 1}/{images.length}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActiveIndex((i) => (i + 1) % images.length);
                }}
                className="px-3 py-2 text-xs font-unbounded tracking-widest uppercase border border-white/20 bg-black/40 backdrop-blur hover:border-white transition-all duration-200 ease-out hover:scale-105 active:scale-95"
                aria-label="Next image"
              >
                NEXT
              </button>
            </div>
          )}
        </div>
      )}

      {/* Content Side */}
      <div className={`w-full ${hasMedia ? 'md:w-2/5' : 'md:w-full'} flex flex-col items-start px-4 md:px-0`}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[10px] tracking-[0.2em] font-unbounded text-white/40 border border-white/20 px-2 py-1 rounded">
            {post.category[lang]}
          </span>
          <span className="text-[10px] font-unbounded text-white/40 uppercase">
            {post.date}
          </span>
        </div>
        
        <h2 className="post-title-font text-4xl md:text-5xl font-bold mb-6 leading-tight group-hover:text-white transition-colors">
          {post.title[lang]}
        </h2>
        
        <p className="text-lg text-white/60 leading-relaxed font-light mb-8 max-w-md whitespace-pre-wrap">
          {post.content[lang]}
        </p>
        
        <button
          onClick={() => onReadMore(post.id)}
          className="relative overflow-hidden group/btn px-6 py-3 border border-white/10 hover:border-white transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
        >
          <span className="relative z-10 text-xs font-unbounded tracking-widest uppercase">
            {lang === 'RU' ? 'ЧИТАТЬ ПОЛНОСТЬЮ' : 'READ FULL ARTICLE'}
          </span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out -z-0" />
          <span className="absolute inset-0 z-20 flex items-center justify-center text-black text-xs font-unbounded tracking-widest uppercase opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
            {lang === 'RU' ? 'ЧИТАТЬ ПОЛНОСТЬЮ' : 'READ FULL ARTICLE'}
          </span>
        </button>
      </div>

    </div>
  );
};

export default PostCard;

function useEffectResetIndex(imagesCount: number, setActiveIndex: (n: number) => void) {
  React.useEffect(() => {
    setActiveIndex(0);
  }, [imagesCount, setActiveIndex]);
}
