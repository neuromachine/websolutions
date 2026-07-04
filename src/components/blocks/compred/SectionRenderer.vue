<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <component :is="props.section.component" v-bind="props.section.props" v-on="props.section.on || {}" />
</template>

<style scoped>
</style>
