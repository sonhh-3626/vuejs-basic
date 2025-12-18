<script setup lang='ts'>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import FilterHeader from './FilterHeader.vue';
import { useFilterStore } from '@/stores/FilterStore';
import { useProductStore } from '@/stores/productStore';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { MIN_GAP } from '@/constants/filter';

const filterStore = useFilterStore();
const productStore = useProductStore();
const router = useRouter();
const route = useRoute();

const absoluteMinPrice = computed(() => productStore.minPrice);
const absoluteMaxPrice = computed(() => productStore.maxPrice);

const minValue = ref(absoluteMinPrice.value);
const maxValue = ref(absoluteMaxPrice.value);
const isDraggingMin = ref(false);
const isDraggingMax = ref(false);
const sliderRef = ref<HTMLElement | null>(null);

watch([absoluteMinPrice, absoluteMaxPrice], ([newMin, newMax]) => {
  if (!isDraggingMin.value && !isDraggingMax.value) {
    minValue.value = Math.max(newMin, Math.min(minValue.value, newMax));
    maxValue.value = Math.min(newMax, Math.max(maxValue.value, newMin));
  }
});

onMounted(() => {
  const minFromUrl = route.query.minPrice;
  const maxFromUrl = route.query.maxPrice;

  if (minFromUrl) {
    const min = Number(minFromUrl);
    if (!isNaN(min)) {
      minValue.value = Math.max(absoluteMinPrice.value, min);
    }
  } else {
    minValue.value = absoluteMinPrice.value;
  }

  if (maxFromUrl) {
    const max = Number(maxFromUrl);
    if (!isNaN(max)) {
      maxValue.value = Math.min(absoluteMaxPrice.value, max);
    }
  } else {
    maxValue.value = absoluteMaxPrice.value;
  }

  if (minFromUrl || maxFromUrl) {
    filterStore.setPriceRange(minValue.value, maxValue.value);
  }

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("touchmove", handleMouseMove);
  document.addEventListener("touchend", handleMouseUp);
});

const updateURL = () => {
  const query = { ...route.query };

  if (minValue.value !== absoluteMinPrice.value) {
    query.minPrice = minValue.value.toString();
  } else {
    delete query.minPrice;
  }

  if (maxValue.value !== absoluteMaxPrice.value) {
    query.maxPrice = maxValue.value.toString();
  } else {
    delete query.maxPrice;
  }

  router.push({ query });
};

const getPositionFromEvent = (e: MouseEvent | TouchEvent) => {
  const slider = sliderRef.value;
  if (!slider) return 0;

  const rect = slider.getBoundingClientRect();
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const pos = (clientX - rect.left) / rect.width;
  return Math.max(0, Math.min(1, pos));
};

const handleMouseMove = (e: MouseEvent | TouchEvent) => {
  if (!isDraggingMin.value && !isDraggingMax.value) return;

  const position = getPositionFromEvent(e);
  const value = absoluteMinPrice.value + position * (absoluteMaxPrice.value - absoluteMinPrice.value);

  if (isDraggingMin.value) {
    const newMin = Math.max(absoluteMinPrice.value, Math.min(value, maxValue.value - MIN_GAP));
    minValue.value = newMin;
    filterStore.setPriceRange(newMin, maxValue.value);
  }
  if (isDraggingMax.value) {
    const newMax = Math.min(absoluteMaxPrice.value, Math.max(value, minValue.value + MIN_GAP));
    maxValue.value = newMax;
    filterStore.setPriceRange(minValue.value, newMax);
  }
};

const handleMouseUp = () => {
  isDraggingMin.value = false;
  isDraggingMax.value = false;
  updateURL();
};

const minPercent = computed(() =>
  ((minValue.value - absoluteMinPrice.value) / (absoluteMaxPrice.value - absoluteMinPrice.value)) * 100
);
const maxPercent = computed(() =>
  ((maxValue.value - absoluteMinPrice.value) / (absoluteMaxPrice.value - absoluteMinPrice.value)) * 100
);

onBeforeUnmount(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
  document.removeEventListener("touchmove", handleMouseMove);
  document.removeEventListener("touchend", handleMouseUp);
});
</script>

<template>
  <div>
    <FilterHeader title="PRICE" />
    <div class="px-4 pb-4">
      <div class="flex items-center justify-between mb-8 text-sm">
        <span class="text-amber-600 font-semibold">
          $ {{ formatCurrency(minValue) }}
        </span>
        <span class="text-gray-400">-</span>
        <span class="text-amber-600 font-semibold">
          $ {{ formatCurrency(maxValue) }}
        </span>
      </div>

      <div class="relative">
        <div ref="sliderRef" class="relative h-1 bg-gray-200 rounded-full">
          <div
            class="absolute h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
            :style="{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }"
          />

          <div
            class="absolute w-4 h-4 bg-white border-2 border-amber-500 rounded-full shadow-md cursor-grab -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 transition-transform"
            :class="{ 'scale-125 cursor-grabbing': isDraggingMin }"
            :style="{ left: `${minPercent}%` }"
            @mousedown.prevent="isDraggingMin = true"
            @touchstart.prevent="isDraggingMin = true"
          />

          <div
            class="absolute w-4 h-4 bg-white border-2 border-amber-500 rounded-full shadow-md cursor-grab -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 transition-transform"
            :class="{ 'scale-125 cursor-grabbing': isDraggingMax }"
            :style="{ left: `${maxPercent}%` }"
            @mousedown.prevent="isDraggingMax = true"
            @touchstart.prevent="isDraggingMax = true"
          />
        </div>
      </div>
    </div>
  </div>
</template>
