<script setup>
import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
import List from "@/components/blocks/services/list.vue";
const { navigationStore } = usePageOrchestrator(null, 'structure', {
  fetch: (route) => route.name
})
</script>
<template>
  <List :items="navigationStore.structure?.child" />
</template>