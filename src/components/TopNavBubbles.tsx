import React from 'react';
import { DitherControlPill } from './DitherControlPill';

interface TopNavBubblesProps {
  cartCount: number;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  currentUser?: { name: string; isLoggedIn: boolean } | null;
  ditherActive: boolean;
  onToggleDither: () => void;
  ditherVibe: 'rust' | 'butter' | 'cyber';
  onDitherVibeChange: (vibe: 'rust' | 'butter' | 'cyber') => void;
  onOpenDitherFullscreen: () => void;
  activePage: string;
}

export const TopNavBubbles: React.FC<TopNavBubblesProps> = ({
  cartCount,
  onOpenSearch,
  onOpenCart,
  onOpenProfile,
  currentUser,
  ditherActive,
  onToggleDither,
  ditherVibe,
  onDitherVibeChange,
  onOpenDitherFullscreen,
  activePage
}) => {
  const isHomePage = activePage === 'home' || activePage === 'shop';

  return (
    <header className="fixed top-0 inset-x-0 z-40 pointer-events-none px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between">
      {/* Spacer on the left to match StaggeredMenu position */}
      <div className="w-24 sm:w-28 shrink-0 pointer-events-none" />

      {/* Center: The Dither Option on Top Between Menu and Search (Hidden when on other pages) */}
      <div className="pointer-events-auto flex items-center justify-center">
        {isHomePage ? (
          <DitherControlPill
            active={ditherActive}
            onToggle={onToggleDither}
            vibe={ditherVibe}
            onVibeChange={onDitherVibeChange}
            onOpenFullscreen={onOpenDitherFullscreen}
          />
        ) : (
          <div className="h-9 pointer-events-none" />
        )}
      </div>

      {/* Right: The 3 Separate Bubbles (Search, Bag, Profile) */}
      <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Bubble 1: Search */}
        <button
          onClick={onOpenSearch}
          type="button"
          aria-label="Search catalog"
          title="Search catalog"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FCF8ED]/95 hover:bg-[#FEEFB8] backdrop-blur-md border border-[#432F2E]/15 shadow-[0_4px_16px_rgba(67,47,46,0.12)] flex items-center justify-center text-[#432F2E] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        {/* Bubble 2: Shopping Bag */}
        <button
          onClick={onOpenCart}
          type="button"
          aria-label={`Shopping bag (${cartCount} items)`}
          title="Shopping bag"
          className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FEEFB8] hover:bg-[#F1E2AC] backdrop-blur-md border border-[#432F2E]/15 shadow-[0_4px_16px_rgba(67,47,46,0.12)] flex items-center justify-center text-[#432F2E] transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#432F2E] text-[#FEEFB8] text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-xs border border-white/20">
              {cartCount}
            </span>
          )}
        </button>

        {/* Bubble 3: Profile / Sign In */}
        <button
          onClick={onOpenProfile}
          type="button"
          aria-label={currentUser?.isLoggedIn ? `Profile: ${currentUser.name}` : 'Sign In'}
          title={currentUser?.isLoggedIn ? `Profile: ${currentUser.name}` : 'Sign In'}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FCF8ED]/95 hover:bg-[#FEEFB8] backdrop-blur-md border border-[#432F2E]/15 shadow-[0_4px_16px_rgba(67,47,46,0.12)] flex items-center justify-center text-[#432F2E] hover:ring-2 hover:ring-[#C85A32] transition-all hover:scale-105 active:scale-95 cursor-pointer overflow-hidden p-0.5"
        >
          {currentUser?.isLoggedIn ? (
            <div className="w-full h-full rounded-full bg-[#432F2E] text-[#FEEFB8] font-display font-bold text-sm flex items-center justify-center">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <span className="material-symbols-outlined text-[21px]">person</span>
          )}
        </button>
      </div>
    </header>
  );
};
