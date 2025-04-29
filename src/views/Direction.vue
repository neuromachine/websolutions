<script setup>
import Direction from "@/components/Direction.vue";
import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Услуги', link: '/services' },
  { title: 'Направление', link: '/test' },
]" />
  <Direction />
</template>

<style scoped>

</style>