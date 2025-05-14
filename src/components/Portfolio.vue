<script setup>
import {onMounted, onUnmounted, ref, computed} from "vue";
import $ from 'jquery'
import Isotope from 'isotope-layout';

import { useUiStore } from '@/stores/uiStore';
const uiStore = useUiStore();
const tree = computed(() => {
  console.log(document.querySelector('.portfolio-container'));
  // uiStore.fetchCategory(null);
  // uiStore.fetchAllPortfolio();
  return true
});

import data_json from "@/portfolio.json";

const isotopeInstance = ref(null);

onUnmounted(() => {

  if (isotopeInstance.value) {
    isotopeInstance.value.destroy();
  }
});

import imagesLoaded from 'imagesloaded'; // Установи npm install imagesloaded

onMounted(() => {

  uiStore.fetchCategory(null);
  uiStore.fetchAllPortfolio();

  const container = document.querySelector('.portfolio-container');
  console.log(container);
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

const data = data_json


function setFilter(filterKey) {
  console.log('Set filter:', filterKey)
  uiStore.filter = filterKey
}


</script>

<template>
  {{tree}}
  <!-- Start Portfolio Section -->
  <section v-if=
               "
  !uiStore.isLoading
  && uiStore.data !== null
  && Object.keys(uiStore.data.children).length
  && uiStore.list !== null
  && Object.keys(uiStore.list.items).length
"
           class="portfolio-area section-padding">
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
              <li class="filter filter-active" @click="setFilter('*')">Все</li>
              <li v-for="cat in uiStore.data.children" @click="setFilter(cat.key)">{{cat.name}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="portfolio-container">
        <div class="row">{{uiStore.isLoading}} / {{tree}} / {{uiStore.activeFilter}}</div>
        <div class="row">
          <!--cell-->
          <TransitionGroup name="fade" tag="div" class="grid">
          <div v-for="(item, index) in uiStore.filteredItems" :key="item.id" :class="item.properties.workclass.key" class="col-lg-4 col-md-6 portfolio-grid-item all">
            <div class="portfolio-item">
              <RouterLink :to="{ path: '/portfolio/' + item.key }">
                <img v-if="!item.properties.thumb" v-bind="{src: '/assets/img/portfolio/'+item.properties.thumb}" alt="image">
                <img v-else src="/assets/img/portfolio/replacement_thumb.jpg" alt="image">
              </RouterLink>
              <div class="portfolio-content-overlay">
                <p>{{item.properties.workclass.label}}</p>
                <h3><RouterLink :to="{ path: '/portfolio/' + item.key }">{{item.properties.title}}</RouterLink></h3>
                <RouterLink :to="{ path: '/portfolio/' + item.key }" class="portfolio-link-icon"><i class="bi bi-arrow-right"></i></RouterLink>
              </div>
            </div>
          </div>
          </TransitionGroup>
          <!--/cell-->
        </div>
        <div class="row">
          <!-- portfolio-item -->
          <div v-for="(item, index) in data" :key="index" :class="item.groups.join(' ')" class="col-lg-4 col-md-6 portfolio-grid-item all">
            <div class="portfolio-item">
              <RouterLink :to="{ path: '/portfolio/' + item.slug }">
                <img v-if="item.thumb" v-bind="{src: '/assets/img/portfolio/'+item.thumb}" alt="image">
                <img v-else src="/assets/img/portfolio/replacement_thumb.jpg" alt="image">
              </RouterLink>
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
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.item {
  padding: 10px;
  background: #ddd;
  width: 100px;
  text-align: center;
  transition: all 0.3s ease;
}

/* Transition classes */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s, transform 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>