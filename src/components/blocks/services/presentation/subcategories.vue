<script setup>
import Icon from "@/components/blocks/services/micro/icon.vue";
import Category from "@/components/blocks/services/presentation/category.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <!-- Start List -->
  <section class="list_categories services-section-three">
    <div class="container">
      <div class="row align-items-stretch">
        <Category v-for="(item, index) in props.data" :key="index"
               :id="item.id"
               :title="item.title"
               :description="item.descr"
               :childs="item.childs"
               :slug="item.slug"
        />
      </div>
    </div>
  </section>
  <!-- End List -->
</template>

<style scoped>

</style>