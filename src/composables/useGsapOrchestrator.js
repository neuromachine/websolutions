import { onMounted, onUnmounted, watch, unref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger' // ОБЯЗАТЕЛЬНЫЙ ИМПОРТ
import { useAnimationStore } from '@/stores/animationStore.js'

// Регистрируем плагин один раз для всего приложения
gsap.registerPlugin(ScrollTrigger)

export function useGsapOrchestrator(targetRef, animationsConfig) {
    const animationStore = useAnimationStore()
    let gsapContext = null

    // Метод для ручного запуска локальных анимаций (например, :hover)
    const triggerLocal = (localActionName) => {
        const config = unref(animationsConfig)
        const action = config.local?.[localActionName]

        if (action && gsapContext) {
            // overwrite: "auto" заставит GSAP убить конфликтующие анимации (если PAGE_ENTER еще идет)
            gsapContext.add(() => action.play())
        }
    }

    onMounted(() => {
        gsapContext = gsap.context(() => {}, targetRef.value)
        const config = unref(animationsConfig)

        // 1. Инициализация SCROLL анимаций
        if (config.scroll) {
            Object.keys(config.scroll).forEach((key) => {
                const scrollAction = config.scroll[key]
                gsapContext.add(() => {
                    scrollAction.play(scrollAction.triggerConfig)
                })
            })
        }

        // 2. Подписка на GLOBAL фазы (из Pinia)
        watch(
            () => animationStore.currentPhase,
            (newPhase) => {
                const globalAction = config.global?.[newPhase]

                if (globalAction) {
                    // ПРОВЕРКА ПАМЯТИ: Если стоит флаг runOnce и фаза уже игралась - игнорируем
                    if (globalAction.runOnce && animationStore.hasPlayed(newPhase)) {
                        return
                    }

                    if (globalAction.isBlocking) animationStore.registerActive()

                    gsapContext.add(() => {
                        const tl = globalAction.play()

                        if (tl) {
                            tl.eventCallback('onComplete', () => {
                                if (globalAction.isBlocking) animationStore.resolveActive()
                                // Записываем в память после завершения
                                if (globalAction.runOnce) animationStore.markAsPlayed(newPhase)
                            })
                        }
                    })
                }
            },
            { immediate: true }
        )
    })

    onUnmounted(() => {
        if (gsapContext) gsapContext.revert()
    })

    // Экспортируем triggerLocal для использования в шаблонах
    return { triggerLocal, gsapContext }
}