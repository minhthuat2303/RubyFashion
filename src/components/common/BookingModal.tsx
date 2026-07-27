import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  CheckCircle2,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    bookingProductSku,
    products,
    contactConfig,
    addConsultation
  } = useApp();

  const matchedProduct = products.find((p) => p.sku === bookingProductSku);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '10:00 AM',
    serviceType: 'Thuê Áo Dài & Váy Cưới',
    showroomBranch: contactConfig.showroomAddress,
    notes: ''
  });

  useEffect(() => {
    if (matchedProduct) {
      setFormData((prev) => ({
        ...prev,
        serviceType: `Thuê / May sản phẩm [${matchedProduct.sku}] - ${matchedProduct.title}`
      }));
    }
  }, [matchedProduct]);

  if (!isBookingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    addConsultation({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      serviceType: formData.serviceType,
      productSku: matchedProduct?.sku,
      productTitle: matchedProduct?.title,
      showroomBranch: formData.showroomBranch,
      notes: formData.notes
    });

    // Fire luxury confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore if confetti fails
    }

    closeBookingModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBookingModal}
          className="fixed inset-0"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-300/60 overflow-hidden z-10 my-auto p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-amber-200/60 pb-5">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#B8860B] uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Maison De Soie VIP Fitting
              </span>
              <h3 className="font-serif-title text-2xl font-bold text-[#111111]">
                Đặt Lịch Tư Vấn & Thử Đồ VIP
              </h3>
              <p className="text-xs text-stone-600 font-light">
                Trải nghiệm không gian thử đồ riêng tư cùng chuyên viên tạo mẫu cao cấp.
              </p>
            </div>

            <button
              onClick={closeBookingModal}
              className="p-2 rounded-full hover:bg-stone-200/60 text-stone-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Pre-selected Product Alert Banner */}
          {matchedProduct && (
            <div className="my-4 p-3 rounded-2xl bg-amber-100/70 border border-amber-300/80 flex items-center gap-3">
              <img
                src={matchedProduct.mainImage}
                alt={matchedProduct.title}
                className="w-12 h-14 object-cover rounded-xl shadow"
              />
              <div className="text-xs space-y-0.5">
                <span className="font-semibold text-amber-900">Sản phẩm quan tâm:</span>
                <p className="font-serif-title font-bold text-stone-900">{matchedProduct.title}</p>
                <p className="text-stone-600 font-mono text-[11px]">Mã: {matchedProduct.sku} | Thuê: {matchedProduct.rentalPrice.toLocaleString('vi-VN')}đ</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                  Họ và tên khách hàng *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                  Số điện thoại Zalo / Gọi *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="0988xxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                  Email liên hệ (Không bắt buộc)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                  Dịch vụ quan tâm
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Thuê Áo Dài Truyền Thống / Cách Tân">Thuê Áo Dài Truyền Thống / Cách Tân</option>
                  <option value="Thuê Váy Cưới Luxury">Thuê Váy Cưới Luxury</option>
                  <option value="Thuê Vest Cưới Chú Rể">Thuê Vest Cưới Chú Rể</option>
                  <option value="May Đo Thiết Kế Haute Couture">May Đo Thiết Kế Haute Couture</option>
                  <option value="Trang Điểm & Chụp Ảnh Cưới">Trang Điểm & Chụp Ảnh Cưới</option>
                  <option value="Thuê Trang Phục Sự Kiện">Thuê Trang Phục Sự Kiện</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                  Ngày dự định đến thử đồ
                </label>
                <div className="relative">
                  <CalendarIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                  Khung giờ mong muốn
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="09:00 AM">09:00 sáng</option>
                    <option value="10:30 AM">10:30 sáng</option>
                    <option value="14:00 PM">02:00 chiều</option>
                    <option value="16:00 PM">04:00 chiều</option>
                    <option value="18:30 PM">06:30 tối</option>
                    <option value="20:00 PM">08:00 tối</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                Địa điểm Showroom thuận tiện
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <select
                  value={formData.showroomBranch}
                  onChange={(e) => setFormData({ ...formData, showroomBranch: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value={contactConfig.showroomAddress}>{contactConfig.showroomAddress}</option>
                  <option value={contactConfig.showroomBranch2}>{contactConfig.showroomBranch2}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 uppercase tracking-wider mb-1">
                Ghi chú số đo hoặc yêu cầu đặc biệt
              </label>
              <textarea
                rows={3}
                placeholder="Ví dụ: Chiều cao 1m62, nặng 48kg, ngày cưới 15/05/2026, muốn thử mẫu váy xòe công chúa..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 bg-white rounded-xl border border-stone-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-stone-500 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Hoàn toàn miễn phí tư vấn & thử phom dáng
              </span>

              <button
                type="submit"
                className="inline-flex items-center gap-2 gold-gradient-bg text-white px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <Send className="w-4 h-4" /> Xác Nhận Đặt Lịch
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
