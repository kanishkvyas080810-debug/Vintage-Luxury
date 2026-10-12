import React, { useState } from 'react';

interface SizeGuidePageProps {
  onBackToShop: () => void;
}

export const SizeGuidePage: React.FC<SizeGuidePageProps> = ({ onBackToShop }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [userHeight, setUserHeight] = useState<string>('5ft 10in');
  const [fitPreference, setFitPreference] = useState<'relaxed' | 'true-boxy' | 'fitted'>('true-boxy');

  const dataInches = [
    { size: 'Small (S)', chest: '42"', length: '28.5"', drop: '20.5"', sleeve: '8.5"' },
    { size: 'Medium (M)', chest: '44"', length: '29.5"', drop: '21.5"', sleeve: '9.0"' },
    { size: 'Large (L)', chest: '46"', length: '30.5"', drop: '22.5"', sleeve: '9.5"' },
    { size: 'XL', chest: '48"', length: '31.5"', drop: '23.5"', sleeve: '10.0"' },
    { size: 'XXL', chest: '50"', length: '32.0"', drop: '24.5"', sleeve: '10.5"' }
  ];

  const dataCm = [
    { size: 'Small (S)', chest: '106 cm', length: '72 cm', drop: '52 cm', sleeve: '21.5 cm' },
    { size: 'Medium (M)', chest: '112 cm', length: '75 cm', drop: '54.5 cm', sleeve: '23 cm' },
    { size: 'Large (L)', chest: '117 cm', length: '77.5 cm', drop: '57 cm', sleeve: '24 cm' },
    { size: 'XL', chest: '122 cm', length: '80 cm', drop: '60 cm', sleeve: '25.5 cm' },
    { size: 'XXL', chest: '127 cm', length: '81.5 cm', drop: '62 cm', sleeve: '26.5 cm' }
  ];

  const activeData = unit === 'inches' ? dataInches : dataCm;

  return (
    <div className="w-full pt-24 pb-20 px-4 sm:px-6 md:px-12 lg:px-16 max-w-5xl mx-auto flex flex-col gap-10">
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
          FIT GUIDE • PAGE 06
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-extrabold uppercase text-[#C85A32] tracking-wider block">
          STREETWEAR SPECIFICATION
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#432F2E] mt-1.5 uppercase">
          SIZE GUIDE &amp; DRAPE
        </h2>
        <p className="text-sm sm:text-base text-[#432F2E]/80 mt-3 leading-relaxed">
          Intentionally tailored with an oversized boxy silhouette. Below are garment dimensions taken flat.
        </p>
      </div>

      {/* Unit Switcher & Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#432F2E]/10 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between bg-[#FCF8ED] p-2.5 rounded-2xl border border-[#432F2E]/10">
          <span className="text-xs font-bold text-[#432F2E]/80 px-2 uppercase">
            Measurement Standard:
          </span>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-xs">
            <button
              onClick={() => setUnit('inches')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unit === 'inches'
                  ? 'bg-[#432F2E] text-[#FEEFB8]'
                  : 'text-[#432F2E]/70 hover:text-[#432F2E]'
              }`}
            >
              Inches (")
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unit === 'cm'
                  ? 'bg-[#432F2E] text-[#FEEFB8]'
                  : 'text-[#432F2E]/70 hover:text-[#432F2E]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#432F2E]/10">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FCF8ED] text-[#432F2E] uppercase font-bold text-[11px] border-b border-[#432F2E]/10">
              <tr>
                <th className="p-3.5">Size</th>
                <th className="p-3.5">Chest Width</th>
                <th className="p-3.5">Back Length</th>
                <th className="p-3.5">Shoulder Drop</th>
                <th className="p-3.5">Sleeve Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#432F2E]/8 text-[#432F2E]">
              {activeData.map((row, i) => (
                <tr key={row.size} className={i % 2 === 1 ? 'bg-[#FCF8ED]/40' : ''}>
                  <td className="p-3.5 font-bold font-display">{row.size}</td>
                  <td className="p-3.5">{row.chest}</td>
                  <td className="p-3.5">{row.length}</td>
                  <td className="p-3.5">{row.drop}</td>
                  <td className="p-3.5">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Fit Advisor */}
      <div className="bg-[#FFF0EF]/80 p-6 sm:p-8 rounded-3xl border border-[#432F2E]/10 flex flex-col gap-4">
        <span className="text-xs font-extrabold uppercase text-[#C85A32] tracking-wider">
          PERSONALIZED FIT RECOMMENDATION
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-xs font-bold text-[#432F2E]/80 block mb-1">
              Your Height Bracket:
            </label>
            <select
              value={userHeight}
              onChange={e => setUserHeight(e.target.value)}
              className="w-full bg-white p-3 rounded-xl border border-[#432F2E]/15 font-semibold text-[#432F2E]"
            >
              <option value="5ft 4in - 5ft 7in">5ft 4in – 5ft 7in (162 - 170 cm)</option>
              <option value="5ft 8in - 5ft 10in">5ft 8in – 5ft 10in (172 - 178 cm)</option>
              <option value="5ft 11in - 6ft 1in">5ft 11in – 6ft 1in (180 - 185 cm)</option>
              <option value="6ft 2in+">6ft 2in+ (188+ cm)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-[#432F2E]/80 block mb-1">
              Desired Drape Style:
            </label>
            <select
              value={fitPreference}
              onChange={e => setFitPreference(e.target.value as any)}
              className="w-full bg-white p-3 rounded-xl border border-[#432F2E]/15 font-semibold text-[#432F2E]"
            >
              <option value="true-boxy">Signature Streetwear Boxy (Recommended)</option>
              <option value="relaxed">Relaxed Everyday Comfort</option>
              <option value="fitted">More Fitted / Closer to Body</option>
            </select>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#432F2E]/10 flex items-center justify-between mt-2">
          <span className="text-xs text-[#432F2E]/80">
            Optimal Selection for <strong>{userHeight}</strong>:
          </span>
          <span className="px-4 py-1.5 rounded-full bg-[#FEEFB8] text-[#432F2E] font-bold text-xs uppercase shadow-sm">
            {userHeight.includes('5ft 4') ? (fitPreference === 'fitted' ? 'SIZE S' : 'SIZE M') :
             userHeight.includes('5ft 8') ? (fitPreference === 'fitted' ? 'SIZE M' : 'SIZE L') :
             userHeight.includes('5ft 11') ? (fitPreference === 'fitted' ? 'SIZE L' : 'SIZE XL') :
             'SIZE XXL'}
          </span>
        </div>
      </div>

      {/* 7-Day Exchange Guarantee */}
      <div className="bg-white p-6 rounded-2xl border border-[#432F2E]/10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#C4DAE8] flex items-center justify-center shrink-0 text-[#432F2E]">
          <span className="material-symbols-outlined text-[24px]">swap_horiz</span>
        </div>
        <div>
          <h4 className="font-display font-bold text-base text-[#432F2E]">
            Hassle-Free 7-Day Doorstep Swaps
          </h4>
          <p className="text-xs text-[#432F2E]/70 mt-0.5">
            Still unsure? Order with confidence. If the drape doesn't sit the way you prefer, we arrange a free reverse pickup and instant size exchange within 7 days.
          </p>
        </div>
      </div>

      {/* Return to Shop CTA */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onBackToShop}
          className="px-8 py-4 bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer"
        >
          BACK TO STREETWEAR CATALOG
        </button>
      </div>
    </div>
  );
};
