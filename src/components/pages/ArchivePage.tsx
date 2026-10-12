import React from 'react';
import { Product } from '../../types';
import { AccordionShowcase } from '../AccordionShowcase';

interface ArchivePageProps {
  products: Product[];
  onBackToShop: () => void;
  onQuickView: (product: Product) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = ({
  products,
  onBackToShop,
  onQuickView
}) => {
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
          SERIES ARCHIVE • PAGE 04
        </span>
      </div>

      {/* Header Headline */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold uppercase text-[#C85A32] tracking-wider block">
          LIMITED RUN CURATION
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#432F2E] mt-1.5 uppercase">
          ARCHIVE SPOTLIGHT
        </h2>
        <p className="text-sm sm:text-base text-[#432F2E]/80 mt-3 leading-relaxed">
          Tactile heavyweight streetwear engineered in Tiruppur. Each piece is limited to 150 individually cataloged garments.
        </p>
      </div>

      {/* Accordion Showcase Interactive Component */}
      <AccordionShowcase products={products} onQuickView={onQuickView} />

      {/* Grid of Archive Drop Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {products.slice(0, 6).map((p, idx) => (
          <div
            key={p.id}
            onClick={() => onQuickView(p)}
            className="bg-white rounded-3xl p-5 border border-[#432F2E]/10 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative aspect-square bg-[#FFF0EF]/50 rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-4">
              <span className="absolute top-3 left-3 bg-[#432F2E] text-[#FEEFB8] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                VL-0{idx + 1}
              </span>
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider block">
                {p.wash}
              </span>
              <h4 className="font-display font-bold text-lg text-[#432F2E] mt-1">
                {p.name}
              </h4>
              <p className="text-xs text-[#432F2E]/70 mt-1 line-clamp-2">
                {p.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#432F2E]/8">
              <span className="font-display font-extrabold text-lg text-[#432F2E]">
                ₹{p.price}
              </span>
              <span className="text-xs font-bold text-[#C85A32] group-hover:underline flex items-center gap-0.5">
                Inspect Artwork <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Return to Shop CTA */}
      <div className="flex justify-center pt-6">
        <button
          onClick={onBackToShop}
          className="px-8 py-4 bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          GO TO COMPLETE CATALOG
        </button>
      </div>
    </div>
  );
};
