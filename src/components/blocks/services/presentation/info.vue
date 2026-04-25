<script setup>
import Content from "@/components/blocks/services/presentation/content.vue"
import Subcategories from "@/components/blocks/services/presentation/subcategories.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <Content :content="props.data.content.content" />
  <Subcategories :data="props.data.subcategories" />
</template>

<style scoped>

</style>