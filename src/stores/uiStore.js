import { defineStore } from 'pinia';
import api from "@/utils/api.js";

export const useUiStore = defineStore('ui', {
    state: () => ({
        isOpen: false, // status of menu
        isLoading: false, // status of global loading
        data: null,
        list: null,
        item: null,
        filter: '*',
    }),
    getters:{
        filteredItems(state) {
            if (state.filter === '*') return state.list.items
            return state.list.items.filter(item => {
                return item.properties.workclass.key === state.filter
            })
        }
    },
    actions: {
        setIsOpen(value) {
            this.isOpen = value; // Метод для изменения состояния
        },
        setIsLoading(value) {
            this.isLoading = value; // Установка статуса загрузки страницы
        },
        // TODO: ввести проверку поступивших данных, а так же ввести типовой формат ответа
        async fetchItem(slug) {
            try {
                this.isLoading = true;
                this.item = (await api.get('/item/'+slug)).data;
                this.isLoading = false;
            } catch (err) {
                console.error('Ошибка API:', err);
            }
        },
        // TODO: ввести проверку поступивших данных, а так же ввести типовой формат ответа
        async fetchCategory(slug) {
            try {
                this.isLoading = true;
                this.data = (await api.get('/tree/'+slug)).data;
                this.isLoading = false;
            } catch (err) {
                console.error('Ошибка API:', err);
            }
        },
        // TODO: ввести проверку поступивших данных, а так же ввести типовой формат ответа
        async fetchAllPortfolio() {
            try {
                this.isLoading = true;
                this.list = (await api.get('/dictionaries/portfolio_item/items')).data;
                this.isLoading = false;
            } catch (err) {
                console.error('Ошибка API:', err);
            }
        }
    }
});