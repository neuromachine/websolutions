const GOALS = {
    home:     '443585915',
    services: '443586111',
    contacts: '443586377',
}

export const ymTracker = {
    hit(to) {
        window.ym?.(103176474, 'hit', to.fullPath)
    },
    goal(to) {
        const name = to.name
        if (name === 'home') window.ym?.(103176474, 'reachGoal', GOALS.home)
        if (name === 'services') window.ym?.(103176474, 'reachGoal', GOALS.services)
        if (name === 'page' && to.params.slug === 'contacts') {
            window.ym?.(103176474, 'reachGoal', GOALS.contacts)
        }
    }
}