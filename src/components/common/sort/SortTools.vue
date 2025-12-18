<script setup lang='ts'>
import SortBy from './SortBy.vue';
import SortItemPerPage from './SortItemPerPage.vue';
</script>

<template>
  <div class="flex justify-end items-center gap-8 px-4 py-2">
    <SortBy :options="['featured', 'price asc', 'price desc']" />
    <SortItemPerPage :options="['16 hits per page', '32 hits per page', '64 hits per page']" />
  </div>
</template>
