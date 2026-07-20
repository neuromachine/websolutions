<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from "@/components/blocks/general/ui/SectionHeader.vue";
import Card from "@/components/blocks/general/ui/card.vue";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";
import { getCardGridClasses } from "@/components/blocks/general/ui/cardGridClasses.js";

const { t } = useI18n()

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const colsClass = computed(() => {
  if (!Array.isArray(props.items) || props.items.length === 0) {
    return 'row-cols-1'
  }
  return getCardGridClasses(props.items.length)
})
</script>

<template>
  <section v-if="props.items?.length" class="services-section-two">
    <div class="container">
      <SectionHeader align="center">
        <template #subtitle>{{ t('cp.includes.title') }}</template>
      </SectionHeader>
      
      <div class="row align-items-stretch" :class="colsClass">
        <div class="d-flex col" v-for="item in props.items" :key="item.text">
          <Card class="mb-4">
            <template #icon>
              <IconOffer :index="item.index" :properties="item" />
            </template>
            <template #title>
              {{ item.text }}
            </template>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
