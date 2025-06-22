import { createRouter, createWebHistory} from 'vue-router'
import { useUiStore } from '@/stores/uiStore'; // Импорт стора
import $ from 'jquery'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/compred',
        name: 'compred',
        component: () => import('@/views/Compred.vue'),
    },
    {
        path: '/page/:slug',
        name: 'page',
        component: () => import('@/views/Page.vue'),
    },
    {
        path: '/portfolio',
        name: 'portfolio',
        component: () => import('@/views/Portfolio.vue'),
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
    // {
    //     path: '/service/:slug',
    //     name: 'service_item',
    //     component: () => import('@/views/ServiceItem.vue'),
    // },
    {
        path: '/blocks/item/:slug',
        name: 'blocks_item',
        component: () => import('@/views/blocks/Item.vue'),
    },
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
/*    $('.preloader').removeClass('preloader-deactivate'); // Показываем прелоадер*/
    const uiStore = useUiStore(); // Получаем доступ к стору
    uiStore.setIsOpen(false); // Устанавливаем isOpen в false перед каждым переходом
    next(); // Продолжаем навигацию
});

router.afterEach(() => {
/*    setTimeout(() => {
        $('.preloader').addClass('preloader-deactivate'); // Скрываем прелоадер после завершения перехода
    }, 500); // Даем небольшой запас, если надо*/

    setTimeout(() => {
        $("html, body").animate({ scrollTop: "0" }, 100); // Прокручиваем к верхнему краю страницы
    }, 100); // Даем небольшой запас, если надо
});

export default router