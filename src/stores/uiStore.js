import { defineStore } from 'pinia';
import { watch } from 'vue'
import { useBlockStore } from "@/stores/blockStore";

import { SCOPES_CONFIG, DEFAULT_SCOPE, VALID_SCOPES } from '@/config/sections.js'

export const useUiStore = defineStore('UiStore', {
    state: () => ({
        isGlobalLoading: false,
        isOpen: false, // status of Expand Menu

        // UI переменные
        uiMainVars: {
            debug: false,
            menu: false,
            section: DEFAULT_SCOPE,
            header: {
                head: true,
                navbar: true,
                menu: true,
                block:{},
            },
            compred: true,
            page: {
                title: 'Заголовок',
                key: '/',
                breadcrumbs: [{key: '/', title: 'Главная'}],
                parent: null,
                children: [],
                version: 'full',
                contacts:{
                    phone: 79282619061,
                }
            },
        },
    }),
    getters:{
        getGlobalLoading(state) {
            // const dataStore = useDataStore();
            const blockStore = useBlockStore('main')
            return state.isGlobalLoading || blockStore.getLoadingStatus; // Комбинируем состояния: если хоть где-то загрузка, возвращаем true
        },
        // Полный конфиг текущей секции — задел под i18n и прочие расширения
        currentSection(state) {
            return SCOPES_CONFIG[state.uiMainVars.section]
                ?? SCOPES_CONFIG[DEFAULT_SCOPE]
        },
        // Удобный прямой доступ к locale — для vue-i18n в будущем
        currentLocale() {
            return this.currentSection.locale
        },
    },
    actions: {
        buildPageVars({ structure = null, category = null, item = null }) {
            const crumbs = [{ key: '/', title: 'Главная' }]
            let title = 'Главная', key = '/', children = []

            if (structure) {
                crumbs.push({ key: structure.key, title: structure.name })
                title = structure.name; key = structure.key
                if (!category) children = Object.values(structure.child || {}).map(n => n.key)
            }
            if (category) {
                crumbs.push({ key: category.key, title: category.name })
                title = category.name; key = category.key
                if (!item) children = Object.values(category.children || {}).map(n => n.key)
            }
            if (item) {
                const itemTitle = item.properties?.title || title
                crumbs.push({ key: item.slug || key, title: itemTitle })
                title = itemTitle; key = item.slug || key
            }

            const parent = crumbs.length > 1 ? crumbs[crumbs.length - 2] : null
            this.uiMainVars.page = { ...this.uiMainVars.page, title, key, breadcrumbs: crumbs, parent, children }
        },
        // TODO: улучшить
        setMainVars(dataObj) {
            this.uiMainVars.page = {
                title:       dataObj?.name        || 'Заголовок',
                key:         dataObj?.key         || '/',
                breadcrumbs: dataObj?.breadcrumbs || [{ key: '/', title: 'Главная' }],
                parent:      dataObj?.parent      || null,
                children:    dataObj?.children    || [],
                version:     dataObj?.version     || 'full',
                contacts: {
                    phone: 79282619061,
                },
            }
        },
        setSection(value) {
            const normalized = String(value || '').trim()
            //console.info(normalized)

            // Fallback к default если секция не валидна или пустая
            this.uiMainVars.section = VALID_SCOPES.includes(normalized)
                ? normalized
                : DEFAULT_SCOPE
        },
        setUiVars(key, value) {
            //console.log('debug:setUiVars', key, value);
            this.uiMainVars[key] = value
        },
        setHeaderVars(key, value) {
            //console.log('debug: setHeaderVars', key, value);
            this.uiMainVars.header[key] = value;
        },
        setNavBarStatus(value)
        {
            //console.log('debug:setNavBarStatus', value);
            this.uiMainVars.header.navbar = value;
        },
        setVersionFull(value)
        {
            console.log('debug:setVersionFull', value);
            this.uiMainVars.page.version = value;
        },
        setIsOpen(value) {
            this.isOpen = value
        },
        setGlobalLoading(value) {
            this.isGlobalLoading = value;
        },
        startGlobalLoading() {
            this.isGlobalLoading = true;
        },
        stopGlobalLoading() {
            this.isGlobalLoading = false;
        },
        setup() {
            //const dataStore = useDataStore();
            const blockStore = useBlockStore('main')
            // Подписываемся на изменения isLoading в dataStore
            watch(
                () => blockStore.isLoading,
                (newValue) => {
                    this.isGlobalLoading = newValue; // Обновляем состояние UiStore
                }
            );
        }
    }
});
