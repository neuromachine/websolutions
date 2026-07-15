<script setup>
import RichText from "@/components/blocks/general/ui/RichText.vue";

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
      <div class="acticle__content text-center">
        <i class="bi bi-quote acticle__icon"></i>
        <RichText :html="props.data" class="acticle__text" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.acticle__content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
}
.acticle__icon {
  font-size: 3rem;
  color: #00D9EA;
  opacity: 0.3;
  margin-bottom: 1rem;
  display: inline-block;
}
.acticle__text {
  font-size: 1.25rem;
  font-style: italic;
  font-weight: 500;
  line-height: 1.6;
  color: #404040;
}
@media (max-width: 767px) {
  .acticle__text {
    font-size: 1.1rem;
  }
}
</style>
