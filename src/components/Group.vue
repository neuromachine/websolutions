<script setup>
import {onMounted} from "vue";
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();
import {useRoute} from "vue-router";
const route = useRoute();
onMounted(() => {calcStore.fetchGroup(route.params.slug)});
</script>

<template>


<div v-if="calcStore.isDataReady">
  <!-- Start Services Section -->
  <section class="services-section section-padding">
    <div class="container">
      <div class="row">{{calcStore.data.name}}</div>
<!--      <div class="row">{{calcStore.data}}</div>-->
    </div>
    <div class="container">
      <div class="row">
        <div v-for="item in calcStore.data.items" class="col-lg-4 col-md-6">
          <div class="single-services-item">
            <div class="services-icon">
              <i class="flaticon-development"></i>
            </div>
            <h3>{{item.name}}</h3>
            <p>{{item.price}}</p>
            <p v-if="item.props.price">{{item.props.price.value}}</p>
            <p v-if="item.props.url">{{item.props.url.value}}</p>
            <p v-if="item.props.method">{{item.props.method.value}}</p>
            <p v-if="item.props.workclass">{{item.props.workclass.value}}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
            <div class="services-btn">
              <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Services Section -->
</div>

</template>

<style scoped>


</style>