import { defineStore } from 'pinia'
import { useUiStore } from '@/stores/uiStore'
import api from '@/utils/api.js'
import { unwrapResourceData, unwrapFlatData } from '@/utils/apiResponse.js'

const _registry = new Map()

function createBlockStoreDefinition(id) {
    return defineStore(`block/${id}`, {
        state: () => ({
            category: null,
            item: null,
            overlay: null,
            filter: '*',

            isLoading: false,
            catReady: false,
            itemReady: false,
            OverlayLoading: false,
        }),
        getters: {
            getLoadingStatus(state) {
                return state.isLoading;
            },
            isCatReady:     (s) => !s.isLoading && s.category !== null,
            isItemReady:    (s) => !s.isLoading && s.item !== null,
            isOverlayReady: (s) => !s.OverlayLoading && s.overlay !== null,
            isHaveItems(state) {
                return !!(
                    state.category?.blocks?.[0]?.items && // TODO: legacy - структура изменилась
                    Object.keys(state.category.blocks[0].items).length
                )
            },
            isHaveSubCat(state) {
                return !!(
                    state.category?.children &&
                    Object.keys(state.category.children).length
                )
            },
            isHaveSubCategories(state) {
                return !!(
                    state.category?.subcategories &&
                    Object.keys(state.category.subcategories).length
                )
            },
            // TODO: restructure the data format and filtering principle
            filteredItems(state) {
                const works = state.category?.sections?.works || {}
                // Конвертируем объект {slug: properties} → [{slug, ...properties}]
                const items = Object.entries(works).map(([slug, data]) => ({ slug, ...data }))

                if (state.filter === '*') return items
                return items.filter(item =>
                    (item.workclass || []).some(c => c.key === state.filter)
                )
            },
            //getItemPrice: (s) => Math.floor(s.item?.properties?.price / 1000) || 0,
            getItemPrice: (s) => Math.floor(s.item?.properties?.price / 1000) || 0,
        },
        actions: {
            resetCategory() { this.category = null; this.catReady = false },
            resetItem() { this.item = null; this.itemReady = false },
            setFilter(key)  { this.filter = key },
            setLoading(v)   { this.isLoading = v },



            async fetchBlockCategory(slug) {
                const uiStore = useUiStore()
                if (
                    this.category?.key === slug &&
                    this.category.scope === uiStore.scope
                ) {
                    uiStore.stopGlobalLoading()
                    return false
                }
                uiStore.startGlobalLoading()
                this.setLoading(true)
                try {
                    const response = await api.get(
                        `${uiStore.scope}/blocks/categories/${slug}`
                    )
                    this.category = unwrapResourceData(response)
                    this.catReady = true
                } catch (err) {
                    console.error('fetchBlockCategory:', err)
                } finally {
                    this.resetItem()
                    uiStore.stopGlobalLoading()
                    this.setLoading(false)
                }
            },

            async fetchBlockItem(slug) {
                const uiStore = useUiStore()
                uiStore.startGlobalLoading()
                this.setLoading(true)
                try {
                    const response = await api.get(
                        `${uiStore.scope}/blocks/items/${slug}`
                    )
                    this.item = unwrapResourceData(response)
                    this.itemReady = true
                } catch (err) {
                    console.error('fetchBlockItem:', err)
                } finally {
                    uiStore.stopGlobalLoading()
                    this.setLoading(false)
                }
            },
            async fetchOverlayCategory(slug) {
                this.OverlayLoading = true
                try {
                    const response = await api.get(`${useUiStore().scope}/blocks/categories/${slug}`)
                    this.overlay = unwrapResourceData(response)
                } catch (err) {
                    console.error('fetchOverlayCategory:', err)
                } finally {
                    this.OverlayLoading = false
                }
            },

            async fetchFlatOffers(slug) {
                const uiStore = useUiStore()
                uiStore.startGlobalLoading()
                this.setLoading(true)
                try {
                    const response = await api.get(
                        `${uiStore.scope}/blocks/categories/offers/${slug}`
                    )
                    // Currently maps to item state, but could map to custom state.
                    // This creates a safe path for future rendering work.
                    this.item = unwrapFlatData(response)
                    this.itemReady = true
                } catch (err) {
                    console.error('fetchFlatOffers:', err)
                } finally {
                    uiStore.stopGlobalLoading()
                    this.setLoading(false)
                }
            },
        },
    })
}
export function useBlockStore(id) {
    if (!_registry.has(id)) {
        _registry.set(id, createBlockStoreDefinition(id))
    }
    return _registry.get(id)()  // ← вызов useStore() — всегда тот же инстанс
}