<template>
  <div>
    <div>User name: {{ profile.name }}</div>
    <div>User age: {{ profile.age }}</div>

    <button
        type="button"
        @click="close"
    >Close</button>
  </div>
</template>

<script setup>
import profile from '@/data/user.json'
//console.log(profile)//TODO: Вернуться 1
// declare `close` event
const emit = defineEmits(['close'])

// const profile = getUserProfile()

// emit `close` event to close Modal dialog
const close = () => emit('close', profile.name)
</script>