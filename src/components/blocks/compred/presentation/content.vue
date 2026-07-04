<script setup>
import ServicesContent from "@/components/blocks/services/presentation/content.vue";

const props = defineProps({
  data: {
    type: String,
    required: true
  }
})
</script>

<template>
  <section class="acticle services-section-two section-padding">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <ServicesContent :content="props.data" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
