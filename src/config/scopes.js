export const SCOPES_CONFIG = {
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

export const DEFAULT_SCOPE = Object.keys(SCOPES_CONFIG)
    .find(key => SCOPES_CONFIG[key].default)  // 'ru'

export const VALID_SCOPES = Object.keys(SCOPES_CONFIG) // ['ru', 'en']