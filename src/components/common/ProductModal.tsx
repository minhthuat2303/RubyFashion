import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Phone,
  MessageCircle,
  MessageSquare,
  CheckCircle2,
  Maximize2,
  Ruler,
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
    openQuickContactModal
  } = useApp();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'features' | 'care'>('desc');
  const modalContainerRef = useRef<HTMLDivElement>(null);

  if (!selectedProduct) return null;

  const images = selectedProduct.images && selectedProduct.images.length > 0
    ? selectedProduct.images
    : [selectedProduct.mainImage];

  const currentImage = images[activeImageIndex] || selectedProduct.mainImage;

  const handleContactClick = () => {
    openQuickContactModal(selectedProduct.sku);
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

          <div ref={modalContainerRef} className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto">
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
                    <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                      Mẫu Mới 2026
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-black/60 text-white hover:bg-black hover:scale-110 transition-all shadow-lg"
                  title="Phóng to ảnh"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails list */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-1 no-scrollbar">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#B8860B] scale-105 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Col: Details & Actions */}
            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="space-y-1 border-b border-amber-100 pb-3">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                    <span>MÃ SKU: {selectedProduct.sku}</span>
                    <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {selectedProduct.status}
                    </span>
                  </div>
                  <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                    {selectedProduct.title}
                  </h2>
                </div>

                {/* Price Tiers */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-amber-800 uppercase tracking-wider font-semibold block">
                      Giá Thuê (3 ngày)
                    </span>
                    <span className="font-serif-title text-xl sm:text-2xl font-bold text-[#B8860B]">
                      {formatPrice(selectedProduct.rentalPrice)}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold block">
                      Giá Bán Niêm Yết
                    </span>
                    <span className="font-serif-title text-base sm:text-lg font-semibold text-stone-700">
                      {formatPrice(selectedProduct.salePrice)}
                    </span>
                  </div>
                </div>

                {/* Sizes Selector */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                        <Ruler className="w-3.5 h-3.5 text-[#B8860B]" /> Kích Thước Size
                      </label>
                      <span className="text-[11px] text-stone-500 font-light">
                        Có nhận may đo theo chỉ số riêng
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                            selectedSize === sz
                              ? 'bg-[#121212] text-amber-300 shadow-md scale-105'
                              : 'bg-stone-100 text-stone-700 hover:bg-amber-100'
                          }`}
                        >
                          Size {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tabs for Info */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4 border-b border-stone-200 text-xs font-semibold">
                    <button
                      onClick={() => setActiveTab('desc')}
                      className={`pb-2 transition-colors border-b-2 uppercase tracking-wider ${
                        activeTab === 'desc'
                          ? 'border-[#B8860B] text-[#B8860B]'
                          : 'border-transparent text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      Mô Tả Sản Phẩm
                    </button>
                    <button
                      onClick={() => setActiveTab('features')}
                      className={`pb-2 transition-colors border-b-2 uppercase tracking-wider ${
                        activeTab === 'features'
                          ? 'border-[#B8860B] text-[#B8860B]'
                          : 'border-transparent text-stone-400 hover:text-stone-700'
                      }`}
                    >
                      Điểm Nổi Bật
                    </button>
                  </div>

                  <div className="text-xs text-stone-600 font-light leading-relaxed min-h-[60px]">
                    {activeTab === 'desc' && <p>{selectedProduct.description}</p>}
                    {activeTab === 'features' && (
                      <ul className="list-disc pl-4 space-y-1">
                        {selectedProduct.highlightFeatures.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="space-y-3 pt-4 border-t border-amber-200/50">
                <button
                  onClick={handleContactClick}
                  className="w-full flex items-center justify-center gap-2 gold-gradient-bg text-white py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
                >
                  <Phone className="w-4 h-4 text-white" /> Liên Hệ Ngay
                </button>

                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`tel:${contactConfig.phone}`}
                    className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-2.5 rounded-xl text-xs font-medium hover:bg-emerald-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Hotline VIP
                  </a>

                  <a
                    href={contactConfig.zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-blue-600 text-white py-2.5 rounded-xl text-xs font-medium hover:bg-blue-700 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Zalo Chat
                  </a>

                  <a
                    href={contactConfig.messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-sky-600 text-white py-2.5 rounded-xl text-xs font-medium hover:bg-sky-700 transition-colors"
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
                        modalContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
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
