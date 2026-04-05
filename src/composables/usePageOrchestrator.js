import { onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import { useBlockStore } from '@/stores/blockStore'
import { useNavigationStore } from '@/stores/navigationStore'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { DEFAULT_SCOPE } from '@/config/scopes.js'

const _activeKeys = new Map()

export function usePageOrchestrator(blockId, scheme, { fetch: resolveFetch }) {

    const route = useRoute()

    const uiStore = useUiStore()
    const { t } = useI18n()

    const isPageOwner = route.name === blockId || route.params.slug === blockId

    const blockStore      = blockId ? useBlockStore(blockId) : null
    const navStore        = useNavigationStore()
    const navigationStore = scheme.includes('structure') ? useNavigationStore() : null


    const headConfig = computed(() => {
        const page = uiStore.uiMainVars?.page || {}
        // const slug = resolveFetch(route)
        const lang =  uiStore.scope ? uiStore.scope: DEFAULT_SCOPE;

        if (!page.title) {
            return { title: t('ui.loading') }
        }

        return {
            title: page.title+' | '+t('ui.sitename') || t('ui.sitename'),
            meta: [
                {
                    name: 'description',
                    content:  page.title+' | '+t('ui.sitename') || t('ui.sitename')
                },

            ],
            htmlAttrs: { lang: lang }
        }
    })
    useHead(headConfig)

    const load = async () => {
        const slug = resolveFetch(route)
        const fetchKey = `${blockId}::${slug}::${uiStore.scope}`

        if (_activeKeys.get(blockId) === fetchKey) {
            console.log('⏭ skip', fetchKey)
            return
        }
        _activeKeys.set(blockId, fetchKey)

        console.info('\u{1F320} PageOrchestrator ->load:' , scheme, resolveFetch(route))

        //console.log('load triggered', blockId, new Error().stack.split('\n')[2])

        // Навигация — параллельно с контентом, не блокирует друг друга
/*        const navPromise = navStore.nav.length === 0
            ? navigationStore.fetchNavigation(uiStore.scope)
            : Promise.resolve()*/


        if(navStore.nav.length === 0 || uiStore.scope !== navStore.scope)
        {
            await navStore.fetchNavigation(uiStore.scope)
        }


        if (scheme.includes('structure'))         await navigationStore.fetchStructure(slug)
        if (scheme.includes('category') && blockStore) await blockStore.fetchBlockCategory(slug)
        if (scheme.includes('item') && blockStore)     await blockStore.fetchBlockItem(slug)

        // await navPromise

        if (isPageOwner) {
            uiStore.buildPageVars({
                structure: navigationStore?.structure ?? null,
                category:  blockStore?.category ?? null,
                item:      blockStore?.item ?? null,
            })
        }
    }

    onMounted(load)

    watch(
        () => [route.params.slug, uiStore.scope],
        ([ns, nsc], [os, osc]) => {
            if (ns !== os || nsc !== osc) load()
        }
    )

    return { blockStore, navigationStore }
}