import { defineStore } from 'pinia';
import { products } from '@/constants/products';
import { categories } from '@/constants/categories';
import type { Product } from '@/shared/types/Product';
import type { Brand } from '@/shared/types/Brand';
import type { Category } from '@/shared/types/Category';
import type { FilterOptions } from '@/shared/types/FilterOptions';
import { ITEM_PER_PAGE } from '@/constants/pagination';
import { fetchProductsFromServer } from '@/shared/utils/fetchProductsFromServer';
import { useFilterStore } from './FilterStore';
import {
  applyAllFilters,
  applyPartialFilters,
  calculateBrands
} from '@/shared/utils/productFilters';
import { calculateCategoryCounts } from '@/shared/utils/categoryHelpers';
import { calculateRatingCounts } from '@/shared/utils/calculateRatingCounts';
import { DEFAULT_MAX_PRICE } from '@/constants/filter';

interface ProductState {
  products: Product[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
}

const paginateProducts = (currentPage: number, products: Product[]): Product[] => {
  const start = (currentPage - 1) * ITEM_PER_PAGE;
  return products.slice(start, start + ITEM_PER_PAGE);
};

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    searchTerm: '',
    currentPage: 1,
    totalPages: 1
  }),

  getters: {
    defaultMinPrice: (state): number => {
      if (state.products.length === 0) return 0;
      return Math.min(...state.products.map(p => p.price));
    },

    defaultMaxPrice: (state): number => {
      if (state.products.length === 0) return DEFAULT_MAX_PRICE;
      return Math.max(...state.products.map(p => p.price));
    },

    currentFilters(): FilterOptions {
      const filterStore = useFilterStore();

      return {
        searchTerm: this.searchTerm,
        selectedCategories: filterStore.selectedCategories,
        selectedBrands: filterStore.selectedBrands,
        priceRange: filterStore.priceRange,
        minRating: filterStore.minRating,
        isFreeship: filterStore.isFreeship
      };
    },

    filteredProducts(): Product[] {
      return applyAllFilters(
        this.products,
        this.currentFilters,
        categories
      );
    },

    minPrice(): number {
      const filterStore = useFilterStore();

      const filtered = applyPartialFilters(
        this.products,
        {
          searchTerm: this.searchTerm,
          selectedCategories: filterStore.selectedCategories
        },
        categories
      );

      if (filtered.length === 0) return this.defaultMinPrice;
      return Math.min(...filtered.map(p => p.price));
    },

    maxPrice(): number {
      const filterStore = useFilterStore();

      const filtered = applyPartialFilters(
        this.products,
        {
          searchTerm: this.searchTerm,
          selectedCategories: filterStore.selectedCategories
        },
        categories
      );

      if (filtered.length === 0) return this.defaultMaxPrice;
      return Math.max(...filtered.map(p => p.price));
    },

    brands(): Brand[] {
      const filterStore = useFilterStore();

      const filtered = applyPartialFilters(
        this.products,
        {
          searchTerm: this.searchTerm,
          selectedCategories: filterStore.selectedCategories,
          priceRange: filterStore.priceRange,
          minRating: filterStore.minRating,
          isFreeship: filterStore.isFreeship
        },
        categories
      );

      return calculateBrands(filtered);
    },

    categories(): Category[] {
      const filterStore = useFilterStore();

      const filtered = applyPartialFilters(
        this.products,
        {
          searchTerm: this.searchTerm,
          selectedBrands: filterStore.selectedBrands,
          priceRange: filterStore.priceRange,
          minRating: filterStore.minRating,
          isFreeship: filterStore.isFreeship
        },
        categories
      );

      return calculateCategoryCounts(categories, filtered);
    },

    ratings(): Array<{ stars: number; count: number }> {
      const filterStore = useFilterStore();

      const filtered = applyPartialFilters(
        this.products,
        {
          searchTerm: this.searchTerm,
          selectedCategories: filterStore.selectedCategories,
          selectedBrands: filterStore.selectedBrands,
          priceRange: filterStore.priceRange,
          isFreeship: filterStore.isFreeship
        },
        categories
      );

      return calculateRatingCounts(filtered);
    },

    allProducts: (state): Product[] => state.products
  },

  actions: {
    getFilteredProducts(): Product[] {
      const filtered = this.filteredProducts;

      this.totalPages = Math.max(
        Math.ceil(filtered.length / ITEM_PER_PAGE),
        1
      );
      this.currentPage = Math.min(this.currentPage, this.totalPages);

      return paginateProducts(this.currentPage, filtered);
    },

    async fetchProducts(): Promise<void> {
      try {
        this.products = await fetchProductsFromServer();

        const filterStore = useFilterStore();
        if (!filterStore.priceRange) {
          filterStore.setPriceRange(
            this.defaultMinPrice,
            this.defaultMaxPrice
          );
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);

        this.products = products;
      }
    },

    setSearchTerm(term: string): void {
      this.searchTerm = term;
      this.currentPage = 1;
    },

    resetPagination(): void {
      this.currentPage = 1;
    }
  }
});
