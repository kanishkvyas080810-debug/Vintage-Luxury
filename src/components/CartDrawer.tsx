import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckoutSuccess: (orderInfo: { id: string; total: number; itemCount: number }) => void;
  onBrowse: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
  onBrowse
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  // Slide commit slider states
  const [sliderProgress, setSliderProgress] = useState<number>(0);
  const [isSliding, setIsSliding] = useState<boolean>(false);
  const [isCommitting, setIsCommitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 1499;
  const freeShippingMet = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = freeShippingMet ? 0 : 99;
  const discountAmount = Math.round(subtotal * appliedDiscount);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'LEGACY10' || code === 'DROP10' || code === 'STREET10') {
      setAppliedDiscount(0.10);
      setCouponSuccess('10% VIP Drop discount applied!');
      setCouponError(null);
    } else {
      setCouponError('Invalid code. Use DROP10 for 10% off.');
      setCouponSuccess(null);
    }
  };

  const handleSliderCommit = () => {
    setIsCommitting(true);
    setTimeout(() => {
      setIsCommitting(false);
      setSliderProgress(0);
      onCheckoutSuccess({
        id: `VL-${Math.floor(10000 + Math.random() * 90000)}`,
        total: finalTotal,
        itemCount: items.reduce((s, i) => s + i.quantity, 0)
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#281716]/70 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FCF8ED] shadow-2xl h-full flex flex-col justify-between border-l border-[#432F2E]/10 animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#432F2E]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px] text-[#432F2E]">
              shopping_bag
            </span>
            <h3 className="font-display font-extrabold text-lg text-[#432F2E]">
              Your Shopping Bag
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#FEEFB8] text-[#432F2E] text-xs font-bold">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FCF8ED] hover:bg-[#432F2E] hover:text-[#FEEFB8] text-[#432F2E] flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-[#FFF0EF] border-b border-[#432F2E]/10 text-xs">
          {freeShippingMet ? (
            <div className="flex items-center gap-2 text-[#22c55e] font-bold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Congratulations! You unlocked FREE Pan-India Shipping!</span>
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between font-medium text-[#432F2E]">
                <span>Add ₹{freeShippingThreshold - subtotal} more for Free Air Delivery</span>
                <span className="font-bold">₹{subtotal} / ₹{freeShippingThreshold}</span>
              </div>
              <div className="w-full h-1.5 bg-[#432F2E]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C85A32] rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="my-auto text-center flex flex-col items-center gap-3 py-10">
              <div className="w-16 h-16 rounded-full bg-[#FEEFB8] flex items-center justify-center text-[#432F2E]">
                <span className="material-symbols-outlined text-[32px]">production_quantity_limits</span>
              </div>
              <h4 className="font-display font-bold text-lg text-[#432F2E]">
                Your bag is empty
              </h4>
              <p className="text-xs text-[#432F2E]/60 max-w-xs">
                Explore our 240 GSM heavy combed cotton drops and add your daily essentials.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowse();
                }}
                className="mt-2 px-6 py-2.5 rounded-full bg-[#432F2E] text-[#FEEFB8] text-xs font-bold uppercase tracking-wider hover:bg-[#C85A32] transition-colors cursor-pointer shadow-md"
              >
                Browse Essential Drops
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 bg-white p-3 rounded-2xl border border-[#432F2E]/8 shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-20 object-contain bg-[#FCF8ED] rounded-xl p-1 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h5 className="font-display font-bold text-sm text-[#432F2E] truncate">
                    {item.product.name}
                  </h5>
                  <div className="flex items-center gap-2 text-xs text-[#432F2E]/60 mt-0.5">
                    <span className="font-bold text-[#C85A32]">Size: {item.size}</span>
                    <span>•</span>
                    <span>240 GSM</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-display font-extrabold text-sm text-[#432F2E]">
                      ₹{item.product.price * item.quantity}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-[#FCF8ED] rounded-lg border border-[#432F2E]/10 p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-[#432F2E] hover:bg-white cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-[#432F2E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-[#432F2E] hover:bg-white cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[#432F2E]/40 hover:text-[#ba1a1a] hover:bg-[#ba1a1a]/10 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Area: Coupon & Checkout */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-[#432F2E]/10 flex flex-col gap-3.5 shadow-lg">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="PROMO CODE (TRY: DROP10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 bg-[#FCF8ED] px-3.5 py-2 rounded-xl text-xs uppercase font-bold text-[#432F2E] placeholder:text-[#432F2E]/40 border border-[#432F2E]/15 focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FCF8ED] hover:bg-[#FEEFB8] border border-[#432F2E]/20 text-[#432F2E] font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {couponSuccess && (
              <p className="text-[11px] text-[#22c55e] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                {couponSuccess}
              </p>
            )}

            {couponError && (
              <p className="text-[11px] text-[#ba1a1a] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                {couponError}
              </p>
            )}

            {/* Calculations */}
            <div className="flex flex-col gap-1.5 text-xs text-[#432F2E]/80 border-t border-[#432F2E]/5 pt-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#432F2E]">₹{subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#22c55e] font-bold">
                  <span>VIP Drop Discount (10%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Pan-India Air Shipping</span>
                <span className={shippingFee === 0 ? 'text-[#22c55e] font-bold' : 'font-bold text-[#432F2E]'}>
                  {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#432F2E] pt-1.5 border-t border-[#432F2E]/10">
                <span>Total Payable</span>
                <span className="text-[#C85A32] font-display text-lg">₹{finalTotal}</span>
              </div>
            </div>

            {/* Interactive SlideCommit Slider for Streetwear Checkout */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="relative w-full h-14 bg-[#432F2E] rounded-full p-1 select-none flex items-center overflow-hidden border border-[#FEEFB8]/20">
                {/* Background Instruction Label */}
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold uppercase tracking-wider text-[#FEEFB8]/80 pointer-events-none">
                  {isCommitting ? 'Confirming Drop...' : 'Slide to Place Order • COD / UPI'}
                </span>

                {/* Draggable/Sliding Handle */}
                <div
                  className="h-12 w-14 rounded-full bg-[#FEEFB8] text-[#432F2E] flex items-center justify-center font-bold shadow-lg transition-transform cursor-grab active:cursor-grabbing z-10 hover:scale-105 active:scale-95"
                  style={{
                    transform: `translateX(${sliderProgress}px)`
                  }}
                  onMouseDown={(e) => {
                    const startX = e.clientX;
                    const maxSlide = 280; // approximate travel width
                    setIsSliding(true);

                    const onMouseMove = (ev: MouseEvent) => {
                      const delta = Math.max(0, Math.min(maxSlide, ev.clientX - startX));
                      setSliderProgress(delta);
                      if (delta >= maxSlide * 0.85) {
                        handleSliderCommit();
                        cleanup();
                      }
                    };

                    const cleanup = () => {
                      window.removeEventListener('mousemove', onMouseMove);
                      window.removeEventListener('mouseup', onMouseUp);
                      setIsSliding(false);
                      setSliderProgress(0);
                    };

                    const onMouseUp = () => {
                      cleanup();
                    };

                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp);
                  }}
                  onTouchStart={(e) => {
                    const startX = e.touches[0].clientX;
                    const maxSlide = 260;
                    setIsSliding(true);

                    const onTouchMove = (ev: TouchEvent) => {
                      const delta = Math.max(0, Math.min(maxSlide, ev.touches[0].clientX - startX));
                      setSliderProgress(delta);
                      if (delta >= maxSlide * 0.85) {
                        handleSliderCommit();
                        cleanup();
                      }
                    };

                    const cleanup = () => {
                      window.removeEventListener('touchmove', onTouchMove);
                      window.removeEventListener('touchend', onTouchEnd);
                      setIsSliding(false);
                      setSliderProgress(0);
                    };

                    const onTouchEnd = () => {
                      cleanup();
                    };

                    window.addEventListener('touchmove', onTouchMove);
                    window.addEventListener('touchend', onTouchEnd);
                  }}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </div>
              </div>

              {/* Direct 1-Click Alternate Button */}
              <button
                onClick={handleSliderCommit}
                className="text-center text-[11px] font-bold text-[#C85A32] hover:underline cursor-pointer py-1"
              >
                Or click here for Instant 1-Click UPI / COD Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
