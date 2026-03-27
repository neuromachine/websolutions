import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import { useBlockStore } from '@/stores/blockStore'
import { useNavigationStore } from '@/stores/navigationStore'

export function usePageOrchestrator(blockId, scheme, { fetch: resolveFetch }) {
    const route = useRoute()
    const uiStore = useUiStore()

    const blockStore      = blockId ? useBlockStore(blockId) : null
    const navigationStore = scheme.includes('structure') ? useNavigationStore() : null

    const load = async () => {
        const slug = resolveFetch(route)

        console.info('\u{1F320} PageOrchestrator ->load:' , scheme, resolveFetch(route))

        if (scheme.includes('structure'))         await navigationStore.fetchStructure(slug)
        if (scheme.includes('category') && blockStore) await blockStore.fetchBlockCategory(slug)
        if (scheme.includes('item') && blockStore)     await blockStore.fetchBlockItem(slug)

        uiStore.buildPageVars({
            structure: navigationStore?.structure ?? null,
            category:  blockStore?.category ?? null,
            item:      blockStore?.item ?? null,
        })
    }

    onMounted(load)

    watch(
        () => [route.params.slug, uiStore.uiMainVars.section],
        ([newSlug, newSection], [oldSlug, oldSection]) => {
            if (newSlug !== oldSlug || newSection !== oldSection) load()
        }
    )

    return { blockStore, navigationStore }
}