<script setup>

import { computed } from "vue";
import { useRoute } from "vue-router";

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";

import sourceData from "@/data.json";

const route = useRoute();

// Ищем объект в массиве по slug
const item = computed(() => sourceData.find((work) => work.slug === route.params.slug));
</script>

<template>
<!--  <h1>{{$route.params.slug}}</h1>-->
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Портфолио', link: '/portfolio' },
  //{ title: 'О работе: '+item.title, link: '/portfolio/car' }
  { title: item.title, link: '/portfolio/'+item.slug }
]" />

  <!-- Start Portfolio Details Section -->
  <section class="portfolio-details-area ptb-100">
    <div class="container">
      <div class="row" v-if="item">
        <div class="col-lg-12 col-md-12">
          <div class="portfolio-details-image">
            <img :src="`/assets/img/portfolio/${item.mainimg}`" :alt="item.title">
          </div>
        </div>
        <div  class="col-lg-12 col-md-12">
          <div class="portfolios-details-desc" v-html="item.descr">
          </div>
        </div>
      </div>
      <div v-else class="row"><p>Работа не найдена</p></div>
    </div>
  </section>
  <!-- End Portfolio Details Section -->

</template>
