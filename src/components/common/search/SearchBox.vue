<script setup lang='ts'>
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/16/solid'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { watch } from 'vue'

const productStore = useProductStore()
const { searchTerm } = storeToRefs(productStore)

const route = useRoute()
const router = useRouter()

watch(
  () => searchTerm.value,
  (val) => {
    router.replace({
      query: {
        ...route.query,
        query: val || undefined,
      },
    })
  }
)
</script>

<template>
  <div class="bg-white flex items-center p-3 w-full max-w-2xl rounded-md relative">
    <div class="px-3 py-2">
      <MagnifyingGlassIcon class="h-5 w-5 text-yellow-400" />
    </div>

    <input v-model="searchTerm" class="ml-2 w-full outline-none" type="text" placeholder="Search..." />

    <button v-if="searchTerm" @click="searchTerm = ''" class="absolute right-4 text-gray-400 hover:text-gray-600">
      <XMarkIcon class="h-5 w-5" />
    </button>
  </div>
</template>
