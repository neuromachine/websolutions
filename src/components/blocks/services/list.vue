<script setup>
import { onMounted } from 'vue'
import group from "@/components/blocks/services/presentation/group.vue";
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
</script>
<template>
  <!-- Start List -->
  <section id="list_services" class="services-section-three section-padding">
    <div class="container">
      <div class="row" v-if="dataStore.isStrReady">
        <group v-for="(item, index) in dataStore.structure.child" :key="index"
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
