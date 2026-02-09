import React from 'react';
import { Page } from '../../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black border-t border-zinc-900 pt-20 pb-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate(Page.HOME)}>
               <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-serif font-bold rounded-lg">IV</div>
               <span className="font-bold text-lg tracking-tight">Интернационал</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Элитная онлайн-школа иностранных языков и истории. Объединяем академическую базу с современными технологиями.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Навигация</h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-500">
              <li onClick={() => onNavigate(Page.HOME)} className="hover:text-white cursor-pointer transition-colors">Главная</li>
              <li onClick={() => onNavigate(Page.COURSES)} className="hover:text-white cursor-pointer transition-colors">Курсы</li>
              <li onClick={() => onNavigate(Page.ABOUT)} className="hover:text-white cursor-pointer transition-colors">О школе</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Документы</h4>
            <ul className="flex flex-col gap-3 text-sm text-zinc-500">
              <li onClick={() => onNavigate(Page.AGREEMENT)} className="hover:text-white cursor-pointer transition-colors">Договор оферты</li>
              <li onClick={() => onNavigate(Page.OFFER)} className="hover:text-white cursor-pointer transition-colors">Публичная оферта</li>
              <li className="hover:text-white cursor-pointer transition-colors">Сведения об организации</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Реквизиты</h4>
            <div className="flex flex-col gap-2 text-xs text-zinc-500">
              <p className="text-zinc-300">ООО «Четвертый Интернационал»</p>
              <p>ИНН 7729123456 / КПП 772901001</p>
              <p>ОГРН 1127746000000</p>
              <p>119000, г. Москва, Пречистенская наб., д. 15, стр. 1</p>
              <p className="mt-4">
                 <a href="mailto:info@4intl.ru" className="hover:text-white transition-colors">info@4intl.ru</a>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 gap-4">
          <p>© 2024 Четвертый Интернационал. Все права защищены.</p>
          <div className="flex items-center gap-6">
             <a href="https://t.me/mondeydelnik" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-400 transition-colors">
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.638z"/></svg>
               Telegram
             </a>
          </div>
        </div>
      </div>
    </footer>
  );
};