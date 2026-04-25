<script setup>
const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  properties: {
    type: Object,
    required: true
  },
})

import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="col-lg-4 col-md-6">
    <div class="single-services-item">
      <div class="services-icon">
        <i class="flaticon-development"></i>
      </div>
      <h3>{{props.name}}</h3>
      <p>{{props.properties.descr}}</p>
      <p>Цена от: {{props.properties.price}}</p>
<!--      <div>{{props.properties}}</div>-->
<!--      <p v-for="(value, key) in props.properties">{{key}} - {{value}}</p>-->
      <div class="services-btn">
        <AppLink class="read-more" :to="{ name: 'blocks_item', params: { slug: props.key } }"><i class="bi bi-arrow-right-short"></i> {{ t('ui.more')}}</AppLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>