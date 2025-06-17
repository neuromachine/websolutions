<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['close'])
// emit `close` event to close Modal dialog
const close = () => emit('close', 'message out')
import {onMounted} from "vue";
import { useCalcStore } from '@/stores/calcStore';
const calcStore = useCalcStore();
onMounted(() => {
  calcStore.fetchOverlayCategory(props.data.slug);
});
</script>

<template>
  <div v-if="calcStore.isOverlayReady" class="overlay_page">
    <div class="category">
      <div class="descr tiny" v-html="calcStore.overlay.description"></div>
  <!--    <div class="check">{{props.data.blocks}}</div>-->
      <div class="blocks">
        <div class="block" v-for="block in calcStore.overlay.blocks">
          <div class="head">{{block.name}}</div>
  <!--        <div class="head">{{block.items}}</div>-->
          <div class="items_list">
            <div class="item" v-for="item in block.items">
              <span class="name">{{item.name}}</span>
              <span>{{item.properties.title}}</span>
              <span>{{item.properties.url}}</span>
              <span>{{item.properties.price}}</span>
              <span>{{item.properties.descr}}</span>
              <span v-html="item.properties.content"></span>
              <a class="read-more" :href="'/blocks/item/' + item.key"><i class="bi bi-arrow-right-short"></i> Подробнее</a>
            </div>
          </div>
        </div>
      </div>
    </div>
<!--    <div class="data">{{props.data}}</div>-->
<!--    <div class="more">-->
<!--      <RouterLink :to="{ path: '/direction/' + props.slug }" class="read-more">Страница</RouterLink>-->
<!--    </div>-->
  </div>
  <div v-else class="container"><div class="row row_load">Loading Overlay</div></div>
</template>

<style scoped>
.check { color:#03b103}
.overlay_page { margin: 2em}
.overlay_page .body_title { font-size: 20px !important;}
  .category { display: flex; flex-direction: column;}
  .category .descr { font-size: 1.5em;}
  .blocks {display: flex; flex-direction: row;}
    .block { display: flex; flex-direction: column;}
    .block .head {  font-size: 1.2em;}
    .block .items_list { display: flex; flex-direction: column; }
      .block .items_list .item { display: flex;  flex-direction: column; margin: 10px 0 10px;}
      .block .items_list .item span { display: inline-block; }
        .item .name { font-weight: bold;}
</style>