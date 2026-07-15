import gsap from 'gsap'

export const getIconAnimations = (refs) => {
    return {
        scroll: {
            'ICON_REVEAL': {
                triggerConfig: {
                    trigger: refs.iconWrap,
                    start: 'top 50%',
                    toggleActions: 'play none none reverse'
                },
                play: (triggerCfg) => {
                    const tl = gsap.timeline({ scrollTrigger: triggerCfg })

                    // 1.
                    tl.from(refs.stroke, { opacity: 0, duration: 0.3, ease: 'power2.out' })

                        // 2.
                        .from(refs.fill, { opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')

                    return tl
                }
            }
        }
    }
}