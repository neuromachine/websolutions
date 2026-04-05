import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'

export function usePageData(fetchFn) {
    const route = useRoute()
    const uiStore = useUiStore()

    const load = () => fetchFn(route)

    onMounted(load)

    // Следим за slug И за section — оба триггерят перезагрузку
    watch(
        () => [route.params.slug, uiStore.uiMainVars.section],
        ([newSlug, newSection], [oldSlug, oldSection]) => {
            if (newSlug !== oldSlug || newSection !== oldSection) load()
        }
    )
}