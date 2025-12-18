<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router';
import { useFilterStore } from '@/stores/FilterStore';
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const filterStore = useFilterStore();
const router = useRouter();
const route = useRoute();

const handleClearFilters = () => {
  filterStore.clearAll();

  router.push({
    path: route.path,
    query: {}
  });
};
</script>

<template>
  <div class="flex justify-between items-center px-4 py-2">
    <h1 class="font-semibold text-gray-700">FILTERS</h1>

    <div
      @click="handleClearFilters"
      class="ml-auto flex items-center gap-1 text-sm text-gray-500 cursor-pointer hover:text-gray-700"
    >
      <ArrowPathIcon class="h-4 w-4" />
      <span> {{ $t('clearFilter') }}</span>
    </div>
  </div>
</template>
