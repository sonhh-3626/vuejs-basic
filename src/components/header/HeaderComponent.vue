<script setup lang="ts">
import './HeaderComponent.css';
import AppLogo from '../common/logo/AppLogo.vue';
import SearchBox from '../common/search/SearchBox.vue';
import { ref, watch } from 'vue';

const emit = defineEmits<{
  (e: 'update:searchTerm', value: string): void
}>();

const searchTerm = ref('');

watch(searchTerm, (newVal) => {
  emit('update:searchTerm', newVal || '');
});
</script>

<template>
  <header class="header flex flex-col items-center justify-center p-33">
    <AppLogo />
    <h1 class="header-title text-4xl text-white p-5">
      {{ $t('slogan') }}
    </h1>
    <SearchBox v-model:search-term="searchTerm" />
  </header>
</template>
