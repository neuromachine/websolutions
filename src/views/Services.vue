<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'

import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue'
import PageTitle from "@/components/PageTitle.vue";
import Index from "@/components/blocks/services/index.vue";

const dataStore = useDataStore()
const route = useRoute()

onMounted(async () => {
  await dataStore.fetchStructure(route.name)
  //await calcStore.fetchBlockCategory(route.name)
})
</script>

<template>
  <Header />
  <PageTitle />
  <Index />
  <Footer />
</template>