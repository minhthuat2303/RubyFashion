import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  ContactConfig,
  HeroSlide,
  ConsultationInquiry,
  ActiveTab,
  CustomServiceItem,
  RentalProcessStep,
  PricingPolicyItem
} from '../types';
import { SystemNotification } from '../types/notification';
import {
  initialProducts,
  initialCategories,
  initialContactConfig,
  initialHeroSlides,
  initialConsultations,
  initialServicesList,
  initialRentalProcessSteps,
  initialPricingPolicies
} from '../data/initialData';
import { playNotificationSound } from '../services/notificationService';

interface ToastState {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface ColorThemeConfig {
  name: string;
  primary: string;
  bg: string;
  text: string;
}

export interface FontConfig {
  id: string;
  name: string;
}

interface AppContextType {
  products: Product[];
  categories: Category[];
  contactConfig: ContactConfig;
  heroSlides: HeroSlide[];
  consultations: ConsultationInquiry[];
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (catSlug: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Theme & Font
  activeTheme: ColorThemeConfig;
  setSiteTheme: (theme: ColorThemeConfig) => void;
  activeFont: FontConfig;
  setSiteFont: (font: FontConfig) => void;

  // Realtime System Notifications for Bell Badge
  systemNotifications: SystemNotification[];
  unreadNotificationCount: number;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Modals & Triggers
  selectedProduct: Product | null;
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  
  isBookingModalOpen: boolean;
  bookingProductSku: string | null;
  openBookingModal: (productSku?: string) => void;
  closeBookingModal: () => void;
  
  isQuickContactOpen: boolean;
  quickContactSku: string | null;
  openQuickContactModal: (productSku?: string) => void;
  closeQuickContactModal: () => void;
  
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  
  isSEOModalOpen: boolean;
  setIsSEOModalOpen: (open: boolean) => void;

  // Admin state & functions
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;

  // Custom Management Content
  servicesList: CustomServiceItem[];
  updateServiceItem: (item: CustomServiceItem) => void;
  rentalProcessSteps: RentalProcessStep[];
  updateProcessStep: (step: RentalProcessStep) => void;
  pricingPolicies: PricingPolicyItem[];
  updatePricingPolicy: (policy: PricingPolicyItem) => void;

  // CRUD Actions
  updateContactConfig: (config: ContactConfig) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addConsultation: (inquiry: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateConsultationStatus: (id: string, status: ConsultationInquiry['status']) => void;
  updateHeroSlide: (slide: HeroSlide) => void;

  // Toast
  toasts: ToastState[];
  showToast: (message: string, type?: ToastState['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from LocalStorage if exists and auto-merge any new defaults
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mds_products');
    if (saved) {
      const parsed: Product[] = JSON.parse(saved);
      const missingInitial = initialProducts.filter((initP) => !parsed.some((p) => p.id === initP.id));
      if (missingInitial.length > 0) {
        const merged = [...parsed, ...missingInitial];
        localStorage.setItem('mds_products', JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
    return initialProducts;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('mds_categories');
    if (saved) {
      const parsed: Category[] = JSON.parse(saved);
      const missingInitial = initialCategories.filter(
        (initCat) => !parsed.some((c) => c.id === initCat.id || c.name === initCat.name)
      );
      if (missingInitial.length > 0) {
        const merged = [...parsed, ...missingInitial];
        localStorage.setItem('mds_categories', JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
    return initialCategories;
  });

  const [contactConfig, setContactConfig] = useState<ContactConfig>(() => {
    const saved = localStorage.getItem('mds_contact_config');
    return saved ? JSON.parse(saved) : initialContactConfig;
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('mds_hero_slides');
    return saved ? JSON.parse(saved) : initialHeroSlides;
  });

  const [consultations, setConsultations] = useState<ConsultationInquiry[]>(() => {
    const saved = localStorage.getItem('mds_consultations');
    return saved ? JSON.parse(saved) : initialConsultations;
  });

  // Dynamic Theme & Font State
  const [activeTheme, setActiveTheme] = useState<ColorThemeConfig>(() => {
    const saved = localStorage.getItem('mds_active_theme');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.bg === '#FAF8F5' || parsed.bg === '#FAF7F2' || parsed.bg === '#FDFBF7') {
        parsed.bg = '#FFFFFF';
      }
      return parsed;
    }
    return { name: 'Pure White Luxury', primary: '#B8860B', bg: '#FFFFFF', text: '#111111' };
  });

  const [activeFont, setActiveFont] = useState<FontConfig>(() => {
    const saved = localStorage.getItem('mds_active_font');
    return saved ? JSON.parse(saved) : { id: 'Playfair Display', name: 'Playfair Display' };
  });

  // System Realtime Notifications (for Bell Badge)
  const [systemNotifications, setSystemNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem('mds_notifications');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'notif-1',
            title: '🔔 Đặt Lịch Thử Đồ VIP',
            message: 'Khách Nguyễn Văn A vừa đặt lịch thử Áo Dài Couture lúc 10:15',
            customerName: 'Nguyễn Văn A',
            phone: '0988888888',
            timestamp: '10:15 - Hôm nay',
            read: false,
            type: 'booking_fitting'
          },
          {
            id: 'notif-2',
            title: '📩 Yêu Cầu Tư Vấn Mới',
            message: 'Khách Lê Hoàng Yến muốn thuê Váy Cưới Luxury',
            customerName: 'Lê Hoàng Yến',
            phone: '0912345678',
            timestamp: '09:45 - Hôm nay',
            read: false,
            type: 'contact_form'
          },
          {
            id: 'notif-3',
            title: '🛍️ Đặt Thuê Trang Phục',
            message: 'Khách Trần Minh Tuấn gửi yêu cầu thuê Vest Chú Rể',
            customerName: 'Trần Minh Tuấn',
            phone: '0933445566',
            timestamp: '08:30 - Hôm nay',
            read: false,
            type: 'rental_request'
          }
        ];
    });

  // Custom Management Content States
  const [servicesList, setServicesList] = useState<CustomServiceItem[]>(() => {
    const saved = localStorage.getItem('mds_services_list');
    return saved ? JSON.parse(saved) : initialServicesList;
  });

  const [rentalProcessSteps, setRentalProcessSteps] = useState<RentalProcessStep[]>(() => {
    const saved = localStorage.getItem('mds_process_steps');
    return saved ? JSON.parse(saved) : initialRentalProcessSteps;
  });

  const [pricingPolicies, setPricingPolicies] = useState<PricingPolicyItem[]>(() => {
    const saved = localStorage.getItem('mds_pricing_policies');
    return saved ? JSON.parse(saved) : initialPricingPolicies;
  });

  // URL & Tab Routing logic (Supports /quantri, /admin, #quantri)
  const getInitialTab = (): ActiveTab => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (path === '/quantri' || path === '/admin' || hash === '#quantri' || hash === '#admin') {
      return 'admin';
    }
    if (path === '/san-pham' || hash === '#collection') return 'collection';
    if (path === '/dich-vu' || hash === '#services') return 'services';
    if (path === '/bang-gia' || hash === '#rental-guide') return 'rental-guide';
    if (path === '/lien-he' || hash === '#contact') return 'contact';
    if (path === '/gioi-thieu' || hash === '#about') return 'about';
    return 'home';
  };

  const [activeTabState, setActiveTabState] = useState<ActiveTab>(getInitialTab);

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    let targetUrl = '/';
    if (tab === 'admin') targetUrl = '/quantri';
    else if (tab === 'collection') targetUrl = '/san-pham';
    else if (tab === 'services') targetUrl = '/dich-vu';
    else if (tab === 'rental-guide') targetUrl = '/bang-gia';
    else if (tab === 'contact') targetUrl = '/lien-he';
    else if (tab === 'about') targetUrl = '/gioi-thieu';

    try {
      window.history.pushState({ tab }, '', targetUrl);
    } catch (e) {
      console.log('PushState error', e);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/quantri' || path === '/admin' || hash === '#quantri' || hash === '#admin') {
        setActiveTabState('admin');
      } else if (path === '/san-pham') setActiveTabState('collection');
      else if (path === '/dich-vu') setActiveTabState('services');
      else if (path === '/bang-gia') setActiveTabState('rental-guide');
      else if (path === '/lien-he') setActiveTabState('contact');
      else if (path === '/gioi-thieu') setActiveTabState('about');
      else setActiveTabState('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingProductSku, setBookingProductSku] = useState<string | null>(null);
  const [isQuickContactOpen, setIsQuickContactOpen] = useState<boolean>(false);
  const [quickContactSku, setQuickContactSku] = useState<string | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [isSEOModalOpen, setIsSEOModalOpen] = useState<boolean>(false);

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('mds_admin_jwt') !== null;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Dynamically Apply Theme Colors & Font to Document Root
  useEffect(() => {
    if (activeTheme) {
      document.documentElement.style.setProperty('--color-primary', activeTheme.primary);
      document.documentElement.style.setProperty('--color-bg', activeTheme.bg);
      document.documentElement.style.setProperty('--color-text', activeTheme.text);
      localStorage.setItem('mds_active_theme', JSON.stringify(activeTheme));
    }
  }, [activeTheme]);

  useEffect(() => {
    if (activeFont) {
      const fontVal =
        activeFont.id === 'Playfair Display'
          ? "'Playfair Display', Georgia, serif"
          : activeFont.id === 'Poppins'
          ? "'Poppins', sans-serif"
          : "'Roboto', monospace";
      document.documentElement.style.setProperty('--font-site', fontVal);
      localStorage.setItem('mds_active_font', JSON.stringify(activeFont));
    }
  }, [activeFont]);

  // LocalStorage Persist
  useEffect(() => {
    localStorage.setItem('mds_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mds_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('mds_contact_config', JSON.stringify(contactConfig));
  }, [contactConfig]);

  useEffect(() => {
    localStorage.setItem('mds_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('mds_consultations', JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem('mds_notifications', JSON.stringify(systemNotifications));
  }, [systemNotifications]);

  useEffect(() => {
    localStorage.setItem('mds_services_list', JSON.stringify(servicesList));
  }, [servicesList]);

  useEffect(() => {
    localStorage.setItem('mds_process_steps', JSON.stringify(rentalProcessSteps));
  }, [rentalProcessSteps]);

  useEffect(() => {
    localStorage.setItem('mds_pricing_policies', JSON.stringify(pricingPolicies));
  }, [pricingPolicies]);

  const updateServiceItem = (updated: CustomServiceItem) => {
    setServicesList((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    showToast(`✅ Đã cập nhật nội dung dịch vụ "${updated.title}"!`, 'success');
  };

  const updateProcessStep = (updated: RentalProcessStep) => {
    setRentalProcessSteps((prev) => prev.map((s) => (s.stepNumber === updated.stepNumber ? updated : s)));
    showToast(`✅ Đã cập nhật Bước ${updated.stepNumber} trong quy trình!`, 'success');
  };

  const updatePricingPolicy = (updated: PricingPolicyItem) => {
    setPricingPolicies((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`✅ Đã cập nhật Bảng giá "${updated.category}"!`, 'success');
  };

  const showToast = (message: string, type: ToastState['type'] = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setSiteTheme = (theme: ColorThemeConfig) => {
    setActiveTheme(theme);
    showToast(`✅ Đã áp dụng mẫu màu "${theme.name}" trên toàn bộ website!`, 'success');
  };

  const setSiteFont = (font: FontConfig) => {
    setActiveFont(font);
    showToast(`✅ Đã đổi sang kiểu chữ "${font.name}" trên toàn hệ thống!`, 'success');
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const openBookingModal = (productSku?: string) => {
    if (productSku) {
      setBookingProductSku(productSku);
    } else {
      setBookingProductSku(null);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setBookingProductSku(null);
  };

  const openQuickContactModal = (productSku?: string) => {
    if (productSku) {
      setQuickContactSku(productSku);
    } else {
      setQuickContactSku(null);
    }
    setIsQuickContactOpen(true);
  };

  const closeQuickContactModal = () => {
    setIsQuickContactOpen(false);
    setQuickContactSku(null);
  };

  // Admin Login
  const loginAdmin = (password: string): boolean => {
    if (password === 'admin123' || password === 'admin' || password === 'maisondesOie') {
      const mockJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin_token_2026';
      localStorage.setItem('mds_admin_jwt', mockJwt);
      setIsAdminLoggedIn(true);
      showToast('Đăng nhập Quản trị viên thành công!', 'success');
      return true;
    } else {
      showToast('Mật khẩu Admin không đúng (Mật khẩu thử nghiệm: admin123)', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem('mds_admin_jwt');
    setIsAdminLoggedIn(false);
    showToast('Đã đăng xuất hệ thống Admin', 'info');
  };

  // CRUD Handlers
  const updateContactConfig = (config: ContactConfig) => {
    setContactConfig(config);
    showToast('Đã cập nhật toàn bộ thông tin liên hệ nền tảng!', 'success');
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    showToast(`Đã thêm sản phẩm mới "${product.title}"`, 'success');
  };

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    showToast(`Đã cập nhật sản phẩm "${product.title}"`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Đã xóa sản phẩm thành công', 'info');
  };

  const addCategory = (category: Category) => {
    setCategories((prev) => [category, ...prev]);
    showToast(`Đã thêm danh mục mới "${category.name}"`, 'success');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Đã xóa danh mục thành công', 'info');
  };

  // Realtime Trigger Notification whenever a user submits booking/consultation
  const addConsultation = (inquiryData: Omit<ConsultationInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: ConsultationInquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toLocaleString('vi-VN')
    };

    setConsultations((prev) => [newInquiry, ...prev]);

    // Push to System Notifications & Play Chime Sound!
    const newNotif: SystemNotification = {
      id: 'notif-' + Date.now(),
      title: '🔔 CÓ ĐẶT LỊCH / YÊU CẦU MỚI',
      message: `Khách ${inquiryData.fullName} (SĐT: ${inquiryData.phone}) vừa đặt dịch vụ ${inquiryData.serviceType}`,
      customerName: inquiryData.fullName,
      phone: inquiryData.phone,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      read: false,
      type: 'booking_fitting'
    };

    setSystemNotifications((prev) => [newNotif, ...prev]);

    // Play Sound Chime
    playNotificationSound();

    showToast('Gửi yêu cầu đặt lịch thành công! Chuyên viên Maison De Soie sẽ gọi lại trong 15 phút.', 'success');
  };

  const updateConsultationStatus = (id: string, status: ConsultationInquiry['status']) => {
    setConsultations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
    showToast('Đã cập nhật trạng thái yêu cầu', 'info');
  };

  const updateHeroSlide = (slide: HeroSlide) => {
    setHeroSlides((prev) => prev.map((s) => (s.id === slide.id ? slide : s)));
    showToast('Đã cập nhật Hero Slide', 'success');
  };

  const markAllNotificationsRead = () => {
    setSystemNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('✅ Đã đánh dấu tất cả thông báo là đã đọc', 'info');
  };

  const clearNotifications = () => {
    setSystemNotifications([]);
    showToast('✅ Đã xóa danh sách thông báo', 'info');
  };

  const unreadNotificationCount = systemNotifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        contactConfig,
        heroSlides,
        consultations,
        activeTab: activeTabState,
        setActiveTab,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        searchQuery,
        setSearchQuery,
        activeTheme,
        setSiteTheme,
        activeFont,
        setSiteFont,
        systemNotifications,
        unreadNotificationCount,
        markAllNotificationsRead,
        clearNotifications,
        selectedProduct,
        openProductModal,
        closeProductModal,
        isBookingModalOpen,
        bookingProductSku,
        openBookingModal,
        closeBookingModal,
        isQuickContactOpen,
        quickContactSku,
        openQuickContactModal,
        closeQuickContactModal,
        isSearchModalOpen,
        setIsSearchModalOpen,
        isSEOModalOpen,
        setIsSEOModalOpen,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        servicesList,
        updateServiceItem,
        rentalProcessSteps,
        updateProcessStep,
        pricingPolicies,
        updatePricingPolicy,
        updateContactConfig,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
        addConsultation,
        updateConsultationStatus,
        updateHeroSlide,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
