import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimationStore = defineStore('animation', () => {
    // Текущая фаза глобальной анимации
    const currentPhase = ref('IDLE')

    // Очередь или зависимости можно хранить здесь, если требуется строгая блокировка
    const activeAnimations = ref(0)

    // Хранилище проигранных глобальных фаз (Память)
    const playedPhases = ref(new Set())

    // Установка новой фазы
    function setPhase(phase) {
        console.info('setPhase:', phase)
        currentPhase.value = phase
    }

    // Отметка о том, что фаза проиграна
    function markAsPlayed(phase) {
        playedPhases.value.add(phase)
    }

    // Проверка, игралась ли фаза
    function hasPlayed(phase) {
        return playedPhases.value.has(phase)
    }

    // Методы для блокировки следующих фаз, пока не завершатся текущие
    function registerActive() {
        activeAnimations.value++
    }

    function resolveActive() {
        activeAnimations.value = Math.max(0, activeAnimations.value - 1)
    }

    return {
        currentPhase,
        activeAnimations,
        playedPhases,
        setPhase,
        markAsPlayed,
        hasPlayed,
        registerActive,
        resolveActive
    }
})