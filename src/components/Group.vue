<script setup>
import {onMounted} from "vue";
import catClass from "@/components/blocks/services/catClass.vue";
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();
import {useRoute} from "vue-router";
const route = useRoute();
onMounted(() => {calcStore.fetchBlockCategory(route.params.slug);});
</script>

<template>
  <!-- Start Services Section -->
  <section class="services-section section-padding">

    <div v-if="calcStore.isCatReady" class="container">

      <div class="row">
        <div class="name">{{calcStore.category.name}}</div>
        <div class="descr">{{calcStore.category.description}}</div>
      </div>

      <div v-if="calcStore.isHaveSubCat" class="row">
        <div v-for="(item, index) in calcStore.category.children" :key="index" class="col-lg-4 col-md-6">
          <catClass
              :slug=item.key
              :name=item.name
              :descr=item.description
              :childs=item.child
          />
        </div>
      </div>

      <div v-if="calcStore.isHaveItems" class="row">
        <div v-for="item in calcStore.category.blocks[0].items" class="col-lg-4 col-md-6">
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