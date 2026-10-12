import React, { useState } from 'react';
import { Product, ProductSize } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide
}) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#281716]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-[#432F2E]/10 max-h-[92vh] flex flex-col md:flex-row relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-[#432F2E] hover:text-[#FEEFB8] text-[#432F2E] flex items-center justify-center transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Left Column: Garment High-Res Visual Frame */}
        <div className="md:w-1/2 bg-[#FFF0EF]/60 p-8 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
            <span className="px-3 py-1 rounded-full bg-[#432F2E] text-[#FEEFB8] text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
              SERIES VL-01
            </span>
            <span className="px-3 py-1 rounded-full bg-[#C4DAE8] text-[#432F2E] text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
              240 GSM HEAVYWEIGHT
            </span>
          </div>

          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-[380px] md:max-h-[460px] object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-500"
          />

          <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-[#432F2E] shadow-sm">
            {product.tag}
          </span>
        </div>

        {/* Right Column: Garment Specifications & Buying Module */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between gap-5 overflow-y-auto">
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-[11px] font-extrabold text-[#C85A32] uppercase tracking-wider block">
                {product.subtitle}
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#432F2E] mt-1 leading-tight">
                {product.name}
              </h2>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3">
              <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#432F2E]">
                ₹{product.price}
              </span>
              <span className="text-sm text-[#432F2E]/50 line-through">
                ₹{product.originalPrice}
              </span>
              <span className="text-xs font-extrabold text-[#C85A32] bg-[#FEEFB8] px-2.5 py-0.5 rounded-full">
                SAVE ₹{product.originalPrice - product.price}
              </span>
            </div>

            {/* Narrative Description */}
            <p className="text-xs sm:text-sm text-[#432F2E]/80 leading-relaxed">
              {product.description}
            </p>

            {/* Technical Chips */}
            <div className="grid grid-cols-2 gap-2.5 py-2">
              <div className="bg-[#FCF8ED] p-2.5 rounded-xl border border-[#432F2E]/8">
                <span className="text-[10px] text-[#432F2E]/60 uppercase font-bold block">Fabric Weave</span>
                <span className="text-xs font-bold text-[#432F2E]">240 GSM Combed Ringspun</span>
              </div>
              <div className="bg-[#FCF8ED] p-2.5 rounded-xl border border-[#432F2E]/8">
                <span className="text-[10px] text-[#432F2E]/60 uppercase font-bold block">Silhouette</span>
                <span className="text-xs font-bold text-[#432F2E]">Relaxed Drop-Shoulder</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#432F2E] uppercase">
                  Select Size ({selectedSize}):
                </span>
                <button
                  type="button"
                  onClick={onOpenSizeGuide}
                  className="text-xs font-bold text-[#C85A32] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">straighten</span>
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {(['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#432F2E] text-[#FEEFB8] shadow-md ring-2 ring-[#432F2E]'
                        : 'bg-[#FCF8ED] text-[#432F2E] hover:bg-[#FEEFB8]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-extrabold text-[#432F2E] uppercase">
                Quantity:
              </span>
              <div className="flex items-center bg-[#FCF8ED] rounded-xl border border-[#432F2E]/10 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#432F2E] hover:bg-white font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-bold text-[#432F2E]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-[#432F2E] hover:bg-white font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col gap-2 pt-2 border-t border-[#432F2E]/10">
            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95 cursor-pointer ${
                addedAnimation
                  ? 'bg-[#22c55e] text-white'
                  : 'bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {addedAnimation ? 'check' : 'add_shopping_cart'}
              </span>
              <span>
                {addedAnimation ? 'ADDED TO BAG' : `ADD TO BAG • ₹${product.price * quantity}`}
              </span>
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-[#432F2E]/60 pt-1">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#C85A32]">bolt</span>
                48h Dispatch
              </span>
              <span>•</span>
              <span>COD & UPI Available</span>
              <span>•</span>
              <span>7-Day Swaps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
