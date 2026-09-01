import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const ModalSheet: React.FC<ModalSheetProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
      />

      {/* Sheet panel */}
      <div className="relative w-full max-w-md bg-white rounded-t-5xl sm:rounded-4xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto hide-scroll border border-slate-100 animate-in slide-in-from-bottom duration-300">
        {/* Drag handle bar */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" />

        {title && (
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h3 className="text-base font-extrabold text-slate-800">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};
