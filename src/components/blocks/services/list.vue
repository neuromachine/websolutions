<script setup>
import {onMounted} from "vue";
import group from "@/components/blocks/services/chips/group.vue";
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();
onMounted(() => {
  //calcStore.fetchTree('scope')
  calcStore.fetchStructure();
});
</script>
<template>
  <!-- Start Services Three Section -->
  <section id="list_services" class="services-section-three section-padding">
    <div class="container">
      <div class="row" v-if="calcStore.isStrReady">
        <group v-for="(item, index) in calcStore.structure.child" :key="index"
               :id="item.id"
               :title="item.name"
               :description="item.description"
               :childs="item.child"
               :slug="item.key"
        />
      </div>
      <div v-else class="row row_load">Loading Structure</div>
    </div>
  </section>
  <!-- End Services Three Section -->
</template>
