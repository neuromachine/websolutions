<script setup>
import group from "@/components/blocks/services/presentation/group.vue";
const props = defineProps({
  items: {
    type: Object,
    default: () => ({})
  }
})
</script>
<template>
  <!-- Start List -->
  <section id="list_services" class="services-section-three section-padding">
    <div class="container">
<!--      <div class="row" v-if="navigationStore.isStrReady">-->
      <div class="row">
        <group v-for="(item, index) in props.items" :key="index"
               :id="item.id"
               :title="item.name"
               :description="item.description"
               :childs="item.child"
               :slug="item.key"
        />
      </div>
<!--      <div v-else class="row row_load">Loading Structure</div>-->
    </div>
  </section>
  <!-- End List -->
</template>
