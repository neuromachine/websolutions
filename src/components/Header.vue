<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import $ from 'jquery'
import MeanMenu from "@/components/MeanMenu.vue";

defineProps({
  isMain: Boolean,
})

onMounted(() => {
  // Header Sticky
  $(window).on('scroll',function() {
    if ($(this).scrollTop() > 120){
      $('.navbar-section').addClass("is-sticky");
    }
    else{
      $('.navbar-section').removeClass("is-sticky");
    }
  });
});

</script>

<template>
  <!-- Start Preloader Section -->
  <div class="preloader">
    <div class="loader">
      <div class="shadow"></div>
      <div class="box"></div>
    </div>
  </div>
  <!-- End Preloader Section -->

  <!-- Start Navbar Section -->
  <div class="navbar-section">
    <div class="techvio-responsive-nav index-navber-responsive">
      <div class="container">
        <div class="techvio-responsive-menu">
          <div class="logo">
            <a href="/">
              <img src="/assets/img/logo.png" class="white-logo" alt="logo">
              <img src="/assets/img/logo-black.png" class="black-logo" alt="logo">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="techvio-nav" :class="{ 'index-navber': isMain }">
      <div class="container">
        <nav class="navbar navbar-expand-md navbar-light">
          <a href="/">
            <!--TODO: тут нужно переработать логику, сформировалась путаница при интеграции шаблона-->
            <div v-if="isMain">
              <img src="/assets/img/logo-black.png" class="white-logo" alt="logo">
            </div>
            <div v-else>
              <img src="/assets/img/logo.png" class="white-logo" alt="logo">
            </div>
            <img src="/assets/img/logo-black.png" class="black-logo" alt="logo">
          </a>
          <MeanMenu />
        </nav>
      </div>
    </div>
  </div>
  <!-- End Navbar Section -->
</template>

<style scoped>

</style>