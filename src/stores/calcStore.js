import { defineStore } from 'pinia';
import api from "@/utils/api.js";

export const useCalcStore = defineStore('CalcStore', {
    state: () => ({
        bread: null,
        structure: null,
        overlay: null,
        category: null,
        tree: null,
        isLoading: false, // status of global loading
        OverlayLoading: false, // status of overlay window loading
        data: null,
        list: null,
        item: null,
        filter: '*',
    }),
    getters:{
        // возвращает массив «хлебных крошек»
        getBreadcrumbs: (state) => {
            const crumbs = [
                { title: 'Главная', link: '/' }
            ]

            if (state.bread) {
                crumbs.push({
                    title: state.bread.name,
                    link: '/' + state.bread.key
                })
            }
            console.log('Крошки:', crumbs)
            return crumbs
        },
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
        isOverlayReady(state) { return !state.OverlayLoading && state.overlay !== null },
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
        isHaveSubCat(state){
            if(
                state.category !== null &&
                state.category.children &&
                Object.keys(state.category.children).length
            ) return true
            else return false
        },
        filteredItems(state) {
            const items = state.category.blocks?.[0]?.items || []

            // если “все”
            if (state.filter === '*') {
                return items
            }

            // иначе — ищем, есть ли в массиве workclass нужный key
            return items.filter(item => {
                const classes = item.properties?.workclass || []
                return classes.some(c => c.key === state.filter)
            })
        },
        getItemPrice(state) {
            return Math.floor(state.item?.properties?.price / 10000) || 0;
        }
    },
    actions: {
        setFilter(key) {
            this.filter = key
        },
        async fetchOverlayCategory(slug)
        {
            try {
                this.OverlayLoading = true;
                this.overlay = (await api.get('blocks/categories/'+slug)).data.data; // TODO: разработать механизм (сервис) для повторяющихся запросов
                this.OverlayLoading = false;
            } catch (err) {
                console.error('Ошибка API:', err); // TODO: разработать механизм (сервис) для повторяющихся состояний
            } finally {
                this.OverlayLoading = false;
            }
        },
        async fetchStructure(slug)
        {
            try {
                this.isLoading = true
                // this.structure = (await api.get('blocks/categories/structure/'+slug)).data.data
                const response = await api.get('blocks/categories/structure/' + slug)
                const data = response.data.data
                console.log('API ответ structure:', data)
                this.structure = data
                this.bread =  data // передаем в хл. крошки
                console.log('После setBread, state.bread =', this.bread)
                this.isLoading = false
            } catch (err) {
                console.error('Ошибка API:', err)
            } finally {
                this.isLoading = false
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