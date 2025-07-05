<script setup>
import { onMounted } from 'vue'
import debug from "@/components/Debug.vue";
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
  //await dataStore.fetchBlockCategory(route.name)
})
</script>

<template>
  <!--start-->
  <!--DEBGGGGHEEEREEEE-->
  <debug />
  <!--/DEBGGGG DEAD-->
  <!--Start <Header />-->
  <Header />
  <PageTitle />
  <Index />
  <Footer />
</template>