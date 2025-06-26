<script setup>
import { onMounted, watch} from "vue";
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
import {useRoute} from "vue-router";
const route = useRoute();
function load() {
  dataStore.fetchBlockItem(route.params.slug);
  //dataStore.fetchStructure('services');
}
onMounted(() => {load()});
watch(
    () => route.params.slug,
    (newSlug, oldSlug) => {
      if (newSlug !== oldSlug) {
        load()
      }
    }
)
</script>
<template>
  <!-- Start Services Details Section -->
  <section class="services-details-area section-padding">
    <div v-if="dataStore.isItemReady" class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <div class="services-details-content">
            <div class="features-text" v-html="dataStore.item.properties.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container"><div class="row row_load">Loading Item</div></div>
  </section>
  <!-- End Services Details Section -->
</template>