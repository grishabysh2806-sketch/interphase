
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogPost } from '../../types';
import { blogService } from '../../services/blogService';
import { ArrowLeft, Save, Image as ImageIcon, Bold, Italic, Link as LinkIcon, Upload, Quote } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';

export const AdminBlogEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastSelectionRef = useRef<Range | null>(null);
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
  const [isEditorFocused, setIsEditorFocused] = useState(false);

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
    const html = editorRef.current ? editorRef.current.innerHTML : formData.content || '';
    const payload = { ...formData, content: html };

    try {
      if (id) {
        await blogService.updatePost(id, payload);
      } else {
        await blogService.createPost(payload as Omit<BlogPost, 'id' | 'date'>);
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

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const normalizeContent = (value?: string) => {
    if (!value) return '';
    if (value.includes('<')) return value;
    const trimmed = value.trim();
    if (!trimmed) return '';
    const paragraphs = trimmed
      .split(/\n{2,}/)
      .map(block => block.split('\n').map(escapeHtml).join('<br/>'));
    return paragraphs.map(p => `<p>${p}</p>`).join('');
  };

  const syncEditorHtml = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    setFormData(prev => ({ ...prev, content: html }));
  };

  useEffect(() => {
    if (!editorRef.current || isEditorFocused) return;
    const normalized = normalizeContent(formData.content || '');
    if (editorRef.current.innerHTML !== normalized) {
      editorRef.current.innerHTML = normalized;
    }
  }, [formData.content, isEditorFocused]);

  useEffect(() => {
    const handleSelectionChange = () => {
      if (!editorRef.current) return;
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;
      const range = selection.getRangeAt(0);
      if (editorRef.current.contains(range.commonAncestorContainer)) {
        lastSelectionRef.current = range.cloneRange();
      }
    };
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const handleEditorKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      document.execCommand('insertHTML', false, '<p><br/></p>');
      syncEditorHtml();
    } else if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault();
      document.execCommand('insertHTML', false, '<br/>');
      syncEditorHtml();
    }
  };

  const handleEditorMouseUp = () => {
    const range = getEditorRange();
    if (range) {
      lastSelectionRef.current = range.cloneRange();
    }
  };

  const handleEditorKeyUp = () => {
    const range = getEditorRange();
    if (range) {
      lastSelectionRef.current = range.cloneRange();
    }
  };

  const handleEditorPaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    const text = event.clipboardData.getData('text/plain');
    if (!text) return;
    event.preventDefault();
    const blocks = text
      .replace(/\r\n/g, '\n')
      .split(/\n{2,}/)
      .map(block => block.split('\n').map(escapeHtml).join('<br/>'));
    const html = blocks.filter(Boolean).map(block => `<p>${block}</p>`).join('');
    insertHtmlAtCursor(html);
  };

  const getEditorRange = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      if (editorRef.current?.contains(range.commonAncestorContainer)) {
        return range;
      }
    }
    if (lastSelectionRef.current && editorRef.current?.contains(lastSelectionRef.current.commonAncestorContainer)) {
      return lastSelectionRef.current;
    }
    return null;
  };

  const setSelectionRange = (range: Range) => {
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
    lastSelectionRef.current = range.cloneRange();
  };

  const createRangeAtEnd = () => {
    if (!editorRef.current) return null;
    const range = document.createRange();
    range.selectNodeContents(editorRef.current);
    range.collapse(false);
    return range;
  };

  const insertHtmlAtCursor = (html: string) => {
    const range = getEditorRange() ?? createRangeAtEnd();
    if (!range) {
      return;
    }
    range.deleteContents();
    const fragment = range.createContextualFragment(html);
    const lastNode = fragment.lastChild;
    range.insertNode(fragment);
    if (lastNode) {
      range.setStartAfter(lastNode);
      range.collapse(true);
      setSelectionRange(range);
    }
    syncEditorHtml();
  };

  const normalizeEditorBlocks = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const blockTags = new Set(['P', 'DIV', 'BLOCKQUOTE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'UL', 'OL', 'LI', 'PRE', 'TABLE', 'IMG', 'FIGURE', 'HR']);
    const nodes = Array.from(editor.childNodes) as ChildNode[];
    let wrapper: HTMLParagraphElement | null = null;
    const ensureWrapper = (beforeNode?: ChildNode) => {
      if (!wrapper) {
        wrapper = document.createElement('p');
        if (beforeNode) {
          editor.insertBefore(wrapper, beforeNode);
        } else {
          editor.appendChild(wrapper);
        }
      }
      return wrapper;
    };
    const closeWrapper = () => {
      if (wrapper && !wrapper.childNodes.length) {
        wrapper.appendChild(document.createElement('br'));
      }
      wrapper = null;
    };
    nodes.forEach((node: ChildNode) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as Element;
        if (blockTags.has(el.tagName)) {
          closeWrapper();
          return;
        }
        const target = ensureWrapper(node);
        target.appendChild(node);
        return;
      }
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? '';
        if (!text.trim()) {
          if (wrapper) {
            wrapper.appendChild(node);
          } else {
            editor.removeChild(node);
          }
          return;
        }
        const target = ensureWrapper(node);
        target.appendChild(node);
        return;
      }
      const target = ensureWrapper(node);
      target.appendChild(node);
    });
    closeWrapper();
    if (!editor.childNodes.length) {
      editor.innerHTML = '<p><br/></p>';
    }
  };

  const replaceCurrentBlock = (tag: string, currentRange?: Range | null) => {
    const baseRange = currentRange ?? getEditorRange();
    const anchorNode = baseRange?.startContainer ?? null;
    if (!anchorNode) {
      return false;
    }
    const node = anchorNode instanceof Element ? anchorNode : anchorNode.parentElement;
    const block = node?.closest('p,div,blockquote,h1,h2,h3,h4,h5,h6');
    if (!block || !editorRef.current?.contains(block) || block === editorRef.current) {
      return false;
    }
    const replacement = document.createElement(tag);
    replacement.innerHTML = block.innerHTML;
    block.replaceWith(replacement);
    const newRange = document.createRange();
    newRange.selectNodeContents(replacement);
    newRange.collapse(false);
    setSelectionRange(newRange);
    syncEditorHtml();
    return true;
  };

  const applyBlockTag = (tag: string, providedRange?: Range | null) => {
    normalizeEditorBlocks();
    const range = getEditorRange() ?? createRangeAtEnd();
    if (!range) return;
    setSelectionRange(range);
    const selectedText = range.toString();
    if (selectedText.trim()) {
      const contents = range.extractContents();
      const wrapper = document.createElement(tag);
      wrapper.appendChild(contents);
      range.insertNode(wrapper);
      const after = document.createRange();
      after.setStartAfter(wrapper);
      after.collapse(true);
      setSelectionRange(after);
      syncEditorHtml();
      return;
    }
    const replaced = replaceCurrentBlock(tag, range);
    if (replaced) return;
    const anchorNode = range.startContainer;
    if (anchorNode.nodeType === Node.TEXT_NODE && anchorNode.parentNode === editorRef.current) {
      const wrapper = document.createElement(tag);
      const textNode = anchorNode as Text;
      const parent = textNode.parentNode;
      if (parent) {
        wrapper.appendChild(textNode);
        parent.insertBefore(wrapper, textNode);
        const newRange = document.createRange();
        newRange.selectNodeContents(wrapper);
        newRange.collapse(false);
        setSelectionRange(newRange);
        syncEditorHtml();
        return;
      }
    }
    insertHtmlAtCursor(`<${tag}><br/></${tag}>`);
  };

  const insertFormat = (tag: string) => {
    if (!editorRef.current) return;
    const range = getEditorRange();
    if (range) {
      setSelectionRange(range);
    }
    editorRef.current.focus();
    if (tag === 'b') {
      document.execCommand('bold');
      syncEditorHtml();
    } else if (tag === 'i') {
      document.execCommand('italic');
      syncEditorHtml();
    } else if (tag === 'h3' || tag === 'p' || tag === 'blockquote') {
      applyBlockTag(tag, null);
    }
  };

  const handleToolbarMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const range = getEditorRange();
    if (range) {
      lastSelectionRef.current = range.cloneRange();
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:', 'https://');
    if (!url) return;

    // Basic validation
    let validUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        validUrl = 'https://' + url;
    }

    const selectedText = getEditorRange()?.toString() || '';
    const linkText = selectedText || prompt('Enter link text:', 'link') || 'link';
    const textToInsert = `<a href="${validUrl}" target="_blank" rel="noopener noreferrer" class="text-brown dark:text-neon hover:underline">${escapeHtml(linkText)}</a>`;
    insertHtmlAtCursor(textToInsert);
  };

  const insertImageUrl = () => {
    const url = prompt('Image URL (must start with http/https):');
    if(url) {
       if (url.startsWith('http')) {
         insertHtmlAtCursor(`<img src="${url}" alt="Image" class="w-full h-auto rounded-2xl my-8 shadow-lg" loading="lazy" />`);
       } else {
         alert('Please enter a valid URL starting with http:// or https://');
       }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!supabase) {
      alert('Supabase is not configured. Cannot upload images.');
      return;
    }

    const uploadingToken = `uploading-${Date.now()}`;
    const uploadingText = `<span data-upload="${uploadingToken}">Uploading image...</span>`;
    insertHtmlAtCursor(uploadingText);
    
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
      const currentContent = editorRef.current?.innerHTML || formData.content || '';
      const newContent = currentContent.replace(
        new RegExp(`<span data-upload="${uploadingToken}">[\\s\\S]*?<\\/span>`),
        `<img src="${data.publicUrl}" alt="Blog Image" class="w-full h-auto rounded-2xl my-8 shadow-lg" loading="lazy" />`
      );
      if (editorRef.current) {
        editorRef.current.innerHTML = newContent;
      }
      setFormData(prev => ({ ...prev, content: newContent }));

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please ensure you have created a public bucket named "blog-images" in Supabase.');
      // Remove placeholder
      const currentContent = editorRef.current?.innerHTML || formData.content || '';
      const cleaned = currentContent.replace(
        new RegExp(`<span data-upload="${uploadingToken}">[\\s\\S]*?<\\/span>`),
        ''
      );
      if (editorRef.current) {
        editorRef.current.innerHTML = cleaned;
      }
      setFormData(prev => ({ ...prev, content: cleaned }));
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
                 <button type="button" onMouseDown={handleToolbarMouseDown} onClick={() => insertFormat('b')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors" title="Bold">
                   <Bold size={18} className="text-charcoal dark:text-white" />
                 </button>
                 <button type="button" onMouseDown={handleToolbarMouseDown} onClick={() => insertFormat('i')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors" title="Italic">
                   <Italic size={18} className="text-charcoal dark:text-white" />
                 </button>
                 <button type="button" onMouseDown={handleToolbarMouseDown} onClick={() => insertFormat('h3')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors font-bold text-charcoal dark:text-white text-sm" title="Header">
                   H3
                 </button>
                 <button type="button" onMouseDown={handleToolbarMouseDown} onClick={() => insertFormat('p')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors font-bold text-charcoal dark:text-white text-sm" title="Paragraph">
                   P
                 </button>
                 <button type="button" onMouseDown={handleToolbarMouseDown} onClick={() => insertFormat('blockquote')} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors" title="Quote">
                   <Quote size={18} className="text-charcoal dark:text-white" />
                 </button>
                 <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                 <button type="button" onMouseDown={handleToolbarMouseDown} onClick={insertLink} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors group" title="Link">
                   <LinkIcon size={18} className="text-charcoal dark:text-white group-hover:text-blue-500 transition-colors" />
                 </button>
                 <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                 <button type="button" onMouseDown={handleToolbarMouseDown} onClick={insertImageUrl} className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded transition-colors group" title="Insert Image by URL">
                   <ImageIcon size={18} className="text-charcoal dark:text-white group-hover:text-green-500 transition-colors" />
                 </button>
                 <button type="button" onMouseDown={handleToolbarMouseDown} onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-3 py-1.5 bg-brown dark:bg-neon text-white dark:text-charcoal text-xs font-bold uppercase rounded ml-auto hover:opacity-90 transition-opacity">
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

              <div
                ref={editorRef}
                contentEditable
                onInput={syncEditorHtml}
                onKeyDown={handleEditorKeyDown}
                onKeyUp={handleEditorKeyUp}
                onMouseUp={handleEditorMouseUp}
                onPaste={handleEditorPaste}
                onFocus={() => setIsEditorFocused(true)}
                onBlur={() => setIsEditorFocused(false)}
                className="min-h-[320px] w-full px-4 py-3 bg-gray-50 dark:bg-charcoal/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:border-brown dark:focus:border-neon text-charcoal dark:text-white text-sm prose prose-sm dark:prose-invert max-w-none prose-h3:text-xl prose-h3:font-bold prose-h3:tracking-tight prose-blockquote:border-l-4 prose-blockquote:border-brown/40 dark:prose-blockquote:border-neon/40 prose-blockquote:pl-4 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300"
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
                  className="prose dark:prose-invert max-w-none prose-lg prose-img:rounded-2xl prose-headings:font-display prose-h3:tracking-tight prose-blockquote:border-l-4 prose-blockquote:border-brown/40 dark:prose-blockquote:border-neon/40 prose-blockquote:pl-4 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-300 prose-a:text-brown dark:prose-a:text-neon hover:prose-a:opacity-80 transition-opacity"
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
