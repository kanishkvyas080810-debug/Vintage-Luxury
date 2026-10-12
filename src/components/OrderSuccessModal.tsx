import React from 'react';

interface OrderSuccessModalProps {
  orderInfo: { id: string; total: number; itemCount: number } | null;
  onClose: () => void;
  onExploreMore: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderInfo,
  onClose,
  onExploreMore
}) => {
  if (!orderInfo) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#281716]/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden flex flex-col gap-5 border border-[#432F2E]/10 text-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 text-[#22c55e] flex items-center justify-center mb-1">
          <span className="material-symbols-outlined text-[36px]">
            check_circle
          </span>
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase text-[#C85A32] tracking-wider block">
            GARMENT DISPATCH MANIFEST INITIATED
          </span>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-[#432F2E] mt-1">
            Order #{orderInfo.id} Confirmed!
          </h3>
          <p className="text-xs sm:text-sm text-[#432F2E]/70 mt-2 leading-relaxed">
            Your {orderInfo.itemCount} drop piece(s) have been allocated in our Tiruppur fulfillment center. We have queued your express air parcel for 48-hour Pan-India dispatch.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="w-full bg-[#FCF8ED] p-4 rounded-2xl border border-[#432F2E]/10 text-left text-xs flex flex-col gap-2">
          <div className="flex justify-between font-medium text-[#432F2E]">
            <span>Order Number</span>
            <span className="font-mono font-bold text-[#432F2E]">{orderInfo.id}</span>
          </div>
          <div className="flex justify-between font-medium text-[#432F2E]">
            <span>Total Amount</span>
            <span className="font-bold text-[#C85A32]">₹{orderInfo.total}</span>
          </div>
          <div className="flex justify-between font-medium text-[#432F2E]">
            <span>Payment Mode</span>
            <span className="font-bold text-[#432F2E]">UPI / Cash on Delivery</span>
          </div>
          <div className="flex justify-between font-medium text-[#432F2E]">
            <span>Tracking Carrier</span>
            <span className="font-bold text-[#432F2E]">Delhivery Express Air (AWB Ready)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
          <button
            onClick={() => {
              onClose();
              onExploreMore();
            }}
            className="w-full py-3.5 rounded-full bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
          >
            CONTINUE SHOPPING DROPS
          </button>
        </div>
      </div>
    </div>
  );
};
