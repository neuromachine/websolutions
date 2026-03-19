<script setup>
import { onMounted , computed } from 'vue'
import SimplifiedForm from "@/components/forms/SimplifiedForm.vue";
import WSpro from "@/components/WSpro.vue";
// import FeedbackForm from "@/components/FeedbackForm.vue";
// import OfferRequestForm from "@/components/OfferRequestForm.vue";

import {useUiStore} from "@/stores/uiStore.js";
import {useRoute} from "vue-router";
import $ from 'jquery'

defineProps({
  isMain: { type: Boolean, default: false },
  isNavi: Boolean,
});


const uiStore = useUiStore();
const route = useRoute();

const isNavi = computed(() => route.path === '/compred');

import { useI18n } from 'vue-i18n'
const { t } = useI18n()


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
  <!-- Start Footer Section -->
  <section class="footer-subscribe-wrapper">
    <!-- Start Form Section -->
    <div class="subscribe-area" v-if="!isNavi">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-6">
            <div class="subscribe-content">
              <h2>{{ t('form.title') }}</h2>
              <p>{{ t('form.desc') }}</p>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <SimplifiedForm />
          </div>
        </div>
      </div>
    </div>
    <!-- End Form Section -->
    <!-- Start Footer menu Section -->
    <div class="footer-area ptb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <a class="footer-logo" href="/">
                <WSpro />
              </a>
              <p>{{ t('ui.slogan') }}</p>
              <ul class="footer-social">
                <li><a href="https://www.instagram.com/websn.pro/" target="_blank"><i class="fa-brands fa-instagram"></i></a></li>
                <li><a href="https://t.me/websolutionspro" target="_blank"><i class="fa-brands fa-telegram"></i></a></li>
                <li><a href="https://t.me/Lola_06" target="_blank"><i class="fa-solid fa-message"></i></a></li>
              </ul>
            </div>
          </div>
          <div  v-if="!isNavi" class="col-lg-2 col-md-6 col-sm-6">
            <div class="single-footer-widget">
              <div class="footer-heading">
                <h3>{{ t('ui.navi.groups.services') }}</h3>
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
                <h3>{{ t('ui.navi.groups.info') }}</h3>
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
                <h3>{{ t('ui.navi.groups.contacts') }}</h3>
              </div>
              <div class="footer-info-contact">
                <i class="flaticon-phone-call"></i>
                <h3>{{ t('ui.contacts.phone.name') }}</h3>
<!--                <span><a :href="'tel:+'+uiStore.uiMainVars.page.contacts.phone">{{ uiStore.uiMainVars.page.contacts.phone }}</a></span>-->
                <span><a :href="'tel:' + t('ui.contacts.phone.link')" target="_blank">{{ t('ui.contacts.phone.anchor') }}</a></span>
              </div>
              <div class="footer-info-contact">
                <i class="flaticon-envelope"></i>
                <h3>{{ t('ui.contacts.email.name') }}</h3>
                <span><a :href="'mailto:' + t('ui.contacts.email.link')" target="_blank">{{ t('ui.contacts.email.anchor') }}</a></span>
              </div>
              <div class="footer-info-contact">
                <i class="flaticon-envelope"></i>
                <h3>{{ t('ui.contacts.messaging.name') }}</h3>
                <span><a :href="'' + t('ui.contacts.messaging.link')" target="_blank">{{ t('ui.contacts.messaging.anchor') }}</a></span>
              </div>
              <div class="footer-info-contact">
                <i class="flaticon-location"></i>
                <h3>{{ t('ui.contacts.location.name') }}</h3>
                <span>{{ t('ui.contacts.location.anchor') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Footer menu Section -->
  </section>
  <!-- End Footer Section -->

  <!-- Start Copy Right Section -->
  <div v-if="!isNavi" class="copyright-area">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-6">
          <p><i class="far fa-copyright"></i> 2026 WebSoulutions - All Rights Reserved.</p>
        </div>
        <div class="col-lg-6 col-md-6">
<!--          <ul>-->
<!--            <li><a href="/pages/agreements">Соглашения</a></li>-->
<!--            <li><a href="/pages/privacypolicy">Политика конфеденциальности</a></li>-->
<!--          </ul>-->
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