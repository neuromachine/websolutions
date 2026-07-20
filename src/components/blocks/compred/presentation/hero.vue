<script setup>
import CPimg from "@/components/CPimg.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  svgkey: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div v-if="props.data" class="home-section home-2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12">
              <div class="main-banner-content">
                <h6 class="text-gradient">{{ props.data.pretitle }}</h6>
                <h1>
                  {{ props.data.title }}
                  <br v-if="props.data.focus">
                  <span v-if="props.data.focus" class="text-gradient">{{ props.data.focus }}</span>
                </h1>
                <p>{{ props.data.paragraph }}</p>
              </div>
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="banner-image">
                <CPimg :svgkey="props.svgkey" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-shape-animation">
      <div class="shape-1">
        <img src="/assets/img/shape/1.png" alt="shape image">
      </div>
      <div class="shape-2">
        <img src="/assets/img/shape/2.png" alt="shape image">
      </div>
      <div class="shape-3">
        <img src="/assets/img/shape/3.png" alt="shape image">
      </div>
      <div class="shape-4">
        <img src="/assets/img/shape/4.png" alt="shape image">
      </div>
      <div class="shape-5">
        <img src="/assets/img/shape/5.png" alt="shape image">
      </div>
      <div class="shape-6">
        <img src="/assets/img/shape/6.png" alt="shape image">
      </div>
      <div class="shape-7">
        <img src="/assets/img/shape/7.png" alt="shape image">
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 767px) {
  .home-section.home-2 {
    padding-top: 40px;
  }
  .main-banner-content h6 { font-size: 14px;}
  .home-section.home-2 .main-banner-content h1 { font-size: 38px;}
}
</style>
