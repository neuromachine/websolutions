<script setup>
import SectionHeader from "@/components/blocks/general/ui/SectionHeader.vue";
import Card from "@/components/blocks/general/ui/card.vue";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section v-if="props.data?.items?.length" class="services-section-two section-padding">
    <div class="container">
      <SectionHeader>
        <template #subtitle>{{ props.data.pretitle }}</template>
        <template #title>{{ props.data.title }}</template>
      </SectionHeader>
      
      <div class="row">
        <div class="col-lg-3 col-md-6 d-flex" v-for="b in props.data.items" :key="b.title">
          <Card class="mb-4">
            <template #icon>
              <IconOffer :index="b.index" :properties="b" />
            </template>
            <template #title>
              {{ b.title }}
            </template>
            <template #default>
              {{ b.text }}
            </template>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>
