import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { MapPin, Phone, Instagram, Clock } from 'lucide-react';
import { TropicalAnimal, ParallaxElement } from '../ui/ParallaxElement';
import { IMAGES } from '../../constants';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="relative pt-24 pb-12 overflow-hidden">
      <style>{`
        @keyframes tropical-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Animated Gradient Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(-45deg, #022c22, #064e3b, #0f172a, #134e4a)', // Dark Emerald -> Emerald -> Dark Blue -> Teal
          backgroundSize: '400% 400%',
          animation: 'tropical-gradient 15s ease infinite'
        }}
      />
      
      {/* Jaguar Prowling at the bottom */}
      <TropicalAnimal 
        src={IMAGES.jaguar} 
        alt="Jaguar" 
        speed={0.1} 
        className="bottom-[5%] left-[-50px] md:left-[10%] z-20 opacity-90"
        size="w-48 h-48 md:w-64 md:h-64"
        floating={true}
      />
      
      {/* Floating Flamingo */}
       <TropicalAnimal 
        src={IMAGES.flamingo} 
        alt="Flamingo" 
        speed={-0.1} 
        className="top-[10%] right-[5%] z-10 opacity-70"
        size="w-32 h-32 md:w-40 md:h-40"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading title="Записаться" subtitle="Мы ждем тебя" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12 mb-20">
          {/* Contact Info */}
          <div className="space-y-8 glass-panel p-8 rounded-3xl">
            <div>
              <h3 className="text-2xl font-serif text-tropical-sand mb-6">Контакты</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-tropical-pink/20 p-3 rounded-full text-tropical-pink">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-bold">Адрес</p>
                    <p className="text-lg text-white">СПБ Парголовская 11 офис 582</p>
                    <p className="text-sm text-gray-500">Вход со двора, через арку с пальмами</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-tropical-pink/20 p-3 rounded-full text-tropical-pink">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-bold">Телефон</p>
                    <a href="tel:+79990000000" className="text-lg text-white hover:text-tropical-pink transition-colors">
                      +7 (999) 000-00-00
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-tropical-pink/20 p-3 rounded-full text-tropical-pink">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 uppercase tracking-wide font-bold">Режим работы</p>
                    <p className="text-lg text-white">Ежедневно: 10:00 - 22:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <a 
                href="#"
                className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-tropical-pink to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                <Instagram size={20} />
                <span>Instagram Direct</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <form className="glass-panel p-8 rounded-3xl space-y-6">
            <h3 className="text-2xl font-serif text-tropical-sand mb-2">Оставь заявку</h3>
            <p className="text-gray-400 mb-6 text-sm">Мы перезвоним в течение 15 минут</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-tropical-sand/80 mb-1">Имя</label>
                <input 
                  type="text" 
                  className="w-full bg-tropical-dark/50 border border-tropical-leaf/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-tropical-pink transition-colors"
                  placeholder="Как к вам обращаться?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-tropical-sand/80 mb-1">Телефон</label>
                <input 
                  type="tel" 
                  className="w-full bg-tropical-dark/50 border border-tropical-leaf/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-tropical-pink transition-colors"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                 <label className="block text-sm font-medium text-tropical-sand/80 mb-1">Пожелания</label>
                <textarea 
                  className="w-full bg-tropical-dark/50 border border-tropical-leaf/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-tropical-pink transition-colors h-24"
                  placeholder="Хочу дизайн с попугаем..."
                ></textarea>
              </div>
            </div>

            <button type="button" className="w-full bg-white text-tropical-dark font-bold py-4 rounded-xl hover:bg-tropical-sand transition-colors">
              Отправить
            </button>
          </form>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 388.nail. Все права защищены. Дизайн, вдохновленный Бали.
          </p>
        </div>
      </div>
    </footer>
  );
};