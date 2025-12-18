import type { Product } from '@/shared/types/Product';

export const filterByBrands = (
  products: Product[],
  selectedBrands: string[]
): Product[] => {
  if (!selectedBrands.length) return products;

  const brandSet = new Set(selectedBrands);
  return products.filter(p => brandSet.has(p.brand));
};
