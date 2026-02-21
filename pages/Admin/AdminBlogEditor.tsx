
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogPost } from '../../types';
import { blogService } from '../../services/blogService';
import { supabase } from '../../services/supabaseClient';
import { ArrowLeft, Upload, CloudOff, Check, Loader2, Settings, X, ChevronDown } from 'lucide-react';
import { BlockEditor, blocksToHtml } from '../../components/admin/BlockEditor';

export const AdminBlogEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [coverDragging, setCoverDragging] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'DESIGN',
    imageUrl: '',
    readTime: '5 min',
    author: 'Interphase'
  });

  const contentRef = useRef(formData.content);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_session');
    if (!isAuth) {
      navigate('/admin');
      return;
    }
    if (id) loadPost(id);
  }, [id, navigate]);

  const loadPost = async (postId: string) => {
    setLoading(true);
    try {
      const post = await blogService.getPost(postId);
      if (post) {
        setFormData(post);
        contentRef.current = post.content;
      }
    } catch (error) {
      console.error('Failed to load post', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditorChange = useCallback((html: string) => {
    contentRef.current = html;
  }, []);

  const handleSubmit = async () => {
    setSaving(true);
    const payload = { ...formData, content: contentRef.current || '' };

    try {
      if (id) {
        await blogService.updatePost(id, payload);
      } else {
        await blogService.createPost(payload as Omit<BlogPost, 'id' | 'date'>);
      }
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        navigate('/admin/dashboard');
      }, 800);
    } catch (error) {
      console.error('Failed to save post', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const handleCoverUpload = async (file: File) => {
    if (!supabase) {
      const reader = new FileReader();
      reader.onload = () => setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      reader.readAsDataURL(file);
      return;
    }
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `cover-${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from('blog-images').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, imageUrl: data.publicUrl }));
    } catch (err) {
      console.error('Cover upload failed:', err);
      alert('Ошибка загрузки обложки');
    }
  };

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setCoverDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleCoverUpload(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-dark/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
        <div className="max-w-[1100px] mx-auto flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-1.5 -ml-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-sm text-gray-400 dark:text-gray-500">
              {id ? 'Редактирование' : 'Новая запись'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!supabase && (
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 mr-2" title="Offline mode">
                <CloudOff size={16} />
                <span className="text-xs font-medium">Offline</span>
              </div>
            )}

            <button
              onClick={() => setShowMeta(!showMeta)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${showMeta
                ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white'
                : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10'
                }`}
            >
              <Settings size={16} />
              <span className="hidden sm:inline">Настройки</span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={saving || !formData.title?.trim()}
              className="flex items-center gap-2 px-5 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-40"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : saved ? (
                <Check size={16} />
              ) : null}
              {saved ? 'Сохранено' : saving ? 'Сохранение...' : 'Опубликовать'}
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel (slide) */}
      {showMeta && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowMeta(false)}>
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
          <div
            className="relative w-full max-w-sm bg-white dark:bg-[#1a1a1a] h-full shadow-2xl overflow-y-auto animate-slide-in-right"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">Настройки записи</h3>
              <button onClick={() => setShowMeta(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Cover Image */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Обложка
                </label>
                {formData.imageUrl ? (
                  <div className="relative rounded-xl overflow-hidden aspect-video">
                    <img src={formData.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-lg text-white hover:bg-black/80 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={e => { e.preventDefault(); setCoverDragging(true); }}
                    onDragLeave={() => setCoverDragging(false)}
                    onDrop={handleCoverDrop}
                    onClick={() => coverInputRef.current?.click()}
                    className={`rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${coverDragging
                        ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-white/5'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                  >
                    <Upload size={24} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                    <p className="text-xs text-gray-400 dark:text-gray-500">Drag & drop или нажмите</p>
                  </div>
                )}
                <input ref={coverInputRef} type="file" className="hidden" accept="image/*"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f); }} />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Категория
                </label>
                <div className="relative">
                  <select
                    value={formData.category || 'DESIGN'}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full appearance-none px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white pr-8"
                  >
                    <option value="DESIGN">Design</option>
                    <option value="ART">Art</option>
                    <option value="CODE">Code</option>
                    <option value="CULTURE">Culture</option>
                    <option value="TECH">Tech</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Описание
                </label>
                <textarea
                  value={formData.excerpt || ''}
                  onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  placeholder="Краткое описание для карточки..."
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white placeholder:text-gray-300 dark:placeholder:text-gray-600 resize-none"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Автор
                </label>
                <input
                  type="text"
                  value={formData.author || ''}
                  onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
                />
              </div>

              {/* Read time */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Время чтения
                </label>
                <input
                  type="text"
                  value={formData.readTime || ''}
                  onChange={e => setFormData(prev => ({ ...prev, readTime: e.target.value }))}
                  placeholder="5 min"
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
                />
              </div>

              {/* Image URL (manual) */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  URL обложки
                </label>
                <input
                  type="text"
                  value={formData.imageUrl || ''}
                  onChange={e => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[900px] mx-auto px-6 py-12">
        {/* Title Input (inline like vc.ru) */}
        <input
          type="text"
          value={formData.title || ''}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Заголовок"
          className="w-full text-[40px] font-bold text-gray-900 dark:text-white bg-transparent border-none outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600 mb-2 leading-tight"
        />

        {/* Excerpt hint */}
        {!formData.excerpt && (
          <p className="text-sm text-gray-300 dark:text-gray-600 mb-8">
            Добавьте описание в настройках →
          </p>
        )}
        {formData.excerpt && (
          <p className="text-base text-gray-400 dark:text-gray-500 mb-8 leading-relaxed">
            {formData.excerpt}
          </p>
        )}

        {/* Cover Image Preview */}
        {formData.imageUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden">
            <img src={formData.imageUrl} alt="Cover" className="w-full h-auto max-h-[400px] object-cover" />
          </div>
        )}

        {/* Block Editor */}
        <BlockEditor
          initialHtml={formData.content || ''}
          onChange={handleEditorChange}
        />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};
