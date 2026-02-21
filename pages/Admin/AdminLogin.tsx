
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, ArrowRight } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate a brief delay for UX
    await new Promise(r => setTimeout(r, 400));

    if (password === 'interphase2024') {
      localStorage.setItem('admin_session', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Неверный пароль');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center p-4">
      {/* Background subtle pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative w-full max-w-[380px]">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 dark:bg-white rounded-xl flex items-center justify-center">
              <span className="text-white dark:text-gray-900 font-bold text-lg">IP</span>
            </div>
            <div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white">Interphase</div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center">
              <Lock size={20} className="text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Вход в панель
            </h2>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Введите пароль администратора
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${error
                    ? 'border-red-300 dark:border-red-800 focus:ring-red-500/20'
                    : 'border-gray-200 dark:border-white/10 focus:ring-gray-900/10 dark:focus:ring-white/10'
                  }`}
                placeholder="••••••••"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-xs text-red-500 dark:text-red-400 font-medium">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-40"
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Войти
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-gray-300 dark:text-gray-600 mt-6">
          Interphase © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
