import type { Category } from '../types/Category';
import type { Product } from '../types/Product';

/* =======================
 * CATEGORY HELPERS
 * ======================= */

export const getCategoryWithChildren = (
  selectedTitles: string[],
  allCategories: Category[]
): string[] => {
  if (!selectedTitles.length) return [];

  const categoryByTitle = new Map(
    allCategories.map(c => [c.title, c])
  );

  const childrenMap = new Map<number, string[]>();
  for (const cat of allCategories) {
    if (cat.parentId != null) {
      const arr = childrenMap.get(cat.parentId) ?? [];
      arr.push(cat.title);
      childrenMap.set(cat.parentId, arr);
    }
  }

  const result = new Set<string>();

  for (const title of selectedTitles) {
    const category = categoryByTitle.get(title);
    if (!category) continue;

    result.add(title);

    const children = childrenMap.get(category.id);
    if (children) {
      children.forEach(child => result.add(child));
    }
  }

  return Array.from(result);
};

/* =======================
 * CATEGORY COUNTS
 * ======================= */

export const calculateCategoryCounts = (
  categories: Category[],
  products: Product[]
): Array<Category & { count: number }> => {
  if (!products.length) return [];

  // Count direct product per category title
  const directCountMap = new Map<string, number>();
  for (const product of products) {
    if (product.category) {
      directCountMap.set(
        product.category,
        (directCountMap.get(product.category) ?? 0) + 1
      );
    }
  }

  // Build children map: parentId -> Category[]
  const childrenMap = new Map<number, Category[]>();
  for (const category of categories) {
    if (category.parentId != null) {
      const arr = childrenMap.get(category.parentId) ?? [];
      arr.push(category);
      childrenMap.set(category.parentId, arr);
    }
  }

  // Memoized DFS
  const totalCountCache = new Map<number, number>();

  const getTotalCount = (category: Category): number => {
    if (totalCountCache.has(category.id)) {
      return totalCountCache.get(category.id)!;
    }

    let total = directCountMap.get(category.title) ?? 0;

    const children = childrenMap.get(category.id);
    if (children) {
      for (const child of children) {
        total += getTotalCount(child);
      }
    }

    totalCountCache.set(category.id, total);
    return total;
  };

  return categories
    .map(category => ({
      ...category,
      count: getTotalCount(category)
    }))
    .filter(category => category.count > 0);
};
