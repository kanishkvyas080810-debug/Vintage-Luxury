import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const tickerItems = [
    '★ 100% COMBED COTTON',
    '★ BOXY STREETWEAR SILHOUETTES',
    '★ DROP SHOULDER FIT',
    '★ ALL-INDIA EXPRESS DELIVERY',
    '★ CASH ON DELIVERY & UPI',
    '★ PRE-SHRUNK FABRIC',
    '★ 240 GSM WEIGHT'
  ];

  return (
    <div className="w-full bg-[#432F2E] py-4 overflow-hidden relative transform -rotate-1 scale-[1.02] shadow-xl my-10 select-none z-10 border-y border-[#FEEFB8]/20">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {/* Sequence 1 */}
        <div className="flex items-center gap-8 shrink-0 px-4">
          {tickerItems.map((item, idx) => (
            <span
              key={idx}
              className="font-display font-bold text-sm sm:text-base text-[#FEEFB8] tracking-widest uppercase flex items-center gap-2"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Duplicate for seamless infinite marquee loop */}
        <div className="flex items-center gap-8 shrink-0 px-4" aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <span
              key={`dup-${idx}`}
              className="font-display font-bold text-sm sm:text-base text-[#FEEFB8] tracking-widest uppercase flex items-center gap-2"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
