import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    products,
    openProductModal
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isSearchModalOpen) return null;

  const filteredProducts = query.trim() === ''
    ? products.slice(0, 4) // Default recommendations
    : products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      });

  const handleSelectProduct = (product: any) => {
    setIsSearchModalOpen(false);
    openProductModal(product);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSearchModalOpen(false)}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-amber-300/60 overflow-hidden z-10 p-6 space-y-6"
        >
          {/* Search Header */}
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-4">
            <div className="flex items-center gap-3 flex-1 mr-4">
              <Search className="w-6 h-6 text-[#B8860B]" />
              <input
                type="text"
                autoFocus
                placeholder="Tìm áo dài, váy cưới, vest, SKU (ví dụ: AD-HOANGGIA)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-lg font-serif-title font-medium text-stone-900 placeholder-stone-400 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="p-2 rounded-full hover:bg-stone-200 text-stone-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
            <span className="text-stone-500 font-medium">Gợi ý tìm nhanh:</span>
            {['Áo dài lụa', 'Váy cưới công chúa', 'Vest đen Tuxedo', 'Áo dài cách tân', 'Phụ kiện mấn'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1 rounded-full bg-amber-100/60 text-amber-900 border border-amber-300/50 hover:bg-amber-200 transition-colors whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
            <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-200 pb-2">
              <span>
                {query.trim() === '' ? 'Sản phẩm gợi ý nổi bật' : `Tìm thấy (${filteredProducts.length}) kết quả`}
              </span>
              {query && <Sparkles className="w-4 h-4 text-amber-500" />}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-stone-500 space-y-2">
                <p className="font-serif-title text-lg">Không tìm thấy sản phẩm nào phù hợp</p>
                <p className="text-xs">Hãy thử tìm từ khóa khác như "Áo dài", "Váy cưới" hoặc "Vest".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className="p-3 rounded-2xl bg-white border border-stone-200/80 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex gap-3 group"
                  >
                    <img
                      src={p.mainImage}
                      alt={p.title}
                      className="w-16 h-20 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col justify-between flex-1 text-xs">
                      <div>
                        <span className="text-[10px] text-amber-800 uppercase tracking-wider font-semibold">
                          {p.categoryName}
                        </span>
                        <h4 className="font-serif-title font-bold text-stone-900 line-clamp-1 group-hover:text-[#B8860B] transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 font-mono">SKU: {p.sku}</p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="font-serif-title font-bold text-[#B8860B]">
                          Thuê: {p.rentalPrice.toLocaleString('vi-VN')} đ
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
