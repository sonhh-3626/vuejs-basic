<script setup lang='ts'>
import { computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { StarIcon } from '@heroicons/vue/24/solid';
import FilterHeader from './FilterHeader.vue';
import { useFilterStore } from '@/stores/FilterStore';
import { useProductStore } from '@/stores/productStore';
import { MAX_RATING, MIN_RATING } from '@/constants/filter';

const filterStore = useFilterStore();
const productStore = useProductStore();
const router = useRouter();
const route = useRoute();

const ratingOptions = computed(() => productStore.ratings);

const selectedRating = computed<number | null>({
  get: () => filterStore.minRating || null,
  set: (value) => filterStore.setMinRating(value ?? MIN_RATING)
});

watch(
  () => filterStore.minRating,
  (rating) => {
    const query = { ...route.query };

    rating > 0
      ? (query.rating = rating.toString())
      : delete query.rating;

    router.replace({ query });
  }
);


const handleRatingClick = (stars: number) => {
  const newRating = selectedRating.value === stars ? null : stars;
  selectedRating.value = newRating;
};
</script>

<template>
  <div>
    <FilterHeader title='RATINGS' />
    <div class="px-4 pb-2 space-y-2">
      <button
        v-for="option in ratingOptions"
        :key="option.stars"
        @click="handleRatingClick(option.stars)"
        :disabled="option.count === 0"
        class="w-full flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-200"
        :class="[
          selectedRating === option.stars
            ? 'border-yellow-400 bg-yellow-50'
            : option.count > 0
              ? 'border-transparent hover:bg-gray-50 cursor-pointer'
              : 'border-transparent bg-gray-50 opacity-50 cursor-not-allowed'
        ]"
      >
        <div class="flex items-center gap-1">
          <StarIcon
            v-for="i in MAX_RATING"
            :key="i"
            class="w-4 h-4"
            :class="i <= option.stars ? 'text-yellow-400' : 'text-gray-200'"
          />
          <span class="text-xs text-gray-600 ml-1">& up</span>
        </div>

        <span
          class="text-xs font-medium transition-colors"
          :class="[
            selectedRating === option.stars
              ? 'text-yellow-600'
              : option.count > 0
                ? 'text-gray-400'
                : 'text-gray-300'
          ]"
        >
          {{ option.count.toLocaleString() }}
        </span>
      </button>
    </div>
  </div>
</template>
