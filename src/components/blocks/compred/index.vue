<script setup>
import { computed, onMounted } from "vue";
import Portfolio from "@/components/blocks/portfolio/index.vue"
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

import { useRoute } from "vue-router";
import { watch } from "vue";
import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
import { useUiStore } from '@/stores/uiStore';

const route = useRoute();
const uiStore = useUiStore();

// Use an empty scheme so usePageOrchestrator still binds useHead/navigation
// but does not automatically trigger fetchBlockItem.
const { blockStore } = usePageOrchestrator('compred', '', {
  fetch: (route) => route.params.slug
})

const normalizeCommercialProposalPayload = (payload) => {
    if (!payload) return {};
    
    // Default fallback to legacy structure if flat structure isn't detected
    if (payload.properties && !payload.block) {
        return payload.properties; 
    }
    
    const blockProps = payload.block?.properties || {};
    // packages/items are at the root of the flat payload array
    const packages = payload.items || blockProps.items || [];
    
    return {
        ...blockProps,
        items: packages
    };
};

const properties = computed(() => normalizeCommercialProposalPayload(blockStore.item))

const loadData = async () => {
    await blockStore.fetchFlatOffers(route.params.slug);
    uiStore.buildPageVars({
        item: blockStore.item
    });
};

onMounted(() => {
   uiStore.setHeaderVars('menu', false);
   loadData();
});

watch(() => [route.params.slug, uiStore.scope], () => {
    loadData();
});

import { chat } from '@/chat' // tidio
const openTidioChat = () => {
  chat.open()
}
</script>

<template>
  <div id="compred" v-if="blockStore.isItemReady">
    <Hero v-if="properties.hero" :data="properties.hero" :svgkey="blockStore.item?.block?.key || blockStore.item?.key" />

    <Calc />

    <Benefits v-if="properties.benefits" :data="properties.benefits" />

    <About :scope="uiStore.scope" />

    <Packages v-if="properties.items" :data="properties.items" @open-chat="openTidioChat" />

    <Includes v-if="properties.includes" :items="properties.includes" />

    <Important v-if="properties.important" :data="properties.important" />

    <ReelsSystem v-if="properties.reelsSystem" :data="properties.reelsSystem" />

    <Extras v-if="properties.extras" :data="properties.extras" />

    <!-- acticle -->
    <section v-if="properties.acticle" class="acticle services-section-two section-padding">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <content
                :content="properties.acticle"
            />
          </div>
        </div>
      </div>
    </section>
    <!-- End acticle -->

    <section v-if="blockStore.item?.block?.key === 'ivorycoast' || blockStore.item?.key === 'ivorycoast'">
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
</template>

<style scoped>
</style>
