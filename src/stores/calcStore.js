import { defineStore } from 'pinia';
import api from "@/utils/api.js";

export const useCalcStore = defineStore('CalcStore', {
    state: () => ({
        structure: null,
        category: null,
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
        },
        isDataReady(state) {
            return !!(
                !state.isLoading &&
                state.data !== null &&
                Object.keys(state.data).length
            );
        },
        isStrReady(state) {
            if(
                !state.isLoading &&
                state.structure !== null &&
                state.structure.child &&
                Object.keys(state.structure.child).length
            )
            {
                return true
            }
            else return false
        },
        isCatReady(state) { return !state.isLoading && state.category !== null },
        isItemReady(state) { return !state.isLoading && state.item !== null },
        // TODO: уточнить зачем state - нельзя работать с this?
        isHaveItems(state){
            if(
            state.category !== null &&
            state.category.blocks &&
                // TODO: не верная статика - 0
            state.category.blocks[0] &&
            state.category.blocks[0].items &&
            Object.keys(state.category.blocks[0].items).length
            ) return true
            else return false
        },
    },
    actions: {
        async fetchStructure(slug)
        {
            try {
                this.isLoading = true;
                this.structure = (await api.get('blocks/categories/structure/'+slug)).data.data;
                this.isLoading = false;
            } catch (err) {
                console.error('Ошибка API:', err);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchBlockCategory(slug)
        {
            try {
                this.isLoading = true;
                this.category = (await api.get('blocks/categories/'+slug)).data.data;
                this.isLoading = false;
                return true
            } catch (err) {
                console.error('Ошибка API:', err);
            } finally {
                this.isLoading = false;
            }
        },
        async fetchBlockItem(slug)
        {
            try {
                this.isLoading = true;
                this.item = (await api.get('blocks/items/'+slug)).data.data;
                this.isLoading = false;
                return true
            } catch (err) {
                console.error('Ошибка API:', err);
            } finally {
                this.isLoading = false;
            }
        },
        // TODO: legacy from list.vue
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
        // TODO: Legacy ? см. .item
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
        /*
        async fetchBlockCategory(slug) {
            try {
                return (await api.get('blocks/categories/'+slug)).data.data;
            } catch (err) {
                console.error('Ошибка API:', err);
                return null;
            }
        },
         */
    }
});