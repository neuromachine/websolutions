<script setup>
import {ref, onMounted, onUnmounted, computed} from 'vue'
import { DialogModal, DialogAlert } from 'v-dialogs'

import { useMainStore } from '@/stores/mainStore';
const mainStore = useMainStore();

import OverlayItem from '@/components/OverlayItem.vue'

import OverlayPage from "@/components/OverlayPage.vue";

const data = defineProps({
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



function handleClick() {
  //console.log(data.title);
  DialogModal(OverlayItem, {
    title: 'INFO',
    params: {
      data
    },
  });
}

function handleChild(slug) {

  // let item = {};
  const item = mainStore.getPageBySlug(slug);
  // if(typeof item === 'undefined') {
  //   item = mainStore.getServiceData(404)
  // }
  console.log(item);
  // console.log(item.slug);


  DialogModal(OverlayPage, {
    title: item.title,
    params: {
      data:{
        slug: item.slug
      }
    },
  });

}

onMounted(() => {

  // console.log(
  //     data
  // );

});



</script>

<template>
  <div :id="'serviceitem_' + data.id" class="col-lg-4 col-md-6">
    <div class="single-services-item">
      <div class="services-icon">
        <i class="flaticon-development"></i>
      </div>
      <h3 class="owner" @click="handleClick">{{data.title}}</h3>
      <div v-for="(child, indexC) in data.childs" :key="indexC">
        <div class="module"><a class="module" :href="'/page/'+child.slug" @click="handleChild(child.slug)">{{child.title}}</a></div>
        <ul class="subitems">
          <li v-for="(schild, indexS) in child.childs" :key="indexS">
            <div class="schild"><a class="title" :href="'/page/'+schild.slug" @click="handleChild(schild.slug)">{{schild.title}}</a>

            <span  class="lv3">{{schild.thumb}}</span>
            <span  class="lv3">{{schild.id}}</span>
            <span  class="lv3">{{schild.slug}}</span>
            </div>
            <span  v-for="(tchild, index3) in schild.childs" :key="index3" class="lv3">{{tchild.title}}</span>
          </li>
        </ul>
      </div>
<!--      <div class="services-btn">
        <RouterLink :to="{ path: '/service/' + data.slug }" class="read-more">
          <i class="bi bi-arrow-right-short"></i> Подробнее
        </RouterLink>
      </div>-->
      <div class="services-btn">
        <span class="read-more" @click="handleClick">
          <i class="bi bi-arrow-right-short"></i> Подробнее
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lv3 {

  display: none;
  /*

  color: #c31010;

   */
  }
.owner { color: #c31010; font-size: 1.5em;}
.module {color: #123d45; font-size: 1.3em; margin-left: 1em;}
.subitems { display: flex; flex-direction: column;  margin-left: 2em; margin-right: 1em; }
.schild { display: flex; flex-direction: column;}
  .schild .title { font-size: 20px; margin-left: 1em; cursor: pointer; color: #}
</style>