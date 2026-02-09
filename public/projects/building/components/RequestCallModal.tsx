import React, { useState } from 'react';
import { X, Phone, CheckCircle2, Loader2 } from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

const RequestCallModal: React.FC = () => {
  const { isCallModalOpen, closeCallModal } = useModal();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isCallModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after delay
    setTimeout(() => {
        setIsSuccess(false);
        setName('');
        setPhone('');
        closeCallModal();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={closeCallModal}
      ></div>
      
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden transform transition-all animate-fade-in-up">
        {/* Header stripe */}
        <div className="h-2 bg-stripe-pattern w-full"></div>
        
        <button 
            onClick={closeCallModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
            <X className="w-6 h-6" />
        </button>

        <div className="p-8">
            {isSuccess ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявка принята!</h3>
                    <p className="text-gray-500">
                        Наш менеджер свяжется с вами в течение 15 минут по указанному номеру.
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-construction-yellow p-2 rounded">
                            <Phone className="w-6 h-6 text-black" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Заказать звонок</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                        Оставьте свои контактные данные, и мы бесплатно проконсультируем вас по любым строительным вопросам.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Ваше имя</label>
                            <input 
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-construction-yellow focus:ring-0 outline-none transition-colors"
                                placeholder="Иван Иванов"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Телефон</label>
                            <input 
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded focus:border-construction-yellow focus:ring-0 outline-none transition-colors"
                                placeholder="+7 (999) 000-00-00"
                            />
                        </div>
                        
                        <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-construction-black text-white font-bold py-4 rounded hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 mt-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Отправка...
                                </>
                            ) : (
                                'Жду звонка'
                            )}
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-4 text-center">
                        Нажима кнопку, вы соглашаетесь с политикой обработки персональных данных.
                    </p>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default RequestCallModal;