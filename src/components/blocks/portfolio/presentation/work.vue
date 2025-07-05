<script setup>
const props = defineProps({
  slug: {
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
  <div v-if="props.properties?.workclass" :key="props.id" :class="props.properties.workclass.key" class="col-lg-4 col-md-6 portfolio-grid-item all">
    <div class="portfolio-item">
      <RouterLink :to="{ path: '/portfolio/item/' + props.slug }">
        <img v-if="props.properties.thumb" v-bind="{src: '/assets/img/portfolio/'+props.properties.thumb}" alt="image">
        <img v-else src="/assets/img/portfolio/replacement_thumb.jpg" alt="image">
      </RouterLink>
      <div class="portfolio-content-overlay">
        <p>{{props.properties.workclass.label}}</p>
        <h3><RouterLink :to="{ path: '/portfolio/item/' + props.slug }">{{props.properties.title}}</RouterLink></h3>
        <RouterLink :to="{ path: '/portfolio/item/' + props.slug }" class="portfolio-link-icon"><i class="bi bi-arrow-right"></i></RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>