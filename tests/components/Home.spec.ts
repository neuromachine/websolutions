// tests/components/Home.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

describe('Home view', () => {
    const createTestRouter = () =>
        createRouter({
            history: createWebHistory(),
            routes: [],
        })

    it('smoke test', () => {
        const router = createTestRouter()

        const wrapper = mount(Home, {
            global: {
                plugins: [router],  // ← это главное
            },
        })

        expect(wrapper.exists()).toBe(true)
        expect(wrapper.text()).toContain('Надёжные web-решения')
    })

    it('button', () => {
        const router = createTestRouter()

        const wrapper = mount(Home, {
            global: {
                plugins: [router],
            },
        })

        const button = wrapper.find('button')      // или по классу: wrapper.find('.start-btn')
        expect(button.exists()).toBe(true)

    })
})