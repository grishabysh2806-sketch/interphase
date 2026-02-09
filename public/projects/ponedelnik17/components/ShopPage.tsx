
import React from 'react';

interface ShopPageProps {
  onBack: () => void;
}

const AVITO_URL = 'https://www.avito.ru/brands/d6cfee0f9c491c74e0557412ff723d7c?src=sharing';

const ShopPage: React.FC<ShopPageProps> = ({ onBack }) => {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
      <div className="flex items-center justify-between gap-6 mb-10">
        <button
          onClick={onBack}
          className="px-6 py-3 border border-white/20 hover:border-white text-[10px] font-unbounded tracking-[0.3em] uppercase transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
        >
          НАЗАД
        </button>

        <a
          href={AVITO_URL}
          target="_blank"
          rel="noreferrer"
          className="px-6 py-3 border border-white/20 hover:border-white text-[10px] font-unbounded tracking-[0.3em] uppercase transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
        >
          AVITO
        </a>
      </div>

      <div className="text-[10px] font-unbounded tracking-[0.3em] text-white/40 uppercase mb-6">SHOP</div>
      <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-8">Магазин</h1>

      <div className="max-w-2xl">
        <p className="text-lg text-white/70 leading-relaxed font-light">
          Подборка вещей и брендов — на Avito.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href={AVITO_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-white bg-black/20 backdrop-blur-xl text-[10px] font-unbounded tracking-[0.35em] uppercase transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] hover:text-white"
          >
            Перейти в магазин
          </a>

          <button
            onClick={onBack}
            className="inline-flex items-center justify-center px-8 py-4 border border-white/10 hover:border-white/40 text-[10px] font-unbounded tracking-[0.35em] uppercase transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] text-white/70 hover:text-white"
          >
            На главную
          </button>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="text-[10px] font-unbounded tracking-[0.3em] text-white/20 uppercase mb-3">LINK</div>
          <a href={AVITO_URL} target="_blank" rel="noreferrer" className="text-sm text-white/60 hover:text-white transition-all duration-200 ease-out hover:scale-[1.01] origin-left break-all inline-block">
            {AVITO_URL}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ShopPage;
