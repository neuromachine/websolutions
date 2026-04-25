import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, vi } from 'vitest'
import { createI18n } from 'vue-i18n'

// Mock for window.matchMedia required by GSAP
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

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