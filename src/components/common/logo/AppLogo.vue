<script setup lang='ts'>
import { computed } from 'vue';
const props = defineProps<{
  size?: string;
}>();

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-24';
    case 'md':
      return 'w-32';
    case 'lg':
      return 'w-48';
    default:
      return 'w-24';
  }
});
</script>

<template>
  <a href='https://algolia.com' aria-label='Go to the Algolia website'>
    <img
      :class="sizeClass"
      src='@/assets/images/algolia-light-logo.svg'
      alt='Algolia Logo'
    />
  </a>
</template>
