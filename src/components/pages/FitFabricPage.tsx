import React from 'react';
import { FitFabricSection } from '../FitFabricSection';
import { Product } from '../../types';

interface FitFabricPageProps {
  onBackToShop: () => void;
  onOpenSizeGuide: () => void;
  products: Product[];
}

export const FitFabricPage: React.FC<FitFabricPageProps> = ({
  onBackToShop,
  onOpenSizeGuide,
  products
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
          TECHNICAL MANIFEST • PAGE 03
        </span>
      </div>

      {/* Main Fit & Fabric Architectural Simulation Engine */}
      <FitFabricSection
        onOpenSizeGuide={onOpenSizeGuide}
        sampleStandardImage={products[6]?.image || products[0].image}
        sampleOversizedImage={products[1]?.image || products[0].image}
      />

      {/* Fabric Density Comparison Matrix */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#432F2E]/10 shadow-sm flex flex-col gap-6">
        <div>
          <span className="text-xs font-extrabold uppercase text-[#C85A32] tracking-wider block">
            DENSITY BENCHMARK
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#432F2E] mt-1">
            240 GSM vs Commercial Standards
          </h3>
          <p className="text-xs sm:text-sm text-[#432F2E]/70 mt-1 max-w-xl">
            Why our combed cotton weave feels dramatically different from commercial streetwear.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#432F2E]/10">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FCF8ED] text-[#432F2E] uppercase font-bold text-[11px] border-b border-[#432F2E]/10">
              <tr>
                <th className="p-3.5">Metric</th>
                <th className="p-3.5">Standard High-Street</th>
                <th className="p-3.5">Premium Commercial</th>
                <th className="p-3.5 bg-[#FEEFB8]/70 text-[#432F2E]">Vintage Legacy (Series 01)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#432F2E]/8 text-[#432F2E]">
              <tr>
                <td className="p-3.5 font-bold">Fabric Weight</td>
                <td className="p-3.5 text-[#432F2E]/60">140 – 160 GSM</td>
                <td className="p-3.5 text-[#432F2E]/80">180 – 200 GSM</td>
                <td className="p-3.5 font-bold bg-[#FEEFB8]/40 text-[#C85A32]">240 GSM (High-Gauge)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Yarn Selection</td>
                <td className="p-3.5 text-[#432F2E]/60">Open-End Carded</td>
                <td className="p-3.5 text-[#432F2E]/80">Standard Ringspun</td>
                <td className="p-3.5 font-bold bg-[#FEEFB8]/40 text-[#C85A32]">100% Combed Ringspun</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Shoulder Extension</td>
                <td className="p-3.5 text-[#432F2E]/60">0 cm (Set-In Fitted)</td>
                <td className="p-3.5 text-[#432F2E]/80">2.0 cm Extended</td>
                <td className="p-3.5 font-bold bg-[#FEEFB8]/40 text-[#C85A32]">5.5 cm Architectural Drop</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold">Shrinkage Post-Wash</td>
                <td className="p-3.5 text-[#ba1a1a]">5% – 8% Shrinkage</td>
                <td className="p-3.5 text-[#432F2E]/80">3% – 4% Shrinkage</td>
                <td className="p-3.5 font-bold bg-[#FEEFB8]/40 text-[#22c55e]">&lt; 1% (Bio-Washed Pre-Shrunk)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Fabric Care Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#FCF8ED] p-6 rounded-2xl border border-[#432F2E]/10 flex flex-col gap-2">
          <span className="material-symbols-outlined text-[26px] text-[#C85A32]">mode_heat_cool</span>
          <h4 className="font-display font-bold text-base text-[#432F2E]">Cold Gentle Wash</h4>
          <p className="text-xs text-[#432F2E]/70 leading-relaxed">
            Machine wash inside-out at 30°C with mild liquid detergent to protect graphic screenprints and maintain mineral wash depth.
          </p>
        </div>

        <div className="bg-[#FCF8ED] p-6 rounded-2xl border border-[#432F2E]/10 flex flex-col gap-2">
          <span className="material-symbols-outlined text-[26px] text-[#C85A32]">air</span>
          <h4 className="font-display font-bold text-base text-[#432F2E]">Dry in Shade</h4>
          <p className="text-xs text-[#432F2E]/70 leading-relaxed">
            Hang dry in shade to preserve cotton softness and color richness. Avoid hot tumble dryers to maximize garment longevity.
          </p>
        </div>

        <div className="bg-[#FCF8ED] p-6 rounded-2xl border border-[#432F2E]/10 flex flex-col gap-2">
          <span className="material-symbols-outlined text-[26px] text-[#C85A32]">iron</span>
          <h4 className="font-display font-bold text-base text-[#432F2E]">Reverse Warm Iron</h4>
          <p className="text-xs text-[#432F2E]/70 leading-relaxed">
            Iron inside-out on medium heat. Never place iron directly onto high-density distressed graphic prints or canvas patches.
          </p>
        </div>
      </div>

      {/* Return to Shop CTA */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onBackToShop}
          className="px-8 py-4 bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          EXPLORE ALL 8 DROPS IN SHOP
        </button>
      </div>
    </div>
  );
};
