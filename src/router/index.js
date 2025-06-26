import { createRouter, createWebHistory} from 'vue-router'
import { useUiStore } from '@/stores/uiStore';
import $ from 'jquery'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/services',
        name: 'services',
        component: () => import('@/views/Services.vue'),
    },
    {
        path: '/direction/:slug',
        name: 'direction',
        component: () => import('@/views/Direction.vue'),
    },
    {
        path: '/group/:slug',
        name: 'group',
        component: () => import('@/views/Group.vue'),
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        component: () => import('@/views/Portfolio.vue'),
    },
    {
        path: '/blocks/item/:slug',
        name: 'blocks_item',
        component: () => import('@/views/blocks/Item.vue'),
    },
    {
        path: '/pages/:slug',
        name: 'page',
        component: () => import('@/views/blocks/Page.vue'),
    },

    /* legacy after here */

    {
        path: '/compred',
        name: 'compred',
        component: () => import('@/views/Compred.vue'),
    },

/*    {
        path: '/portfolio/:slug',
        name: 'portfolio_item',
        component: () => import('@/views/PortfolioItem.vue'),
    },*/
    {
        path: '/portfolio/item/:slug',
        name: 'portfolio_item',
        component: () => import('@/views/portfolio/Item.vue'),
    },
    // {
    //     path: '/service/:slug',
    //     name: 'service_item',
    //     component: () => import('@/views/ServiceItem.vue'),
    // },
    {
        path: '/blog',
        name: 'blog_list',
        component: () => import('@/views/BlogList.vue'),
    },
    {
        path: '/blog/:slug',
        name: 'blog_item',
        component: () => import('@/views/BlogItem.vue'),
        // component: ServiceView
    },
    {
        path: '/price',
        name: 'price_list',
        component: () => import('@/views/PriceList.vue'),
    },
    {
        path: '/price/:slug',
        name: 'price_item',
        component: () => import('@/views/PriceItem.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const uiStore = useUiStore(); // Получаем доступ к стору
    uiStore.startGlobalLoading()
    uiStore.setIsOpen(false); // Устанавливаем isOpen в false перед каждым переходом
    next(); // Продолжаем навигацию
});

router.afterEach(() => {
    setTimeout(() => {
        $("html, body").animate({ scrollTop: "0" }, 100); // Прокручиваем к верхнему краю страницы
    }, 100); // Даем небольшой запас, если надо
});

export default router