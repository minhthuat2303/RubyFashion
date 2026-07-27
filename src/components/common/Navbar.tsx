import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Search,
  Menu,
  X,
  Sparkles,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    contactConfig,
    openQuickContactModal,
    setIsSearchModalOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'collection', label: 'Bộ Sưu Tập' },
    { id: 'services', label: 'Dịch Vụ' },
    { id: 'rental-guide', label: 'Bảng Giá & Quy Trình' },
    { id: 'about', label: 'Về Chúng Tôi' },
    { id: 'contact', label: 'Liên Hệ' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId as any);
    setIsMobileMenuOpen(false);
  };

  const toggleCategoryExpand = (catId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCats((prev) => ({ ...prev, [catId]: !prev[catId] }));
  };

  const parentCats = categories.filter((c) => !c.parentId || c.parentId === 'none' || c.level === 1);
  const getSubCats = (parentId: string) => categories.filter((c) => c.parentId === parentId);

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#121212] text-[#E8DFD8] text-xs py-2 px-4 border-b border-amber-500/20 z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              BST Áo Dài & Váy Cưới Couture 2026 đã sẵn sàng phục vụ
            </span>
            <span className="hidden lg:inline-block text-amber-200/40">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[#C5A059]">
              <Clock className="w-3 h-3" /> {contactConfig.openHours}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${contactConfig.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium tracking-wide"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              Hotline VIP: <span className="text-amber-300 font-semibold">{contactConfig.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel shadow-lg py-3.5 border-b border-amber-200/40'
            : 'bg-white/90 backdrop-blur-md py-5 border-b border-amber-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Left Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-xl text-[#1A1A1A] hover:bg-amber-100/50 transition-colors"
            title="Mở danh mục menu"
          >
            <Menu className="w-6 h-6 text-stone-900" />
          </button>

          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-center sm:items-start text-center sm:text-left group cursor-pointer"
          >
            <h1 className="font-serif-title text-xl sm:text-2xl font-bold tracking-widest text-[#111111] group-hover:text-[#B8860B] transition-colors">
              MAISON DE SOIE
            </h1>
            <span className="text-[10px] text-[#B8860B] uppercase tracking-[0.25em] font-medium -mt-1">
              Haute Couture • Vietnam
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-medium tracking-wider uppercase transition-all duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#B8860B] font-semibold'
                      : 'text-[#2C2C2C] hover:text-[#B8860B]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Realtime Search Trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2.5 rounded-full hover:bg-amber-100/60 text-[#1A1A1A] transition-colors relative"
              title="Tìm kiếm sản phẩm"
            >
              <Search className="w-5 h-5 text-[#2C2C2C]" />
            </button>

            {/* Quick Contact Action Trigger */}
            <button
              onClick={() => openQuickContactModal()}
              className="hidden sm:inline-flex items-center gap-2 gold-gradient-bg text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              Liên Hệ Ngay
            </button>
          </div>
        </div>
      </header>

      {/* LEFT OFF-CANVAS SLIDE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Dark Dim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Left Slide Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed inset-y-0 left-0 w-[82%] max-w-xs sm:max-w-sm bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto border-r border-stone-200"
            >
              <div>
                {/* Drawer Top Branding Header */}
                <div className="p-4 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
                  <div>
                    <h2 className="font-serif-title font-bold text-stone-900 text-base uppercase tracking-wider">
                      MAISON DE SOIE
                    </h2>
                    <p className="text-[10px] text-amber-800 uppercase font-semibold">Danh Mục Trang Phục</p>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full bg-white text-stone-700 hover:bg-amber-100 border border-stone-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Vertical Category Links Stacked */}
                <div className="divide-y divide-stone-200 text-xs sm:text-sm text-stone-800 font-medium">
                  {/* Home Link */}
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`w-full text-left py-3.5 px-4 uppercase font-bold tracking-wider flex items-center justify-between ${
                      activeTab === 'home' ? 'bg-amber-50 text-amber-900' : 'hover:bg-stone-50'
                    }`}
                  >
                    <span>TRANG CHỦ</span>
                  </button>

                  {/* All Products Collection Link */}
                  <button
                    onClick={() => {
                      setSelectedCategoryFilter('all');
                      handleNavClick('collection');
                    }}
                    className={`w-full text-left py-3.5 px-4 font-bold flex items-center justify-between ${
                      activeTab === 'collection' && selectedCategoryFilter === 'all'
                        ? 'bg-amber-50 text-amber-900'
                        : 'hover:bg-stone-50'
                    }`}
                  >
                    <span>Tất Cả Bộ Sưu Tập</span>
                    <span className="text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-mono">
                      {categories.length} danh mục
                    </span>
                  </button>

                  {/* Dynamic Category List */}
                  {parentCats.map((parent) => {
                    const subs = getSubCats(parent.id);
                    const isExpanded = expandedCats[parent.id];
                    const isParentSelected = selectedCategoryFilter === parent.id;

                    return (
                      <div key={parent.id} className="bg-white">
                        <div className="flex items-center justify-between py-3.5 px-4 hover:bg-stone-50 transition-colors">
                          <button
                            onClick={() => {
                              setSelectedCategoryFilter(parent.id);
                              handleNavClick('collection');
                            }}
                            className={`flex-1 text-left font-semibold ${
                              isParentSelected ? 'text-amber-700 font-bold' : 'text-stone-900'
                            }`}
                          >
                            {parent.name}
                          </button>

                          {subs.length > 0 && (
                            <button
                              onClick={(e) => toggleCategoryExpand(parent.id, e)}
                              className="p-2 -mr-2 text-stone-400 hover:text-stone-900 border-l border-stone-100 pl-3"
                              title="Xem loại con"
                            >
                              <ChevronRight
                                className={`w-4 h-4 transition-transform duration-200 ${
                                  isExpanded ? 'rotate-90 text-amber-600' : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Expandable Subcategories */}
                        {subs.length > 0 && isExpanded && (
                          <div className="bg-stone-50/80 border-t border-stone-100 divide-y divide-stone-100">
                            {subs.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => {
                                  setSelectedCategoryFilter(sub.id);
                                  handleNavClick('collection');
                                }}
                                className={`w-full text-left py-2.5 pl-8 pr-4 text-xs font-medium transition-colors ${
                                  selectedCategoryFilter === sub.id
                                    ? 'text-amber-700 font-bold bg-amber-100/50'
                                    : 'text-stone-700 hover:text-amber-950'
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

                  {/* Main Pages Links */}
                  {navItems
                    .filter((item) => item.id !== 'home' && item.id !== 'collection')
                    .map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left py-3.5 px-4 font-bold ${
                          activeTab === item.id ? 'bg-amber-50 text-amber-900' : 'hover:bg-stone-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                </div>
              </div>

              {/* Bottom Quick Contact Buttons */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openQuickContactModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 gold-gradient-bg text-white py-3 rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  Liên Hệ Ngay
                </button>

                <a
                  href={`tel:${contactConfig.phone}`}
                  className="w-full flex items-center justify-center gap-2 border border-stone-300 text-stone-800 bg-white py-2.5 rounded-2xl text-xs font-semibold"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  Hotline: {contactConfig.phoneFormatted}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
