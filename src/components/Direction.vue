<script setup>
import catClass from "@/components/blocks/services/catClass.vue";
import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
const { blockStore, navigationStore } = usePageOrchestrator('direction', 'structure+category', {
  fetch: (route) => route.params.slug
})
</script>

<template>
  <!-- Start Services Two Section -->
  <section class="services-section-two section-padding">
    <div v-if="blockStore.isCatReady" class="container">
      <div class="row">
<!--        <h2>{{blockStore.category.content.title}}</h2>-->
<!--        <div class="descr" v-html="blockStore.category.content.descr"></div>-->
        <div class="content" v-html="blockStore.category.content.content"></div>
      </div>
    </div>
    <div v-else class="container"><div class="row row_load">Loading Block</div></div>
    <!--
    <div  v-if=navigationStore.isStrReady class="container">
      <div class="row">
        <h2>{{navigationStore.structure.name}}</h2>
        <div class="descr" v-html="navigationStore.structure.description"></div>
        <div class="content" v-html="navigationStore.structure.content"></div>
      </div>
      <div class="row">
        <div v-for="(item, index) in navigationStore.structure.child" :key="index" class="col-lg-4 col-md-6">
          <catClass
              :slug=item.key
              :name=item.name
              :descr=item.description
              :childs=item.child
          />
        </div>
      </div>
    </div>
    <div v-else class="container"><div class="row row_load">Loading Structure</div></div>
    -->
  </section>
  <!-- End Services Two Section -->
</template>