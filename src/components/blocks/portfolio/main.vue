<script setup>
import {onMounted} from "vue";
import { useRoute } from 'vue-router'
import { useCalcStore } from '@/stores/calcStore';

const calcStore = useCalcStore();
const route = useRoute()

function load() {
  calcStore.fetchBlockCategory(route.name);
}

onMounted(() => {load()});

function setFilter(filterKey) {
  calcStore.filter = filterKey
}
</script>

<template>
<!--  <div v-if="calcStore.isCatReady" class="row">
    {{calcStore.category}}
  </div>-->
  <!-- Start Portfolio Section-->
  <section v-if="calcStore.isCatReady" class="portfolio-area section-padding">
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
<!--              <li v-for="item in calcStore.category.blocks[0].items" @click="setFilter(item.properties.workclass[0].key)">{{item.properties.workclass[0].label}}</li>-->
              <li @click="setFilter('develop')">Разработка</li>
              <li @click="setFilter('html')">Верстка</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="portfolio-container">
        <TransitionGroup name="fade" tag="div" class="grid row">
          <div v-for="item in calcStore.filteredItems" :key="item.id" :class="item.properties.workclass.key" class="col-lg-4 col-md-6 portfolio-grid-item all">
            <div class="portfolio-item">
              <RouterLink :to="{ path: '/portfolio/item/' + item.key }">
                <img v-if="item.properties.thumb" v-bind="{src: '/assets/img/portfolio/'+item.properties.thumb}" alt="image">
                <img v-else src="/assets/img/portfolio/replacement_thumb.jpg" alt="image">
              </RouterLink>
              <div class="portfolio-content-overlay">
                <p>{{item.properties.workclass.label}}</p>
                <h3><RouterLink :to="{ path: '/portfolio/item/' + item.key }">{{item.properties.title}}</RouterLink></h3>
                <RouterLink :to="{ path: '/portfolio/item/' + item.key }" class="portfolio-link-icon"><i class="bi bi-arrow-right"></i></RouterLink>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </section>

  <!-- End Portfolio Section -->
</template>

<style scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0px;
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