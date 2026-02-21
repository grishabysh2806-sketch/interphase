
import React, { useEffect, useState, useRef } from 'react';
import { Bold, Italic, Link as LinkIcon, Type, Heading2, Heading3 } from 'lucide-react';

interface InlineToolbarProps {
    editorRef: React.RefObject<HTMLDivElement | null>;
    onFormatChange?: () => void;
}

export const InlineToolbar: React.FC<InlineToolbarProps> = ({ editorRef, onFormatChange }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const toolbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleSelection = () => {
            const sel = window.getSelection();
            if (!sel || sel.isCollapsed || !sel.rangeCount) {
                setVisible(false);
                return;
            }
            const range = sel.getRangeAt(0);
            if (!editorRef.current?.contains(range.commonAncestorContainer)) {
                setVisible(false);
                return;
            }
            const text = sel.toString().trim();
            if (!text) {
                setVisible(false);
                return;
            }
            const rect = range.getBoundingClientRect();
            const editorRect = editorRef.current.getBoundingClientRect();
            const toolbarWidth = 280;
            let left = rect.left + rect.width / 2 - editorRect.left - toolbarWidth / 2;
            left = Math.max(0, Math.min(left, editorRect.width - toolbarWidth));
            setPosition({
                top: rect.top - editorRect.top - 52,
                left,
            });
            setVisible(true);
        };

        document.addEventListener('selectionchange', handleSelection);
        return () => document.removeEventListener('selectionchange', handleSelection);
    }, [editorRef]);

    const execCommand = (cmd: string, value?: string) => {
        document.execCommand(cmd, false, value);
        onFormatChange?.();
    };

    const applyHeading = (tag: string) => {
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) return;
        const range = sel.getRangeAt(0);
        const node = range.startContainer instanceof Element
            ? range.startContainer
            : range.startContainer.parentElement;
        const block = node?.closest('[data-block-id]');
        if (!block) return;

        const contentEl = block.querySelector('[contenteditable]') as HTMLElement | null;
        if (!contentEl) return;

        // Dispatch a custom event to change block type
        const event = new CustomEvent('block-type-change', {
            bubbles: true,
            detail: {
                blockId: block.getAttribute('data-block-id'),
                newType: tag === 'p' ? 'paragraph' : 'heading',
                level: tag === 'h2' ? 2 : tag === 'h3' ? 3 : undefined
            }
        });
        block.dispatchEvent(event);
        setVisible(false);
    };

    const insertLink = () => {
        const url = prompt('Введите URL:', 'https://');
        if (url) {
            execCommand('createLink', url);
        }
    };

    if (!visible) return null;

    return (
        <div
            ref={toolbarRef}
            className="absolute z-50 flex items-center gap-0.5 bg-[#1a1a1a] rounded-lg shadow-2xl px-1.5 py-1 transition-all duration-150"
            style={{ top: position.top, left: position.left }}
            onMouseDown={e => e.preventDefault()}
        >
            <button
                onClick={() => execCommand('bold')}
                className="p-1.5 rounded hover:bg-white/15 transition-colors"
                title="Жирный"
            >
                <Bold size={16} className="text-white" />
            </button>
            <button
                onClick={() => execCommand('italic')}
                className="p-1.5 rounded hover:bg-white/15 transition-colors"
                title="Курсив"
            >
                <Italic size={16} className="text-white" />
            </button>
            <button
                onClick={insertLink}
                className="p-1.5 rounded hover:bg-white/15 transition-colors"
                title="Ссылка"
            >
                <LinkIcon size={16} className="text-white" />
            </button>

            <div className="w-px h-5 bg-white/20 mx-1" />

            <button
                onClick={() => applyHeading('p')}
                className="p-1.5 rounded hover:bg-white/15 transition-colors"
                title="Текст"
            >
                <Type size={16} className="text-white" />
            </button>
            <button
                onClick={() => applyHeading('h2')}
                className="p-1.5 rounded hover:bg-white/15 transition-colors"
                title="Заголовок H2"
            >
                <Heading2 size={16} className="text-white" />
            </button>
            <button
                onClick={() => applyHeading('h3')}
                className="p-1.5 rounded hover:bg-white/15 transition-colors"
                title="Заголовок H3"
            >
                <Heading3 size={16} className="text-white" />
            </button>
        </div>
    );
};
