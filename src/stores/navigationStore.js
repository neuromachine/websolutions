import { defineStore } from 'pinia';
import { useUiStore } from '@/stores/uiStore';
import api from "@/utils/api.js";
import { unwrapResourceData } from "@/utils/apiResponse.js";
import {normalizeLink} from "@/utils/normalizeLink.js";

import {DEFAULT_SCOPE, VALID_SCOPES} from '@/config/scopes.js'

export const useNavigationStore = defineStore('navigationStore', {
    state: () => ({
        structure: null,
        nav: [],
        scope: DEFAULT_SCOPE,

        isLoading: false,
        strReady: false,
        loading: false,
    }),
    getters:{
        isStrReady(state) {
            if(
                !state.isLoading &&
                state.structure !== null &&
                state.structure.child
                //state.structure.child && Object.keys(state.structure.child).length
            )
            {
                return true
            }
            else return false
        },
        getLoadingStatus(state) {
            return state.isLoading;
        },
    },
    actions: {
        setLoading(v)   { this.isLoading = v },
        setScope(v)   { this.scope = v },
        setReady(v)   { this.strReady = v },
        async fetchStructure(slug) {
            const uiStore = useUiStore()
            uiStore.startGlobalLoading()
            this.setLoading(true)
            try {
                const response = await api.get(`${uiStore.scope}/blocks/categories/structure/${slug}`)
                this.structure = unwrapResourceData(response)
                this.setReady(true)
            } catch (err) {
                console.error('Ошибка fetchStructure:', err)
            } finally {
                uiStore.stopGlobalLoading()
                this.setLoading(false)
            }
        },
        async fetchNavigation(scope) {
            const uiStore = useUiStore()
            uiStore.startGlobalLoading()

            //const scope = uiStore.scope;

            this.setLoading(true)
            try {
                const response = await api.get(`${scope}/blocks/blocks/navigation`)
                const data = unwrapResourceData(response)
                const raw = data.content || []
                // TODO: refactor data assignment
                this.nav = raw.map(item => ({
                    anchor: item.anchor,
                    path: normalizeLink(item.link, VALID_SCOPES),
                    sort: Number(item.sort) || 99,
                // })).sort((a, b) => a.sort - b.sort)
                }));
                this.setScope(scope)
            } catch (err) {
                console.error('fetchNavigation:', err)
            } finally {
                uiStore.stopGlobalLoading()
                this.setLoading(false)
            }
        },
    }
});