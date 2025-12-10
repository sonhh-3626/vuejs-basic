<script setup lang='ts'>
import LookupIcon from './LookupIcon.vue';
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <LookupIcon />
    <h2 class="text-2xl font-medium font-bold w-1/2 text-center">
      {{ $t('haveNoProduct') }}
    </h2>
    <div class="text-center text-gray-500">
      {{ $t('tryResetFilters') }}
    </div>
  </div>
</template>
