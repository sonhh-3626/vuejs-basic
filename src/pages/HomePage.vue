<script setup lang="ts">
import { ref } from 'vue';
import Header from '@/components/header/HeaderComponent.vue';
import ProductList from '@/components/model/product/ProductList.vue';

const searchQuery = ref('');

const updateSearch = (term: string) => {
  searchQuery.value = term;
};
</script>

<template>
  <div class="flex flex-col gap-10">
    <Header @update:search-term="updateSearch" />
    <div class="flex justify-center gap-6">
      <ProductList :search-term="searchQuery" />
    </div>
  </div>
</template>
