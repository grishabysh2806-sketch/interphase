import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';
import { Button } from '../components/ui/Button';

interface AuthPageProps {
  onNavigate: (page: Page) => void;
  initialMode?: 'login' | 'register';
}

export const AuthPage: React.FC<AuthPageProps> = ({ onNavigate, initialMode = 'login' }) => {
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
       login(formData.email, mode === 'register' ? formData.name : 'Студент');
       setIsLoading(false);
       onNavigate(Page.DASHBOARD);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
       {/* Background */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

       <div className="w-full max-w-md relative z-10 animate-fade-up visible">
          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
             <div className="text-center mb-8">
                <div className="w-12 h-12 bg-white text-black text-xl font-bold font-serif flex items-center justify-center rounded-xl mx-auto mb-6 shadow-lg shadow-white/20">IV</div>
                <h2 className="text-3xl font-bold text-white mb-2">
                   {mode === 'login' ? 'С возвращением' : 'Стать студентом'}
                </h2>
                <p className="text-zinc-500 text-sm">
                   {mode === 'login' ? 'Войдите в личный кабинет' : 'Заполните анкету для доступа к платформе'}
                </p>
             </div>

             <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                   <div>
                     <input 
                       type="text" 
                       placeholder="Ваше имя"
                       required
                       className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                       value={formData.name}
                       onChange={e => setFormData({...formData, name: e.target.value})}
                     />
                   </div>
                )}
                <div>
                   <input 
                     type="email" 
                     placeholder="Email"
                     required
                     className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                     value={formData.email}
                     onChange={e => setFormData({...formData, email: e.target.value})}
                   />
                </div>
                <div>
                   <input 
                     type="password" 
                     placeholder="Пароль"
                     required
                     className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                     value={formData.password}
                     onChange={e => setFormData({...formData, password: e.target.value})}
                   />
                </div>

                <div className="pt-4">
                   <Button 
                     type="submit" 
                     className="w-full py-4 text-lg" 
                     disabled={isLoading}
                   >
                      {isLoading ? (
                         <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            Обработка...
                         </span>
                      ) : (
                         mode === 'login' ? 'Войти' : 'Зарегистрироваться'
                      )}
                   </Button>
                </div>
             </form>

             <div className="mt-8 text-center">
                <button 
                   onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                   className="text-zinc-500 hover:text-white text-sm transition-colors"
                >
                   {mode === 'login' ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти'}
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};