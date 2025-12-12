import { defineStore } from 'pinia'
import { products } from '@/constants/products'
import type { Product } from '@/shared/types/Product'
import { ITEM_PER_PAGE } from '@/constants/pagination';
import { fetchProductsFromServer } from '@/shared/utils/fetchProductsFromServer';

interface ProductState {
  products: Product[];
  searchTerm: string;
  currentPage: number;
  totalPages: number;
}
 
const paginatedProducts = (currentPage: number, products: Product[]) => {
  const start = (currentPage - 1) * ITEM_PER_PAGE
  return products.slice(start, start + ITEM_PER_PAGE)
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    searchTerm: '',
    currentPage: 1,
    totalPages: 1,
  }),

  getters: {
    filteredProducts: (state): Product[] => {
      const term = state.searchTerm.trim().toLowerCase()

      const allFiltered = !term
        ? state.products
        : state.products.filter(product =>
            product.name.toLowerCase().includes(term) ||
            product.brand.toLowerCase().includes(term)
          )

      state.totalPages = Math.ceil(allFiltered.length / ITEM_PER_PAGE)
      state.currentPage = Math.min(state.currentPage, state.totalPages)

      return paginatedProducts(state.currentPage, allFiltered)
    }
  },
  actions: {
    setSearchTerm(term: string) {
      this.searchTerm = term
      this.currentPage = 1
    },

    async fetchProducts() {
      try {
        this.products = await fetchProductsFromServer()
      } catch (error) {
        console.error('Error fetching products from server, falling back to local data.', error)
        this.products = products
      }
      finally {
        this.totalPages = Math.ceil(this.products.length / ITEM_PER_PAGE)
      }
    }
  }
})
