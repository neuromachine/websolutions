import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import { RouterView } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import { analytics } from '@/analytics'
import { servicesRoutes } from './routes/services'
import { portfolioRoutes } from './routes/portfolio'
import $ from 'jquery'
import {useNavigationStore} from "@/stores/navigationStore.js";

import { DEFAULT_SCOPE } from '@/config/scopes.js'

const routes = [
    {
        path: '/:scope([^/]+)?',
        component: { render: () => h(RouterView) },
        children: [
            {
                path: '',
                name: 'main',
                component: () => import('@/views/Home.vue'),
            },
            {
                path: 'pages/:slug',
                name: 'page',
                component: () => import('@/views/blocks/Page.vue'),
            },
            {
                path: 'compred/:slug',
                name: 'compred',
                component: () => import('@/views/Compred.vue'),
            },
            ...servicesRoutes,
            ...portfolioRoutes,
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async(to, from, next) => {
    const uiStore = useUiStore()
    const navStore = useNavigationStore()
    const newScope = to.params.scope ?? ''

    uiStore.setScope(newScope)
    await navStore.fetchNavigation(newScope || DEFAULT_SCOPE)

/*    if (newScope !== uiStore.scope) {
        uiStore.setScope(newScope)
        // навигация обновляется только при смене scope
        await navStore.fetchNavigation(newScope || DEFAULT_SCOPE)
    }*/

    uiStore.startGlobalLoading()
    uiStore.setIsOpen(false)
    uiStore.setHeaderVars('menu', true) // TODO: refactor

    next()
})

router.afterEach((to) => {

    analytics.hit(to)
    analytics.goal(to)

    setTimeout(() => {
        $('html, body').animate({ scrollTop: 0 }, 100)
    }, 100)
})

export default router
export { routes }