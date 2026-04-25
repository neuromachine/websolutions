export const servicesRoutes = [
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
]