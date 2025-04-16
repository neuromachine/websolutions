<script setup>
import { ref, onMounted, onUnmounted , computed} from 'vue'
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
                <li>
                  <a href="https://t.me/Lola_06" target="_blank"> <i class="fa-brands fa-telegram"></i></a>
                </li>
                <!--
                                            <li>
                                                <a href="#"> <i class="fa-brands fa-x-twitter"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"> <i class="fab fa-youtube"></i></a>
                                            </li>
                                            <li>
                                                <a href="#"> <i class="fab fa-linkedin"></i></a>
                                            </li>
                -->
              </ul>
            </div>
          </div>
          <div  v-if="!isNavi" class="col-lg-2 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <div class="footer-heading">
                <h3>Услуги</h3>
              </div>
              <ul class="footer-quick-links">
                <li><a href="#">Разработка</a></li>
                <li><a href="#">Продвижение</a></li>
                <li><a href="#">Сопровождение</a></li>
                <li><a href="#">Индивидуально</a></li>
              </ul>
            </div>
          </div>
          <div  v-if="!isNavi" class="col-lg-2 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <div class="footer-heading">
                <h3>Инфо</h3>
              </div>
              <ul class="footer-quick-links">
                <li><a href="about.html">О нас</a></li>
                <li><a href="portfolio.html">Команда</a></li>
                <li><a href="contact.html">Цены</a></li>
                <li><a href="privacy-policy.html">FAQ</a></li>
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
                <span><a href="tel:+79282619061">+7 928 261 9061</a></span>
              </div>
              <div class="footer-info-contact">
                <i class="flaticon-envelope"></i>
                <h3>Email</h3>
                <span><a href="mailto:info@nero1218.tech">lili@ws-pro.ru</a></span>
              </div>
              <div class="footer-info-contact">
                <i class="flaticon-placeholder"></i>
                <h3>Адрес</h3>
                <span>Паттайя, Bang Lamung District, Chon Buri 20150 Laguna Beach Resort 3 The Maldives 164/1151</span>
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
            <li><a href="terms-condition.html">Соглашения</a></li>
            <li><a href="privacy-policy.html">Политика конфеденциальности</a></li>
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