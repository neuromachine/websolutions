<script setup>
import {onMounted} from "vue";
import Dir from "@/components/blocks/services/dir.vue";
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();

import {useRoute} from "vue-router";
const route = useRoute();


onMounted(() => {
  console.log(route.params.slug);
  calcStore.fetchTree(route.params.slug)
});

</script>

<template>


  <!-- Start Services Two Section -->
  <section  v-if=calcStore.isTreeReady class="services-section-two section-padding">
    <div class="container"><div class="row"><h2>{{calcStore.tree.name}}</h2></div></div>
    <div class="idata">{{calcStore.tree}}</div>
    <div class="descr" v-html="calcStore.tree.description"></div>
    <div class="container">
      <div class="row">
        <div v-for="(item, index) in calcStore.tree.children" :key="index" class="col-lg-4 col-md-6">
          <Dir
              :slug=item.key
              :childs=item.children
          />
        </div>
      </div>
    </div>
  </section>
  <!-- End Services Two Section -->

</template>

<style scoped>


/*
.idata { display: none}
*/
</style>