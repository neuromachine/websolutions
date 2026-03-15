export const SECTIONS_CONFIG = {
    ru: {
        code: 'ru',
        // locale: 'ru-RU',
        locale: 'ru',
        label: 'RU',
        default: true,
    },
    en: {
        code: 'en',
        // locale: 'en-US',
        locale: 'en',
        label: 'EN',
        default: false,
    },
}

export const DEFAULT_SECTION = Object.keys(SECTIONS_CONFIG)
    .find(key => SECTIONS_CONFIG[key].default)  // 'ru'

export const VALID_SECTIONS = Object.keys(SECTIONS_CONFIG) // ['ru', 'en']