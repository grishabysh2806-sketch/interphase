
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded check for demonstration. 
    // In production, this should be handled by Supabase Auth or a backend.
    if (password === 'interphase2024') {
      localStorage.setItem('admin_session', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-bone dark:bg-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-card/30 p-8 rounded-2xl shadow-xl border border-charcoal/10 dark:border-white/10">
        <div className="flex justify-center mb-8">
          <div className="p-4 bg-brown/10 dark:bg-neon/10 rounded-full">
            <Lock className="text-brown dark:text-neon" size={32} />
          </div>
        </div>
        
        <h2 className="text-2xl font-display font-bold text-center text-charcoal dark:text-white mb-8">
          Admin Access
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brown dark:focus:border-neon text-charcoal dark:text-white"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-bold">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-brown dark:bg-neon text-white dark:text-charcoal font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
