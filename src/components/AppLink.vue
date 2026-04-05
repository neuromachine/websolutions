<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'

const props = defineProps({
  to: { type: [String, Object], required: true }
})

const uiStore = useUiStore()
const router = useRouter()

const resolved = computed(() => {
  const scope = uiStore.scope  // ← переименованный section

  // Объект — именованный маршрут, передаём как есть
  // scope уже вшит в route через /:scope параметр роутера
  if (typeof props.to === 'object') {
    return props.to
  }

  // Строка — нормализуем и прeпендируем scope
  const clean = props.to.startsWith('/') ? props.to : '/' + props.to
  return scope ? `/${scope}${clean}` : clean
})
</script>

<template>
  <RouterLink :to="resolved"><slot /></RouterLink>
</template>