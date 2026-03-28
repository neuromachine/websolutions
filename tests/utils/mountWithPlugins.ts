// tests/utils/mountWithPlugins.ts
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createTestRouter } from './createTestRouter'
import { testI18n } from './testI18n'

// Грубая заглушка для useHead
const mockHeadPlugin = {
    install(app) {
        app.provide('usehead', {
            push: () => {},
            unhead: { hooks: {} }
        })
    }
}

export async function mountWithPlugins(component, options = {}, initialRoute = '/') {
    const pinia = createTestingPinia({
        stubActions: true,
        fakeApp: true,
    })

    const router = createTestRouter(initialRoute)
    await router.isReady()

    return mount(component, {
        ...options,
        global: {
            plugins: [pinia, router, testI18n, mockHeadPlugin],
            stubs: {
                AppLink: true,
                'router-link': true,
            },
            ...options.global,
        },
    })
}