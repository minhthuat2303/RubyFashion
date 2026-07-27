import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategorySection } from '../components/home/CategorySection';
import { MasonryGrid } from '../components/home/MasonryGrid';
import { TailoringShowcase } from '../components/home/TailoringShowcase';
import { ShowroomTour } from '../components/home/ShowroomTour';
import { useApp } from '../context/AppContext';
import { Quote, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const HomePage: React.FC = () => {
  const { openBookingModal } = useApp();

  const testimonials = [
    {
      id: 1,
      name: 'Diễn viên / MC Mai Phương',
      role: 'Cô dâu Lễ cưới GEM Center 2026',
      avatar: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
      comment: 'Áo dài lụa tơ tằm thêu Phượng Hoàng của Maison De Soie thực sự làm lễ đám hỏi của mình trở nên thiêng liêng và lộng lẫy vô cùng. Phom dáng may siết eo đỉnh cao, tôn dáng tuyệt đối!'
    },
    {
      id: 2,
      name: 'Doanh nhân Minh Trí & Khánh Linh',
      role: 'Cặp đôi Lễ cưới Khách sạn JW Marriott',
      avatar: 'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
      comment: 'Bộ Vest chú rể Tuxedo và Váy cưới Celestial Princess quá lộng lẫy dưới ánh đèn sân khấu. Dịch vụ chỉnh sửa phom dáng tận tình, giặt hấp thơm tho như mới!'
    },
    {
      id: 3,
      name: 'Ca sĩ Thu Trang',
      role: 'Khách hàng may đo Áo dài sự kiện',
      avatar: 'https://images.pexels.com/photos/31157326/pexels-photo-31157326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=200&w=200',
      comment: 'Maison De Soie luôn là lựa chọn số 1 của mình mỗi khi tham dự các sự kiện thảm đỏ lớn. Từng đường kim mũi chỉ đều toát lên đẳng cấp thời trang Pháp pha lẫn nét đẹp Việt.'
    }
  ];

  return (
    <div className="space-y-0">
      {/* 1. Fullscreen Hero Banner */}
      <HeroBanner />

      {/* 2. Category Section */}
      <CategorySection />

      {/* 3. Featured Collection Masonry Grid */}
      <MasonryGrid />

      {/* 4. Custom Tailoring & Fitting Showcase */}
      <TailoringShowcase />

      {/* 5. Client Testimonials */}
      <section className="py-20 bg-white border-b border-amber-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
              Câu Chuyện Khách Hàng VIP
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#111111]">
              Cảm Nhận Từ Những Cô Dâu & Quý Ông
            </h2>
            <div className="w-20 h-0.5 bg-[#D4AF37] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-3xl bg-white border border-amber-200/60 shadow-xl space-y-6 flex flex-col justify-between relative group hover:border-amber-400 transition-colors"
              >
                <Quote className="w-10 h-10 text-amber-300 opacity-60 absolute top-6 right-6" />

                <div className="space-y-4 relative z-10">
                  <p className="text-xs text-stone-700 font-serif-sub italic text-base leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-amber-200/50">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <div className="text-xs">
                    <p className="font-serif-title font-bold text-stone-900">{item.name}</p>
                    <p className="text-amber-800 font-medium text-[11px]">{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Showroom Tour & Editorial */}
      <ShowroomTour />

      {/* 7. Call To Action VIP Strip */}
      <section className="py-16 bg-[#121212] text-white border-t border-amber-500/20">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="inline-flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-[0.3em]">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Lịch Hẹn Riêng Tư Tại Maison De Soie
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold">
            Sẵn Sàng Cho Khoảnh Khắc Lộng Lẫy Nhất Của Bạn?
          </h2>
          <p className="text-sm font-serif-sub text-stone-300 font-light max-w-xl mx-auto text-base">
            Liên hệ ngay hôm nay để đặt lịch thử đồ miễn phí cùng chuyên viên tạo mẫu thời trang cưới hàng đầu.
          </p>
          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => openBookingModal()}
              className="gold-gradient-bg text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform gold-border-glow"
            >
              Đặt Lịch Tư Vấn ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
