<script setup>
import work from "@/components/blocks/portfolio/presentation/work.vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  }
})
</script>

<template>
  <div class="portfolio-container">
    <TransitionGroup name="fade" tag="div" class="grid row">
      <work v-for="item in props.items"
            :key="item.slug"
            :slug="item.slug"
            :properties="item"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>

</style>