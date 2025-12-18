import { defineStore } from 'pinia'
import { DEFAULT_MAX_PRICE } from '@/constants/filter'

interface FilterState {
  searchTerm: string
  selectedCategories: string[]
  selectedBrands: string[]
  priceRange: { min: number; max: number }
  minRating: number
  onlyInStock: boolean
  isFreeship: boolean
}

export const useFilterStore = defineStore('filter', {
  state: (): FilterState => ({
    searchTerm: '',
    selectedCategories: [],
    selectedBrands: [],
    priceRange: { min: 0, max: DEFAULT_MAX_PRICE },
    minRating: 0,
    onlyInStock: false,
    isFreeship: false
  }),
  actions: {
    clearAll() {
      this.searchTerm = ''
      this.selectedCategories = []
      this.priceRange = { min: 0, max: DEFAULT_MAX_PRICE }
      this.minRating = 0
      this.selectedBrands = []
      this.onlyInStock = false
      this.isFreeship = false
    },
    setIsFreeShip(value: boolean) {
      this.isFreeship = value;
    },
    setPriceRange(min: number, max: number) {
      this.priceRange = { min, max }
    },
    setMinRating(rating: number) {
      this.minRating = rating;
    },
    setSelectedBrands(brands: string[]) {
      this.selectedBrands = brands;
    },
    setSelectedCategories(titles: string[]) {
      this.selectedCategories = titles;
    }
  },
})
