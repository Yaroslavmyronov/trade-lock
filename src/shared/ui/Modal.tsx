'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={backdropRef}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* <motion.div
            className="relative w-[420px] max-w-[calc(100vw-32px)] rounded-xl border border-[rgb(42,44,46)] bg-[rgb(16,16,17)] py-2"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          > */}
          {/* <div className="absolute top-6 right-6 translate-x-1.5">
              <button
                onClick={onClose}
                className="hover:bg-darkPurpl cursor-pointer rounded-[6px] p-0.5 text-xl text-white transition-colors duration-200"
              >
                <CloseIcon width={24} height={24} />
              </button>
            </div> */}

          {children}
          {/* </motion.div> */}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
