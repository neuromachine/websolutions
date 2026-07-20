<script setup>
defineProps({
  html: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="ui-rich-text" v-html="html"></div>
</template>

<style scoped>
/* Scoped styles can be added here if generic rich-text formatting is required */
</style>
