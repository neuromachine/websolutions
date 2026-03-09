import { createRouter, createWebHistory } from 'vue-router'
import { h } from 'vue'
import { RouterView } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
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
                name: 'home',
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
                path: 'price',
                name: 'price_list',
                component: () => import('@/views/PriceList.vue'),
            },
            {
                path: 'price/:slug',
                name: 'price_item',
                component: () => import('@/views/PriceItem.vue'),
            },
            {
                path: 'compred/:slug',
                name: 'compred',
                component: () => import('@/views/Compred.vue'),
            },
            /*
            {
                path: 'portfolio',
                name: 'portfolio',
                component: () => import('@/views/Portfolio.vue'),
            },
            {
                path: 'portfolio/item/:slug',
                name: 'portfolio_item',
                component: () => import('@/views/portfolio/Item.vue'),
            },
             */
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

    // setSection сам обработает fallback — дополнительной логики здесь не нужно
    if (routeSection !== uiStore.uiMainVars.section) {
        uiStore.setSection(routeSection)
    }

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