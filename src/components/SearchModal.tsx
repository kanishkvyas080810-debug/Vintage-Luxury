import React, { useState } from 'react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.wash.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#281716]/75 backdrop-blur-md flex items-start justify-center p-4 pt-20 animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 border border-[#432F2E]/10 overflow-hidden flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 bg-[#FCF8ED] px-4 py-3 rounded-2xl border border-[#432F2E]/15">
          <span className="material-symbols-outlined text-[22px] text-[#432F2E]/60">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search drops, acid washes, categories, tags..."
            className="flex-1 bg-transparent text-sm font-semibold text-[#432F2E] placeholder:text-[#432F2E]/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#432F2E]/40 hover:text-[#432F2E] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">clear</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold text-[#C85A32] uppercase hover:underline ml-2 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-bold text-[#432F2E]/50 mr-1 uppercase">
            Suggested:
          </span>
          {['Acid Wash', 'Khorasan', 'Patchwork', 'Saint Fears', 'Ringer', 'White'].map(tag => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 rounded-full bg-[#FCF8ED] hover:bg-[#FEEFB8] text-[#432F2E] text-xs font-semibold border border-[#432F2E]/10 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto flex flex-col gap-2 pt-2 border-t border-[#432F2E]/8">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#432F2E]/60">
              No garments found matching "{query}". Try "Acid", "Khorasan", or "Ringer".
            </div>
          ) : (
            filtered.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#FCF8ED] transition-colors cursor-pointer group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-14 object-contain bg-[#FFF0EF] rounded-lg p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-sm text-[#432F2E] group-hover:text-[#C85A32] transition-colors truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-[#432F2E]/60 truncate">
                    {product.wash} • {product.category}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-sm text-[#432F2E]">
                    ₹{product.price}
                  </span>
                  <span className="block text-[10px] text-[#432F2E]/50 line-through">
                    ₹{product.originalPrice}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
