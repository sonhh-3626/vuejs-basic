<script setup lang="ts">
import { ref } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import FilterHeader from "./FilterHeader.vue";

const selectedRating = ref<number | null>(null);

const ratingOptions = [
  { stars: 5, count: 190274 },
  { stars: 4, count: 171908 },
  { stars: 3, count: 137543 },
  { stars: 2, count: 18048 }
];

const handleRatingClick = (stars: number) => {
  selectedRating.value = selectedRating.value === stars ? null : stars;
};
</script>

<template>
  <div>
    <FilterHeader title="RATINGS" />
    <div class="px-4 pb-2 space-y-2">
      <button
        v-for="option in ratingOptions"
        :key="option.stars"
        @click="handleRatingClick(option.stars)"
        class="w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-200"
        :class="
          selectedRating === option.stars
            ? 'border-yellow-400 bg-yellow-50'
            : 'border-transparent hover:bg-gray-50'
        "
      >
        <div class="flex items-center gap-1">
          <StarIcon
            v-for="i in 5"
            :key="i"
            class="w-4 h-4"
            :class="i <= option.stars ? 'text-yellow-400' : 'text-gray-200'"
          />
        </div>
        <span class="text-xs text-gray-400 font-medium">{{ option.count.toLocaleString() }}</span>
      </button>
    </div>
  </div>
</template>
