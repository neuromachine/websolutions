<script setup>
import {computed, onMounted, onUnmounted, watch} from "vue";
// import debug from "@/components/Debug.vue";
// import Prices from "@/components/Prices.vue";
// import Header from "@/components/Header.vue";
import CPheader from "@/components/CPheader.vue";
import CPimg from "@/components/CPimg.vue";
import CPicon from "@/components/CPicon.vue";
import WSteam from "@/components/WSteam.vue";
import Portfolio from "@/components/Portfolio.vue"
import Footer from "@/components/Footer.vue";
import content from "@/components/blocks/services/presentation/content.vue"
import {useUiStore} from "@/stores/uiStore.js";
const uiStore = useUiStore();

import {useDataStore} from '@/stores/dataStore';
const dataStore = useDataStore();

import {useRoute} from "vue-router";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";

import { useHead } from '@unhead/vue';
useHead({
  title: 'Коммерческое предложение',
  meta: [
    { name: 'description', content: 'Предложение от web solution' },
    // Open Graph
    { property: 'og:title', content: 'КП' },
    { property: 'og:description', content: '-' },
    { property: 'og:image', content: 'https://ws-pro.ru/assets/svg/window.png' },
    { property: 'og:url', content: 'https://ws-pro.ru/' },
    { property: 'og:type', content: 'website' },
  ]
});

const route = useRoute();

function load() {
  dataStore.fetchBlockItem(route.params.slug);
  dataStore.fetchStructure('services'); // TODO: services - > wrong:
}

onMounted(() => {
  uiStore.setHeaderVars('menu', false);
  load()
});

watch(
    () => route.params.slug,
    (newSlug, oldSlug) => {
      if (newSlug !== oldSlug) {
        load();
      }
    }
);
</script>

<template>
<!--  <debug/>-->
<!--  <Header/>-->
  <CPheader />
  <div v-if="dataStore.isStrReady">
    <!-- HERO -->
    <div class="home-section home-2">
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 col-md-12">
                <div class="main-banner-content">
                  <h6 class="text-gradient">{{ dataStore.item.properties.hero.pretitle }}</h6>
                  <h1>{{ dataStore.item.properties.hero.title }}<br><span class="text-gradient">{{ dataStore.item.properties.hero.focus }}</span></h1>
                  <p>{{ dataStore.item.properties.hero.paragraph }}</p>
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="banner-image">
                  <CPimg :svgkey="dataStore.item.key"/>
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
    <!-- HERO -->
    <section v-if="dataStore.item.properties.content"  class="compred_content services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <content
                :content="dataStore.item.properties.content"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">{{ dataStore.item.properties.benefits.pretitle }}</h6>
              <h2>{{ dataStore.item.properties.benefits.title }}</h2>
            </div>
          </div>
          <div class="col-lg-3 col-md-6"  v-for="b in dataStore.item.properties.benefits.items" :key="b.title">
            <div class="service">
              <div class="icon">
                <IconOffer
                    :index="b.index"
                    :properties="b"
                />
              </div>
              <div class="title">
                {{ b.title }}
              </div>
              <div class="descr">
                {{ b.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Benefits -->
    <!-- About -->
    <section class="about-area bg-grey section-padding">
      <div class="container">
        <div class="row d-flex align-items-center">
          <div class="col-lg-6 col-md-12">
            <div class="about-content">
              <h6 class="sub-title">О нас</h6>
              <h2>Web Solution — решения с фокусом на результат</h2>
              <p class="about__text">Мы — международная digital-команда.</p>
              <p class="about__text">Создаём сайты, которые <strong>работают</strong> на рост бизнеса.</p>
              <p class="about__text">
                Фокус на удобстве пользователей, внимании к деталям и технологиях,
                которые решают задачи.
              </p>
            </div>
          </div>
          <div class="col-lg-6 col-md-12">
            <div class="about-image">
              <WSteam />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End About -->
    <!-- Packages -->
    <section class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">{{ dataStore.item.properties.items.pretitle }}</h6>
              <h2>{{ dataStore.item.properties.items.title }}</h2>
            </div>
          </div>
          <div class="col-lg-4 col-md-6" v-for="item in dataStore.item.properties.items.items">
            <div class="service plan">
              <div class="visual">
                <CPicon :svgkey="dataStore.item.key"/>
              </div>
              <div class="title">
                {{ item.name }}
              </div>
              <div class="price roboto">
                бюджет <span class="sofia_bold">{{ item.price }}</span> ₽
              </div>
              <div class="term roboto">
                срок <span class="sofia_bold">{{ item.term }}</span>
              </div>
              <ul class="conditions">
                <li v-for="f in item.features" :key="f">{{ f }}</li>
              </ul>
              <div class="b_wrap">
                <RouterLink class="know_price" to="/pages/contacts">Обсудить план</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Packages -->
    <!-- Includes -->
    <section class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">Все решения включают:</h6>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" v-for="item in dataStore.item.properties.includes" :key="item.text">
            <div class="service">
              <div class="icon">
                <IconOffer
                    :index="item.index"
                    :properties="item"
                />
              </div>
              <div class="title">
                {{ item.text }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Includes -->
    <section v-if="dataStore.item.properties.acticle"  class="compred_content services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <content
                :content="dataStore.item.properties.acticle"
            />
          </div>
        </div>
      </div>
    </section>
    <Portfolio />
  </div>
  <div v-else class="container">
    <div class="row row_load">Loading Item</div>
  </div>
  <Footer/>
</template>

<style scoped>
.compred_content { font-size: 20px}
.service {
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: #000;
  box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);
}
.service .icon { width: 50px; height: 50px;}
.service .title { font-size: 16px; font-weight: bold; margin: 16px 0 16px 0;}
.service .descr { font-size: 14px; line-height: 17px; color: #5F5F5F; margin: 0 0 16px 0;}
.service .roboto { font-family: Roboto, "Helvetica Neue", sans-serif; font-size: 11px; line-height: 22px; margin: 0 0 16px 0;}
.service .sofia_bold { font-family: "Sofia Sans", sans-serif; font-size: 18px; font-weight: bold; margin: 0 10px 0 10px;}
.service .conditions { padding: 0 0 0 16px; color: #5F5F5F;}
.service .conditions li { margin: 4px 0 4px 0; list-style: disc;}
.service .b_wrap {  display: flex; margin: 16px 0 0 0;}
.service .know_price { color: #00D9EA; border: solid 1px #00D9EA; border-radius: 4px; padding: 18px 14px;}
.service .know_price:hover { background-color: #00D9EA; color: #FFF; }

@media (max-width: 767px) {
  .home-section.home-2 {
    padding-top: 40px;
  }

}

</style>