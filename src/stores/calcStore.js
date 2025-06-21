import { defineStore } from 'pinia';
import api from "@/utils/api.js";

export const useCalcStore = defineStore('CalcStore', {
    state: () => ({
        bread: null,
        structure: null,
        overlay: null,
        category: null,
        tree: null,

        OverlayLoading: false, // status of overlay window loading
        data: null,
        list: null,
        item: null,
        filter: '*',

        isLoading: false, // status of global loading
        strReady: false,
        catReady: false,
        itemReady: false,
        loading: false
    }),
    getters:{
        breadcrumbs: (state) => {
            const crumbs = [{ title: 'Главная', link: '/' }]

            if (state.strReady && state.structure?.name && state.structure?.key) {
                crumbs.push({
                    title: state.structure.name,
                    link: `/${state.structure.key}`
                })
            }

            if (state.itemReady && state.item?.properties?.title) {
                crumbs.push({ title: state.item.properties.title, link: null })
            } else if (state.catReady && state.category?.name && state.category?.key) {
                crumbs.push({
                    title: state.category.name,
                    link: `/${state.structure?.key}/${state.category.key}`
                })
            }

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
        async fetchStructure(slug) {
            this.loading = true
            try {
                const { data: { data } } = await api.get(`blocks/categories/structure/${slug}`)
                this.structure = data
                this.strReady = true
            } catch (err) {
                console.error('Ошибка fetchStructure:', err)
            } finally {
                this.loading = false
            }
        },

        async fetchBlockCategory(slug) {
            this.loading = true
            try {
                const { data: { data } } = await api.get(`blocks/categories/${slug}`)
                this.category = data
                this.catReady = true
            } catch (err) {
                console.error('Ошибка fetchBlockCategory:', err)
            } finally {
                this.loading = false
            }
        },

        async fetchBlockItem(slug) {
            this.loading = true
            try {
                const { data: { data } } = await api.get(`blocks/items/${slug}`)
                this.item = data
                this.itemReady = true
            } catch (err) {
                console.error('Ошибка fetchBlockItem:', err)
            } finally {
                this.loading = false
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