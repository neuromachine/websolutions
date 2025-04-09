<script setup>
import Footer from '@/components/Footer.vue'
// import { useMainStore } from '@/stores/mainStore';
// const mainStore = useMainStore();
</script>

<template>
<!--  <h1 v-if=useMainStore.data.portfolio>{{useMainStore.data.portfolio}}</h1>-->
  <RouterView />
  <Footer />
</template>

<style scoped>

</style>
