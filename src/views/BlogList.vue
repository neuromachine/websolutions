<script setup>
import Blogs from "@/components/Blogs.vue";
import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Блог', link: '/blog' },
]" />
  <Blogs />
</template>