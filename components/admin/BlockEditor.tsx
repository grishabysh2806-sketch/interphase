
import React, { useState, useRef, useCallback, useEffect, KeyboardEvent } from 'react';
import { Plus, GripVertical, Trash2, Image as ImageIcon, Upload } from 'lucide-react';
import { EditorBlock, BlockType } from '../../types';
import { InlineToolbar } from './InlineToolbar';
import { BlockToolbox } from './BlockToolbox';
import { supabase } from '../../services/supabaseClient';

// Generate unique block id
const uid = () => Math.random().toString(36).slice(2, 10);

const createBlock = (type: BlockType, data: Record<string, any> = {}): EditorBlock => ({
    id: uid(),
    type,
    data: type === 'paragraph' ? { text: '', ...data }
        : type === 'heading' ? { text: '', level: 2, ...data }
            : type === 'image' ? { url: '', caption: '', ...data }
                : type === 'quote' ? { text: '', author: '', ...data }
                    : type === 'list' ? { items: [''], style: 'unordered', ...data }
                        : type === 'code' ? { text: '', language: '', ...data }
                            : data,
});

// Convert blocks to HTML for storage
export const blocksToHtml = (blocks: EditorBlock[]): string => {
    return blocks.map(block => {
        switch (block.type) {
            case 'paragraph':
                return `<p>${block.data.text || ''}</p>`;
            case 'heading': {
                const htag = `h${block.data.level || 2}`;
                return `<${htag}>${block.data.text || ''}</${htag}>`;
            }
            case 'image': {
                const cap = block.data.caption ? `<figcaption>${block.data.caption}</figcaption>` : '';
                return `<figure><img src="${block.data.url || ''}" alt="${block.data.caption || 'Image'}" class="w-full h-auto rounded-2xl" loading="lazy" />${cap}</figure>`;
            }
            case 'quote': {
                const auth = block.data.author ? `<cite>— ${block.data.author}</cite>` : '';
                return `<blockquote><p>${block.data.text || ''}</p>${auth}</blockquote>`;
            }
            case 'list': {
                const lt = block.data.style === 'ordered' ? 'ol' : 'ul';
                const li = (block.data.items || []).map((item: string) => `<li>${item}</li>`).join('');
                return `<${lt}>${li}</${lt}>`;
            }
            case 'delimiter':
                return '<hr />';
            case 'code':
                return `<pre><code>${block.data.text || ''}</code></pre>`;
            default:
                return '';
        }
    }).filter(Boolean).join('\n');
};

// Parse HTML back to blocks  
export const htmlToBlocks = (html: string): EditorBlock[] => {
    if (!html || !html.trim()) return [createBlock('paragraph')];
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
    const container = doc.body.firstElementChild;
    if (!container) return [createBlock('paragraph')];
    const blocks: EditorBlock[] = [];
    container.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent?.trim();
            if (text) blocks.push(createBlock('paragraph', { text }));
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        const el = node as Element;
        const t = el.tagName.toLowerCase();
        if (t === 'p') blocks.push(createBlock('paragraph', { text: el.innerHTML }));
        else if (/^h[1-4]$/.test(t)) blocks.push(createBlock('heading', { text: el.innerHTML, level: parseInt(t[1]) }));
        else if (t === 'figure') {
            const img = el.querySelector('img');
            const fc = el.querySelector('figcaption');
            blocks.push(createBlock('image', { url: img?.getAttribute('src') || '', caption: fc?.textContent || '' }));
        } else if (t === 'img') blocks.push(createBlock('image', { url: el.getAttribute('src') || '', caption: el.getAttribute('alt') || '' }));
        else if (t === 'blockquote') {
            const p = el.querySelector('p');
            const c = el.querySelector('cite');
            blocks.push(createBlock('quote', { text: p?.innerHTML || el.innerHTML, author: c?.textContent?.replace(/^—\s*/, '') || '' }));
        } else if (t === 'ul' || t === 'ol') {
            const items = Array.from(el.querySelectorAll('li')).map(li => li.innerHTML);
            blocks.push(createBlock('list', { items: items.length ? items : [''], style: t === 'ol' ? 'ordered' : 'unordered' }));
        } else if (t === 'hr') blocks.push(createBlock('delimiter'));
        else if (t === 'pre') {
            const code = el.querySelector('code');
            blocks.push(createBlock('code', { text: code?.textContent || el.textContent || '' }));
        } else blocks.push(createBlock('paragraph', { text: el.innerHTML }));
    });
    return blocks.length ? blocks : [createBlock('paragraph')];
};

// ================================================================
// ContentEditable component that doesn't fight with React re-renders
// ================================================================
interface EditableProps {
    html: string;
    onChange: (html: string) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
    className?: string;
    placeholder?: string;
    tagName?: string;
}

const Editable: React.FC<EditableProps> = React.memo(({ html, onChange, onKeyDown, className, placeholder }) => {
    const ref = useRef<HTMLDivElement>(null);
    const lastHtml = useRef(html);

    // Only set innerHTML when the value changed externally  
    // (not from user typing — which is tracked by lastHtml)
    useEffect(() => {
        if (ref.current && html !== lastHtml.current) {
            lastHtml.current = html;
            ref.current.innerHTML = html;
        }
    }, [html]);

    // Set initial content
    useEffect(() => {
        if (ref.current && html) {
            ref.current.innerHTML = html;
            lastHtml.current = html;
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleInput = useCallback(() => {
        if (!ref.current) return;
        const newHtml = ref.current.innerHTML;
        lastHtml.current = newHtml;
        onChange(newHtml);
    }, [onChange]);

    return (
        <div
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            data-placeholder={placeholder}
            className={className}
            onInput={handleInput}
            onKeyDown={onKeyDown}
        />
    );
});

Editable.displayName = 'Editable';

// ================================================================
// Image Upload Placeholder (no prompt!)
// ================================================================
interface ImageUploadPlaceholderProps {
    blockId: string;
    onUrlSet: (url: string) => void;
    onFileSelect: () => void;
    onFileDrop: (file: File) => void;
}

const ImageUploadPlaceholder: React.FC<ImageUploadPlaceholderProps> = ({ blockId, onUrlSet, onFileSelect, onFileDrop }) => {
    const [urlInput, setUrlInput] = useState('');
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            onFileDrop(file);
        }
    };

    const handleUrlSubmit = () => {
        const url = urlInput.trim();
        if (url) {
            onUrlSet(url);
            setUrlInput('');
            setShowUrlInput(false);
        }
    };

    return (
        <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${dragging
                ? 'border-gray-900 dark:border-white bg-gray-50 dark:bg-white/5'
                : 'border-gray-200 dark:border-gray-700'
                }`}
        >
            <ImageIcon size={36} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Перетащите изображение сюда</p>

            {showUrlInput ? (
                <div className="flex gap-2 max-w-md mx-auto">
                    <input
                        type="text"
                        value={urlInput}
                        onChange={e => setUrlInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleUrlSubmit(); if (e.key === 'Escape') setShowUrlInput(false); }}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 px-3 py-2 text-sm bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-white"
                        autoFocus
                    />
                    <button
                        onClick={handleUrlSubmit}
                        disabled={!urlInput.trim()}
                        className="px-4 py-2 text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
                    >
                        OK
                    </button>
                    <button
                        onClick={() => setShowUrlInput(false)}
                        className="px-3 py-2 text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                        ✕
                    </button>
                </div>
            ) : (
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => setShowUrlInput(true)}
                        className="px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                    >
                        Вставить URL
                    </button>
                    <button
                        onClick={onFileSelect}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        <Upload size={14} />
                        Загрузить
                    </button>
                </div>
            )}
        </div>
    );
};

// ================================================================
// BlockEditor
// ================================================================
interface BlockEditorProps {
    initialHtml?: string;
    onChange?: (html: string, blocks: EditorBlock[]) => void;
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ initialHtml, onChange }) => {
    const [blocks, setBlocks] = useState<EditorBlock[]>(() => htmlToBlocks(initialHtml || ''));
    const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);
    const [toolboxState, setToolboxState] = useState<{ visible: boolean; blockId: string; position: { top: number; left: number }; filter: string } | null>(null);
    const [dragState, setDragState] = useState<{ dragId: string; overId: string | null } | null>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const blockRefs = useRef<Map<string, HTMLDivElement>>(new Map());
    const fileInputRef = useRef<HTMLInputElement>(null);
    const uploadBlockIdRef = useRef<string | null>(null);
    const blocksRef = useRef(blocks);
    blocksRef.current = blocks;

    // Sync changes upward (debounced via ref to avoid excessive re-renders)
    const onChangeRef = useRef(onChange);
    onChangeRef.current = onChange;

    useEffect(() => {
        if (onChangeRef.current) {
            onChangeRef.current(blocksToHtml(blocks), blocks);
        }
    }, [blocks]);

    // Reset blocks when initialHtml changes externally
    const initialHtmlRef = useRef(initialHtml);
    useEffect(() => {
        if (initialHtml !== undefined && initialHtml !== initialHtmlRef.current) {
            initialHtmlRef.current = initialHtml;
            setBlocks(htmlToBlocks(initialHtml || ''));
        }
    }, [initialHtml]);

    // Listen for block-type-change events from InlineToolbar
    useEffect(() => {
        const handler = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail?.blockId) {
                setBlocks(prev => prev.map(b => b.id === detail.blockId ? {
                    ...b,
                    type: detail.newType,
                    data: { ...b.data, level: detail.level },
                } : b));
            }
        };
        const el = editorRef.current;
        el?.addEventListener('block-type-change', handler);
        return () => el?.removeEventListener('block-type-change', handler);
    }, []);

    const updateBlockData = useCallback((id: string, key: string, value: any) => {
        setBlocks(prev => prev.map(b => b.id === id ? { ...b, data: { ...b.data, [key]: value } } : b));
    }, []);

    const updateBlock = useCallback((id: string, updater: (b: EditorBlock) => EditorBlock) => {
        setBlocks(prev => prev.map(b => b.id === id ? updater(b) : b));
    }, []);

    const focusBlock = useCallback((blockId: string) => {
        requestAnimationFrame(() => {
            const el = blockRefs.current.get(blockId);
            const editable = el?.querySelector('[contenteditable]') as HTMLElement | null;
            if (editable) editable.focus();
            else el?.focus();
            setFocusedBlockId(blockId);
        });
    }, []);

    const addBlockAfter = useCallback((afterId: string, type: BlockType, data: Record<string, any> = {}) => {
        const newBlock = createBlock(type, data);
        setBlocks(prev => {
            const idx = prev.findIndex(b => b.id === afterId);
            const next = [...prev];
            next.splice(idx + 1, 0, newBlock);
            return next;
        });
        focusBlock(newBlock.id);
        return newBlock.id;
    }, [focusBlock]);

    const deleteBlock = useCallback((id: string) => {
        setBlocks(prev => {
            if (prev.length <= 1) return [createBlock('paragraph')];
            const idx = prev.findIndex(b => b.id === id);
            const next = prev.filter(b => b.id !== id);
            const focusIdx = Math.max(0, idx - 1);
            requestAnimationFrame(() => {
                const focusB = next[focusIdx];
                if (focusB) {
                    const el = blockRefs.current.get(focusB.id);
                    const editable = el?.querySelector('[contenteditable]') as HTMLElement | null;
                    if (editable) editable.focus();
                }
            });
            return next;
        });
    }, []);

    const makeBlockKeyDown = useCallback((blockId: string) => (e: KeyboardEvent<HTMLDivElement>) => {
        const currentBlocks = blocksRef.current;
        const block = currentBlocks.find(b => b.id === blockId);
        if (!block) return;

        if (e.key === 'Enter' && !e.shiftKey && block.type !== 'code' && block.type !== 'list') {
            e.preventDefault();
            addBlockAfter(blockId, 'paragraph');
        }

        if (e.key === 'Backspace' && block.type !== 'list') {
            const el = e.target as HTMLElement;
            const text = el.textContent || '';
            const sel = window.getSelection();
            const offset = sel?.anchorOffset || 0;
            if (offset === 0 && !text.trim()) {
                e.preventDefault();
                deleteBlock(blockId);
            }
        }

        // Slash command
        if (e.key === '/' && block.type === 'paragraph') {
            const text = (e.target as HTMLElement).textContent || '';
            if (text.trim() === '') {
                e.preventDefault();
                const el = blockRefs.current.get(blockId);
                if (el && editorRef.current) {
                    const rect = el.getBoundingClientRect();
                    const editorRect = editorRef.current.getBoundingClientRect();
                    setToolboxState({
                        visible: true,
                        blockId,
                        position: { top: rect.bottom - editorRect.top + 4, left: 40 },
                        filter: '',
                    });
                }
            }
        }

        // Arrow navigation between blocks
        if (e.key === 'ArrowUp') {
            const sel = window.getSelection();
            if (sel && sel.anchorOffset === 0) {
                const idx = currentBlocks.findIndex(b => b.id === blockId);
                if (idx > 0) {
                    e.preventDefault();
                    focusBlock(currentBlocks[idx - 1].id);
                }
            }
        }
        if (e.key === 'ArrowDown') {
            const sel = window.getSelection();
            const nodeText = sel?.anchorNode?.textContent || '';
            if (sel && sel.anchorOffset >= nodeText.length) {
                const idx = currentBlocks.findIndex(b => b.id === blockId);
                if (idx < currentBlocks.length - 1) {
                    e.preventDefault();
                    focusBlock(currentBlocks[idx + 1].id);
                }
            }
        }
    }, [addBlockAfter, deleteBlock, focusBlock]);

    const showToolbox = (blockId: string) => {
        const el = blockRefs.current.get(blockId);
        if (!el || !editorRef.current) return;
        const rect = el.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();
        setToolboxState({
            visible: true,
            blockId,
            position: { top: rect.bottom - editorRect.top + 4, left: 40 },
            filter: '',
        });
    };

    const handleToolboxSelect = (type: BlockType, data?: Record<string, any>) => {
        if (!toolboxState) return;
        const { blockId } = toolboxState;
        const block = blocks.find(b => b.id === blockId);

        const isEmptyParagraph = block && block.type === 'paragraph' && !(block.data.text || '').trim();

        if (isEmptyParagraph) {
            // Replace the empty paragraph with the new block type
            const newBlock = createBlock(type, data);
            updateBlock(blockId, () => ({ ...newBlock, id: blockId }));
            if (type !== 'image' && type !== 'delimiter') {
                focusBlock(blockId);
            }
        } else {
            addBlockAfter(blockId, type, data);
        }
        setToolboxState(null);
    };

    // Upload image file (shared between file input and drag-and-drop)
    const readFileAsBase64 = (file: File, blockId: string) => {
        const reader = new FileReader();
        reader.onload = () => updateBlockData(blockId, 'url', reader.result as string);
        reader.readAsDataURL(file);
    };

    const handleImageFile = async (file: File, blockId: string) => {
        if (!supabase) {
            readFileAsBase64(file, blockId);
            return;
        }
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
            const { error } = await supabase.storage.from('blog-images').upload(fileName, file);
            if (error) throw error;
            const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
            updateBlockData(blockId, 'url', data.publicUrl);
        } catch (err) {
            console.warn('Supabase upload failed, using base64 fallback:', err);
            // Fallback: convert to base64 so image still works
            readFileAsBase64(file, blockId);
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    // File input handler
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const blockId = uploadBlockIdRef.current;
        if (!file || !blockId) return;
        handleImageFile(file, blockId);
    };

    // Drag and drop
    const handleDragStart = (blockId: string) => setDragState({ dragId: blockId, overId: null });
    const handleDragOver = (e: React.DragEvent, blockId: string) => {
        e.preventDefault();
        if (dragState) setDragState({ ...dragState, overId: blockId });
    };
    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        if (!dragState) return;
        const { dragId } = dragState;
        if (dragId === targetId) { setDragState(null); return; }
        setBlocks(prev => {
            const dragIdx = prev.findIndex(b => b.id === dragId);
            const targetIdx = prev.findIndex(b => b.id === targetId);
            const next = [...prev];
            const [moved] = next.splice(dragIdx, 1);
            next.splice(targetIdx, 0, moved);
            return next;
        });
        setDragState(null);
    };

    // Render block content
    const renderBlockContent = (block: EditorBlock) => {
        switch (block.type) {
            case 'paragraph':
                return (
                    <Editable
                        html={block.data.text || ''}
                        onChange={(html) => updateBlockData(block.id, 'text', html)}
                        onKeyDown={makeBlockKeyDown(block.id)}
                        placeholder="Начните писать или нажмите / для выбора блока..."
                        className="outline-none text-[17px] leading-[1.7] text-gray-800 dark:text-gray-200 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 dark:empty:before:text-gray-600 empty:before:cursor-text py-1"
                    />
                );

            case 'heading': {
                const hClass = block.data.level === 3
                    ? 'text-xl font-bold leading-tight'
                    : 'text-[28px] font-bold leading-tight';
                return (
                    <Editable
                        html={block.data.text || ''}
                        onChange={(html) => updateBlockData(block.id, 'text', html)}
                        onKeyDown={makeBlockKeyDown(block.id)}
                        placeholder={block.data.level === 3 ? 'Подзаголовок' : 'Заголовок'}
                        className={`outline-none ${hClass} text-gray-900 dark:text-white empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 dark:empty:before:text-gray-600 empty:before:cursor-text py-1`}
                    />
                );
            }

            case 'image':
                return (
                    <div className="py-3">
                        {block.data.url ? (
                            <figure className="relative group/img">
                                <img src={block.data.url} alt={block.data.caption || ''} className="w-full h-auto rounded-xl max-h-[500px] object-cover" />
                                <input
                                    type="text"
                                    placeholder="Подпись к изображению"
                                    value={block.data.caption || ''}
                                    onChange={e => updateBlockData(block.id, 'caption', e.target.value)}
                                    className="w-full mt-2 text-center text-sm text-gray-500 dark:text-gray-400 bg-transparent border-none outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                                />
                            </figure>
                        ) : (
                            <ImageUploadPlaceholder
                                blockId={block.id}
                                onUrlSet={(url) => updateBlockData(block.id, 'url', url)}
                                onFileSelect={() => {
                                    uploadBlockIdRef.current = block.id;
                                    fileInputRef.current?.click();
                                }}
                                onFileDrop={(file) => {
                                    uploadBlockIdRef.current = block.id;
                                    handleImageFile(file, block.id);
                                }}
                            />
                        )}
                    </div>
                );

            case 'quote':
                return (
                    <div className="border-l-[3px] border-gray-900 dark:border-white pl-5 py-2 my-2">
                        <Editable
                            html={block.data.text || ''}
                            onChange={(html) => updateBlockData(block.id, 'text', html)}
                            onKeyDown={makeBlockKeyDown(block.id)}
                            placeholder="Текст цитаты..."
                            className="outline-none text-lg italic text-gray-700 dark:text-gray-300 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 dark:empty:before:text-gray-600 empty:before:not-italic empty:before:cursor-text"
                        />
                        <input
                            type="text"
                            placeholder="— Автор"
                            value={block.data.author || ''}
                            onChange={e => updateBlockData(block.id, 'author', e.target.value)}
                            className="mt-2 text-sm text-gray-400 dark:text-gray-500 bg-transparent border-none outline-none placeholder:text-gray-300 dark:placeholder:text-gray-600"
                        />
                    </div>
                );

            case 'list': {
                const items: string[] = block.data.items || [''];
                const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
                return (
                    <ListTag className={`py-1 space-y-1 ${block.data.style === 'ordered' ? 'list-decimal' : 'list-disc'} ml-5`}>
                        {items.map((item: string, i: number) => (
                            <li key={i}>
                                <Editable
                                    html={item}
                                    onChange={(html) => {
                                        const newItems = [...items];
                                        newItems[i] = html;
                                        updateBlockData(block.id, 'items', newItems);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            const currentText = (e.target as HTMLElement).textContent || '';
                                            if (!currentText.trim() && items.length > 1) {
                                                const newItems = items.filter((_, idx) => idx !== i);
                                                updateBlockData(block.id, 'items', newItems);
                                                addBlockAfter(block.id, 'paragraph');
                                            } else {
                                                const newItems = [...items];
                                                newItems.splice(i + 1, 0, '');
                                                updateBlockData(block.id, 'items', newItems);
                                                requestAnimationFrame(() => {
                                                    const el = blockRefs.current.get(block.id);
                                                    const lis = el?.querySelectorAll('[contenteditable]');
                                                    if (lis && lis[i + 1]) (lis[i + 1] as HTMLElement).focus();
                                                });
                                            }
                                        }
                                        if (e.key === 'Backspace') {
                                            const text = (e.target as HTMLElement).textContent || '';
                                            const sel = window.getSelection();
                                            if (sel?.anchorOffset === 0 && !text) {
                                                e.preventDefault();
                                                if (items.length <= 1) {
                                                    deleteBlock(block.id);
                                                } else {
                                                    const newItems = items.filter((_, idx) => idx !== i);
                                                    updateBlockData(block.id, 'items', newItems);
                                                    requestAnimationFrame(() => {
                                                        const el = blockRefs.current.get(block.id);
                                                        const lis = el?.querySelectorAll('[contenteditable]');
                                                        const fIdx = Math.max(0, i - 1);
                                                        if (lis && lis[fIdx]) (lis[fIdx] as HTMLElement).focus();
                                                    });
                                                }
                                            }
                                        }
                                    }}
                                    placeholder="Пункт списка"
                                    className="outline-none text-[17px] leading-[1.7] text-gray-800 dark:text-gray-200 empty:before:content-[attr(data-placeholder)] empty:before:text-gray-300 dark:empty:before:text-gray-600 empty:before:cursor-text"
                                />
                            </li>
                        ))}
                    </ListTag>
                );
            }

            case 'delimiter':
                return (
                    <div className="py-6 flex justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                    </div>
                );

            case 'code':
                return (
                    <div className="relative rounded-xl bg-gray-900 dark:bg-[#0d0d0d] overflow-hidden my-2">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-[#151515] border-b border-gray-700 dark:border-gray-800">
                            <input
                                type="text"
                                placeholder="Язык"
                                value={block.data.language || ''}
                                onChange={e => updateBlockData(block.id, 'language', e.target.value)}
                                className="text-xs bg-transparent text-gray-400 border-none outline-none w-20"
                            />
                        </div>
                        <textarea
                            value={block.data.text || ''}
                            onChange={e => updateBlockData(block.id, 'text', e.target.value)}
                            placeholder="Вставьте код..."
                            className="w-full p-4 bg-transparent text-sm text-green-400 font-mono outline-none resize-y min-h-[100px]"
                            onKeyDown={(e) => {
                                if (e.key === 'Tab') {
                                    e.preventDefault();
                                    const t = e.target as HTMLTextAreaElement;
                                    const s = t.selectionStart, end = t.selectionEnd;
                                    t.value = t.value.substring(0, s) + '  ' + t.value.substring(end);
                                    t.selectionStart = t.selectionEnd = s + 2;
                                    updateBlockData(block.id, 'text', t.value);
                                }
                            }}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div ref={editorRef} className="relative max-w-[700px] mx-auto pl-14 pr-12 py-4">
            <InlineToolbar editorRef={editorRef} onFormatChange={() => { }} />

            {toolboxState?.visible && (
                <BlockToolbox
                    position={toolboxState.position}
                    filter={toolboxState.filter}
                    onSelect={handleToolboxSelect}
                    onClose={() => setToolboxState(null)}
                />
            )}

            <div className="space-y-0.5">
                {blocks.map((block) => {
                    const isFocused = focusedBlockId === block.id;
                    const isDragOver = dragState?.overId === block.id;
                    return (
                        <div
                            key={block.id}
                            data-block-id={block.id}
                            ref={el => { if (el) blockRefs.current.set(block.id, el); }}
                            className={`group relative transition-all duration-150 ${isDragOver ? 'border-t-2 border-blue-400' : ''}`}
                            onDragOver={e => handleDragOver(e, block.id)}
                            onDrop={e => handleDrop(e, block.id)}
                            onFocus={() => setFocusedBlockId(block.id)}
                        >
                            {/* Side controls */}
                            <div className={`absolute -left-12 top-1/2 -translate-y-1/2 flex items-center gap-0.5 transition-opacity duration-150 ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                <button
                                    onClick={() => showToolbox(block.id)}
                                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                    title="Добавить блок"
                                >
                                    <Plus size={18} />
                                </button>
                                <button
                                    draggable
                                    onDragStart={() => handleDragStart(block.id)}
                                    onDragEnd={() => setDragState(null)}
                                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-grab active:cursor-grabbing transition-colors"
                                    title="Перетащить"
                                >
                                    <GripVertical size={16} />
                                </button>
                            </div>

                            {/* Delete button */}
                            {blocks.length > 1 && (
                                <button
                                    onClick={() => deleteBlock(block.id)}
                                    className={`absolute -right-10 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-300 hover:text-red-500 transition-all duration-150 ${isFocused ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                                    title="Удалить блок"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}

                            <div className="relative">
                                {renderBlockContent(block)}
                            </div>
                        </div>
                    );
                })}
            </div>

            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
    );
};
