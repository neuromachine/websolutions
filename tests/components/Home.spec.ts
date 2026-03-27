// tests/components/Home.spec.ts
import { describe, it, expect , vi} from 'vitest'
import Home from '@/views/Home.vue'
import { mountWithPlugins } from '~tests/utils/mountWithPlugins'  // ← новый импорт
import { useUiStore } from '@/stores/uiStore'
import { useDataStore} from '@/stores/dataStore.js';


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

        expect(wrapper.find('.preloader').exists()).toBe(true)
        // пока не трогаем сторы — просто проверяем, что компонент смонтировался
    })
})