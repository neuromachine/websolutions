<script setup>
import { DialogModal} from 'v-dialogs'
import Overlay from "@/components/OverlayCat.vue"; //Legacy
import Icon from "@/components/blocks/services/micro/icon.vue"
import { useUiStore } from '@/stores/uiStore.js';
import {computed} from "vue";
const uiStore = useUiStore();
const isVersionFull = computed({
  get() {
    const value = uiStore.uiMainVars.page.version;
    return value === 'full';
  },
  set(value) {
    uiStore.setVersionFull(value);
  },
});
const props = defineProps({
  id: {
    type: Number,
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
  // TODO: dataStore.isCatReady
  // TODO: переход на compositon overlay
  //if (!result) return false; // TODO: Проверить что данные не пришли - дял overlay
  DialogModal(Overlay, {
    maxButton: false,
    // title: dataStore.category.name,
    title: 'Инфо',
    params: {
      //data: dataStore.category
      data: {
        'slug': slug
      },
    },
  });
  return false
}
</script>
<template>
  <div class="col-lg-4 col-md-6">
    <div class="single-services-three-item dir">
      <Icon
          :slug="props.slug"
      />
      <div class="services-three-content">
<!--        <h3 @click="handleChild(props.slug)" class="head_action">{{props.title}}</h3>-->
        <h3 class="head_action">{{props.title}}</h3>
        <p v-show="isVersionFull">{{props.description}}</p>
        <ul class="features-list clases">
          <li v-for="schild in props.childs">
            <h4><RouterLink class="head_action" :to="{ path: '/group/' + schild.key }">{{schild.name}}</RouterLink></h4>
            <span v-show="isVersionFull" class="block text-3xl" v-html="schild.description"></span>
            <ul class="groups">
              <li v-for="offer in schild.child">
<!--                <span class="block head_action" @click="handleChild(offer.key)">{{offer.name}}</span>-->
                <span class="block head_action">
                  <RouterLink class="float_link" :to="{ path: '/group/' + offer.key }">
                  {{offer.name}}
                    </RouterLink>
                </span>
                <span v-show="isVersionFull" class="block" v-html="offer.description"></span>
                <span v-show="isVersionFull" class="block">
                  <RouterLink class="float_link" :to="{ path: '/group/' + offer.key }">
                    <i class="bi bi-arrow-right text-brand-deep"></i> Подробно
                  </RouterLink>
                </span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="services-btn">
          <RouterLink :to="{ path: '/direction/' + props.slug }" class="float_link">
            <i class="bi bi-arrow-right-short"></i> Подробнее о направлении : {{props.title}}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .dir {}
    .dir .float_link { color:#0C90C7; text-decoration: none; cursor: pointer; font-size: 18px;}
    .dir .float_link:hover {color: #223A76; text-decoration: underline; cursor: pointer;}
      .dir .float_link i {color:#0C90C7; font-size: 22px; font-weight: normal}
      .dir .float_link:hover i {color: #223A76; margin-left: 5px; transition: all 0.2s;}
    .dir .head_action { font-size: 24px; color:#223A76;}
    .dir h4 { margin: 0; padding: 0; line-height: normal; font-size: 18px; line-height: 22px;}
    .dir .clases .head_action {font-size: 20px; color:#223A76;}
    .dir .clases .head_action:hover { text-decoration: underline; cursor: pointer;}
    .dir ul {}
    .services-three-content .features-list li::before { background-color: #223A76;}
    .dir .groups {}
      .dir .groups .head_action {font-size: 18px; color:#223A76;}
      .dir .groups .head_action:hover { text-decoration: underline; cursor: pointer; }
      .services-three-content .features-list .groups li::before { background-color: #223A76; top: 10px; left: 5px; width: 6px; height: 6px;}
      .dir .groups .float_link { font-size: 16px;}
        .dir .groups .float_link i {font-size: 14px;}
</style>