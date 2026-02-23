// tests/components/Home.spec.ts
import { describe, it, expect , vi} from 'vitest'
import Home from '@/views/Home.vue'
import { mountWithPlugins } from '~tests/utils/mountWithPlugins'  // ← новый импорт
import { useUiStore } from '@/stores/uiStore'
import { useDataStore} from '@/stores/dataStore.js';


describe('Home view', () => {
    it('smoke test', async () => {
        const wrapper = await mountWithPlugins(Home, {}, '/')   // начальный маршрут '/'

        expect(wrapper.exists()).toBe(true)
        expect(wrapper.text()).toContain('Надёжные web-решения')
    })

    it('button exists', async () => {
        const wrapper = await mountWithPlugins(Home)

        const button = wrapper.find('button')
        expect(button.exists()).toBe(true)
        // или точнее: wrapper.find('[data-testid="submit-btn"]')
    })

    it('reaction to isLoading from uiStore', async () => {
        const wrapper = await mountWithPlugins(Home, {}, '/')

        const uiStore = useUiStore(wrapper.vm.$pinia)

        uiStore.isGlobalLoading = false
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.preloader').exists()).toBe(true)
        expect(wrapper.find('.preloader-deactivate').exists()).toBe(true)   // загрузки нет → прелоадер скрыт

        uiStore.isGlobalLoading = true
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.preloader-deactivate').exists()).toBe(false)  // загрузка есть → класс пропал → прелоадер виден

        uiStore.isGlobalLoading = false
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.preloader-deactivate').exists()).toBe(true)   // загрузки нет → класс вернулся → прелоадер скрыт
    })
})