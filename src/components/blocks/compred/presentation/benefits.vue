<script setup>
import { computed } from 'vue'
import SectionHeader from "@/components/blocks/general/ui/SectionHeader.vue";
import Card from "@/components/blocks/general/ui/card.vue";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const colsClass = computed(() => {
  const count = props.data.items.length

  if (count <= 2) return 'row-cols-lg-2'
  if (count === 3) return 'row-cols-lg-3'
  if (count === 4) return 'row-cols-lg-4'
  if (count === 5) return 'row-cols-lg-5'
  if (count <= 6) return 'row-cols-lg-3'

  return 'row-cols-lg-4'
})
</script>

<template>
  <!-- presentation component start -->
  <section class="ui-cards">
    <div class="container">
      <SectionHeader class="text-center">
        <template #subtitle>{{ props.data.pretitle }}</template>
        <template #title>{{ props.data.title }}</template>
      </SectionHeader>
      <div class="row row-cols-2 align-items-stretch" :class="colsClass">
        <div class="d-flex col"  v-for="item in props.data.items" :key="item.title">
          <Card class="mb-4">
            <template #icon>
              <IconOffer :index="item.index" :properties="item" />
            </template>
            <template #title>
              {{ item.title }}
            </template>
            <template #text>
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