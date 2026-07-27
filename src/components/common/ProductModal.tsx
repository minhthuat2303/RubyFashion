import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Phone,
  MessageCircle,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Maximize2,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductModal: React.FC = () => {
  const {
    products,
    selectedProduct,
    openProductModal,
    closeProductModal,
    contactConfig,
    openBookingModal
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'features' | 'care'>('desc');

  if (!selectedProduct) return null;

  const images = selectedProduct.images && selectedProduct.images.length > 0
    ? selectedProduct.images
    : [selectedProduct.mainImage];

  const currentImage = images[activeImageIndex] || selectedProduct.mainImage;

  const handleRentalClick = () => {
    openBookingModal(selectedProduct.sku);
  };

  const handlePurchaseClick = () => {
    openBookingModal(selectedProduct.sku);
  };

  const formatPrice = (val: number) => {
    return val.toLocaleString('vi-VN') + ' đ';
  };

  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== selectedProduct.id &&
        (p.categoryId === selectedProduct.categoryId ||
          p.categoryName === selectedProduct.categoryName)
    )
    .slice(0, 4);

  const displayRelated =
    relatedProducts.length >= 2
      ? relatedProducts
      : products.filter((p) => p.id !== selectedProduct.id).slice(0, 4);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProductModal}
          className="fixed inset-0"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-amber-200/60 overflow-hidden z-10 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={closeProductModal}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-black hover:scale-110 transition-all"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
            {/* Left Col: Photo Gallery & Zoom */}
            <div className="lg:col-span-6 bg-[#F3EEEA] p-6 flex flex-col justify-between relative">
              {/* Main Image Stage */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xl group bg-stone-900">
                <img
                  src={currentImage}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="bg-[#121212]/90 text-amber-300 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md border border-amber-500/30">
                    {selectedProduct.categoryName}
                  </span>
                  {selectedProduct.isNew && (
                    <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Mẫu Mới 2026
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black flex items-center gap-1.5 text-xs font-medium backdrop-blur-md"
                >
                  <Maximize2 className="w-4 h-4" /> Xem Toàn Màn Hình
                </button>
              </div>

              {/* Gallery Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#D4AF37] scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Col: Details & Direct Actions */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* SKU & Category badge */}
                <div className="flex items-center justify-between text-xs text-amber-900/70 font-mono border-b border-amber-200/50 pb-2">
                  <span className="bg-amber-100/80 px-2.5 py-1 rounded-md text-amber-900 font-semibold">
                    MÃ SP: {selectedProduct.sku}
                  </span>
                  <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Trạng thái: {selectedProduct.status}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif-title text-2xl sm:text-3xl text-[#111111] font-bold leading-tight">
                  {selectedProduct.title}
                </h2>

                {/* Pricing Box - Rental & Sale */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-amber-900/70 uppercase tracking-wider font-medium">Giá Thuê (3 ngày)</p>
                      <p className="text-2xl font-serif-title font-bold text-[#B8860B]">
                        {formatPrice(selectedProduct.rentalPrice)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-stone-500 uppercase tracking-wider font-medium">Giá May / Bán Mới</p>
                      <p className="text-lg font-serif-title font-semibold text-stone-800">
                        {formatPrice(selectedProduct.salePrice)}
                      </p>
                    </div>
                  </div>

                  {selectedProduct.rentalDeposit && (
                    <div className="pt-2 border-t border-amber-200/40 text-[11px] text-amber-900/80 flex items-center gap-1.5 font-light">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      Tiền cọc khi thuê: {formatPrice(selectedProduct.rentalDeposit)} (Hoàn 100% sau khi trả đồ)
                    </div>
                  )}
                </div>

                {/* Size Swatches */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800 uppercase tracking-wider">Kích Cỡ Có Sẵn:</span>
                    <button
                      onClick={() => openBookingModal(selectedProduct.sku)}
                      className="text-amber-700 hover:underline flex items-center gap-1 font-medium"
                    >
                      <Ruler className="w-3.5 h-3.5" /> Tư vấn đo chuẩn dáng
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                          selectedSize === sz
                            ? 'bg-[#121212] text-amber-300 border-black shadow-md'
                            : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-stone-800 uppercase tracking-wider">Màu Sắc:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`px-3 py-1.5 rounded-xl text-xs border transition-all ${
                            selectedColor === c
                              ? 'bg-amber-100 border-amber-500 font-semibold text-amber-950'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-amber-300'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Material & Style Badge */}
                <div className="p-3 rounded-xl bg-white border border-stone-200/80 text-xs space-y-1.5">
                  <p className="text-stone-800 font-medium">
                    <span className="text-amber-900 font-semibold">Chất liệu:</span> {selectedProduct.material}
                  </p>
                  <p className="text-stone-800 font-medium">
                    <span className="text-amber-900 font-semibold">Phong cách & Dịp:</span> {selectedProduct.style} • {selectedProduct.occasion}
                  </p>
                </div>

                {/* Tabs for Info */}
                <div className="space-y-3 pt-2">
                  <div className="flex border-b border-stone-200 text-xs">
                    <button
                      onClick={() => setActiveTab('desc')}
                      className={`py-2 px-4 font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                        activeTab === 'desc'
                          ? 'border-[#D4AF37] text-[#B8860B]'
                          : 'border-transparent text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      Mô Tả
                    </button>
                    <button
                      onClick={() => setActiveTab('features')}
                      className={`py-2 px-4 font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                        activeTab === 'features'
                          ? 'border-[#D4AF37] text-[#B8860B]'
                          : 'border-transparent text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      Nổi Bật
                    </button>
                    <button
                      onClick={() => setActiveTab('care')}
                      className={`py-2 px-4 font-semibold uppercase tracking-wider border-b-2 transition-colors ${
                        activeTab === 'care'
                          ? 'border-[#D4AF37] text-[#B8860B]'
                          : 'border-transparent text-stone-500 hover:text-stone-900'
                      }`}
                    >
                      Thử Đồ & Bảo Quản
                    </button>
                  </div>

                  <div className="text-xs text-stone-600 leading-relaxed min-h-[80px]">
                    {activeTab === 'desc' && <p>{selectedProduct.description}</p>}
                    {activeTab === 'features' && (
                      <ul className="space-y-1.5 list-disc list-inside text-stone-700">
                        {selectedProduct.highlightFeatures.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'care' && <p>{selectedProduct.careInstructions}</p>}
                  </div>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="space-y-3 pt-4 border-t border-amber-200/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={handleRentalClick}
                    className="flex items-center justify-center gap-2 gold-gradient-bg text-white py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                  >
                    <Calendar className="w-4 h-4" /> Đặt Thuê Ngay
                  </button>

                  <button
                    onClick={handlePurchaseClick}
                    className="flex items-center justify-center gap-2 bg-[#121212] text-amber-300 border border-amber-500/40 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-black transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" /> Liên Hệ Đặt Mua
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`tel:${contactConfig.phone}`}
                    className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Gọi Hotline
                  </a>

                  <a
                    href={contactConfig.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-medium hover:bg-blue-700 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Zalo
                  </a>

                  <a
                    href={contactConfig.messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-medium hover:bg-indigo-700 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Messenger
                  </a>
                </div>
              </div>
            </div>

            {/* Suggested / Related Products Section */}
            {displayRelated.length > 0 && (
              <div className="lg:col-span-12 p-6 sm:p-8 bg-amber-50/50 border-t border-amber-200/60 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-title font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#B8860B]" />
                    Sản Phẩm Gợi Ý Cho Bạn
                  </h3>
                  <span className="text-xs text-amber-800 font-medium bg-amber-100/80 px-2.5 py-1 rounded-full">
                    Bộ sưu tập {selectedProduct.categoryName}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {displayRelated.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        setActiveImageIndex(0);
                        openProductModal(prod);
                      }}
                      className="group bg-white rounded-2xl p-3 border border-amber-200/60 hover:border-amber-400 hover:shadow-lg cursor-pointer transition-all space-y-2"
                    >
                      <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-stone-100 relative">
                        <img
                          src={prod.mainImage}
                          alt={prod.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-2 left-2 bg-black/80 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-sm">
                          {formatPrice(prod.rentalPrice)}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-serif-title font-bold text-stone-900 line-clamp-1 group-hover:text-[#B8860B] transition-colors">
                          {prod.title}
                        </p>
                        <p className="text-[11px] text-stone-500 font-mono">
                          Mã: {prod.sku}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white p-3 rounded-full bg-white/10 hover:bg-white/20"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={currentImage}
            alt="Full size view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </AnimatePresence>
  );
};
