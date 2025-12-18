<script setup lang='ts'>
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFilterStore } from '@/stores/FilterStore';
import { useProductStore } from '@/stores/productStore';
import { buildTree } from '@/shared/utils/buildTree';
import RecursiveToggle from '@/components/common/toggle/RecursiveToggle.vue';
import FilterHeader from './FilterHeader.vue';

const filterStore = useFilterStore();
const productStore = useProductStore();
const route = useRoute();
const router = useRouter();

const categories = computed(() => productStore.categories);

const categoryTree = computed(() => {
  return categories.value.length
    ? buildTree(categories.value)
    : [];
});

const selectedCategories = computed<string[]>({
  get: () => filterStore.selectedCategories,
  set: filterStore.setSelectedCategories
});

onMounted(() => {
  const categoriesFromUrl = route.query.categories;
  if (!categoriesFromUrl) return;

  const parsed = Array.isArray(categoriesFromUrl)
    ? categoriesFromUrl
    : [categoriesFromUrl];

  filterStore.setSelectedCategories(parsed.filter(Boolean) as string[]);
});

watch(
  () => selectedCategories.value,
  categories => {
    const query = { ...route.query };

    if (categories.length) {
      query.categories = categories;
    } else {
      delete query.categories;
    }
    router.replace({ query });
  },
  { deep: true }
);

watch(
  () => route.query.categories,
  value => {
    const parsed = value
      ? Array.isArray(value) ? value : [value]
      : [];

    filterStore.setSelectedCategories(parsed as string[]);
  }
);
</script>

<template>
  <div>
    <FilterHeader title="CATEGORY" />
    <RecursiveToggle
      :categories="categoryTree"
      v-model:selected-ids="selectedCategories"
    />
  </div>
</template>
