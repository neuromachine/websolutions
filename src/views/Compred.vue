<script setup>
import { computed, onMounted } from "vue";
import Header from "@/components/Header.vue";
import Portfolio from "@/components/blocks/portfolio/index.vue"
import Footer from "@/components/Footer.vue";
import Calc from "@/components/Calc.vue";
import content from "@/components/blocks/services/presentation/content.vue"
import Benefits from "@/components/blocks/compred/presentation/benefits.vue";
import qrcode from "@/components/blocks/general/ui/qrcode.vue"

// New presentation imports
import Hero from "@/components/blocks/compred/presentation/hero.vue";
import About from "@/components/blocks/compred/presentation/about.vue";
import Packages from "@/components/blocks/compred/presentation/packages.vue";
import Includes from "@/components/blocks/compred/presentation/includes.vue";
import Important from "@/components/blocks/compred/presentation/important.vue";
import ReelsSystem from "@/components/blocks/compred/presentation/reels_system.vue";
import Extras from "@/components/blocks/compred/presentation/extras.vue";
import Acticle from "@/components/blocks/compred/presentation/acticle.vue";

import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
const { blockStore } = usePageOrchestrator('compred', 'item', {
  fetch: (route) => route.params.slug
})

const properties = computed(() => blockStore.item?.properties ?? {})

import { useUiStore } from '@/stores/uiStore';
const uiStore = useUiStore();
onMounted(() => {
   uiStore.setHeaderVars('menu', false);
});

import { chat } from '@/chat' // tidio
const openTidioChat = () => {
  chat.open()
}
</script>

<template>
  <Header/>
  <div id="compred" v-if="blockStore.isItemReady">
    <Hero v-if="properties.hero" :data="properties.hero" :svgkey="blockStore.item.key" />

<!--    <Calc />-->
    <!-- Benefits -->
    <Benefits v-if="properties.benefits" :data="properties.benefits" />
    <!-- /Benefits -->
    <About :scope="uiStore.scope" />
    <!-- Packages -->
    <Packages v-if="properties.items" :data="properties.items" @open-chat="openTidioChat" />
    <!-- /Packages -->
    <!-- Includes -->
    <Includes v-if="properties.includes" :items="properties.includes" />
    <!-- /Includes -->
    <!-- Important -->
    <Important v-if="properties.important" :data="properties.important" />
    <!-- /Important -->
    <!-- ReelsSystem -->
    <ReelsSystem v-if="properties.reelsSystem" :data="properties.reelsSystem" />
    <!-- /ReelsSystem -->
    <!-- Extras -->
    <Extras v-if="properties.extras" :data="properties.extras" />
    <!-- /Extras -->

    <!-- acticle -->
    <Acticle v-if="properties.acticle" :data="properties.acticle" />
    <!-- End acticle -->

    <section v-if="blockStore.item.key === 'ivorycoast'">
      <div class="container">
        <qrcode
            url="https://www.wspro.xyz/vi/compred/ivorycoast"
            :size="150"
            foreground-color="#2c3e50"
        />
      </div>
    </section>

    <Portfolio />

  </div>
  <div v-else class="container">
    <div class="row row_load">Loading Item</div>
  </div>
  <Footer/>
</template>

<style scoped>
</style>