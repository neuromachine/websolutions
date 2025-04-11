<template>
  <div>
    <div>{{props.data.title}}</div>
    <p v-for="(child, indexC) in props.data.childs" :key="indexC">
      <span><h3>{{child.title}}</h3></span>
      <ul class="subitems">
        <li v-for="(schild, indexS) in child.childs" :key="indexS">
          <span>{{schild.title}}</span>

          <span  class="lv3">{{schild.thumb}}</span>
          <span  class="lv3">{{schild.id}}</span>
          <span  class="lv3">{{schild.slug}}</span>

          <span  v-for="(tchild, index3) in schild.childs" :key="index3" class="lv3">{{tchild.title}}</span>
        </li>
      </ul>
    </p>
    <button
        type="button"
        @click="close"
    >Close</button>
  </div>
</template>

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