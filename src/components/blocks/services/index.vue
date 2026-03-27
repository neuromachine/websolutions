<script setup>
import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
import List from "@/components/blocks/services/list.vue";
import Info from "@/components/blocks/services/presentation/info.vue"
const { blockStore,navigationStore } = usePageOrchestrator('services', 'structure+category', {
  fetch: (route) => route.name
})
</script>
<template>
  <template v-if="blockStore.catReady && navigationStore.strReady">
    <section class="service_section mb-5">
      <Info :data="blockStore.category" />
<!--      <List :items="navigationStore.structure?.child" />-->
    </section>
  </template>
</template>