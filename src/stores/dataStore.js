import { defineStore } from 'pinia';
import { useUiStore } from '@/stores/uiStore';
import api from "@/utils/api.js";

export const useDataStore = defineStore('dataStore', {
    state: () => ({
        overlay: null,
        category: null,

        OverlayLoading: false, // status of overlay window loading
        data: null,
        list: null,
        item: null,
        filter: '*',

        isLoading: false, // status of LOCAL loading
        catReady: false,
        itemReady: false,
        loading: false,
    }),
    getters:{
        isDataReady(state) {
            return !!(
                !state.isLoading &&
                state.data !== null &&
                Object.keys(state.data).length
            );
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
            return Math.floor(state.item?.properties?.price / 1000) || 0;
        },
        getLoadingStatus(state) {
            return state.isLoading;
        },
    },
    actions: {
        resetCategory() {
            this.category = null
        },
        setLoading(status) {
            this.isLoading = status;
        },
        setFilter(key) {
            this.filter = key
        },
        //async sendOfferRequest(id,contact)
        /*
        async sendOfferRequest(contact)
        {
            const uiStore = useUiStore()
            uiStore.startGlobalLoading()
            this.setLoading(true)

            //
            const data = {
                id: 1202,
                contact: contact,
            };

            try {
                const response = await api.post('offers/request', data);
                const status = response.data.status;
                console.log(status)
                console.log(response)
            } catch (err) {
                console.error('Ошибка API:', err);
            } finally {
                uiStore.stopGlobalLoading()
                this.setLoading(false)
            }
        },

         */
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
        async fetchBlockCategory(slug) {
            const uiStore = useUiStore()

            console.log('fetchBlockCategory - slug:',slug)
            console.log('fetchBlockCategory - this.category?.key:',this.category?.key)
            console.log('fetchBlockCategory - uiStore.uiMainVars.section:',uiStore.uiMainVars.section)

            if (this.category?.key === slug && this.category.section === uiStore.uiMainVars.section)
            {
                console.log('fetchBlockCategory - OUT:',this.category?.key === slug)
                uiStore.stopGlobalLoading()
                return false
            }

            uiStore.startGlobalLoading()
            this.setLoading(true)
            try {
                const { data: { data } } = await api.get(`${uiStore.uiMainVars.section}/blocks/categories/${slug}`)
                uiStore.setMainVars(data)
                this.category = data
                this.catReady = true
            } catch (err) {
                console.error('Ошибка fetchBlockCategory:', err)
            } finally {
                uiStore.stopGlobalLoading()
                this.setLoading(false)
            }
        },
        async fetchBlockItem(slug) {
            const uiStore = useUiStore()
            uiStore.startGlobalLoading()
            this.setLoading(true)
            try {
                const { data: { data } } = await api.get(`${uiStore.uiMainVars.section}/blocks/items/${slug}`)
                uiStore.setMainVars(data)
                this.item = data
                this.itemReady = true
            } catch (err) {
                console.error('Ошибка fetchBlockItem:', err)
            } finally {
                uiStore.stopGlobalLoading()
                this.setLoading(false)
            }
        },
    }
});