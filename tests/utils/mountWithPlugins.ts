// tests/utils/mountWithPlugins.ts
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createTestRouter } from './createTestRouter'
import { testI18n } from './testI18n'

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
            plugins: [pinia, router, testI18n],   // ← добавили i18n
            stubs: {
                AppLink: true,           // ← заглушка для AppLink
                'app-link': true,
            },
            ...options.global,
        },
    })
}