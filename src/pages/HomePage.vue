<script setup lang='ts'>
import Header from '@/components/header/HeaderComponent.vue';
import ProductList from '@/components/model/product/ProductList.vue';
</script>

<template>
  <div class="flex flex-col gap-10">
    <Header />
    <div class="flex justify-center gap-6">
      <ProductList />
    </div>
  </div>
</template>
