import { defineStore } from 'pinia';
import api from "@/utils/api.js";

export const useUiStore = defineStore('ui', {
    state: () => ({
        isOpen: false, // status of menu
        isLoading: false, // status of global loading
        data: null,
        list: null,
        filter: '*',
    }),
    getters:{
        filteredItems(state) {
            // console.log('Items:', state.list?.items)
            // console.log('Filter:', state.filter)
            // console.log('Items count:', state.list.items.length)


            if (state.filter === '*') return state.list.items
            return state.list.items.filter(item => {
                //console.log('Item:', item)
                console.log('Item Key:', item.properties?.workclass?.key)
                console.log('Active F:', state.filter)
                return item.properties.workclass.key == state.filter
            })
        }
    },
    actions: {
        setIsOpen(value) {
            this.isOpen = value; // Метод для изменения состояния
        },
        // TODO: ввести проверку поступивших данных, а так же ввести типовой формат ответа
        async fetchCategory(slug) {
            try {
                this.isLoading = true;
                this.data = (await api.get('/tree')).data;
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