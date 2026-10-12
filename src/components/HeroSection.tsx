import React from 'react';
import { Product } from '../types';

interface HeroSectionProps {
  heroProduct: Product;
  onShopDrop: () => void;
  onExploreFabric: () => void;
  onQuickView: (product: Product) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroProduct,
  onShopDrop,
  onExploreFabric,
  onQuickView
}) => {
  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16 pt-24 pb-14 md:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Left Column: Copy & High-Stakes CTA */}
        <div className="lg:col-span-7 flex flex-col gap-6 z-10">
          {/* Overline Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEEFB8] text-[#432F2E] text-xs font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-pulse" />
              DROP ARCHIVE 01 • LIMITED QUANTITY
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C4DAE8] text-[#432F2E] text-xs font-bold uppercase tracking-wider">
              240 GSM HEAVYWEIGHT
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[72px] lg:leading-[1.02] text-[#432F2E] tracking-tight uppercase">
            OWN YOUR<br />
            <span className="text-[#C85A32] italic">EVERYDAY.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#432F2E]/80 max-w-xl font-normal leading-relaxed">
            Oversized fits. 100% heavy combed cotton. Your next everyday streetwear staple crafted for intense daily wear, raw silhouettes, and unmatched drape.
          </p>

          {/* Specular Gleam CTA & Highlights */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <button
              onClick={onShopDrop}
              className="relative group overflow-hidden inline-flex items-center justify-center gap-2.5 bg-[#432F2E] text-[#FEEFB8] px-7 py-4 rounded-full font-bold text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer"
            >
              {/* Specular gleam bar animation */}
              <span className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-transform duration-1000 ease-in-out" />
              <span className="material-symbols-outlined text-[20px]">local_mall</span>
              <span>SHOP THE DROP — UNDER ₹999</span>
            </button>

            <button
              onClick={onExploreFabric}
              className="inline-flex items-center justify-center gap-1.5 bg-[#FCF8ED] border border-[#432F2E]/20 text-[#432F2E] px-6 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-[#FEEFB8] transition-colors shadow-sm cursor-pointer"
            >
              <span>FIT & FABRIC GUIDE</span>
              <span className="material-symbols-outlined text-[18px]">north_east</span>
            </button>
          </div>

          {/* Micro Feature Badges */}
          <div className="grid grid-cols-3 gap-2.5 pt-4 max-w-lg">
            <div className="flex flex-col bg-white p-3 rounded-2xl shadow-sm border border-[#432F2E]/5">
              <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider">
                Purity
              </span>
              <span className="font-display font-bold text-sm text-[#432F2E] mt-0.5">
                100% Cotton
              </span>
              <span className="text-[11px] text-[#432F2E]/60">Combed Ringspun</span>
            </div>

            <div className="flex flex-col bg-white p-3 rounded-2xl shadow-sm border border-[#432F2E]/5">
              <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider">
                Cut
              </span>
              <span className="font-display font-bold text-sm text-[#432F2E] mt-0.5">
                Boxy Silhouette
              </span>
              <span className="text-[11px] text-[#432F2E]/60">Relaxed Shoulder</span>
            </div>

            <div className="flex flex-col bg-white p-3 rounded-2xl shadow-sm border border-[#432F2E]/5">
              <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider">
                Origin
              </span>
              <span className="font-display font-bold text-sm text-[#432F2E] mt-0.5">
                Made for India
              </span>
              <span className="text-[11px] text-[#432F2E]/60">Pre-Shrunk Washed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Hero Showcase Mosaic */}
        <div className="lg:col-span-5 relative">
          <div
            onClick={() => onQuickView(heroProduct)}
            className="relative w-full aspect-[4/5] bg-[#FCF8ED] rounded-3xl p-5 shadow-2xl border border-[#432F2E]/10 overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-[#C85A32]/40"
          >
            {/* Background Accent Glows */}
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#FEEFB8]/70 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-[#C4DAE8]/60 blur-3xl pointer-events-none" />

            {/* Top Badge Bar */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#432F2E] text-[#FEEFB8] text-[11px] font-extrabold tracking-widest uppercase">
                NEW RELEASE
              </span>
              <span className="text-[11px] font-bold text-[#432F2E] bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                SERIES VL-01
              </span>
            </div>

            {/* Featured Tee Image */}
            <div className="relative z-0 my-auto flex items-center justify-center py-4">
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="w-full max-h-[380px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Bottom Card Spec Bar */}
            <div className="relative z-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-md flex items-center justify-between border border-[#432F2E]/5">
              <div>
                <p className="font-display font-bold text-base text-[#432F2E] leading-tight">
                  {heroProduct.name}
                </p>
                <p className="text-xs text-[#432F2E]/60 mt-0.5">
                  {heroProduct.wash}
                </p>
              </div>
              <div className="text-right">
                <span className="font-display font-extrabold text-xl text-[#C85A32]">
                  ₹{heroProduct.price}
                </span>
                <p className="text-[11px] text-[#432F2E]/50 line-through">
                  ₹{heroProduct.originalPrice}
                </p>
              </div>
            </div>
          </div>

          {/* Floating Badge Attachment */}
          <div className="absolute -bottom-4 -left-3 sm:-bottom-4 sm:-left-4 bg-[#FEEFB8] text-[#432F2E] px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide border border-[#432F2E]/10 z-20">
            <span className="material-symbols-outlined text-[18px] text-[#C85A32]">
              bolt
            </span>
            <span>48h Pan-India Dispatch</span>
          </div>
        </div>
      </div>
    </section>
  );
};
