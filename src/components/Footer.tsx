import React, { useState } from 'react';
import { ActivePage } from '../types';
import { BRAND_LOGO_URL } from '../data/products';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenSizeGuide: () => void;
  onOpenTrackOrder: () => void;
  onOpenSupport: () => void;
  activePage?: ActivePage;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSizeGuide,
  onOpenTrackOrder,
  onOpenSupport,
  activePage = 'home'
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#FCF8ED] text-[#432F2E] border-t border-[#432F2E]/10">
      <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <img
                src={BRAND_LOGO_URL}
                alt="Vintage Legacy Logo"
                className="h-8 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl text-[#432F2E]">
                Vintage Legacy
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#432F2E]/75 max-w-sm leading-relaxed mt-1">
              Expressive streetwear founded on heavy-gauge tactile fabrics, generous cuts, and raw garment construction. Designed in India for effortless daily wear.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#C4DAE8] text-[#432F2E] text-[10px] font-extrabold uppercase">
                HEAVYWEIGHT COTTON
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FEEFB8] text-[#432F2E] text-[10px] font-extrabold uppercase">
                DROP ARCHIVE 24
              </span>
            </div>
          </div>

          {/* Column 2: Garment Dispatch & Trust */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-extrabold text-[#432F2E]/60 uppercase tracking-wider">
              Garment Dispatch & Trust
            </span>
            <div className="flex flex-col gap-2 text-xs sm:text-sm text-[#432F2E]/80">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#432F2E] text-[20px]">
                  local_shipping
                </span>
                <span>Pan-India 48-Hour Dispatch</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#432F2E] text-[20px]">
                  account_balance_wallet
                </span>
                <span>Instant UPI, Cards & NetBanking</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#432F2E] text-[20px]">
                  autorenew
                </span>
                <span>Hassle-Free 7-Day Size Swaps</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-2.5 py-1 bg-white rounded-full text-[10px] font-bold text-[#432F2E] shadow-sm border border-[#432F2E]/10">
                UPI ENABLED
              </span>
              <span className="px-2.5 py-1 bg-white rounded-full text-[10px] font-bold text-[#432F2E] shadow-sm border border-[#432F2E]/10">
                DELHIVERY
              </span>
              <span className="px-2.5 py-1 bg-white rounded-full text-[10px] font-bold text-[#432F2E] shadow-sm border border-[#432F2E]/10">
                BLUEDART
              </span>
            </div>
          </div>

          {/* Column 3: Studio Support */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-extrabold text-[#432F2E]/60 uppercase tracking-wider">
              Studio Support
            </span>
            <div className="flex flex-col gap-2 text-xs sm:text-sm font-semibold text-[#432F2E]/80">
              {activePage !== 'size-guide' && (
                <button
                  onClick={onOpenSizeGuide}
                  className="text-left hover:text-[#C85A32] transition-colors cursor-pointer"
                >
                  Size Chart & Fit Guide
                </button>
              )}
              {activePage !== 'fit-fabric' && (
                <button
                  onClick={() => onNavigate('fit-fabric')}
                  className="text-left hover:text-[#C85A32] transition-colors cursor-pointer"
                >
                  Fabric Care & Weave
                </button>
              )}
              {activePage !== 'home' && (
                <button
                  onClick={() => onNavigate('home')}
                  className="text-left hover:text-[#C85A32] transition-colors cursor-pointer"
                >
                  Catalog &amp; Shop
                </button>
              )}
              {activePage !== 'our-story' && (
                <button
                  onClick={() => onNavigate('our-story')}
                  className="text-left hover:text-[#C85A32] transition-colors cursor-pointer"
                >
                  Our Story &amp; Heritage
                </button>
              )}
              {activePage !== 'archive' && (
                <button
                  onClick={() => onNavigate('archive')}
                  className="text-left hover:text-[#C85A32] transition-colors cursor-pointer"
                >
                  Archive Spotlight
                </button>
              )}
              <button
                onClick={onOpenTrackOrder}
                className="text-left hover:text-[#C85A32] transition-colors cursor-pointer"
              >
                Track Live Order
              </button>
              <button
                onClick={onOpenSupport}
                className="text-left hover:text-[#C85A32] transition-colors cursor-pointer"
              >
                Concierge Support
              </button>
            </div>
          </div>

          {/* Column 4: The Drop Bulletin */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-extrabold text-[#432F2E]/60 uppercase tracking-wider">
              The Drop Bulletin
            </span>
            <p className="text-xs sm:text-sm text-[#432F2E]/75">
              Receive SMS and dispatch manifests before public launches.
            </p>
            {subscribed ? (
              <div className="bg-[#FEEFB8] text-[#432F2E] px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#C85A32]">
                  check_circle
                </span>
                <span>You're on the early VIP drop list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-white px-4 py-2 rounded-full text-xs text-[#432F2E] placeholder:text-[#432F2E]/50 border border-[#432F2E]/15 focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                />
                <button
                  type="submit"
                  className="bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] p-2.5 rounded-full transition-colors flex items-center justify-center cursor-pointer shadow-sm"
                  aria-label="Subscribe"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-14 pt-8 border-t border-[#432F2E]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#432F2E]/60">
          <p>© 2025 Vintage Legacy Clothing Co. Crafted in India.</p>
          <div className="flex items-center gap-5 font-semibold">
            <span className="hover:text-[#432F2E] cursor-pointer">Privacy</span>
            <span className="hover:text-[#432F2E] cursor-pointer">Terms</span>
            <span className="hover:text-[#432F2E] cursor-pointer">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
