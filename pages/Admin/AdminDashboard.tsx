
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogPost } from '../../types';
import { blogService } from '../../services/blogService';
import { Plus, Edit2, Trash2, LogOut } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
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
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogService.deletePost(id);
        setPosts(posts.filter(p => p.id !== id));
      } catch (error) {
        console.error('Failed to delete post', error);
        alert('Failed to delete post');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-bone dark:bg-dark p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-display font-bold text-charcoal dark:text-white">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/admin/blog/new')}
              className="flex items-center gap-2 px-6 py-3 bg-brown dark:bg-neon text-white dark:text-charcoal font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity"
            >
              <Plus size={20} />
              Add Blog
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-charcoal/50 text-charcoal dark:text-white font-bold uppercase tracking-wider rounded-lg hover:bg-gray-300 dark:hover:bg-charcoal/70 transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="bg-white dark:bg-card/30 p-6 rounded-xl border border-charcoal/10 dark:border-white/10 flex flex-col md:flex-row gap-6 items-start md:items-center"
              >
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-charcoal">
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-charcoal dark:text-white mb-2">{post.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="uppercase tracking-wider">{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                    className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            {posts.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No blog posts found. Create your first one!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
