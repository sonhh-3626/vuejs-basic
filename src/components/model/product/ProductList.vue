<script setup lang='ts'>
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue';
import ProductCard from '@/components/model/product/ProductCard.vue'
import Pagination from '@/components/common/pagination/PaginationComponent.vue'
import { useProductStore } from '@/stores/productStore';
import NotFound from '@/components/common/not-found/NotFound.vue';

const productStore = useProductStore()
const { searchTerm, currentPage, totalPages } = storeToRefs(productStore)

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const filteredProducts = computed(() =>
  productStore.getFilteredProducts()
);

watch(searchTerm, () => {
  productStore.resetPagination
})
</script>

<template>
  <div class="max-w-6xl">
    <div v-if="productStore.products.length === 0"
         class="text-center py-12 col-span-full">
      <NotFound />
    </div>

    <ul v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.name + product.brand"
        :product="product"
      />
    </ul>

    <Pagination
      v-if="totalPages > 1"
      :current-page="currentPage"
      :total-pages="totalPages"
      @change="handlePageChange"
    />
  </div>
</template>
