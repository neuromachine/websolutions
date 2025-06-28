<script setup>
const props = defineProps({
  content: {
    type: String,
    required: true
  },
})
</script>
<template>
  <div class="content" v-html="props.content"></div>
</template>
