import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './../views/HomeView.vue'
import ProductListView from './../views/ProductListView.vue'
import ServiceView from './../views/ServiceView.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/product-list',
        name: 'product-list',
        component: ProductListView
    },
    {
        path: '/service/:id',
        name: 'service',
        component: ServiceView
    },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router