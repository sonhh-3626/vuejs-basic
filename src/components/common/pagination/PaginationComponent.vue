<script setup lang='ts'>
import { computed } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import PaginationButton from './PaginationNavigate.vue';
import { PAGE_RANGE_DISPLAYED } from '@/constants/pagination';

const props = withDefaults(defineProps<{
  currentPage?: number;
  totalPages?: number;
}>(), {
  currentPage: 1,
  totalPages: 1
});

const emit = defineEmits(['change']);

const changePage = (page: number) => {
  emit('change', page);
};

const visiblePages = computed(() => {
  let start = props.currentPage - 2;

  if (start < 1) start = 1;

  let end = start + PAGE_RANGE_DISPLAYED - 1;

  if (end > props.totalPages) {
    end = props.totalPages;
    start = Math.max(1, end - PAGE_RANGE_DISPLAYED + 1);
  }

  const pages = [];
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }
  return pages;
});
</script>

<template>
  <div class="flex justify-center items-center gap-2">
    <PaginationButton
      :disabled="props.currentPage === 1"
      direction="prev"
      @click="changePage(props.currentPage - 1)"
    >
      <ChevronLeftIcon class="h-5 w-5"/>
    </PaginationButton>

    <button
      v-for="page in visiblePages"
      :key="page"
      class="px-3 py-1 rounded-sm border"
      :class="page === props.currentPage ? 'bg-orange-500 text-white' : 'bg-white hover:bg-orange-300'"
      @click="changePage(page)"
    >
      {{ page }}
    </button>

    <PaginationButton
      :disabled="props.currentPage === props.totalPages"
      direction="next"
      @click="changePage(props.currentPage + 1)"
    >
      <ChevronRightIcon class="h-5 w-5"/>
    </PaginationButton>
  </div>
</template>
