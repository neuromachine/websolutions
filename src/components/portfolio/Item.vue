<script setup>
import { ref } from "vue";
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
/*
import {onMounted, ref, computed} from "vue";
import {useRoute} from "vue-router";
const route = useRoute();
onMounted(() => {
      dataStore.fetchBlockItem(route.params.slug);
      dataStore.fetchStructure('services');
    }
);
*/
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
  <section class="portfolio-details-area">

<!--    <div class="p_item_descr">{{dataStore.item.properties.descr}}</div>-->

    <div class="container">
      <div v-if="!dataStore.isItemReady" class="row">Loading item data</div>
      <div v-else class="row">
        <div class="col-lg-12 col-md-12">
          <div class="portfolios-details-desc">
            <div v-html="dataStore.item.properties.content" class="features-text content_wrap"></div>
            <div class="portfolio-details-info">
              <div class="single-info-box">
                <h4>Категория</h4>
                <span><RouterLink :to="{ path: '/direction/razrabotka' }">Разработка</RouterLink></span>
              </div>
              <div class="single-info-box">
                <h4>Стоимость</h4>
                <span>{{dataStore.getItemPrice}} т.р.</span>
              </div>
              <div class="single-info-box">
                <h4>Дата</h4>
                <span>{{dataStore.item.properties.date}}</span>
              </div>
              <div class="single-info-box">
                <h4>Соц. сети</h4>
                <ul class="social">
                  <li><a href="https://t.me/websolutionspro" target="_blank"><i class="fa-brands fa-telegram"></i></a></li>
                  <li><a href="https://www.instagram.com/websn.pro/" target="_blank"><i class="fab fa-instagram"></i></a></li>
                </ul>
              </div>
              <div class="single-info-box">
                <h4>Ссылка</h4>
                <a :href="dataStore.item.properties.url" target="_blank" class="default-btn">Перейти <span></span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="portfolio_slider_wrap"  v-if="dataStore.isItemReady">
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
        <SwiperSlide v-for="(img, idx) in dataStore.item.properties.image" :key="idx">
          <div v-if="dataStore.item.properties.image?.length" @click="toggleZoom" class="swiper-zoom-container">
            <img :src="'/assets/img/portfolio/'+img" class="w-full h-auto" />
          </div>
        </SwiperSlide>
      </Swiper>
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
