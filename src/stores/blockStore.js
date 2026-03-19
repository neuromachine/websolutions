import { defineStore } from 'pinia'
import { useUiStore } from '@/stores/uiStore'
import api from '@/utils/api.js'

export function useBlockStore(id) {
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
                    state.category?.blocks?.[0]?.items &&
                    Object.keys(state.category.blocks[0].items).length
                )
            },
            isHaveSubCat(state) {
                return !!(
                    state.category?.children &&
                    Object.keys(state.category.children).length
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
            getItemPrice: (s) => Math.floor(s.item?.properties?.price / 1000) || 0,
        },
        actions: {
            resetCategory() { this.category = null; this.catReady = false },
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
                    const { data: { data } } = await api.get(
                        `${uiStore.scope}/blocks/categories/${slug}`
                    )
                    this.category = data
                    this.catReady = true
                } catch (err) {
                    console.error('fetchBlockCategory:', err)
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
                    const { data: { data } } = await api.get(
                        `${uiStore.scope}/blocks/items/${slug}`
                    )
                    this.item = data
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
                    this.overlay = (await api.get(`${uiStore.scope}/blocks/categories/${slug}`)).data.data
                } catch (err) {
                    console.error('fetchOverlayCategory:', err)
                } finally {
                    this.OverlayLoading = false
                }
            },
        },
    })()  // ← вызов defineStore сразу возвращает composable, () вызывает его
}