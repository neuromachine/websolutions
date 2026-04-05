const GA_ID = 'G-9BD9NGZGHB'

function isGtagReady() {
    return typeof window !== 'undefined' && typeof window.gtag === 'function'
}

export const gaTracker = {
    hit(to) {
        if (!isGtagReady()) return

        window.gtag('event', 'page_view', {
            page_title: to.meta?.title ?? document.title,
            page_location: window.location.href,
            page_path: to.fullPath,
        })
    },

    goal(to) {
        if (!isGtagReady()) return

        // Триггер: наличие поля meta.gaGoal в роуте
        const goalName = to.meta?.gaGoal
        if (!goalName) return

        window.gtag('event', goalName, {
            page_path: to.fullPath,
        })
    },
}