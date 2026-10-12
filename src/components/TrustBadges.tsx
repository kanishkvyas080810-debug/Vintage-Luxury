import React from 'react';

export const TrustBadges: React.FC = () => {
  const perks = [
    {
      icon: 'local_shipping',
      bgColor: 'bg-[#FEEFB8]',
      title: 'Fast Pan-India Shipping',
      desc: 'Orders dispatched within 48 business hours with verified air-tracking. Free on carts ₹1,499+.'
    },
    {
      icon: 'swap_horiz',
      bgColor: 'bg-[#C4DAE8]',
      title: '7-Day Size Swaps',
      desc: 'Unsure about the oversized drape? Enjoy simple, doorstep reverse-pickup size exchanges.'
    },
    {
      icon: 'shield',
      bgColor: 'bg-[#F1E2AC]',
      title: 'UPI & COD Available',
      desc: 'Instant 1-click Google Pay, PhonePe, Paytm, credit cards, or Cash on Delivery at your door.'
    },
    {
      icon: 'verified',
      bgColor: 'bg-[#FBDBD9]',
      title: '100% Pure Indian Cotton',
      desc: 'Consciously knitted, tailored, and screenprinted domestically in Coimbatore & Tiruppur.'
    }
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {perks.map((perk, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm border border-[#432F2E]/8 flex flex-col gap-2 hover:-translate-y-1 transition-transform"
          >
            <div className={`w-11 h-11 rounded-full ${perk.bgColor} flex items-center justify-center text-[#432F2E] mb-1 shadow-sm`}>
              <span className="material-symbols-outlined text-[22px]">{perk.icon}</span>
            </div>
            <h4 className="font-display font-bold text-base text-[#432F2E]">
              {perk.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#432F2E]/70 leading-relaxed">
              {perk.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
