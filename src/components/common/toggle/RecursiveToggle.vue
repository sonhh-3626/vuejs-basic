<script setup lang="ts">
import { ref, computed } from "vue";
import { categories } from "@/constants/categories";
import { buildTree } from "@/shared/utils/buildTree";
import ToggleItem from "./ToggleItem.vue";

const selectedId = ref<number | null>(null);
const categoryTree = computed(() => buildTree(categories));
</script>

<template>
  <div class="px-4 pb-2">
    <ToggleItem
      v-for="category in categoryTree"
      :key="category.id"
      :category="category"
      :selectedId="selectedId"
      @update:selectedId="selectedId = $event"
    />
  </div>
</template>
