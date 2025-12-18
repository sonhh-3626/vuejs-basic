import type { Product } from './Product';

export interface FilterOptions {
  searchTerm: string;
  selectedCategories: string[];
  selectedBrands: string[];
  priceRange: { min: number; max: number } | null;
  minRating: number;
  isFreeship: boolean;
}

export interface AggregationFilterOptions {
  searchTerm: string;
  selectedCategories?: string[];
  selectedBrands?: string[];
  priceRange?: { min: number; max: number } | null;
  minRating?: number;
  isFreeship?: boolean;
}

export interface FilterResult {
  products: Product[];
  totalCount: number;
}
