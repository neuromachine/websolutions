<script setup>
import { computed } from 'vue'
import SectionHeader from "@/components/blocks/general/ui/SectionHeader.vue";
import Card from "@/components/blocks/general/ui/card.vue";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";
import { getCardGridClasses } from "@/components/blocks/general/ui/cardGridClasses.js";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const colsClass = computed(() => {
  const items = props.data?.items
  if (!Array.isArray(items) || items.length === 0) {
    return 'row-cols-1'
  }
  return getCardGridClasses(items.length)
})
</script>

<template>
  <!-- presentation component start -->
  <section v-if="props.data?.items?.length" class="ui-cards">
    <div class="container">
      <SectionHeader align="center">
        <template #subtitle>{{ props.data?.pretitle }}</template>
        <template #title>{{ props.data?.title }}</template>
      </SectionHeader>
      <div class="row align-items-stretch" :class="colsClass">
        <div class="d-flex col" v-for="item in props.data.items" :key="item.title">
          <Card class="mb-4">
            <template #icon>
              <IconOffer :index="item.index" :properties="item" />
            </template>
            <template #title>
              {{ item.title }}
            </template>
            <template #default>
              {{ item.text }}
            </template>
          </Card>
        </div>
      </div>
    </div>
  </section>
  <!-- presentation component end -->
</template>

<style scoped>
/* custom styles */
.ui-cards {padding: 100px 0;}
</style>