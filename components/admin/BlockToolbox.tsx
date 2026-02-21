
import React, { useState, useRef, useEffect } from 'react';
import {
    Type, Heading2, Heading3, Image as ImageIcon, Quote,
    List, ListOrdered, Minus, Code2
} from 'lucide-react';
import { BlockType } from '../../types';

interface BlockToolboxItem {
    type: BlockType;
    label: string;
    description: string;
    icon: React.ReactNode;
    data?: Record<string, any>;
}

const TOOLBOX_ITEMS: BlockToolboxItem[] = [
    { type: 'paragraph', label: 'Текст', description: 'Обычный текст', icon: <Type size={20} /> },
    { type: 'heading', label: 'Заголовок H2', description: 'Крупный заголовок', icon: <Heading2 size={20} />, data: { level: 2 } },
    { type: 'heading', label: 'Заголовок H3', description: 'Подзаголовок', icon: <Heading3 size={20} />, data: { level: 3 } },
    { type: 'image', label: 'Изображение', description: 'Вставить картинку', icon: <ImageIcon size={20} /> },
    { type: 'quote', label: 'Цитата', description: 'Выделенная цитата', icon: <Quote size={20} /> },
    { type: 'list', label: 'Список', description: 'Маркированный список', icon: <List size={20} />, data: { style: 'unordered' } },
    { type: 'list', label: 'Нумерованный', description: 'Нумерованный список', icon: <ListOrdered size={20} />, data: { style: 'ordered' } },
    { type: 'delimiter', label: 'Разделитель', description: 'Визуальный разделитель', icon: <Minus size={20} /> },
    { type: 'code', label: 'Код', description: 'Блок кода', icon: <Code2 size={20} /> },
];

interface BlockToolboxProps {
    position: { top: number; left: number };
    onSelect: (type: BlockType, data?: Record<string, any>) => void;
    onClose: () => void;
    filter?: string;
}

export const BlockToolbox: React.FC<BlockToolboxProps> = ({ position, onSelect, onClose, filter }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const filtered = filter
        ? TOOLBOX_ITEMS.filter(item =>
            item.label.toLowerCase().includes(filter.toLowerCase()) ||
            item.type.toLowerCase().includes(filter.toLowerCase())
        )
        : TOOLBOX_ITEMS;

    useEffect(() => {
        setSelectedIndex(0);
    }, [filter]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(i => (i + 1) % filtered.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(i => (i - 1 + filtered.length) % filtered.length);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (filtered[selectedIndex]) {
                    onSelect(filtered[selectedIndex].type, filtered[selectedIndex].data);
                }
            }
        };
        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [onClose, onSelect, filtered, selectedIndex]);

    if (filtered.length === 0) return null;

    return (
        <div
            ref={ref}
            className="absolute z-50 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl py-2 w-[280px] max-h-[360px] overflow-y-auto"
            style={{ top: position.top, left: position.left }}
        >
            <div className="px-3 pb-1.5 mb-1 border-b border-gray-100 dark:border-white/5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Блоки
                </span>
            </div>
            {filtered.map((item, idx) => (
                <button
                    key={`${item.type}-${item.label}`}
                    onClick={() => onSelect(item.type, item.data)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${idx === selectedIndex
                            ? 'bg-gray-100 dark:bg-white/10'
                            : 'hover:bg-gray-50 dark:hover:bg-white/5'
                        }`}
                >
                    <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 shrink-0">
                        {item.icon}
                    </div>
                    <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 truncate">{item.description}</div>
                    </div>
                </button>
            ))}
        </div>
    );
};

export { TOOLBOX_ITEMS };
