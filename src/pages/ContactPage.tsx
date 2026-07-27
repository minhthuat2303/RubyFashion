import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  MessageSquare,
  Sparkles,
  Send,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const { contactConfig, addConsultation } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: new Date().toISOString().split('T')[0],
    preferredTime: '10:00 AM',
    serviceType: 'Tư Vấn Thuê Áo Dài & Váy Cưới',
    showroomBranch: contactConfig.showroomAddress,
    notes: ''
  });

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
      showroomBranch: formData.showroomBranch,
      notes: formData.notes
    });

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    setFormData({
      fullName: '',
      phone: '',
      email: '',
      preferredDate: new Date().toISOString().split('T')[0],
      preferredTime: '10:00 AM',
      serviceType: 'Tư Vấn Thuê Áo Dài & Váy Cưới',
      showroomBranch: contactConfig.showroomAddress,
      notes: ''
    });
  };

  return (
    <div className="py-12 bg-white space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Liên Hệ & Đặt Lịch Ghé Showroom
        </span>
        <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#111111]">
          Maison De Soie Luôn Sẵn Sàng Đón Tiếp
        </h1>
        <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto rounded-full" />
        <p className="text-xs sm:text-sm font-serif-sub text-stone-600 font-light text-base">
          Kết nối trực tiếp cùng chúng tôi qua Hotline, Zalo, Messenger hoặc ghé thăm các chi nhánh Showroom VIP.
        </p>
      </div>

      {/* Direct Social Cards Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <a
            href={`tel:${contactConfig.phone}`}
            className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-md hover:border-amber-400 hover:shadow-xl transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-full bg-emerald-100 text-emerald-700 group-hover:scale-110 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-900 font-serif-title">Hotline VIP</span>
            <span className="text-[11px] text-emerald-700 font-semibold">{contactConfig.phoneFormatted}</span>
          </a>

          <a
            href={contactConfig.zaloUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-md hover:border-amber-400 hover:shadow-xl transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-full bg-blue-100 text-blue-700 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-900 font-serif-title">Zalo Official</span>
            <span className="text-[11px] text-blue-700 font-semibold inline-flex items-center gap-0.5">
              Chat Zalo <ArrowUpRight className="w-3 h-3" />
            </span>
          </a>

          <a
            href={contactConfig.messengerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-md hover:border-amber-400 hover:shadow-xl transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-700 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-900 font-serif-title">Messenger</span>
            <span className="text-[11px] text-indigo-700 font-semibold inline-flex items-center gap-0.5">
              Gửi Tin Nhắn <ArrowUpRight className="w-3 h-3" />
            </span>
          </a>

          <a
            href={contactConfig.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-md hover:border-amber-400 hover:shadow-xl transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-full bg-blue-50 text-blue-800 group-hover:scale-110 transition-transform">
              <FacebookIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-900 font-serif-title">Facebook</span>
            <span className="text-[11px] text-stone-600 font-medium">Fanpage VIP</span>
          </a>

          <a
            href={contactConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-md hover:border-amber-400 hover:shadow-xl transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-full bg-pink-100 text-pink-700 group-hover:scale-110 transition-transform">
              <InstagramIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-900 font-serif-title">Instagram</span>
            <span className="text-[11px] text-stone-600 font-medium">Lookbook 2026</span>
          </a>

          <a
            href={contactConfig.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl bg-white border border-amber-200/60 shadow-md hover:border-amber-400 hover:shadow-xl transition-all flex flex-col items-center text-center space-y-2 group"
          >
            <div className="p-3 rounded-full bg-orange-100 text-orange-700 group-hover:scale-110 transition-transform">
              <ShopeeIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-stone-900 font-serif-title">Shopee Mall</span>
            <span className="text-[11px] text-stone-600 font-medium">Phụ kiện cưới</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Form + Map & Showroom Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Col: Contact & Appointment Form */}
        <div className="lg:col-span-6 bg-white p-8 rounded-3xl shadow-xl border border-amber-200/60 space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif-title text-2xl font-bold text-stone-900">
              Gửi Yêu Cầu Đặt Lịch VIP
            </h2>
            <p className="text-xs text-stone-500 font-light">
              Chúng tôi sẽ liên hệ lại tư vấn và chuẩn bị phòng thử riêng tư chu đáo nhất.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Họ tên của bạn *
              </label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0988xxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Email liên hệ
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Ngày thử đồ
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Khung giờ
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="09:00 AM">09:00 sáng</option>
                  <option value="10:30 AM">10:30 sáng</option>
                  <option value="14:00 PM">02:00 chiều</option>
                  <option value="16:00 PM">04:00 chiều</option>
                  <option value="18:30 PM">06:30 tối</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Chi nhánh Showroom
              </label>
              <select
                value={formData.showroomBranch}
                onChange={(e) => setFormData({ ...formData, showroomBranch: e.target.value })}
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value={contactConfig.showroomAddress}>{contactConfig.showroomAddress}</option>
                <option value={contactConfig.showroomBranch2}>{contactConfig.showroomBranch2}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Ghi chú thêm
              </label>
              <textarea
                rows={3}
                placeholder="Ví dụ: Cần thử áo dài cưới màu đỏ son và váy cưới xòe đuôi dài..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 bg-white rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl gold-gradient-bg text-white text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all inline-flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Gửi Yêu Cầu Hẹn Thử Đồ
            </button>
          </form>
        </div>

        {/* Right Col: Map & Branch details */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-200/60 space-y-6">
            <h2 className="font-serif-title text-2xl font-bold text-stone-900 border-b border-amber-200/60 pb-3">
              Thông Tin Showroom Trực Thuộc
            </h2>

            <div className="space-y-4 text-xs text-stone-700 font-light">
              <div className="p-4 rounded-2xl bg-white border border-amber-200/50 space-y-1">
                <p className="font-bold text-stone-900 font-serif-title text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" /> Showroom Trụ Sở Hà Nội
                </p>
                <p className="text-stone-700 font-medium">{contactConfig.showroomAddress}</p>
                <p className="text-stone-500 text-[11px]">Trông xe ô tô & xe máy miễn phí trước cửa showroom.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-200/50 space-y-1">
                <p className="font-bold text-stone-900 font-serif-title text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600" /> Showroom Chi Nhánh TP.HCM
                </p>
                <p className="text-stone-700 font-medium">{contactConfig.showroomBranch2}</p>
                <p className="text-stone-500 text-[11px]">Khu vực trung tâm Quận 1, đậu xe VIP thuận tiện.</p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 text-amber-900">
                <span className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-amber-600" /> Giờ đón tiếp: {contactConfig.openHours}
                </span>
                <span className="font-semibold text-emerald-700">Mở cửa hôm nay</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 text-amber-900">
                <span className="flex items-center gap-2 font-medium">
                  <Mail className="w-4 h-4 text-amber-600" /> Email hỗ trợ: {contactConfig.email}
                </span>
              </div>
            </div>

            {/* Google Map Embed Frame */}
            <div className="rounded-2xl overflow-hidden shadow-inner border border-stone-200 h-64 relative bg-stone-100">
              <iframe
                title="Maison De Soie Google Map"
                src={contactConfig.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              />
            </div>

            <div className="pt-2 text-center">
              <a
                href={contactConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-bold hover:underline"
              >
                <ExternalLink className="w-4 h-4" /> Mở vị trí ứng dụng Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Social Icons helper components
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const ShopeeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.3 6.8c-.2-.1-.5-.1-.7 0l-6.6 3.8-6.6-3.8c-.2-.1-.5-.1-.7 0s-.2.4 0 .6l7 4c.1.1.2.1.3.1s.2 0 .3-.1l7-4c.2-.2.2-.5 0-.6zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
  </svg>
);
