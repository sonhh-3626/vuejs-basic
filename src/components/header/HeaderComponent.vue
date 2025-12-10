<script setup lang="ts">
import './HeaderComponent.css';
import AppLogo from '../common/logo/AppLogo.vue';
import SearchBox from '../common/search/SearchBox.vue';
</script>

<template>
  <header class="header flex flex-col items-center justify-center p-33">
    <AppLogo />
    <h1 class="header-title text-4xl text-white p-5">
      {{ $t('slogan') }}
    </h1>
    <SearchBox />
  </header>
</template>
