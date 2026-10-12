import React, { useState } from 'react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [userHeight, setUserHeight] = useState<string>('5ft 10in');
  const [fitPreference, setFitPreference] = useState<'relaxed' | 'true-boxy' | 'fitted'>('true-boxy');

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 bg-[#281716]/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col gap-5 border border-[#432F2E]/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-extrabold text-[#C85A32] uppercase tracking-wider block">
              STREETWEAR SPECIFICATION
            </span>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#432F2E] mt-0.5">
              Vintage Legacy Size Chart
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FCF8ED] hover:bg-[#432F2E] hover:text-[#FEEFB8] text-[#432F2E] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#432F2E]/80 leading-relaxed">
          Our t-shirts are intentionally designed with an <strong>oversized boxy silhouette</strong> with a 5.5cm extended drop shoulder. Choose your regular standard size for the intended streetwear drape, or size down by one for a fitted cut.
        </p>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between bg-[#FCF8ED] p-2 rounded-2xl border border-[#432F2E]/10">
          <span className="text-xs font-bold text-[#432F2E]/70 px-2 uppercase">
            Measurement Units:
          </span>
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-xs">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unit === 'inches'
                  ? 'bg-[#432F2E] text-[#FEEFB8]'
                  : 'text-[#432F2E]/70 hover:text-[#432F2E]'
              }`}
            >
              Inches (")
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                unit === 'cm'
                  ? 'bg-[#432F2E] text-[#FEEFB8]'
                  : 'text-[#432F2E]/70 hover:text-[#432F2E]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table Representation */}
        <div className="overflow-x-auto rounded-2xl border border-[#432F2E]/10">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#FCF8ED] font-bold text-[#432F2E] uppercase text-[11px] border-b border-[#432F2E]/10">
              <tr>
                <th className="p-3">Size</th>
                <th className="p-3">Chest Width</th>
                <th className="p-3">Back Length</th>
                <th className="p-3">Shoulder Drop</th>
                <th className="p-3">Sleeve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#432F2E]/8 text-[#432F2E]">
              {activeData.map((row, i) => (
                <tr key={row.size} className={i % 2 === 1 ? 'bg-[#FCF8ED]/40' : ''}>
                  <td className="p-3 font-bold font-display">{row.size}</td>
                  <td className="p-3">{row.chest}</td>
                  <td className="p-3">{row.length}</td>
                  <td className="p-3">{row.drop}</td>
                  <td className="p-3">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Interactive Fit Recommender */}
        <div className="p-4 rounded-2xl bg-[#FFF0EF]/70 border border-[#432F2E]/10 flex flex-col gap-2.5">
          <span className="text-[11px] font-extrabold uppercase text-[#C85A32] tracking-wider">
            QUICK FIT ADVISOR
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-semibold text-[#432F2E]/70 block mb-1">
                Your Approximate Height:
              </label>
              <select
                value={userHeight}
                onChange={(e) => setUserHeight(e.target.value)}
                className="w-full bg-white p-2 rounded-xl border border-[#432F2E]/15 font-semibold text-[#432F2E]"
              >
                <option value="5ft 4in - 5ft 7in">5ft 4in – 5ft 7in (162 - 170 cm)</option>
                <option value="5ft 8in - 5ft 10in">5ft 8in – 5ft 10in (172 - 178 cm)</option>
                <option value="5ft 11in - 6ft 1in">5ft 11in – 6ft 1in (180 - 185 cm)</option>
                <option value="6ft 2in+">6ft 2in+ (188+ cm)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#432F2E]/70 block mb-1">
                Desired Drape Style:
              </label>
              <select
                value={fitPreference}
                onChange={(e) => setFitPreference(e.target.value as any)}
                className="w-full bg-white p-2 rounded-xl border border-[#432F2E]/15 font-semibold text-[#432F2E]"
              >
                <option value="true-boxy">Signature Streetwear Oversized</option>
                <option value="relaxed">Relaxed Everyday Comfort</option>
                <option value="fitted">More Fitted / Regular</option>
              </select>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-[#432F2E]/10 flex items-center justify-between mt-1">
            <span className="text-xs text-[#432F2E]/80">
              Recommended Choice for <strong className="text-[#432F2E]">{userHeight}</strong>:
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FEEFB8] text-[#432F2E] font-bold text-xs shadow-xs">
              {userHeight.includes('5ft 4') ? (fitPreference === 'fitted' ? 'SIZE S' : 'SIZE M') :
               userHeight.includes('5ft 8') ? (fitPreference === 'fitted' ? 'SIZE M' : 'SIZE L') :
               userHeight.includes('5ft 11') ? (fitPreference === 'fitted' ? 'SIZE L' : 'SIZE XL') :
               'SIZE XXL'}
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md active:scale-95"
          >
            GOT IT — CONTINUE BROWSING
          </button>
        </div>
      </div>
    </div>
  );
};
