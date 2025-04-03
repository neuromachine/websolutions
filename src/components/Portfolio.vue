<script setup>
import {onMounted, onUnmounted, ref} from "vue";
import $ from 'jquery'
import Isotope from 'isotope-layout';

const isotopeInstance = ref(null);

onUnmounted(() => {
  if (isotopeInstance.value) {
    isotopeInstance.value.destroy();
  }
});

import imagesLoaded from 'imagesloaded'; // Установи npm install imagesloaded

onMounted(() => {
  const container = document.querySelector('.portfolio-container');
  if (container) {
    isotopeInstance.value = new Isotope(container, {
      itemSelector: '.portfolio-grid-item',
    });

    imagesLoaded(container, () => {
      isotopeInstance.value.layout(); // Когда все изображения загружены — пересчёт
    });

    document.querySelectorAll('#portfolio-flters li').forEach((item) => {
      item.addEventListener('click', function () {
        document.querySelectorAll('#portfolio-flters li').forEach((el) => el.classList.remove('filter-active'));
        this.classList.add('filter-active');

        isotopeInstance.value.arrange({
          filter: this.getAttribute('data-filter'),
        });
      });
    });

  }
});

const data = [
  {
    id: 1,
    title: 'Магазин мебели "Авто-кроватка"',
    thumb: 'thumb_1.jpg',
    class: ['Разработка','Сопровождение'],
    groups: ['dev'],
    slug: 'car',
  },
  {
    id: 2,
    title: 'TFF Портал - рыбная ловля нахлыстом"',
    thumb: 'thumb_2.jpg',
    class: ['Разработка','Сопровождение'],
    groups: ['dev','support'],
    slug: 'tff',
  },
]

</script>

<template>
  <!-- Start Portfolio Section -->
  <section class="portfolio-area section-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-title">
            <h6 class="sub-title">Последние работы</h6>
            <h2>Наше портфолио</h2>
          </div>
        </div>
        <div class="col-md-12">
          <div class="portfolio-list">
            <ul class="nav" id="portfolio-flters">
              <li class="filter filter-active" data-filter=".all">Все</li>
              <li class="filter" data-filter=".dev">Разработка</li>
              <li class="filter" data-filter=".support">Сопровождение</li>
              <li class="filter" data-filter=".application">SMM</li>
              <li class="filter" data-filter=".photography">Продвижение</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="portfolio-container">
        <div class="row">

          <!-- portfolio-item -->
          <div v-for="(item, index) in data" :key="index" :class="item.groups.join(' ')" class="col-lg-4 col-md-6 portfolio-grid-item all">
            <div class="portfolio-item">
              <img v-bind="{src: '/assets/img/portfolio/'+item.thumb}" alt="image">
              <div class="portfolio-content-overlay">
                <p>{{item.class.join(' | ')}}</p>
                <h3><RouterLink :to="{ path: '/portfolio/' + item.slug }">{{item.title}}</RouterLink></h3>
                <RouterLink :to="{ path: '/portfolio/' + item.slug }" class="portfolio-link-icon"><i class="bi bi-arrow-right"></i></RouterLink>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
  <!-- End Portfolio Section -->
</template>

<style scoped>

</style>