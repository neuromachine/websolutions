<script setup>
import group from "@/components/blocks/services/chips/group.vue";
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();
</script>
<template>
  <!-- Start List -->
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
  <!-- End List -->
</template>
