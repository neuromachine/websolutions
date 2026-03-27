<script setup>
import Icon from "@/components/blocks/services/micro/icon.vue"
import AppLink from "@/components/AppLink.vue";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description	: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  childs: {
    type: Array,
    required: true
  },
})
</script>
<template>
  <div class="d-flex col-lg-4 col-md-6">
    <div class="single-services-three-item dir h-80">
      <div class="head">
        <Icon :slug="props.slug" />
        <h3 class="title align-items-center">
          <AppLink :to="{ name: 'group', params: { slug: props.slug } }">
            {{props.title}}
          </AppLink>
        </h3>
      </div>
      <div class="services-three-content">
        <p>{{props.description}}</p>
        <AppLink :to="{ name: 'direction', params: { slug: props.slug } }" class="float_link">
          <i class="bi bi-arrow-right-short"></i> {{ t('ui.more')}}
        </AppLink>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>