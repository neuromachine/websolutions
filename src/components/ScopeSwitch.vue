<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import { SCOPES_CONFIG, VALID_SCOPES } from '@/config/scopes.js'

const uiStore = useUiStore()
const router = useRouter()
const route = useRoute()

const current = computed(() => uiStore.scope)

const switchScope = (code) => {
  if (code === current.value) return

  uiStore.setScope(code)
  localStorage.setItem('scope', code)

  // Переходим на тот же маршрут, но с новой секцией
  router.replace({
    name: route.name,
    params: { ...route.params, scope: code },
    query: route.query,
  })
}
</script>

<template>
  <div class="section-switch d-flex align-items-center gap-1">
    <i class="bi bi-translate"></i>
    <template v-for="(cfg, code, index) in SCOPES_CONFIG" :key="code">
      <span
          class="switch-item"
          :class="{ active: current === code }"
          @click="switchScope(code)"
      >{{ cfg.label }}</span>
      <span v-if="index < VALID_SCOPES.length - 1" class="divider">|</span>
    </template>
  </div>
</template>

<style scoped>
.section-switch { font-size: 0.9rem; cursor: default; }
.switch-item {
  cursor: pointer;
  opacity: 0.45;
  transition: opacity 0.2s;
  font-weight: 500;
}
.switch-item.active { opacity: 1; }
.switch-item:hover { opacity: 0.8; }
.divider { opacity: 0.3; }
</style>