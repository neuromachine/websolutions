import { defineStore } from 'pinia';
import api from "@/utils/api.js";

export const useCalcStore = defineStore('CalcStore', {
    state: () => ({
        tree: null,
        isLoading: false, // status of global loading
        data: null,
        list: null,
        item: null,
    }),
    getters:{
        isTreeReady(state) {
            if(
                !state.isLoading &&
                state.tree !== null &&
                state.tree.children &&
                Object.keys(state.tree.children).length
            )
            {
                return true
            }
            else return false

            // return !!(!state.isLoading
            //     && state.tree !== null
            //     && Object.keys(state.tree.children).length);


        },
        isDataReady(state) {
            return !!(
                !state.isLoading &&
                state.data !== null &&
                Object.keys(state.data).length
            );
        }
    },
    actions: {
        async fetchTree(slug) {
            try {
                this.isLoading = true;
                this.tree = (await api.get('/tree/'+slug)).data;
                this.isLoading = false;
            } catch (err) {
                console.error('Ошибка API:', err);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchGroup(slug) {
            try {
                this.isLoading = true;
                this.data = (await api.get('/group/offers/'+slug)).data;
                this.isLoading = false;
            } catch (err) {
                console.error('Ошибка API:', err);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchCategory(slug) {
            try {
                //this.isLoading = true;
                const res = (await api.get('/dictionaries/'+slug+'/categories/tree')).data;
                // this.isLoading = false;
                console.log(res);
                return res;
            } catch (err) {
                console.error('Ошибка API:', err);
            }
        },
        // TODO: ввести проверку поступивших данных, а так же ввести типовой формат ответа
        async fetchItem(slug) {
            try {
                this.isLoading = true;
                this.item = (await api.get('/item/'+slug)).data; // TODO: дублирование см. fetchItemFromApi
                this.isLoading = false;
            } catch (err) {
                console.error('Ошибка API:', err);
            }
        },
        async fetchItemFromApi(slug) {
            return (await api.get('/item/'+slug)).data;
        },
        async fetchCategoryFromApi(slug) {
            try {
                return (await api.get('/cat/'+slug)).data;
            } catch (err) {
                console.error('Ошибка API:', err);
                return null;
            }
        },
    }
});