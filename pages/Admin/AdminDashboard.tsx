
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../../types';
import { blogService } from '../../services/blogService';
import { supabase } from '../../services/supabaseClient';
import {
  Plus, Edit2, Trash2, LogOut, CloudOff, Search,
  FileText, Calendar, Clock, Loader2, MoreHorizontal
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_session');
    if (!isAuth) {
      navigate('/admin');
      return;
    }
    loadPosts();
  }, [navigate]);

  const loadPosts = async () => {
    try {
      const data = await blogService.getPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Удалить эту запись?')) {
      try {
        await blogService.deletePost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        console.error('Failed to delete post', error);
        alert('Ошибка удаления');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin');
  };

  const filteredPosts = search
    ? posts.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    )
    : posts;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-dark">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-60 bg-white dark:bg-[#111] border-r border-gray-100 dark:border-white/5 flex flex-col z-30">
        {/* Logo */}
        <div className="p-5 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-gray-900 font-bold text-sm">IP</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900 dark:text-white">Interphase</div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-wider">Admin</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white text-sm font-medium transition-colors">
            <FileText size={16} />
            Записи
          </button>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 dark:border-white/5">
          {!supabase && (
            <div className="flex items-center gap-2 px-3 py-2 mb-2 rounded-lg bg-amber-50 dark:bg-amber-900/10">
              <CloudOff size={14} className="text-amber-600 dark:text-amber-400" />
              <span className="text-xs text-amber-700 dark:text-amber-400">Offline режим</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 text-sm transition-colors"
          >
            <LogOut size={16} />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-60 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-[#fafafa]/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center justify-between px-8 h-16">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Записи</h1>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-56 pl-9 pr-3 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white placeholder:text-gray-400"
                />
              </div>

              {/* New Post */}
              <button
                onClick={() => navigate('/admin/blog/new')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                <Plus size={16} />
                Новая запись
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-100 dark:border-white/5 p-5">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{posts.length}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">Все записи</div>
            </div>
            <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-100 dark:border-white/5 p-5">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{new Set(posts.map(p => p.category)).size}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">Категории</div>
            </div>
            <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-100 dark:border-white/5 p-5">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{supabase ? 'Online' : 'Offline'}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1 uppercase tracking-wider">Статус БД</div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={28} className="animate-spin text-gray-400" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <FileText size={48} className="mx-auto mb-4 text-gray-200 dark:text-gray-700" />
              <p className="text-gray-400 dark:text-gray-500 mb-4">
                {search ? 'Ничего не найдено' : 'Нет записей. Создайте первую!'}
              </p>
              {!search && (
                <button
                  onClick={() => navigate('/admin/blog/new')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Plus size={16} />
                  Создать запись
                </button>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_120px_100px_100px_50px] gap-4 px-5 py-3 border-b border-gray-100 dark:border-white/5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                <span>Запись</span>
                <span>Категория</span>
                <span>Дата</span>
                <span>Автор</span>
                <span></span>
              </div>

              {/* Table Rows */}
              {filteredPosts.map(post => (
                <div
                  key={post.id}
                  className="grid grid-cols-[1fr_120px_100px_100px_50px] gap-4 px-5 py-4 border-b border-gray-50 dark:border-white/3 hover:bg-gray-50/50 dark:hover:bg-white/3 transition-colors items-center cursor-pointer"
                  onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                >
                  {/* Post info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg shrink-0 overflow-hidden bg-gray-100 dark:bg-white/5">
                      {post.imageUrl ? (
                        <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FileText size={16} className="text-gray-300 dark:text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{post.title}</div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">{post.excerpt}</div>
                    </div>
                  </div>

                  {/* Category */}
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {post.category}
                  </span>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>

                  {/* Author */}
                  <span className="text-xs text-gray-400 dark:text-gray-500 truncate">
                    {post.author}
                  </span>

                  {/* Actions */}
                  <div className="relative" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => setActiveMenu(activeMenu === post.id ? null : post.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                    >
                      <MoreHorizontal size={16} className="text-gray-400" />
                    </button>

                    {activeMenu === post.id && (
                      <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl py-1 w-36 z-20">
                        <button
                          onClick={() => { navigate(`/admin/blog/edit/${post.id}`); setActiveMenu(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          <Edit2 size={14} />
                          Изменить
                        </button>
                        <button
                          onClick={() => { handleDelete(post.id); setActiveMenu(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        >
                          <Trash2 size={14} />
                          Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
