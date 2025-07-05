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
    // test
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
    {
        path: '/compred/:slug',
        name: 'compred',
        component: () => import('@/views/Compred.vue'),
    },

    /* legacy after here */



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

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {

    // Отправка события hit для текущей страницы
    window.ym?.(103176474, 'hit', to.path);

    // Отправка цели для конкретной страницы, например, /services
    if (to.path === '/') {
        window.ym?.(103176474, 'reachGoal', '443585915');
    }
    if (to.path === '/services') {
        window.ym?.(103176474, 'reachGoal', '443586111');
    }
    if (to.path === '/pages/contacts') {
        window.ym?.(103176474, 'reachGoal', '443586377');
    }

    const uiStore = useUiStore(); // Получаем доступ к стору
    uiStore.startGlobalLoading()
    uiStore.setIsOpen(false); // Устанавливаем isOpen в false перед каждым переходом
    uiStore.setHeaderVars('menu', true);// TODO: разобраться - рефакторинг

    next(); // Продолжаем навигацию
});

router.afterEach(() => {
    if (import.meta.env.VITE_PROD === 'true' && typeof ym === 'function') {
        ym(103176474, 'hit', to.fullPath)
    }
    setTimeout(() => {
        $("html, body").animate({ scrollTop: "0" }, 100); // Прокручиваем к верхнему краю страницы
    }, 100); // Даем небольшой запас, если надо
});

export default router