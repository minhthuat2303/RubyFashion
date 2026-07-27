import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  MessageCircle,
  Calendar,
  ChevronUp,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingContactBar: React.FC = () => {
  const { contactConfig, openBookingModal } = useApp();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="p-3 rounded-full bg-[#121212] text-amber-400 border border-amber-500/30 shadow-2xl hover:bg-black hover:scale-110 transition-all group"
            title="Trở về đầu trang"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Floating Action Bar */}
      <div className="flex flex-col gap-2.5 items-end">
        {/* VIP Appointment Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openBookingModal()}
          className="flex items-center gap-2.5 gold-gradient-bg text-white px-4 py-3 rounded-full shadow-2xl gold-border-glow font-medium text-xs uppercase tracking-wider hover:opacity-95 transition-all"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">Đặt Lịch Thử VIP</span>
        </motion.button>

        {/* Zalo Button */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={contactConfig.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-colors relative group"
          title="Chat Zalo Trực Tiếp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-14 bg-black/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat Zalo Trực Tiếp
          </span>
        </motion.a>

        {/* Messenger Button */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={contactConfig.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 transition-colors relative group"
          title="Gửi tin nhắn Messenger"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute right-14 bg-black/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat Messenger
          </span>
        </motion.a>

        {/* Direct Call Phone Hotline Button */}
        <motion.a
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          href={`tel:${contactConfig.phone}`}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-700 transition-colors relative group animate-bounce"
          title={`Gọi Hotline: ${contactConfig.phoneFormatted}`}
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-14 bg-emerald-950 text-emerald-200 text-[11px] font-medium px-2.5 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Hotline: {contactConfig.phoneFormatted}
          </span>
        </motion.a>
      </div>
    </div>
  );
};
