<script setup>
import catClass from "@/components/blocks/services/catClass.vue";
import item from "@/components/blocks/services/presentation/item.vue"
import service from "@/components/blocks/services/presentation/service.vue"
import content from "@/components/blocks/services/presentation/content.vue"

import { usePageOrchestrator } from "@/composables/usePageOrchestrator.js";
import { ref } from 'vue';
import AppModal from '@/components/ui/AppModal.vue';
import { useI18n } from 'vue-i18n';
import QuoteCartModal from '@/components/calculator/QuoteCartModal.vue';
import { useQuoteCartStore } from '@/stores/quoteCartStore';
import { CalculatorDataAdapter } from '@/adapters/CalculatorDataAdapter';

// const { blockStore, navigationStore } = usePageOrchestrator('group', 'structure+category', {
const { blockStore } = usePageOrchestrator('group', 'category', {
  fetch: (route) => route.params.slug
})

const { t } = useI18n();
const cartStore = useQuoteCartStore();
const selectedOffer = ref(null);
const isLoadingArticle = ref(false);
const articleContent = ref(null);

const handleOpenModal = async (offer) => {
  selectedOffer.value = offer;
  articleContent.value = null;
  // TODO: Handoff needed - Fetch article content from backend when endpoint is available
  // isLoadingArticle.value = true;
  // try {
  //   const res = await api.get(`/api/${route.params.scope}/blocks/items/${offer.slug}/article`);
  //   articleContent.value = res.data.content;
  // } catch (e) {
  //   console.error('Failed to load article detail');
  // } finally {
  //   isLoadingArticle.value = false;
  // }
};

const handleAddToCart = () => {
  if (selectedOffer.value) {
    const calcPackage = CalculatorDataAdapter.normalizePackage(selectedOffer.value);
    cartStore.addItem(calcPackage);
    selectedOffer.value = null; // Close the detail modal
  }
};

const handleCheckout = () => {
  // In MVP, we can redirect to a contact form or pop up an alert
  cartStore.toggleCart(false);
  // Using native alert for MVP as form route may not be fully connected
  alert('Имитация: Переход к форме заявки (Proceed to Quote Request Form)');
};
</script>

<template>
  <section class="service_section">

    <div v-if="blockStore.isCatReady" class="container">

      <content
        :content="blockStore.category.content.content"
      />


<!--      <div v-if="blockStore.isHaveSubCat" class="row groups_list">-->
      <div v-if="blockStore.isHaveSubCategories" class="row groups_list">
        <div v-for="(item, index) in blockStore.category.subcategories" :key="index" class="col-lg-4 col-md-6">
          <catClass
              :slug=item.slug
              :name=item.title
              :descr=item.descr
              :childs=item.childs
          />
        </div>
      </div>

      <template v-if="blockStore.isHaveItems">
        <template v-for="block in blockStore.category.blocks" :key="block.key || block.id">
          <div v-if="block.items && Object.keys(block.items).length" class="row items_list">
            <service v-for="(item, index) in block.items"
                  :key="item.key"
                  :slug="item.key"
                  :name="item.name"
                  :index="index"
                  :owner="blockStore.category"
                  :properties="item.properties"
                  @open-modal="handleOpenModal"
            />
          </div>
        </template>
      </template>

    </div>
    <div v-else class="container"><div class="row row_load">Loading Category</div></div>
  </section>

  <AppModal v-if="selectedOffer" @close="selectedOffer = null">
    <template #header>
      <h3 style="margin: 0; font-size: 1.25rem;">{{ selectedOffer.name }}</h3>
    </template>
    <template #default>
      <div class="offer-summary">
        <p style="font-size: 14px; color: #5F5F5F; margin-bottom: 16px;">{{ selectedOffer.properties.descr }}</p>
        
        <div v-if="selectedOffer.properties.price" style="margin-bottom: 16px; font-weight: bold;">
          {{ t('cp.packages.budget') }} {{ Array.isArray(selectedOffer.properties.price) ? selectedOffer.properties.price.join(' - ') : selectedOffer.properties.price }} {{ selectedOffer.properties.currency || t('cp.packages.currency') }}
        </div>
        
        <ul class="conditions" v-if="selectedOffer.properties.features && selectedOffer.properties.features.length" style="padding-left: 20px; color: #5F5F5F;">
          <li v-for="feat in selectedOffer.properties.features" :key="feat" style="list-style: disc; margin: 4px 0;">{{ feat }}</li>
        </ul>
        
        <div v-if="isLoadingArticle" style="margin-top: 20px; color: #00D9EA;">
          Loading details...
        </div>
        <div v-else-if="articleContent" v-html="articleContent" style="margin-top: 20px;"></div>
      </div>
    </template>
    <template #footer>
      <div style="display: flex; justify-content: flex-end;">
        <button style="padding: 10px 20px; background: #00D9EA; border: none; border-radius: 4px; cursor: pointer; color: #FFF; font-weight: bold; transition: opacity 0.2s ease;"
                onmouseover="this.style.opacity='0.8'"
                onmouseout="this.style.opacity='1'"
                @click="handleAddToCart">
          Добавить в запрос (Add to Quote)
        </button>
      </div>
    </template>
  </AppModal>

  <QuoteCartModal @checkout="handleCheckout" />

</template>
