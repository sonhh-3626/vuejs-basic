import type { Category } from '@/shared/types/Category';
import type { Product } from '@/shared/types/Product';
import { getCategoryWithChildren } from '../categoryHelpers';

export const filterByCategories = (
  products: Product[],
  selectedCategories: string[],
  allCategories: Category[]
): Product[] => {
  if (!selectedCategories.length) return products;

  const allCategoryTitles = getCategoryWithChildren(
    selectedCategories,
    allCategories
  );
  const categorySet = new Set(allCategoryTitles);

  return products.filter(
    p => p.category && categorySet.has(p.category)
  );
};
