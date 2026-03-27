import { createPinia, setActivePinia } from 'pinia'
import { beforeEach } from 'vitest'
import { createI18n } from 'vue-i18n'

// Минимальный i18n для тестов (чтобы useI18n() не падал)
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: {
        ru: {}   // можно оставить пустым на старте
    }
})

beforeEach(() => {
    setActivePinia(createPinia())
})