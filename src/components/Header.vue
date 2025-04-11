<script setup>
import {ref, onMounted, getCurrentInstance, onUnmounted, computed} from 'vue'
import { useUiStore } from '@/stores/uiStore'; // Импорт стора
import $ from 'jquery'
// import MeanMenu from "@/components/MeanMenu.vue";
import ResponsiveMenu from '@/components/ResponsiveMenu.vue';

import structure from "@/structure.json";
// const items = computed(() => sourceData.find((work) => work.slug === route.params.slug));
// const items = sourceData

// const items = computed(() => sourceData.find((work) => work.slug === route.params.slug));

/*

import { DialogModal, DialogAlert } from 'v-dialogs'
import UserProfile from '@/components/Modal.vue'


DialogModal(UserProfile, {

  title: 'User Profile',
  params: {
    userId: 1,
    userName: 'Terry Zeng'
  },
  callback: data => {
    DialogAlert(`Received message: ${data}`)
  }
})
*/

defineProps({
  isMain: Boolean,
})

const uiStore = useUiStore(); // Инициализация стора

// const isOpen = ref(false)
const isOpen = uiStore.isOpen
const toggleMenu = () => {
  // isOpen.value = !isOpen.value
  uiStore.setIsOpen(!uiStore.isOpen); // Пример переключения состояния
}


onMounted(() => {
// TODO: refactoring
  // console.log(structure)

// const $dlg = getCurrentInstance().appContext.config.globalProperties.$dlg

  // const $dlg = getCurrentInstance().proxy.$dlg
  // $dlg.message('Saved successfully!')


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



    <div class="techvio-nav" :class="{ 'index-navber': isMain }">
      <div class="container">
        <nav class="navbar navbar-expand-md navbar-light">
          <div class="nav_wrap">
            <RouterLink to="/" class="logo_wrap">
              <img src="/assets/img/logo-black.png" alt="logo">
            </RouterLink>
            <!-- Иконка-бургер -->
            <button class="burger-button" @click="toggleMenu">
              <i :class="uiStore.isOpen ? 'bi bi-x-lg' : 'bi bi-list'" class="burger-icon"></i>
            </button>
          </div>
          <div class="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink to="/">Главная</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/page/about" class="nav-link">О нас</RouterLink>
              </li>
              <li class="nav-item">
                <!--                <RouterLink class="nav-link" to="/product-list">Услуги <i class="fas fa-chevron-down"></i></RouterLink>-->
                <!--
                <RouterLink class="nav-link" to="/services">Услуги <i class="fas fa-chevron-down"></i></RouterLink>
                <ul class="dropdown-menu">
                  <li class="nav-item">
                    <RouterLink to="/service/dev" class="nav-link">Разработка</RouterLink>
                  </li>
                  <li class="nav-item">
                    <RouterLink to="/service/seo" class="nav-link">Продвижение</RouterLink>
                  </li>
                  <li class="nav-item">
                    <RouterLink to="/service/support" class="nav-link">Сопровождение</RouterLink>
                  </li>
                  <li class="nav-item">
                    <RouterLink to="/service/individual" class="nav-link">Индивидуально</RouterLink>
                  </li>
                </ul>
                -->
                <RouterLink class="nav-link" to="/services">Услуги</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/portfolio" class="nav-link">Портфолио</RouterLink>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Инфо <i class="fas fa-chevron-down"></i></a>
                <ul class="dropdown-menu">
                  <li class="nav-item">
                    <a href="team.html" class="nav-link">Команда</a>
                  </li>
                  <li class="nav-item">
                    <a href="pricing.html" class="nav-link">Цены</a>
                  </li>
                  <li class="nav-item">
                    <a href="faq.html" class="nav-link">FAQ</a>
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">Блог</a>
              </li>
              <li class="nav-item">
                <RouterLink to="/page/contact" class="nav-link">Контакты</RouterLink>
              </li>
            </ul>
            <div class="other-option">
              <a class="default-btn" href="mailto:sales@nero1218.tech">Связаться <span></span></a>
            </div>
          </div>
        </nav>
        <ResponsiveMenu v-if="uiStore.isOpen" :structure="structure" />
      </div>
    </div>
  </div>
  <!-- End Navbar Section -->
</template>

<style scoped>
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