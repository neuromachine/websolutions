<script setup>
import { computed } from 'vue'
import { useUiStore } from '@/stores/uiStore'

const props = defineProps({ to: { type: String, required: true } })
const uiStore = useUiStore()

const resolved = computed(() => {
  const section = uiStore.uiMainVars.section
  const path = props.to === '/' ? '' : props.to
  return section ? `/${section}${path}` : props.to
})
</script>

<template>
  <RouterLink :to="resolved"><slot /></RouterLink>
</template>