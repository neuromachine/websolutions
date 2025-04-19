<script setup>
import {computed} from "vue";

import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})


const jsonData = computed(() => {
  // console.log(props.data.slug)
  return mainStore.getPageBySlug(props.data.slug)
});


const emit = defineEmits(['close'])

// const profile = getUserProfile()

// emit `close` event to close Modal dialog
const close = () => emit('close', 'message out')
</script>

<template>
  <div class="overlay_page">
    <div class="tiny" v-html="jsonData.descr"></div>
  </div>
</template>

<style scoped>
  .overlay_page { margin: 2em}
  .overlay_page .body_title { font-size: 20px !important;}
</style>