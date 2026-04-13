import { onMounted, onUnmounted, watch, unref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useAnimationStore } from '@/stores/animationStore'

gsap.registerPlugin(ScrollTrigger)

export function useGsapOrchestrator(targetRef, animationsConfig) {
    const animationStore = useAnimationStore()
    let gsapContext = null

    // Метод для ручного запуска локальных анимаций (например, :hover)
    const triggerLocal = (localActionName) => {
        const config = unref(animationsConfig)
        const action = config.local?.[localActionName]

        if (action && gsapContext) {
            //overwrite: "auto" заставляет GSAP убить конфликтующие анимации на тех же свойствах
            gsapContext.add(() => action.play())
        }
    }

    onMounted(() => {
        // targetRef.value содержит ссылку на DOM-узел, переданную из компонента.
        // Создаем контекст GSAP, привязанный к этому узлу.
        // gsapContext = gsap.context(() => {}, targetRef.value)

        gsapContext = gsap.context(() => {
            const config = unref(animationsConfig)

            if (config.scroll) {
                Object.values(config.scroll).forEach(action => {
                    action.play(action.triggerConfig)
                })
            }

        }, targetRef.value)

        watch(
            () => animationStore.currentPhase,
            (newPhase) => {
                const config = unref(animationsConfig)

                // Теперь мы обращаемся к реальному объекту конфигурации
                const phaseAction = config.global?.[newPhase]

                if (phaseAction) {
                    // ПРОВЕРКА ПАМЯТИ: Если стоит флаг runOnce и фаза уже игралась - игнорируем
                    if (phaseAction.runOnce && animationStore.hasPlayed(newPhase)) {
                        return
                    }

                    // Если анимация критична для очереди, регистрируем ее
                    if (phaseAction.isBlocking) {
                        animationStore.registerActive()
                    }

                    // Выполняем GSAP анимацию внутри контекста компонента
                    gsapContext.add(() => {
                        const tl = phaseAction.play()

                        // Если мы блокировали очередь, освобождаем ее по завершению
                        if (phaseAction.isBlocking && tl) {
                            tl.eventCallback('onComplete', () => {
                                animationStore.resolveActive()
                            })
                        }
                    })
                }
            },
            { immediate: true } // Проверяем фазу сразу при монтировании
        )
    })

    onUnmounted(() => {
        // Clear animation context
        if (gsapContext) {
            gsapContext.revert()
        }
    })

    return { triggerLocal, gsapContext }
}