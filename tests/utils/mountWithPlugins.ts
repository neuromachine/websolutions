// tests/utils/mountWithPlugins.ts
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createTestRouter } from './createTestRouter'

export async function mountWithPlugins(
    component,
    options = {},
    initialRoute = '/'
) {

    const pinia = createTestingPinia({
        stubActions: true,
        fakeApp: true,
    })

    const router = createTestRouter(initialRoute)
    await router.isReady()   // ждём асинхронной инициализации + guards



    return mount(component, {
        ...options,
        global: {
            plugins: [pinia, router],
            ...options.global,
        },
    })
}