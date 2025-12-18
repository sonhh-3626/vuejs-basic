import type { Product } from '../types/Product';
import type { Brand } from '../types/Brand';
import type { FilterOptions, AggregationFilterOptions } from '../types/FilterOptions';
import type { Category } from '../types/Category';
import { filterBySearch } from './filter/search.filter';
import { filterByCategories } from './filter/category.filter';
import { filterByBrands } from './filter/brand.filter';
import { filterByPrice } from './filter/price.filter';
import { filterByRating } from './filter/rating.filter';
import { filterByFreeship } from './filter/freeship.filter';


export const applyAllFilters = (
  products: Product[],
  filters: FilterOptions,
  allCategories: Category[]
): Product[] => {
  let filtered = products;

  filtered = filterBySearch(filtered, filters.searchTerm);
  filtered = filterByCategories(filtered, filters.selectedCategories, allCategories);
  filtered = filterByBrands(filtered, filters.selectedBrands);
  filtered = filterByPrice(filtered, filters.priceRange);
  filtered = filterByRating(filtered, filters.minRating);
  filtered = filterByFreeship(filtered, filters.isFreeship);

  return filtered;
};

export const applyPartialFilters = (
  products: Product[],
  filters: AggregationFilterOptions,
  allCategories: Category[]
): Product[] => {
  let filtered = products;

  filtered = filterBySearch(filtered, filters.searchTerm);

  if (filters.selectedCategories) {
    filtered = filterByCategories(filtered, filters.selectedCategories, allCategories);
  }

  if (filters.selectedBrands) {
    filtered = filterByBrands(filtered, filters.selectedBrands);
  }

  if (filters.priceRange) {
    filtered = filterByPrice(filtered, filters.priceRange);
  }

  if (filters.minRating !== undefined) {
    filtered = filterByRating(filtered, filters.minRating);
  }

  if (filters.isFreeship !== undefined) {
    filtered = filterByFreeship(filtered, filters.isFreeship);
  }

  return filtered;
};

export const calculateBrands = (products: Product[]): Brand[] => {
  if (!products.length) return [];

  const brandMap = new Map<string, number>();

  for (const product of products) {
    brandMap.set(
      product.brand,
      (brandMap.get(product.brand) ?? 0) + 1
    );
  }

  return Array.from(brandMap.entries())
    .map(([title, count], index) => ({
      id: index + 1,
      title,
      count,
      categoryId: 0
    }))
    .sort((a, b) => b.count - a.count);
};
