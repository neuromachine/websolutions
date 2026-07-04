<script setup>
import { computed, onMounted } from "vue";
import SectionRenderer from "./SectionRenderer.vue";
import { compredSections } from "./sectionRegistry.js";

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

const renderContext = computed(() => ({
    scope: uiStore.scope,
    item: blockStore.item,
    openChat: openTidioChat
}));

const renderModels = computed(() => {
    return compredSections
        .filter(section => section.isRenderable(properties.value, renderContext.value))
        .sort((a, b) => a.order - b.order)
        .map(section => ({
            key: section.key,
            component: section.component,
            props: section.getProps(properties.value, renderContext.value),
            on: section.getListeners ? section.getListeners(renderContext.value) : {}
        }));
});
</script>

<template>
  <div id="compred" v-if="blockStore.isItemReady">
    <SectionRenderer v-for="model in renderModels" :key="model.key" :section="model" />

  </div>
  <div v-else class="container">
    <div class="row row_load">Loading Item</div>
  </div>
</template>

<style scoped>
</style>
