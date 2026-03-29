import {defineStore} from 'pinia';

import {DEFAULT_SCOPE, SCOPES_CONFIG, VALID_SCOPES} from '@/config/scopes.js'

export const useUiStore = defineStore('UiStore', {
    state: () => ({
        _loadingCount: 0,
        isOpen: false, // status of Expand Menu

        scope: DEFAULT_SCOPE,

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
                meta: {},
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
        isGlobalLoading: (state) => state._loadingCount > 0,
        currentScope(state) {
            return SCOPES_CONFIG[state.scope]
                ?? SCOPES_CONFIG[DEFAULT_SCOPE]
        },
        // Удобный прямой доступ к locale — для vue-i18n в будущем
        currentLocale() {
            return this.currentScope.locale
        },
    },
    actions: {
        startGlobalLoading() { this._loadingCount++ },
        stopGlobalLoading()  { this._loadingCount = Math.max(0, this._loadingCount - 1) },
        buildPageVars({ structure = null, category = null, item = null }) {

            const crumbs = [{ key: '/', title: 'Главная' }]
            let title = 'Главная', key = '/', children = [] // TODO: make using scopes

            if (structure) {
                crumbs.push({ key: structure.key, title: structure.name })
                title = structure.name; key = structure.key
                if (!category) children = Object.values(structure.child || {}).map(n => n.key)
            }
            if (category) {
                crumbs.push({ key: category.key, title: category.name })
                title = category.name; key = category.key
                if(category.content?.title) title = category.content.title // TODO: change
                if (!item) children = Object.values(category.children || {}).map(n => n.key)
            }
            if (item) {
                crumbs.push({ key: item.slug || key, title: item.name })
                title = item?.name || item.properties?.title || title;
                key = item.slug || key;
                if(item?.properties && item.properties?.title) title = item.properties.title // TODO: change
            }

            const parent = crumbs.length > 1 ? crumbs[crumbs.length - 2] : null
            this.uiMainVars.page = { ...this.uiMainVars.page, title, key, breadcrumbs: crumbs, parent, children }
        },
        setScope(value) {
            const normalized = String(value || '').trim()
            //console.info(normalized)

            // Fallback к default если секция не валидна или пустая
            this.scope = VALID_SCOPES.includes(normalized)
                ? normalized
                : DEFAULT_SCOPE
        },
        setUiVars(key, value) {
            //console.log('debug:setUiVars', key, value);
            this.uiMainVars[key] = value
        },
        setPageTitle(value) {
            console.log('setPageTitle:', value);
            this.uiMainVars.page.title = value
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
    }
});
