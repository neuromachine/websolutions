import { createRouter, createMemoryHistory } from 'vue-router'
import realRouter from '@/router/index.js'   // default export — твой реальный router

export function createTestRouter(initialPath = '/') {
    const router = createRouter({
        history: createMemoryHistory(),
        routes: realRouter.options.routes,   // ← вот здесь был undefined
    })

    router.push(initialPath)
    return router
}