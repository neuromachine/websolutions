<script setup>
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue'

import Hero from '@/components/blocks/general/section/hero.vue'
import About from '@/components/blocks/general/section/about.vue'
import Services from '@/components/blocks/general/section/services.vue'
import Workflow from '@/components/blocks/general/section/workflow.vue'
import Counter from "@/components/blocks/general/section/Counter.vue";
import Faq from "@/components/blocks/general/section/Faq.vue";

import Portfolio from "@/components/blocks/portfolio/index.vue";

// import Testimonial from "@/components/Testimonial.vue";

import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
const { blockStore } = usePageOrchestrator('main', 'category', {
  fetch: (route) => route.params.slug ?? route.name
})
</script>

<template>
  <Header :isMain="true"/>
  <template v-if="blockStore.isCatReady">
    <Hero :hero="blockStore.category.sections.slide.hero" />
    <Services :list="blockStore.category.sections.list.section_service" />
    <About :slide="blockStore.category.sections.slide.section_about" />
    <Workflow :list="blockStore.category.sections.list.section_workflow" />
    <Counter :list="blockStore.category.sections.list.section_achiev" />
    <Portfolio />
<!--<Testimonial />-->
    <Faq :list="blockStore.category.sections.list.section_faq" />
  </template>
  <!-- Start Hire Section -->
  <section class="hire-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2 col-md-12" v-if="blockStore.isCatReady">
          <div class="hire-content" v-html="blockStore.category.sections.simplehtml.content">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Hire Section -->
  <Footer />
</template>