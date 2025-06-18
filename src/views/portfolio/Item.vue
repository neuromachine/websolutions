<script setup>
import Item from "@/components/portfolio/Item.vue";
import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Портфолио', link: '/portfolio' },
  { title: 'Работа', link: '/work' },
]" />
  <Item />
</template>