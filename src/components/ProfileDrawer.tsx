import React, { useState } from 'react';
import { USER_AVATAR_URL } from '../data/products';

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSizeGuide: () => void;
  currentUser?: { name: string; isLoggedIn: boolean } | null;
  onNavigateToSignIn?: () => void;
  onLogout?: () => void;
}

export const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  onOpenSizeGuide,
  currentUser,
  onNavigateToSignIn,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'support'>('orders');

  if (!isOpen) return null;

  const displayName = currentUser?.isLoggedIn ? currentUser.name : 'Guest Collector';

  return (
    <div className="fixed inset-0 z-50 bg-[#281716]/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FCF8ED] shadow-2xl h-full flex flex-col justify-between border-l border-[#432F2E]/10 animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-[#432F2E]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#432F2E] text-[#FEEFB8] font-display font-bold text-base flex items-center justify-center border-2 border-[#C85A32]">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#432F2E]">
                {displayName}
              </h3>
              <span className="text-[11px] font-bold text-[#C85A32] uppercase">
                {currentUser?.isLoggedIn ? 'VIP Drop Member • Tier 01' : 'Guest Account'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!currentUser?.isLoggedIn && onNavigateToSignIn && (
              <button
                onClick={() => {
                  onClose();
                  onNavigateToSignIn();
                }}
                className="px-3 py-1 bg-[#FEEFB8] hover:bg-[#F1E2AC] text-[#432F2E] text-xs font-bold rounded-full transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#FCF8ED] hover:bg-[#432F2E] hover:text-[#FEEFB8] text-[#432F2E] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-[#432F2E]/10 bg-white px-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#432F2E] text-[#432F2E]'
                : 'border-transparent text-[#432F2E]/60 hover:text-[#432F2E]'
            }`}
          >
            Active Orders
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#432F2E] text-[#432F2E]'
                : 'border-transparent text-[#432F2E]/60 hover:text-[#432F2E]'
            }`}
          >
            Saved Address
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`flex-1 py-3 text-xs font-bold transition-colors border-b-2 cursor-pointer ${
              activeTab === 'support'
                ? 'border-[#432F2E] text-[#432F2E]'
                : 'border-transparent text-[#432F2E]/60 hover:text-[#432F2E]'
            }`}
          >
            Concierge
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          {activeTab === 'orders' && (
            <div className="flex flex-col gap-4">
              <span className="text-xs font-extrabold uppercase text-[#432F2E]/60 tracking-wider">
                Live Dispatched Parcels (1)
              </span>

              {/* Order Card */}
              <div className="bg-white p-4 rounded-2xl border border-[#432F2E]/10 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-start border-b border-[#432F2E]/8 pb-2.5">
                  <div>
                    <span className="text-xs font-bold font-mono text-[#432F2E]">
                      #VL-81940
                    </span>
                    <p className="text-[11px] text-[#432F2E]/60">
                      Dispatched Yesterday via Delhivery Air
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#22c55e]/15 text-[#22c55e] text-[10px] font-extrabold uppercase">
                    In Transit
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex flex-col gap-1.5 py-1">
                  <div className="flex justify-between text-[11px] font-semibold text-[#432F2E]">
                    <span>Tiruppur Hub</span>
                    <span>Air Transit</span>
                    <span className="text-[#C85A32]">Out For Delivery Tomorrow</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#432F2E]/10 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-[#22c55e] rounded-full" />
                  </div>
                </div>

                <div className="bg-[#FCF8ED] p-2.5 rounded-xl text-xs text-[#432F2E]/80 flex items-center justify-between">
                  <span>Khorasan Rebel Tee (Size L)</span>
                  <span className="font-bold text-[#432F2E]">₹899</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => alert('Air Waybill Tracking: AWB9842104921 — Current location: Mumbai Gateway Air Cargo.')}
                    className="flex-1 py-2 bg-[#FCF8ED] hover:bg-[#FEEFB8] border border-[#432F2E]/15 rounded-xl text-xs font-bold text-[#432F2E] transition-colors cursor-pointer"
                  >
                    View Live AWB
                  </button>
                  <button
                    onClick={onOpenSizeGuide}
                    className="flex-1 py-2 bg-[#FCF8ED] hover:bg-[#FEEFB8] border border-[#432F2E]/15 rounded-xl text-xs font-bold text-[#432F2E] transition-colors cursor-pointer"
                  >
                    Size Exchange
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="flex flex-col gap-4">
              <span className="text-xs font-extrabold uppercase text-[#432F2E]/60 tracking-wider">
                Default Indian Delivery Address
              </span>
              <div className="bg-white p-4 rounded-2xl border border-[#432F2E]/10 shadow-sm text-xs leading-relaxed text-[#432F2E]">
                <div className="flex items-center justify-between font-bold mb-1">
                  <span>Kanishk Vyas</span>
                  <span className="text-[10px] bg-[#FEEFB8] px-2 py-0.5 rounded-full text-[#432F2E]">
                    PRIMARY
                  </span>
                </div>
                <p className="text-[#432F2E]/80">
                  Flat 402, Skyline Residency, Bandra West<br />
                  Mumbai, Maharashtra — 400050<br />
                  Contact: +91 98765 43210
                </p>
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="flex flex-col gap-3">
              <span className="text-xs font-extrabold uppercase text-[#432F2E]/60 tracking-wider">
                Direct Studio Concierge
              </span>
              <div className="bg-white p-4 rounded-2xl border border-[#432F2E]/10 text-xs text-[#432F2E]/80 flex flex-col gap-2">
                <p>
                  Have sizing questions or need custom dispatch instructions? Our studio team in Tiruppur is active Monday through Saturday, 10 AM to 7 PM IST.
                </p>
                <div className="pt-2 flex flex-col gap-1.5">
                  <a
                    href="mailto:support@vintagelegacy.in"
                    className="flex items-center gap-2 p-2 bg-[#FCF8ED] rounded-xl font-bold text-[#432F2E] hover:bg-[#FEEFB8] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                    <span>support@vintagelegacy.in</span>
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="flex items-center gap-2 p-2 bg-[#FCF8ED] rounded-xl font-bold text-[#432F2E] hover:bg-[#FEEFB8] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    <span>+91 (0) 421 289 4021</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#432F2E]/10 bg-white text-center flex flex-col gap-2">
          {currentUser?.isLoggedIn && onLogout && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2 bg-[#FCF8ED] hover:bg-[#ba1a1a]/15 text-[#ba1a1a] rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Sign Out Account
            </button>
          )}
          <p className="text-[11px] text-[#432F2E]/50">
            Vintage Legacy Clothing Co. • Handcrafted in Coimbatore &amp; Tiruppur
          </p>
        </div>
      </div>
    </div>
  );
};
