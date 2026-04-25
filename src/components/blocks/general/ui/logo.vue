<script setup>
import { ref, computed } from 'vue'
import { useGsapOrchestrator } from '@/composables/useGsapOrchestrator'
import { getLogoAnimations } from './logo.animations.js'

const props = defineProps({
  // 'header' или 'footer'
  context: {
    type: String,
    default: 'header',
    validator: (value) => ['header', 'footer'].includes(value)
  }
})

// DOM-ссылки (Template Refs)
const logoRoot = ref(null) // span.logo-wrapper
const wsGroup = ref(null)  // g.ws-group внутри SVG
const proGroup = ref(null) // g.pro-group внутри SVG

const textColor = computed(() => props.context === 'footer' ? '#FFFFFF' : '#000000')

// Константы цветов градиента
const LOGO_COLORS = {
  START: '#FFE265',
  END: '#FFC500'
}

// Генерируем конфигурацию анимаций на основе пропса 'context'
const animationsConfig = computed(() => {
  // Собираем все ссылки для фабрики
  const currentRefs = {
    root: logoRoot.value,
    ws: wsGroup.value,
    pro: proGroup.value
  }
  // Вызываем фабрику
  return getLogoAnimations(props.context, currentRefs, LOGO_COLORS)
})

// Подключаем оркестратор
const { triggerLocal } = useGsapOrchestrator(logoRoot, animationsConfig)
</script>

<template>
  <span
      ref="logoRoot"
      class="logo-wrapper"
      :class="`logo--${props.context}`"
      @mouseenter="triggerLocal('HOVER_IN')"
      @mouseleave="triggerLocal('HOVER_OUT')"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 230 132"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
    >
      <g ref="wsGroup" class="txt-style ws-group">
        <text x="0" y="100">WS.</text>
      </g>
      <g ref="proGroup" class="txt-style pro-group" transform="translate(212, 103)">
        <text
            text-anchor="start"
            transform="rotate(270)"
            x="0" y="0"
        >PRO</text>
      </g>
    </svg>
  </span>
</template>

<style scoped>
.logo-wrapper {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  //width: 230px; height: 132px;
  padding: 0 5px 0 6px;
  width: 80px; height: auto;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;
  //background-image: linear-gradient(45deg,#FFE265,#FFC500);
  background-image: none;
  border-radius: 5px;
}
.logo-wrapper svg { width: 100%; height: auto;}
.txt-style {
  font-family: "Sofia Sans", sans-serif;
  fill: v-bind(textColor);
}
.ws-group { font-size: 110px; line-height: 132px;}
.pro-group { font-size: 41px; line-height: 49px; font-weight: bold;}
</style>