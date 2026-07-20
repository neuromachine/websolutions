<script setup>
import work from "@/components/blocks/portfolio/presentation/work.vue";
import { ref } from "vue";
import gsap from "gsap";
import { useGsapOrchestrator } from "@/composables/useGsapOrchestrator.js";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  }
})

const containerRef = ref(null);

const animationConfig = {
    scroll: {
        portfolioReveal: {
            play: () => {
                gsap.from('.portfolio-grid-item', {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    clearProps: 'all',
                    scrollTrigger: {
                        trigger: containerRef.value,
                        start: 'top 85%'
                    }
                });
            }
        }
    }
};

useGsapOrchestrator(containerRef, animationConfig);
</script>

<template>
  <div class="portfolio-container" ref="containerRef">
    <TransitionGroup name="fade" tag="div" class="grid row">
      <work v-for="item in props.items"
            :key="item.slug"
            :slug="item.slug"
            :properties="item"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>

</style>