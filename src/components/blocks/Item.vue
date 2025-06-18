<script setup>
import {onMounted, ref} from "vue";
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
</script>

<template>
  <!-- Start Services Details Section -->
  <section class="services-details-area section-padding">
    <div v-if="calcStore.isItemReady" class="container">
      <div class="row">
        <div class="col-lg-8 col-md-12">
          <div class="services-details-content">
            <div class="services-details-image">
              <Swiper :loop="true"
                      :modules="[Autoplay,Zoom]"
                      :slides-per-view="1"
                      :autoplay="{ delay: 3000 }"
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
                    <img :src="'/assets/img/services/'+img" class="w-full h-auto" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
<!--            <div v-for="img in calcStore.item.properties.image" class="services-details-image">-->
<!--              <img v-bind="{src:'/assets/img/services/'+img}" alt="">-->
<!--            </div>-->
            <h3>{{calcStore.item.properties.title}}</h3>
            <p>{{calcStore.item.properties.descr}}</p>
            <div class="features-text" v-html="calcStore.item.properties.content"></div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <aside class="services-widget">
            <section v-if="calcStore.isStrReady" class="widget widget_categories">
              <h3 class="widget-title">Наши услуги</h3>
              <ul>
                <li v-for="item in calcStore.structure.child">
                  <RouterLink :to="{ path: '/direction/' + item.key }">{{item.name}}</RouterLink>
                </li>
              </ul>
            </section>
            <section v-else class="row row_load"></section>
            <section v-if="calcStore.item.properties.files?.length" class="widget widget_download_btn">
              <h3 class="widget-title">Документы</h3>
              <div class="download-btn-box">
                <a
                    v-for="(file, idx) in calcStore.item.properties.files"
                    :key="idx"
                    :href="'/assets/img/services/' + file.src"
                    class="default-btn"
                    target="_blank"
                    rel="noopener"
                >
                  {{ file.title }}<span></span>
                </a>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
    <div v-else class="container"><div class="row row_load">Loading Item</div></div>
  </section>
  <!-- End Services Details Section -->
</template>

<style scoped>
@import 'swiper/swiper-bundle.css';
.swiper-zoom-container img {
  cursor: zoom-in;
}
</style>
