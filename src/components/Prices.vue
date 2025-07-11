<script setup>
import { onMounted } from 'vue'

import {useDataStore} from '@/stores/dataStore';
const dataStore = useDataStore();

const props = defineProps({
  slug: {
    type: String,
    required: true
  },
})

onMounted(() => {
  document.querySelectorAll('.scroll').forEach(a =>
      a.onclick = e => (e.preventDefault(), document.querySelector(`a[name="${a.getAttribute('href').slice(1)}"]`).scrollIntoView({ behavior: 'smooth' }))
  )
})
</script>

<template>
  <!-- Start Pricing Section -->
  <section v-if="!props.slug" class="price-area pt-100 pb-70">
  </section>
  <section v-else-if="props.slug === 'erir'" class="price-area pt-100 pb-70">
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

  <section v-else-if="props.slug === 'agora'" class="price-area pt-100 pb-70">
    <div class="container">
      <div class="row">
        <!-- Section Title -->
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">Предлагаем</h6>
            <h2>Наши решения для AGORA</h2>
          </div>
        </div>

        <!-- Pricing Section -->
        <div  v-if="dataStore.isItemReady" class="row">


          <!--price_item-->
          <div v-for="item in dataStore.item.properties.items" class="package col-lg-4 col-md-6">
            <div  v-if="item?.name" class="single-pricing-content">

              <div v-if="item.pricing?.basePrice" class="price-tag">
                <h3>{{item.pricing.customPrice}} ฿</h3>
              </div>

              <div class="head">
                <div class="title" v-html="item.title"></div>
                <div v-if="item.pricing?.discount" class="discount discount_hi">- {{item.pricing.discount}}%</div>
              </div>
              <div v-if="item?.descr" class="descr" v-html="item.descr"></div>

              <div class="price-body">
                <ul v-if="item?.customFeatures">
                  <li v-for="feat in item.customFeatures">{{feat.title}}</li>
                </ul>
              </div>

              <div v-if="item.pricing?.oldPrice" class="oldprice"><span>฿</span>{{item.pricing.oldPrice}}</div>
              <div class="price-btn">
                <a :href="'#'+item.key" class="scroll price-btn-one">Подробнее</a>
              </div>
            </div>
          </div>
          <!--/price_item-->

        </div>

      </div>
    </div>
  </section>

  <section v-else >
    Раздел в стадии наполнения
  </section>
  <!-- End Pricing Section -->

  <section  v-if="props.slug && props.slug === 'agora'">
    <div class="container" v-if="dataStore.isItemReady">
      <div class="row">

          <!-- Section Title -->
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">Подробнее</h6>
              <h2>Каждое решение масштабируется и позволяет бизнесу расти — от презентационного сайта до полноценной цифровой экосистемы.</h2>
            </div>
          </div>

        <div class="col-md-12">
          <div v-for="item in dataStore.item.properties.items">
            <a :name="item.key"></a>
            <div class="price_desc content_wrap" v-html="item.article"></div>
          </div>
        </div>

      </div>
    </div>
  </section>

</template>

<style scoped>

</style>