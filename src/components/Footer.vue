<script setup>
import { ref, onMounted, onUnmounted , computed} from 'vue'
import {useUiStore} from "@/stores/uiStore.js";

defineProps({
  isMain: false,
  isNavi: Boolean
})


const uiStore = useUiStore();
import {useRoute} from "vue-router";

const route = useRoute();
const isNavi = computed(() => {
  if (route.path !== '/compred') return null;
  return true;
});


import $ from 'jquery'

// TODO: Refactoring
onMounted(() => {
  // Go to Top
  // Scroll Event
  $(window).on('scroll',function() {
    var scrolled = $(window).scrollTop();
    if (scrolled > 600) $('.go-top').addClass('active');
    if (scrolled < 600) $('.go-top').removeClass('active');
  });
  // Click Event
  $('.go-top').on('click', function() {
    $("html, body").animate({ scrollTop: "0" }, 100);
  });
});
</script>

<template>
  <!-- Start Footer & Subscribe Section -->
  <section class="footer-subscribe-wrapper">
    <!-- Start Subscribe Section -->
    <div class="subscribe-area" v-if="!isNavi">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6">
            <div class="subscribe-content">
              <h2>Заполните форму</h2>
              <p>Оставьте нам свой контакт - свяжемся оперативно</p>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <form class="newsletter-form">
              <input type="text" class="input-newsletter" name="email" placeholder="имя в мессенджере, телефон или e-mail" required autocomplete="off">
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- End Subscribe Section -->
    <!-- Start Footer Section -->
    <div class="footer-area ptb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <a class="footer-logo" href="#">
                <img src="/assets/img/logo.png" class="white-logo" alt="logo">
              </a>
              <p>Создаём, дорабатываем, улучшаем. Web-решения, которые работают на результат.</p>
              <ul class="footer-social">
                <li><a href="https://www.instagram.com/websn.pro/" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
                <li><a href="https://t.me/websolutionspro" target="_blank"><i class="fa-brands fa-telegram"></i></a></li>
                <li><a href="https://vk.com/websn" target="_blank"><i class="fa-brands fa-vk"></i></a></li>
                <li><a href="https://t.me/Lola_06" target="_blank"><i class="fa-solid fa-message"></i></a></li>
              </ul>
            </div>
          </div>
          <div  v-if="!isNavi" class="col-lg-2 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <div class="footer-heading">
                <h3>Услуги</h3>
              </div>
              <ul class="footer-quick-links">
                <li><a href="/services">Разработка</a></li>
                <li><a href="/services">Продвижение</a></li>
                <li><a href="/services">Сопровождение</a></li>
                <li><a href="/services">Индивидуально</a></li>
              </ul>
            </div>
          </div>
          <div  v-if="!isNavi" class="col-lg-2 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <div class="footer-heading">
                <h3>Инфо</h3>
              </div>
              <ul class="footer-quick-links">
                <li><a href="/pages/about">О нас</a></li>
                <li><a href="/pages/contacts">Контакты</a></li>
<!--                <li><a href="portfolio.html">Команда</a></li>
                <li><a href="contact.html">Цены</a></li>
                <li><a href="privacy-policy.html">FAQ</a></li>-->
              </ul>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <div class="footer-heading">
                <h3>Контакты</h3>
              </div>
              <div class="footer-info-contact">
                <i class="flaticon-phone-call"></i>
                <h3>Телефон</h3>
                <span><a :href="'tel:+'+uiStore.uiMainVars.page.contacts.phone">{{uiStore.uiMainVars.page.contacts.phone}}+7(928)261-90-61</a></span>
              </div>
              <div class="footer-info-contact">
                <i class="flaticon-envelope"></i>
                <h3>Email</h3>
                <span><a href="mailto:lili@ws-pro.ru">lili@ws-pro.ru</a></span>
              </div>
              <div class="footer-info-contact">
                <i class="flaticon-placeholder"></i>
                <h3>Адрес</h3>
                <span>г. Краснодар. Ул. Сормовская 7 лит. Г</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Footer Section -->
  </section>
  <!-- End Footer & Subscribe Section -->

  <!-- Start Copy Right Section -->
  <div v-if="!isNavi" class="copyright-area">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-6">
          <p><i class="far fa-copyright"></i> 2025 WebSoulutions - All Rights Reserved.</p>
        </div>
        <div class="col-lg-6 col-md-6">
          <ul>
            <li><a href="/pages/agreements">Соглашения</a></li>
            <li><a href="/pages/privacypolicy">Политика конфеденциальности</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- End Copy Right Section -->

  <!-- Start Go Top Section -->
  <div class="go-top">
    <i class="fas fa-chevron-up"></i>
    <i class="fas fa-chevron-up"></i>
  </div>
  <!-- End Go Top Section -->
</template>

<style scoped>

</style>