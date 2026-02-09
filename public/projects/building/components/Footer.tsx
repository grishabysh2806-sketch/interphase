import React from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Custom VK Icon
const VkIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0729 13.5647C15.8273 14.3031 16.592 15.0298 17.3323 15.7806C17.6534 16.1065 17.9351 16.4716 17.9234 16.9832C17.913 17.4391 17.581 17.7554 17.1329 17.7651C16.486 17.7791 15.8391 17.7699 15.1923 17.7738C14.7394 17.7766 14.4079 17.6186 14.1205 17.2741C13.5939 16.6433 13.0805 16.001 12.545 15.3831C12.3845 15.1979 12.1873 15.0536 11.9304 15.0861C11.595 15.1287 11.4586 15.3621 11.4361 15.6811C11.396 16.2483 11.4173 16.8166 11.412 17.3838C11.4087 17.7319 11.2334 17.7738 10.9575 17.7738C10.0827 17.7738 9.23192 17.7408 8.41113 17.5147C6.67389 17.036 5.25368 15.9686 4.09095 14.5422C2.85969 13.0315 1.91426 11.3414 1.15783 9.54929C1.03716 9.26325 1.19696 9.07185 1.53039 9.06699C2.26126 9.05632 2.99264 9.06117 3.72352 9.0636C4.05893 9.06457 4.26938 9.2315 4.39893 9.54249C4.83955 10.5996 5.43825 11.5696 6.18341 12.4385C6.38612 12.6749 6.62153 12.8904 6.94093 12.9379C7.23469 12.9816 7.37581 12.8253 7.42239 12.5642C7.50285 12.1128 7.48777 11.6579 7.46743 11.2059C7.43343 10.4568 7.38541 9.71114 7.6432 9.01019C7.7562 8.7024 8.02693 8.52763 8.43572 8.55238C8.91754 8.5815 9.01633 8.73003 9.08819 9.17666C9.10237 9.26477 9.11718 9.35263 9.14193 9.43734C9.2626 9.85191 9.49755 9.94705 9.90563 9.87326C10.1555 9.82811 10.2709 9.61063 10.3687 9.4121C10.8716 8.38877 11.1923 7.30138 11.2911 6.17173C11.3093 5.962 11.3467 5.75375 11.3697 5.54551C11.3854 5.40279 11.4589 5.33434 11.6026 5.32851C12.3527 5.29744 13.1037 5.30472 13.8533 5.31346C14.162 5.3171 14.3438 5.46711 14.4426 5.76103C14.7708 6.73686 15.3524 7.58542 16.0963 8.32475C16.2731 8.50048 16.4677 8.65873 16.7132 8.71893C16.9405 8.77475 17.0628 8.61844 17.1436 8.43252C17.2626 8.15873 17.3308 7.86843 17.3986 7.57716C17.4857 7.20239 17.5739 6.82859 17.653 6.45286C17.7291 6.09119 17.7956 5.72855 17.915 5.38579C18.0069 5.12219 18.232 5.00665 18.4981 5.00422C19.2638 4.99743 20.03 4.99694 20.7956 5.00277C21.1417 5.00519 21.4013 5.14841 21.5173 5.47948C21.6853 5.95911 21.4984 6.3533 21.2659 6.72127C20.6625 7.67615 19.9231 8.54898 19.143 9.39075C18.8479 9.70921 18.5714 10.0461 18.2839 10.3733C17.893 10.8189 17.9255 11.0961 18.3307 11.4796C19.2778 12.3757 20.1774 13.319 20.9996 14.337C21.4329 14.8734 21.8415 15.4293 22.1466 16.0506C22.3486 16.4618 22.2031 16.9939 21.7827 17.3187C21.5791 17.476 21.3283 17.6046 21.0776 17.6362C20.3766 17.7245 19.6732 17.7556 18.9698 17.726C18.5639 17.7085 18.2714 17.5318 18.0194 17.2187C17.5704 16.6609 17.0674 16.1434 16.5445 15.6444C16.2906 15.4021 16.0125 15.1885 15.6596 15.1953C15.2227 15.2041 15.0863 15.5269 15.0729 15.9395V17.0094C15.0673 17.3915 14.9398 17.625 14.5614 17.7128C14.4379 17.7415 14.3093 17.7483 14.1825 17.7483H14.1561" />
  </svg>
);

const VkIconNew = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M14 19h-4a8 8 0 0 1 -8 -8v-5h4v5a4 4 0 0 0 4 4v-9h4v4.5a4.53 4.53 0 0 0 3.97 -4.496h4l-.342 1.711a6.858 6.858 0 0 1 -3.658 4.789a5.34 5.34 0 0 1 3.566 4.111l.434 2.389h-4a4.531 4.531 0 0 0 -3.97 -4.496z"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Footer: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="bg-construction-dark text-gray-300">
      <div className="h-4 w-full bg-stripe-pattern animate-tape"></div>
      
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">
              Строй<span className="text-construction-yellow">Мастер</span>
            </h3>
            <p className="max-w-md text-gray-400 leading-relaxed mb-6">
              Мы строим надежные дома и создаем комфортные пространства для жизни и бизнеса. Качество, проверенное временем и сотнями довольных клиентов.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-construction-yellow transition-colors" title="ВКонтакте">
                <VkIconNew className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-construction-yellow transition-colors" title="Telegram">
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-construction-yellow mt-1 flex-shrink-0" />
                <span>г. Москва, ул. Строителей, д. 10, офис 405</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-construction-yellow flex-shrink-0" />
                <span>+7 (999) 123-45-67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-construction-yellow flex-shrink-0" />
                <span>info@stroymaster.pro</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wide">Меню</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-construction-yellow transition-colors">Главная</Link></li>
              <li><Link to="/portfolio" className="hover:text-construction-yellow transition-colors">Проекты</Link></li>
              <li><Link to="/estimator" className="hover:text-construction-yellow transition-colors">Калькулятор</Link></li>
              <li><Link to="/contacts" className="hover:text-construction-yellow transition-colors">Контакты</Link></li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} СтройМастер Pro. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
