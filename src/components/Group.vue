<script setup>
import { onMounted, watch } from "vue";
import catClass from "@/components/blocks/services/catClass.vue";
import { useDataStore } from '@/stores/dataStore';
const calcStore = useDataStore();
import {useRoute} from "vue-router";
const route = useRoute();
function load() {
  dataStore.fetchBlockCategory(route.params.slug);
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
  <!-- Start Services Section -->
  <section class="services-section section-padding">

    <div v-if="dataStore.isCatReady" class="container">

      <div class="row">
        <div class="name">{{dataStore.category.name}}</div>
        <div class="descr">{{dataStore.category.description}}</div>
        <div class="content" v-html="dataStore.category.content"></div>
      </div>

      <div v-if="dataStore.isHaveSubCat" class="row">
        <div v-for="(item, index) in dataStore.category.children" :key="index" class="col-lg-4 col-md-6">
          <catClass
              :slug=item.key
              :name=item.name
              :descr=item.description
              :childs=item.child
          />
        </div>
      </div>

      <div v-if="dataStore.isHaveItems" class="row">
        <div v-for="item in dataStore.category.blocks[0].items" class="col-lg-4 col-md-6">
          <div class="single-services-item">
            <div class="services-icon">
              <i class="flaticon-development"></i>
            </div>
            <h3>{{item.name}}</h3>
            <p v-for="(value, key) in item.properties">{{key}} - {{value}}</p>
            <div class="services-btn">
              <RouterLink class="read-more" :to="{ path: '/blocks/item/' + item.key }"><i class="bi bi-arrow-right-short"></i> Подробнее</RouterLink>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div v-else class="container"><div class="row row_load">Loading Category</div></div>
  </section>
  <!-- End Services Section -->
</template>

<style scoped>


</style>