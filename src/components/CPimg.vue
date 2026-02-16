<script setup>
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  svgkey: String
})

const currentComponent = computed(() =>
    defineAsyncComponent(() =>
        import(`@/components/blocks/compred/micro/svg/main/${props.svgkey}.vue`)
    )
)

</script>
<template>
  <component :is="currentComponent" />
</template>


<style>
.home-section.home-2 .main-banner-content h1 {
  font-size: 50px;
}

.cp_hero_svg {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cp_hero_svg svg {
  width: 100%;
  max-width: 450px;
  height: auto;
  display: block;
}
@media (max-width: 767px) {
  .cp_hero_svg svg {
    max-width: 100%;
    max-height: 200px;
    width: auto;
    margin: 0 auto;
  }
}
</style>