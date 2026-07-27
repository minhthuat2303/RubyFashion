import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Eye, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MasonryGrid: React.FC = () => {
  const {
    products,
    categories,
    openProductModal,
    openBookingModal,
    setActiveTab
  } = useApp();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const filteredProducts = activeCategoryFilter === 'all'
    ? products
    : products.filter((p) => p.categoryId === activeCategoryFilter || p.categoryName.toLowerCase().includes(activeCategoryFilter.toLowerCase()));

  return (
    <section className="py-20 bg-[#F3EEEA]/60 border-y border-amber-200/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Bộ Sưu Tập Tiêu Biểu 2026
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111]">
              Tuyệt Tác May Đo & Cho Thuê
            </h2>
            <p className="text-sm font-serif-sub text-stone-600 font-light text-base">
              Mỗi thiết kế là một tác phẩm nghệ thuật tôn vinh vẻ đẹp độc bản của bạn trong ngày trọng đại.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('collection');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 gold-gradient-bg text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-105 transition-all self-start md:self-end"
          >
            <span>Xem Tất Cả Mẫu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Tab Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
              activeCategoryFilter === 'all'
                ? 'bg-[#121212] text-amber-300 shadow-lg'
                : 'bg-white text-stone-700 border border-amber-200/60 hover:border-amber-400'
            }`}
          >
            Tất Cả Sưu Tập ({products.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategoryFilter === cat.id
                  ? 'bg-[#121212] text-amber-300 shadow-lg'
                  : 'bg-white text-stone-700 border border-amber-200/60 hover:border-amber-400'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl border border-amber-200/50 hover:border-amber-400 transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Box */}
                <div
                  onClick={() => openProductModal(product)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-stone-900"
                >
                  <img
                    src={product.mainImage}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 group-hover:blur-[1px] transition-all duration-700 ease-out"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                    <span className="px-3 py-1 rounded-full glass-dark text-amber-300 text-[10px] font-semibold uppercase tracking-wider border border-amber-500/30">
                      {product.categoryName}
                    </span>
                    {product.isNew && (
                      <span className="px-3 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                        Hot 2026
                      </span>
                    )}
                  </div>

                  {/* Hover Soft Overlay & Quick Action Trigger */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProductModal(product);
                      }}
                      className="px-5 py-2.5 rounded-full bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider shadow-xl hover:bg-amber-400 transition-colors inline-flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" /> Xem Chi Tiết
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openBookingModal(product.sku);
                      }}
                      className="px-5 py-2.5 rounded-full gold-gradient-bg text-white text-xs font-semibold uppercase tracking-wider shadow-xl hover:scale-105 transition-transform inline-flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" /> Đặt Thuê Ngay
                    </button>
                  </div>
                </div>

                {/* Info Footer Box */}
                <div className="p-6 space-y-3 bg-white">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                    <span>MÃ: {product.sku}</span>
                    <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {product.status}
                    </span>
                  </div>

                  <h3
                    onClick={() => openProductModal(product)}
                    className="font-serif-title text-xl font-bold text-stone-900 line-clamp-1 hover:text-[#B8860B] transition-colors cursor-pointer"
                  >
                    {product.title}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-1 font-light">
                    {product.material}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Giá Thuê / 3 ngày</span>
                      <span className="font-serif-title font-bold text-lg text-[#B8860B]">
                        {product.rentalPrice.toLocaleString('vi-VN')} đ
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Giá May Bán</span>
                      <span className="font-serif-title font-medium text-sm text-stone-700">
                        {product.salePrice.toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
