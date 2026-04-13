import gsap from 'gsap'

export const getServicesAnimations = (refs) => {
    return {
        scroll: {
            'SERVICES_REVEAL': {

                play: () => {
                    const mm = gsap.matchMedia()

                    // DESCTOP
                    mm.add("(min-width: 768px)", () => {
                        gsap.from('.d-flex', {
                            y: 80,
                            opacity: 0,
                            duration: 1.2,
                            ease: 'power2.out',
                            stagger: 0.3,
                            scrollTrigger: {
                                trigger: refs.servicesContent,
                                start: "top 70%",
                                toggleActions: 'play none none reverse'
                            }
                        })
                    })

                    // MOBILE
                    mm.add("(max-width: 767px)", () => {
                        // Take Cards array
                        const cards = gsap.utils.toArray('.d-flex')

                        // TO card
                        cards.forEach(card => {
                            gsap.from(card, {
                                y: 50,
                                opacity: 0,
                                duration: 0.8,
                                ease: 'power2.out',
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 70%",
                                    toggleActions: 'play none none reverse'
                                }
                            })
                        })
                    })

                    return mm
                }
            }
        }
    }
}