<script setup>
const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  properties: {
    type: Object,
    required: true
  },
})
</script>

<template>
  <div class="svg_wrap">
    <div
        class="grad"
        :class="{
                  'gra_w_to_s': props.index === 0,
                  'gra_s_to_b': props.index === 1,
                  'gra_y_to_o': props.index === 2,
                  'gra_o_to_r': props.index === 3
                }"
        v-if="typeof props.properties?.icon === 'string' && props.properties.icon !== ''">
      <i class="bi" :class="'bi-'+props.properties.icon"></i>
    </div>
    <div v-else class="services-icon">
      <i class="bi bi-gear"></i>
    </div>
  </div>

</template>

<style scoped>
</style>