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
svg {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
.svg_wrap i { font-size: 42px; color: #223A76}
.svg_wrap .gra_w_to_s i {background: linear-gradient(45deg, #E5F7FD 0%, #00D9EA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;}
.svg_wrap .gra_s_to_b i {background: linear-gradient(45deg, #00D9EA 0%, #0C90C7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;}
.svg_wrap .gra_y_to_o i {background: linear-gradient(45deg, #FFE265 0%, #FFC500 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;}
.svg_wrap .gra_o_to_r i {background: linear-gradient(45deg, #FFC500 0%, #FF5A5F 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;}

</style>