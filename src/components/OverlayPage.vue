<script setup>
import {computed} from "vue";


const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

import sourceData from "@/pages.json";
const jsonData = computed(() => sourceData.find((work) => work.slug === props.data.slug));

const emit = defineEmits(['close'])

// const profile = getUserProfile()

// emit `close` event to close Modal dialog
const close = () => emit('close', 'message out')
</script>

<template>
  <div>
    <div>{{props.data}}</div>
    <div>{{props.data.slug}}</div>
    <div>{{jsonData}}</div>
  </div>
</template>

