import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const CategorySection: React.FC = () => {
  const { categories, setActiveTab, setSelectedCategoryFilter } = useApp();

  const handleCategoryClick = (catSlug: string) => {
    setSelectedCategoryFilter(catSlug);
    setActiveTab('collection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Danh Mục Sản Phẩm May Đo & Cho Thuê
        </span>
        <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111]">
          Kiệt Tác Thiết Kế Thượng Lưu
        </h2>
        <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto rounded-full" />
        <p className="text-sm font-serif-sub text-stone-600 font-light text-base">
          Khám phá không gian trang phục cưới & áo dài truyền thống được may đo công phu từ những nghệ nhân lành nghề nhất.
        </p>
      </div>

      {/* Large Grid of Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleCategoryClick(cat.slug)}
            className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-amber-200/40 hover:border-amber-400 transition-all duration-500"
          >
            {/* Background Image with Zoom */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/50 transition-colors duration-500" />

            {/* Top Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1 rounded-full glass-dark text-amber-300 text-xs font-medium border border-amber-500/30">
                {cat.itemCount}+ Thiết kế
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-10 space-y-2 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-title text-2xl font-bold group-hover:text-amber-300 transition-colors">
                  {cat.name}
                </h3>
                <div className="p-2.5 rounded-full glass-panel text-stone-900 group-hover:bg-[#D4AF37] group-hover:text-white transition-all transform group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
                {cat.description}
              </p>

              <div className="pt-2">
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest inline-flex items-center gap-1 group-hover:underline">
                  Khám Phá Mẫu Mới 2026
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
