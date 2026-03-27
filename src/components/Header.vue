<script setup>
import { onMounted } from 'vue'
import { useUiStore } from '@/stores/uiStore';

import $ from 'jquery'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import ResponsiveMenu from '@/components/ResponsiveMenu.vue';
import Navbar from '@/components/navbar.vue';
import ScopeSwitch from "@/components/ScopeSwitch.vue";

import WSpro from "@/components/WSpro.vue";

defineProps({
  isMain: Boolean,
  isNavi: Boolean
})

const uiStore = useUiStore();

const isOpen = uiStore.isOpen
const toggleMenu = () => {
  uiStore.setIsOpen(!uiStore.isOpen);
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
  <div class="preloader" :class="{ 'preloader-deactivate': !uiStore.isGlobalLoading }">
    <div class="loader">
      <div class="shadow"></div>
      <div class="box"></div>
    </div>
  </div>
  <!-- End Preloader Section -->

  <!-- Start Navbar Section -->
  <div  v-if="uiStore.uiMainVars.header?.navbar === true" class="navbar-section">
    <div class="techvio-nav" :class="{ 'index-navber': isMain }">
      <div class="container">
        <nav class="navbar navbar-expand-md navbar-light">
          <div class="nav_wrap">
            <AppLink :to="'/'" class="ws_logo_link">
              <WSpro />
            </AppLink>
            <!-- Иконка-бургер -->
            <button v-if="uiStore.uiMainVars.header.menu" class="burger-button" @click="toggleMenu">
              <i :class="uiStore.isOpen ? 'bi bi-x-lg' : 'bi bi-list'" class="burger-icon"></i>
            </button>
          </div>
          <div class="navbar-collapse mean-menu" id="navbarSupportedContent">
            <Navbar />
            <ScopeSwitch />
            <div v-if="uiStore.scope ==='ru'" class="cta_wrap">
              <a class="btn head_button" href="https://t.me/Lola_06" target="_blank"><i class="bi bi-telegram"></i>{{t('ui.cta_b_text')}}<span></span></a>
            </div>
            <div v-else class="cta_wrap">
              <a class="btn head_button" href="https://m.me/wspro.xyz" target="_blank"><i class="bi bi-telegram"></i>{{t('ui.cta_b_text')}}<span></span></a>
            </div>
          </div>

        </nav>
        <ResponsiveMenu v-if="uiStore.isOpen && uiStore.uiMainVars.header.menu" />
      </div>
    </div>
  </div>

</template>

<style scoped>
.navbar .mean-menu { justify-content: right;}
.cta_wrap { margin: 0 0 0 0;}
.cta_wrap .btn { margin-top: 0 !important;}
.ws_logo_link { border-radius: 5px; display: block; overflow: hidden; }
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
  color: #222;
  cursor: pointer;
  display: none; /* по умолчанию скрыт */
}

.burger-icon {
  transition: transform 0.3s ease;
}

.burger-button i {
  font-size: 1.8rem; line-height: 35px;
}

/* Показывать бургер только на экранах меньше 991px */
@media screen and (max-width: 991px) {
  .nav_wrap { width: 100%;}
  .techvio-nav { padding: 0 !important;}
  .burger-button {
    display: block;
    margin: 0 1rem 0 0;
  }
  .navbar .section-switch {display: none;}
  .cta_wrap { display: none;}
}
</style>