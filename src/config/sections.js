export const SECTIONS_CONFIG = {
    ru: {
        code: 'ru',
        locale: 'ru-RU',   // задел под vue-i18n
        label: 'RU',
        default: true,
    },
    eng: {
        code: 'eng',
        locale: 'en-US',
        label: 'EN',
        default: false,
    },
}

export const DEFAULT_SECTION = Object.keys(SECTIONS_CONFIG)
    .find(key => SECTIONS_CONFIG[key].default)  // 'ru'

export const VALID_SECTIONS = Object.keys(SECTIONS_CONFIG) // ['ru', 'eng']