import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Acticle from '@/components/blocks/compred/presentation/acticle.vue'
import { getCardGridClasses } from '@/components/blocks/general/ui/cardGridClasses.js'

describe('Layout and Acticle (FE-015)', () => {
  describe('cardGridClasses.js', () => {
    it('returns row-cols-lg-5 for count=5', () => {
      const classes = getCardGridClasses(5)
      expect(classes).toContain('row-cols-lg-5')
      expect(classes).toContain('justify-content-center')
    })
    it('returns default for 0 or invalid', () => {
      expect(getCardGridClasses(0)).toBe('row-cols-1')
      expect(getCardGridClasses(null)).toBe('row-cols-1')
    })
    it('returns row-cols-lg-4 for 4 and >6', () => {
      expect(getCardGridClasses(4)).toContain('row-cols-lg-4')
      expect(getCardGridClasses(7)).toContain('row-cols-lg-4')
    })
  })

  describe('Acticle Component', () => {
    it('renders legacy mode by default with quote icon', () => {
      const wrapper = mount(Acticle, {
        props: {
          data: '<em>Just a normal quote</em>'
        }
      })
      
      expect(wrapper.classes()).toContain('acticle')
      
      // Should have text-center, not acticle--letter
      const contentDiv = wrapper.find('.acticle__content')
      expect(contentDiv.classes()).toContain('text-center')
      expect(contentDiv.classes()).not.toContain('acticle--letter')
      
      // Quote icon should be present
      expect(wrapper.find('i.bi-quote').exists()).toBe(true)
    })

    it('renders structured mode without quote icon when cp-personal-letter is present', () => {
      const wrapper = mount(Acticle, {
        props: {
          data: '<div class="cp-personal-letter">Hello world</div>'
        }
      })
      
      const contentDiv = wrapper.find('.acticle__content')
      
      // Should have acticle--letter
      expect(contentDiv.classes()).toContain('acticle--letter')
      expect(contentDiv.classes()).not.toContain('text-center')
      
      // Quote icon should be hidden
      expect(wrapper.find('i.bi-quote').exists()).toBe(false)
    })
  })
})
