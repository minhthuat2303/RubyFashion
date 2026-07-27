import React, { useState } from 'react';
import { Category } from '../../types';
import { Plus, Trash2, Folder, CornerDownRight, Layers, FolderPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CategoryTreeManager: React.FC = () => {
  const { categories, addCategory, deleteCategory, showToast } = useApp();

  // Category Creation Mode: 'parent' (Cấp 1) or 'child' (Cấp 2)
  const [categoryType, setCategoryType] = useState<'parent' | 'child'>('parent');
  const [newCatName, setNewCatName] = useState('');
  const [selectedParentId, setSelectedParentId] = useState<string>('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Get all parent categories (Level 1)
  const parentCategories = categories.filter((c) => {
    if (!c.parentId || c.parentId === 'none' || c.parentId === '') return true;
    const parentExists = categories.some((p) => p.id === c.parentId && p.id !== c.id);
    return !parentExists;
  });

  const getSubcategories = (parentId: string) => {
    return categories.filter((c) => c.parentId === parentId && c.id !== parentId);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = newCatName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');

    const isChild = categoryType === 'child';

    const newCategory: Category = {
      id: 'cat-' + Date.now(),
      name: newCatName.trim(),
      slug: slug || 'cat-' + Date.now(),
      image: 'https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
      description: newCatDesc || 'Danh mục trang phục cưới thiết kế',
      itemCount: 0,
      parentId: isChild && selectedParentId ? selectedParentId : undefined,
      level: isChild ? 2 : 1
    };

    addCategory(newCategory);
    setNewCatName('');
    setNewCatDesc('');
    showToast(
      `🎉 Đã tạo ${isChild ? 'danh mục con' : 'danh mục chính'} "${newCategory.name}" thành công!`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. TOP QUICK INLINE CREATION CARD (SIÊU TRỰC QUAN & DỄ SỬ DỤNG) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-amber-300 shadow-md space-y-6">
        <div className="flex items-center gap-3 border-b border-amber-100 pb-4">
          <div className="w-10 h-10 rounded-2xl gold-gradient-bg text-white flex items-center justify-center font-bold shadow">
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-title font-bold text-stone-900 text-lg">
              Tạo Danh Mục Sản Phẩm Mới (1 Bước Nhanh Chóng)
            </h3>
            <p className="text-xs text-stone-500">
              Chọn loại danh mục, gõ tên và bấm Lưu. Rất đơn giản, không cần biết kỹ thuật.
            </p>
          </div>
        </div>

        <form onSubmit={handleCreateCategory} className="space-y-5">
          {/* Visual Step 1: Select Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider">
              Bước 1: Chọn Loại Danh Mục Bạn Muốn Tạo
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCategoryType('parent')}
                className={`p-4 rounded-2xl border-2 text-left space-y-1 transition-all flex items-center gap-3 ${
                  categoryType === 'parent'
                    ? 'border-amber-500 bg-amber-50/80 shadow-sm font-bold'
                    : 'border-stone-200 bg-stone-50 hover:border-amber-300'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-200 text-amber-950 flex items-center justify-center flex-shrink-0 font-bold">
                  📁
                </div>
                <div>
                  <p className="text-xs text-stone-900 font-bold">1. Danh Mục Chính (Cấp 1)</p>
                  <p className="text-[11px] text-stone-500 font-normal">
                    Ví dụ: Áo Dài, Váy Cưới, Vest Chú Rể
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCategoryType('child');
                  if (!selectedParentId && parentCategories.length > 0) {
                    setSelectedParentId(parentCategories[0].id);
                  }
                }}
                className={`p-4 rounded-2xl border-2 text-left space-y-1 transition-all flex items-center gap-3 ${
                  categoryType === 'child'
                    ? 'border-amber-500 bg-amber-50/80 shadow-sm font-bold'
                    : 'border-stone-200 bg-stone-50 hover:border-amber-300'
                }`}
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-200 text-emerald-950 flex items-center justify-center flex-shrink-0 font-bold">
                  ↳
                </div>
                <div>
                  <p className="text-xs text-stone-900 font-bold">2. Danh Mục Con (Cấp 2)</p>
                  <p className="text-[11px] text-stone-500 font-normal">
                    Ví dụ: Áo Dài Thêu Tay nằm trong mục Áo Dài
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Subcategory Parent Selection */}
          {categoryType === 'child' && (
            <div className="p-4 bg-amber-100/50 rounded-2xl border border-amber-300 space-y-2 text-xs">
              <label className="block font-bold text-amber-950 uppercase">
                Chọn Danh Mục Cha Cho Loại Con Này:
              </label>
              <select
                value={selectedParentId}
                onChange={(e) => setSelectedParentId(e.target.value)}
                className="w-full p-3 bg-white border border-amber-300 rounded-xl font-bold text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {parentCategories.map((p) => (
                  <option key={p.id} value={p.id}>
                    📁 {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Step 2: Input Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-stone-700 uppercase mb-1">
                Tên Danh Mục Mới
              </label>
              <input
                type="text"
                placeholder={
                  categoryType === 'parent'
                    ? 'Nhập tên danh mục chính (Ví dụ: Áo Dài Cách Tân)'
                    : 'Nhập tên danh mục con (Ví dụ: Áo Dài Thêu Phượng Hoàng)'
                }
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-2xl font-bold text-stone-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-stone-700 uppercase mb-1">
                Mô Tả Ngắn (Tùy chọn)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: BST thiết kế cao cấp năm 2026"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-2xl text-stone-800 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 gold-gradient-bg text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Lưu Danh Mục Mới
          </button>
        </form>
      </div>

      {/* 2. EXISTING CATEGORIES TREE VIEW (SẮP XẾP ĐA CẤP TRỰC QUAN) */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-amber-100 pb-3">
          <h3 className="font-serif-title font-bold text-stone-900 text-lg flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            Cây Danh Mục Hiện Có Trong Shop ({categories.length} Danh Mục)
          </h3>
          <span className="text-xs text-amber-800 font-medium bg-amber-100 px-3 py-1 rounded-full">
            Tự động sắp xếp theo cấp
          </span>
        </div>

        <div className="space-y-4">
          {parentCategories.map((parent) => {
            const subs = getSubcategories(parent.id);
            return (
              <div
                key={parent.id}
                className="bg-stone-50 border-2 border-amber-200/80 rounded-3xl p-5 space-y-4 shadow-sm hover:border-amber-400 transition-colors"
              >
                {/* Parent Category Card Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold shadow-md">
                      <Folder className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif-title font-bold text-base text-stone-900">
                          {parent.name}
                        </h4>
                        <span className="bg-amber-200 text-amber-950 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                          Danh Mục Chính (Cấp 1)
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{parent.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCategoryType('child');
                        setSelectedParentId(parent.id);
                        window.scrollTo({ top: 250, behavior: 'smooth' });
                      }}
                      className="px-3.5 py-2 rounded-xl bg-amber-100 text-amber-950 hover:bg-amber-200 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 text-amber-700" /> + Thêm Danh Mục Con
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        deleteCategory(parent.id);
                        showToast(`✅ Đã xóa danh mục "${parent.name}"`, 'info');
                      }}
                      className="p-2 rounded-xl text-rose-600 hover:bg-rose-100 transition-colors"
                      title="Xóa danh mục này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Subcategories Container */}
                {subs.length > 0 ? (
                  <div className="pl-4 sm:pl-8 pt-3 border-t border-amber-200/50 space-y-2">
                    <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                      Các danh mục con thuộc "{parent.name}":
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {subs.map((sub) => (
                        <div
                          key={sub.id}
                          className="bg-white p-3 rounded-2xl border border-stone-200 flex items-center justify-between text-xs shadow-sm hover:border-amber-300"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <CornerDownRight className="w-4 h-4 text-amber-600 flex-shrink-0" />
                            <span className="font-bold text-stone-900 truncate">{sub.name}</span>
                            <span className="bg-emerald-100 text-emerald-900 text-[9px] px-2 py-0.5 rounded-full font-mono flex-shrink-0">
                              Cấp 2
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              deleteCategory(sub.id);
                              showToast(`✅ Đã xóa danh mục con "${sub.name}"`, 'info');
                            }}
                            className="text-rose-600 hover:text-rose-800 p-1 flex-shrink-0"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-stone-400 italic pl-2 pt-1">
                    Chưa có danh mục con. Bấm nút <strong>"+ Thêm Danh Mục Con"</strong> ở trên để thêm.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
