# Спецификация Server-Driven UI (SDUI)

В данном документе описывается целевая архитектура перехода приложения **websolutions** на концепцию **Server-Driven UI (SDUI)**. Это позволит динамически управлять структурой и наполнением страниц непосредственно с бэкенда без необходимости вносить изменения и делать повторные деплои фронтенд-кода.

---

## 1. Концепция перехода

* **Текущее состояние:** Компоновка блоков на страницах захардкожена в файлах представлений `src/views/`. Любое изменение порядка блоков или добавление нового блока требует изменения фронтенда.
* **Целевое состояние:** Бэкенд возвращает конфигурацию страницы — список блоков, их типы, параметры и источники данных (`fetch_slug`, `scheme`). Фронтенд содержит единый компонент `PageRenderer.vue`, который по реестру сопоставляет типы блоков с физическими Vue-компонентами и рендерит их динамически.

---

## 2. Структура ответа API для Страницы (SDUI Contract)

При запросе страницы (например, `GET /{scope}/blocks/pages/{slug}`) бэкенд возвращает метаданные и массив блоков:

```json
{
  "success": true,
  "meta": {
    "title": "Главная страница услуг",
    "breadcrumbs": [
      { "key": "/", "title": "Главная" }
    ]
  },
  "blocks": [
    {
      "type": "HeroBlock",
      "key": "hero-section",
      "scheme": "category",
      "fetch_slug": "main-hero"
    },
    {
      "type": "PortfolioBlock",
      "key": "recent-works",
      "scheme": "category",
      "fetch_slug": "portfolio",
      "props": {
        "limit": 6,
        "showFilters": false
      }
    },
    {
      "type": "ServicesBlock",
      "key": "our-services",
      "scheme": "structure+category",
      "fetch_slug": "services"
    }
  ]
}
```

---

## 3. Фронтенд Архитектура

Для реализации динамического рендеринга требуются два новых элемента: **Реестр Блоков** и **Компонент-Рендерер**.

### 3.1 Реестр Блоков (`src/registry/blocks.js`)
Экспортирует плоский объект, сопоставляющий строковые типы блоков из API с динамически импортируемыми компонентами:

```javascript
import { defineAsyncComponent } from 'vue'

export const BLOCKS_REGISTRY = {
  HeroBlock: defineAsyncComponent(() => import('@/components/blocks/Hero.vue')),
  PortfolioBlock: defineAsyncComponent(() => import('@/components/blocks/portfolio/index.vue')),
  ServicesBlock: defineAsyncComponent(() => import('@/components/blocks/services/index.vue')),
  // Новые типы блоков регистрируются здесь в одну строчку
}
```

### 3.2 Компонент `PageRenderer.vue`
Главный оркестратор динамических страниц, использующий стандартный Vue-компонент `<component :is="...">`:

```html
<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/uiStore'
import { usePageStore } from '@/stores/pageStore' // Будущий стор страниц
import { BLOCKS_REGISTRY } from '@/registry/blocks'

const route = useRoute()
const uiStore = useUiStore()
const pageStore = usePageStore()

const pageBlocks = computed(() => pageStore.blocks)

onMounted(async () => {
  // Загружаем конфигурацию страницы с бэкенда
  await pageStore.fetchPageConfig(route.params.slug)
  
  // Устанавливаем метаданные
  uiStore.setPageTitle(pageStore.meta.title)
})
</script>

<template>
  <div class="page-renderer">
    <template v-for="block in pageBlocks" :key="block.key">
      <!-- Динамический рендеринг по имени из реестра -->
      <component 
        :is="BLOCKS_REGISTRY[block.type]" 
        :block-id="block.key"
        :scheme="block.scheme"
        :fetch-slug="block.fetch_slug"
        v-bind="block.props || {}"
      />
    </template>
  </div>
</template>
```

---

## 4. Преимущества архитектуры
1. **Расширяемость:** Для добавления нового блока на любую страницу не требуется менять код этой страницы. Достаточно реализовать компонент, зарегистрировать его в `BLOCKS_REGISTRY` и добавить в базу данных бэкенда.
2. **Изоляция:** Каждый блок динамически получает свои параметры (`scheme`, `fetch_slug`, `props`), а за счёт фабрики `useBlockStore(blockId)` гарантированно работает в собственном независимом контексте Pinia.
3. **Асинхронность:** Динамические импорты (`defineAsyncComponent`) разбивают сборку на чанки, уменьшая объём первоначально загружаемого JS-кода.
