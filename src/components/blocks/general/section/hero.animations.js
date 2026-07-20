import gsap from 'gsap'

export const getHeroAnimations = () => {
    return {
        global: {
            'GLOBAL_ENTER': {
                // runOnce: true,
                isBlocking: false,
                play: () => {
                    const tl = gsap.timeline()

                    tl.from('h6, h1, p, .banner-btn', {
                        x: -60,
                        opacity: 0,
                        duration: 1.2,
                        ease: 'power2.out',
                        stagger: 0.25,
                    })

                    return tl
                }
            }
        }
    }
}