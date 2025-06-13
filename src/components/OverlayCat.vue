<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

// const profile = getUserProfile()

// emit `close` event to close Modal dialog
const close = () => emit('close', 'message out')
</script>

<template>
  <div class="overlay_page">
    <div class="tiny" v-html="props.data.description"></div>
<!--    <div class="check">{{props.data.blocks}}</div>-->
    <div class="blocks" v-for="block in props.data.blocks">
      <div class="row">
        <div class="head">{{block.name}}</div>
<!--        <div class="head">{{block.items}}</div>-->
        <ul class="sub">
          <li v-for="item in block.items">
            <span>{{item.name}}</span>
            <span>{{item.properties.title}}</span>
            <span>{{item.properties.url}}</span>
            <span>{{item.properties.price}}</span>
            <span>{{item.properties.descr}}</span>
            <span v-html="item.properties.content"></span>
          </li>
        </ul>
      </div>
    </div>
<!--    <div class="data">{{props.data}}</div>-->
<!--    <div class="more">-->
<!--      <RouterLink :to="{ path: '/direction/' + props.slug }" class="read-more">Страница</RouterLink>-->
<!--    </div>-->
  </div>
</template>

<style scoped>
.overlay_page { margin: 2em}
.overlay_page .body_title { font-size: 20px !important;}
  .check { color:#03b103}
  .blocks {}
    .row {}
    .row .head { font-size: 12px;}
    .row .sub { }

</style>