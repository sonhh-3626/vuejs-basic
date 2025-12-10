<script setup lang='ts'>
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="text-3xl text-green-600 p-6">
      {{ $t('hello') }}
      {{ msg }}
    </h1>
  </div>
</template>
