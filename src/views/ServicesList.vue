<script setup>
import Services from "@/components/Services.vue";
import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Услуги', link: '/services' },
]" />
  <Services />
</template>