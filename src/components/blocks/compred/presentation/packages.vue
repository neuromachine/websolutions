<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from "@/components/blocks/general/ui/SectionHeader.vue";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";

const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// Local alias mapping for properties.items.items -> packages
const packages = computed(() => props.data?.items ?? [])

defineEmits(['open-chat'])
</script>

<template>
  <section v-if="props.data" class="services-section-two section-padding">
    <div class="container">
      <SectionHeader>
        <template #subtitle>{{ props.data.pretitle }}</template>
        <template #title>{{ props.data.title }}</template>
      </SectionHeader>
      
      <div class="row align-items-stretch" v-if="packages.length">
        <div class="col-lg-4 col-md-6 d-flex" v-for="item in packages" :key="item.name">
          <div class="service plan">
            <div class="icon">
              <IconOffer
                  :index="item.index"
                  :properties="item"
              />
            </div>
            <div class="title">
              {{ item.name }}
            </div>
            <div v-if="item.desc" class="descr">
              {{ item.desc }}
            </div>
            <div v-if="item.discount" class="price roboto">
              {{ t('cp.packages.budget') }} <span class="sofia_bold oldprice">{{ item.price }}</span> {{ t('cp.packages.discount') }} <span class="discount">{{ item.discount }}</span>
            </div>
            <div v-else class="price w_dis roboto">
              {{ t('cp.packages.budget') }} <span class="sofia_bold">{{ item.price }}</span>
            </div>
            <div class="term roboto">
              {{ t('cp.packages.period') }} <span class="sofia_bold">{{ item.term }}</span>
            </div>
            <ul class="conditions">
              <li v-for="f in item.features" :key="f">{{ f }}</li>
            </ul>
            <div class="b_wrap">
              <a href="/pages/contacts" @click.prevent="$emit('open-chat')" class="know_price">{{ t('cp.packages.button') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.service {
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: #000;
  box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);
  width: 100%;
}
.service .icon { width: 50px; height: 50px;}
.service .title { font-size: 16px; font-weight: bold; margin: 16px 0 16px 0;}
.service .descr { font-size: 14px; line-height: 17px; color: #5F5F5F; margin: 0 0 16px 0; }

.service .roboto { font-family: Roboto, "Helvetica Neue", sans-serif; font-size: 11px; line-height: 22px; margin: 0 0 16px 0;}
.service .sofia_bold { font-family: "Sofia Sans", sans-serif; font-size: 18px; font-weight: bold; margin: 0 10px 0 10px;}
.service .conditions { padding: 0 0 0 16px; color: #5F5F5F; min-height: 220px;}
.service .conditions li { margin: 4px 0 4px 0; list-style: disc;}
.service .b_wrap { display: flex; margin: 16px 0 0 0;}
.service .know_price { color: #00D9EA; border: solid 1px #00D9EA; border-radius: 4px; padding: 18px 14px;}
.service .know_price:hover { background-color: #00D9EA; color: #FFF; }
</style>
