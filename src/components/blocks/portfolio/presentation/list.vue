<script setup>
import work from "@/components/blocks/portfolio/presentation/work.vue";
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
</script>

<template>
  <div class="portfolio-container">
<!--    <div>{{dataStore.filteredItems}}</div>-->
    <TransitionGroup name="fade" tag="div" class="grid row">
      <work v-for="item in dataStore.filteredItems"
            :key="item.id"
            :slug="item.key"
            :properties="item.properties"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>

</style>