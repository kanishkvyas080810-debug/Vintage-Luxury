import React from 'react';
import { OurStorySection } from '../OurStorySection';

interface OurStoryPageProps {
  onBackToShop: () => void;
}

export const OurStoryPage: React.FC<OurStoryPageProps> = ({ onBackToShop }) => {
  return (
    <div className="w-full pt-24 pb-20 px-4 sm:px-6 md:px-12 lg:px-16 max-w-7xl mx-auto flex flex-col gap-12">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-[#432F2E]/10 pb-4">
        <button
          onClick={onBackToShop}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#432F2E] hover:text-[#C85A32] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Home &amp; Shop</span>
        </button>

        <span className="text-[11px] font-mono text-[#C85A32] font-bold uppercase tracking-wider">
          BRAND MANIFESTO • PAGE 05
        </span>
      </div>

      {/* Main Our Story Section */}
      <OurStorySection onShopDrop={onBackToShop} />

      {/* Detailed Regional Sourcing Chronicle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8 sm:p-12 rounded-3xl border border-[#432F2E]/10 shadow-sm">
        <div className="flex flex-col gap-4">
          <span className="text-xs font-mono font-bold text-[#C85A32] uppercase">
            CHAPTER 01 // FIBER TO FORM
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#432F2E]">
            The Tiruppur &amp; Coimbatore Loom
          </h3>
          <p className="text-xs sm:text-sm text-[#432F2E]/80 leading-relaxed">
            Tamil Nadu's textile belt has cultivated cotton spinning excellence for over a century. When designing Vintage Legacy, we refused to import synthetic polyester poly-blends. Instead, we work directly with generational spinning mills in Coimbatore.
          </p>
          <p className="text-xs sm:text-sm text-[#432F2E]/80 leading-relaxed">
            Our 100% combed ringspun cotton undergoes a secondary combing stage to remove short impurities and imperfect fibers, leaving only long-staple threads that resist pilling and abrasion.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-xs font-mono font-bold text-[#C85A32] uppercase">
            CHAPTER 02 // RAW DISTRESSING
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#432F2E]">
            Manual Hand-Finishing
          </h3>
          <p className="text-xs sm:text-sm text-[#432F2E]/80 leading-relaxed">
            Every garment in Series VL-01 receives individual attention: from mineral-wash acid baths that create unique weathered fade patterns, to frayed canvas applique patches sewn on industrial lockstitch machines.
          </p>
          <p className="text-xs sm:text-sm text-[#432F2E]/80 leading-relaxed">
            No two pieces are mathematically identical. When you wear Vintage Legacy, your piece carries subtle tactile anomalies that age authentically alongside your everyday life.
          </p>
        </div>
      </div>

      {/* Return to Shop CTA */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onBackToShop}
          className="px-8 py-4 bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          EXPLORE THE STREETWEAR CATALOG
        </button>
      </div>
    </div>
  );
};
