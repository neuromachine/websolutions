import { createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
    },
    {
        path: '/services',
        name: 'services_list',
        component: () => import('@/views/ServicesList.vue'),
    },
    {
        path: '/service/:id',
        name: 'service_item',
        component: () => import('@/views/ServiceItem.vue'),
        // component: ServiceView
    },
    {
        path: '/page/:slug',
        name: 'page',
        component: () => import('@/views/Page.vue'),
    },
    {
        path: '/portfolio',
        name: 'portfolio_list',
        component: () => import('@/views/PortfolioList.vue'),
    },
    {
        path: '/portfolio/:slug',
        name: 'portfolio_item',
        component: () => import('@/views/PortfolioItem.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router