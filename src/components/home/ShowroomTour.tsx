import React from 'react';
import { useApp } from '../../context/AppContext';
import { initialArticles } from '../../data/initialData';
import { Sparkles, MapPin, ArrowRight, Clock, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const ShowroomTour: React.FC = () => {
  const { contactConfig, openBookingModal, setActiveTab } = useApp();

  return (
    <section className="py-24 bg-white space-y-24">
      {/* 1. Showroom Space Experience */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <img
                src="https://images.pexels.com/photos/36478467/pexels-photo-36478467.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800"
                alt="Showroom Couture Interior"
                className="w-full h-80 object-cover rounded-3xl shadow-2xl border border-amber-200/50"
              />
              <div className="p-6 rounded-3xl bg-[#121212] text-white space-y-2 border border-amber-500/30">
                <span className="text-amber-400 text-xs font-mono font-bold">100% PRIVATE FITTING</span>
                <p className="font-serif-title text-lg font-bold">Phòng Thử Đồ VIP Riêng Tư</p>
                <p className="text-xs text-stone-300 font-light">
                  Phục vụ trà hoa, champagne và không gian soi gương 360 độ góc rộng sang trọng.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 pt-8"
            >
              <div className="p-6 rounded-3xl bg-amber-100/70 border border-amber-300/80 text-amber-950 space-y-2">
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500" />
                </div>
                <p className="font-serif-title text-2xl font-bold">5.0 / 5.0 Rating</p>
                <p className="text-xs font-light">
                  Hơn 5.000 đánh giá xuất sắc từ cô dâu & quý ông thượng lưu toàn quốc.
                </p>
              </div>
              <img
                src="https://images.pexels.com/photos/8459374/pexels-photo-8459374.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800"
                alt="Bridal Rack Collection"
                className="w-full h-80 object-cover rounded-3xl shadow-2xl border border-amber-200/50"
              />
            </motion.div>
          </div>

          {/* Right Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Trải Nghiệm Showroom Thượng Lưu
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#111111] leading-tight">
              Không Gian Thử Đồ Sang Trọng & Đẳng Cấp 5 Sao
            </h2>
            <div className="w-20 h-0.5 bg-[#D4AF37] rounded-full" />
            <p className="text-sm font-serif-sub text-stone-600 font-light leading-relaxed">
              Hãy đến và cảm nhận sự tỉ mỉ trong từng đường kim mũi chỉ, tận hưởng khoảnh khắc thử đồ riêng tư thư thái cùng những ly trà hoa thơm lừng và sự chăm sóc chu đáo nhất từ đội ngũ stylist.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 text-xs text-stone-800">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">{contactConfig.showroomAddress}</p>
                  <p className="text-stone-500">Khu vực Tràng Tiền - Hoàn Kiếm, trung tâm Hà Nội</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-stone-800">
                <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900">{contactConfig.showroomBranch2}</p>
                  <p className="text-stone-500">Đại lộ Đồng Khởi - Quận 1, trung tâm TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-amber-900 font-medium">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <span>Giờ mở cửa: {contactConfig.openHours}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 gold-gradient-bg text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xl hover:scale-105 transition-all"
              >
                <span>Đặt Lịch Ghé Showroom</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={contactConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-amber-400 text-amber-900 px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-amber-100 transition-colors"
              >
                <MapPin className="w-4 h-4" /> Chỉ Đường Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Editorial Lookbook & Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Tin Tức & Editorial Cưới
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#111111]">
            Góc Nhìn Cùng Chuyên Gia Thời Trang
          </h2>
          <p className="text-xs font-serif-sub text-stone-600 font-light text-base">
            Cập nhật xu hướng áo dài cưới, váy cưới & bí quyết phối đồ cưới thời thượng nhất năm 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => setActiveTab('about')}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl border border-amber-200/50 hover:border-amber-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-60 overflow-hidden bg-stone-900">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 text-amber-300 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md">
                    {article.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-400 font-mono">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="font-serif-title text-lg font-bold text-stone-900 group-hover:text-[#B8860B] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-500 font-light line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-800">
                  <span>Tác giả: {article.author}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
