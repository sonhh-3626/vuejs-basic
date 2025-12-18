import type { Product } from '@/shared/types/Product';

export const filterByRating = (
  products: Product[],
  minRating: number
): Product[] => {
  if (minRating <= 0) return products;

  return products.filter(p => p.rating >= minRating);
};
