<script setup>
import {onMounted, ref, computed} from "vue";
import { Swiper, SwiperSlide, } from 'swiper/vue'
import {  Autoplay,Zoom } from 'swiper/modules'
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();
import {useRoute} from "vue-router";
const route = useRoute();
onMounted(() => {
      calcStore.fetchBlockItem(route.params.slug);
      calcStore.fetchStructure('services');
    }
);
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
  <!-- Start Services Details Section -->
  <section class="services-details-area section-padding">
    <div v-if="calcStore.isItemReady" class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <div class="services-details-content">
            <h3>{{calcStore.item.properties.title}}</h3>
            <p>{{calcStore.item.properties.descr}}</p>
            <div class="features-text" v-html="calcStore.item.properties.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container"><div class="row row_load">Loading Item</div></div>

    <div  v-if="calcStore.isItemReady" class="services-details-image">
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
        <SwiperSlide v-for="(img, idx) in calcStore.item.properties.image" :key="idx">
          <div @click="toggleZoom" class="swiper-zoom-container">
            <img :src="'/assets/img/portfolio/'+img" class="w-full h-auto" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

  </section>
  <!-- End Services Details Section -->
</template>

<style scoped>
@import 'swiper/swiper-bundle.css';
.swiper-zoom-container img {
  cursor: zoom-in;
}
</style>
