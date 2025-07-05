<script setup>
import { onMounted, watch} from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import {useUiStore} from "@/stores/uiStore.js";
const uiStore = useUiStore();
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
import {useRoute} from "vue-router";
const route = useRoute();
function load() {
  //dataStore.fetchBlockItem(route.params.slug);
  dataStore.fetchStructure('services');
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
  <Header />


  <!-- Start Home Section -->
  <div v-if="dataStore.isStrReady" id="compred" class="home-3 home-section">
    <div id="particles-js"></div>
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12">
              <div class="main-banner-content">
                <ul class="social-icon-list">
                  <li><a href="https://t.me/websolutionspro"><i class="fa-brands fa-telegram"></i></a></li>
                </ul>
                <h1>Коммерческое предложение для ВАС!</h1>
                <p>🌴 Digital-решения для всех!</p>
                <!--
                <h2>О нас</h2>
                <p>Web Solutions — международная digital-команда, объединяющая опыт, технологии и креатив для решения любых задач в онлайне. Уже более 15 лет мы создаем сайты, интерфейсы, маркетинговые инструменты и интеграционные решения для клиентов из России и других стран.</p>
                <p>Рынок недвижимости Паттайи становится всё более конкурентным и динамичным: объекты быстро появляются и исчезают, покупатели становятся требовательнее, а внимание клиента нужно захватывать с первых секунд. В этой среде важно иметь не просто "сайт", а удобный, презентабельный и функциональный инструмент продаж.</p>
                <h3>Мы разработали три уровня решений, каждый из которых соответствует определенной стадии зрелости и потребностям агентства недвижимости:</h3>
                <p>Предлагаем</p>
                <p>Мы разработали три готовых решения под ключ, адаптированных под специфику риэлторского бизнеса Паттайи — будь вы небольшим агентом, развивающим личный бренд, или профессиональным офисом с десятками объектов и CRM-учётом.</p>
                -->
                <p>🔹 Quick.Page — для быстрой презентации и привлечения первых лидов</p>
                <p>🔹 Core.Site — для стабильного позиционирования и расширения базы</p>
                <p>🔹 Smart.Catalog — как полноценная система продаж с каталогом, заявками и аналитикой</p>
                <p>Каждое решение масштабируемо, адаптивно и может быть дополнено индивидуальными модулями по мере роста ваших задач.</p>
                <div class="banner-btn buttons">
                  <a class="default-btn-one btn_compred" href="https://t.me/Lola_06">Телеграм <span></span></a>
                  <a class="default-btn-two btn_compred button_compred_phone"  :href="'tel:+'+uiStore.uiMainVars.page.contacts.phone">
                    <div class="txt_wrap">Позвонить Lili
                    <i class="bi bi-flower1"></i> +{{uiStore.uiMainVars.page?.contacts?.phone}}
                      <span></span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12" data-tilt>
              <div class="banner-image">
                <img src="/assets/img/home-font-3.png" alt="image">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container"><div class="row row_load">Loading Item</div></div>
  <!-- End Home Section -->

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
              <h3>Quick.Page</h3>
            </div>
            <div class="price-heading">
              <div class="price-usd">
                <h2>₽ 35.000<span class="price-small-text">Лэндинг для ваших продаж</span></h2>
              </div>
            </div>
            <div class="price-body">
              <ul>
                <li>Одностраничный сайт</li>
                <li>Форма заявки</li>
                <li>Интерактивная карта с отметками объектов</li>
                <li>Мобильная адаптация</li>
                <li>Подключение аналитики</li>
                <li>Базовая SEO-структура</li>
                <li>Установка и настройка домена/хостинга</li>
                <li class="offer-list-none"><del>Панель управления контентом</del></li>
                <li class="offer-list-none"><del>Фильтрация по объектам</del></li>
                <li class="offer-list-none"><del>CRM или бронь онлайн</del></li>
              </ul>
            </div>
            <div class="price-btn">
<!--              <a href="https://t.me/Lola_06" target="_blank"  @click="showOwerlay('startsite')" class="price-btn-one">Подробнее</a>-->
              <a href="https://t.me/Lola_06" target="_blank" class="price-btn-one">Подробнее</a>
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
                <h2>₽ 85.000<span class="price-small-text">Многостраничный корпоративный</span></h2>
              </div>
            </div>
            <div class="price-body">
              <ul>
                <li>До 10 типов страниц</li>
                <li>Управление контентом через CMS</li>
                <li>+1 специализированный инструмент на выбор</li>
                <li>Интерактивная карта и форма заявки</li>
                <li>SEO-структура</li>
                <li>Подключение аналитики</li>

                <li class="offer-list-none"><del>Онлайн-заказы и оплата</del></li>
                <li class="offer-list-none"><del>Личный кабинет</del></li>
                <li class="offer-list-none"><del>Система лояльности</del></li>

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
              <h3>Smart.Catalog</h3>
            </div>
            <div class="price-heading">
              <div class="price-usd">
                <h2>₽ 110.000<span class="price-small-text">Каталог + умные инструменты</span></h2>
              </div>
            </div>
            <div class="price-body">
              <ul>
                <li>До 15 шаблонов страниц</li>
                <li>CMS-редактирование контента и структуры</li>
                <li>Продвинутый каталог недвижимости с фильтрами</li>
                <li>Интеграция с CRM-системой</li>
                <li>Расширенная форма заявки</li>
                <li>Онлайн-бронирование</li>
                <li>Интерактивная карта</li>
                <li>Уникальный дизайн</li>
                <li class="offer-list-none"><del>Личный кабинет (можно добавить отдельно)</del></li>
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


  <Footer />
</template>