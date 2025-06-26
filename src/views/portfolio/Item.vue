<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue'
import Item from "@/components/portfolio/Item.vue";


const route = useRoute()
const dataStore = useDataStore()

onMounted(async () => {
  await dataStore.fetchStructure('portfolio')
  await dataStore.fetchBlockItem(route.params.slug)
})
</script>

<template>
  <Header />
  <PageTitle />
  <Item />
  <Footer />
</template>