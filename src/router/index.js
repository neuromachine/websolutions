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
        path: '/services',
        name: 'services_list',
        component: () => import('@/views/ServicesList.vue'),
    },
    {
        path: '/service/:slug',
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

router.beforeEach((to, from, next) => {
    $('.preloader').removeClass('preloader-deactivate'); // Показываем прелоадер
    const uiStore = useUiStore(); // Получаем доступ к стору
    uiStore.setIsOpen(false); // Устанавливаем isOpen в false перед каждым переходом
    next(); // Продолжаем навигацию
});

router.afterEach(() => {
    setTimeout(() => {
        $('.preloader').addClass('preloader-deactivate'); // Скрываем прелоадер после завершения перехода
    }, 500); // Даем небольшой запас, если надо

    setTimeout(() => {
        $("html, body").animate({ scrollTop: "0" }, 100); // Прокручиваем к верхнему краю страницы
    }, 100); // Даем небольшой запас, если надо
});

export default router