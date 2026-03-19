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
  <div v-if="props.properties?.workclass?.length"
       :class="props.properties.workclass.map(c => c.key)" class="col-lg-4 col-md-6 portfolio-grid-item all">
    <div class="portfolio-item">
      <AppLink :to="{ name: 'portfolio_item', params: { slug: props.slug } }">
        <img v-if="props.properties.thumb" v-bind="{src: '/assets/img/portfolio/'+props.properties.thumb}" alt="image">
        <img v-else src="@/assets/img/portfolio/replacement_thumb.jpg" alt="image">
      </AppLink>
      <div class="portfolio-content-overlay">
        <p>{{ props.properties.workclass[0]?.label }}</p>
        <h3><AppLink :to="{ name: 'portfolio_item', params: { slug: props.slug } }">{{props.properties.title}}</AppLink></h3>
        <AppLink :to="{ name: 'portfolio_item', params: { slug: props.slug } }" class="portfolio-link-icon"><i class="bi bi-arrow-right"></i></AppLink>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>