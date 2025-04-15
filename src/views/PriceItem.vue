<script setup>
import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Цены', link: '/blog' },
 // { title: item.title, link: '/service/'+item.slug }
]" />

  <section>
    <div>
      <div><h1>ITEM</h1></div>
    </div>
  </section>

</template>

<style scoped>

</style>