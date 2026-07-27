import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Award, ShieldCheck, Heart, Users, Calendar } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openBookingModal } = useApp();

  const milestones = [
    { year: '2011', title: 'Thành Lập Thương Hiệu', desc: 'Khởi đầu từ một xưởng may áo dài thủ công nhỏ tại phố cổ Hà Nội với 5 nghệ nhân thêu lụa lành nghề.' },
    { year: '2016', title: 'Mở Rộng Váy Cưới Luxury', desc: 'Ra mắt dòng sản phẩm váy cưới Haute Couture đính kết pha lê Swarovski nhập khẩu từ Pháp.' },
    { year: '2021', title: 'Showroom VIP Đồng Khởi TP.HCM', desc: 'Khai trương chi nhánh thứ 2 tại đại lộ Đồng Khởi Quận 1 với không gian phòng thử đồ 100% riêng tư.' },
    { year: '2026', title: 'Top 1 Thương Hiệu May Đo & Cho Thuê', desc: 'Trở thành biểu tượng thời trang cưới & áo dài di sản được hơn 5.000+ cô dâu và người nổi tiếng tin chọn.' }
  ];

  const teamMembers = [
    {
      name: 'Nguyễn Hồng Nhung',
      role: 'Giám Đốc Sáng Tạo & Founder',
      image: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400',
      bio: 'Tốt nghiệp Viện Thời Trang Paris (IFM), 15 năm tâm huyết gìn giữ và nâng tầm chiếc Áo dài Việt.'
    },
    {
      name: 'Master Tailor Trần Văn Nam',
      role: 'Nghệ Nhân May Đo Trưởng',
      image: 'https://images.pexels.com/photos/33381481/pexels-photo-33381481.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400',
      bio: '30 năm truyền nhân may âu phục & áo dài cung đình, chuyên trách các mẫu thiết kế siết eo chuẩn 3D.'
    },
    {
      name: 'Lê Hoàng Yến',
      role: 'Chuyên Gia Tạo Mẫu Bridal Stylist',
      image: 'https://images.pexels.com/photos/31157326/pexels-photo-31157326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=500&w=400',
      bio: 'Tư vấn phom dáng và phối hợp phụ kiện cưới đỉnh cao cho hơn 1.000 cô dâu trong và ngoài nước.'
    }
  ];

  return (
    <div className="space-y-20 py-12 bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Lịch Sử & Di Sản Thương Hiệu
            </span>
            <h1 className="font-serif-title text-4xl sm:text-6xl font-bold text-[#111111] leading-tight">
              15 Năm Hồn Việt Trong Từng Đường Kim Mũi Chỉ
            </h1>
            <div className="w-24 h-0.5 bg-[#D4AF37] rounded-full" />
            <p className="text-sm font-serif-sub text-stone-700 font-light text-lg leading-relaxed">
              MAISON DE SOIE sinh ra từ tình yêu sâu sắc đối với chiếc Áo dài truyền thống và khát khao nâng tầm trang phục cưới Việt Nam sánh ngang các nhà mốt Haute Couture hàng đầu thế giới.
            </p>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Chúng tôi tin rằng, mỗi chiếc áo dài hay váy cưới khoác lên người cô dâu không đơn thuần là một bộ trang phục, mà là lời khẳng định về thần thái, sự tôn nghiêm và hạnh phúc trọn vẹn trong ngày vui trọng đại.
            </p>
            <div className="pt-2">
              <button
                onClick={() => openBookingModal()}
                className="inline-flex items-center gap-2 gold-gradient-bg text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-xl hover:scale-105 transition-all"
              >
                <Calendar className="w-4 h-4" /> Đặt Lịch Thử Đồ VIP
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <img
              src="https://images.pexels.com/photos/8508947/pexels-photo-8508947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900"
              alt="Maison De Soie Heritage"
              className="w-full h-[550px] object-cover rounded-3xl shadow-2xl border border-amber-200/60"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#121212] text-amber-300 p-6 rounded-3xl shadow-2xl border border-amber-500/40 hidden sm:block max-w-xs">
              <p className="font-serif-title text-3xl font-bold">15+ Năm</p>
              <p className="text-xs text-stone-300 font-light mt-1">
                Gìn giữ giá trị may đo thủ công truyền thống và nâng tầm xu hướng 2026.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitments & Values */}
      <section className="py-16 bg-[#121212] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-[0.25em]">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Sứ Mệnh & Cam Kết
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold">
              4 Giá Trị Cốt Lõi Tại Maison De Soie
            </h2>
            <div className="w-20 h-0.5 bg-amber-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Chất Liệu Cao Cấp', desc: '100% Lụa tơ tằm Bảo Lộc, Ren Chantilly Pháp & Gấm hoa cao cấp nhập khẩu.' },
              { icon: Users, title: 'May Đo Chuẩn Phom', desc: 'Thiết kế siết eo định hình giấu khuyết điểm, tôn vinh trọn vẹn đường cong.' },
              { icon: Heart, title: 'Đính Kết Thủ Công', desc: 'Hàng nghìn viên pha lê Swarovski được đính kết tỉ mỉ bởi nghệ nhân lành nghề.' },
              { icon: ShieldCheck, title: 'Dịch Vụ Tiệt Trùng', desc: 'Cam kết giặt hấp tiệt trùng và bảo quản trang phục tinh tươm trước khi giao.' }
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="p-8 rounded-3xl bg-[#1A1A1A] border border-amber-500/20 space-y-3">
                  <Icon className="w-8 h-8 text-amber-400" />
                  <h3 className="font-serif-title text-xl font-bold text-white">{val.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-light">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            Cột Mốc Phát Triển
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#111111]">
            Hành Trình Khẳng Định Đẳng Cấp
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((m) => (
            <div key={m.year} className="p-6 rounded-3xl bg-white border border-amber-200/60 shadow-lg space-y-2">
              <span className="font-serif-title text-3xl font-bold text-[#B8860B]">{m.year}</span>
              <h3 className="font-serif-title font-bold text-stone-900 text-lg">{m.title}</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Artisans & Designers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
            <Users className="w-3.5 h-3.5 text-amber-500" />
            Đội Ngũ Sáng Tạo & Nghệ Nhân
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#111111]">
            Những Con Người Đằng Sau Mọi Tuyệt Tác
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-amber-200/50">
              <img src={member.image} alt={member.name} className="w-full h-80 object-cover" />
              <div className="p-6 space-y-2">
                <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">{member.role}</span>
                <h3 className="font-serif-title text-xl font-bold text-stone-900">{member.name}</h3>
                <p className="text-xs text-stone-600 font-light leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
