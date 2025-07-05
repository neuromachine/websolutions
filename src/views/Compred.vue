<script setup>
import {computed, onMounted, onUnmounted, watch} from "vue";
import debug from "@/components/Debug.vue";
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
                <ul v-if="route.params.slug !== 'erir'" class="social-icon-list">
                  <li>
                    <a href="https://t.me/websolutionspro">
                      <i class="fa-brands fa-telegram"></i>
                    </a>
                  </li>
                </ul>
                <h1>{{ dataStore.item.properties.title }}</h1>
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

  <section class="services-details-area section-padding">
    <div v-if="dataStore.isItemReady" class="container">
      <div class="row">
        <div class="col-lg-12 col-md-12">
          <div class="services-details-content">
            <div class="features-text" v-html="dataStore.item.properties.acticle"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container">
      <div class="row row_load">Loading Item</div>
    </div>
  </section>

  <!-- Start Pricing Section -->
  <section class="price-area pt-100 pb-70">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">Востребованные пакеты</h6>
            <h2>Наши предложения</h2>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-pricing-content">
            <div class="price-tag">
              <h3>Лендинг "Старт"</h3>
            </div>
            <div class="price-heading">
              <div class="price-usd">
                <h2>₽ 35.000<span class="price-small-text">Быстрый запуск для продаж</span></h2>
              </div>
            </div>
            <div class="price-body">
              <ul>
                <li>Одностраничный сайт (Landing Page)</li>
                <li>Адаптивный дизайн для мобильных устройств</li>
                <li>Форма обратной связи</li>
                <li>Подключение базовой аналитики (Яндекс.Метрика/Google Analytics)</li>
                <li>Установка и настройка домена/хостинга</li>
                <li>Базовая SEO-оптимизация</li>
                <li class="offer-list-none"><del>Система управления контентом (CMS)</del></li>
                <li class="offer-list-none"><del>Интеграции с CRM/бронированием</del></li>
                <li class="offer-list-none"><del>Многостраничная структура</del></li>
              </ul>
            </div>
            <div class="price-btn">
              <a href="https://t.me/Lola_06" target="_blank" class="price-btn-one">Подробнее</a>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-pricing-content">
            <div class="price-tag">
              <h3>Корпоративный "Оптимум"</h3>
            </div>
            <div class="price-heading">
              <div class="price-usd">
                <h2>₽ 85.000<span class="price-small-text">Полноценный сайт для бизнеса</span></h2>
              </div>
            </div>
            <div class="price-body">
              <ul>
                <li>Многостраничный сайт (до 10 страниц)</li>
                <li>Система управления контентом (CMS)</li>
                <li>Адаптивный дизайн для мобильных устройств</li>
                <li>Форма обратной связи и интерактивная карта</li>
                <li>Подключение расширенной аналитики</li>
                <li>Расширенная SEO-структура</li>
                <li>Выбор 1 дополнительного модуля (например, блог, новости, фотогалерея)</li>
                <li class="offer-list-none"><del>Онлайн-оплата или личный кабинет</del></li>
                <li class="offer-list-none"><del>Продвинутый каталог товаров/услуг</del></li>
              </ul>
            </div>
            <div class="price-btn">
              <a href="https://t.me/Lola_06" target="_blank" class="price-btn-one">Подробнее</a>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-pricing-content">
            <div class="price-tag">
              <h3>Каталог "Профи"</h3>
            </div>
            <div class="price-heading">
              <div class="price-usd">
                <h2>₽ 110.000<span class="price-small-text">Сайт с каталогом и CRM</span></h2>
              </div>
            </div>
            <div class="price-body">
              <ul>
                <li>Полноценный сайт с каталогом (до 15 шаблонов страниц)</li>
                <li>Система управления контентом (CMS) с расширенными возможностями</li>
                <li>Адаптивный дизайн для мобильных устройств</li>
                <li>Продвинутый каталог с фильтрами и поиском</li>
                <li>Интеграция с CRM-системой</li>
                <li>Онлайн-бронирование или корзина/оплата</li>
                <li>Расширенная форма заявки и интерактивная карта</li>
                <li>Полная SEO-оптимизация</li>
                <li><i>Возможность добавления личного кабинета (опционально)</i></li>
              </ul>
            </div>
            <div class="price-btn">
              <a href="https://t.me/Lola_06" target="_blank" class="price-btn-one">Подробнее</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Pricing Section -->

  <Footer/>
</template>

