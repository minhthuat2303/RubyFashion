import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Scissors, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export const TailoringShowcase: React.FC = () => {
  const { openBookingModal } = useApp();

  const processSteps = [
    {
      num: '01',
      title: 'Tư Vấn & Lựa Chọn Mẫu',
      desc: 'Chuyên viên thời trang lắng nghe mong muốn, phân tích phom dáng và đề xuất thiết kế phù hợp nhất với thần thái cô dâu / chú rể.'
    },
    {
      num: '02',
      title: 'Đo Nhân Trắc Học 3D',
      desc: 'Đo đạc chính xác 28 chỉ số cơ thể, đảm bảo chiếc áo ôm trọn đường cong cơ thể một cách tự nhiên và thoải mái nhất.'
    },
    {
      num: '03',
      title: 'Thêu Tay & Đính Kết',
      desc: 'Hơn 100 giờ đính kết đá Swarovski, pha lê Tiệp Khắc và thêu lụa tơ tằm thủ công bởi các nghệ nhân trên 20 năm kinh nghiệm.'
    },
    {
      num: '04',
      title: 'Thử Đồ VIP & Chỉnh Sửa',
      desc: 'Buổi thử phục trang riêng tư tại Showroom VIP, tinh chỉnh chi tiết gấu áo, vòng eo đến khi đạt độ hoàn hảo tuyệt đối.'
    }
  ];

  return (
    <section className="py-24 bg-[#121212] text-[#E8DFD8] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-[0.3em]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Dịch Vụ May Đo Độc Bản Haute Couture
          </span>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-bold text-white leading-tight">
            Hành Trình Kiến Tạo Tuyệt Tác Dành Cho Riêng Bạn
          </h2>
          <div className="w-24 h-0.5 bg-amber-500 mx-auto rounded-full" />
          <p className="text-sm font-serif-sub text-stone-300 font-light text-lg">
            Mỗi sợi chỉ, từng viên đá quý đều mang trọn tình yêu và tâm huyết tôn vinh khoảnh khắc thiêng liêng nhất đời người.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-3xl bg-[#1A1A1A] border border-amber-500/20 hover:border-amber-400 transition-all duration-300 space-y-4 relative group"
            >
              <span className="font-serif-title text-4xl font-bold text-amber-500/40 group-hover:text-amber-400 transition-colors">
                {step.num}
              </span>

              <h3 className="font-serif-title text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                {step.title}
              </h3>

              <p className="text-xs text-stone-400 leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlight Banner Callout */}
        <div className="p-8 sm:p-12 rounded-3xl glass-dark border border-amber-500/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-1 text-xs text-amber-400 font-semibold uppercase tracking-wider">
              <Scissors className="w-4 h-4" /> Đo Ni Đóng Giày Dành Cho Mọi Phom Dáng
            </span>
            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-white">
              Bạn Muốn Đặt May Đo Riêng Hoặc Chỉnh Sửa Áo Cưới Chuẩn Số Đo?
            </h3>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Maison De Soie hỗ trợ đo chỉnh sửa độ dài gấu, bóp siết vòng eo hoàn toàn miễn phí cho tất cả khách hàng thuê và mua trang phục.
            </p>
          </div>

          <button
            onClick={() => openBookingModal()}
            className="flex-shrink-0 inline-flex items-center gap-2.5 gold-gradient-bg text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform gold-border-glow"
          >
            <Calendar className="w-4 h-4" /> Đặt Lịch Tư Vấn May Đo VIP
          </button>
        </div>
      </div>
    </section>
  );
};
