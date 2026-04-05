// tests/utils/testI18n.ts
import { createI18n } from 'vue-i18n'
import ru from '@/i18n/locales/ru.json'
// import en from '@/i18n/locales/en.json'

export const testI18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'ru',
    fallbackLocale: 'ru',
    messages: {
        ru,
        // en, // если нужно
    }
})