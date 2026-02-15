<script setup>
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'
const props = defineProps({
  svgkey: String
})
const currentComponent = computed(() =>
    defineAsyncComponent(() =>
        import(`@/components/blocks/compred/micro/svg/icon/${props.svgkey}.vue`)
    )
)
</script>
<template>
  <component :is="currentComponent" />
</template>