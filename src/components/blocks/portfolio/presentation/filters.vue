<script setup>
import { useI18n } from 'vue-i18n'

const props = defineProps({
  activeFilter: {
    type: String,
    default: '*'
  }
})

const emit = defineEmits(['select'])

const { t } = useI18n()

const filters = [
  { key: '*', label: 'filter.all' },
  { key: 'develop', label: 'filter.develop' },
  { key: 'html', label: 'filter.html' },
  { key: 'design', label: 'filter.design' }
]
</script>

<template>
  <div class="portfolio-list">
    <ul class="nav" id="portfolio-flters">
      <li 
        v-for="filter in filters" 
        :key="filter.key"
        :class="{ 'filter-active': activeFilter === filter.key }"
        @click="emit('select', filter.key)"
      >
        {{ t(filter.label) }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
#portfolio-flters li {
  cursor: pointer;
  display: inline-block;
  margin: 0 10px 10px 10px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-transform: uppercase;
  color: #404040;
  transition: all 0.3s ease-in-out;
}
#portfolio-flters li:hover,
#portfolio-flters li.filter-active {
  color: #00D9EA;
}
</style>
