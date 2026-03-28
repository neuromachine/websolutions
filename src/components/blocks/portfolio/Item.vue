<script setup>
import { ref } from "vue";

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
const { blockStore } = usePageOrchestrator('portfolio', 'item', {
  fetch: (route) => route.params.slug
})

import { useStorageUrl } from '@/composables/useStorageUrl';   // подкорректируй путь
const { getStorageUrl } = useStorageUrl();

import { Swiper, SwiperSlide, } from 'swiper/vue'
import {  Autoplay,Zoom } from 'swiper/modules'
const swiperInstance = ref(null)
function toggleZoom() {
  if (!swiperInstance.value) return

  // Если уже увеличено — сбросить, иначе — увеличить
  if (swiperInstance.value.zoom.scale > 1) {
    swiperInstance.value.zoom.out()
  } else {
    swiperInstance.value.zoom.in()
  }
}
function onSwiperInit(swiper) {
  swiperInstance.value = swiper
}
</script>

<template>
  <!-- Start Portfolio Details Section -->
  <section id="portfolio_work" class="portfolio-details-area">

<!--    <div class="p_item_descr">{{dataStore.item.properties.descr}}</div>-->

    <div class="container">
      <div v-if="!blockStore.isItemReady" class="row">Loading item data</div>
      <div v-else class="row">
        <div class="col-lg-12 col-md-12">
          <div class="portfolios-details-desc">
            <div v-if="blockStore.item.properties.workdescr" v-html="blockStore.item.properties.workdescr" class="features-text work_descr"></div>
            <div v-else v-html="blockStore.item.properties.content" class="features-text content_wrap"></div>

            <div class="portfolio-details-info">
              <div class="single-info-box">
                <h4>{{ t('portfolio.category') }}</h4>
<!--                <span><RouterLink :to="{ path: '/direction/razrabotka' }">Разработка</RouterLink></span>-->
                <span>{{ blockStore.item.properties.workclass[0]?.label }}</span>
              </div>
              <div class="single-info-box">
                <h4>{{ t('portfolio.cost') }}</h4>
<!--                <span>{{blockStore.getItemPrice}} {{ t('portfolio.currency') }}</span>-->
                <span>{{blockStore.item.properties.price}} {{ t('portfolio.currency') }}</span>
              </div>
              <div class="single-info-box" v-if="blockStore.item.properties.date">
                <h4>{{ t('portfolio.date') }}</h4>
                <span>{{ blockStore.item.properties.date }}</span>
              </div>
              <div class="single-info-box">
                <h4>{{ t('portfolio.social') }}</h4>
                <ul class="social">
                  <li><a :href="''+t('contacts.social.message')" target="_blank"><i class="fa-brands fa-telegram"></i></a></li>
                  <li><a :href="'https://www.instagram.com/'+t('contacts.social.instagram')" target="_blank"><i class="fab fa-instagram"></i></a></li>
                </ul>
              </div>
              <div class="single-info-box" v-if="blockStore.item.properties.url && blockStore.item.properties.url != '-'">
                <h4>{{ t('portfolio.link') }}</h4>
                <a :href="blockStore.item.properties.url" target="_blank" class="default-btn">{{ t('portfolio.linktext') }} <span></span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="portfolio_slider_wrap"  v-if="blockStore.isItemReady">
      <Swiper :loop="true"
              @swiper="onSwiperInit"
              :modules="[Autoplay,Zoom]"
              :slides-per-view="1"
              :autoplay="{ delay: 5000 }"
              :zoom="{ maxRatio: 3 }"
              :breakpoints="{
                      0: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 1,
                      },
                      1200: {
                        slidesPerView: 1,
                      }
                    }"
              class="my-swiper">
        <SwiperSlide v-for="(img, idx) in blockStore.item.properties.image" :key="idx">
          <div v-if="blockStore.item.properties.image?.length" @click="toggleZoom" class="swiper-zoom-container">
<!--            <img :src="'http://wsapi/storage/portfolio/'+blockStore.item.key+'/'+ img" class="w-full h-auto" />-->
            <img :src="getStorageUrl(`portfolio/${blockStore.item.key}/${img}`)" class="w-full h-auto" />
<!--            storage/portfolio/barma/barma_desctop_main.png-->
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="container">
      <div v-if="!blockStore.isItemReady" class="row">Loading item data</div>
      <div v-else class="row">
        <div class="col-lg-12 col-md-12">
          <div v-if="blockStore.item.properties.targets" v-html="blockStore.item.properties.targets" class="features-text content_wrap work_list"></div>
          <div v-if="blockStore.item.properties.tech" v-html="blockStore.item.properties.tech" class="features-text content_wrap work_list"></div>
        </div>
      </div>
    </div>

  </section>
  <!-- End Portfolio Details Section -->

</template>

<style scoped>
@import 'swiper/swiper-bundle.css';
.swiper-zoom-container img {
  cursor: zoom-in;
}
</style>
