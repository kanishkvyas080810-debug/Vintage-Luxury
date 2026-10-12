import React from 'react';

interface OurStorySectionProps {
  onShopDrop: () => void;
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({ onShopDrop }) => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-24 bg-[#FCF8ED] border-t border-[#432F2E]/10" id="our-story-section">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase text-[#C85A32] tracking-wider block">
            HERITAGE & MANIFESTO
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#432F2E] mt-1.5 uppercase">
            CRAFTED FOR PERMANENCE
          </h2>
          <p className="text-sm sm:text-base text-[#432F2E]/80 mt-3 leading-relaxed">
            Vintage Legacy was founded to break the cycle of disposable, lightweight fast-fashion tees that lose their shape after two washes.
          </p>
        </div>

        {/* 3 Philosophy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#432F2E]/10 shadow-sm flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-[#C85A32]">01. ORIGIN</span>
            <h3 className="font-display font-bold text-lg text-[#432F2E]">
              Coimbatore & Tiruppur
            </h3>
            <p className="text-xs sm:text-sm text-[#432F2E]/70 leading-relaxed">
              We source long-staple Indian cotton knit locally from heritage spinning mills. Zero synthetic blends, zero polyester shortcuts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#432F2E]/10 shadow-sm flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-[#C85A32]">02. CALIBER</span>
            <h3 className="font-display font-bold text-lg text-[#432F2E]">
              240 GSM Heavy Weight
            </h3>
            <p className="text-xs sm:text-sm text-[#432F2E]/70 leading-relaxed">
              At 240 GSM, our fabric is 40% heavier than standard commercial streetwear. It delivers substantial drape without trapping heat.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#432F2E]/10 shadow-sm flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-[#C85A32]">03. PROCESS</span>
            <h3 className="font-display font-bold text-lg text-[#432F2E]">
              Bio-Washed & Pre-Shrunk
            </h3>
            <p className="text-xs sm:text-sm text-[#432F2E]/70 leading-relaxed">
              Enzyme treatment strips fuzzy micro-fibers, ensuring an indestructible hand-feel and true zero-shrink stability across life cycles.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-[#432F2E] text-[#FEEFB8] p-8 md:p-12 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C85A32] block mb-1">
              READY FOR INTENSE DAILY WEAR
            </span>
            <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Explore Series VL-01 Drops
            </h4>
            <p className="text-xs sm:text-sm text-[#FCF8ED]/80 mt-1">
              Limited run drops crafted in small batches. Free delivery Pan-India on carts ₹1,499+.
            </p>
          </div>

          <button
            onClick={onShopDrop}
            className="px-8 py-4 bg-[#FEEFB8] hover:bg-white text-[#432F2E] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
          >
            SHOP ALL 8 DROPS
          </button>
        </div>
      </div>
    </section>
  );
};
