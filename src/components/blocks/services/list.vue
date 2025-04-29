<script setup>
import {computed} from "vue";

import group from "@/components/blocks/services/group.vue";

import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();

const tree = computed(() => {
  // console.log(tree)
  return mainStore.geyServicesTree(mainStore.data.tree);
});
</script>

<template>
  <!-- Start Services Three Section -->
  <section id="list_services" class="list_s services-section-three section-padding">
    <div class="container">
      <div class="row">
        <group v-for="(item, index) in tree" :key="index"
                     :id="item.id"
                     :title="item.title"
                     :childs="item.childs"
                     :slug="item.slug"
        />
      </div>
    </div>
  </section>
  <!-- End Services Three Section -->
</template>

<style scoped>
.list_s {}
</style>