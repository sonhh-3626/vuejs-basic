import type { Product } from '@/shared/types/Product';

export const filterBySearch = (
  products: Product[],
  searchTerm: string
): Product[] => {
  const term = searchTerm.trim().toLowerCase();
  if (!term) return products;

  return products.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.brand.toLowerCase().includes(term)
  );
};
