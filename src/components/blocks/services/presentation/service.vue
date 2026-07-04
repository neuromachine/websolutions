<script setup>
import { useI18n } from 'vue-i18n';
import IconOffer from "@/components/blocks/services/micro/icon_offer.vue";

const { t } = useI18n();

const emit = defineEmits(['open-modal']);

const props = defineProps({
  slug: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  owner: {
    type: Object,
    required: true
  },
  properties: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <div class="col-lg-3 col-md-6">
    <div class="service" :class="{ 'featured-package': props.properties.featured }" v-if="props.properties">
      <div class="icon">
        <IconOffer
            :index="props.index"
            :properties="props.properties"
        />
      </div>
<!--      <div class="title">
        {{props.owner.name}} – {{props.name}}
      </div>-->
      <div class="title">
        {{props.name}}
      </div>
      <div class="descr">
        {{props.properties.descr}}
      </div>
      <div class="price roboto" v-if="props.properties.price">
        {{ t('cp.packages.budget') }} <span class="sofia_bold">{{ Array.isArray(props.properties.price) ? props.properties.price.join(' - ') : props.properties.price }}</span> {{ props.properties.currency || t('cp.packages.currency') }}
      </div>
      <div class="term roboto" v-if="props.properties.timeline">
        {{ t('cp.packages.period') }} <span class="sofia_bold">{{ Array.isArray(props.properties.timeline) ? props.properties.timeline.join(' - ') : props.properties.timeline }}</span> {{ props.properties.timeline_unit || t('cp.packages.weeks') }}
      </div>
      <ul class="conditions" v-if="props.properties.features && props.properties.features.length">
        <li v-for="item in props.properties.features" :key="item">{{item}}</li>
      </ul>
      <div class="b_wrap">
<!--        <RouterLink class="know_price" :to="{ path: '/blocks/item/' + props.key }">Узнать точную цену</RouterLink>-->
<!--        <RouterLink class="know_price" to="/pages/contacts">Узнать точную цену</RouterLink>-->
        <button class="know_price" @click="emit('open-modal', { slug: props.slug, name: props.name, properties: props.properties, index: props.index, owner: props.owner })">
          {{ t('cp.packages.button') }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service {
  display: flex;
  flex-direction: column;
  padding: 24px;
  color: #000;
  box-shadow: 5px 7px 15px 2px rgba(82, 90, 101, 0.12);
  transition: transform 0.3s ease;
}
.service.featured-package {
  border: 2px solid #00D9EA;
  transform: translateY(-5px);
}
.service:hover {
  transform: translateY(-5px);
}
  .service .icon { width: 50px; height: 50px;}
  .service .title { font-size: 16px; font-weight: bold; margin: 16px 0 16px 0;}
  .service .descr { font-size: 14px; line-height: 17px; color: #5F5F5F; margin: 0 0 16px 0;}
  .service .roboto { font-family: Roboto, "Helvetica Neue", sans-serif; font-size: 11px; line-height: 22px; margin: 0 0 16px 0;}
    .service .sofia_bold { font-family: "Sofia Sans", sans-serif; font-size: 18px; font-weight: bold; margin: 0 10px 0 10px;}
  .service .conditions { padding: 0 0 0 16px; color: #5F5F5F;}
    .service .conditions li { margin: 4px 0 4px 0; list-style: disc;}
  .service .b_wrap {  display: flex; margin: 16px 0 0 0;}
  .service .know_price { 
    color: #00D9EA; 
    border: solid 1px #00D9EA; 
    border-radius: 4px; 
    padding: 18px 14px;
    background: transparent;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s ease;
  }
  .service .know_price:hover { background-color: #00D9EA; color: #FFF; }
</style>