<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCalcStore } from '@/stores/calcStore'

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue'
import Main from "@/components/blocks/services/main.vue";

const calcStore = useCalcStore()
const route = useRoute()

onMounted(async () => {
  await calcStore.fetchStructure(route.name)
  await calcStore.fetchBlockCategory(route.name)
})
</script>

<template>
  <Header />
  <PageTitle />
  <Main v-if="calcStore.isCatReady" />
  <div v-else>Loading item…</div>
  <Footer />
</template>