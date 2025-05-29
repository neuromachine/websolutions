<script setup>
import Group from "@/components/Group.vue";
import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Услуги', link: '/services' },
  { title: 'Группа', link: '/' },
]" />
  <Group />
</template>

<style scoped>

</style>