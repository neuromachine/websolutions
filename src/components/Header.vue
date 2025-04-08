<script setup>
import {ref, onMounted, onUnmounted, computed} from 'vue'
import $ from 'jquery'
// import MeanMenu from "@/components/MeanMenu.vue";
import ResponsiveMenu from '@/components/ResponsiveMenu.vue';

import structure from "@/structure.json";
// const items = computed(() => sourceData.find((work) => work.slug === route.params.slug));
// const items = sourceData

// const items = computed(() => sourceData.find((work) => work.slug === route.params.slug));


defineProps({
  isMain: Boolean,
})

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  // console.log(structure)

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

    <!-- Иконка-бургер -->
    <button class="burger-button" @click="toggleMenu">
      <i :class="isOpen ? 'bi bi-x-lg' : 'bi bi-list'" class="burger-icon"></i>
    </button>

    <ResponsiveMenu v-if="isOpen" :structure="structure" />
    <div v-if="false" class="techvio-responsive-nav index-navber-responsive">
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
      </div>
    </div>
  </div>
  <!-- End Navbar Section -->
</template>

<style scoped>
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
  .burger-button {
    display: block;
  }
}
</style>