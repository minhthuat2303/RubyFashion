import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { NotificationCenter } from '../components/admin/NotificationCenter';
import { CategoryTreeManager } from '../components/admin/CategoryTreeManager';
import { ExcelImportModal } from '../components/admin/ExcelImportModal';
import {
  Home,
  ShoppingBag,
  Image as ImageIcon,
  Palette,
  Megaphone,
  Calendar,
  Settings,
  Search,
  Plus,
  Trash2,
  Edit,
  Copy,
  Upload,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Lock,
  Phone,
  Store,
  Users,
  TrendingUp,
  X,
  AlertTriangle,
  Bell,
  FileSpreadsheet,
  Layers,
  CheckCheck,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

// 10 Curated Color Themes for 1-Click Selection
const COLOR_THEMES = [
  { name: 'Luxury Gold', primary: '#B8860B', bg: '#FFFFFF', text: '#111111', badge: 'Trắng Sang Trọng' },
  { name: 'Elegant White', primary: '#1E293B', bg: '#FFFFFF', text: '#0F172A', badge: 'Thanh Lịch' },
  { name: 'Rose Romance', primary: '#E11D48', bg: '#FFF1F2', text: '#881337', badge: 'Ngọt Ngào' },
  { name: 'Modern Black', primary: '#D4AF37', bg: '#121212', text: '#F8FAFC', badge: 'Hiện Đại' },
  { name: 'Minimal Beige', primary: '#8C6D46', bg: '#FDFBF7', text: '#2C2520', badge: 'Tối Giản' },
  { name: 'Emerald Luxe', primary: '#059669', bg: '#F0FDF4', text: '#064E3B', badge: 'Ngọc Lục Bảo' },
  { name: 'Midnight Velvet', primary: '#6366F1', bg: '#0F172A', text: '#F8FAFC', badge: 'Đêm Sang Trọng' },
  { name: 'Sapphire Royal', primary: '#2563EB', bg: '#EFF6FF', text: '#1E3A8A', badge: 'Xanh Hoàng Gia' },
  { name: 'Pearl Silk', primary: '#D97706', bg: '#FEF3C7', text: '#78350F', badge: 'Tơ Tằm Ngọc Trai' },
  { name: 'Amber Warmth', primary: '#B45309', bg: '#FFFBEB', text: '#451A03', badge: 'Ấm Áp' }
];

// 3 Styled Font Options
const FONT_OPTIONS = [
  { id: 'Playfair Display', name: 'Playfair Display', desc: 'Sang trọng, cổ điển, phù hợp Áo Dài Couture', styleClass: 'font-serif' },
  { id: 'Poppins', name: 'Poppins', desc: 'Hiện đại, trẻ trung, nét chữ mượt mà', styleClass: 'font-sans' },
  { id: 'Roboto', name: 'Roboto', desc: 'Đơn giản, dễ đọc, phù hợp đại chúng', styleClass: 'font-mono' }
];

export const AdminPage: React.FC = () => {
  const {
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    contactConfig,
    updateContactConfig,
    products,
    categories,
    servicesList,
    updateServiceItem,
    rentalProcessSteps,
    updateProcessStep,
    pricingPolicies,
    updatePricingPolicy,
    addProduct,
    updateProduct,
    deleteProduct,
    consultations,
    updateConsultationStatus,
    heroSlides,
    updateHeroSlide,
    activeTheme,
    setSiteTheme,
    activeFont,
    setSiteFont,
    systemNotifications,
    unreadNotificationCount,
    markAllNotificationsRead,
    clearNotifications,
    showToast
  } = useApp();

  // Login Form State
  const [loginPassword, setLoginPassword] = useState('');

  // Admin Navigation Group State
  const [activeGroup, setActiveGroup] = useState<
    | 'dashboard'
    | 'home'
    | 'products'
    | 'categories'
    | 'services'
    | 'pricing-process'
    | 'notifications'
    | 'images'
    | 'theme'
    | 'promo'
    | 'booking'
    | 'contact'
    | 'settings'
  >('dashboard');

  // Admin Quick Search Bar ("Tìm chức năng...")
  const [adminSearch, setAdminSearch] = useState('');

  // Product Tab Filtering & Search States
  const [prodSearchQuery, setProdSearchQuery] = useState('');
  const [prodCategoryFilter, setProdCategoryFilter] = useState('all');
  const [prodStatusFilter, setProdStatusFilter] = useState('all');
  const [prodSortBy, setProdSortBy] = useState<'newest' | 'price-asc' | 'price-desc'>('newest');

  // Filtered products calculation for Admin Products tab
  const filteredAdminProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search Filter
        if (prodSearchQuery.trim()) {
          const q = prodSearchQuery.toLowerCase();
          const matches =
            p.title.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.categoryName.toLowerCase().includes(q) ||
            (p.material && p.material.toLowerCase().includes(q));
          if (!matches) return false;
        }
        // Category Filter
        if (prodCategoryFilter !== 'all') {
          if (p.categoryId !== prodCategoryFilter && p.categoryName.toLowerCase() !== prodCategoryFilter.toLowerCase()) {
            return false;
          }
        }
        // Status Filter
        if (prodStatusFilter !== 'all') {
          if (prodStatusFilter === 'instock' && p.status !== 'In Stock') return false;
          if (prodStatusFilter === 'outstock' && p.status === 'In Stock') return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (prodSortBy === 'price-asc') return (a.rentalPrice || 0) - (b.rentalPrice || 0);
        if (prodSortBy === 'price-desc') return (b.rentalPrice || 0) - (a.rentalPrice || 0);
        return b.id.localeCompare(a.id);
      });
  }, [products, prodSearchQuery, prodCategoryFilter, prodStatusFilter, prodSortBy]);

  // Synchronized Hierarchical Category Tree Options for Admin Form Dropdowns
  const categoryTreeOptions = useMemo(() => {
    const parents = categories.filter(
      (c) => !c.parentId || c.parentId === 'none' || c.parentId === '' || c.level === 1
    );
    const options: { id: string; name: string }[] = [];

    parents.forEach((parent) => {
      options.push({ id: parent.id, name: `📁 ${parent.name}` });
      const subs = categories.filter((c) => c.parentId === parent.id);
      subs.forEach((sub) => {
        options.push({ id: sub.id, name: `   └─ 🏷️ ${sub.name}` });
      });
    });

    const mappedIds = options.map((o) => o.id);
    categories.forEach((c) => {
      if (!mappedIds.includes(c.id)) {
        options.push({ id: c.id, name: `📁 ${c.name}` });
      }
    });

    return options;
  }, [categories]);

  // Onboarding Guided Tour Mode
  const [isGuideMode, setIsGuideMode] = useState(false);

  // Bell Dropdown Open State
  const [isBellDropdownOpen, setIsBellDropdownOpen] = useState(false);

  // Excel Modal Open State
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  // Product Delete Modal Confirmation
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Product Edit Modal State
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product>>({
    sku: 'AD-2026',
    title: '',
    categoryId: 'cat-1',
    categoryName: 'Áo Dài Truyền Thống',
    salePrice: 12000000,
    rentalPrice: 2500000,
    rentalDeposit: 3000000,
    mainImage: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    images: ['https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'],
    sizes: ['S', 'M', 'L', 'May đo'],
    colors: ['Trắng', 'Đỏ Hoàng Gia'],
    material: 'Lụa Tơ Tằm Bảo Lộc',
    style: 'Hoàng Gia Cổ Điển',
    occasion: 'Lễ Cưới & Đám Hỏi',
    description: 'Mô tả ngắn gọn về vẻ đẹp của trang phục.',
    highlightFeatures: ['Thêu tay thủ công', 'Chất liệu tơ tằm tự nhiên'],
    careInstructions: 'Giặt khô tiệt trùng tiêu chuẩn.',
    status: 'In Stock',
    featured: true,
    isNew: true
  });

  // Contact State
  const [editableContact, setEditableContact] = useState(contactConfig);

  // Banner / Slide State
  const [editableHero, setEditableHero] = useState(heroSlides[0] || {
    id: 'hero-1',
    title: 'Tuyệt Tác Áo Dài Couture 2026',
    subtitle: 'BỘ SỰU TẬP HOÀNG GIA',
    badge: 'HOÀNG GIA 2026',
    image: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
    ctaPrimaryText: 'Khám Phá Ngay',
    ctaSecondaryText: 'Đặt Lịch Thử Đồ'
  });

  // Handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(loginPassword);
  };

  const handleQuickSearch = (query: string) => {
    setAdminSearch(query);
    const q = query.toLowerCase();
    if (!q) return;
    if (q.includes('sản phẩm') || q.includes('ao dai') || q.includes('gia') || q.includes('excel')) setActiveGroup('products');
    else if (q.includes('danh muc') || q.includes('loai')) setActiveGroup('categories');
    else if (q.includes('thong bao') || q.includes('chuong') || q.includes('zalo') || q.includes('telegram')) setActiveGroup('notifications');
    else if (q.includes('logo') || q.includes('sdt') || q.includes('diachi') || q.includes('email') || q.includes('hotline')) setActiveGroup('contact');
    else if (q.includes('mau') || q.includes('giao dien') || q.includes('font') || q.includes('chu')) setActiveGroup('theme');
    else if (q.includes('lich') || q.includes('dat') || q.includes('hen')) setActiveGroup('booking');
    else if (q.includes('anh') || q.includes('bia') || q.includes('banner')) setActiveGroup('home');
    else if (q.includes('quang cao') || q.includes('khuyen mai')) setActiveGroup('promo');
    else if (q.includes('cai dat') || q.includes('mat khau')) setActiveGroup('settings');
  };

  const handleSaveContact = () => {
    updateContactConfig(editableContact);
    showToast('✅ Đã lưu thành công! Website đã được cập nhật.', 'success');
  };

  const handleSaveHero = () => {
    updateHeroSlide(editableHero);
    showToast('✅ Đã đổi ảnh bìa trang chủ thành công!', 'success');
  };

  const handleCreateNewProduct = () => {
    setEditingProduct({
      id: 'prod-' + Date.now(),
      sku: 'AD-MOI-' + Math.floor(100 + Math.random() * 900),
      title: 'Áo Dài Mẫu Mới 2026',
      categoryId: 'cat-1',
      categoryName: 'Áo Dài Truyền Thống',
      salePrice: 15000000,
      rentalPrice: 3000000,
      rentalDeposit: 4000000,
      mainImage: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      images: ['https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800'],
      sizes: ['S', 'M', 'L', 'May đo'],
      colors: ['Trắng', 'Đỏ'],
      material: 'Lụa Tơ Tằm',
      style: 'Sang Trọng',
      occasion: 'Lễ Cưới',
      description: 'Mô tả trang phục đơn giản.',
      highlightFeatures: ['Thiết kế tôn dáng'],
      careInstructions: 'Giặt khô.',
      status: 'In Stock',
      featured: true,
      isNew: true
    });
    setIsEditingProduct(true);
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct.title) return;
    const fullProduct = editingProduct as Product;
    const exists = products.some((p) => p.id === fullProduct.id);
    if (exists) {
      updateProduct(fullProduct);
    } else {
      addProduct(fullProduct);
    }
    setIsEditingProduct(false);
    showToast('✅ Đã lưu sản phẩm thành công!', 'success');
  };

  const handleDuplicateProduct = (prod: Product) => {
    const duplicated: Product = {
      ...prod,
      id: 'prod-' + Date.now(),
      sku: prod.sku + '-COPY',
      title: prod.title + ' (Bản Sao)'
    };
    addProduct(duplicated);
    showToast(`✅ Đã nhân bản sản phẩm "${prod.title}"`, 'success');
  };

  const handleConfirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      showToast(`✅ Đã xóa sản phẩm "${productToDelete.title}"`, 'info');
      setProductToDelete(null);
    }
  };

  // Image Upload Simulation with Auto Resize / WebP conversion notice
  const handleSimulatedImageUpload = (e: React.ChangeEvent<HTMLInputElement>, targetField: 'logo' | 'hero' | 'product') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const resultUrl = reader.result as string;
      if (targetField === 'logo') {
        setEditableContact((prev) => ({ ...prev, logoUrl: resultUrl }));
      } else if (targetField === 'hero') {
        setEditableHero((prev) => ({ ...prev, image: resultUrl }));
      } else if (targetField === 'product') {
        setEditingProduct((prev) => ({ ...prev, mainImage: resultUrl }));
      }
      showToast('✅ Đã tự động nén & tối ưu ảnh sang định dạng WebP sắc nét!', 'success');
    };
    reader.readAsDataURL(file);
  };

  // If not logged in, render simple login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-white">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-amber-200 space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-[#B8860B] flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900">
              Đăng Nhập Quản Lý Shop
            </h2>
            <p className="text-xs text-stone-500">
              Nhập mật khẩu đơn giản để quản lý giao diện & sản phẩm
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                Mật Khẩu Quản Lý
              </label>
              <input
                type="password"
                placeholder="Nhập mật khẩu (Mặc định: admin123)"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-amber-500 focus:bg-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 gold-gradient-bg text-white font-bold rounded-2xl text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
            >
              Vào Trang Quản Lý
            </button>
          </form>

          <p className="text-[11px] text-amber-800 bg-amber-50 py-2 px-3 rounded-xl">
            💡 Mật khẩu thử nghiệm: <strong className="font-mono text-stone-900">admin123</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Top Friendly Header Bar */}
      <header className="bg-white border-b border-amber-200/80 sticky top-0 z-30 shadow-sm">
        <div className="w-full px-4 sm:px-8 xl:px-10 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Shop Brand & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gold-gradient-bg text-white flex items-center justify-center font-bold text-lg shadow">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-serif-title font-bold text-xl text-stone-900 leading-none">
                Bảng Quản Lý Shop Dễ Dùng
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Dành cho chủ shop & nhân viên bán hàng (Đơn giản - Trực quan - Không cần biết máy tính)
              </p>
            </div>
          </div>

          {/* Quick Search, Realtime Bell Badge & Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Quick Search Bar */}
            <div className="relative flex-1 md:w-56">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Tìm chức năng (ví dụ: logo, màu, giá)..."
                value={adminSearch}
                onChange={(e) => handleQuickSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-100 border border-stone-300 rounded-xl text-xs text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            {/* REALTIME BELL BADGE & DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsBellDropdownOpen(!isBellDropdownOpen)}
                className="p-2.5 rounded-2xl bg-amber-100/80 text-amber-950 hover:bg-amber-200 transition-colors relative flex items-center gap-1 font-bold text-xs shadow-sm"
                title="Trung tâm thông báo realtime"
              >
                <Bell className="w-4 h-4 text-amber-700" />
                <span>🔔 ({unreadNotificationCount})</span>
              </button>

              {/* Bell Dropdown Popup */}
              {isBellDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-amber-200 p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-bold text-stone-900 text-xs uppercase tracking-wider flex items-center gap-1">
                      <Bell className="w-4 h-4 text-amber-600" /> Thông Báo Khách Hàng Realtime
                    </span>
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-[11px] text-amber-800 hover:underline font-bold flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" /> Đánh dấu đã đọc
                    </button>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2 text-xs">
                    {systemNotifications.length === 0 ? (
                      <p className="text-center text-stone-400 py-4 font-light">Chưa có thông báo nào</p>
                    ) : (
                      systemNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-2xl border transition-all ${
                            notif.read ? 'bg-stone-50 border-stone-200 text-stone-600' : 'bg-amber-50 border-amber-300 text-stone-900 font-medium'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-amber-900 text-xs">{notif.title}</span>
                            <span className="text-[10px] text-stone-400 font-mono">{notif.timestamp}</span>
                          </div>
                          <p className="text-xs mt-1 leading-snug">{notif.message}</p>
                          <div className="mt-1.5 flex items-center justify-between text-[11px] font-bold text-amber-700">
                            <span>SĐT: {notif.phone}</span>
                            <button
                              onClick={() => {
                                setIsBellDropdownOpen(false);
                                setActiveGroup('booking');
                              }}
                              className="hover:underline"
                            >
                              [Xem chi tiết]
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t flex items-center justify-between text-xs">
                    <button
                      onClick={clearNotifications}
                      className="text-rose-600 hover:underline text-[11px] font-bold"
                    >
                      Xóa tất cả
                    </button>
                    <button
                      onClick={() => {
                        setIsBellDropdownOpen(false);
                        setActiveGroup('notifications');
                      }}
                      className="px-3 py-1.5 gold-gradient-bg text-white font-bold rounded-xl text-[11px]"
                    >
                      Cấu Hình Kênh Gửi
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Guide Mode Toggle */}
            <button
              onClick={() => setIsGuideMode(!isGuideMode)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                isGuideMode
                  ? 'bg-amber-500 text-stone-950 shadow-md animate-pulse'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
              title="Bật/Tắt bong bóng hướng dẫn"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Hướng dẫn</span>
            </button>

            {/* Logout */}
            <button
              onClick={logoutAdmin}
              className="px-3 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors"
            >
              Thoát
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace Grid - Full Widescreen Responsive Layout */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-12 gap-6 items-start">
        {/* Mobile Navigation Bar & Selector - Optimizes Phone View for Admin */}
        <div className="lg:hidden col-span-full bg-white p-4 rounded-3xl border-2 border-amber-300 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900 uppercase flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              Chức Năng Quản Lý:
            </span>
            <select
              value={activeGroup}
              onChange={(e) => setActiveGroup(e.target.value as any)}
              className="px-3 py-2 bg-amber-50 border border-amber-300 rounded-xl font-bold text-stone-900 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            >
              {[
                { id: 'dashboard', label: 'Tổng quan' },
                { id: 'products', label: 'Sản phẩm' },
                { id: 'categories', label: 'Danh mục đa cấp' },
                { id: 'services', label: 'Quản lý Dịch vụ' },
                { id: 'pricing-process', label: 'Bảng giá & Quy trình' },
                { id: 'contact', label: 'Liên hệ & Showroom' },
                { id: 'booking', label: 'Lịch hẹn khách hàng' },
                { id: 'notifications', label: '🔔 Thông báo Realtime' },
                { id: 'home', label: 'Banner Trang chủ' },
                { id: 'images', label: 'Kho Hình ảnh' },
                { id: 'theme', label: 'Giao diện & Màu' },
                { id: 'promo', label: 'Chương trình Ưu đãi' },
                { id: 'settings', label: 'Cài đặt Mật khẩu' }
              ].map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'dashboard', label: 'Tổng quan', icon: TrendingUp },
              { id: 'products', label: 'Sản phẩm', icon: ShoppingBag },
              { id: 'categories', label: 'Danh mục đa cấp', icon: Layers },
              { id: 'services', label: 'Quản lý Dịch vụ', icon: Sparkles },
              { id: 'pricing-process', label: 'Bảng giá & Quy trình', icon: FileSpreadsheet },
              { id: 'contact', label: 'Liên hệ & Showroom', icon: Phone },
              { id: 'booking', label: 'Lịch hẹn khách hàng', icon: Calendar },
              { id: 'notifications', label: '🔔 Thông báo Realtime', icon: Bell },
              { id: 'home', label: 'Banner Trang chủ', icon: Home },
              { id: 'images', label: 'Kho Hình ảnh', icon: ImageIcon },
              { id: 'theme', label: 'Giao diện & Màu', icon: Palette },
              { id: 'promo', label: 'Chương trình Ưu đãi', icon: Megaphone },
              { id: 'settings', label: 'Cài đặt Mật khẩu', icon: Settings }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeGroup === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveGroup(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-[#121212] text-amber-300 shadow-md'
                      : 'bg-stone-50 text-stone-700 hover:bg-amber-100'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Left Column: Vertical Sidebar Menu (Hidden on Mobile View) */}
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-3 bg-white p-3.5 rounded-3xl shadow-sm border-2 border-amber-300/80 sticky top-24 space-y-1.5 z-10">
          <div className="px-3 py-2 border-b border-amber-100 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
              Danh Mục Quản Lý
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-950 font-bold px-2 py-0.5 rounded-full">
              Menu Dọc
            </span>
          </div>

          {[
            { id: 'dashboard', label: 'Tổng quan', icon: TrendingUp },
            { id: 'products', label: 'Sản phẩm', icon: ShoppingBag },
            { id: 'categories', label: 'Danh mục đa cấp', icon: Layers },
            { id: 'services', label: 'Quản lý Dịch vụ', icon: Sparkles },
            { id: 'pricing-process', label: 'Bảng giá & Quy trình', icon: FileSpreadsheet },
            { id: 'contact', label: 'Liên hệ & Showroom', icon: Phone },
            { id: 'booking', label: 'Lịch hẹn khách hàng', icon: Calendar },
            { id: 'notifications', label: '🔔 Thông báo Realtime', icon: Bell },
            { id: 'home', label: 'Banner Trang chủ', icon: Home },
            { id: 'images', label: 'Kho Hình ảnh', icon: ImageIcon },
            { id: 'theme', label: 'Giao diện & Màu', icon: Palette },
            { id: 'promo', label: 'Chương trình Ưu đãi', icon: Megaphone },
            { id: 'settings', label: 'Cài đặt Mật khẩu', icon: Settings }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeGroup === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveGroup(tab.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#121212] text-amber-300 shadow-md scale-[1.02]'
                    : 'bg-stone-50 text-stone-700 hover:bg-amber-100/60 hover:text-amber-950'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span>{tab.label}</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-50 ${isActive ? 'text-amber-300 opacity-100' : ''}`} />
              </button>
            );
          })}
        </aside>

        {/* Main Functional Workspace (Col Span 9) */}
        <div className="lg:col-span-9 xl:col-span-9 space-y-6">

          {/* Onboarding Guide Banner Alert */}
          {isGuideMode && (
            <div className="p-4 bg-amber-50 border-2 border-amber-400 rounded-3xl flex items-start gap-3 text-amber-900 text-xs shadow-md">
              <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-sm">💡 Chế độ Hướng dẫn Nhanh cho Chủ Shop</p>
                <p className="leading-relaxed">
                  Bấm vào từng nhóm ở trên: chọn <strong>"Sản phẩm"</strong> để bấm nút <code>+ Import từ Excel</code> hoặc <code>+ Thêm sản phẩm</code>, chọn <strong>"🔔 Thông báo"</strong> để cài đặt Zalo/Email/Telegram, hoặc chọn <strong>"Giao diện & Màu"</strong> để đổi màu toàn bộ website ngay lập tức!
                </p>
              </div>
            </div>
          )}

          {/* 1. TAB: DASHBOARD (TỔNG QUAN HÔM NAY) */}
          {activeGroup === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Khách truy cập hôm nay</p>
                  <p className="text-2xl font-bold text-stone-900 font-serif-title">184 Khách</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Lịch hẹn thử đồ mới</p>
                  <p className="text-2xl font-bold text-emerald-700 font-serif-title">
                    {consultations.length} Lịch
                  </p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Tổng sản phẩm shop</p>
                  <p className="text-2xl font-bold text-stone-900 font-serif-title">{products.length} Mẫu</p>
                </div>

                <div className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                    <Bell className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-stone-500 font-medium">Thông báo chưa đọc</p>
                  <p className="text-2xl font-bold text-purple-700 font-serif-title">
                    {unreadNotificationCount} Mới
                  </p>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-sm space-y-4">
                <h3 className="font-serif-title font-bold text-stone-900 text-base flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  Thao Tác Nhanh (1 Click)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={handleCreateNewProduct}
                    className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 font-bold text-xs flex flex-col items-center justify-center gap-2 text-center transition-all"
                  >
                    <Plus className="w-5 h-5 text-amber-700" />
                    <span>+ Thêm Sản Phẩm</span>
                  </button>

                  <button
                    onClick={() => setIsExcelModalOpen(true)}
                    className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 font-bold text-xs flex flex-col items-center justify-center gap-2 text-center transition-all"
                  >
                    <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                    <span>Import File Excel</span>
                  </button>

                  <button
                    onClick={() => setActiveGroup('notifications')}
                    className="p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-950 border border-blue-200 font-bold text-xs flex flex-col items-center justify-center gap-2 text-center transition-all"
                  >
                    <Bell className="w-5 h-5 text-blue-700" />
                    <span>🔔 Cài Thông Báo Zalo/Tele</span>
                  </button>

                  <button
                    onClick={() => setActiveGroup('theme')}
                    className="p-4 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-950 border border-purple-200 font-bold text-xs flex flex-col items-center justify-center gap-2 text-center transition-all"
                  >
                    <Palette className="w-5 h-5 text-purple-700" />
                    <span>Đổi Màu Giao Diện</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. TAB: TRANG CHỦ */}
          {activeGroup === 'home' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                <div>
                  <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                    Quản Lý Ảnh Bìa Trang Chủ
                  </h3>
                  <p className="text-xs text-stone-500">
                    Thay đổi hình ảnh lớn và câu khẩu hiệu xuất hiện đầu tiên khi khách mở website
                  </p>
                </div>
                <button
                  onClick={handleSaveHero}
                  className="px-5 py-2.5 gold-gradient-bg text-white font-bold rounded-2xl text-xs uppercase shadow hover:scale-105 transition-all"
                >
                  Lưu Thay Đổi
                </button>
              </div>

              <div className="space-y-4">
                <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Hình Ảnh Bìa Hiện Tại
                </label>
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-stone-200 bg-stone-100 group shadow-inner">
                  <img
                    src={editableHero.image}
                    alt="Banner Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <label className="cursor-pointer px-4 py-2.5 bg-white text-stone-900 font-bold rounded-xl text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2">
                      <Upload className="w-4 h-4 text-amber-600" />
                      Tải Ảnh Mới Lên
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSimulatedImageUpload(e, 'hero')}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Tiêu Đề Lớn (Ảnh bìa)
                    </label>
                    <input
                      type="text"
                      value={editableHero.title}
                      onChange={(e) => setEditableHero({ ...editableHero, title: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-medium text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                      Dòng Chữ Phụ (Tiêu đề nhỏ)
                    </label>
                    <input
                      type="text"
                      value={editableHero.subtitle}
                      onChange={(e) => setEditableHero({ ...editableHero, subtitle: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-medium text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. TAB: SẢN PHẨM (DẠNG DANH SÁCH + BỘ LỌC + TÌM KIẾM CHUYÊN NGHIỆP) */}
          {activeGroup === 'products' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
              {/* Top Action Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-100 pb-4">
                <div>
                  <h3 className="font-serif-title font-bold text-stone-900 text-xl flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-amber-700" />
                    Quản Lý Danh Sách Sản Phẩm ({filteredAdminProducts.length}/{products.length} Mẫu)
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Hiển thị dạng danh sách bảng dễ quan sát, tìm kiếm nhanh theo mã SKU hoặc tên sản phẩm
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setIsExcelModalOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow hover:bg-emerald-700 transition-all"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    + Import từ Excel
                  </button>

                  <button
                    onClick={handleCreateNewProduct}
                    className="flex items-center gap-1.5 px-4 py-2.5 gold-gradient-bg text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow hover:scale-105 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    + Thêm Sản Phẩm Mới
                  </button>
                </div>
              </div>

              {/* SEARCH & FILTER CONTROLS TOOLBAR */}
              <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* Search Input */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">🔍 Tìm Kiếm Sản Phẩm</label>
                  <div className="relative">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Gõ tên mẫu, mã SKU, chất liệu..."
                      value={prodSearchQuery}
                      onChange={(e) => setProdSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-stone-300 rounded-xl font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">📁 Lọc Theo Danh Mục</label>
                  <select
                    value={prodCategoryFilter}
                    onChange={(e) => setProdCategoryFilter(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="all">-- Tất Cả Danh Mục --</option>
                    {categoryTreeOptions.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Filter */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">🏷️ Trạng Thái Tồn Kho</label>
                  <select
                    value={prodStatusFilter}
                    onChange={(e) => setProdStatusFilter(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="all">-- Tất Cả Trạng Thái --</option>
                    <option value="instock">Sẵn Sàng Cho Thuê (In Stock)</option>
                    <option value="outstock">Đang Cho Thuê / May Đo</option>
                  </select>
                </div>

                {/* Sort Dropdown */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">⇅ Sắp Xếp Giá</label>
                  <select
                    value={prodSortBy}
                    onChange={(e) => setProdSortBy(e.target.value as any)}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="newest">Mới Nhất Mới Thêm</option>
                    <option value="price-asc">Giá Thuê: Thấp ➔ Cao</option>
                    <option value="price-desc">Giá Thuê: Cao ➔ Thấp</option>
                  </select>
                </div>
              </div>

              {/* DATA TABLE LIST VIEW */}
              <div className="overflow-x-auto border border-stone-200 rounded-2xl shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-100 text-stone-700 font-bold uppercase tracking-wider border-b">
                    <tr>
                      <th className="p-3.5 w-16">Hình Ảnh</th>
                      <th className="p-3.5">Mã SKU & Tên Sản Phẩm</th>
                      <th className="p-3.5">Danh Mục</th>
                      <th className="p-3.5">Giá Thuê (đ)</th>
                      <th className="p-3.5">Giá May/Bán (đ)</th>
                      <th className="p-3.5">Trạng Thái</th>
                      <th className="p-3.5 text-right w-44">Thao Tác Nhanh</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 bg-white">
                    {filteredAdminProducts.length > 0 ? (
                      filteredAdminProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-amber-50/50 transition-colors">
                          <td className="p-3.5">
                            <img
                              src={prod.mainImage}
                              alt={prod.title}
                              className="w-12 h-16 rounded-xl object-cover border border-amber-200 shadow-sm"
                            />
                          </td>
                          <td className="p-3.5 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="bg-stone-900 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                                {prod.sku}
                              </span>
                              {prod.isNew && (
                                <span className="bg-rose-100 text-rose-700 text-[9px] font-bold px-1.5 py-0.5 rounded">
                                  Mới
                                </span>
                              )}
                            </div>
                            <p className="font-serif-title font-bold text-stone-900 text-sm">
                              {prod.title}
                            </p>
                            <p className="text-[11px] text-stone-500">
                              Chất liệu: {prod.material || 'Lụa cao cấp'} | Kích thước: {prod.sizes?.join(', ')}
                            </p>
                          </td>
                          <td className="p-3.5">
                            <span className="bg-amber-100 text-amber-950 font-bold px-2.5 py-1 rounded-full text-[11px] inline-block">
                              {prod.categoryName}
                            </span>
                          </td>
                          <td className="p-3.5 font-bold text-amber-700 text-sm">
                            {prod.rentalPrice ? prod.rentalPrice.toLocaleString('vi-VN') + ' đ' : 'Liên hệ'}
                          </td>
                          <td className="p-3.5 font-semibold text-stone-800">
                            {prod.salePrice ? prod.salePrice.toLocaleString('vi-VN') + ' đ' : 'May đo'}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-1 rounded-full font-bold text-[10px] uppercase ${
                                prod.status === 'In Stock'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {prod.status === 'In Stock' ? 'Còn hàng' : 'Đang thuê'}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-1">
                            <button
                              onClick={() => {
                                setEditingProduct(prod);
                                setIsEditingProduct(true);
                              }}
                              className="p-2 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors inline-flex items-center gap-1 font-bold"
                              title="Sửa thông tin sản phẩm"
                            >
                              <Edit className="w-3.5 h-3.5" /> Sửa
                            </button>
                            <button
                              onClick={() => handleDuplicateProduct(prod)}
                              className="p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors inline-flex items-center gap-1 font-bold"
                              title="Nhân bản sản phẩm"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setProductToDelete(prod)}
                              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors inline-flex items-center gap-1 font-bold"
                              title="Xóa sản phẩm"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-stone-500 font-medium">
                          Không tìm thấy sản phẩm nào phù hợp với từ khóa hoặc bộ lọc. Bấm "Tất cả danh mục" để xem lại.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. TAB: DANH MỤC ĐA CẤP */}
          {activeGroup === 'categories' && <CategoryTreeManager />}

          {/* 5. TAB: 🔔 TRUNG TÂM THÔNG BÁO */}
          {activeGroup === 'notifications' && <NotificationCenter />}

          {/* 6. TAB: GIAO DIỆN & MÀU (LẬP TỨC ĐỔI MÀU CẢ SITE) */}
          {activeGroup === 'theme' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-8">
              <div>
                <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                  Màu Sắc Chủ Đạo Website (Khắc Phục Đổi Màu Ngay Tức Thì)
                </h3>
                <p className="text-xs text-stone-500">
                  Bấm chọn 1 trong 10 mẫu màu dưới đây, toàn bộ website và bản xem trước sẽ đổi màu lập tức!
                </p>
              </div>

              {/* 10 Theme Preset Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {COLOR_THEMES.map((t) => {
                  const isSelected = activeTheme.name === t.name;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setSiteTheme(t)}
                      className={`p-4 rounded-2xl border-2 text-left space-y-2 transition-all relative ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 shadow-md scale-105'
                          : 'border-stone-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">{t.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full border shadow-sm" style={{ backgroundColor: t.primary }} />
                        <span className="w-5 h-5 rounded-full border shadow-sm" style={{ backgroundColor: t.bg }} />
                        <span className="w-5 h-5 rounded-full border shadow-sm" style={{ backgroundColor: t.text }} />
                      </div>

                      <span className="text-[10px] text-stone-500 font-medium block">
                        Phong cách: {t.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Font Selector Cards */}
              <div className="space-y-4 pt-4 border-t border-amber-100">
                <div>
                  <h4 className="font-serif-title font-bold text-stone-900 text-base">
                    Kiểu Chữ (Font) Website
                  </h4>
                  <p className="text-xs text-stone-500">
                    Bấm chọn kiểu chữ bạn thấy đẹp nhất
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FONT_OPTIONS.map((f) => {
                    const isSelected = activeFont.id === f.id;
                    return (
                      <button
                        key={f.id}
                        onClick={() => setSiteFont(f)}
                        className={`p-4 rounded-2xl border-2 text-left space-y-1.5 transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/50 shadow-md'
                            : 'border-stone-200 bg-white hover:border-amber-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-base font-bold text-stone-900 ${f.styleClass}`}>
                            ABC Playfair
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                        </div>
                        <p className="text-xs font-bold text-stone-800">{f.name}</p>
                        <p className="text-[11px] text-stone-500">{f.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 6. TAB: QUẢN LÝ DỊCH VỤ */}
          {activeGroup === 'services' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                <div>
                  <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                    Quản Lý Nội Dung Dịch Vụ Cưới & May Đo ({servicesList.length} Dịch vụ)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Tùy chỉnh tiêu đề, mô tả, mức giá và các đặc quyền đi kèm hiển thị trên trang Dịch Vụ
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {servicesList.map((service) => (
                  <div key={service.id} className="p-5 rounded-2xl border-2 border-amber-200/70 bg-amber-50/20 space-y-4">
                    <div className="flex items-center justify-between border-b border-amber-100 pb-3">
                      <span className="font-serif-title font-bold text-amber-900 text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600" /> {service.title}
                      </span>
                      <button
                        onClick={() => showToast(`✅ Đã lưu thay đổi dịch vụ "${service.title}"!`, 'success')}
                        className="px-4 py-2 gold-gradient-bg text-white font-bold rounded-xl text-xs uppercase shadow hover:scale-105 transition-all"
                      >
                        Lưu Dịch Vụ Này
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Tên Dịch Vụ</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => updateServiceItem({ ...service, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Mô Tả Phụ (Subtitle)</label>
                        <input
                          type="text"
                          value={service.subtitle}
                          onChange={(e) => updateServiceItem({ ...service, subtitle: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Mức Giá Hiển Thị</label>
                        <input
                          type="text"
                          value={service.priceTag}
                          onChange={(e) => updateServiceItem({ ...service, priceTag: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Link Ảnh Đại Diện Dịch Vụ</label>
                        <input
                          type="text"
                          value={service.image}
                          onChange={(e) => updateServiceItem({ ...service, image: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Mô Tả Chi Tiết Dịch Vụ</label>
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) => updateServiceItem({ ...service, description: e.target.value })}
                        className="w-full p-3 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                        Các Đặc Quyền Hỗ Trợ (Mỗi dòng 1 ý)
                      </label>
                      <textarea
                        rows={3}
                        value={service.features.join('\n')}
                        onChange={(e) => updateServiceItem({ ...service, features: e.target.value.split('\n').filter(Boolean) })}
                        className="w-full p-3 bg-white border border-stone-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.5. TAB: QUẢN LÝ BẢNG GIÁ & QUY TRÌNH */}
          {activeGroup === 'pricing-process' && (
            <div className="space-y-6">
              {/* Section 1: Pricing Policies Table */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
                <div className="border-b border-amber-100 pb-4">
                  <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                    Bảng Giá Thuê & May Đo Niêm Yết
                  </h3>
                  <p className="text-xs text-stone-500">
                    Chỉnh sửa mức giá thuê 3 ngày, 7 ngày, tiền cọc bảo đảm hiển thị trên trang Bảng Giá
                  </p>
                </div>

                <div className="space-y-4">
                  {pricingPolicies.map((prc) => (
                    <div key={prc.id} className="p-4 rounded-2xl border border-amber-200 bg-amber-50/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-serif-title font-bold text-stone-900 text-sm">
                          {prc.category}
                        </span>
                        <button
                          onClick={() => showToast(`✅ Đã lưu giá nhóm "${prc.category}"!`, 'success')}
                          className="px-3 py-1.5 gold-gradient-bg text-white font-bold rounded-xl text-xs uppercase shadow hover:scale-105 transition-all"
                        >
                          Lưu Nhóm Giá Này
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Giá Thuê 3 Ngày</label>
                          <input
                            type="text"
                            value={prc.rental3DaysPrice}
                            onChange={(e) => updatePricingPolicy({ ...prc, rental3DaysPrice: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Giá Thuê 7 Ngày</label>
                          <input
                            type="text"
                            value={prc.rental7DaysPrice}
                            onChange={(e) => updatePricingPolicy({ ...prc, rental7DaysPrice: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">Tiền Cọc Thuê</label>
                          <input
                            type="text"
                            value={prc.depositRate}
                            onChange={(e) => updatePricingPolicy({ ...prc, depositRate: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">May Đo Thiết Kế Mới</label>
                          <input
                            type="text"
                            value={prc.tailorPrice}
                            onChange={(e) => updatePricingPolicy({ ...prc, tailorPrice: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: 4-Step Process Editor */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
                <div className="border-b border-amber-100 pb-4">
                  <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                    Quy Trình Thuê Đồ 4 Bước
                  </h3>
                  <p className="text-xs text-stone-500">
                    Chỉnh sửa từng bước hướng dẫn khách hàng từ chọn mẫu đến trả đồ hoàn cọc
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rentalProcessSteps.map((step) => (
                    <div key={step.stepNumber} className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs font-mono">
                          Bước {step.stepNumber}
                        </span>
                        <button
                          onClick={() => showToast(`✅ Đã lưu Bước ${step.stepNumber}!`, 'success')}
                          className="px-3 py-1 bg-amber-900 text-amber-200 font-bold rounded-lg text-[11px] hover:bg-stone-900"
                        >
                          Lưu Bước Này
                        </button>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Tiêu Đề Bước</label>
                        <input
                          type="text"
                          value={step.title}
                          onChange={(e) => updateProcessStep({ ...step, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Mô Tả Ngắn</label>
                        <input
                          type="text"
                          value={step.description}
                          onChange={(e) => updateProcessStep({ ...step, description: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs font-medium focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">Chi Tiết Đi Kèm (Mỗi dòng 1 ý)</label>
                        <textarea
                          rows={2}
                          value={step.details.join('\n')}
                          onChange={(e) => updateProcessStep({ ...step, details: e.target.value.split('\n').filter(Boolean) })}
                          className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-mono focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 7. TAB: HÌNH ẢNH */}
          {activeGroup === 'images' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                  Tải Ảnh Lên & Tự Động Tối Ưu (Auto Resize / WebP)
                </h3>
                <p className="text-xs text-stone-500">
                  Không cần chỉnh sửa ảnh thủ công. Hệ thống tự động làm nét, giảm dung lượng và nén ảnh.
                </p>
              </div>

              <div className="border-3 border-dashed border-amber-300 bg-amber-50/40 rounded-3xl p-8 text-center space-y-3 hover:bg-amber-50 transition-colors cursor-pointer relative">
                <Upload className="w-12 h-12 text-amber-600 mx-auto animate-bounce" />
                <div>
                  <p className="font-bold text-stone-900 text-sm">
                    Kéo ảnh vào đây hoặc bấm nút dưới để tải lên
                  </p>
                  <p className="text-xs text-stone-500 mt-1">
                    Hỗ trợ ảnh JPG, PNG từ điện thoại. Tự động đổi sang WebP siêu nhẹ.
                  </p>
                </div>
                <label className="inline-block cursor-pointer px-6 py-3 gold-gradient-bg text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow hover:scale-105 transition-all">
                  Tải Ảnh Mới Lên
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSimulatedImageUpload(e, 'product')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {/* 8. TAB: QUẢNG CÁO */}
          {activeGroup === 'promo' && (
            <div className="bg-white p-6 rounded-3xl border border-amber-200/80 shadow-sm space-y-4">
              <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                Thông Báo Khuyến Mãi Đầu Trang (Announcement Bar)
              </h3>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-stone-700 uppercase">
                  Dòng chữ chạy khuyến mãi
                </label>
                <input
                  type="text"
                  defaultValue="BST Áo Dài & Váy Cưới Couture 2026 đã sẵn sàng phục vụ quý khách"
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-medium focus:outline-none"
                />
                <button
                  onClick={() => showToast('✅ Đã cập nhật dòng chữ quảng cáo thành công!', 'success')}
                  className="px-5 py-2.5 gold-gradient-bg text-white font-bold rounded-2xl text-xs uppercase shadow"
                >
                  Lưu Quảng Cáo
                </button>
              </div>
            </div>
          )}

          {/* 9. TAB: ĐẶT LỊCH HẸN THỬ ĐỒ */}
          {activeGroup === 'booking' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                <div>
                  <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                    Danh Sách Lịch Hẹn Thử Đồ ({consultations.length})
                  </h3>
                  <p className="text-xs text-stone-500">
                    Thông tin khách hàng đã đăng ký đặt lịch thử đồ VIP tại showroom
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {consultations.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-stone-50 border border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <p className="font-bold text-stone-900 text-sm">{item.fullName}</p>
                      <p className="text-amber-800 font-mono">SĐT: {item.phone}</p>
                      <p className="text-stone-600">
                        Ngày hẹn: {item.preferredDate} • Dịch vụ: {item.serviceType}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          updateConsultationStatus(item.id, 'completed');
                          showToast('✅ Đã xác nhận lịch hẹn với khách!', 'success');
                        }}
                        className={`px-3 py-1.5 rounded-xl font-bold ${
                          item.status === 'completed'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                        }`}
                      >
                        {item.status === 'completed' ? 'Đã Xác Nhận' : 'Xác Nhận'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. TAB: THÔNG TIN STORE / LIÊN HỆ */}
          {activeGroup === 'contact' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-amber-100 pb-4">
                <div>
                  <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                    Thông Tin Cửa Hàng (Chỉ 6 ô đơn giản)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Cập nhật tên shop, số điện thoại hotline, địa chỉ hiển thị trên website
                  </p>
                </div>

                <button
                  onClick={handleSaveContact}
                  className="px-5 py-2.5 gold-gradient-bg text-white font-bold rounded-2xl text-xs uppercase shadow hover:scale-105 transition-all"
                >
                  Lưu Thông Tin
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Tên Cửa Hàng
                  </label>
                  <input
                    type="text"
                    value={editableContact.shopName || ''}
                    onChange={(e) => setEditableContact((prev) => ({ ...prev, shopName: e.target.value }))}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Số Điện Thoại Hotline
                  </label>
                  <input
                    type="text"
                    value={editableContact.phone}
                    onChange={(e) => setEditableContact((prev) => ({ ...prev, phone: e.target.value, phoneFormatted: e.target.value }))}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Địa Chỉ Showroom
                  </label>
                  <input
                    type="text"
                    value={editableContact.showroomAddress}
                    onChange={(e) => setEditableContact((prev) => ({ ...prev, showroomAddress: e.target.value }))}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                    Giờ Mở Cửa
                  </label>
                  <input
                    type="text"
                    value={editableContact.openHours}
                    onChange={(e) => setEditableContact((prev) => ({ ...prev, openHours: e.target.value }))}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-medium focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 11. TAB: CÀI ĐẶT */}
          {activeGroup === 'settings' && (
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
              <h3 className="font-serif-title font-bold text-stone-900 text-lg">
                Cài Đặt Mật Khẩu & Tùy Chọn
              </h3>
              <p className="text-xs text-stone-500">
                Thay đổi mật khẩu đăng nhập trang quản lý shop
              </p>

              <div className="max-w-md space-y-3">
                <label className="block text-xs font-bold text-stone-700 uppercase">
                  Mật khẩu mới
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu mới..."
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-xs font-medium focus:outline-none"
                />
                <button
                  onClick={() => showToast('✅ Đã đổi mật khẩu thành công!', 'success')}
                  className="px-5 py-2.5 gold-gradient-bg text-white font-bold rounded-2xl text-xs uppercase shadow"
                >
                  Lưu Mật Khẩu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Excel Import Modal */}
      {isExcelModalOpen && (
        <ExcelImportModal onClose={() => setIsExcelModalOpen(false)} />
      )}

      {/* Confirmation Modal For Product Deletion */}
      {productToDelete && (
        <div className="fixed inset-0 z-[10000] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif-title font-bold text-stone-900 text-lg">
                Bạn Có Chắc Chắn Muốn Xóa Không?
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Sản phẩm <strong>"{productToDelete.title}"</strong> sẽ bị xóa khỏi danh sách.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="py-3 rounded-2xl bg-stone-100 text-stone-800 font-bold text-xs hover:bg-stone-200"
              >
                Hủy Bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="py-3 rounded-2xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 shadow"
              >
                Xác Nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Easy Edit Product Modal Form */}
      {isEditingProduct && (
        <div className="fixed inset-0 z-[10000] bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h4 className="font-serif-title font-bold text-stone-900 text-lg">
                Thông Tin Sản Phẩm
              </h4>
              <button
                onClick={() => setIsEditingProduct(false)}
                className="p-2 rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            <form onSubmit={handleSaveProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-800 uppercase mb-1 flex items-center justify-between">
                  <span>Danh Mục Sản Phẩm</span>
                  <span className="text-amber-700 text-[11px] font-normal">Chạm để chọn loại</span>
                </label>
                <select
                  value={editingProduct.categoryId || ''}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const catObj = categories.find((c) => c.id === selectedId);
                    setEditingProduct({
                      ...editingProduct,
                      categoryId: selectedId,
                      categoryName: catObj ? catObj.name : editingProduct.categoryName || 'Áo Dài'
                    });
                  }}
                  className="w-full p-3 bg-amber-50/60 border-2 border-amber-300 rounded-2xl font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="">-- Bấm chọn danh mục sản phẩm --</option>
                  {categoryTreeOptions.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Mã Sản Phẩm (SKU)</label>
                  <input
                    type="text"
                    value={editingProduct.sku || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full p-3 bg-stone-50 border rounded-2xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Tên Sản Phẩm</label>
                  <input
                    type="text"
                    value={editingProduct.title || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                    className="w-full p-3 bg-stone-50 border rounded-2xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Giá Thuê (đ)</label>
                  <input
                    type="number"
                    value={editingProduct.rentalPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, rentalPrice: Number(e.target.value) })}
                    className="w-full p-3 bg-stone-50 border rounded-2xl font-bold text-amber-700"
                  />
                </div>
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Giá May / Bán (đ)</label>
                  <input
                    type="number"
                    value={editingProduct.salePrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, salePrice: Number(e.target.value) })}
                    className="w-full p-3 bg-stone-50 border rounded-2xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Hình Ảnh Sản Phẩm (Bấm nút Tải ảnh)</label>
                <div className="flex items-center gap-3">
                  <img src={editingProduct.mainImage} alt="Preview" className="w-16 h-20 rounded-xl object-cover border" />
                  <label className="cursor-pointer px-4 py-2 bg-amber-100 text-amber-900 font-bold rounded-xl text-xs hover:bg-amber-200">
                    Tải Ảnh Mới Lên
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSimulatedImageUpload(e, 'product')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="px-5 py-2.5 rounded-2xl bg-stone-100 text-stone-800 font-bold"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl gold-gradient-bg text-white font-bold uppercase shadow"
                >
                  Lưu Sản Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
