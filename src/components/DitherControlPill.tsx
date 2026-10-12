import React from 'react';
import { soundFX } from '../utils/sound';

interface DitherControlPillProps {
  active: boolean;
  onToggle: () => void;
  vibe: 'rust' | 'butter' | 'cyber';
  onVibeChange: (vibe: 'rust' | 'butter' | 'cyber') => void;
  onOpenFullscreen?: () => void;
}

export const DitherControlPill: React.FC<DitherControlPillProps> = ({
  active,
  onToggle,
  vibe,
  onVibeChange,
  onOpenFullscreen
}) => {
  return (
    <div className="flex items-center gap-1.5 bg-[#FCF8ED]/95 hover:bg-white backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#432F2E]/20 shadow-[0_4px_16px_rgba(67,47,46,0.1)] transition-all">
      {/* Primary Dither Toggle Button */}
      <button
        onClick={() => {
          soundFX.playToggle();
          onToggle();
        }}
        type="button"
        className="flex items-center gap-2 cursor-pointer text-left"
        title="Toggle retro WebGL Bayer dither background"
      >
        <span className={`w-2.5 h-2.5 rounded-full transition-all ${
          active ? 'bg-[#C85A32] animate-pulse ring-2 ring-[#C85A32]/40' : 'bg-[#432F2E]/30'
        }`} />
        <span className="font-display font-extrabold text-xs text-[#432F2E] tracking-tight uppercase flex items-center gap-1">
          <span>DITHER FX</span>
          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
            active ? 'bg-[#C85A32] text-white' : 'bg-[#432F2E]/10 text-[#432F2E]/70'
          }`}>
            {active ? 'ON' : 'OFF'}
          </span>
        </span>
      </button>

      {/* Palette Dots when active */}
      {active && (
        <div className="flex items-center gap-1 pl-1 border-l border-[#432F2E]/15 ml-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playTap();
              onVibeChange('rust');
            }}
            className={`w-3.5 h-3.5 rounded-full bg-[#C85A32] transition-transform cursor-pointer ${
              vibe === 'rust' ? 'scale-125 ring-2 ring-[#432F2E]' : 'opacity-60 hover:opacity-100'
            }`}
            title="Rust Noir"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playTap();
              onVibeChange('butter');
            }}
            className={`w-3.5 h-3.5 rounded-full bg-[#FEEFB8] border border-[#432F2E]/20 transition-transform cursor-pointer ${
              vibe === 'butter' ? 'scale-125 ring-2 ring-[#432F2E]' : 'opacity-60 hover:opacity-100'
            }`}
            title="Butter Sun"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playTap();
              onVibeChange('cyber');
            }}
            className={`w-3.5 h-3.5 rounded-full bg-[#C4DAE8] transition-transform cursor-pointer ${
              vibe === 'cyber' ? 'scale-125 ring-2 ring-[#432F2E]' : 'opacity-60 hover:opacity-100'
            }`}
            title="Acid Cyan"
          />
        </div>
      )}

      {/* Expand Fullscreen Button */}
      {onOpenFullscreen && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playPop();
            onOpenFullscreen();
          }}
          className="text-[#432F2E]/60 hover:text-[#C85A32] pl-1 transition-colors cursor-pointer"
          title="Fullscreen Dither Mode"
        >
          <span className="material-symbols-outlined text-[16px]">fullscreen</span>
        </button>
      )}
    </div>
  );
};
