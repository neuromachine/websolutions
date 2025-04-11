<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { DialogModal, DialogAlert } from 'v-dialogs'


import OverlayItem from '@/components/OverlayItem.vue'

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
      <h3 @click="handleClick">{{data.title}}</h3>
      <p v-for="(child, indexC) in data.childs" :key="indexC">
        <span><h3>{{child.title}}</h3></span>
        <ul class="subitems">
          <li v-for="(schild, indexS) in child.childs" :key="indexS">
            <span>{{schild.title}}</span>

            <span  class="lv3">{{schild.thumb}}</span>
            <span  class="lv3">{{schild.id}}</span>
            <span  class="lv3">{{schild.slug}}</span>

            <span  v-for="(tchild, index3) in schild.childs" :key="index3" class="lv3">{{tchild.title}}</span>
          </li>
        </ul>
      </p>
      <div class="services-btn">
        <RouterLink :to="{ path: '/service/' + data.slug }" class="read-more">
          <i class="bi bi-arrow-right-short"></i> Подробнее
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lv3 { display: none;
  }

.subitems { display: flex; flex-direction: column; color: #c31010; margin-left: 1em; margin-right: 1em; }
</style>