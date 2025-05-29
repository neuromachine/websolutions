<script setup>
import {onMounted} from "vue";
import group from "@/components/blocks/services/chips/group.vue";
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();

onMounted(() => {
  calcStore.fetchTree('scope')
});
</script>

<template>
  <!-- Start Services Three Section -->
  <section id="list_services" class="list_s services-section-three section-padding">
    <div class="container">
      <div class="row" v-if=calcStore.isTreeReady>
        <group v-for="(item, index) in calcStore.tree.children" :key="index"
                     :id="item.id"
                     :title="item.name"
                     :description="item.description"
                     :childs="item.children"
                     :slug="item.key"
        />
      </div>
      <div v-else>
        Loading list
      </div>
    </div>
  </section>
  <!-- End Services Three Section -->
</template>

<style scoped>
.list_s {}
</style>