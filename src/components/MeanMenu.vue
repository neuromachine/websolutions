<script setup>
/*
import { ref, onMounted } from "vue";

import $ from 'jquery';

// 👉 ДО импорта meanmenu:
window.jQuery = $;
window.$ = $;

// Только потом подключай плагин:
import '@/assets/jquery.meanmenu.js';

// Делаем jQuery доступным для глобального контекста
window.jQuery = $;
window.$ = $;

const menuRef = ref(null);

onMounted(() => {
  if (!window.jQuery) {
    console.error("jQuery не загружен");
    return;
  }

  $(menuRef.value).meanmenu({
    meanScreenWidth: "991"
  });
});
*/
</script>


<template>
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
          <div class="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink to="/">Главная</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/pages/about" class="nav-link">О нас</RouterLink>
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
                <RouterLink to="/pages/contact" class="nav-link">Контакты</RouterLink>
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

