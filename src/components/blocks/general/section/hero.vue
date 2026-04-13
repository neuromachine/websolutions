<script setup>
import { ref, computed } from 'vue'
import AppLink from "@/components/AppLink.vue";
import CPimg from "@/components/CPimg.vue";
import { useGsapOrchestrator } from '@/composables/useGsapOrchestrator'
import { getHeroAnimations } from './hero.animations.js'

const props = defineProps({
  hero: {
    type: Object,
    required: true
  },
})


const heroContent = ref(null)
const animConfig = computed(() => getHeroAnimations())
useGsapOrchestrator(heroContent, animConfig)
</script>

<template>
  <!-- Start Home Section -->
  <div class="home-section home-2">
    <div class="d-table">
      <div class="d-table-cell" >
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12">
              <div class="hero-content main-banner-content" ref="heroContent">
                <h6 class="text-gradient">{{props.hero.subtitle}}</h6>
                <h1 v-html="props.hero.maintitle"></h1>
                <p>{{props.hero.descr}}</p>
                <div class="banner-btn">
                  <AppLink :to="props.hero.link" class="default-btn-one">
                    {{props.hero.anchor}}<span></span>
                  </AppLink>
                  <div class="video-box">
                    <AppLink :to="props.hero.link" class="popup-video video-btn">
                      <i class="fa fa-play"></i>
                    </AppLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="banner-image">
                <CPimg :svgkey="props.hero.image"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-shape-animation">
      <div class="shape-1">
        <img src="@/assets/img/shape/1.png" alt="shape image">
      </div>
      <div class="shape-2">
        <img src="@/assets/img/shape/2.png" alt="shape image">
      </div>
      <div class="shape-3">
        <img src="@/assets/img/shape/3.png" alt="shape image">
      </div>
      <div class="shape-4">
        <img src="@/assets/img/shape/4.png" alt="shape image">
      </div>
      <div class="shape-5">
        <img src="@/assets/img/shape/5.png" alt="shape image">
      </div>
      <div class="shape-6">
        <img src="@/assets/img/shape/6.png" alt="shape image">
      </div>
      <div class="shape-7">
        <img src="@/assets/img/shape/7.png" alt="shape image">
      </div>
    </div>
  </div>
  <!-- End Home Section -->
</template>

<style scoped>

</style>