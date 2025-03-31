<script>
export default {
  data(){
    return {
      service: {}
    }
  },
  created() {
    const id = parseInt(this.$route.params.id)
    this.service = services.find(id)
  }
}
</script>

<script setup>
import {useRoute} from "vue-router"

const route = useRoute()
const id = parseInt(route.params.id)
const service = services.find(id)

</script>

<template>
  <h1>test</h1>
<main>{{ service.name }}</main>
</template>

<style scoped>

</style>