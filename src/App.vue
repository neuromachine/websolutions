<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import { useGsapGlobalSync } from '@/composables/useGsapGlobalSync.js'

const route = useRoute()
const uiStore = useUiStore()

const routerKey = computed(() =>
    `${uiStore.scope}::${route.fullPath}`
)
// Инициализируем глобальную синхронизацию при запуске приложения
useGsapGlobalSync()
</script>
<template>
  <RouterView :key="routerKey" />
</template>