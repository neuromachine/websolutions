<script setup>
import {ref, onMounted, getCurrentInstance, onUnmounted, computed} from 'vue'
import { useUiStore } from '@/stores/uiStore'; // Импорт стора
import { useDataStore} from '@/stores/dataStore';
import $ from 'jquery'
// import MeanMenu from "@/components/MeanMenu.vue";
import ResponsiveMenu from '@/components/ResponsiveMenu.vue';
import Navbar from '@/components/navbar.vue';
import Logo from '@/components/Logo_png.vue';

import structure from "@/structure.json";

defineProps({
  isMain: Boolean,
  isNavi: Boolean
})

const uiStore = useUiStore();
const dataStore = useDataStore();



const isOpen = uiStore.isOpen
const toggleMenu = () => {
  uiStore.setIsOpen(!uiStore.isOpen); // Пример переключения состояния
}


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
  <div class="preloader" :class="{ 'preloader-deactivate': !uiStore.getGlobalLoading }">
    <div class="loader">
      <div class="shadow"></div>
      <div class="box"></div>
    </div>
  </div>
  <!-- End Preloader Section -->

  <!-- Start Navbar Section -->
  <div class="navbar-section">



    <div class="techvio-nav" :class="{ 'index-navber': isMain }">
      <div class="container">
        <nav class="navbar navbar-expand-md navbar-light">
          <div class="nav_wrap">
            <RouterLink to="/" class="logo_wrap">
              <Logo />
            </RouterLink>
            <!-- Иконка-бургер -->
            <button v-if="!isNavi" class="burger-button" @click="toggleMenu">
              <i :class="uiStore.isOpen ? 'bi bi-x-lg' : 'bi bi-list'" class="burger-icon"></i>
            </button>
          </div>
          <div class="navbar-collapse mean-menu" id="navbarSupportedContent">
            <Navbar />
            <div class="other-option">
              <a class="default-btn" href="https://t.me/Lola_06">Позвонить<span></span></a>
            </div>
          </div>

        </nav>
        <ResponsiveMenu v-if="uiStore.isOpen && !isNavi" :structure="structure" />
      </div>
    </div>
  </div>
  <!-- End Navbar Section -->
</template>

<style scoped>
.index-navber .index-navber {}
.navbar-section {
  /* background: #FFF; */
}
/* TODO: вернуться 0 */
.nav_wrap { display: flex;  flex-direction: row; justify-content: space-between; }
.logo_wrap { margin: 0 0 0 1rem;}
.burger-button {
  background: none;
  border: none;
  font-size: 1.8rem;
  color: #222;
  cursor: pointer;
  display: none; /* по умолчанию скрыт */
}

.burger-icon {
  transition: transform 0.3s ease;
}

/* Показывать бургер только на экранах меньше 991px */
@media screen and (max-width: 991px) {
  .nav_wrap { width: 100%;}
  .techvio-nav { padding: 0 !important;}
  .burger-button {
    display: block;
    margin: 0 1rem 0 0;
  }
}
</style>