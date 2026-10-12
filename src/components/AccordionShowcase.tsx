import React, { useState } from 'react';
import { Product } from '../types';

interface AccordionShowcaseProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const AccordionShowcase: React.FC<AccordionShowcaseProps> = ({
  products,
  onQuickView
}) => {
  // Use first 5 products for archive pieces
  const archiveItems = [
    {
      num: '01',
      tag: 'ACID WASH',
      product: products.find(p => p.id === 'khorasan-rebel') || products[0]
    },
    {
      num: '02',
      tag: 'DISTRESSED',
      product: products.find(p => p.id === 'khorasan-kid-patchwork') || products[1]
    },
    {
      num: '03',
      tag: 'CYBER BLAST',
      product: products.find(p => p.id === 'cyber-blast-heavy') || products[2]
    },
    {
      num: '04',
      tag: 'MEMBERS ONLY',
      product: products.find(p => p.id === 'saint-fears-boxy') || products[3]
    },
    {
      num: '05',
      tag: 'PUNK COLLAGE',
      product: products.find(p => p.id === 'what-are-we-going-to-do') || products[4]
    }
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section className="w-full bg-[#FCF8ED] px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-24 border-y border-[#432F2E]/10" id="archive-section">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Showcase Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase text-[#C85A32] tracking-wider block">
              Spotlight Lineup
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#432F2E] tracking-tight mt-1 uppercase">
              FEATURED ARCHIVE PIECES
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#432F2E]/70 max-w-sm font-normal">
            Tap or hover panels to explore the signature heavy-gauge drops designed for tactile presence.
          </p>
        </div>

        {/* Horizontal Accordion Gallery Container */}
        <div className="w-full h-[520px] md:h-[540px] flex flex-col md:flex-row gap-2.5 sm:gap-3 overflow-hidden select-none">
          {archiveItems.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <div
                key={item.product.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  setActiveIndex(idx);
                }}
                className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-md transition-all duration-500 ease-out flex flex-col justify-end p-5 md:p-6 bg-[#180f0e] ${
                  isActive
                    ? 'flex-[3] md:flex-[3]'
                    : 'flex-1 md:flex-1'
                }`}
              >
                {/* Background Tee Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                    isActive ? 'scale-105 opacity-90' : 'opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60'
                  }`}
                />

                {/* Dark Gradient Overlay for perfect legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#281716]/95 via-[#281716]/40 to-transparent" />

                {/* Label and Details */}
                <div className="relative z-10 flex flex-col">
                  <span className="text-[10px] sm:text-xs font-extrabold text-[#FEEFB8] tracking-widest uppercase mb-1">
                    {item.num} • {item.tag}
                  </span>
                  
                  <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white leading-tight">
                    {item.product.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#C4DAE8] mt-1 line-clamp-1">
                    {item.product.wash} • ₹{item.product.price}
                  </p>

                  {/* Quick View Button (Revealed on active/hover) */}
                  <div
                    className={`mt-3 transition-all duration-300 ${
                      isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(item.product);
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#FEEFB8] hover:bg-white text-[#432F2E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                    >
                      <span>Quick View</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
