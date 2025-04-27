<script setup>
import {computed} from "vue";

import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();

const props = defineProps({
  id: {
    type: String,
    // type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  childs: {
    type: Array,
    required: true
  },
})

const jsonData = computed(() => {
  console.log(props)
  return mainStore.getPageBySlug(props.slug)
});

</script>

<template>
  <div :class="item" class="col-lg-4 col-md-6">
    <div class="single-services-three-item">
      <div class="services-icon">
        <img :src="'/assets/img/icon/services_'+props.id+'.svg'" alt="svg icon">
      </div>
      <div class="services-three-content">
        <h3><router-link to="/">{{props.title}}</router-link></h3>
        <p>{{jsonData.announce}}</p>
        <ul class="features-list">
          <li v-for="(schild, indexS) in props.childs" :key="indexS"><span>{{schild.title}}</span></li>
          <li><span>Managed IT Service</span></li>
          <li><span>IT Security Services</span></li>
          <li><span>Practice IT Management</span></li>
          <li><span>Solving IT Problems</span></li>
        </ul>
        <div class="services-btn">
          <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Подробнее</a>
        </div>
        <div class="usit">{{props}}</div>
        <div class="usit2">{{jsonData}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item h3 a {}

.usit2 { display: none}
.usit { display: none}
/*

*/
</style>