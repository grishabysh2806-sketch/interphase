import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-construction-dark text-white py-16 relative overflow-hidden">
         <div className="absolute inset-0 bg-stripe-pattern opacity-5"></div>
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wide">
                Контакты
            </h1>
            <p className="text-gray-400 text-lg">
                Мы всегда на связи и готовы ответить на любые вопросы по вашему проекту.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Info */}
            <div className="space-y-8">
                <div className="bg-stone-50 p-8 rounded-xl border border-gray-200 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-l-4 border-construction-yellow pl-4">
                        Главный офис
                    </h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full shadow-md">
                                <MapPin className="w-6 h-6 text-construction-yellow" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Адрес</h4>
                                <p className="text-gray-600">119049, г. Москва, ул. Строителей, д. 10, офис 405 (БЦ "Монолит")</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full shadow-md">
                                <Phone className="w-6 h-6 text-construction-yellow" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Телефоны</h4>
                                <p className="text-gray-600 font-medium">+7 (999) 123-45-67 (Отдел продаж)</p>
                                <p className="text-gray-600 font-medium">+7 (999) 000-00-00 (Секретарь)</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full shadow-md">
                                <Mail className="w-6 h-6 text-construction-yellow" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Email</h4>
                                <p className="text-gray-600">info@stroymaster.pro</p>
                                <p className="text-gray-600">sales@stroymaster.pro</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full shadow-md">
                                <Clock className="w-6 h-6 text-construction-yellow" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Режим работы</h4>
                                <p className="text-gray-600">Пн-Пт: 09:00 — 20:00</p>
                                <p className="text-gray-600">Сб-Вс: 10:00 — 18:00 (по записи)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-gray-200 rounded-xl h-[300px] overflow-hidden shadow-inner relative group">
                    <img 
                        src="https://picsum.photos/id/10/800/400" 
                        alt="Map Location" 
                        className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white px-4 py-2 rounded shadow font-bold flex items-center gap-2">
                            <MapPin className="text-red-500" />
                            Мы здесь
                        </div>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border-t-8 border-construction-yellow h-fit">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Напишите нам</h2>
                <p className="text-gray-500 mb-8">Заполните форму, и наш инженер свяжется с вами для предварительной оценки проекта.</p>
                
                <form className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Ваше имя</label>
                            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-construction-yellow outline-none transition-colors" placeholder="Иван" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700">Телефон</label>
                            <input type="tel" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-construction-yellow outline-none transition-colors" placeholder="+7 (999)..." />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Email (необязательно)</label>
                        <input type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-construction-yellow outline-none transition-colors" placeholder="ivan@mail.ru" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Тема сообщения</label>
                        <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-construction-yellow outline-none transition-colors">
                            <option>Консультация по строительству</option>
                            <option>Расчет сметы</option>
                            <option>Сотрудничество</option>
                            <option>Другое</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-bold text-gray-700">Сообщение</label>
                        <textarea rows={4} className="w-full p-3 bg-gray-50 border border-gray-200 rounded focus:bg-white focus:border-construction-yellow outline-none transition-colors" placeholder="Опишите ваш вопрос..."></textarea>
                    </div>

                    <button className="w-full bg-construction-black text-white font-bold py-4 rounded hover:bg-gray-800 transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Отправить сообщение
                    </button>
                    
                    <p className="text-xs text-center text-gray-400">
                        Отправляя форму, вы даете согласие на обработку своих персональных данных.
                    </p>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;