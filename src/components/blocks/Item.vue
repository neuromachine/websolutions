<script setup>
import {onMounted} from "vue";
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();
import {useRoute} from "vue-router";
const route = useRoute();
onMounted(() => {
      calcStore.fetchBlockItem(route.params.slug);
      calcStore.fetchStructure('services');
    }
);
</script>

<template>
  <!-- Start Services Details Section -->
  <section class="services-details-area section-padding">
    <div v-if="calcStore.isItemReady" class="container">
      <div class="row">
        <div class="col-lg-8 col-md-12">
          <div class="services-details-content">
            <div v-for="img in calcStore.item.properties.image" class="services-details-image">
              <img v-bind="{src:'/assets/img/services/'+img}" alt="">
            </div>
            <h3>{{calcStore.item.properties.title}}</h3>
            <p>{{calcStore.item.properties.descr}}</p>
            <div class="features-text" v-html="calcStore.item.properties.content"></div>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <aside class="services-widget">
            <section v-if="calcStore.isStrReady" class="widget widget_categories">
              <h3 class="widget-title">Наши услуги</h3>
              <ul>
                <li v-for="item in calcStore.structure.child">
                  <RouterLink :to="{ path: '/direction/' + item.key }">{{item.name}}</RouterLink>
                </li>
              </ul>
            </section>
            <section v-else class="row row_load"></section>
            <section class="widget widget_download_btn">
              <h3 class="widget-title">Company Profile</h3>
              <div class="download-btn-box">
                <a href="#" class="default-btn">Download PDF <span></span></a>
                <a href="#" class="default-btn" >Download Word File <span></span></a>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
    <div v-else class="container"><div class="row row_load">Loading Item</div></div>
  </section>
  <!-- End Services Details Section -->
</template>

<style scoped>


</style>