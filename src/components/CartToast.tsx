import React from 'react';

interface CartToastProps {
  visible: boolean;
  itemText: string;
  onViewCart: () => void;
}

export const CartToast: React.FC<CartToastProps> = ({
  visible,
  itemText,
  onViewCart
}) => {
  if (!visible) return null;

  return (
    <aside
      aria-label="Notification"
      onClick={onViewCart}
      className="fixed bottom-6 right-6 z-50 bg-[#432F2E] text-[#FEEFB8] px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#FEEFB8]/20 animate-in slide-in-from-bottom-6 fade-in duration-300 cursor-pointer hover:bg-[#C85A32] transition-colors"
    >
      <span className="material-symbols-outlined text-[#22c55e] text-[20px]">
        check_circle
      </span>
      <span className="text-xs font-bold tracking-wide">
        {itemText || 'Added to bag'} • Tap to View Cart
      </span>
      <span className="material-symbols-outlined text-[16px]">
        arrow_forward
      </span>
    </aside>
  );
};
