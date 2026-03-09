import { defineStore } from 'pinia';
import { watch } from 'vue'
import { useDataStore} from '@/stores/dataStore.js';
import { SECTIONS_CONFIG, DEFAULT_SECTION, VALID_SECTIONS } from '@/config/sections.js'

export const useUiStore = defineStore('UiStore', {
    state: () => ({
        isGlobalLoading: false,
        isOpen: false, // status of Expand Menu

        // UI переменные
        uiMainVars: {
            debug: false,
            menu: false,
            section: DEFAULT_SECTION,
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
            const dataStore = useDataStore();
            return state.isGlobalLoading || dataStore.getLoadingStatus; // Комбинируем состояния: если хоть где-то загрузка, возвращаем true
        },
        // Полный конфиг текущей секции — задел под i18n и прочие расширения
        currentSection(state) {
            return SECTIONS_CONFIG[state.uiMainVars.section]
                ?? SECTIONS_CONFIG[DEFAULT_SECTION]
        },
        // Удобный прямой доступ к locale — для vue-i18n в будущем
        currentLocale() {
            return this.currentSection.locale
        },
    },
    actions: {
        setSection(value) {
            const normalized = String(value || '').trim()

            // Fallback к default если секция не валидна или пустая
            this.uiMainVars.section = VALID_SECTIONS.includes(normalized)
                ? normalized
                : DEFAULT_SECTION
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
            const dataStore = useDataStore();
            // Подписываемся на изменения isLoading в dataStore
            watch(
                () => dataStore.isLoading,
                (newValue) => {
                    this.isGlobalLoading = newValue; // Обновляем состояние UiStore
                }
            );
        }
    }
});
