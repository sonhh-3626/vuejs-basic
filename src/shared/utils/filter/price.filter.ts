import type { Product } from '@/shared/types/Product';

export const filterByPrice = (
  products: Product[],
  priceRange: { min: number; max: number } | null,
): Product[] => {
  if (!priceRange) return products;

  const { min, max } = priceRange;
  return products.filter(p => p.price >= min && p.price <= max);
};
