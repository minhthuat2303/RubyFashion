import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Search,
  Calendar,
  Menu,
  X,
  Sparkles,
  Clock,
  ChevronDown,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    categories,
    setSelectedCategoryFilter,
    contactConfig,
    openBookingModal,
    setIsSearchModalOpen
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCollectionOpen, setIsMobileCollectionOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'collection', label: 'Bộ Sưu Tập' },
    { id: 'about', label: 'Giới Thiệu' },
    { id: 'services', label: 'Dịch Vụ' },
    { id: 'rental-guide', label: 'Bảng Giá & Quy Trình' },
    { id: 'contact', label: 'Liên Hệ' }
  ];

  const handleNavClick = (tabId: any) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group"
          >
            <span className="font-serif-title text-2xl sm:text-3xl font-bold tracking-widest text-[#111111] group-hover:text-[#B8860B] transition-colors">
              MAISON DE SOIE
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#C5A059] uppercase font-light">
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

            {/* Book Appointment CTA */}
            <button
              onClick={() => openBookingModal()}
              className="hidden sm:inline-flex items-center gap-2 gold-gradient-bg text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              Đặt Lịch Tư Vấn VIP
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#1A1A1A] hover:bg-amber-100/50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-amber-200/60 z-30 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => {
                if (item.id === 'collection') {
                  return (
                    <div key={item.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setSelectedCategoryFilter('all');
                            handleNavClick('collection');
                          }}
                          className={`text-left py-2.5 text-base font-serif-title tracking-wider ${
                            activeTab === 'collection'
                              ? 'text-[#B8860B] font-bold border-l-2 border-[#D4AF37] pl-3'
                              : 'text-[#2C2C2C] pl-3 hover:text-[#B8860B]'
                          }`}
                        >
                          {item.label}
                        </button>
                        <button
                          onClick={() => setIsMobileCollectionOpen(!isMobileCollectionOpen)}
                          className="p-2 text-amber-800 hover:bg-amber-100/60 rounded-lg flex items-center gap-1 text-xs font-semibold"
                        >
                          <Layers className="w-4 h-4 text-[#B8860B]" />
                          <span>Danh mục</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isMobileCollectionOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Mobile Category List */}
                      {isMobileCollectionOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pl-6 pr-2 py-2 space-y-1.5 bg-amber-50/60 rounded-2xl border border-amber-200/50 my-1"
                        >
                          <button
                            onClick={() => {
                              setSelectedCategoryFilter('all');
                              handleNavClick('collection');
                            }}
                            className="w-full text-left py-1.5 px-3 rounded-xl text-xs font-semibold text-stone-800 hover:bg-amber-100 flex items-center justify-between"
                          >
                            <span>Tất Cả Sản Phẩm</span>
                            <span className="text-[10px] text-amber-700 font-mono font-normal">Xem tất cả</span>
                          </button>
                          {categories
                            .filter((c) => !c.parentId || c.parentId === 'none' || c.level === 1)
                            .map((parent) => {
                              const subs = categories.filter((c) => c.parentId === parent.id);
                              return (
                                <div key={parent.id} className="space-y-1">
                                  <button
                                    onClick={() => {
                                      setSelectedCategoryFilter(parent.id);
                                      handleNavClick('collection');
                                    }}
                                    className="w-full text-left py-1.5 px-3 rounded-xl text-xs font-bold text-stone-900 hover:bg-amber-100 flex items-center justify-between"
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="w-2 h-2 rounded-full bg-amber-600" />
                                      {parent.name}
                                    </span>
                                    {subs.length > 0 && (
                                      <span className="text-[10px] text-amber-800 font-mono">
                                        {subs.length} loại con
                                      </span>
                                    )}
                                  </button>

                                  {/* Subcategories (nested inside parent) */}
                                  {subs.length > 0 && (
                                    <div className="pl-6 space-y-1 border-l border-amber-300 ml-3">
                                      {subs.map((sub) => (
                                        <button
                                          key={sub.id}
                                          onClick={() => {
                                            setSelectedCategoryFilter(sub.id);
                                            handleNavClick('collection');
                                          }}
                                          className="w-full text-left py-1 px-2.5 rounded-lg text-[11px] font-medium text-stone-700 hover:bg-amber-100 hover:text-amber-950 transition-colors"
                                        >
                                          ↳ {sub.name}
                                        </button>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </motion.div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left py-2.5 text-base font-serif-title tracking-wider ${
                      activeTab === item.id
                        ? 'text-[#B8860B] font-bold border-l-2 border-[#D4AF37] pl-3'
                        : 'text-[#2C2C2C] pl-3 hover:text-[#B8860B]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-amber-200/50 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openBookingModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 gold-gradient-bg text-white py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  Đặt Lịch Thử Đồ VIP
                </button>

                <a
                  href={`tel:${contactConfig.phone}`}
                  className="w-full flex items-center justify-center gap-2 border border-[#D4AF37] text-[#B8860B] py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  Gọi Điện Hotline
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
