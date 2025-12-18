import type { Product } from "@/shared/types/Product";

export const filterByFreeship = (
  products: Product[],
  isFreeship: boolean
): Product[] => {
  if (!isFreeship) return products;

  return products.filter(p => p.isFreeship);
};
