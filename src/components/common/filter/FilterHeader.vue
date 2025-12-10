<script setup lang='ts'>
const props = defineProps<{
  title: string
}>();
</script>

<template>
  <h2 class="text-xs font-semibold text-gray-600 tracking-wide uppercase px-4 py-3">
    {{ props.title }}
  </h2>
</template>
