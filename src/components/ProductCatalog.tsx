import React, { useState, useMemo } from 'react';
import { Product, ProductSize, ProductCategory } from '../types';
import { soundFX } from '../utils/sound';

interface ProductCatalogProps {
  products: Product[];
  onAddToCart: (product: Product, size: ProductSize) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  onAddToCart,
  onQuickView
}) => {
  // Category state
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'popular'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Per-product selected size state
  const [selectedSizes, setSelectedSizes] = useState<Record<string, ProductSize>>({
    'khorasan-rebel': 'M',
    'khorasan-kid-patchwork': 'L',
    'cyber-blast-heavy': 'M',
    'saint-fears-boxy': 'XL',
    'what-are-we-going-to-do': 'M',
    'the-future-blindfold': 'L',
    '89-someone-different': 'M',
    'contrast-ringer-staple': 'L',
    'french-terry-heavy-hoodie': 'L',
    'vintage-rust-zip-hoodie': 'M',
    'heavy-canvas-utility-tote': 'ONE SIZE',
    'distressed-vintage-cap': 'ONE SIZE'
  });

  // Wishlist heart state
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.playPop();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectSize = (productId: string, size: ProductSize, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.playTap();
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleCategoryChange = (cat: 'All' | ProductCategory) => {
    soundFX.playToggle();
    setSelectedCategory(cat);
    setSelectedStyle('All');
  };

  // Distinct styles available for selected category
  const availableStyles = useMemo(() => {
    const list = selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory);
    return ['All', ...Array.from(new Set(list.map(p => p.style)))];
  }, [selectedCategory, products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Style filter
    if (selectedStyle !== 'All') {
      result = result.filter(p => p.style === selectedStyle);
    }

    // In stock
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => (b.viewersCount || 0) - (a.viewersCount || 0));
    }

    return result;
  }, [products, selectedCategory, selectedStyle, inStockOnly, sortBy]);

  const categories: Array<{ id: 'All' | ProductCategory; label: string; count: number }> = [
    { id: 'All', label: 'All Items', count: products.length },
    { id: 'Tees', label: 'Tees', count: products.filter(p => p.category === 'Tees').length },
    { id: 'Hoodies', label: 'Hoodies', count: products.filter(p => p.category === 'Hoodies').length },
    { id: 'Accessories', label: 'Accessories', count: products.filter(p => p.category === 'Accessories').length }
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-16 py-16 md:py-24" id="catalog">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Catalog Control Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C85A32] animate-pulse" />
              <span className="text-xs font-extrabold uppercase text-[#432F2E]/60 tracking-wider">
                LIVE STREETWEAR INVENTORY • SERIES VL-01
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#432F2E] tracking-tight mt-1.5 uppercase">
              THE ESSENTIAL CATALOG
            </h2>
          </div>

          {/* Primary Category Filtering Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-full border border-[#432F2E]/10 shadow-sm">
            {categories.map(cat => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#432F2E] text-[#FEEFB8] shadow-sm'
                      : 'text-[#432F2E] hover:bg-[#FEEFB8]/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${active ? 'bg-[#FEEFB8] text-[#432F2E]' : 'bg-[#FCF8ED] text-[#432F2E]/60'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Sub-Filtering & Sorting Bar */}
        <div className="bg-[#FCF8ED] p-4 rounded-2xl border border-[#432F2E]/10 flex flex-wrap items-center justify-between gap-4">
          {/* Sub-style Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-extrabold uppercase text-[#432F2E]/60 mr-1 hidden sm:inline">
              Filter By Style:
            </span>
            {availableStyles.map(st => (
              <button
                key={st}
                onClick={() => {
                  soundFX.playTap();
                  setSelectedStyle(st);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer border ${
                  selectedStyle === st
                    ? 'bg-[#C85A32] text-white border-[#C85A32]'
                    : 'bg-white text-[#432F2E] border-[#432F2E]/10 hover:bg-[#FEEFB8]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Sorting Dropdown & In-Stock Toggle */}
          <div className="flex items-center gap-3 ml-auto">
            <label className="flex items-center gap-1.5 text-xs font-bold text-[#432F2E] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={e => setInStockOnly(e.target.checked)}
                className="accent-[#C85A32] rounded cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>

            <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-xl border border-[#432F2E]/15 text-xs font-bold text-[#432F2E]">
              <span className="material-symbols-outlined text-[16px] text-[#C85A32]">sort</span>
              <select
                value={sortBy}
                onChange={e => {
                  soundFX.playTap();
                  setSortBy(e.target.value as any);
                }}
                aria-label="Sort products"
                className="bg-transparent border-none outline-none font-bold text-xs text-[#432F2E] cursor-pointer pr-1"
              >
                <option value="featured">Featured Drops</option>
                <option value="popular">Trending / Live Viewers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {filteredProducts.map(product => {
            const currentSize = selectedSizes[product.id] || (product.category === 'Accessories' ? 'ONE SIZE' : 'M');
            const isWishlisted = !!wishlist[product.id];
            const isHoodieOrAcc = product.category === 'Hoodies' || product.category === 'Accessories';

            return (
              <article
                key={product.id}
                onClick={() => onQuickView(product)}
                className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-[#432F2E]/8 hover:border-[#C85A32]/40 cursor-pointer"
              >
                {/* 4:3 or 4:5 Image Showcase Frame */}
                <div className="relative aspect-[4/4.8] bg-[#FFF0EF]/45 p-4 flex items-center justify-center overflow-hidden">
                  {/* Top Left Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-3.5 left-3.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide z-10 shadow-sm ${
                        product.badgeType === 'butter'
                          ? 'bg-[#FEEFB8] text-[#432F2E]'
                          : product.badgeType === 'blue'
                          ? 'bg-[#C4DAE8] text-[#432F2E]'
                          : product.badgeType === 'rust'
                          ? 'bg-[#C85A32] text-white'
                          : 'bg-[#FBDBD9] text-[#432F2E]'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={e => toggleWishlist(product.id, e)}
                    className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#432F2E] flex items-center justify-center shadow-sm transition-transform active:scale-80 cursor-pointer"
                    title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  >
                    <span className={`material-symbols-outlined text-[18px] transition-colors ${isWishlisted ? 'text-[#C85A32]' : 'text-[#432F2E]/40'}`}>
                      {isWishlisted ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>

                  {/* Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md"
                  />

                  {/* Live Viewers Indicator */}
                  {product.viewersCount && (
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-[#FEEFB8] flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
                      <span>{product.viewersCount} viewing</span>
                    </span>
                  )}

                  {/* Tag label */}
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-[#432F2E] shadow-sm">
                    {product.tag}
                  </span>
                </div>

                {/* Card Info and Purchase Module */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-[#432F2E]/60">
                      <span>{product.category}</span>
                      <span className="text-[#C85A32]">{product.style}</span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-[#432F2E] leading-snug mt-1 group-hover:text-[#C85A32] transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Size Selector Pills (or One Size) */}
                  <div className="flex items-center gap-1.5 py-1">
                    <span className="text-[10px] font-extrabold text-[#432F2E]/50 mr-1 uppercase">
                      SIZES:
                    </span>
                    {product.category === 'Accessories' ? (
                      <span className="px-2.5 py-0.5 bg-[#FCF8ED] border border-[#432F2E]/10 rounded-full text-[10px] font-bold text-[#432F2E]">
                        ONE SIZE
                      </span>
                    ) : (
                      (['S', 'M', 'L', 'XL', 'XXL'] as ProductSize[]).map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={e => handleSelectSize(product.id, size, e)}
                          className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                            currentSize === size
                              ? 'bg-[#432F2E] text-[#FEEFB8] shadow-sm ring-1 ring-[#432F2E]'
                              : 'bg-[#FCF8ED] text-[#432F2E] hover:bg-[#FEEFB8]'
                          }`}
                        >
                          {size}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Price and Add to Bag */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#432F2E]/6">
                    <div>
                      <span className="font-display font-extrabold text-lg sm:text-xl text-[#432F2E]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-[#432F2E]/50 line-through ml-1.5 font-medium">
                        ₹{product.originalPrice}
                      </span>
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        soundFX.playPop();
                        onAddToCart(product, currentSize);
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#432F2E] hover:bg-[#C85A32] text-[#FEEFB8] px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-sm cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        add_shopping_cart
                      </span>
                      <span>ADD</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center flex flex-col items-center gap-3 bg-white rounded-3xl border border-[#432F2E]/10 p-8">
            <span className="material-symbols-outlined text-[48px] text-[#432F2E]/30">inventory_2</span>
            <h4 className="font-display font-bold text-lg text-[#432F2E]">No drops found in this category filter</h4>
            <p className="text-xs text-[#432F2E]/60 max-w-sm">Try resetting your style filter or browsing All Items.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStyle('All');
                setInStockOnly(false);
              }}
              className="mt-2 px-6 py-2 bg-[#432F2E] text-[#FEEFB8] rounded-full text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
