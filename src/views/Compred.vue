<script setup>
import CPheader from "@/components/CPheader.vue";
import CPimg from "@/components/CPimg.vue";
import CPicon from "@/components/CPicon.vue";
import WSteam from "@/components/WSteam.vue";
import Footer from "@/components/Footer.vue";
import {useUiStore} from "@/stores/uiStore.js";
const uiStore = useUiStore();

import {useDataStore} from '@/stores/dataStore';
const dataStore = useDataStore();

import {useRoute} from "vue-router";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";

const route = useRoute();




const benefits = [
  {
    index: 1,
    icon: 'graph-up-arrow',
    title: 'Заявки',
    text: 'Сайт структурирован под конверсию: чёткие пакеты, сроки, цены и понятный путь к бронированию.',
  },
  {
    index: 2,
    icon: 'search',
    title: 'Видимость',
    text: 'SEO-структура под запросы "fishing Nha Trang", "deep sea fishing Vietnam" и русскоязычную аудиторию.',
  },
  {
    index: 3,
    icon: 'images',
    title: 'Доверие',
    text: 'Акцент на фото трофеев, экипировку, команду и реальные отзывы клиентов.',
  },
  {
    index: 4,
    icon: 'calendar-check',
    title: 'Бронирование',
    text: 'Интеграция форм и удобного сценария записи с быстрым подтверждением.',
  },
]

const plans = [
  {
    name: 'Старт',
    price: '35 000',
    term: '3 недели',
    featured: false,
    features: [
      'Анализ конкурентов Нячанга',
      'Структура продающего лендинга',
      'Индивидуальный дизайн',
      'До 6 информационных блоков',
      'Описание пакетов рыбалки',
      'Форма онлайн-заявки',
      'Базовая SEO-оптимизация',
      'Адаптация под мобильные',
    ],
  },
  {
    name: 'Трофей',
    price: '95 000',
    term: '5 недель',
    featured: true,
    features: [
      'Всё из пакета «Старт»',
      'Многостраничная структура',
      'Страницы пакетов рыбалки',
      'Галерея уловов',
      'Блок отзывов клиентов',
      'Двуязычная версия RU/EN',
      'Расширенная SEO-настройка',
      'Интеграция WhatsApp / Telegram',
      'Подключение аналитики',
    ],
  },
  {
    name: 'Экспедиция',
    price: 'от 190 000',
    term: '2 месяца',
    featured: false,
    features: [
      'Всё из пакета «Трофей»',
      'Онлайн-календарь бронирования',
      'Система предоплаты',
      'Мультиязычность (3+ языка)',
      'Видео-блоки с выходов',
      'Автоматизация заявок',
      'CRM-интеграция',
      'Стратегия продвижения',
      'Техническая поддержка 2 мес.',
    ],
  },
]

const includes = [
  { index: 3, text: 'Исследование целевой аудитории туристов', icon: 'check-lg' },
  { index: 3, text: 'Проработку конкурентных преимуществ',     icon: 'check-lg' },
  { index: 3, text: 'Настройку аналитики и целей',             icon: 'check-lg' },
  { index: 3, text: 'Консультацию по цифровой стратегии',      icon: 'check-lg' },
]
</script>

<template>


  <CPheader />




  <main class="page">


    <!-- Start Home Section -->
    <div class="home-section home-2">
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-lg-6 col-md-12">
                <div class="main-banner-content">
                  <h6 class="text-gradient">Туристы ищут рыбалку в Нячанге каждый день.</h6>

                  <h1>Они выбирают не лодку. Они выбирают —<br><span class="text-gradient">Кому доверить свой трофей.</span></h1>
                  <p>          Сегодня клиент принимает решение за минуты. Если ваш сайт не демонстрирует
                    масштаб, безопасность и результат — он уходит к конкуренту. Мы создаём
                    продающую цифровую площадку, которая превращает интерес туриста в оплаченный
                    выход в море.</p>
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="banner-image">
                  <CPimg />
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
    <!-- End Home Section -->

    <!-- Start Services Two Section -->
    <section class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">Вы получаете</h6>
              <h2>Рабочий инструмент продаж</h2>
            </div>
          </div>


          <div class="col-lg-3 col-md-6"  v-for="b in benefits" :key="b.title">
            <div class="service">
              <div class="icon">
                <!--
                                <IconOffer
                                    :index="props.index"
                                    :properties="props.properties"
                                />
                -->
                <IconOffer
                    :index="b.index"
                    :properties="b"
                />


<!--                <i class="bi" :class=b.icon></i>-->
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
    <!-- End Services Two Section -->


    <!-- Start About Section -->
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
    <!-- End About Section -->


    <!-- Start Services Two Section -->
    <section class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">Стоимость</h6>
              <h2>Морские решения</h2>
            </div>
          </div>

          <div class="col-lg-4 col-md-6"
               v-for="plan in plans"
          >
            <div class="service plan">
              <div class="visual">
                <CPicon />
              </div>
              <div class="title">
                {{ plan.name }}
              </div>
              <div class="price roboto">
                бюджет <span class="sofia_bold">{{ plan.price }}</span> ₽
              </div>
              <div class="term roboto">
                срок <span class="sofia_bold">{{ plan.term }}</span>
              </div>
              <ul class="conditions">
                <li v-for="f in plan.features" :key="f">{{ f }}</li>
              </ul>
              <div class="b_wrap">
                <RouterLink class="know_price" to="/pages/contacts">Обсудить план</RouterLink>
              </div>
            </div>
          </div>



        </div>
      </div>
    </section>
    <!-- End Services Two Section -->


    <!-- Start Services Two Section -->
    <section class="services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="section-title">
              <h6 class="sub-title">Все решения включают:</h6>
            </div>
          </div>

          <div class="col-lg-3 col-md-6" v-for="item in includes" :key="item.text">
            <div class="service">
              <div class="icon">
<!--                <i class="bi bi-check-lg"></i>-->

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
    <!-- End Services Two Section -->




  </main>




  <Footer/>
</template>

<style scoped>

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