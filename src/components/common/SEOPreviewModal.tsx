import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Code, Database, Globe, Layers, Server, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SEOPreviewModal: React.FC = () => {
  const { isSEOModalOpen, setIsSEOModalOpen, contactConfig } = useApp();
  const [activeSubTab, setActiveTab] = useState<'architecture' | 'schema' | 'api' | 'seo'>('architecture');

  if (!isSEOModalOpen) return null;

  const prismaSchemaCode = `// Prisma Schema for PostgreSQL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum ProductStatus {
  IN_STOCK
  TAILOR_ORDER
  COMING_SOON
}

model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  image       String
  description String?
  products    Product[]
  createdAt   DateTime  @default(now())
}

model Product {
  id                String        @id @default(uuid())
  sku               String        @unique
  title             String
  slug              String        @unique
  categoryId        String
  category          Category      @relation(fields: [categoryId], references: [id])
  salePrice         Decimal
  rentalPrice       Decimal
  rentalDeposit     Decimal?
  mainImage         String
  images            String[]
  sizes             String[]
  colors            String[]
  material          String
  style             String
  occasion          String
  description       String        @db.Text
  highlightFeatures String[]
  careInstructions  String?       @db.Text
  status            ProductStatus @default(IN_STOCK)
  featured          Boolean       @default(false)
  isNew             Boolean       @default(true)
  viewCount         Int           @default(0)
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
}

model ConsultationInquiry {
  id              String   @id @default(uuid())
  fullName        String
  phone           String
  email           String?
  preferredDate   DateTime
  preferredTime   String
  serviceType     String
  productSku      String?
  showroomBranch  String
  status          String   @default("pending")
  notes           String?
  createdAt       DateTime @default(now())
}

model ContactConfig {
  id                 String   @id @default("singleton")
  phone              String
  phoneFormatted     String
  zaloUrl            String
  messengerUrl       String
  facebookUrl        String
  tiktokUrl          String
  instagramUrl       String
  shopeeUrl          String
  googleMapsUrl      String
  googleMapsEmbedUrl String
  email              String
  showroomAddress    String
  showroomBranch2    String
  openHours          String
  updatedAt          DateTime @updatedAt
}`;

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "BridalShop",
    "name": "MAISON DE SOIE HAUTE COUTURE",
    "image": "https://images.pexels.com/photos/8508978/pexels-photo-8508978.jpeg",
    "@id": "https://maisondesOie.vn",
    "url": "https://maisondesOie.vn",
    "telephone": contactConfig.phoneFormatted,
    "priceRange": "$$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contactConfig.showroomAddress,
      "addressLocality": "Hà Nội",
      "addressCountry": "VN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:30",
      "closes": "21:30"
    },
    "sameAs": [
      contactConfig.facebookUrl,
      contactConfig.instagramUrl,
      contactConfig.tiktokUrl,
      contactConfig.zaloUrl
    ],
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "VND",
      "lowPrice": "850000",
      "highPrice": "85000000",
      "offerCount": "100+"
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSEOModalOpen(false)}
          className="fixed inset-0"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#121212] text-[#E8DFD8] rounded-3xl shadow-2xl border border-amber-500/40 overflow-hidden z-10 my-auto p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-amber-500/30 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
                <Code className="w-4 h-4" /> Clean Architecture & System Specification
              </div>
              <h3 className="font-serif-title text-2xl font-bold text-white mt-1">
                Kiến Trúc Dự Án, Database Schema & SEO High-End
              </h3>
            </div>

            <button
              onClick={() => setIsSEOModalOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-stone-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sub Navigation */}
          <div className="flex flex-wrap border-b border-amber-500/20 text-xs gap-2">
            {[
              { id: 'architecture', label: 'Kiến Trúc Hệ Thống (Clean Architecture)', icon: Layers },
              { id: 'schema', label: 'Database Schema (Prisma PostgreSQL)', icon: Database },
              { id: 'api', label: 'RESTful API Specification', icon: Server },
              { id: 'seo', label: 'SEO Schema.org & Meta Specs', icon: Globe }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl font-medium transition-all ${
                    activeSubTab === tab.id
                      ? 'bg-[#1E1E1E] text-amber-400 border-t-2 border-amber-400 font-semibold'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Area */}
          <div className="min-h-[350px] max-h-[55vh] overflow-y-auto space-y-4 pr-1 text-xs">
            {activeSubTab === 'architecture' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-amber-500/20 space-y-2">
                  <h4 className="text-amber-300 font-semibold text-sm">Cấu Trúc Thư Mục Clean Architecture (Frontend + Backend)</h4>
                  <p className="text-stone-300 leading-relaxed">
                    Hệ thống được thiết kế tách biệt theo nguyên lý Clean Architecture & Separation of Concerns, dễ dàng mở rộng và chịu tải cao.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-black/60 border border-stone-800 space-y-2">
                    <span className="text-amber-400 font-mono font-bold uppercase text-xs">Frontend Stack (2026 Ready)</span>
                    <ul className="space-y-1.5 text-stone-300">
                      <li>• <strong>Framework:</strong> Next.js 15 / React 19 + TypeScript</li>
                      <li>• <strong>Styling:</strong> Tailwind CSS v4 + Framer Motion (Animation 60fps)</li>
                      <li>• <strong>Icons & UI:</strong> Lucide Icons + Glassmorphic Design Token</li>
                      <li>• <strong>State Management:</strong> React Context API / Zustand</li>
                      <li>• <strong>SEO:</strong> Next.js Dynamic Metadata, SSR & OpenGraph</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-black/60 border border-stone-800 space-y-2">
                    <span className="text-emerald-400 font-mono font-bold uppercase text-xs">Backend Stack (Clean Architecture)</span>
                    <ul className="space-y-1.5 text-stone-300">
                      <li>• <strong>Framework:</strong> NestJS (Node.js REST API Architecture)</li>
                      <li>• <strong>ORM:</strong> Prisma ORM</li>
                      <li>• <strong>Database:</strong> PostgreSQL High-Performance Cluster</li>
                      <li>• <strong>Authentication:</strong> JWT (JSON Web Token) cho Admin Portal</li>
                      <li>• <strong>Storage:</strong> Cloudinary SDK cho quản lý hình ảnh WebP</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === 'schema' && (
              <div className="space-y-3">
                <p className="text-stone-300">Cấu trúc Database Schema sử dụng Prisma ORM kết nối PostgreSQL:</p>
                <pre className="p-4 rounded-2xl bg-black/80 font-mono text-[11px] text-amber-200/90 border border-amber-500/30 overflow-x-auto leading-relaxed">
                  {prismaSchemaCode}
                </pre>
              </div>
            )}

            {activeSubTab === 'api' && (
              <div className="space-y-3">
                <p className="text-stone-300">Danh sách RESTful Endpoints thiết kế theo chuẩn NestJS Clean Architecture:</p>
                <div className="space-y-2 font-mono">
                  <div className="p-3 rounded-xl bg-black/60 border border-stone-800 flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">GET /api/v1/products</span>
                    <span className="text-stone-400">Lấy danh sách sản phẩm (Filter, Search, Sort)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-stone-800 flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">GET /api/v1/products/:sku</span>
                    <span className="text-stone-400">Chi tiết sản phẩm theo Mã SKU</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-stone-800 flex items-center justify-between">
                    <span className="text-amber-400 font-bold">POST /api/v1/consultations</span>
                    <span className="text-stone-400">Tạo yêu cầu đặt lịch thử đồ / tư vấn</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-stone-800 flex items-center justify-between">
                    <span className="text-blue-400 font-bold">GET /api/v1/contact-config</span>
                    <span className="text-stone-400">Lấy thông tin nền tảng Zalo, Messenger, Hotline</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-stone-800 flex items-center justify-between">
                    <span className="text-rose-400 font-bold">POST /api/v1/admin/login</span>
                    <span className="text-stone-400">Đăng nhập Admin Portal (Trả về Bearer JWT Token)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/60 border border-stone-800 flex items-center justify-between">
                    <span className="text-[#D4AF37] font-bold">PUT /api/v1/admin/products/:id</span>
                    <span className="text-stone-400">Cập nhật sản phẩm (Chỉ dành cho Admin có JWT)</span>
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === 'seo' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-amber-500/20 space-y-2">
                  <h4 className="text-amber-300 font-semibold text-sm">Schema.org Structured Data (JSON-LD)</h4>
                  <p className="text-stone-300">Tối ưu Rich Snippets hiển thị vị trí, đánh giá, giá thuê & hình ảnh trực tiếp trên Google Search:</p>
                </div>

                <pre className="p-4 rounded-2xl bg-black/80 font-mono text-[11px] text-amber-200/90 border border-amber-500/30 overflow-x-auto leading-relaxed">
                  {JSON.stringify(jsonLdData, null, 2)}
                </pre>

                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <p className="text-emerald-200 text-xs">
                    Tất cả hình ảnh đã được tối ưu dạng Lazy Loading, WebP format, sẵn sàng đạt điểm số Google Core Web Vitals {'>'} 95.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
