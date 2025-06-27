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
</script>

<template>
  <div class="col-lg-4 col-md-6">
    <div class="single-services-item">
      <div class="services-icon">
        <i class="flaticon-development"></i>
      </div>
      <h3>{{props.name}}</h3>
<!--      <div>{{props.properties}}</div>-->
      <p v-for="(value, key) in props.properties">{{key}} - {{value}}</p>
      <div class="services-btn">
        <RouterLink class="read-more" :to="{ path: '/blocks/item/' + props.key }"><i class="bi bi-arrow-right-short"></i> Подробнее</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>