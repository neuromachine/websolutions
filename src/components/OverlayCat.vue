<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

// const profile = getUserProfile()

// emit `close` event to close Modal dialog
const close = () => emit('close', 'message out')
</script>

<template>
  <div class="overlay_page">
    <div class="tiny" v-html="props.data.content"></div>
    <div class="data">{{props.data}}</div>
<!--    <div class="more">-->
<!--      <RouterLink :to="{ path: '/direction/' + props.slug }" class="read-more">Страница</RouterLink>-->
<!--    </div>-->
  </div>
</template>

<style scoped>
  .overlay_page { margin: 2em}
  .overlay_page .body_title { font-size: 20px !important;}
</style>