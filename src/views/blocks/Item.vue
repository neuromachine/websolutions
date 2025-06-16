<script setup>
import Item from "@/components/blocks/Item.vue";
import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Услуги', link: '/services' },
  { title: 'Услуга', link: '/test' },
]" />
  <Item />
</template>