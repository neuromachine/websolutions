<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCalcStore } from '@/stores/calcStore'

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
import Item from "@/components/portfolio/Item.vue";

const route = useRoute()
const calcStore = useCalcStore()

onMounted(async () => {
  await calcStore.fetchStructure('portfolio')
  await calcStore.fetchBlockItem(route.params.slug)
})
</script>

<template>
  <Header />
  <PageTitle />
  <Item  v-if="calcStore.isItemReady" />
  <div v-else>Loading item…</div>
</template>