import { defineStore } from 'pinia';
import { useUiStore } from '@/stores/uiStore';
import api from "@/utils/api.js";

export const useNavigationStore = defineStore('navigationStore', {
    state: () => ({
        structure: null,

        isLoading: false,
        strReady: false,
        loading: false,
    }),
    getters:{
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
        setLoading(status) {
            this.isLoading = status;
        },
        getLoadingStatus(state) {
            return state.isLoading;
        },
    },
    actions: {
        async fetchStructure(slug) {
            const uiStore = useUiStore()
            uiStore.startGlobalLoading()
            //this.setLoading(true)
            try {
                const { data: { data } } = await api.get(`${uiStore.uiMainVars.section}/blocks/categories/structure/${slug}`)
                uiStore.setMainVars(data)
                this.structure = data
                this.strReady = true
            } catch (err) {
                console.error('Ошибка fetchStructure:', err)
            } finally {
                uiStore.stopGlobalLoading()
                //this.setLoading(false)
            }
        },
    }
});