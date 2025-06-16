<script setup>
import {onMounted} from "vue";
// import Dir from "@/components/blocks/services/dir.vue";
import catClass from "@/components/blocks/services/catClass.vue";
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();

import {useRoute} from "vue-router";
const route = useRoute();


onMounted(() => {
  calcStore.fetchStructure(route.params.slug);
});

</script>

<template>
  <!-- Start Services Two Section -->
  <section class="services-section-two section-padding">
    <div  v-if=calcStore.isStrReady class="container">
      <div class="row">
        <h2>{{calcStore.structure.name}}</h2>
        <div class="descr" v-html="calcStore.structure.description"></div>
      </div>
      <div class="row">
        <div v-for="(item, index) in calcStore.structure.child" :key="index" class="col-lg-4 col-md-6">
          <catClass
              :slug=item.key
              :name=item.name
              :descr=item.description
              :childs=item.child
          />
        </div>
      </div>
    </div>
<!--    <div class="strData">{{calcStore.structure}}</div>-->
    <div v-else class="container"><div class="row row_load">Loading Structure</div></div>
  </section>
  <!-- End Services Two Section -->
</template>