<script setup lang="ts">
import { ref } from 'vue';
import FilterHeader from './FilterHeader.vue';

const isChecked = ref(false);
</script>

<template>
  <div>
    <FilterHeader title="FREE SHIPPING" />
    <div class="px-4 pb-2">
      <div class="flex items-center justify-between gap-3">
        <label for="free-shipping" class="text-sm text-gray-700 cursor-pointer flex-1">
          Display only items with free shipping
        </label>

        <div
          @click="isChecked = !isChecked"
          class="w-9 h-5 rounded-full cursor-pointer transition-colors duration-200 relative"
          :class="isChecked ? 'bg-blue-500' : 'bg-gray-300'"
        >
          <div
            class="w-4 h-4 bg-white rounded-full shadow absolute top-0.5 transition-transform duration-200"
            :class="isChecked ? 'translate-x-4' : 'translate-x-0.5'"
          />
        </div>

        <span class="text-xs font-medium text-gray-500 w-5">
          {{ isChecked ? 'Yes' : 'No' }}
        </span>
      </div>
    </div>
  </div>
</template>
