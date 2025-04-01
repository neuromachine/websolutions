// import { createRouter, createMemoryHistory} from 'vue-router'
import { createRouter, createWebHistory} from 'vue-router'

import HomeView from './../views/HomeView.vue'
// import ProductListView from './../views/ProductListView.vue'
// import ServiceView from './../views/ServiceView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    /*
    {
        path: '/product-list',
        name: 'product-list',
        component: ProductListView
    },
    */
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
        path: '/portfolio/:slug',
        name: 'portfolio_item',
        component: () => import('@/views/PortfolioItem.vue'),
    },
]

const router = createRouter({
    // history: createMemoryHistory(),
    history: createWebHistory(),
    routes,
})

export default router