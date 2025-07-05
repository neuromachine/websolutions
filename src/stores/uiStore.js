import { defineStore } from 'pinia';
import { useDataStore} from '@/stores/dataStore.js';

export const useUiStore = defineStore('UiStore', {
    state: () => ({
        isGlobalLoading: false,
        isOpen: false, // status of Expand Menu

        // UI переменные
        uiMainVars: {
            debug: true,
            menu: false,
            header: {
                head: true,
                navbar: true,
                block:{},
            },
            compred: true,
            page: {
                title: 'Заголовок',
                key: '/',
                breadcrumbs: [{key: '/', title: 'Главная'}],
                parent: null,
                children: [],
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
        }
    },
    actions: {
        setUiVars(key, value) {
            console.log('debug:setUiVars', key, value);
            console.log('debug:setUiVars - Setting menu to:', value);
            this.uiMainVars[key] = value;
        },
        // TODO: улучшить
        setMainVars(dataObj) {
            //console.log(dataObj);
            this.uiMainVars.page = {
                title: dataObj?.name || 'Заголовок',
                key: dataObj?.key || '/',
                breadcrumbs: dataObj?.breadcrumbs || [{ key: '/', title: 'Главная' }],
                parent: dataObj?.parent || null,
                children: dataObj?.children || [],
                contacts:{
                    phone: 79282619061,
                }
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