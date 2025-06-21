<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCalcStore } from '@/stores/calcStore'

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
import Main from "@/components/blocks/services/main.vue";

const route = useRoute()
const calcStore = useCalcStore()

onMounted(() => {
  calcStore.fetchStructure('services')
  calcStore.fetchBlockItem(route.params.slug)
})

const breadcrumbs = computed(() => [
  { title: 'Главная', link: '/' },
  { title: 'Услуги', link: '/services' },
  {
    title: calcStore.structure.name,
    link: null
  }
])

</script>

<template>
  <Header />
  <PageTitle v-if="calcStore.isItemReady" :breadcrumbs="breadcrumbs" />
  <Main v-if="calcStore.item" />
</template>