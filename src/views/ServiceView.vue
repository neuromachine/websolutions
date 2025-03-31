<script>
export default {
  data(){
    return {
      service: {}
    }
  },
  created() {
    const id = parseInt(this.$route.params.id)
    // this.service = services.find(id)
  }
}
</script>

<script setup>
import {useRoute} from "vue-router"

const route = useRoute()
const id = parseInt(route.params.id)
//const service = services.find(id)

</script>

<template>
<!--<main>{{ service.name }}</main>-->
<main><h1>SERVICE</h1></main>
</template>

<style scoped>

</style>