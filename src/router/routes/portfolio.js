export const portfolioRoutes = [
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
]