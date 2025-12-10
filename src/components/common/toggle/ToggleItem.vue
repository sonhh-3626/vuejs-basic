<script setup lang="ts">
import { ref, computed } from 'vue';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';

interface Category {
  id: number;
  title: string;
  count: number;
  children?: Category[];
}

const props = defineProps<{
  category: Category;
  level?: number;
  selectedId: number | null;
}>();

const emit = defineEmits(["update:selectedId"]);

const isOpen = ref(false);

const level = computed(() => props.level ?? 0);
const hasChildren = computed(() => props.category.children && props.category.children.length > 0);
const isSelected = computed(() => props.selectedId === props.category.id);

const paddingLeft = computed(() => level.value * 16 + 8 + "px");

const handleClick = () => {
  emit("update:selectedId", props.category.id);
  if (hasChildren.value) {
    isOpen.value = !isOpen.value;
  }
};
</script>

<template>
  <div class="select-none">
    <div
      class="flex items-center justify-between py-2 px-3 cursor-pointer transition-colors"
      :class="{
        'bg-blue-50 border-l-4 border-blue-600': isSelected,
        'hover:bg-gray-100': !isSelected,
        'font-medium': level === 0
      }"
      :style="{ paddingLeft }"
      @click="handleClick"
    >
      <div class="flex items-center gap-2 flex-1">
        <span
          v-if="hasChildren"
          class="transition-transform duration-200"
          :class="isSelected ? 'text-blue-600' : 'text-gray-500'"
        >
          <ChevronDownIcon v-if="isOpen" class="h-4 w-4" />
          <ChevronRightIcon v-else class="h-4 w-4" />
        </span>

        <span v-else class="w-4" />

        <span
          class="text-sm"
          :class="isSelected ? 'font-semibold text-blue-700' : 'text-gray-800'"
        >
          {{ category.title }}
        </span>
      </div>

      <!-- Count -->
      <span
        class="text-sm ml-2"
        :class="isSelected ? 'font-semibold text-blue-600' : 'text-gray-500'"
      >
        {{ category.count }}
      </span>
    </div>

    <!-- Recursive children -->
    <div v-if="hasChildren && isOpen" class="transition-all duration-200 ease-in-out">
      <ToggleItem
        v-for="child in category.children"
        :key="child.id"
        :category="child"
        :level="level + 1"
        :selectedId="selectedId"
        @update:selectedId="emit('update:selectedId', $event)"
      />
    </div>
  </div>
</template>
