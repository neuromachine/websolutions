<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true
  },
})
</script>
<template>
    <div class="container content" v-html="props.content"></div>
</template>

<style scoped>

</style>