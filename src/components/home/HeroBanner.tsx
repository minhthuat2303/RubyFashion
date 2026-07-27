import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Award,
  Crown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroBanner: React.FC = () => {
  const { heroSlides, setActiveTab, setSelectedCategoryFilter, openBookingModal } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const currentSlide = heroSlides[currentIndex] || heroSlides[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const handleExploreCollection = () => {
    if (currentSlide.categorySlug) {
      setSelectedCategoryFilter(currentSlide.categorySlug);
    }
    setActiveTab('collection');
  };

  return (
    <section className="relative w-full h-[88vh] min-h-[600px] max-h-[900px] bg-stone-950 overflow-hidden flex items-center justify-center">
      {/* Background Image Slideshow with Parallax/Fade Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Multi-layered luxury gradient dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content Center Stage */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6 text-white">
          {/* Badge */}
          <motion.div
            key={`badge-${currentIndex}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-amber-300 border border-amber-500/40 text-xs font-semibold uppercase tracking-[0.25em]"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {currentSlide.badge}
          </motion.div>

          {/* Main Title */}
          <motion.h1
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-2xl"
          >
            {currentSlide.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`sub-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg font-serif-sub text-stone-200/90 leading-relaxed font-light max-w-2xl"
          >
            {currentSlide.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`cta-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="pt-4 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={handleExploreCollection}
              className="inline-flex items-center gap-2.5 gold-gradient-bg text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all gold-border-glow"
            >
              <span>{currentSlide.ctaPrimaryText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => openBookingModal()}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass-panel text-stone-900 hover:text-amber-900 hover:bg-white text-xs sm:text-sm font-semibold uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4 text-amber-700" />
              <span>{currentSlide.ctaSecondaryText}</span>
            </button>
          </motion.div>

          {/* Trust Highlights Badge Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="pt-8 flex flex-wrap items-center gap-6 text-xs text-amber-200/80 border-t border-white/10"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>15+ Năm Kinh Nghiệm Haute Couture</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>5.000+ Cô Dâu & Quý Ông Lựa Chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Cam Kết Giặt Hấp Tiệt Trùng 100%</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-8 right-8 z-20 hidden sm:flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full glass-dark text-white hover:bg-amber-500 hover:text-black transition-all"
          title="Slide trước"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.5 px-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === idx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40 hover:bg-white'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full glass-dark text-white hover:bg-amber-500 hover:text-black transition-all"
          title="Slide tiếp theo"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
