<script setup>
import { watch, onUnmounted } from 'vue'
import { useUiStore } from '@/stores/uiStore'
import { useAnimationStore } from '@/stores/animationStore'

const uiStore = useUiStore()
const animationStore = useAnimationStore()

// Блокировка скролла во время загрузки
watch(
    () => uiStore.isGlobalLoading,
    (isLoading) => {
      if (isLoading) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    { immediate: true }
)

// Защита от зависания скролла при размонтировании
onUnmounted(() => {
  document.body.style.overflow = ''
})

// ЭСТАФЕТА: Запускается нативно Vue только после полного завершения CSS-анимации скрытия
const onAfterLeave = () => {
  animationStore.setPhase('GLOBAL_ENTER')
}
</script>

<template>
  <Transition name="loader-shutter" @after-leave="onAfterLeave">
    <div v-if="uiStore.isGlobalLoading" class="preloader-wrapper">
      <div class="shutter left"></div>
      <div class="shutter right"></div>

      <div class="loader-core">
        <div class="shadow"></div>
        <div class="box"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.preloader-wrapper {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Физические шторки */
.shutter {
  position: absolute;
  top: 0;
  width: 50vw;
  height: 100vh;
  background-color: #ffffff;
  z-index: 1;
  /* Плавность разъезжания */
  transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}
.shutter.left { left: 0; }
.shutter.right { right: 0; }

.loader-core {
  position: relative;
  width: 50px;
  height: 50px;
  z-index: 2;
  /* Плавность исчезновения самого кубика */
  transition: opacity 0.3s ease;
}

.box { width: 50px; height: 50px; background: #00D9EA; border-radius: 5px; position: absolute; top: 0; left: 0; animation: wsSpin 0.5s linear infinite; }
.shadow { width: 50px; height: 5px; background: #000; opacity: 0.1; position: absolute; top: 60px; left: 0; border-radius: 50%; animation: wsShadow 0.5s linear infinite; }

/* Анимация Transition */
.loader-shutter-leave-active {
  /* Общее время Transition должно равняться самой долгой CSS анимации (шторкам) */
  transition: all 0.8s;
}

.loader-shutter-leave-to .left {
  transform: translateX(-100%);
}
.loader-shutter-leave-to .right {
  transform: translateX(100%);
}
.loader-shutter-leave-to .loader-core {
  opacity: 0; /* Кубик исчезает быстрее шторок */
}

@keyframes wsSpin {
  17% { border-bottom-right-radius: 3px; }
  25% { transform: translateY(9px) rotate(22.5deg); }
  50% { transform: translateY(18px) scale(1, .9) rotate(45deg); border-bottom-right-radius: 40px; }
  75% { transform: translateY(9px) rotate(67.5deg); }
  100% { transform: translateY(0) rotate(90deg); }
}
@keyframes wsShadow {
  50% { transform: scale(1.2, 1); }
}
</style>