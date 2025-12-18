<script setup lang='ts'>
import { ref, watch } from "vue";
import { type CategoryItem } from "@/shared/utils/buildTree";
import ToggleItem from "./ToggleItem.vue";

const props = defineProps<{
  categories?: CategoryItem[];
  selectedIds: string[];
}>();

const emit = defineEmits<{
  (e: 'update:selectedIds', ids: string[]): void;
}>();

const localSelectedIds = ref<string[]>([...props.selectedIds]);

watch(() => props.selectedIds, (newIds) => {
  localSelectedIds.value = [...newIds];
}, { immediate: true });

const handleSelectionChange = (newSelectedIds: string[]) => {
  localSelectedIds.value = newSelectedIds;
  emit('update:selectedIds', newSelectedIds);
};
</script>

<template>
  <div class="px-4 pb-2 max-h-72 overflow-y-auto">
    <ToggleItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
      :selected-ids="localSelectedIds"
      @update:selected-ids="handleSelectionChange"
    />
  </div>
</template>
