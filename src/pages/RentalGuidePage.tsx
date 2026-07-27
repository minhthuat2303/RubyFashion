import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export const RentalGuidePage: React.FC = () => {
  const { rentalProcessSteps, pricingPolicies } = useApp();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Thời gian thuê trang phục quy định bao nhiêu ngày?',
      a: 'Thời gian thuê chuẩn tại Maison De Soie là 3 ngày 2 đêm (Ví dụ: Nhận đồ ngày 14, đám cưới ngày 15, trả đồ ngày 16). Nếu bạn cần giữ đồ lâu hơn để đi tỉnh xa hoặc chụp ảnh ngoại cảnh, vui lòng thông báo trước để được hỗ trợ tính giá gia hạn ưu đãi.'
    },
    {
      q: 'Maison De Soie có hỗ trợ sửa trang phục theo số đo người thuê không?',
      a: 'CÓ! Tất cả trang phục thuê tại Showroom đều được đội ngũ thợ may chỉnh sửa độ dài gấu, bóp/nới siết eo miễn phí 100% để vừa vặn như may đo riêng cho bạn.'
    },
    {
      q: 'Thủ tục cọc khi thuê trang phục như thế nào?',
      a: 'Khách hàng chỉ cần đặt cọc khoản tiền cọc bảo đảm (Khoảng 30-50% giá trị sản phẩm) hoặc để lại Căn cước công dân / Hộ chiếu gốc. Khoản cọc sẽ được chuyển hoàn 100% ngay khi trang phục được bàn giao lại.'
    },
    {
      q: 'Nếu trang phục bị lỡ dính vết bẩn thì xử lý ra sao?',
      a: 'Tất cả trang phục của Maison De Soie đều được xử lý giặt hấp tiệt trùng khô chuyên dụng. Khách hàng KHÔNG NÊN tự giặt tại nhà. Các vết bẩn thông thường như rượu sâm panh, son phấn nhẹ sẽ được xử lý miễn phí.'
    }
  ];

  return (
    <div className="py-12 bg-white space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3 px-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8860B] uppercase tracking-[0.25em]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Quy Trình & Bảng Giá Thuê Minh Bạch
        </span>
        <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-[#111111]">
          Bảng Giá & Quy Trình Thuê Đồ
        </h1>
        <div className="w-24 h-0.5 bg-[#D4AF37] mx-auto rounded-full" />
        <p className="text-xs sm:text-sm font-serif-sub text-stone-600 font-light text-base">
          4 bước thuê trang phục cưới & áo dài đơn giản, tiện lợi với chính sách bảo đảm quyền lợi tối đa cho khách hàng.
        </p>
      </div>

      {/* 4 Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rentalProcessSteps.map((stepItem, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-amber-200/60 shadow-xl space-y-4 relative flex flex-col justify-between hover:border-amber-400 transition-colors"
            >
              <div className="space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-bold font-mono inline-block">
                  Bước {stepItem.stepNumber}
                </span>
                <h3 className="font-serif-title text-lg font-bold text-stone-900 leading-snug">
                  {stepItem.title}
                </h3>
                <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                  {stepItem.subtitle}
                </p>
                <p className="text-xs text-stone-600 font-light leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              {stepItem.details && stepItem.details.length > 0 && (
                <div className="pt-3 border-t border-amber-100 space-y-1.5 text-[11px] text-stone-500 font-medium">
                  {stepItem.details.map((d, dIdx) => (
                    <p key={dIdx}>• {d}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Transparent Pricing Table */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-200/60 space-y-6">
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-4">
            <div>
              <h2 className="font-serif-title text-2xl font-bold text-stone-900">Bảng Giá Thuê Trang Phục Niêm Yết</h2>
              <p className="text-xs text-stone-500">Giá niêm yết áp dụng trọn gói cho thời gian thuê 3 ngày 2 đêm</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-amber-600" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-800">
              <thead className="bg-amber-50/80 uppercase text-[10px] tracking-wider text-amber-950 font-bold border-b border-amber-200">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Dòng Trang Phục</th>
                  <th className="p-3.5">Giá Thuê (3 ngày)</th>
                  <th className="p-3.5">Giá Thuê (7 ngày)</th>
                  <th className="p-3.5">Tiền Cọc Bảo Đảm</th>
                  <th className="p-3.5 rounded-r-xl">May Đo Mới</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pricingPolicies.map((prc) => (
                  <tr key={prc.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-3.5 font-bold text-stone-900 font-serif-title text-sm">
                      {prc.category}
                    </td>
                    <td className="p-3.5 font-bold text-[#B8860B]">
                      {prc.rental3DaysPrice}
                    </td>
                    <td className="p-3.5 font-semibold text-stone-700">
                      {prc.rental7DaysPrice}
                    </td>
                    <td className="p-3.5 font-medium text-stone-600">
                      {prc.depositRate}
                    </td>
                    <td className="p-3.5 text-stone-500 italic">
                      {prc.tailorPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-serif-title text-2xl font-bold text-stone-900">
            Câu Hỏi Thường Gặp Về Thuê Trang Phục
          </h2>
          <p className="text-xs text-stone-500">
            Giải đáp thắc mắc chi tiết về thủ tục đặt thuê và quy định hoàn cọc
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-amber-200/80 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between font-bold text-stone-900 text-xs sm:text-sm hover:bg-amber-50/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-amber-100/60 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
