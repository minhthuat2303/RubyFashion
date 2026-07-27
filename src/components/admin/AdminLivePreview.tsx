import React, { useState } from 'react';
import { Smartphone, Monitor, Sparkles, Phone, MapPin, Eye } from 'lucide-react';
import { ContactConfig, HeroSlide, Product } from '../../types';

interface AdminLivePreviewProps {
  contactConfig: ContactConfig;
  heroSlide?: HeroSlide;
  products: Product[];
  selectedThemeName?: string;
  selectedFontName?: string;
  selectedThemeColors?: {
    primary: string;
    bg: string;
    text: string;
  };
}

export const AdminLivePreview: React.FC<AdminLivePreviewProps> = ({
  contactConfig,
  heroSlide,
  products,
  selectedThemeName = 'Luxury Gold',
  selectedFontName = 'Playfair Display',
  selectedThemeColors = { primary: '#B8860B', bg: '#FFFFFF', text: '#111111' }
}) => {
  const [viewDevice, setViewDevice] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <div className="bg-stone-900 text-white rounded-3xl p-5 shadow-2xl border border-stone-800 space-y-4 sticky top-6">
      {/* Device Switcher Header */}
      <div className="flex items-center justify-between border-b border-stone-800 pb-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-stone-300">
            Xem Trực Tiếp (Live Preview)
          </span>
        </div>

        <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setViewDevice('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              viewDevice === 'mobile'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Điện thoại
          </button>
          <button
            type="button"
            onClick={() => setViewDevice('desktop')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              viewDevice === 'desktop'
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Máy tính
          </button>
        </div>
      </div>

      {/* Active Theme & Font Indicator Badge */}
      <div className="flex items-center justify-between text-[11px] text-stone-400 bg-stone-950/80 px-3 py-1.5 rounded-xl border border-stone-800 font-mono">
        <span>Giao diện: <strong className="text-amber-300 font-normal">{selectedThemeName}</strong></span>
        <span>Font: <strong className="text-amber-300 font-normal">{selectedFontName}</strong></span>
      </div>

      {/* Device Frame Stage */}
      <div
        className={`mx-auto transition-all duration-300 ${
          viewDevice === 'mobile'
            ? 'w-[290px] h-[500px] rounded-[36px] border-[8px] border-stone-700 shadow-2xl overflow-hidden relative bg-white'
            : 'w-full h-[500px] rounded-2xl border-4 border-stone-700 shadow-2xl overflow-hidden relative bg-white'
        }`}
        style={{
          fontFamily: selectedFontName === 'Playfair Display' ? 'serif' : 'sans-serif'
        }}
      >
        {/* Notch on Mobile */}
        {viewDevice === 'mobile' && (
          <div className="w-28 h-4 bg-stone-800 rounded-b-xl mx-auto absolute top-0 left-0 right-0 z-30" />
        )}

        {/* Mini Simulated Website */}
        <div className="h-full overflow-y-auto text-stone-900 bg-white text-xs">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md px-3 py-2.5 border-b border-amber-100 flex items-center justify-between z-20">
            <div className="flex items-center gap-1.5">
              {contactConfig.logoUrl ? (
                <img
                  src={contactConfig.logoUrl}
                  alt="Logo"
                  className="w-6 h-6 rounded-full object-cover border border-amber-300"
                />
              ) : (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow"
                  style={{ backgroundColor: selectedThemeColors.primary }}
                >
                  S
                </div>
              )}
              <span className="font-serif-title font-bold text-xs tracking-wider text-stone-900">
                {contactConfig.shopName || 'RubyFashion'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] text-stone-500 font-medium">Hoạt động</span>
            </div>
          </div>

          {/* Hero Banner Slide */}
          <div className="relative aspect-[16/9] w-full bg-stone-900 overflow-hidden">
            <img
              src={
                heroSlide?.image ||
                'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'
              }
              alt="Hero"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end text-white">
              <span className="text-[9px] uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                {heroSlide?.subtitle || 'BST HAUTE COUTURE 2026'}
              </span>
              <h4 className="font-serif-title text-sm font-bold leading-tight">
                {heroSlide?.title || 'Tuyệt Tác Áo Dài & Váy Cưới'}
              </h4>
              <button
                type="button"
                className="mt-1.5 inline-block text-[10px] px-2.5 py-1 rounded-full text-white font-semibold w-fit shadow"
                style={{ backgroundColor: selectedThemeColors.primary }}
              >
                {heroSlide?.ctaPrimaryText || 'Khám Phá Ngay'}
              </button>
            </div>
          </div>

          {/* Featured Products Bar */}
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-serif-title font-bold text-xs text-stone-900">
                Sản Phẩm Mới Về
              </span>
              <span className="text-[10px] text-amber-700 font-medium">Xem tất cả</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {products.slice(0, 2).map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-xl p-1.5 border border-amber-200/60 shadow-sm space-y-1"
                >
                  <div className="aspect-[3/4] w-full rounded-lg overflow-hidden relative bg-stone-100">
                    <img src={p.mainImage} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-1 left-1 bg-black/80 text-amber-300 text-[8px] px-1.5 py-0.5 rounded">
                      {p.rentalPrice ? p.rentalPrice.toLocaleString('vi-VN') + 'đ' : ''}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-stone-900 line-clamp-1">
                    {p.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Store Footer Info */}
          <div className="p-3 bg-stone-900 text-stone-300 space-y-1.5 text-[10px]">
            <p className="font-bold text-amber-400 text-xs">
              {contactConfig.shopName || 'Maison De Soie'}
            </p>
            <p className="flex items-center gap-1 text-stone-400">
              <Phone className="w-3 h-3 text-amber-400" /> {contactConfig.phoneFormatted || contactConfig.phone}
            </p>
            <p className="flex items-center gap-1 text-stone-400 line-clamp-1">
              <MapPin className="w-3 h-3 text-amber-400" /> {contactConfig.showroomAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
