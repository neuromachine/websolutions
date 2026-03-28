<script setup>
import Content from "@/components/blocks/services/presentation/content.vue"
import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
const { blockStore } = usePageOrchestrator('page', 'item', {
  fetch: (route) => route.params.slug ?? route.name
})
</script>
<template>
  <!-- Start Services Details Section -->
  <section class="services-details-area section-padding">
    <div v-if="blockStore.isItemReady" class="container">
      <div class="row">
        <!--
        <div v-if="blockStore.item.key==='price'" class="col-lg-12 col-md-12">

        </div>
       <div v-else class="col-lg-12 col-md-12">
          <div class="services-details-content">
            <div class="features-text" v-html="blockStore.item.properties.content"></div>
          </div>
        </div>-->
        <Content :content="blockStore.item.properties.content" />
      </div>
    </div>
    <div v-else class="container"><div class="row row_load">Loading Item</div></div>
  </section>
  <!-- End Services Details Section -->
</template>