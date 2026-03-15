import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import { RouterView } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import { useDataStore } from '@/stores/dataStore'
import { analytics } from '@/analytics'
import { portfolioRoutes } from './routes/portfolio'
import $ from 'jquery'

const routes = [
    {
        path: '/:section([^/]+)?',
        component: { render: () => h(RouterView) },
        children: [
            {
                path: '',
                name: 'main',
                component: () => import('@/views/Home.vue'),
            },
            {
                path: 'services',
                name: 'services',
                component: () => import('@/views/Services.vue'),
            },
            {
                path: 'direction/:slug',
                name: 'direction',
                component: () => import('@/views/Direction.vue'),
            },
            {
                path: 'group/:slug',
                name: 'group',
                component: () => import('@/views/Group.vue'),
            },
            {
                path: 'blocks/item/:slug',
                name: 'blocks_item',
                component: () => import('@/views/blocks/Item.vue'),
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
            ...portfolioRoutes,
        ],
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const uiStore = useUiStore()
    const routeSection = to.params.section ?? ''

    console.log('Router - current section: ', routeSection)

    // setSection сам обработает fallback — дополнительной логики здесь не нужно
    if (routeSection !== uiStore.uiMainVars.section) {
        console.log('SET section: ', routeSection)
        uiStore.setSection(routeSection)
    }

    const dataStore = useDataStore()
    dataStore.resetCategory()

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