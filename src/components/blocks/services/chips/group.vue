<script setup>
import {computed, onMounted} from "vue";

import { DialogModal} from 'v-dialogs'

import Overlay from "@/components/OverlayCat.vue"; //Legacy

import Icon from "@/components/blocks/services/chips/icon.vue"

import { useCalcStore } from '@/stores/calcStore.js';
const calcStore = useCalcStore();

onMounted(() => {
  // calcStore.fetchItem(props.slug)
  // calcStore.fetchItem(props.slug)
});

const props = defineProps({
  id: {
    type: Number,
    // type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description	: {
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

async function handleChild(slug) {
  const result = await calcStore.fetchCategoryFromApi(slug);
  console.log(result)

  if (!result) return false; // TODO: Проверить что данные не пришли - дял overlay

  DialogModal(Overlay, {
    maxButton: false,
    title: result.name,
    params: {
      data: result
    },
  });
  return false
}



</script>

<template>
  <div class="col-lg-4 col-md-6">
    <div class="single-services-three-item">
      <Icon
          :id="id"
      />
      <div class="services-three-content">
        <h3 @click="handleChild(props.slug)" class="overlay_action_dir">{{props.title}}</h3>
        <p>{{props.description}} </p>
        <ul class="features-list">
          <li v-for="(schild, indexS) in props.childs" :key="indexS">
            <span>{{schild.name}}</span>
            <ul>
              <li v-for="offer in schild.children" @click="handleChild(offer.key)" class="overlay_action_offer">
                <span class="title">{{offer.name}}</span>
                <span class="descr" v-html="offer.description"></span>
              </li>
            </ul>
            <RouterLink :to="{ path: '/page/' + schild.slug }">{{schild.title}}</RouterLink>
          </li>
        </ul>
        <div class="services-btn">
          <RouterLink :to="{ path: '/direction/' + props.slug }" class="read-more">
            <i class="bi bi-arrow-right-short"></i> Подробнее
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .overlay_action_dir { }
  .overlay_action_dir:hover { text-decoration: underline; cursor: pointer;}
  .overlay_action_offer {}
  .overlay_action_offer .title:hover {text-decoration: underline; cursor: pointer;}
</style>