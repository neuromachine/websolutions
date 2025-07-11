<script setup>
import {computed, onMounted, onUnmounted, watch} from "vue";
import debug from "@/components/Debug.vue";
import Prices from "@/components/Prices.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {useUiStore} from "@/stores/uiStore.js";
const uiStore = useUiStore();

import {useDataStore} from '@/stores/dataStore';
const dataStore = useDataStore();

import {useRoute} from "vue-router";

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




  <debug/>



  <Header/>



  <div v-if="dataStore.isStrReady" id="compred" class="home-3 home-section">
    <div id="particles-js"></div>
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12">
              <div class="main-banner-content">
<!--                <ul v-if="route.params.slug !== 'erir'" class="social-icon-list">-->
<!--                  <li>-->
<!--                    <a href="https://t.me/websolutionspro">-->
<!--                      <i class="fa-brands fa-telegram"></i>-->
<!--                    </a>-->
<!--                  </li>-->
<!--                </ul>-->
                <h1><!--<i class="bi bi-fire"></i> -->{{ dataStore.item.properties.title }} <i class="bi bi-sun"></i></h1>
                <div class="content_wrap" v-html="dataStore.item.properties.content"></div>
                <div v-if="route.params.slug === 'erir'" class="banner-btn buttons">
                  <a class="default-btn-one btn_compred" href="https://t.me/Lola_06">Напиши в директ<span></span></a>
                  <a class="default-btn-two btn_compred button_compred_phone"
                     :href="'tel:+' + uiStore.uiMainVars.page.contacts.phone">
                    <div class="txt_wrap">Подберем решение под твой проект<span></span></div>
                  </a>
                </div>
                <div v-else class="banner-btn buttons">
                  <a class="default-btn-one btn_compred" href="https://t.me/Lola_06">Телеграм <span></span></a>
                  <a class="default-btn-two btn_compred button_compred_phone"
                     :href="'tel:+' + uiStore.uiMainVars.page.contacts.phone">
                    <div class="txt_wrap">
                      Позвонить Lili
                      <i class="bi bi-flower1"></i> +{{ uiStore.uiMainVars.page?.contacts?.phone }}
                      <span></span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12" data-tilt>
              <div class="banner-image">
                <img src="/assets/img/home-font-3.png" alt="image"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container">
    <div class="row row_load">Loading Item</div>
  </div>

  <Prices :slug="route.params.slug" />

  <section class="services-details-area section-padding">
    <div v-if="dataStore.isItemReady" class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <div class="services-details-content">
            <div class="features-text content_wrap" v-html="dataStore.item.properties.acticle"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="row row_load">Loading Item</div>
    </div>
  </section>



  <Footer/>
</template>

