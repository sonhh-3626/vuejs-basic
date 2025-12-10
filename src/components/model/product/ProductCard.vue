<script setup lang="ts">
import { computed } from "vue";
import { StarIcon } from "@heroicons/vue/24/solid";
import type { Product } from "@/shared/types/Product";

const props = defineProps<{
  product: Product
}>();

const fullTitle = computed(() =>
  `${props.product.brand} - ${props.product.name}`
);
</script>

<template>
  <li class="bg-white rounded-lg overflow-hidden">
    <article class="h-full flex flex-col">
      <header class="bg-gray-100  flex items-center justify-center h-48">
        <img
          :alt="product.name"
          class="max-h-full max-w-full object-contain"
          :src="product.image"
        />
      </header>

      <div class=" flex-1 flex flex-col">
        <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>

        <h2 class="text-base font-bold font-black mb-2 line-clamp-2">
          {{ fullTitle }}
        </h2>

        <p class="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
          {{ product.description }}
        </p>

        <footer class="mt-auto my-3">
          <div class="flex gap-4">
            <p class="font-bold text-gray-800">
              <span class="text-yellow-400 font-bold text-sm">$</span> {{ product.price.toFixed(2) }}
            </p>

            <div class="flex items-center gap-1 rounded-sm border border-yellow-400 px-0.5 py-0.5">
              <StarIcon
                class="w-4 h-4"
                :class="'text-yellow-400'"
              />
              <span class="text-sm font-semibold text-gray-700">
                {{ product.rating.toFixed() }}
              </span>
            </div>
          </div>
        </footer>
      </div>

    </article>
  </li>
</template>
