<script setup lang='ts'>
import { ref, computed, watch } from 'vue';
import ProductCard from '@/components/model/product/ProductCard.vue';
import Pagination from '@/components/common/pagination/PaginationComponent.vue';
import { ITEM_PER_PAGE } from '@/constants/pagination';
import { products } from '@/constants/products';

const props = withDefaults(defineProps<{
  searchTerm?: string
}>(), {
  searchTerm: ''
});

const currentPage = ref(1);

const filteredProducts = computed(() => {
  const term = (props.searchTerm || '').trim();
  if (!term) return products;

  const lowerTerm = term.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerTerm) ||
    product.brand.toLowerCase().includes(lowerTerm)
  );
});

const totalPages = computed(() => {
  const tempTotalPage = Math.ceil(filteredProducts.value.length / ITEM_PER_PAGE);
  return Math.max(tempTotalPage, 1);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * ITEM_PER_PAGE;
  return filteredProducts.value.slice(start, start + ITEM_PER_PAGE);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

watch(filteredProducts, () => {
  currentPage.value = 1;
});
</script>

<template>
  <div class="max-w-6xl">
    <div v-if="filteredProducts.length === 0 && searchTerm.trim()"
         class="text-center py-12 col-span-full">
      <p class="text-gray-500 text-lg">{{ $t('haveNoProduct') }}</p>
    </div>

    <ul v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="product in paginatedProducts"
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
