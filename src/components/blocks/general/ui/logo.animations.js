/**
 * Logo.animations.js
 * Данный файл инкапсулирует декларативную конфигурацию анимаций для компонента Logo.
 */
import gsap from 'gsap'

// Константы цветов градиента для удобного переиспользования
const LOGO_COLORS = {
    START: '#f44336',
    END: '#ff9800'
}

/**
 * Генерирует объект конфигурации для useGsapOrchestrator.
 *
 * @param {string} context - 'header' или 'footer'.
 * @param {object} refs - Объект с ref-ссылками на DOM-элементы ({ root, ws, pro }).
 * @param {object} colorValues - Объект с цветами градиента (LOGO_COLORS).
 * @returns {object} - Конфигурация анимации.
 */
export const getLogoAnimations = (context, refs, colorValues) => {
    // 1. Анимации для HEADER контекста
    if (context === 'header') {
        return {
            global: {
                'GLOBAL_ENTER': {
                    // runOnce: true, // Проиграть один раз за сессию
                    isBlocking: false,
                    play: () => {
                        const tl = gsap.timeline()
                        tl.set(refs.root, {
                            backgroundImage: `linear-gradient(90deg, ${colorValues.START}, ${colorValues.END})`
                        })
                        // Fadein , set gradient
                        tl.fromTo(refs.root, {
                            opacity: 0,
                            backgroundImage: 'none'
                        }, {
                            opacity: 1,
                            backgroundImage: `linear-gradient(90deg, ${colorValues.START}, ${colorValues.END})`,
                            duration: 1.2,
                            ease: 'power3.out'
                        })
                        // Text animation: WS
                        tl.from(refs.ws, {
                            opacity: 0,
                            x: (i) => i === 0 ? -30 : 0,
                            duration: 0.6,
                            ease: 'back.out(1.7)',
                            stagger: 0.15
                        }, '-=0.8')
                        // Text animation: PRO
                        tl.from(refs.pro, {
                            opacity: 0,
                            y: (i) => i === 0 ? 20 : -20,
                            duration: 0.6,
                            ease: 'back.out(1.7)',
                            stagger: 0.15
                        }, '-=0.8')
                        return tl
                    }
                }
            },
            local: {
                'HOVER_IN': {
                    play: () => {
                        const tl = gsap.timeline()
                        // Угол градиента меняется (135deg), цвета "перетекают" (% меняется)
                        tl.to(refs.root, {
                            // backgroundImage: `linear-gradient(45deg, ${colorValues.END} 40%, ${colorValues.START} 60%)`,
                            backgroundImage: `linear-gradient(45deg, ${colorValues.END}, ${colorValues.START})`,
                            duration: 0.4,
                            ease: 'power2.inOut'
                        })
                        // Легкий "пулс" текста
                        // tl.to([refs.ws, refs.pro], {
                        //     scale: 1.05,
                        //     duration: 0.2,
                        //     stagger: 0.05
                        // }, '-=0.4')
                        return tl
                    }
                },
                'HOVER_OUT': {
                    play: () => {
                        const tl = gsap.timeline()
                        // Возврат к базовому состоянию (45deg)
                        tl.to(refs.root, {
                            // backgroundImage: `linear-gradient(45deg, ${colorValues.START} 48%, ${colorValues.END} 56%)`,
                            backgroundImage: `linear-gradient(45deg, ${colorValues.START}, ${colorValues.END})`,
                            duration: 0.4,
                            ease: 'power2.inOut'
                        })
                        // tl.to([refs.ws, refs.pro], {
                        //     scale: 1,
                        //     duration: 0.2,
                        //     stagger: 0.05
                        // }, '-=0.4')
                        return tl
                    }
                }
            }
        }
    }

    // 2. Анимации для FOOTER контекста
    if (context === 'footer') {
        return {
            global: {
                'GLOBAL_ENTER': {
                    runOnce: true,
                    isBlocking: false,
                    play: () => {
                        // "Просто появление, заполнения нет" - интерпретируем как простой reveal всего лого
                        const tl = gsap.timeline()
                        tl.fromTo(refs.root, {
                            opacity: 0,
                            y: 20
                        }, {
                            opacity: 1,
                            y: 0,
                            duration: 1,
                            ease: 'power3.out'
                        })
                        return tl
                    }
                }
            },
            scroll: {
                'REVEAL': {
                    triggerConfig: {
                        trigger: refs.root,
                        start: 'top 90%',
                        // markers: true,
                        toggleActions: 'play none none reverse'
                    },
                    play: (triggerCfg) => gsap.timeline({ scrollTrigger: triggerCfg })
                        .from(refs.root, { opacity: 0, y: 30, duration: 1 })
                }
            }
        }
    }

    return {}
}