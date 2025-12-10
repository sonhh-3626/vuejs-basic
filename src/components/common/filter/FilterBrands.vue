<script setup lang='ts'>
import { ref, computed } from 'vue';
import { MagnifyingGlassIcon } from '@heroicons/vue/16/solid';
import { brands } from '@/constants/brands';
import FilterHeader from './FilterHeader.vue';

const searchTerm = ref('');
const selectedBrands = ref<number[]>([]);

const filteredBrands = computed(() => {
  return brands
    .filter((brand) =>
      brand.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
});

const toggleBrand = (brandId: number) => {
  const index = selectedBrands.value.indexOf(brandId);
  if (index > -1) {
    selectedBrands.value.splice(index, 1);
  } else {
    selectedBrands.value.push(brandId);
  }
};
</script>

<template>
  <div>
    <FilterHeader title='BRANDS' />
    <div class="px-4 pb-2">
      <div class="relative mb-2">
        <MagnifyingGlassIcon class="h-4 w-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search for brands..."
          class="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          v-model="searchTerm"
        />
      </div>

      <div class="max-h-72 overflow-y-auto space-y-1">
        <label
          v-for="brand in filteredBrands"
          :key="brand.id"
          class="flex items-center justify-between px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer group"
        >
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <input
              type="checkbox"
              class="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-1 focus:ring-blue-500 cursor-pointer"
              :checked="selectedBrands.includes(brand.id)"
              @change="toggleBrand(brand.id)"
            />
            <span class="text-sm text-gray-700 truncate">{{ brand.title }}</span>
          </div>
          <span class="text-xs text-gray-400 ml-2 font-medium">{{ brand.count }}</span>
        </label>
      </div>
    </div>
  </div>
</template>
