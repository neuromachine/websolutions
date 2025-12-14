<script setup>

import Portfolio from "@/components/Portfolio.vue"
import Header from "@/components/Header.vue";
import Faq from "@/components/Faq.vue";
import Testimonial from "@/components/Testimonial.vue";
import Counter from "@/components/Counter.vue";
import Footer from '@/components/Footer.vue'


</script>

<template>
  <Header :isMain="true"/>
  <!-- Start Home Section -->
  <div class="home-section home-2">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12">
              <div class="main-banner-content">
                <h6 class="text-gradient">Надёжные web-решения</h6>
                <h1>Твой успешный бизнес,<br>Наша экспертная<br><span class="text-gradient">Web-поддержка.</span></h1>
                <p>Создаём, дорабатываем, улучшаем. Web-решения, которые работают на результат.</p>
                <!--
                <div class="banner-btn">
                  <a class="default-btn-one" href="services.html">Смотреть видео<span></span></a>
                  <div class="video-box">
                    <a href="https://www.youtube.com/watch?v=G9TdA8d5aaU" class="popup-video video-btn"> <i class="fa fa-play"></i></a>
                  </div>
                </div>
                -->
                <div class="banner-btn">
                  <RouterLink to="/pages/about" class="default-btn-one">
                    О компании<span></span>
                  </RouterLink>
                  <div class="video-box">
                    <RouterLink to="/pages/about" class="popup-video video-btn">
                    <i class="fa fa-play"></i>
                    </RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="banner-image">
                <img src="/assets/img/home-font-2.png" alt="image">
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
            <h6 class="sub-title">Что мы делаем</h6>
            <h2>Наши услуги</h2>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-two-item">
            <div class="services-icon-box">
              <div class="default-icon">
                <img src="/assets/img/icon/services-icon-1.svg" alt="svg icon">
              </div>
              <div class="hover-icon">
                <img src="/assets/img/icon/services-icon-hover-1.svg" alt="svg icon">
              </div>
            </div>
            <div class="services-two-content">
              <h3>Разработка UI</h3>
              <p>Создаём современные и удобные сайты — от лендингов до сложных платформ. Разрабатываем с нуля или дорабатываем существующие решения, адаптируя их под ваш бизнес</p>
              <div class="services-btn">
                <RouterLink to="/services" class="read-more"><i class="bi bi-arrow-right-short"></i> Подробно</RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-two-item">
            <div class="services-icon-box">
              <div class="default-icon">
                <img src="/assets/img/icon/services-icon-2.svg" alt="svg icon">
              </div>
              <div class="hover-icon">
                <img src="/assets/img/icon/services-icon-hover-2.svg" alt="svg icon">
              </div>
            </div>
            <div class="services-two-content">
              <h3>Хостинг и серверные решения</h3>
              <p>Надёжный хостинг и оптимизированные серверные решения для стабильной работы вашего проекта. Настроим, обезопасим и обеспечим бесперебойную поддержку</p>
              <div class="services-btn">
                <RouterLink to="/services" class="read-more"><i class="bi bi-arrow-right-short"></i> Подробно</RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-two-item">
            <div class="services-icon-box">
              <div class="default-icon">
                <img src="/assets/img/icon/services-icon-3.svg" alt="svg icon">
              </div>
              <div class="hover-icon">
                <img src="/assets/img/icon/services-icon-hover-3.svg" alt="svg icon">
              </div>
            </div>
            <div class="services-two-content">
              <h3>Поддержка и доработка</h3>
              <p>Обновляем, дорабатываем и оптимизируем сайты. Исправляем ошибки, ускоряем загрузку, улучшаем UX/UI и добавляем новые функции по запросу</p>
              <div class="services-btn">
                <RouterLink to="/services" class="read-more"><i class="bi bi-arrow-right-short"></i> Подробно</RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-two-item">
            <div class="services-icon-box">
              <div class="default-icon">
                <img src="/assets/img/icon/services-icon-4.svg" alt="svg icon">
              </div>
              <div class="hover-icon">
                <img src="/assets/img/icon/services-icon-hover-4.svg" alt="svg icon">
              </div>
            </div>
            <div class="services-two-content">
              <h3>Адаптация под устройства</h3>
              <p>Делаем сайты, которые работают на всех устройствах. Оптимизируем под мобильные, планшеты и десктопы, улучшая удобство и скорость работы</p>
              <div class="services-btn">
                <RouterLink to="/services" class="read-more"><i class="bi bi-arrow-right-short"></i> Подробно</RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-two-item">
            <div class="services-icon-box">
              <div class="default-icon">
                <img src="/assets/img/icon/services-icon-5.svg" alt="svg icon">
              </div>
              <div class="hover-icon">
                <img src="/assets/img/icon/services-icon-hover-5.svg" alt="svg icon">
              </div>
            </div>
            <div class="services-two-content">
              <h3>Безопасность и защита</h3>
              <p>Защищаем сайты от взломов, DDoS-атак и утечек данных. Настраиваем SSL, резервное копирование и средства мониторинга угроз.</p>
              <div class="services-btn">
                <RouterLink to="/services" class="read-more"><i class="bi bi-arrow-right-short"></i> Подробно</RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="single-services-two-item">
            <div class="services-icon-box">
              <div class="default-icon">
                <img src="/assets/img/icon/services-icon-6.svg" alt="svg icon">
              </div>
              <div class="hover-icon">
                <img src="/assets/img/icon/services-icon-hover-6.svg" alt="svg icon">
              </div>
            </div>
            <div class="services-two-content">
              <h3>Интеграции и API</h3>
              <p>Подключаем CRM, платёжные системы, маркетплейсы и сторонние сервисы. Делаем ваш сайт удобнее, автоматизируя ключевые процессы</p>
              <div class="services-btn">
                <RouterLink to="/services" class="read-more"><i class="bi bi-arrow-right-short"></i> Подробно</RouterLink>
              </div>
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
            <h6 class="sub-title">О студии</h6>
            <h2>Web-решения с фокусом на результат</h2>
            <p>Разрабатываем web-решения, которые двигают бизнес вперёд.</p>
            <p>Мы создаём продуманные сайты и цифровые продукты, ориентированные на рост и удобство пользователей.</p>
            <p>Внимание к деталям, технологиям и дизайну — в основе каждого нашего проекта.</p>
            <div class="about-btn-box">
              <RouterLink to="/pages/about" class="default-btn">
                Подробнее<span></span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="about-image">
            <img src="/assets/img/about-2.png" alt="About image">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End About Section -->

  <Portfolio />

  <!-- Start Works Process Section -->
  <section class="workprocess-section bg-grey section-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">4 шага к прогрессу</h6>
            <h2>Рабочий процесс</h2>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="workprocess-single-item">
            <div class="workprocess-icon-box">
              <img src="/assets/img/icon/workprocess-icon-1.svg" alt="icon">
            </div>
            <div class="workprocess-info">
              <h3>Изучаем и планируем</h3>
              <p>Анализируем цели проекта, аудиторию и конкурентов. Разрабатываем стратегию, чтобы web-решение соответствовало задачам бизнеса и давало результат</p>
            </div>
            <div class="workprocess-number-bg"><span>01</span></div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="workprocess-single-item">
            <div class="workprocess-icon-box">
              <img src="/assets/img/icon/workprocess-icon-2.svg" alt="icon">
            </div>
            <div class="workprocess-info">
              <h3>Дизайн и разработка</h3>
              <p>Создаём продуманный интерфейс и превращаем его в функциональный сайт. Уделяем внимание каждому элементу, обеспечивая удобство и стабильную работу</p>
            </div>
            <div class="workprocess-number-bg"><span>02</span></div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="workprocess-single-item">
            <div class="workprocess-icon-box">
              <img src="/assets/img/icon/workprocess-icon-3.svg" alt="icon">
            </div>
            <div class="workprocess-info">
              <h3>Публикация и тесты</h3>
              <p>Запускаем проект и проводим финальное тестирование. Проверяем скорость, адаптивность, безопасность и исправляем возможные недочёты перед выходом в сеть</p>
            </div>
            <div class="workprocess-number-bg"><span>03</span></div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="workprocess-single-item">
            <div class="workprocess-icon-box">
              <img src="/assets/img/icon/workprocess-icon-4.svg" alt="icon">
            </div>
            <div class="workprocess-info">
              <h3>Сопровождаем</h3>
              <p>Поддерживаем, обновляем и масштабируем сайт. Оптимизируем производительность, добавляем новые функции и помогаем адаптироваться к изменениям</p>
            </div>
            <div class="workprocess-number-bg"><span>04</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Works Process Section -->

  <Counter />


<!--  <Testimonial />-->

  <Faq />

  <!-- Start Hire Section -->
  <section class="hire-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2 col-md-12">
          <div class="hire-content">
            <h6 class="sub-title">Будем сотрудничать?</h6>
            <h2>Цифровая трансформация - путь к росту вашего бизнеса</h2>
            <p>Современный рынок требует скорости, удобства и технологичности. Мы создаём web-решения, которые упрощают процессы, привлекают клиентов и помогают вам масштабироваться. Готовы сделать следующий шаг?</p>
            <div class="hire-btn">
              <a class="default-btn" href="tel:+66637307104">Позвоните<span></span></a>
              <RouterLink to="/pages/contacts" class="default-btn-one">
                Свяжитесь<span></span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Hire Section -->
  <Footer />
</template>