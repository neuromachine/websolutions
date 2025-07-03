<script setup>
import { onMounted, watch} from "vue";
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
import {useRoute} from "vue-router";
const route = useRoute();
function load() {
  dataStore.fetchBlockItem(route.params.slug);
  //dataStore.fetchStructure('services');
}
onMounted(() => {load()});
watch(
    () => route.params.slug,
    (newSlug, oldSlug) => {
      if (newSlug !== oldSlug) {
        load()
      }
    }
)
</script>
<template>
  <!-- Start Services Details Section -->
  <section class="services-details-area section-padding">
    <div v-if="dataStore.isItemReady" class="container">
      <div class="row">
        <div v-if="route.params.slug==='price'" class="col-lg-12 col-md-12">
<!--          <div class="info">route.params.slug: {{route.params.slug}}</div>-->
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
                      <h3>Start.Site</h3>
                    </div>
                    <div class="price-heading">
                      <div class="price-usd">
                        <h2>₽ 35.000<span class="price-small-text">Посадочная страница</span></h2>
                      </div>
                    </div>
                    <div class="price-body">
                      <ul>
                        <li>Главная страница + 2 доп. секции</li>
                        <li>Интерактивная карта и форма обратной связи</li>
                        <li>Адаптация под мобильные</li>
                        <li>Базовая SEO-структура (title, h1, мета)</li>
                        <li>Подключение соцсетей</li>
                        <li>Установка и публикация на хостинг</li>
                        <li class="offer-list-none"><del>Многостраничная структура</del></li>
                        <li class="offer-list-none"><del>Панель управления контентом</del></li>
                        <li class="offer-list-none"><del>Онлайн-бронирование или заказ</del></li>
                      </ul>
                    </div>
                    <div class="price-btn">
                      <a href="#"  @click="showOwerlay('startsite')" class="price-btn-one">Подробнее</a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6">
                  <div class="single-pricing-content">
                    <div class="price-tag">
                      <h3>Core.Site</h3>
                    </div>
                    <div class="price-heading">
                      <div class="price-usd">
                        <h2>₽ 65.000<span class="price-small-text">Многостраничный корпоративный</span></h2>
                      </div>
                    </div>
                    <div class="price-body">
                      <ul>
                        <li>До 7 страниц (о нас, меню, новости, акции и пр.)</li>
                        <li>Управление контентом через CMS</li>
                        <li>SEO-структура (чпу, мета, sitemap, robots)</li>
                        <li>Подключение соцсетей + формы захвата</li>
                        <li>Интерактивная карта и бронирование</li>
                        <li>Подключение аналитики</li>

                        <li class="offer-list-none"><del>Онлайн-заказы и оплата</del></li>
                        <li class="offer-list-none"><del>Личный кабинет</del></li>
                        <li class="offer-list-none"><del>Система лояльности</del></li>

                      </ul>
                    </div>
                    <div class="price-btn">
                      <a href="#" class="price-btn-one">Подробнее</a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6">
                  <div class="single-pricing-content">
                    <div class="price-tag">
                      <h3>Pro.Site</h3>
                    </div>
                    <div class="price-heading">
                      <div class="price-usd">
                        <h2>₽ 120.000<span class="price-small-text">Платформа под задачи роста</span></h2>
                      </div>
                    </div>
                    <div class="price-body">
                      <ul>
                        <li>Уникальный дизайн + прототип</li>
                        <li>Онлайн-меню и фильтрация (например, для кафе)</li>
                        <li>Система заказов и оплаты (корзина, оплата)</li>
                        <li>Личный кабинет + история заказов</li>
                        <li>Интеграция с CRM или 1С</li>
                        <li>Блог, новости, акции, мероприятия</li>
                        <li>SEO full-pack + микроразметка</li>
                        <li>Подключение систем лояльности</li>
                        <li>Подключение систем On-line оплаты</li>

                        <li class="offer-list-none"><del>Мобильное приложение</del></li>
                        <li class="offer-list-none"><del>Расширенная мультиязычность</del></li>
                      </ul>
                    </div>
                    <div class="price-btn">
                      <a href="#" class="price-btn-one">Подробнее</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- End Pricing Section -->
        </div>
        <div v-else class="col-lg-12 col-md-12">
          <div class="services-details-content">
            <div class="features-text" v-html="dataStore.item.properties.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container"><div class="row row_load">Loading Item</div></div>
  </section>
  <!-- End Services Details Section -->
</template>