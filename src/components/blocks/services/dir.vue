<script setup>
import {computed} from "vue";

import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();

const props = defineProps({
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
  return mainStore.getPageBySlug(props.slug)
});

</script>

<template>
  <div class="single-services-two-item">
    <div class="services-icon-box">
      <div class="default-icon">
        <img src="/assets/img/icon/services-icon-1.svg" alt="svg icon">
      </div>
      <div class="hover-icon">
        <img src="/assets/img/icon/services-icon-hover-1.svg" alt="svg icon">
      </div>
    </div>
    <div class="services-two-content">
      <h3>{{jsonData.title}}</h3>
      <p>{{jsonData.announce}}</p>
      <ul class="features-list">
        <li v-for="(schild, indexS) in props.childs" :key="indexS">
          <RouterLink :to="{ path: '/page/' + schild.slug }">{{schild.title}}</RouterLink>
        </li>
      </ul>
      <div class="services-btn">
        <a href="#" class="read-more"><i class="bi bi-arrow-right-short"></i> Подробнее</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.features-list { display: none}
</style>