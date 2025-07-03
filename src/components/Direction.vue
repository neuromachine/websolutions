<script setup>
import {onMounted} from "vue";
// import Dir from "@/components/blocks/services/dir.vue";
import catClass from "@/components/blocks/services/catClass.vue";
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();

import {useRoute} from "vue-router";
const route = useRoute();


onMounted(() => {
  dataStore.fetchStructure(route.params.slug);
});

</script>

<template>
  <!-- Start Services Two Section -->
  <section class="services-section-two section-padding">
    <div  v-if=dataStore.isStrReady class="container">
      <div class="row">
<!--        <h2>{{dataStore.structure.name}}</h2>-->
<!--        <div class="descr" v-html="dataStore.structure.description"></div>-->
        <div class="content" v-html="dataStore.structure.content"></div>
      </div>
      <div class="row">
        <div v-for="(item, index) in dataStore.structure.child" :key="index" class="col-lg-4 col-md-6">
          <catClass
              :slug=item.key
              :name=item.name
              :descr=item.description
              :childs=item.child
          />
        </div>
      </div>
    </div>
<!--    <div class="strData">{{dataStore.structure}}</div>-->
    <div v-else class="container"><div class="row row_load">Loading Structure</div></div>
  </section>
  <!-- End Services Two Section -->
</template>