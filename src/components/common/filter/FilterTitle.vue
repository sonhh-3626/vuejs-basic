<script setup lang="ts">
import { ArrowPathIcon } from '@heroicons/vue/24/outline'

const handleClearFilters = () => {
  // Logic to clear all applied filters
  console.log("Filters cleared");
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
      <span>clear filter</span>
    </div>
  </div>
</template>
