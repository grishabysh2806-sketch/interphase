
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogPost } from '../../types';
import { blogService } from '../../services/blogService';
import { ArrowLeft, Save, Image as ImageIcon, Bold, Italic, Link as LinkIcon, Upload } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

export const AdminBlogEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    category: 'DESIGN',
    imageUrl: '',
    readTime: '5 min',
    author: 'Interphase'
  });

  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_session');
    if (!isAuth) {
      navigate('/admin');
      return;
    }

    if (id) {
      loadPost(id);
    }
  }, [id, navigate]);

  const loadPost = async (postId: string) => {
    setLoading(true);
    try {
      const post = await blogService.getPost(postId);
      if (post) {
        setFormData(post);
      }
    } catch (error) {
      console.error('Failed to load post', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await blogService.updatePost(id, formData);
      } else {
        await blogService.createPost(formData as Omit<BlogPost, 'id' | 'date'>);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Failed to save post', error);
      alert('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const insertFormat = (tag: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content || '';
    const selectedText = text.substring(start, end);

    let newText;
    let newCursorPos;

    if (tag === 'br') {
        // Line break
        newText = text.substring(0, start) + '<br/>\n' + text.substring(end);
        newCursorPos = start + 6;
    } else if (tag === 'h3') {
        // Header
        const headerText = selectedText || 'Header';
        newText = text.substring(0, start) + `\n<h3>${headerText}</h3>\n` + text.substring(end);
        newCursorPos = start + headerText.length + 10;
    } else if (tag === 'p') {
        // Paragraph
        const pText = selectedText || 'Paragraph text...';
        newText = text.substring(0, start) + `\n<p>${pText}</p>\n` + text.substring(end);
        newCursorPos = start + pText.length + 8;
    } else if (selectedText) {
      // Wrap selected text (bold, italic)
      newText = text.substring(0, start) + `<${tag}>` + selectedText + `</${tag}>` + text.substring(end);
      newCursorPos = start + selectedText.length + tag.length * 2 + 5; 
    } else {
      // Insert empty tags
      const tagString = `<${tag}></${tag}>`;
      newText = text.substring(0, start) + tagString + text.substring(end);
      newCursorPos = start + tag.length + 2; 
    }
    
    setFormData(prev => ({ ...prev, content: newText }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertLink = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content || '';
    const selectedText = text.substring(start, end);

    const url = prompt('Enter URL:', 'https://');
    if (!url) return;

    // Basic validation
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        validUrl = 'https://' + url;
    }

    const linkText = selectedText || prompt('Enter link text:', 'link') || 'link';
    const textToInsert = `<a href="${validUrl}" target="_blank" rel="noopener noreferrer" class="text-brown dark:text-neon hover:underline">${linkText}</a>`;

    const newText = text.substring(0, start) + textToInsert + text.substring(end);
    setFormData(prev => ({ ...prev, content: newText }));
    
    setTimeout(() => {
      textarea.focus();
      const newPos = start + textToInsert.length;
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const insertImageUrl = () => {
    const url = prompt('Image URL (must start with http/https):');
    if(url) {
       if (url.startsWith('http')) {
         insertAtCursor(`\n<img src="${url}" alt="Image" class="w-full h-auto rounded-2xl my-8 shadow-lg" loading="lazy" />\n`);
       } else {
         alert('Please enter a valid URL starting with http:// or https://');
       }
    }
  };

  const insertAtCursor = (textToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content || '';
    
    const newText = text.substring(0, start) + textToInsert + text.substring(end);
    
    setFormData(prev => ({ ...prev, content: newText }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textToInsert.length, start + textToInsert.length);
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!supabase) {
      alert('Supabase is not configured. Cannot upload images.');
      return;
    }

    const uploadingText = ' [Uploading image...] ';
    insertAtCursor(uploadingText);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
      
      // Replace placeholder with actual image tag
      const textarea = textareaRef.current;
      if (textarea && formData.content) {
        const currentContent = formData.content;
        const newContent = currentContent.replace(uploadingText, `\n<img src="${data.publicUrl}" alt="Blog Image" class="w-full h-auto rounded-2xl my-8 shadow-lg" loading="lazy" />\n`);
        setFormData(prev => ({ ...prev, content: newContent }));
      }

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please ensure you have created a public bucket named "blog-images" in Supabase.');
      // Remove placeholder
      setFormData(prev => ({ ...prev, content: (prev.content || '').replace(uploadingText, '') }));
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-bone dark:bg-dark p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-gray-200 dark:hover:bg-charcoal/50 rounded-lg transition-colors"
            >
              <ArrowLeft className="text-charcoal dark:text-white" />
            </button>
            <h1 className="text-3xl font-display font-bold text-charcoal dark:text-white">
              {id ? 'Edit Blog' : 'New Blog'}
            </h1>
          </div>
          
          <button 
            type="button" 
            onClick={() => setShowPreview(!showPreview)} 
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors border ${showPreview ? 'bg-brown dark:bg-neon text-white dark:text-charcoal border-brown dark:border-neon' : 'bg-transparent border-charcoal/20 dark:border-white/20 text-charcoal dark:text-white hover:bg-charcoal/5 dark:hover:bg-white/5'}`}
          >
            {showPreview ? 'Close Preview' : 'Show Preview'}
          </button>
        </div>

        <div className={`grid grid-cols-1 ${showPreview ? 'lg:grid-cols-2' : ''} gap-8`}>
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-card/30 p-8 rounded-2xl border border-charcoal/10 dark:border-white/10 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brown dark:focus:border-neon text-charcoal dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brown dark:focus:border-neon text-charcoal dark:text-white"
                >
                  <option value="DESIGN">DESIGN</option>
                  <option value="ART">ART</option>
                  <option value="CODE">CODE</option>
                  <option value="CULTURE">CULTURE</option>
                  <option value="TECH">TECH</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Main Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brown dark:focus:border-neon text-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Excerpt (Short Description)
              </label>
              <textarea
                name="excerpt"
                required
                rows={3}
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brown dark:focus:border-neon text-charcoal dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                Content
              </label>
              
              {/* Editor Toolbar */}
              <div className="flex items-center gap-2 mb-2 p-2 bg-gray-50 dark:bg-charcoal/50 rounded-lg border border-gray-200 dark:border-gray-700 flex-wrap">
                 <button type="button" onClick={() => insertFormat('b')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors" title="Bold">
                   <Bold size={18} className="text-charcoal dark:text-white" />
                 </button>
                 <button type="button" onClick={() => insertFormat('i')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors" title="Italic">
                   <Italic size={18} className="text-charcoal dark:text-white" />
                 </button>
                 <button type="button" onClick={() => insertFormat('h3')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors font-bold text-charcoal dark:text-white text-sm" title="Header">
                   H3
                 </button>
                 <button type="button" onClick={() => insertFormat('p')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors font-bold text-charcoal dark:text-white text-sm" title="Paragraph">
                   P
                 </button>
                 <button type="button" onClick={() => insertFormat('br')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors font-bold text-charcoal dark:text-white text-sm" title="Line Break">
                   BR
                 </button>
                 <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                 <button type="button" onClick={insertLink} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors group" title="Link">
                   <LinkIcon size={18} className="text-charcoal dark:text-white group-hover:text-blue-500 transition-colors" />
                 </button>
                 <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                 <button type="button" onClick={insertImageUrl} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors group" title="Insert Image by URL">
                   <ImageIcon size={18} className="text-charcoal dark:text-white group-hover:text-green-500 transition-colors" />
                 </button>
                 <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-1.5 bg-brown dark:bg-neon text-white dark:text-charcoal text-xs font-bold uppercase rounded ml-auto hover:opacity-90 transition-opacity">
                   <Upload size={14} />
                   <span>Upload Image</span>
                 </button>
                 <input 
                   type="file" 
                   ref={fileInputRef} 
                   className="hidden" 
                   accept="image/*"
                   onChange={handleImageUpload}
                 />
              </div>
              <p className="text-xs text-gray-500 mb-2">
                Tip: Use the image button to insert images. Pasting URLs directly will result in text.
              </p>

              <textarea
                ref={textareaRef}
                name="content"
                required
                rows={20}
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brown dark:focus:border-neon text-charcoal dark:text-white font-mono text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brown dark:focus:border-neon text-charcoal dark:text-white"
                />
              </div>
              
               <div>
                <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-charcoal/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brown dark:focus:border-neon text-charcoal dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-brown dark:bg-neon text-white dark:text-charcoal font-bold uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? 'Saving...' : 'Save Blog Post'}
              </button>
            </div>

          </form>

          {/* Preview Panel */}
          {showPreview && (
            <div className="space-y-8">
              <div className="sticky top-8 bg-white dark:bg-card/30 p-8 rounded-2xl border border-charcoal/10 dark:border-white/10 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Live Preview
                </h2>
                
                <h1 className="text-3xl md:text-5xl font-display font-bold text-charcoal dark:text-white mb-6">
                  {formData.title || 'Untitled Post'}
                </h1>

                {formData.imageUrl && (
                  <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8">
                    <img 
                      src={formData.imageUrl} 
                      alt={formData.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div 
                  className="prose dark:prose-invert max-w-none prose-lg prose-img:rounded-2xl prose-headings:font-display prose-a:text-brown dark:prose-a:text-neon hover:prose-a:opacity-80 transition-opacity"
                  dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-400 italic">Start typing to see content...</p>' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
