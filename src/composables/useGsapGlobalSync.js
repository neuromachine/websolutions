import { watch, onMounted, onUnmounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Замените пути импорта сторов на актуальные для вашего проекта, если они отличаются
import { useUiStore } from '@/stores/uiStore.js'
import { useAnimationStore } from '@/stores/animationStore.js'

export function useGsapGlobalSync() {
    const uiStore = useUiStore()
    const animationStore = useAnimationStore()

    let resizeObserver = null
    let debounceTimer = null

    // Функция для безопасного обновления всех скролл-триггеров в приложении
    const refreshScrollTrigger = () => {
        clearTimeout(debounceTimer)
        // Debounce 150ms гарантирует, что если 20 картинок портфолио загрузятся почти
        // одновременно, перерасчет геометрии сработает только 1 раз в конце.
        debounceTimer = setTimeout(() => {
            ScrollTrigger.refresh()
            console.info('GSAP ScrollTrigger: Layout recalculated')
        }, 150)
    }

    onMounted(() => {
        // 1. Инициализация ResizeObserver для отслеживания динамической высоты (картинки, списки)
        resizeObserver = new ResizeObserver(() => {
            refreshScrollTrigger()
        })

        // Наблюдаем за корневым контейнером. Убедитесь, что id='app' совпадает с вашим index.html
        const appContainer = document.getElementById('app') || document.body
        if (appContainer) {
            resizeObserver.observe(appContainer)
        }

        // 2. Синхронизация старта анимаций с глобальным лоадером
        watch(
            // Обратите внимание: укажите здесь ваш реальный стейт или геттер (isGlobalLoading / getGlobalLoading)
            () => uiStore.isGlobalLoading,
            (isLoading) => {
                if (!isLoading) {
                    // Когда лоадер скрыт, даем DOM немного времени на финальный рендеринг (nextTick)
                    // затем обновляем триггеры и запускаем парад анимаций PAGE_ENTER
                    setTimeout(() => {
                        refreshScrollTrigger()
                        animationStore.setPhase('PAGE_ENTER')
                    }, 50) // Небольшой лаг для гарантии отрисовки Vue
                }
            },
            { immediate: true }
        )
    })

    onUnmounted(() => {
        if (resizeObserver) resizeObserver.disconnect()
        clearTimeout(debounceTimer)
    })
}