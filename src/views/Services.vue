<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCalcStore } from '@/stores/calcStore'

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
import Main from "@/components/blocks/services/main.vue";

const calcStore = useCalcStore()

onMounted(async () => {
  await calcStore.fetchStructure('services')
  await calcStore.fetchBlockCategory('services')
})
</script>

<template>
  <Header />
  <PageTitle />
  <Main v-if="calcStore.isCatReady" />
  <div v-else>Loading item…</div>
</template>