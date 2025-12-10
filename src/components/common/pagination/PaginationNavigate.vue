<script setup lang='ts'>
defineProps<{
  disabled?: boolean;
  direction: 'prev' | 'next';
}>();

const emit = defineEmits(['click']);
</script>

<template>
  <button
    class="px-3 py-1 rounded-sm bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>
