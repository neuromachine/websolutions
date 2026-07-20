<script setup>
import { computed } from 'vue'
import RichText from "@/components/blocks/general/ui/RichText.vue";

const props = defineProps({
  data: {
    type: String,
    required: true
  }
})

const isStructuredLetter = computed(() => {
  return /class=["'][^"']*cp-personal-letter(?:\s|["'])/.test(props.data)
})
</script>

<template>
  <section class="acticle services-section-two section-padding">
    <div class="container">
      <div class="acticle__content" :class="[
        isStructuredLetter ? 'acticle--letter' : 'text-center'
      ]">
        <i v-if="!isStructuredLetter" class="bi bi-quote acticle__icon"></i>
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

/* Structured Letter Mode Override */
.acticle--letter {
  max-width: 1000px;
}
.acticle--letter .acticle__text {
  font-size: 1.1rem;
  font-style: normal;
  text-align: left;
}

/* Deep Styles for Structured Letter HTML */
.acticle--letter :deep(.cp-personal-letter) {
  background-color: #f9f9f9;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.05);
}
.acticle--letter :deep(.cp-personal-letter__eyebrow) {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #00D9EA;
  font-weight: bold;
  margin-bottom: 1rem;
}
.acticle--letter :deep(.cp-personal-letter h3) {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}
.acticle--letter :deep(.cp-personal-letter p) {
  margin-bottom: 1.2rem;
  color: #555;
  line-height: 1.7;
}
.acticle--letter :deep(.cp-personal-letter__offer) {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fff;
  border-left: 4px solid #00D9EA;
  border-radius: 4px;
}
.acticle--letter :deep(.cp-personal-letter__offer p) {
  margin-bottom: 0;
  font-weight: bold;
  color: #2c3e50;
}

@media (max-width: 767px) {
  .acticle--letter :deep(.cp-personal-letter) {
    padding: 1.5rem;
  }
  .acticle--letter :deep(.cp-personal-letter h3) {
    font-size: 1.4rem;
  }
  .acticle--letter .acticle__text {
    font-size: 1rem;
  }
}
</style>
