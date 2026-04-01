<script setup>
import { onMounted, nextTick, watch } from 'vue'
import { chat } from '@/chat'
const handleTidioButtons = () => {
  const container = document.querySelector('.content')
  if (!container) return

  container.addEventListener('click', (e) => {
    if (e.target.closest('.open-tidio-chat')) {
      e.preventDefault()
      chat.open()
    }
  })
}


// Запускаем после того, как v-html отрендерится
onMounted(async () => {
  await nextTick()
  handleTidioButtons()
})


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