import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neo-black border-2 border-neo-acid w-full max-w-2xl relative shadow-[0_0_50px_rgba(204,255,0,0.2)]"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900/50">
                <h2 className="text-2xl font-display font-bold text-white uppercase tracking-widest">
                  {title || 'System Message'}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-neo-pink transition-colors p-1"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                {children}
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-neo-acid" />
              <div className="absolute top-0 right-0 w-2 h-2 bg-neo-acid" />
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-neo-acid" />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-neo-acid" />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
