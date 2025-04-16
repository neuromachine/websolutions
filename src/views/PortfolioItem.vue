<script setup>

import { computed } from "vue";
import { useRoute } from "vue-router";

import PageTitle from "@/components/PageTitle.vue";
import Header from "@/components/Header.vue";
import img_phone from "@/components/portfolio/img_phone.vue";

// import sourceData from "@/data.json";//TODO: вернуться -1
import sourceData from "@/portfolio.json";
import ServiceItem from "@/components/ServiceItem.vue";
//TODO: вернуться -1

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

            <svg id="_Слой_1" data-name="Слой_1" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 552.58 394.94">
              <g id="IMG" class="img_wrap">
                <image transform="translate(22.6 22.9)"  class="image" :href="'/assets/img/portfolio/'+item.mainimg"/>
              </g>
              <path id="white" class="white" d="M0,0v394.9h552.6V0H0ZM522.6,330.9c0,6.6-5.4,12-12,12H34.6c-6.6,0-12-5.4-12-12V34.9c0-6.6,5.4-12,12-12h476c6.6,0,12,5.4,12,12v296Z"/>
              <path id="shadow" class="shadow" d="M528.6,12.9H36.6c-13.3,0-24,10.8-24,24v312c0,13.2,10.7,24,24,24h492c13.2,0,24-10.8,24-24V36.9c0-13.2-10.8-24-24-24ZM522.6,330.9c0,6.6-5.4,12-12,12H34.6c-6.6,0-12-5.4-12-12V34.9c0-6.6,5.4-12,12-12h476c6.6,0,12,5.4,12,12v296Z"/>
              <path id="frame" class="frame" d="M522.6,2.9H22.6C11.5,2.9,2.6,11.9,2.6,22.9v320c0,11,9,20,20,20h500c11,0,20-9,20-20V22.9c0-11-9-20-20-20ZM522.6,330.9c0,6.6-5.4,12-12,12H34.6c-6.6,0-12-5.4-12-12V34.9c0-6.6,5.4-12,12-12h476c6.6,0,12,5.4,12,12v296Z"/>
              <rect id="stand_1" class="stand_1" x="242.6" y="372.9" width="80" height="12" rx="4" ry="4"/>
              <path id="stand_2" class="stand_2" d="M217.6,384.9h130c2.8,0,5,2.2,5,5h0c0,2.8-2.2,5-5,5h-130c-2.8,0-5-2.2-5-5h0c0-2.8,2.2-5,5-5Z"/>
            </svg>

<!--            <img :src="`/assets/img/portfolio/${item.mainimg}`" :alt="item.title">-->
          </div>
        </div>
        <div class="col-lg-12 col-md-12">
          <img_phone  v-for="(phone, index) in item.phones" :key="index" :filename="phone" />
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
