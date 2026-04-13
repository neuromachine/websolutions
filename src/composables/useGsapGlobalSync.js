import { watch, onMounted, onUnmounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimationStore } from '@/stores/animationStore.js'

export function useGsapGlobalSync() {
    const animationStore = useAnimationStore()
    let resizeObserver = null
    let debounceTimer = null

    const refreshScrollTrigger = () => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => {
            ScrollTrigger.refresh()
            console.info('GSAP ScrollTrigger: Layout recalculated')
        }, 150)
    }

    onMounted(() => {
        // 1. Следим за динамическим контентом (аккордеоны, картинки)
        resizeObserver = new ResizeObserver(() => refreshScrollTrigger())
        const appContainer = document.getElementById('app') || document.body
        if (appContainer) resizeObserver.observe(appContainer)

        // 2. Обновляем координаты GSAP сразу после старта анимации контента
        watch(
            () => animationStore.currentPhase,
            (newPhase) => {
                if (newPhase === 'GLOBAL_ENTER') {
                    setTimeout(refreshScrollTrigger, 100)
                }
            }
        )
    })

    onUnmounted(() => {
        if (resizeObserver) resizeObserver.disconnect()
        clearTimeout(debounceTimer)
    })
}