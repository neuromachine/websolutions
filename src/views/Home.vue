<script setup>
import Header from "@/components/Header.vue";
import Footer from '@/components/Footer.vue'
import Hero from '@/components/blocks/general/section/hero.vue'
import About from '@/components/blocks/general/section/about.vue'
import Services from '@/components/blocks/general/section/services.vue'
import Workflow from '@/components/blocks/general/section/workflow.vue'
import Testimonial from "@/components/Testimonial.vue";
import Counter from "@/components/blocks/general/section/Counter.vue";
import Faq from "@/components/blocks/general/section/Faq.vue";
import Portfolio from "@/components/Portfolio.vue"
import { useDataStore } from '@/stores/dataStore';
const dataStore = useDataStore();
import {useRoute} from "vue-router";
const route = useRoute();
import {usePageData} from "@/composables/usePageData.js";
usePageData((route) => {
  console.log('MAIN route.fullPath:',route.fullPath);
  dataStore.fetchBlockCategory(route.params.slug ?? route.name)
})

/*
import { onMounted, watch } from "vue";
function load() {
  console.log("load - route.params.slug",route.params.slug,'route.name:',route.name);

  if(route.params.slug == undefined)
  {
    dataStore.fetchBlockCategory(route.name);
  }
  else
  {
    dataStore.fetchBlockCategory(route.params.slug);
  }

}
onMounted(() => {load()});
watch(
    () => route.params.slug,
    (newSlug, oldSlug) => {
      console.log(newSlug);
      if (newSlug !== oldSlug) {
        load()
      }
    }
)

 */
</script>

<template>
  <Header :isMain="true"/>
  <template v-if="dataStore.isCatReady">
    <Hero :hero="dataStore.category.sections.slide.hero" />
    <Services :list="dataStore.category.sections.list.section_service" />
    <About :slide="dataStore.category.sections.slide.section_about" />
    <Workflow :list="dataStore.category.sections.list.section_workflow" />
    <Counter :list="dataStore.category.sections.list.section_achiev" />
    <!--  <Portfolio />-->
    <!--  <Testimonial />-->
    <Faq :list="dataStore.category.sections.list.section_faq" />
  </template>




  <!-- Start Hire Section -->
  <section class="hire-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 offset-lg-2 col-md-12" v-if="dataStore.isCatReady">
          <div class="hire-content" v-html="dataStore.category.sections.simplehtml.content">
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Hire Section -->
  <Footer />
</template>