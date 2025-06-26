<script setup>
import {onMounted} from "vue";
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores/dataStore';

import List from "@/components/blocks/portfolio/presentation/list.vue";

const dataStore = useDataStore();
const route = useRoute()

function load() {
  dataStore.fetchBlockCategory(route.name);
}

onMounted(() => {load()});

function setFilter(filterKey) {
  dataStore.filter = filterKey
}
</script>

<template>
<!--  <div v-if="dataStore.isCatReady" class="row">
    {{dataStore.category}}
  </div>-->
  <!-- Start Portfolio Section-->
  <section v-if="dataStore.isCatReady" class="portfolio-area section-padding">
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
<!--              <li v-for="item in dataStore.category.blocks[0].items" @click="setFilter(item.properties.workclass[0].key)">{{item.properties.workclass[0].label}}</li>-->
              <li @click="setFilter('develop')">Разработка</li>
              <li @click="setFilter('html')">Верстка</li>
            </ul>
          </div>
        </div>
      </div>
      <List />
    </div>
  </section>

  <!-- End Portfolio Section -->
</template>
