<script setup lang='ts'>
import FilterHeader from './FilterHeader.vue';
import { useFilterStore } from '@/stores/FilterStore';
import { computed } from 'vue';

const filterStore = useFilterStore();

const isFreeShip = computed<boolean>({
  get: () => filterStore.isFreeship,
  set: filterStore.setIsFreeShip
});
</script>

<template>
  <div>
    <FilterHeader title="FREE SHIPPING" />
    <div class="px-4 pb-2">
      <div class="flex items-center justify-between gap-3">
        <label
          class="text-sm text-gray-700 cursor-pointer flex-1"
        >
          Display only items with free shipping
        </label>

        <span class="text-xs font-medium text-gray-500 w-5">
          {{ isFreeShip ? 'Yes' : 'No' }}
        </span>
        <div
          @click="isFreeShip = !isFreeShip"
          class="w-9 h-5 rounded-full cursor-pointer transition-colors duration-200 relative"
          :class="isFreeShip ? 'bg-blue-500' : 'bg-gray-300'"
        >
          <div
            class="w-4 h-4 bg-white rounded-full shadow absolute top-0.5 transition-transform duration-200"
            :class="isFreeShip ? 'translate-x-4' : 'translate-x-0.5'"
          />
        </div>
      </div>
    </div>
  </div>
</template>
