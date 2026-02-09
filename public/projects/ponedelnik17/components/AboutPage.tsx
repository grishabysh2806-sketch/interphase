import React, { useState } from 'react';

import VideoOverlayPlayer from './VideoOverlayPlayer';
import creatorsVideoSrc from "../video/creators-video.mp4";

const AboutPage: React.FC = () => {
  const [openCreator, setOpenCreator] = useState<null | 'grigoriy' | 'nikita'>(null);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <div className="text-[10px] font-unbounded tracking-[0.3em] text-white/40 uppercase mb-6">ABOUT</div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-8">Канал для понедельника</h1>
        <p className="text-lg text-white/70 leading-relaxed font-light max-w-2xl">
          Канал для понедельника
        </p>

        <div className="mt-16 border-t border-white/10 pt-10">
          <div className="text-[10px] font-unbounded tracking-[0.3em] text-white/40 uppercase mb-6">СОЗДАТЕЛИ</div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setOpenCreator('grigoriy')}
              className="text-left text-2xl md:text-3xl font-serif font-bold hover:text-white/70 transition-all duration-200 ease-out hover:scale-[1.01] origin-left"
            >
              Григорий
            </button>
            <button
              onClick={() => setOpenCreator('nikita')}
              className="text-left text-2xl md:text-3xl font-serif font-bold hover:text-white/70 transition-all duration-200 ease-out hover:scale-[1.01] origin-left"
            >
              Никита иксди
            </button>
          </div>
        </div>
      </section>

      {openCreator && (
        <VideoOverlayPlayer
          src={creatorsVideoSrc}
          title={openCreator === 'grigoriy' ? 'ГРИГОРИЙ' : 'НИКИТА ИКСДИ'}
          onClose={() => setOpenCreator(null)}
        />
      )}
    </>
  );
};

export default AboutPage;
