<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'

const route = useRoute()
const uiStore = useUiStore()

const routerKey = computed(() =>
    `${uiStore.scope}::${route.fullPath}`
)
</script>
<template>
  <RouterView :key="routerKey" />
</template>