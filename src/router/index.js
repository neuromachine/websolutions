import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from './../views/HomeView.vue'
import ProductListView from './../views/ProductListView.vue'

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
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router