# Project Context — Frontend Architecture

> Живой документ. Фиксирует архитектурные решения, принятые в процессе рефакторинга.  
> Обновляется по мере развития проекта.

---

## Стек

| Слой | Технология |
|---|---|
| Frontend Framework | Vue 3 (Composition API, `<script setup>`) |
| Роутер | Vue Router 4 |
| State Management | Pinia |
| HTTP | Axios (обёртка `utils/api.js`) |
| i18n | vue-i18n + плагин `setupI18nSync(pinia)` |
| Backend API | Laravel 12 (вне scope frontend-задач) |
| Сборка | Vite |

---

## Архитектура: слои и зоны ответственности

### Stores

```
uiStore          — состояние интерфейса приложения
  ├─ scope               текущий URL-префикс раздела (ранее section)
  ├─ uiMainVars.page     title, breadcrumbs, parent, children
  ├─ isGlobalLoading     счётчик активных запросов (_loadingCount)
  ├─ buildPageVars()     формирует page из { structure, category, item }
  └─ setSection()        нормализует и устанавливает scope

navigationStore  — структурное дерево раздела (singleton)
  ├─ structure           дерево навигации раздела (services)
  ├─ nav[]               нормализованные ссылки для navbar
  ├─ fetchStructure()    загружает structure по slug
  └─ fetchNavigation()   загружает nav-ссылки по scope

blockStore(id)   — фабрика данных блока (инстанс на блок)
  ├─ category            данные категории
  ├─ item                данные элемента
  ├─ overlay             данные оверлея
  ├─ filter              активный фильтр ('*' | key)
  ├─ filteredItems       геттер: Object → Array с нормализацией slug
  ├─ fetchBlockCategory()
  ├─ fetchBlockItem()
  └─ fetchOverlayCategory()

formStore        — состояние форм (отдельный слой, вне scope текущих задач)
```

### Фабрика blockStore — ключевое решение

`blockStore` — не синглтон. Это фабрика, возвращающая независимые инстансы по ID.

```js
// src/stores/blockStore.js
const _registry = new Map()  // ← определение store кэшируется на уровне модуля

export function useBlockStore(id) {
  if (!_registry.has(id)) {
    _registry.set(id, createBlockStoreDefinition(id))
  }
  return _registry.get(id)()  // Pinia ID: block/${id}
}
```

**Почему важно:** `defineStore` должен вызываться ровно один раз на ID. Иначе компонент и fetch работают с разными инстансами — DevTools показывает данные, шаблон нет.

---

## Lifecycle компонентов

### Схема слоёв

```
View.vue          — только компоновка (Header, Footer, PageTitle, Index)
                    не содержит логики, не знает о stores
  └─ index.vue    — оркестратор
                    владеет store(s), вызывает fetch, передаёт props
                    единственный кто вызывает usePageOrchestrator с isPageOwner
       └─ list.vue — презентационный оркестратор
                     принимает данные через props
                     реализует функционал секции (фильтры, emit)
            └─ item.vue — чисто презентационный, только props
```

### Правила

- `View.vue` — никаких store, никаких composables с fetch
- `index.vue` — ровно один `usePageOrchestrator` на маршрут, с логикой определения isPageOwner
- Дочерние блоки на той же странице — `usePageOrchestrator` без права на `buildPageVars`
- Презентационные компоненты — только `defineProps`, никакого прямого импорта store

---

## usePageOrchestrator

Файл: `src/composables/usePageOrchestrator.js`

### Сигнатура

```js
const { blockStore, navigationStore } = usePageOrchestrator(blockId, scheme, {
  fetch: (route) => slug  // resolver — что передать в fetch-методы
})
```

### Схемы (scheme)

| Значение | Что загружает |
|---|---|
| `'category'` | `fetchBlockCategory(slug)` |
| `'item'` | `fetchBlockItem(slug)` |
| `'structure'` | `fetchStructure(slug)` |
| `'structure+category'` | оба, последовательно |
| `'structure+category+item'` | все три |

### isPageOwner — автоматическое определение

Только один оркестратор на странице должен вызывать `buildPageVars`. Определяется автоматически:

```js
const isPageOwner = route.name === blockId || route.params.slug === blockId
```

Если компонент `portfolio` вызван на маршруте `/portfolio` — он владелец страницы.  
Если тот же компонент вызван на главной `/` — он не владелец, `buildPageVars` не перезаписывается.

### Защита от повторных запросов

```js
// На уровне модуля — один Map на всё приложение
const _activeKeys = new Map()

const fetchKey = `${blockId}::${slug}::${uiStore.scope}`
if (_activeKeys.get(blockId) === fetchKey) return
_activeKeys.set(blockId, fetchKey)
```

Решает: повторный вызов при навигации назад, двойной mount (старый + новый инстанс компонента).

### fetchNavigation — не блокирует рендер

```js
// В load() — запускается параллельно, не await на входе
const navPromise = navStore.nav.length === 0
  ? navStore.fetchNavigation(uiStore.scope)
  : Promise.resolve()

// ... остальные fetch ...
await navPromise  // ждём только если реально запускали
```

Навигация не блокирует `beforeEach` — страница рендерится сразу, navbar появляется когда данные пришли.

---

## Роутер

Файл: `src/router/index.js`

### Структура маршрутов

```
/:scope([^/]+)?          ← scope = языковой/раздельный префикс (ru, en, пусто)
  /                      → Home.vue
  /services              → Services.vue
  /direction/:slug       → Direction.vue
  /group/:slug           → Group.vue
  /portfolio             → Portfolio.vue
  /blocks/item/:slug     → blocks/Item.vue
  /pages/:slug           → pages/Page.vue
```

### beforeEach — только критичное

```js
router.beforeEach((to, from, next) => {
  const newScope = to.params.scope ?? ''
  if (newScope !== uiStore.scope) uiStore.setScope(newScope)
  // fetchNavigation — НЕ здесь, НЕ с await
  uiStore.startGlobalLoading()
  next()
})
```

**Правило:** `beforeEach` не делает async-запросы к API. Только синхронное обновление состояния.

---

## Система scope (ранее section)

**Терминология (зафиксировано):**

| Понятие | Переменная | Где |
|---|---|---|
| URL-префикс раздела | `scope` | `uiStore.scope`, `route.params.scope` |
| Язык интерфейса | `locale` | `i18n.locale`, `uiStore.locale` |
| Конфиг раздела | `currentScope` | getter uiStore |

Источник конфига: `src/config/sections.js` — `SECTIONS_CONFIG`, `DEFAULT_SCOPE`, `VALID_SCOPES`.

---

## AppLink

Файл: `src/components/AppLink.vue`

Обёртка над `RouterLink`. Автоматически прeпендирует scope к пути.

```js
// Строка → /${scope}${cleanPath}
<AppLink to="/portfolio">Портфолио</AppLink>

// Объект → именованный маршрут (scope через :scope param роутера)
<AppLink :to="{ name: 'blocks_item', params: { slug: item.slug } }">
```

**Проблема:** текущая версия принимает только `String`. Поддержка объекта — в очереди задач.

---

## Данные: формат API

### Навигация

Endpoint: `${scope}/blocks/blocks/navigation`  
Рабочие данные: `data.content[]` — массив `{ anchor, link, sort }`

Ссылки в `link` могут содержать scope-префикс (`ru/portfolio`).  
**Требование к API:** возвращать scope-агностичные пути (`/portfolio`).  
До исправления — нормализация на frontend через `normalizeLink(rawLink, VALID_SCOPES)`.

### Блоки категорий

Данные работ портфолио: `category.sections.works` — Object `{ slug: properties }`.

Нормализация в геттере `filteredItems`:
```js
Object.entries(works).map(([slug, data]) => ({ slug, ...data }))
```

`workclass` — массив `[{ key, label }]`, не объект.

---

## Глобальный loading — счётчик

```js
// uiStore
state: { _loadingCount: 0 },
getters: {
  isGlobalLoading: (s) => s._loadingCount > 0
},
actions: {
  startGlobalLoading() { this._loadingCount++ },
  stopGlobalLoading()  { this._loadingCount = Math.max(0, this._loadingCount - 1) }
}
```

Любой store вызывает `start/stop` — индикатор корректен при параллельных запросах.  
Зависимость `useBlockStore('main')` в uiStore — удалена.

---

## Вектор развития: Server-Driven UI

Текущее состояние — статичная компоновка страниц во View-файлах.  
Целевое состояние — API возвращает конфигурацию страницы:

```json
{
  "meta": { "title": "Главная", "breadcrumbs": [] },
  "blocks": [
    { "type": "hero",      "key": "hero",      "scheme": "category", "fetch_slug": "main" },
    { "type": "portfolio", "key": "portfolio",  "scheme": "category", "fetch_slug": "portfolio" }
  ]
}
```

Frontend: единый `PageRenderer.vue` + реестр блоков `src/registry/blocks.js`.  
Новый тип → одна строка в реестре, компоненты не меняются.

---

## Открытые задачи (индекс)

| Приоритет | Задача |
|---|---|
| 🔴 | Переименование `section → scope` во всех файлах (механическое, но важно до расширения) |
| 🔴 | `AppLink` — поддержка объекта `{ name, params }` |
| 🟡 | `buildPageVars` — защита от `null` при неполных схемах (item.slug краш) |
| 🟡 | API: scope-агностичные ссылки в navigation endpoint |
| 🟡 | Реализация `PageRenderer` + `pageStore` (SDUI первый шаг) |
| 🟡 | `updatePageVars` / `buildPageVars` — доработка под все схемы вложенности |
| 🟢 | `navigationStore.setLoading` — перенести из getters в actions |
| 🟢 | `useBlockStore('main')` в uiStore — определить назначение или удалить |
| 🟢 | Хардкод фильтров в `portfolio/index.vue` — получать workclass-справочник из API |
| 🟢 | `AppLink` адаптация для всех частных случаев маршрутизации |
| 🟢 | i18n ↔ scope синхронизация — отдельная итерация |
| 🟢 | Vue Router warn: `/:pathMatch` param mismatch — исправить определение catch-all маршрута |

---

## Компоненты — примеры эксплуатации

### Оркестратор страницы (isPageOwner = true автоматически)

```js
// src/components/blocks/portfolio/index.vue
const { blockStore } = usePageOrchestrator('portfolio', 'category', {
  fetch: (route) => route.params.slug ?? route.name
})
```

### Дочерний блок (на главной, не владеет page context)

```js
// тот же компонент, вызван внутри home
const { blockStore } = usePageOrchestrator('portfolio', 'category', {
  fetch: () => 'portfolio'
})
// route.name === 'main' !== 'portfolio' → isPageOwner = false → buildPageVars не вызывается
```

### Services — structure + category

```js
// src/components/blocks/services/direction/index.vue
const { blockStore, navigationStore } = usePageOrchestrator('direction', 'structure+category', {
  fetch: (route) => route.params.slug
})
```