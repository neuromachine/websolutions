<script setup>
import {computed} from "vue";
import ServiceItem from "@/components/ServiceItem.vue";
/*
import data_json from "@/services.json";
onMounted(() => {
  console.log(data)
});
const data = data_json
*/
import {useRoute} from "vue-router";
const route = useRoute();

import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();
// const item = computed(() => {
//   if (!route.params.slug) return null;
//   return mainStore.getServiceBySlug(route.params.slug);
// });
const tree = computed(() => {
  return mainStore.geyServicesTree(mainStore.data.tree);
});


</script>

<template>
  <!-- Start Services Section -->
  <section class="services-section section-padding">
    <div class="container">
      <div class="row">
        <ServiceItem v-for="(item, index) in tree" :key="index"
                     :id="item.id"
                     :title="item.title"
                     :childs="item.childs"
                     :slug="item.slug"
        />
      </div>
    </div>
  </section>
  <!-- End Services Section -->
</template>

<style scoped>
.lv3 {
  color: #c31010;}

.subitems { display: none}
</style>