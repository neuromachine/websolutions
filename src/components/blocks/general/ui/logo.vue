<script setup>
import { ref, computed } from 'vue'
import gsap from 'gsap'
import { useGsapOrchestrator } from '@/composables/useGsapOrchestrator.js'

const props = defineProps({
  // 'header', 'footer', 'preloader' - определяет логику анимации
  context: {
    type: String,
    default: 'header'
  }
})

const logoWrapper = ref(null)

const animationsConfig = computed(() => {
  if (props.context === 'header') {
    return {
      // Глобальные события (слушают Pinia)
      global: {
        'PAGE_ENTER': {
          runOnce: true, // Сработает 1 раз за сессию (решает проблему обновления роута)
          isBlocking: false,
          play: () => gsap.timeline()
              .from('.gsap-bg', { scaleX: 0, duration: 0.8 })
        }
      },
      // Локальные события (слушают @mouseenter / ручные вызовы)
      local: {
        'HOVER_IN': {
          // overwrite: "auto" решает гонку. Если PAGE_ENTER еще работает, hover перехватит контроль над .gsap-mark
          play: () => gsap.to('.gsap-mark', { rotation: 10, duration: 0.2, overwrite: "auto" })
        },
        'HOVER_OUT': {
          play: () => gsap.to('.gsap-mark', { rotation: 0, duration: 0.2, overwrite: "auto" })
        }
      }
    }
  }

  if (props.context === 'footer') {
    return {
      // Скролл-события (не зависят от Pinia, запускаются по скроллу)
      scroll: {
        'REVEAL': {
          triggerConfig: {
            trigger: logoWrapper.value,
            start: 'top 90%', // Когда верх элемента достигает 90% высоты окна
            // markers: true,
            toggleActions: 'play none none reverse'
          },
          play: (triggerCfg) => gsap.timeline({ scrollTrigger: triggerCfg })
              .from(logoWrapper.value, { opacity: 0, y: 30, duration: 1 })
        }
      }
    }
  }

  return {}
})

// ДОБАВЛЕНО: Деструктуризируем triggerLocal для использования в <template>
const { triggerLocal } = useGsapOrchestrator(logoWrapper, animationsConfig)
</script>

<template>
  <!-- Корневой элемент для gsap.context() -->
  <span
      ref="logoWrapper"
      class="logo-wrapper"
      :class="`logo--${props.context}`"
      @mouseenter="triggerLocal('HOVER_IN')"
      @mouseleave="triggerLocal('HOVER_OUT')"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 91 38"
        width="91"
        height="38"
        fill="none"
    >
      <!-- Классы .gsap-bg и .gsap-mark используются как селекторы внутри composable -->
      <rect class="gsap-bg" width="91" height="38" fill="#FFE265"/>
      <g class="gsap-mark" fill="#223A76">
        <circle cx="20" cy="19" r="10" />
        <circle cx="50" cy="19" r="10" />
      </g>
    </svg>
  </span>
</template>

<style scoped>
.logo-wrapper {
  display: inline-block;
}
</style>