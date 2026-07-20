<script setup>
import List from "@/components/blocks/portfolio/presentation/list.vue";
import Filters from "@/components/blocks/portfolio/presentation/filters.vue";
import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
const { blockStore } = usePageOrchestrator('portfolio', 'category', {
  fetch: (route) => 'portfolio'
})

import Info from "@/components/blocks/services/presentation/info.vue";

function setFilter(filterKey) {
  blockStore.filter = filterKey
}
</script>

<template>
  <section v-if="blockStore.isCatReady" class="portfolio-area section-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <Filters :activeFilter="blockStore.filter || '*'" @select="setFilter" />
        </div>
      </div>
      <List :items="blockStore.filteredItems"/>
    </div>
  </section>
  <section v-if="blockStore.catReady" class="mb-5">
    <Info :data="blockStore.category" />
  </section>
  <!-- End Portfolio Section -->
</template>
