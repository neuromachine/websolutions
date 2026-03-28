<script setup>
import SectionHeader from "@/components/blocks/general/ui/SectionHeader.vue";
import Card from "@/components/blocks/general/ui/card.vue";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
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
      <div class="row row-cols-2 row-cols-lg-4  align-items-stretch">
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