import React, { useState } from 'react';
import { Product } from '../types';

interface FitFabricSectionProps {
  onOpenSizeGuide: () => void;
  sampleStandardImage: string;
  sampleOversizedImage: string;
}

export const FitFabricSection: React.FC<FitFabricSectionProps> = ({
  onOpenSizeGuide,
  sampleStandardImage,
  sampleOversizedImage
}) => {
  const [sliderVal, setSliderVal] = useState<number>(100);

  // When sliderVal > 50, show oversized; else show standard
  const isOversized = sliderVal >= 50;
  const oversizedOpacity = sliderVal / 100;
  const standardOpacity = (100 - sliderVal) / 100;

  return (
    <section className="w-full bg-[#FFF0EF]/60 px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-24 border-y border-[#432F2E]/10" id="fit-fabric-section">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-xs font-extrabold text-[#C85A32] tracking-wider uppercase">
            ARCHITECTURAL SILHOUETTE
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#432F2E] mt-1.5 uppercase">
            BUILT HEAVY. CUT GENEROUS.
          </h2>
          <p className="text-sm sm:text-base text-[#432F2E]/80 mt-3 leading-relaxed">
            We spent 14 months refining our 240 GSM combed cotton weave to deliver the effortless boxy drop-shoulder structure that stays crisp wash after wash.
          </p>
        </div>

        {/* Comparison Grid & Interactive Drape Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Technical Breakdown Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-white shadow-sm border border-[#432F2E]/8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FEEFB8] flex items-center justify-center shrink-0 text-[#432F2E]">
                <span className="material-symbols-outlined text-[24px]">straighten</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-base sm:text-lg text-[#432F2E]">
                  Relaxed Drop-Shoulder Frame
                </h4>
                <p className="text-xs sm:text-sm text-[#432F2E]/75 mt-1 leading-relaxed">
                  Engineered with an expanded 5.5cm shoulder extension and wider chest dimension to fall cleanly without clinging or bunching under arms.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white shadow-sm border border-[#432F2E]/8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C4DAE8] flex items-center justify-center shrink-0 text-[#432F2E]">
                <span className="material-symbols-outlined text-[24px]">texture</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-base sm:text-lg text-[#432F2E]">
                  240 GSM Combed Ringspun Weave
                </h4>
                <p className="text-xs sm:text-sm text-[#432F2E]/75 mt-1 leading-relaxed">
                  Significantly thicker than standard commercial 160–180 GSM tees. Dense yarn geometry prevents transparency, retains shape, and feels substantial in tropical heat.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white shadow-sm border border-[#432F2E]/8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F1E2AC] flex items-center justify-center shrink-0 text-[#432F2E]">
                <span className="material-symbols-outlined text-[24px]">local_laundry_service</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-base sm:text-lg text-[#432F2E]">
                  Pre-Shrunk Bio-Washed Finish
                </h4>
                <p className="text-xs sm:text-sm text-[#432F2E]/75 mt-1 leading-relaxed">
                  Zero post-wash surprises. Enzyme treated to eliminate loose fibers, giving our graphic tees a soft hand-feel alongside indestructible durability.
                </p>
              </div>
            </div>

            {/* Size Guide Trigger Button */}
            <div className="pt-2">
              <button
                onClick={onOpenSizeGuide}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#432F2E] text-[#FEEFB8] font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#C85A32] transition-colors cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[20px]">aspect_ratio</span>
                <span>OPEN COMPREHENSIVE SIZE CHART & FIT GUIDE</span>
              </button>
            </div>
          </div>

          {/* Right: Interactive Drape Preview Simulation Component */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-[#432F2E]/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-[#C85A32] tracking-wider">
                SIMULATION ENGINE
              </span>
              <span className="text-xs font-bold text-[#432F2E]/70 bg-[#FCF8ED] px-3 py-1 rounded-full border border-[#432F2E]/10">
                REALTIME PREVIEW
              </span>
            </div>

            {/* Silhouette Comparison Canvas Display */}
            <div className="relative w-full aspect-[4/3] bg-[#FCF8ED] rounded-2xl overflow-hidden flex items-center justify-center border border-[#432F2E]/10">
              {/* Measurement overlay lines SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#C85A32]/40" xmlns="http://www.w3.org/2000/svg">
                <line strokeDasharray="4 4" strokeWidth="1.5" x1="20%" x2="80%" y1="28%" y2="28%" />
                <line strokeDasharray="4 4" strokeWidth="1.5" x1="28%" x2="28%" y1="20%" y2="80%" />
                <line strokeDasharray="4 4" strokeWidth="1.5" x1="72%" x2="72%" y1="20%" y2="80%" />
              </svg>

              {/* Standard Cut Representation */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 pointer-events-none"
                style={{ opacity: standardOpacity }}
              >
                <img
                  src={sampleStandardImage}
                  alt="Standard Regular Cut"
                  className="max-h-56 object-contain drop-shadow"
                />
                <span className="text-xs font-bold text-[#432F2E] mt-3 bg-white/90 px-3 py-1 rounded-full shadow-sm">
                  Standard Regular Fit (Fitted Chest, High Armholes)
                </span>
              </div>

              {/* Vintage Legacy Signature Oversized Representation */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300"
                style={{ opacity: oversizedOpacity }}
              >
                <img
                  src={sampleOversizedImage}
                  alt="Vintage Legacy Signature Boxy Fit"
                  className="max-h-56 object-contain drop-shadow-lg"
                />
                <span className="text-xs font-bold text-[#432F2E] mt-3 bg-[#FEEFB8] px-3 py-1 rounded-full shadow-sm">
                  Vintage Legacy Signature Boxy Fit (True Streetwear Drape)
                </span>
              </div>
            </div>

            {/* Interactive Slider */}
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex justify-between items-center text-xs font-bold text-[#432F2E]">
                <span className={sliderVal < 50 ? 'text-[#C85A32]' : ''}>Standard Fit</span>
                <span className={sliderVal >= 50 ? 'text-[#C85A32]' : ''}>
                  Oversized Drape (Vintage Legacy)
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="w-full accent-[#432F2E] cursor-pointer h-2 bg-[#FCF8ED] rounded-lg border border-[#432F2E]/20"
              />

              <div className="flex justify-between text-[11px] text-[#432F2E]/60 pt-0.5">
                <span>Fitted to body</span>
                <span className="font-semibold text-[#C85A32]">Slide to compare silhouettes</span>
                <span>Relaxed, natural shoulder fall</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
