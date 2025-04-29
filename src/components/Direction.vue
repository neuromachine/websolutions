<script setup>
import {computed} from "vue";
import Dir from "@/components/blocks/services/dir.vue";


import {useRoute} from "vue-router";
const route = useRoute();

import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();
const data = computed(() => {
  return mainStore.getPageBySlug(route.params.slug);
});
const owner = computed(() => {
  return mainStore.getOwnerTree(route.params.slug);
});


</script>

<template>
  <div class="idata">{{data}} {{owner}}</div>
  <div class="descr" v-html="data.descr"></div>

  <!-- Start Services Two Section -->
  <section class="services-section-two section-padding">
    <div class="container">
      <div class="row">
        <div v-for="(item, index) in owner" :key="index" class="col-lg-4 col-md-6">
          <Dir
              :slug=item.slug
              :childs=item.childs
          />
        </div>
      </div>
    </div>
  </section>
  <!-- End Services Two Section -->

</template>

<style scoped>

.idata { display: none}
/*

*/
</style>