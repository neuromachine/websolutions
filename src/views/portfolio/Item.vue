<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCalcStore } from '@/stores/calcStore'
import Item from "@/components/portfolio/Item.vue";
import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
const route = useRoute()
const calcStore = useCalcStore()
onMounted(() => {
  console.log('Item.vue mounted, slug =', route.params.slug);
  calcStore.fetchBlockItem(route.params.slug)
  calcStore.fetchStructure('services')
})
const breadcrumbs = computed(() => [
  { title: 'Главная', link: '/' },
  { title: 'Портфолио', link: '/portfolio' },
  {
    title: calcStore.item.properties.title,   // ⇐ динамика
    link: null
  }
])
</script>

<template>
  <Header />
  <PageTitle v-if="calcStore.isItemReady" :breadcrumbs="breadcrumbs" />
  <Item  v-if="calcStore.item" />
</template>