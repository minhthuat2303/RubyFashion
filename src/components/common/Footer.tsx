import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { contactConfig, setActiveTab } = useApp();

  return (
    <footer className="bg-[#121212] text-[#E8DFD8] pt-20 pb-10 border-t border-amber-500/20 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif-title text-3xl tracking-widest text-white">
                MAISON DE SOIE
              </h2>
              <p className="text-xs text-[#C5A059] uppercase tracking-[0.3em] font-light">
                Haute Couture Bridal & Áo Dài Di Sản
              </p>
            </div>

            <p className="text-sm text-gray-400 font-light leading-relaxed max-w-md">
              Thương hiệu thời trang cưới & áo dài cao cấp với hơn 15 năm kiến tạo nét đẹp hoàn mỹ. Nơi lưu giữ giá trị di sản may đo thủ công truyền thống kết hợp phom dáng đương đại.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={contactConfig.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-amber-500/20 text-xs hover:border-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Zalo Official</span>
                <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </a>
              <a
                href={contactConfig.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-amber-500/20 text-xs hover:border-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Messenger</span>
                <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </a>
              <a
                href={contactConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-amber-500/20 text-xs hover:border-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Facebook Page</span>
                <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </a>
              <a
                href={contactConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-amber-500/20 text-xs hover:border-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </a>
              <a
                href={contactConfig.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-amber-500/20 text-xs hover:border-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>TikTok Official</span>
                <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </a>
              <a
                href={contactConfig.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-white/5 border border-amber-500/20 text-xs hover:border-amber-400 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Shopee Mall</span>
                <ArrowUpRight className="w-3 h-3 text-amber-400" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-serif-title text-base font-semibold text-white tracking-wider uppercase border-b border-amber-500/30 pb-2">
              Danh Mục
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400 font-light">
              <li>
                <button
                  onClick={() => setActiveTab('collection')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Áo Dài Truyền Thống
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('collection')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Áo Dài Cách Tân
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('collection')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Váy Cưới Luxury Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('collection')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Vest Cưới Chú Rể
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('collection')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Trang Phục Sự Kiện
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('collection')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Phụ Kiện Cưới Cao Cấp
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Dịch vụ & Chính sách */}
          <div className="space-y-4">
            <h3 className="font-serif-title text-base font-semibold text-white tracking-wider uppercase border-b border-amber-500/30 pb-2">
              Dịch Vụ VIP
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400 font-light">
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Cho Thuê Áo Dài & Váy Cưới
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-amber-300 transition-colors"
                >
                  May Đo Độc Bản Haute Couture
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Chỉnh Sửa Chuẩn Số Đo
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('services')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Trang Điểm & Làm Tóc Cô Dâu
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('rental-guide')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Bảng Giá & Quy Trình Thuê
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-amber-300 transition-colors"
                >
                  Lịch Sử & Sứ Mệnh
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Showroom & Contact */}
          <div className="space-y-4">
            <h3 className="font-serif-title text-base font-semibold text-white tracking-wider uppercase border-b border-amber-500/30 pb-2">
              Hệ Thống Showroom
            </h3>
            <div className="space-y-3 text-xs text-gray-300 font-light leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{contactConfig.showroomAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{contactConfig.showroomBranch2}</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300 font-medium">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${contactConfig.phone}`}>{contactConfig.phoneFormatted}</a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{contactConfig.openHours}</span>
              </div>

              <div className="pt-2">
                <a
                  href={contactConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Xem Bản Đồ Chỉ Đường
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-light">
          <p>© 2026 MAISON DE SOIE COUTURE. All Rights Reserved. Designed for High Fashion Excellence.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1 text-amber-400/80">
              <ShieldAlert className="w-3.5 h-3.5" /> Website Giới Thiệu & Cho Thuê Trang Phục
            </span>
            <button
              onClick={() => setActiveTab('admin')}
              className="text-amber-400 hover:text-amber-300 font-bold hover:underline inline-flex items-center gap-1"
            >
              🔒 Trang Quản Trị (/quantri)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
