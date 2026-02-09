
import React, { useMemo } from 'react';
import { Language, Post } from '../types';

interface PostPageProps {
  lang: Language;
  post?: Post;
  onBack: () => void;
}

const PostPage: React.FC<PostPageProps> = ({ lang, post, onBack }) => {
  const images = useMemo(() => {
    if (!post) return [];
    const list = post.images?.length ? post.images : [post.imageUrl];
    return list.filter(Boolean);
  }, [post]);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      <div className="flex items-center justify-between gap-6 mb-10">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-white/20 hover:border-white text-[10px] font-unbounded tracking-[0.3em] uppercase transition-all"
        >
          {lang === 'RU' ? 'НАЗАД' : 'BACK'}
        </button>

        {post?.telegramUrl && (
          <a
            href={post.telegramUrl}
            target="_blank"
            className="px-6 py-3 border border-white/20 hover:border-white text-[10px] font-unbounded tracking-[0.3em] uppercase transition-all"
          >
            {lang === 'RU' ? '📨 TELEGRAM' : '📨 TELEGRAM'}
          </a>
        )}
      </div>

      {!post ? (
        <div className="text-white/60 font-unbounded tracking-widest text-[10px] uppercase">
          {lang === 'RU' ? 'ПОСТ НЕ НАЙДЕН' : 'POST NOT FOUND'}
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <span className="text-[10px] tracking-[0.2em] font-unbounded text-white/40 border border-white/20 px-2 py-1 rounded">
              {post.category[lang]}
            </span>
            <span className="text-[10px] font-unbounded text-white/40 uppercase">{post.date}</span>
          </div>

          <h1 className="post-title-font text-5xl md:text-6xl font-bold leading-tight">
            {post.title[lang]}
          </h1>

          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((src, idx) => (
                <div key={`${post.id}-${idx}`} className="w-full aspect-[16/10] bg-[#111] overflow-hidden">
                  {src ? (
                    <img
                      src={src}
                      alt={`${post.title[lang]} ${idx + 1}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}

          <div className="max-w-3xl">
            <p className="text-lg text-white/70 leading-relaxed font-light whitespace-pre-wrap">
              {post.content[lang]}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostPage;
