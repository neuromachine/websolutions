<script setup>
import {computed} from "vue";

import { useRoute } from "vue-router";
const route = useRoute();

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";

import sourceData from "@/pages.json";
const item = computed(() => sourceData.find((work) => work.slug === route.params.slug));
</script>

<template>

  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: item.title, link: '/page/'+item.slug }

]" />



  <!-- Start About Section -->
  <section class="about-area section-padding">
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-lg-6 col-md-12">
          <div class="about-content">
            <h6 class="sub-title" v-if="item.class">{{item.class.join(' | ')}}</h6>

            <h2>{{item.title}}</h2>
            <div class="tiny" v-html="item.descr"></div>
            <p v-html="item.descr"></p>
            <div class="data">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End About Section -->
</template>

<style scoped>

</style>