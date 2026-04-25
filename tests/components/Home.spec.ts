// tests/components/Home.spec.ts
import { describe, it, expect , vi} from 'vitest'
import Home from '@/views/Home.vue'
import { mountWithPlugins } from '~tests/utils/mountWithPlugins'  // ← новый импорт
import { useUiStore } from '@/stores/uiStore'



describe('Home view', () => {
    it('smoke test', async () => {
        const wrapper = await mountWithPlugins(Home, {}, '/')

        expect(wrapper.exists()).toBe(true)

        // Более устойчивый вариант проверки текста (учитывая i18n)
        const html = wrapper.html()
        expect(html).toContain('Оставьте нам свой контакт')           // частичное совпадение
        // или
        // expect(wrapper.text()).toContain('web-решения')
    })

    it('button exists', async () => {
        const wrapper = await mountWithPlugins(Home)

        const button = wrapper.find('button')
        expect(button.exists()).toBe(true)
        // или точнее: wrapper.find('[data-testid="submit-btn"]')
    })

    it('reaction to isLoading from uiStore', async () => {
        const wrapper = await mountWithPlugins(Home, {}, '/')
        const uiStore = useUiStore()

        // By default global loading is false, so preloader-wrapper is not in DOM due to v-if
        expect(wrapper.find('.preloader-wrapper').exists()).toBe(false)

        // Turn on loading (actions are stubbed by createTestingPinia, mutate state directly)
        uiStore._loadingCount = 1
        await wrapper.vm.$nextTick()

        // Now preloader should be visible
        expect(wrapper.find('.preloader-wrapper').exists()).toBe(true)
    })
})