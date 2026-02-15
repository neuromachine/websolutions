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


<style scoped>
.cp_hero_svg {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── SVG sizing ─────────────────────────────────────────────── */
.cp_hero_svg svg {
  width: 100%;
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