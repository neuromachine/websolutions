<script setup>
import List from "@/components/blocks/portfolio/presentation/list.vue";
import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
const { blockStore } = usePageOrchestrator('portfolio', 'category', {
  fetch: (route) => 'portfolio'
})

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

function setFilter(filterKey) {
  blockStore.filter = filterKey
}
</script>

<template>
  <!-- Start Portfolio Section-->
  <section v-if="blockStore.isCatReady" class="portfolio-area section-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">
              {{ t("portfolio.title") }}
            </h6>
            <h2>
              {{ t("portfolio.subtitle") }}
            </h2>
          </div>
        </div>
        <div class="col-md-12">
          <div class="portfolio-list">
            <ul class="nav" id="portfolio-flters">
              <li class="filter filter-active" @click="setFilter('*')">{{ t("filter.all") }}</li>
              <li @click="setFilter('develop')">{{ t("filter.develop") }}</li>
              <li @click="setFilter('html')">{{ t("filter.html") }}</li>
              <li @click="setFilter('design')">{{ t("filter.design") }}</li>
            </ul>
          </div>
        </div>
      </div>
      <List :items="blockStore.filteredItems"/>
    </div>
  </section>
  <!-- End Portfolio Section -->
</template>
