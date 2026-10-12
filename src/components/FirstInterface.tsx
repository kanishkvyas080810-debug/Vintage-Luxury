import React, { useState } from 'react';
import { DitherBackground } from './DitherBackground';
import { ActivePage } from '../types';
import { BRAND_LOGO_URL } from '../data/products';

interface FirstInterfaceProps {
  onNavigate: (page: ActivePage) => void;
}

export const FirstInterface: React.FC<FirstInterfaceProps> = ({ onNavigate }) => {
  const [colorMode, setColorMode] = useState<'rust' | 'cyber' | 'butter'>('rust');

  const paletteMap = {
    rust: {
      wave: [0.78, 0.35, 0.20] as [number, number, number], // Heritage Rust
      bg: [0.15, 0.09, 0.09] as [number, number, number],   // Rich Espresso
      label: 'Rust Noir'
    },
    butter: {
      wave: [0.99, 0.94, 0.72] as [number, number, number], // Butter Yellow
      bg: [0.20, 0.14, 0.13] as [number, number, number],   // Espresso
      label: 'Butter Sun'
    },
    cyber: {
      wave: [0.30, 0.65, 0.85] as [number, number, number], // Powder Blue
      bg: [0.08, 0.12, 0.16] as [number, number, number],   // Deep Indigo Slate
      label: 'Acid Cyan'
    }
  };

  const currentPalette = paletteMap[colorMode];

  const menuItems: { id: ActivePage; label: string; number: string; desc: string }[] = [
    { id: 'shop', label: 'SHOP CATALOG', number: '01', desc: '8 Verified Drops • Under ₹999' },
    { id: 'archive', label: 'ARCHIVE SPOTLIGHT', number: '02', desc: 'Series VL-01 Featured Pieces' },
    { id: 'fit-fabric', label: 'FIT & FABRIC', number: '03', desc: '240 GSM Drop-Shoulder Engine' },
    { id: 'our-story', label: 'OUR STORY', number: '04', desc: 'Coimbatore & Tiruppur Heritage' },
    { id: 'size-guide', label: 'SIZE GUIDE', number: '05', desc: 'Measurements & Drape Specifications' }
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#241716] text-[#FCF8ED] flex flex-col justify-between overflow-hidden select-none">
      {/* Interactive WebGL Dither Shader Background */}
      <DitherBackground
        waveColor={currentPalette.wave}
        backgroundColor={currentPalette.bg}
        colorNum={4.5}
        pixelSize={2.5}
        waveSpeed={0.04}
        waveFrequency={3.0}
        waveAmplitude={0.45}
        enableMouseInteraction={true}
        mouseRadius={0.7}
      />

      {/* Subtle vignette and texture overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#241716]/30 to-[#180f0e]/80 pointer-events-none" />

      {/* Top Bar on Dither: Logo & Palette Switcher */}
      <header className="relative z-10 w-full px-6 md:px-12 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={BRAND_LOGO_URL}
            alt="Vintage Legacy Monogram"
            className="w-9 h-9 object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          />
          <span className="font-display font-bold text-sm tracking-widest text-[#FEEFB8]/90 uppercase hidden sm:inline-block">
            Vintage Legacy Co.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Subtle Colorway Selector for the Dither Shader */}
          <div className="flex items-center gap-1 bg-[#180f0e]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FEEFB8]/70 mr-1 hidden md:inline">
              VIBE:
            </span>
            {(['rust', 'butter', 'cyber'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setColorMode(mode)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                  colorMode === mode
                    ? 'bg-[#FEEFB8] text-[#432F2E] shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {paletteMap[mode].label}
              </button>
            ))}
          </div>

          {/* Quick Direct Jump into Shop */}
          <button
            onClick={() => onNavigate('shop')}
            className="group flex items-center gap-2 bg-[#FEEFB8] text-[#432F2E] px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-lg active:scale-95"
          >
            <span>ENTER STORE</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </header>

      {/* Center Zone: Sculptural Brand Name & Navigation Menu */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto my-auto w-full py-10">
        {/* Subtle Series Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[#FEEFB8] text-xs font-bold uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C85A32] animate-ping" />
          <span>DROP ARCHIVE 01 • 240 GSM HEAVYWEIGHT</span>
        </div>

        {/* Sculptural Brand Title */}
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#FEEFB8] drop-shadow-[0_8px_30px_rgba(0,0,0,0.85)] uppercase text-center leading-[0.95] mb-4">
          VINTAGE<br />
          <span className="text-[#FFFFFF] tracking-normal italic">LEGACY</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-[#FCF8ED]/80 max-w-xl text-center font-normal tracking-wide mb-10 drop-shadow">
          Expressive streetwear founded on heavy-gauge tactile fabrics, raw boxy silhouettes, and drop-culture permanence.
        </p>

        {/* The Navigation Menu to Navigate to Other Pages */}
        <nav
          aria-label="Brand Navigation"
          className="w-full max-w-2xl bg-[#180f0e]/85 backdrop-blur-xl border border-white/15 rounded-2xl p-2 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col gap-1.5"
        >
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="group w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl hover:bg-[#FEEFB8] hover:text-[#432F2E] transition-all duration-300 text-left active:scale-[0.99]"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-mono text-xs font-bold text-[#C85A32] group-hover:text-[#432F2E]/70 transition-colors">
                  {item.number}
                </span>
                <div>
                  <span className="font-display font-bold text-base sm:text-lg md:text-xl text-[#FCF8ED] group-hover:text-[#432F2E] tracking-tight block">
                    {item.label}
                  </span>
                  <span className="text-[11px] sm:text-xs text-white/50 group-hover:text-[#432F2E]/80 transition-colors block">
                    {item.desc}
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#432F2E] text-white/70 group-hover:text-[#FEEFB8] flex items-center justify-center transition-all group-hover:translate-x-1">
                <span className="material-symbols-outlined text-[18px]">
                  north_east
                </span>
              </div>
            </button>
          ))}
        </nav>
      </main>

      {/* Bottom Footer Details */}
      <footer className="relative z-10 w-full px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 border-t border-white/10 bg-[#180f0e]/40 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span>Tiruppur & Coimbatore Weave</span>
          <span>•</span>
          <span>100% Combed Ringspun Cotton</span>
        </div>
        <div className="flex items-center gap-2 text-[#FEEFB8]/80 font-mono text-[11px]">
          <span>INTERACTIVE SHADER • MOVE CURSOR TO RIPPLE</span>
        </div>
      </footer>
    </div>
  );
};
