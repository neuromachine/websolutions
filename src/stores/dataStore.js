import { defineStore } from 'pinia';
import { useUiStore } from '@/stores/uiStore';
import api from '@/utils/api.js';

export const useDataStore = defineStore('DataStore', {
    state: () => ({
        // Основные данные
        structure: null,
        category: null,
        item: null,
        overlay: null,

        // Статусы загрузки
        isLoading: false,
        OverlayLoading: false,
        strReady: false,
        catReady: false,
        itemReady: false,
        overlayReady: false,

        // UI переменные
        uiMainVars: {
            page: {
                title: 'Главная',
                key: '/',
                breadcrumbs: [{ key: '/', title: 'Главная' }],
                parent: null,
                children: []
            },
            overlay: null
        }
    }),

    getters: {
        isStrReady(state) {
            return (
                !state.isLoading &&
                state.structure !== null &&
                state.structure.child &&
                Object.keys(state.structure.child).length > 0
            );
        },
        isCatReady(state) {
            return !state.isLoading && state.category !== null;
        },
        isItemReady(state) {
            return !state.isLoading && state.item !== null;
        },
        isOverlayReady(state) {
            return !state.OverlayLoading && state.overlay !== null;
        }
    },

    actions: {
        setLoading(status) {
            this.isLoading = status;
        },
        setOverlayLoading(status) {
            this.OverlayLoading = status;
        },
        // Действие установки главной страницы
        setHome() {
            this.uiMainVars.page = {
                title: 'Главная',
                key: '/',
                breadcrumbs: [{ key: '/', title: 'Главная' }],
                parent: null,
                children: []
            };
        },
        // Обновление UI основных переменных страницы
        updatePageVars() {
            const crumbs = [{ key: '/', title: 'Главная' }];
            let title = 'Главная';
            let key = '/';

            // Структура уровня
            if (this.strReady) {
                crumbs.push({ key: this.structure.key, title: this.structure.name });
                title = this.structure.name;
                key = this.structure.key;
            }
            // Категория
            if (this.catReady) {
                crumbs.push({ key: this.category.key, title: this.category.name });
                title = this.category.name;
                key = this.category.key;
            }
            // Элемент
            if (this.itemReady) {
                const itemTitle = this.item.properties?.title || title;
                crumbs.push({ key: this.item.slug || key, title: itemTitle });
                title = itemTitle;
                key = this.item.slug || key;
            }

            // Родитель — предпоследний crumb
            const parent = crumbs.length > 1 ? crumbs[crumbs.length - 2] : null;

            // Дочерние элементы
            let children = [];
            if (this.strReady && !this.catReady) {
                children = Object.values(this.structure.child || {}).map(node => node.key);
            } else if (this.catReady && !this.itemReady) {
                children = Object.values(this.category.children || {}).map(node => node.key);
            }

            this.uiMainVars.page = {
                title,
                key,
                breadcrumbs: crumbs,
                parent,
                children
            };
        },
        // Обновление UI переменных overlay
        updateOverlayVars() {
            if (!this.isOverlayReady) {
                this.uiMainVars.overlay = null;
                return;
            }
            const title = this.overlay.name || '';
            this.uiMainVars.overlay = {
                title,
                key: this.overlay.key || '',
                breadcrumbs: [
                    { key: '/', title: 'Главная' },
                    { key: this.overlay.key || '', title }
                ],
                parent: { key: '/', title: 'Главная' },
                children: []
            };
        },

        // Получение данных
        async fetchStructure(slug) {
            const uiStore = useUiStore();
            uiStore.startGlobalLoading();
            this.setLoading(true);
            try {
                const { data: { data } } = await api.get(`blocks/categories/structure/${slug}`);
                this.structure = data;
                this.strReady = true;
                this.updatePageVars();
            } catch (err) {
                console.error('Ошибка fetchStructure:', err);
            } finally {
                uiStore.stopGlobalLoading();
                this.setLoading(false);
            }
        },
        async fetchBlockCategory(slug) {
            const uiStore = useUiStore();
            uiStore.startGlobalLoading();
            this.setLoading(true);
            try {
                const { data: { data } } = await api.get(`blocks/categories/${slug}`);
                this.category = data;
                this.catReady = true;
                this.updatePageVars();
            } catch (err) {
                console.error('Ошибка fetchBlockCategory:', err);
            } finally {
                uiStore.stopGlobalLoading();
                this.setLoading(false);
            }
        },
        async fetchBlockItem(slug) {
            const uiStore = useUiStore();
            uiStore.startGlobalLoading();
            this.setLoading(true);
            try {
                const { data: { data } } = await api.get(`blocks/items/${slug}`);
                this.item = data;
                this.itemReady = true;
                this.updatePageVars();
            } catch (err) {
                console.error('Ошибка fetchBlockItem:', err);
            } finally {
                uiStore.stopGlobalLoading();
                this.setLoading(false);
            }
        },
        async fetchOverlayCategory(slug) {
            try {
                this.setOverlayLoading(true);
                const { data: { data } } = await api.get(`blocks/categories/${slug}`);
                this.overlay = data;
                this.overlayReady = true;
                this.updateOverlayVars();
            } catch (err) {
                console.error('Ошибка fetchOverlayCategory:', err);
            } finally {
                this.setOverlayLoading(false);
            }
        }
    }
});
