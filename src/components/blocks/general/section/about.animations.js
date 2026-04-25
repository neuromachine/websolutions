import gsap from 'gsap'

export const getAboutAnimations = (refs) => {
    return {
        scroll: {
            'ABOUT_REVEAL': {
                triggerConfig: {
                    trigger: refs.svgRoot,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                },
                play: (triggerCfg) => {
                    const tl = gsap.timeline({ scrollTrigger: triggerCfg })

                    // 1. Слайд (фон) - fade in
                    tl.from(refs.slide, { opacity: 0, duration: 0.8, ease: 'power2.out' })

                        // 3. Девочка (снизу, из-за слайда)
                        .from(refs.girl, {
                            y: 400,
                            opacity: 0,
                            duration: 0.5,
                            ease: 'power2.out',
                            onComplete: () => {
                                // ТРЮК С Z-INDEX: Выдергиваем девочку и вставляем в конец SVG-контейнера
                                if (refs.girl && refs.girl.parentNode) {
                                    refs.girl.parentNode.appendChild(refs.girl)
                                }
                            },
                            onReverseComplete: () => {
                                // Откат: прячем девочку обратно за слайд при скролле вверх
                                if (refs.girl && refs.slide && refs.slide.parentNode) {
                                    refs.slide.parentNode.insertBefore(refs.girl, refs.slide)
                                }
                            }
                        }, '-=0.8')
                        // 2. Мальчик (слева) и Мужчина (справа)
                        .from(refs.boy, { x: -200, opacity: 0, duration: 1, ease: 'back.out(1.2)' }, '-=0.4')
                        .from(refs.man, { x: 200, opacity: 0, duration: 1, ease: 'back.out(1.2)' }, '<') // '<' стартует синхронно

                    return tl
                }
            }
        }
    }
}