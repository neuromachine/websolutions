<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue'
import Main from "@/components/blocks/services/main.vue";

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
  <Main />
  <Footer />
</template>