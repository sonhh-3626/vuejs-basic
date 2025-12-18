<script setup lang='ts'>
import Header from '@/components/header/HeaderComponent.vue';
import FilterTools from '@/components/common/filter/FilterTools.vue';
import ProductList from '@/components/model/product/ProductList.vue';
import SortTools from '@/components/common/sort/SortTools.vue';
import Divider from '@/components/common/divider/Divider.vue';
</script>

<template>
  <div class="flex flex-col gap-10">
    <Header />
    <div class="mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center gap-6">
        <FilterTools />
        <main class="w-4/7">
          <SortTools />
          <Divider />
          <div class="mt-6">
            <ProductList />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
