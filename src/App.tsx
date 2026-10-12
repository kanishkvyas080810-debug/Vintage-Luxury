import React, { useState } from 'react';
import { Product, ProductSize, CartItem, ActivePage } from './types';
import { PRODUCTS, BRAND_LOGO_URL } from './data/products';
import { ClickSpark } from './components/ClickSpark';
import { StaggeredMenu, StaggeredMenuItem } from './components/StaggeredMenu';
import { TopNavBubbles } from './components/TopNavBubbles';
import { DitherBackground } from './components/DitherBackground';
import { HomePage } from './components/pages/HomePage';
import { FitFabricPage } from './components/pages/FitFabricPage';
import { ArchivePage } from './components/pages/ArchivePage';
import { OurStoryPage } from './components/pages/OurStoryPage';
import { SizeGuidePage } from './components/pages/SizeGuidePage';
import { SignInPage } from './components/pages/SignInPage';
import { FirstInterface } from './components/FirstInterface';
import { Footer } from './components/Footer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { CartToast } from './components/CartToast';

export default function App() {
  // Navigation state (defaults to 'home')
  const [activePage, setActivePage] = useState<ActivePage>('home');

  // Dither state (prominent at top between menu and search)
  const [ditherActive, setDitherActive] = useState<boolean>(true);
  const [ditherVibe, setDitherVibe] = useState<'rust' | 'butter' | 'cyber'>('rust');

  const paletteMap = {
    rust: {
      wave: [0.78, 0.35, 0.20] as [number, number, number],
      bg: [0.15, 0.09, 0.09] as [number, number, number]
    },
    butter: {
      wave: [0.99, 0.94, 0.72] as [number, number, number],
      bg: [0.20, 0.14, 0.13] as [number, number, number]
    },
    cyber: {
      wave: [0.30, 0.65, 0.85] as [number, number, number],
      bg: [0.08, 0.12, 0.16] as [number, number, number]
    }
  };

  // User Authentication state
  const [currentUser, setCurrentUser] = useState<{ name: string; isLoggedIn: boolean } | null>(() => {
    try {
      const saved = localStorage.getItem('vl_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleLogin = (name: string) => {
    const user = { name, isLoggedIn: true };
    setCurrentUser(user);
    try {
      localStorage.setItem('vl_user', JSON.stringify(user));
    } catch {}
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('vl_user');
    } catch {}
  };

  // Shopping cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'khorasan-rebel-M',
      product: PRODUCTS[0],
      size: 'M',
      quantity: 1
    },
    {
      id: 'french-terry-heavy-hoodie-L',
      product: PRODUCTS[8], // Heavy 450 GSM French Terry Hoodie
      size: 'L',
      quantity: 1
    }
  ]);

  // Modal & Drawer visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{ id: string; total: number; itemCount: number } | null>(null);

  // Toast feedback state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastText, setToastText] = useState('');

  // Cart operations
  const handleAddToCart = (product: Product, size: ProductSize, quantity: number = 1) => {
    const itemKey = `${product.id}-${size}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemKey);
      if (existing) {
        return prev.map(item =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemKey, product, size, quantity }];
    });

    setToastText(`${product.name} (${size})`);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckoutSuccess = (orderInfo: { id: string; total: number; itemCount: number }) => {
    setIsCartOpen(false);
    setCompletedOrder(orderInfo);
    setCartItems([]);
  };

  // Route navigation
  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Menu items inside StaggeredMenu on top left
  const allMenuItems: StaggeredMenuItem[] = [
    {
      label: 'Home & Shop',
      ariaLabel: 'Go to Home and Streetwear Catalog',
      onClick: () => handleNavigate('home'),
      active: activePage === 'home' || activePage === 'shop'
    },
    {
      label: 'Dither Canvas',
      ariaLabel: 'Open Retro WebGL Dither Shader Visualizer',
      onClick: () => {
        setDitherActive(true);
        handleNavigate('dither' as any);
      },
      active: (activePage as any) === 'dither'
    },
    {
      label: 'Fit & Fabric',
      ariaLabel: 'Explore 240 GSM Architectural Silhouette',
      onClick: () => handleNavigate('fit-fabric'),
      active: activePage === 'fit-fabric'
    },
    {
      label: 'Archive Spotlight',
      ariaLabel: 'View Series VL-01 Archive Pieces',
      onClick: () => handleNavigate('archive'),
      active: activePage === 'archive'
    },
    {
      label: 'Our Story & Craft',
      ariaLabel: 'Read Coimbatore and Tiruppur Heritage Manifesto',
      onClick: () => handleNavigate('our-story'),
      active: activePage === 'our-story'
    },
    {
      label: 'Size Guide',
      ariaLabel: 'View Detailed Measurement Charts',
      onClick: () => handleNavigate('size-guide'),
      active: activePage === 'size-guide'
    },
    {
      label: currentUser?.isLoggedIn ? `Member (${currentUser.name})` : 'Sign In',
      ariaLabel: 'Member Sign In & Profile Access',
      onClick: () => handleNavigate('signin'),
      active: activePage === 'signin'
    },
    {
      label: `Shopping Bag (${totalCartCount})`,
      ariaLabel: 'Open Shopping Cart Drawer',
      onClick: () => setIsCartOpen(true)
    }
  ];

  // Hide the bar/button for the page currently on!
  const visibleMenuItems = allMenuItems.filter(item => !item.active);

  const socialItems = [
    { label: 'Instagram @vintagelegacy', link: 'https://instagram.com' },
    { label: 'X / Twitter', link: 'https://twitter.com' },
    { label: 'Tiruppur Atelier Hub', link: '#' }
  ];

  return (
    <ClickSpark sparkColor="#FEEFB8" sparkCount={10} sparkRadius={30} duration={350}>
      <div className="relative min-h-screen w-full bg-[#FCF8ED] text-[#281716] font-body selection:bg-[#FEEFB8] selection:text-[#432F2E]">
        {/*
          LIVE DITHER BACKGROUND:
          Renders interactive retro WebGL waves behind the store when ditherActive is true!
        */}
        {ditherActive && (activePage === 'home' || activePage === 'shop') && (
          <div className="fixed inset-0 pointer-events-none z-0 opacity-15 transition-opacity duration-700">
            <DitherBackground
              waveColor={paletteMap[ditherVibe].wave}
              backgroundColor={paletteMap[ditherVibe].bg}
              colorNum={4.0}
              pixelSize={2.8}
              waveSpeed={0.035}
              waveFrequency={3.2}
              waveAmplitude={0.4}
              enableMouseInteraction={true}
              mouseRadius={0.7}
            />
          </div>
        )}

        {/*
          1. TOP-LEFT MENU ANIMATION:
          StaggeredMenu positioned on top-left to access all sections (current page option hidden)
        */}
        <StaggeredMenu
          position="left"
          colors={['#432F2E', '#C85A32', '#FEEFB8']}
          items={visibleMenuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          logoUrl={BRAND_LOGO_URL}
          brandTitle="Vintage Legacy"
          menuButtonColor="#FEEFB8"
          openMenuButtonColor="#FFFFFF"
          accentColor="#C85A32"
          isFixed={true}
        />

        {/*
          2. TOP BAR: DITHER OPTION ON TOP (BETWEEN MENU AND SEARCH - ONLY ON HOME)
          AND THE 3 SEPARATE BUBBLES (SEARCH, BAG, PROFILE) ON TOP RIGHT
        */}
        <TopNavBubbles
          cartCount={totalCartCount}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenProfile={() => {
            if (currentUser?.isLoggedIn) {
              setIsProfileOpen(true);
            } else {
              handleNavigate('signin');
            }
          }}
          currentUser={currentUser}
          ditherActive={ditherActive}
          onToggleDither={() => setDitherActive(!ditherActive)}
          ditherVibe={ditherVibe}
          onDitherVibeChange={setDitherVibe}
          onOpenDitherFullscreen={() => handleNavigate('dither' as any)}
          activePage={activePage}
        />

        {/*
          3. FULLSCREEN DITHER MODE (IF SELECTED)
        */}
        {(activePage as any) === 'dither' ? (
          <FirstInterface onNavigate={handleNavigate} />
        ) : (
          <div className="relative z-10 w-full flex flex-col min-h-screen">
            <main className="flex-1 w-full flex flex-col">
              {/*
                HOME PAGE:
                Only keeps the Hover Panel (AccordionShowcase) and the Shop (ProductCatalog)
              */}
              {(activePage === 'home' || activePage === 'shop') && (
                <HomePage
                  products={PRODUCTS}
                  onAddToCart={handleAddToCart}
                  onQuickView={setQuickViewProduct}
                  onExploreFabric={() => handleNavigate('fit-fabric')}
                />
              )}

              {/* FIT & FABRIC DEDICATED PAGE */}
              {activePage === 'fit-fabric' && (
                <FitFabricPage
                  products={PRODUCTS}
                  onBackToShop={() => handleNavigate('home')}
                  onOpenSizeGuide={() => handleNavigate('size-guide')}
                />
              )}

              {/* ARCHIVE SPOTLIGHT DEDICATED PAGE */}
              {activePage === 'archive' && (
                <ArchivePage
                  products={PRODUCTS}
                  onBackToShop={() => handleNavigate('home')}
                  onQuickView={setQuickViewProduct}
                />
              )}

              {/* OUR STORY DEDICATED PAGE */}
              {activePage === 'our-story' && (
                <OurStoryPage onBackToShop={() => handleNavigate('home')} />
              )}

              {/* SIZE GUIDE DEDICATED PAGE */}
              {activePage === 'size-guide' && (
                <SizeGuidePage onBackToShop={() => handleNavigate('home')} />
              )}

              {/* SIGN IN DEDICATED PAGE */}
              {activePage === 'signin' && (
                <SignInPage
                  currentUser={currentUser}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  onBackToShop={() => handleNavigate('home')}
                />
              )}
            </main>

            {/* Streetwear Store Footer */}
            <Footer
              onNavigate={handleNavigate}
              onOpenSizeGuide={() => handleNavigate('size-guide')}
              onOpenTrackOrder={() => setIsProfileOpen(true)}
              onOpenSupport={() => setIsProfileOpen(true)}
              activePage={activePage}
            />
          </div>
        )}

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onOpenSizeGuide={() => handleNavigate('size-guide')}
        />

        {/* Size Guide Modal (Secondary trigger) */}
        <SizeGuideModal
          isOpen={isSizeGuideOpen}
          onClose={() => setIsSizeGuideOpen(false)}
        />

        {/* Search Modal */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          products={PRODUCTS}
          onSelectProduct={setQuickViewProduct}
        />

        {/* Shopping Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckoutSuccess={handleCheckoutSuccess}
          onBrowse={() => handleNavigate('home')}
        />

        {/* Profile & Live Order Tracking Drawer */}
        <ProfileDrawer
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          onOpenSizeGuide={() => handleNavigate('size-guide')}
          currentUser={currentUser}
          onNavigateToSignIn={() => handleNavigate('signin')}
          onLogout={handleLogout}
        />

        {/* Order Confirmed Success Modal */}
        <OrderSuccessModal
          orderInfo={completedOrder}
          onClose={() => setCompletedOrder(null)}
          onExploreMore={() => handleNavigate('home')}
        />

        {/* Cart Add Toast Notification */}
        <CartToast
          visible={toastVisible}
          itemText={toastText}
          onViewCart={() => setIsCartOpen(true)}
        />
      </div>
    </ClickSpark>
  );
}
