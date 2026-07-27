import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Search,
  Filter,
  Eye,
  Calendar,
  SlidersHorizontal,
  CheckCircle2,
  Grid,
  LayoutGrid,
  X,
  Folder,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';

export const CollectionPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    openProductModal,
    openBookingModal
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [maxRentalPrice, setMaxRentalPrice] = useState<number>(10000000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popular'>('newest');
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  // Group categories into Parent (Level 1) vs Child (Level 2)
  const parentCats = categories.filter(
    (c) => !c.parentId || c.parentId === 'none' || c.level === 1
  );
  const getSubCats = (parentId: string) => categories.filter((c) => c.parentId === parentId);

  const toggleExpandCat = (catId: string) => {
    setExpandedCats((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  // Available unique colors & sizes
  const availableColors = ['all', 'Trắng', 'Đỏ Hoàng Gia', 'Hồng', 'Champagne', 'Đen', 'Vàng', 'Xanh'];
  const availableSizes = ['all', 'S', 'M', 'L', 'XL', 'May đo'];

  // Multi-facet filter calculation with parent & subcategory matching
  const filteredProducts = useMemo(() => {
    const isCategoryMatched = (product: Product, targetFilter: string) => {
      if (targetFilter === 'all') return true;

      // Find target category object
      const targetCat = categories.find(
        (c) =>
          c.id === targetFilter ||
          c.slug === targetFilter ||
          c.name.toLowerCase() === targetFilter.toLowerCase()
      );

      if (!targetCat) {
        return (
          product.categoryId === targetFilter ||
          product.slug === targetFilter ||
          product.categoryName.toLowerCase().includes(targetFilter.toLowerCase())
        );
      }

      // Check if targetCat is a parent category with subcategories
      const childCats = categories.filter((c) => c.parentId === targetCat.id);
      const childIds = childCats.map((c) => c.id);
      const childSlugs = childCats.map((c) => c.slug);
      const childNames = childCats.map((c) => c.name.toLowerCase());

      const directMatch =
        product.categoryId === targetCat.id ||
        product.slug === targetCat.slug ||
        product.categoryName.toLowerCase() === targetCat.name.toLowerCase() ||
        product.categoryName.toLowerCase().includes(targetCat.name.toLowerCase()) ||
        targetCat.name.toLowerCase().includes(product.categoryName.toLowerCase());

      const childMatch =
        childIds.includes(product.categoryId) ||
        childSlugs.includes(product.slug) ||
        childNames.some((cn) => product.categoryName.toLowerCase().includes(cn));

      return directMatch || childMatch;
    };

    return products
      .filter((product) => {
        // Category Filter
        if (!isCategoryMatched(product, selectedCategoryFilter)) {
          return false;
        }

        // Search Filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matches =
            product.title.toLowerCase().includes(q) ||
            product.sku.toLowerCase().includes(q) ||
            product.material.toLowerCase().includes(q) ||
            product.categoryName.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Color Filter
        if (selectedColor !== 'all') {
          const hasColor = product.colors.some((c) =>
            c.toLowerCase().includes(selectedColor.toLowerCase())
          );
          if (!hasColor) return false;
        }

        // Size Filter
        if (selectedSize !== 'all') {
          if (!product.sizes.includes(selectedSize as any)) return false;
        }

        // Price Filter
        if (product.rentalPrice > maxRentalPrice) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.rentalPrice - b.rentalPrice;
        if (sortBy === 'price-desc') return b.rentalPrice - a.rentalPrice;
        if (sortBy === 'popular') return (b.viewCount || 0) - (a.viewCount || 0);
        return a.isNew ? -1 : 1; // Default newest
      });
  }, [
    products,
    selectedCategoryFilter,
    searchQuery,
    selectedColor,
    selectedSize,
    maxRentalPrice,
    sortBy
  ]);

  const resetFilters = () => {
    setSelectedCategoryFilter('all');
    setSearchQuery('');
    setSelectedColor('all');
    setSelectedSize('all');
    setMaxRentalPrice(10000000);
    setSortBy('newest');
  };

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Maison De Soie Catalogue
          </span>
          <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#111111]">
            Bộ Sưu Tập Trang Phục Cưới VIP
          </h1>
          <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto rounded-full" />
          <p className="text-xs sm:text-sm font-serif-sub text-stone-600 font-light text-base">
            Tìm kiếm & trải nghiệm hàng trăm thiết kế Áo dài, Váy cưới, Vest chú rể cao cấp nhất năm 2026.
          </p>
        </div>

        {/* Mobile Quick Category Swiper Bar */}
        <div className="lg:hidden space-y-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-amber-200/40">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategoryFilter === 'all'
                  ? 'bg-[#121212] text-amber-300 font-semibold shadow-md'
                  : 'bg-white text-stone-800 border border-amber-200/80 hover:bg-amber-50'
              }`}
            >
              Tất Cả ({products.length})
            </button>

            {parentCats.map((parent) => {
              const subs = getSubCats(parent.id);
              const isParentActive = selectedCategoryFilter === parent.id;
              const isSubActive = subs.some((s) => s.id === selectedCategoryFilter);
              const isActive = isParentActive || isSubActive;

              return (
                <button
                  key={parent.id}
                  onClick={() => setSelectedCategoryFilter(parent.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                    isActive
                      ? 'bg-[#121212] text-amber-300 font-semibold shadow-md'
                      : 'bg-white text-stone-800 border border-amber-200/80 hover:bg-amber-50'
                  }`}
                >
                  <span>{parent.name}</span>
                  {subs.length > 0 && <span className="text-[10px] opacity-75">({subs.length})</span>}
                </button>
              );
            })}
          </div>

          {/* Subcategories row on mobile if a parent with children is selected */}
          {parentCats.map((parent) => {
            const subs = getSubCats(parent.id);
            const isParentActive = selectedCategoryFilter === parent.id;
            const isSubActive = subs.some((s) => s.id === selectedCategoryFilter);

            if (subs.length > 0 && (isParentActive || isSubActive)) {
              return (
                <div key={parent.id} className="flex items-center gap-2 overflow-x-auto py-1 pl-2 bg-amber-50/80 rounded-2xl border border-amber-200/60 no-scrollbar">
                  <span className="text-[11px] font-bold text-amber-900 flex-shrink-0 px-2">
                    Loại con:
                  </span>
                  <button
                    onClick={() => setSelectedCategoryFilter(parent.id)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                      isParentActive ? 'bg-amber-600 text-white shadow-sm' : 'bg-white text-stone-700 hover:bg-amber-100'
                    }`}
                  >
                    Tất cả {parent.name}
                  </button>
                  {subs.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedCategoryFilter(sub.id)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                        selectedCategoryFilter === sub.id
                          ? 'bg-amber-600 text-white shadow-sm'
                          : 'bg-white text-stone-700 hover:bg-amber-100'
                      }`}
                    >
                      ↳ {sub.name}
                    </button>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Realtime Search & Sort Bar */}
        <div className="glass-panel p-4 sm:p-6 rounded-3xl shadow-lg border border-amber-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Tìm kiếm mẫu áo dài, váy cưới, SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-amber-200/80 text-xs text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort & Grid Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs">
            {/* Mobile Filter Drawer Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-100 text-amber-900 font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" /> Bộ Lọc
            </button>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-stone-500 hidden sm:inline">Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2.5 bg-white rounded-xl border border-amber-200/80 font-medium text-stone-800 focus:outline-none"
              >
                <option value="newest">Mẫu mới nhất 2026</option>
                <option value="price-asc">Giá thuê: Thấp đến Cao</option>
                <option value="price-desc">Giá thuê: Cao đến Thấp</option>
                <option value="popular">Được yêu thích nhất</option>
              </select>
            </div>

            {/* Grid layout switcher */}
            <div className="hidden lg:flex items-center gap-1 bg-white p-1 rounded-xl border border-amber-200/80">
              <button
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridCols === 3 ? 'bg-[#121212] text-amber-300' : 'text-stone-400 hover:text-stone-800'
                }`}
                title="3 Cột"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridCols === 4 ? 'bg-[#121212] text-amber-300' : 'text-stone-400 hover:text-stone-800'
                }`}
                title="4 Cột"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout - Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Multi-facet Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 glass-panel p-6 rounded-3xl border border-amber-200/60 sticky top-28">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
              <h3 className="font-serif-title font-bold text-[#111111] flex items-center gap-2 text-sm uppercase tracking-wider">
                <Filter className="w-4 h-4 text-[#B8860B]" /> Bộ Lọc Tìm Kiếm
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] text-amber-800 hover:underline font-medium"
              >
                Xóa tất cả
              </button>
            </div>

            {/* Category Filter - Nested Parent & Child Hierarchy */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Danh Mục Trang Phục
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategoryFilter('all')}
                  className={`block w-full text-left px-3 py-2 rounded-xl transition-all ${
                    selectedCategoryFilter === 'all'
                      ? 'bg-[#121212] text-amber-300 font-semibold shadow'
                      : 'text-stone-700 hover:bg-amber-100/50'
                  }`}
                >
                  Tất Cả ({products.length})
                </button>

                {parentCats.map((parent) => {
                  const subs = getSubCats(parent.id);
                  const isParentActive = selectedCategoryFilter === parent.id;
                  const isSubActive = subs.some((s) => s.id === selectedCategoryFilter);
                  const isExpanded = expandedCats[parent.id] || isParentActive || isSubActive;

                  return (
                    <div key={parent.id} className="space-y-1">
                      {/* Parent Row */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedCategoryFilter(parent.id);
                            if (subs.length > 0) {
                              setExpandedCats((prev) => ({ ...prev, [parent.id]: true }));
                            }
                          }}
                          className={`flex-1 text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between font-bold ${
                            isParentActive
                              ? 'bg-[#121212] text-amber-300 shadow'
                              : 'text-stone-900 hover:bg-amber-100/50'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Folder className="w-3.5 h-3.5 text-amber-600" />
                            {parent.name}
                          </span>
                        </button>

                        {subs.length > 0 && (
                          <button
                            onClick={() => toggleExpandCat(parent.id)}
                            className="p-1.5 text-stone-500 hover:text-amber-800 transition-transform"
                            title="Ẩn/Hiện danh mục con"
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-amber-700' : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* Subcategories (Hidden inside parent until expanded) */}
                      {subs.length > 0 && isExpanded && (
                        <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-amber-300 ml-3">
                          {subs.map((sub) => {
                            const isChildActive = selectedCategoryFilter === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => setSelectedCategoryFilter(sub.id)}
                                className={`block w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                                  isChildActive
                                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                                    : 'text-stone-700 hover:bg-amber-100/60 hover:text-amber-900'
                                }`}
                              >
                                ↳ {sub.name}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2 pt-2 border-t border-amber-200/40">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 uppercase tracking-wider">
                <span>Mức Giá Thuê Tối Đa:</span>
              </div>
              <p className="text-sm font-serif-title font-bold text-[#B8860B]">
                Dưới {maxRentalPrice.toLocaleString('vi-VN')} đ
              </p>
              <input
                type="range"
                min="500000"
                max="15000000"
                step="500000"
                value={maxRentalPrice}
                onChange={(e) => setMaxRentalPrice(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>

            {/* Colors */}
            <div className="space-y-2 pt-2 border-t border-amber-200/40">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Màu Sắc
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableColors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                      selectedColor === c
                        ? 'bg-amber-900 text-amber-200 font-semibold'
                        : 'bg-white border border-stone-200 text-stone-700 hover:border-amber-400'
                    }`}
                  >
                    {c === 'all' ? 'Tất cả màu' : c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2 pt-2 border-t border-amber-200/40">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                Kích Cỡ Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                      selectedSize === s
                        ? 'bg-amber-900 text-amber-200 font-semibold'
                        : 'bg-white border border-stone-200 text-stone-700 hover:border-amber-400'
                    }`}
                  >
                    {s === 'all' ? 'Tất cả size' : s}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Product Grid - 2 columns on mobile, compact cards */}
          <main className={`lg:col-span-9 grid grid-cols-2 sm:grid-cols-2 ${gridCols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-3 sm:gap-6`}>
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-16 text-center space-y-4 bg-white rounded-3xl p-8 border border-stone-200 shadow-md">
                <p className="font-serif-title text-2xl text-stone-800 font-bold">
                  Không tìm thấy mẫu phù hợp bộ lọc
                </p>
                <p className="text-xs text-stone-500">
                  Vui lòng thử mở rộng mức giá hoặc chọn danh mục khác.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full gold-gradient-bg text-white text-xs font-semibold uppercase tracking-wider shadow"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md sm:shadow-xl border border-amber-200/50 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
                >
                  <div
                    onClick={() => openProductModal(product)}
                    className="relative aspect-[3/4] overflow-hidden bg-stone-900 cursor-pointer"
                  >
                    <img
                      src={product.mainImage}
                      alt={product.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 flex flex-col gap-1">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-black/80 text-amber-300 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
                        {product.categoryName}
                      </span>
                      {product.isNew && (
                        <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow">
                          Hot 2026
                        </span>
                      )}
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex flex-col items-center justify-center gap-2.5 p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openProductModal(product);
                        }}
                        className="w-full py-2.5 rounded-xl bg-white text-stone-900 text-xs font-semibold uppercase tracking-wider shadow-lg hover:bg-amber-400 transition-colors inline-flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" /> Xem Chi Tiết
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openBookingModal(product.sku);
                        }}
                        className="w-full py-2.5 rounded-xl gold-gradient-bg text-white text-xs font-semibold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform inline-flex items-center justify-center gap-2"
                      >
                        <Calendar className="w-4 h-4" /> Đặt Thuê Ngay
                      </button>
                    </div>
                  </div>

                  <div className="p-3 sm:p-5 space-y-1.5 sm:space-y-2.5 bg-white">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-stone-500 font-mono">
                      <span>MÃ: {product.sku}</span>
                      <span className="text-emerald-700 font-medium hidden sm:inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> {product.status}
                      </span>
                    </div>

                    <h3
                      onClick={() => openProductModal(product)}
                      className="font-serif-title text-xs sm:text-base font-bold text-stone-900 line-clamp-1 hover:text-[#B8860B] transition-colors cursor-pointer"
                    >
                      {product.title}
                    </h3>

                    <div className="pt-1.5 sm:pt-2 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        <span className="text-[8px] sm:text-[9px] text-stone-400 uppercase tracking-wider block">Giá Thuê</span>
                        <span className="font-serif-title font-bold text-xs sm:text-base text-[#B8860B]">
                          {product.rentalPrice.toLocaleString('vi-VN')} đ
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[8px] sm:text-[9px] text-stone-400 uppercase tracking-wider block">Giá Bán</span>
                        <span className="font-serif-title font-medium text-[10px] sm:text-xs text-stone-600">
                          {product.salePrice.toLocaleString('vi-VN')} đ
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </main>
        </div>
      </div>

      {/* Floating Mobile Category & Filter Popup Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-amber-300/80 p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-3 sticky top-0 bg-white z-10">
                <h3 className="font-serif-title font-bold text-stone-900 text-sm sm:text-base flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#B8860B]" />
                  Danh Mục & Bộ Lọc Trang Phục
                </h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded-full bg-stone-100 text-stone-700 hover:bg-amber-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories Tree list */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                  Chọn Danh Mục Phục Trang
                </label>
                <div className="space-y-1.5 text-xs max-h-60 overflow-y-auto pr-1">
                  <button
                    onClick={() => {
                      setSelectedCategoryFilter('all');
                      setIsMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left px-3.5 py-2.5 rounded-xl transition-all font-bold ${
                      selectedCategoryFilter === 'all'
                        ? 'bg-[#121212] text-amber-300 shadow'
                        : 'bg-stone-50 text-stone-800 hover:bg-amber-100'
                    }`}
                  >
                    Tất Cả Sản Phẩm ({products.length})
                  </button>

                  {parentCats.map((parent) => {
                    const subs = getSubCats(parent.id);
                    const isParentActive = selectedCategoryFilter === parent.id;
                    const isSubActive = subs.some((s) => s.id === selectedCategoryFilter);

                    return (
                      <div key={parent.id} className="space-y-1">
                        <button
                          onClick={() => {
                            setSelectedCategoryFilter(parent.id);
                            setIsMobileFilterOpen(false);
                          }}
                          className={`block w-full text-left px-3.5 py-2.5 rounded-xl transition-all font-bold ${
                            isParentActive || isSubActive
                              ? 'bg-[#121212] text-amber-300 shadow'
                              : 'bg-stone-50 text-stone-900 hover:bg-amber-100'
                          }`}
                        >
                          📁 {parent.name}
                        </button>

                        {subs.length > 0 && (
                          <div className="pl-4 space-y-1 border-l-2 border-amber-300/60 ml-2">
                            {subs.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setSelectedCategoryFilter(sub.id);
                                  setIsMobileFilterOpen(false);
                                }}
                                className={`block w-full text-left px-3 py-1.5 rounded-lg text-[11px] font-medium ${
                                  selectedCategoryFilter === sub.id
                                    ? 'bg-amber-500 text-stone-950 font-bold'
                                    : 'text-stone-700 hover:bg-amber-50'
                                }`}
                              >
                                ↳ {sub.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-1.5 pt-3 border-t border-amber-100">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                  Giá Thuê Tối Đa: {maxRentalPrice.toLocaleString('vi-VN')} đ
                </label>
                <input
                  type="range"
                  min="500000"
                  max="15000000"
                  step="500000"
                  value={maxRentalPrice}
                  onChange={(e) => setMaxRentalPrice(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    resetFilters();
                    setIsMobileFilterOpen(false);
                  }}
                  className="w-1/3 py-3 bg-stone-100 text-stone-800 font-bold rounded-2xl text-xs uppercase"
                >
                  Xóa lọc
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-2/3 py-3 gold-gradient-bg text-stone-950 font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg"
                >
                  Xem ({filteredProducts.length} Mẫu)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
