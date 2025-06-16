<script setup>
import {onMounted} from "vue";
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
      <div v-if="calcStore.isHaveItems" class="row">
        <div v-for="item in calcStore.category.blocks[0].items" class="col-lg-4 col-md-6">
          <div class="single-services-item">
            <div class="services-icon">
              <i class="flaticon-development"></i>
            </div>
            <h3>{{item.name}}</h3>
            <p v-for="(value, key) in item.properties">{{key}} - {{value}}</p>
<!--            <p>{{item.price}}</p>-->
<!--            <p v-if="item.props.price">{{item.props.price.value}}</p>-->
<!--            <p v-if="item.props.url">{{item.props.url.value}}</p>-->
<!--            <p v-if="item.props.method">{{item.props.method.value}}</p>-->
<!--            <p v-if="item.props.workclass">{{item.props.workclass.value}}</p>-->
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
            <div class="services-btn">
              <RouterLink class="read-more" :to="{ path: '/blocks/item/' + item.key }"><i class="bi bi-arrow-right-short"></i> Подробнее</RouterLink>
<!--              <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Read More</a>-->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="name">{{calcStore.category.name}}</div>
        <div class="descr">{{calcStore.category.description}}</div>
      </div>
    </div>
    <div v-else class="container"><div class="row row_load">Loading Category</div></div>
  </section>
  <!-- End Services Section -->
</template>

<style scoped>


</style>