export type ProductSize = 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'ONE SIZE';

export type ProductCategory = 'Tees' | 'Hoodies' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  image: string;
  badge?: string;
  badgeType?: 'blue' | 'butter' | 'rust' | 'neutral';
  tag: string;
  wash: string;
  category: ProductCategory;
  style: string;
  description: string;
  gsm?: number;
  fit: string;
  origin: string;
  inStock: boolean;
  viewersCount?: number;
}

export interface CartItem {
  id: string; // unique item id (productId + size)
  product: Product;
  size: ProductSize;
  quantity: number;
}

export type ActivePage = 'home' | 'shop' | 'fit-fabric' | 'archive' | 'our-story' | 'size-guide' | 'signin';
