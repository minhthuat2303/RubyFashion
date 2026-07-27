import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Calendar, CheckCircle2, Phone } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { openBookingModal, contactConfig, servicesList } = useApp();

  return (
    <div className="py-12 bg-white space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Hệ Thống Dịch Vụ Cưới Trọn Gói
        </span>
        <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#111111]">
          Dịch Vụ Cưới & May Đo Đẳng Cấp
        </h1>
        <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto rounded-full" />
        <p className="text-xs sm:text-sm font-serif-sub text-stone-600 font-light text-base">
          Trải nghiệm dịch vụ chuyên nghiệp từ khâu tư vấn, chọn phục trang, may đo đến trải nghiệm tiệc cưới hoàn hảo.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-3xl overflow-hidden border border-amber-200/60 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
          >
            <div>
              {/* Image & Price */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-amber-500 text-stone-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg font-serif-title">
                  {service.priceTag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-serif-title text-xl font-bold text-stone-900 group-hover:text-amber-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-amber-800 font-serif-sub font-semibold mt-1">
                    {service.subtitle}
                  </p>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-2 pt-2 border-t border-amber-100">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-6 pt-0">
              <button
                onClick={() => openBookingModal()}
                className="w-full py-3 rounded-2xl bg-amber-100/80 text-amber-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-500 hover:text-stone-950 transition-all shadow flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-700" />
                Đăng Ký Tư Vấn Dịch Vụ
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden border border-amber-500/30">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold">
              Tư Vấn Thiết Kế Độc Bản
            </span>
            <h2 className="font-serif-title text-2xl sm:text-4xl font-bold">
              Bạn Cần Tư Vấn Gói Dịch Vụ Theo Nhu Cầu Cá Nhân?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Hãy đặt lịch hẹn ghé thăm phòng thử VIP để được cố vấn hình ảnh trực tiếp thiết kế bộ phục trang cưới trong mơ dành riêng cho bạn.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button
              onClick={() => openBookingModal()}
              className="w-full sm:w-auto px-8 py-3.5 gold-gradient-bg text-stone-950 font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Đặt Lịch Hẹn Thử Đồ VIP
            </button>
            <a
              href={`tel:${contactConfig.phone}`}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 text-white border border-white/20 font-bold rounded-2xl text-xs uppercase tracking-wider hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Hotline: {contactConfig.phoneFormatted}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
