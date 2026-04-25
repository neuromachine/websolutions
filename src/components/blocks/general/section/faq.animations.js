import gsap from 'gsap'

export const getFaqAnimations = (refs) => {
    return {
        scroll: {
            'FAQ_ILLUSTRATION_REVEAL': {
                triggerConfig: {
                    trigger: refs.faqSection, // Триггер строго по секции, как вы и просили
                    start: 'top 60%',
                    toggleActions: 'play none none reverse'
                },
                play: (triggerCfg) => {
                    const tl = gsap.timeline({ scrollTrigger: triggerCfg })

                    // 1. Появляется телефон
                    tl.from(refs.phone, { opacity: 0, duration: 0.8, ease: 'power2.out' })

                        // 2. Вылетает l_man слева (x: -30)
                        .from(refs.l_man, { x: -30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')

                        // 3. Вылетает r_man справа (x: 30) следом
                        .from(refs.r_man, { x: 30, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.6')

                        // 4. Proto выезжает из-под телефона (x: 300)
                        .from(refs.proto, {
                            x: 300,
                            opacity: 0,
                            duration: 1.2,
                            ease: 'power2.out',
                            // onComplete: () => {
                            //     // ТРЮК С Z-INDEX: Перекидываем proto в конец SVG, чтобы он лег поверх телефона
                            //     if (refs.proto && refs.proto.parentNode) {
                            //         refs.proto.parentNode.appendChild(refs.proto)
                            //     }
                            // },
                            // onReverseComplete: () => {
                            //     // Возвращаем proto обратно под телефон при обратном скролле
                            //     if (refs.proto && refs.phone && refs.phone.parentNode) {
                            //         refs.phone.parentNode.insertBefore(refs.proto, refs.phone)
                            //     }
                            // }
                        }, '-=0.8')

                    return tl
                }
            }
        }
    }
}