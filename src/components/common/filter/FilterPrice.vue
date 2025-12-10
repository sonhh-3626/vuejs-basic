<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import FilterHeader from "./FilterHeader.vue";

const MIN = 0;
const MAX = 5000;

const minValue = ref(9);
const maxValue = ref(3046);
const isDraggingMin = ref(false);
const isDraggingMax = ref(false);
const sliderRef = ref<HTMLElement | null>(null);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US").format(Math.round(value));

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
  const value = MIN + position * (MAX - MIN);

  if (isDraggingMin.value) {
    minValue.value = Math.max(MIN, Math.min(value, maxValue.value - 1));
  }
  if (isDraggingMax.value) {
    maxValue.value = Math.min(MAX, Math.max(value, minValue.value + 1));
  }
};

const handleMouseUp = () => {
  isDraggingMin.value = false;
  isDraggingMax.value = false;
};

const minPercent = computed(() => ((minValue.value - MIN) / (MAX - MIN)) * 100);
const maxPercent = computed(() => ((maxValue.value - MIN) / (MAX - MIN)) * 100);

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("touchmove", handleMouseMove);
  document.addEventListener("touchend", handleMouseUp);
});

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
      <!-- Price Range Display -->
      <div class="flex items-center justify-between mb-8 text-sm">
        <span class="text-amber-600 font-semibold">$ {{ formatCurrency(minValue) }}</span>
        <span class="text-gray-400">-</span>
        <span class="text-amber-600 font-semibold">$ {{ formatCurrency(maxValue) }}</span>
      </div>

      <!-- Slider -->
      <div class="relative">
        <div ref="sliderRef" class="relative h-1 bg-gray-200 rounded-full">
          <!-- Active Range -->
          <div
            class="absolute h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
            :style="{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }"
          />

          <!-- Min Thumb -->
          <div
            class="absolute w-4 h-4 bg-white border-2 border-amber-500 rounded-full shadow-md cursor-grab -translate-x-1/2 -translate-y-1/2 top-1/2 hover:scale-110 transition-transform"
            :class="{ 'scale-125 cursor-grabbing': isDraggingMin }"
            :style="{ left: `${minPercent}%` }"
            @mousedown.prevent="isDraggingMin = true"
            @touchstart.prevent="isDraggingMin = true"
          />

          <!-- Max Thumb -->
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
