import React from 'react';
import { Product, ProductSize } from '../../types';
import { HeroSection } from '../HeroSection';
import { AccordionShowcase } from '../AccordionShowcase';
import { MarqueeBanner } from '../MarqueeBanner';
import { ProductCatalog } from '../ProductCatalog';
import { TrustBadges } from '../TrustBadges';

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product, size: ProductSize) => void;
  onQuickView: (product: Product) => void;
  onExploreFabric: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onExploreFabric
}) => {
  return (
    <div className="w-full flex flex-col">
      {/* Hero Showcase */}
      <HeroSection
        heroProduct={products[0]}
        onShopDrop={() => {
          const el = document.getElementById('catalog');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onExploreFabric={onExploreFabric}
        onQuickView={onQuickView}
      />

      {/* The Hover Panel: Featured Archive Pieces Accordion */}
      <AccordionShowcase
        products={products}
        onQuickView={onQuickView}
      />

      {/* Angled Running Ticker Marquee Banner */}
      <MarqueeBanner />

      {/* The Shop: Essential Streetwear Catalog */}
      <ProductCatalog
        products={products}
        onAddToCart={onAddToCart}
        onQuickView={onQuickView}
      />

      {/* Brand Value Trust Badges */}
      <TrustBadges />
    </div>
  );
};
