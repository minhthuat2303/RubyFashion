import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-6 right-6 z-[10000] flex flex-col gap-3 max-w-md w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl glass-panel shadow-2xl border border-amber-200/50 text-[#1A1A1A]"
          >
            <div className="flex items-center gap-3">
              {toast.type === 'success' && (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              )}
              {toast.type === 'error' && (
                <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
              )}
              {toast.type === 'info' && (
                <Info className="w-6 h-6 text-amber-600 flex-shrink-0" />
              )}
              <p className="text-sm font-medium tracking-wide leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-amber-800/60 hover:text-amber-950 p-1 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
