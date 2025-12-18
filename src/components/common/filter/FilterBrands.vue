<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { MagnifyingGlassIcon } from '@heroicons/vue/16/solid';
import FilterHeader from './FilterHeader.vue';
import { useFilterStore } from '@/stores/FilterStore';
import { useProductStore } from '@/stores/productStore';
import { vHighlightSearch } from '@/composables/directives/highlight';
import { MAX_BRANDS } from '@/constants/filter';

const filterStore = useFilterStore();
const productStore = useProductStore();
const router = useRouter();
const route = useRoute();

const searchTerm = ref('');
const brands = computed(() => productStore.brands);

const selectedBrands = computed<string[]>({
  get: () => filterStore.selectedBrands,
  set: filterStore.setSelectedBrands
});

const filteredBrands = computed(() => {
  if (!brands.value.length) return [];

  const keyword = searchTerm.value.toLowerCase();

  return brands.value
    .filter(
      brand =>
        !keyword || brand.title.toLowerCase().includes(keyword)
    )
    .slice(0, MAX_BRANDS);
});

onMounted(() => {
  const fromUrl = route.query.brands;
  if (!fromUrl) return;

  const parsed = Array.isArray(fromUrl) ? fromUrl : [fromUrl];
  filterStore.setSelectedBrands(parsed.filter(Boolean) as string[]);
});

watch(
  () => selectedBrands.value,
  brands => {
    const query = { ...route.query };

    if (brands.length) {
      query.brands = brands;
    } else {
      delete query.brands;
    }

    router.replace({ query });
  },
  { deep: true }
);

watch(
  () => route.query.brands,
  value => {
    const parsed = value
      ? Array.isArray(value) ? value : [value]
      : [];

    filterStore.setSelectedBrands(parsed as string[]);
  }
);

const toggleBrand = (title: string) => {
  selectedBrands.value = selectedBrands.value.includes(title)
    ? selectedBrands.value.filter(b => b !== title)
    : [...selectedBrands.value, title];
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

      <div v-if="filteredBrands.length === 0" class="text-center py-4 text-gray-500 text-sm">
        No brands found
      </div>

      <div v-else class="max-h-72 overflow-y-auto space-y-1">
        <label
          v-for="brand in filteredBrands"
          :key="brand.id"
          class="flex items-center justify-between px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer group"
        >
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <input
              type="checkbox"
              class="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-1 focus:ring-blue-500 cursor-pointer"
              :checked="selectedBrands.includes(brand.title)"
              @change="toggleBrand(brand.title)"
            />
            <span v-highlight-search="{ text: brand.title, query: searchTerm }"></span>
          </div>
          <span class="text-xs text-gray-400 ml-2 font-medium">
            {{ brand.count.toLocaleString() }}
          </span>
        </label>
      </div>
    </div>
  </div>
</template>
