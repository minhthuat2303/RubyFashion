import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Phone,
  MessageCircle,
  MessageSquare,
  Calendar,
  Sparkles,
  ArrowUpRight,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickContactModal: React.FC = () => {
  const {
    isQuickContactOpen,
    quickContactSku,
    closeQuickContactModal,
    contactConfig,
    openBookingModal
  } = useApp();

  if (!isQuickContactOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickContactModal}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-amber-300/80 p-6 sm:p-8 space-y-6 z-10 text-center"
        >
          {/* Close button */}
          <button
            onClick={closeQuickContactModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-100 text-stone-700 hover:bg-amber-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Maison De Soie VIP Support
            </span>
            <h2 className="font-serif-title text-2xl font-bold text-stone-900">
              Liên Hệ Ngay
            </h2>
            {quickContactSku && (
              <p className="text-xs text-amber-800 font-mono font-semibold bg-amber-50 py-1 px-3 rounded-full inline-block">
                Mã mẫu quan tâm: {quickContactSku}
              </p>
            )}
            <p className="text-xs text-stone-500 font-light">
              Vui lòng chọn kênh tư vấn trực tiếp thuận tiện nhất cho bạn
            </p>
          </div>

          {/* Contact Options Grid */}
          <div className="space-y-3">
            {/* Zalo Option */}
            <a
              href={contactConfig.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeQuickContactModal}
              className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 font-bold text-xs sm:text-sm hover:bg-blue-100 hover:scale-[1.01] transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-blue-950">Chat Zalo Official</p>
                  <p className="text-[11px] text-blue-700 font-normal">Tư vấn báo giá & gửi mẫu 24/7</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Messenger Option */}
            <a
              href={contactConfig.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeQuickContactModal}
              className="flex items-center justify-between p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 font-bold text-xs sm:text-sm hover:bg-sky-100 hover:scale-[1.01] transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-md">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sky-950">Chat Facebook Messenger</p>
                  <p className="text-[11px] text-sky-700 font-normal">Nhắn tin trực tiếp với Stylist</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Hotline Call Option */}
            <a
              href={`tel:${contactConfig.phone}`}
              onClick={closeQuickContactModal}
              className="flex items-center justify-between p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 font-bold text-xs sm:text-sm hover:bg-amber-100 hover:scale-[1.01] transition-all shadow-sm group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gold-gradient-bg text-white flex items-center justify-center shadow-md">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-stone-900">Hotline VIP Trực Tiếp</p>
                  <p className="text-[11px] text-amber-800 font-mono">{contactConfig.phoneFormatted}</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Book Appointment Modal Button */}
            <button
              onClick={() => {
                closeQuickContactModal();
                openBookingModal(quickContactSku || undefined);
              }}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-stone-900 text-amber-300 font-bold text-xs sm:text-sm hover:bg-black hover:scale-[1.01] transition-all shadow-md group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-white">Đặt Lịch Thử Đồ Tại Showroom</p>
                  <p className="text-[11px] text-stone-300 font-normal">Trải nghiệm phòng thử VIP riêng tư</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          <div className="pt-2 text-[11px] text-stone-500 font-light flex items-center justify-center gap-1.5 border-t border-stone-100">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Showroom: Hà Nội & TP. Hồ Chí Minh</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
