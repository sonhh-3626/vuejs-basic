<script setup lang="ts">
import { ref } from "vue";
import { ChevronDownIcon } from "@heroicons/vue/16/solid";

const props = defineProps({
  options: {
    type: Array as () => string[],
    required: true
  }
});

const selected = ref(props.options[0]);
</script>

<template>
  <div class="relative cursor-pointer text-sm text-gray-600">
    <select
      v-model="selected"
      class="appearance-none bg-white pr-6 outline-none"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
        <ChevronDownIcon
      class="h-4 w-4 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
    />
  </div>
</template>
