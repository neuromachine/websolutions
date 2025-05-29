<script setup>

import { computed,onMounted } from "vue";
import { useRoute } from "vue-router";

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
import img_phone from "@/components/portfolio/img_phone.vue";
import img_desctop from "@/components/portfolio/img_desctop.vue";

// import sourceData from "@/data.json";//TODO: вернуться -1
import sourceData from "@/portfolio.json";
import ServiceItem from "@/components/ServiceItem.vue";
//TODO: вернуться -1

const route = useRoute();

// Ищем объект в массиве по slug
//const item = computed(() => sourceData.find((work) => work.slug === route.params.slug));


import { useUiStore } from '@/stores/uiStore';
const uiStore = useUiStore();
onMounted(() => {
  uiStore.fetchItem('shincenter');
});

</script>

<template>
<!--  <h1>{{$route.params.slug}}</h1>-->
  <Header />
  <PageTitle :breadcrumbs="[
  { title: 'Главная', link: '/' },
  { title: 'Портфолио', link: '/portfolio' },
  //{ title: 'О работе: '+item.title, link: '/portfolio/car' }
  // { title: item.title, link: '/portfolio/'+item.slug }
]" />

  <!-- Start Portfolio Details Section -->
  <section class="portfolio-details-area ptb-100">
    <div class="container">
      <div class="row" v-if=
          "
                 !uiStore.isLoading
                 && uiStore.item !== null
                 && Object.keys(uiStore.item).length
               ">


        <div class="col-lg-12 col-md-12"><div class="portfolios-details-desc" v-html="uiStore.item.props.content.value"></div></div>

        {{uiStore.item}}

      </div>
    </div>
  </section>
  <!-- End Portfolio Details Section -->

</template>


<style scoped>

.portfolio-details-image { position: relative;}
.shadow { fill: #0a53be}
.frame {fill: #fff;
  stroke: #362c72;
  stroke-width: 2px;
}
.stand_1 { fill: #7b68ee;}
.stand_2 {fill: #f44336;}
.image { width: 100%; height: auto;}
.img_wrap { width: 100%;  height: auto; overflow: hidden;}

.white {fill: #fff;}




</style>
