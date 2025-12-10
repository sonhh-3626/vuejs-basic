<script setup lang='ts'>
import FilterCategory from './FilterCategory.vue';
import FilterBrands from './FilterBrands.vue';
import FilterRating from './FilterRating.vue';
import FilterFreeShip from './FilterFreeShip.vue';
import FilterPrice from './FilterPrice.vue';
import Divider from '../divider/Divider.vue';
import FilterTitle from './FilterTitle.vue';
</script>

<template>
  <div class="w-64 bg-white">
    <FilterTitle />
    <Divider />
    <FilterCategory />
    <Divider />
    <FilterBrands />
    <Divider />
    <FilterPrice />
    <Divider />
    <FilterFreeShip />
    <Divider />
    <FilterRating />
  </div>
</template>
