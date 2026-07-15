<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionHeader from "@/components/blocks/general/ui/SectionHeader.vue";
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";
import Card from "@/components/blocks/general/ui/card.vue";

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
      <SectionHeader align="center">
        <template #subtitle>{{ props.data.pretitle }}</template>
        <template #title>{{ props.data.title }}</template>
      </SectionHeader>
      
      <div class="row align-items-stretch" v-if="packages.length">
        <div class="col-lg-4 col-md-6 mb-4 d-flex" v-for="item in packages" :key="item.name">
          <Card>
            <template #icon>
              <div class="icon">
                <IconOffer
                    :index="item.index"
                    :properties="item"
                />
              </div>
            </template>
            <template #title>
              {{ item.name }}
            </template>
            <template #text>
              <p v-if="item.desc" class="descr">{{ item.desc }}</p>
              
              <div v-if="item.discount" class="price roboto">
                {{ t('cp.packages.budget') }} <strong class="sofia_bold oldprice">{{ item.price }}</strong> {{ t('cp.packages.discount') }} <span class="discount">{{ item.discount }}</span>
              </div>
              <div v-else class="price w_dis roboto">
                {{ t('cp.packages.budget') }} <strong class="sofia_bold">{{ item.price }}</strong>
              </div>
              
              <div class="term roboto">
                {{ t('cp.packages.period') }} <strong class="sofia_bold">{{ item.term }}</strong>
              </div>
              
              <ul class="conditions">
                <li v-for="f in item.features" :key="f">{{ f }}</li>
              </ul>
            </template>
            <template #action>
              <div class="b_wrap">
                <a href="/pages/contacts" @click.prevent="$emit('open-chat')" class="know_price">{{ t('cp.packages.button') }}</a>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.icon { width: 50px; height: 50px; }
.roboto { font-family: Roboto, "Helvetica Neue", sans-serif; font-size: 11px; line-height: 22px; margin: 0 0 16px 0; }
.sofia_bold { font-family: "Sofia Sans", sans-serif; font-size: 18px; font-weight: bold; margin: 0 10px 0 10px; }
.b_wrap { display: flex; margin-top: auto; }
.know_price { 
  color: #00D9EA; 
  border: solid 1px #00D9EA; 
  border-radius: 4px; 
  padding: 18px 14px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
}
.know_price:hover { background-color: #00D9EA; color: #FFF; }
.oldprice { text-decoration: line-through; color: #999; }
.discount { color: #f44336; font-weight: bold; }
</style>
