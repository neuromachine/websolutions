<script setup>
import {computed} from "vue";

import { DialogModal} from 'v-dialogs'

import OverlayPage from "@/components/OverlayPage.vue"; //Legacy

import Icon from "@/components/blocks/services/icon.vue"

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

function handleChild(slug) {
  const item = mainStore.getPageBySlug(slug);
  DialogModal(OverlayPage, {
    maxButton: false,
    //fullscreen: true,
    //header: false,
    title: item.title,
    params: {
      data: {
        slug: item.slug
      }
    },
  });
  return false
}

const jsonData = computed(() => {
  //console.log(props)
  return mainStore.getPageBySlug(props.slug)
});

</script>

<template>
  <div class="col-lg-4 col-md-6">
    <div class="single-services-three-item">
      <Icon
          :id="jsonData.id"
      />
      <div class="services-three-content">
        <h3 @click="handleChild(props.slug)">{{props.title}}</h3>
<!--        <h3 @click="handleChild(props.slug)">{{props.title}}</h3>-->
        <p>{{jsonData.announce}}</p>
        <ul class="features-list">
          <li v-for="(schild, indexS) in props.childs" :key="indexS">
<!--            <span @click="handleChild(schild.slug)">{{schild.title}}</span>-->

            <RouterLink :to="{ path: '/page/' + schild.slug }">{{schild.title}}</RouterLink>
          </li>
        </ul>
        <div class="services-btn">
<!--          <RouterLink :to="{ path: '/page/' + props.slug }" class="read-more">-->
          <RouterLink :to="{ path: '/direction/' + props.slug }" class="read-more">
            <i class="bi bi-arrow-right-short"></i> Подробнее
          </RouterLink>
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